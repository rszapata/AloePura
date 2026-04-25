import { query, withTransaction } from '../db.js'

// Aliases para mantener un shape limpio en la API pública.
// DB real:  numero_orden, envio_costo
// API out:  numero,       envio
const PUBLIC_FIELDS = `
  id,
  numero_orden AS numero,
  usuario_id,
  estado,
  subtotal,
  envio_costo AS envio,
  impuestos,
  descuento,
  total,
  items,
  direccion_envio,
  metodo_pago,
  payment_id,
  tracking_numero,
  notas,
  created_at,
  updated_at
`

/**
 * Genera un número de orden legible: ALO-YYYYMMDD-XXXXXX
 */
function generateOrderNumber() {
  const d = new Date()
  const ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `ALO-${ymd}-${rand}`
}

export async function listByUser(usuarioId) {
  const { rows } = await query(
    `SELECT ${PUBLIC_FIELDS} FROM ordenes
     WHERE usuario_id = $1
     ORDER BY created_at DESC`,
    [usuarioId]
  )
  return rows
}

export async function findByIdForUser(id, usuarioId) {
  const { rows } = await query(
    `SELECT ${PUBLIC_FIELDS} FROM ordenes
     WHERE id = $1 AND usuario_id = $2`,
    [id, usuarioId]
  )
  return rows[0] || null
}

/**
 * Crea una orden verificando stock y descontándolo atómicamente.
 * items: [{ producto_id, cantidad }]
 */
export async function create({
  usuarioId,
  items,
  direccionEnvio,
  metodoPago,
  notas,
}) {
  return withTransaction(async client => {
    if (!items?.length) {
      const err = new Error('El carrito está vacío')
      err.status = 400
      throw err
    }

    // Lock rows de productos para evitar race conditions
    const ids = items.map(i => i.producto_id)
    const { rows: productos } = await client.query(
      `SELECT id, nombre, precio, stock, imagen_principal, sku
       FROM productos
       WHERE id = ANY($1::int[]) AND activo = TRUE
       FOR UPDATE`,
      [ids]
    )

    const byId = new Map(productos.map(p => [p.id, p]))
    const lineItems = []
    let subtotal = 0

    for (const it of items) {
      const p = byId.get(it.producto_id)
      if (!p) {
        const err = new Error(`Producto ${it.producto_id} no disponible`)
        err.status = 400
        throw err
      }
      if (p.stock < it.cantidad) {
        const err = new Error(`Stock insuficiente para "${p.nombre}" (disponible: ${p.stock})`)
        err.status = 409
        throw err
      }
      const lineTotal = Number(p.precio) * it.cantidad
      subtotal += lineTotal
      lineItems.push({
        producto_id: p.id,
        nombre: p.nombre,
        sku: p.sku,
        precio_unitario: Number(p.precio),
        cantidad: it.cantidad,
        subtotal: Number(lineTotal.toFixed(2)),
        imagen: p.imagen_principal,
      })
    }

    subtotal = Number(subtotal.toFixed(2))
    const envio = subtotal >= 40 ? 0 : 3.99
    const impuestos = 0 // IVA ya incluido en precios
    const total = Number((subtotal + envio + impuestos).toFixed(2))

    // Descontar stock
    for (const it of items) {
      await client.query(
        `UPDATE productos SET stock = stock - $1 WHERE id = $2`,
        [it.cantidad, it.producto_id]
      )
    }

    const numero = generateOrderNumber()
    const { rows } = await client.query(
      `INSERT INTO ordenes (
        usuario_id, numero_orden, estado,
        subtotal, envio_costo, impuestos, total,
        items, direccion_envio, metodo_pago, notas
      )
      VALUES ($1, $2, 'pending', $3, $4, $5, $6, $7::jsonb, $8::jsonb, $9, $10)
      RETURNING ${PUBLIC_FIELDS}`,
      [
        usuarioId,
        numero,
        subtotal,
        envio,
        impuestos,
        total,
        JSON.stringify(lineItems),
        JSON.stringify(direccionEnvio),
        metodoPago,
        notas || null,
      ]
    )

    // Limpiar carrito si existía
    await client.query(`DELETE FROM carritos WHERE usuario_id = $1`, [usuarioId])

    return rows[0]
  })
}

export async function updateEstado(id, estado) {
  const { rows } = await query(
    `UPDATE ordenes SET estado = $1 WHERE id = $2 RETURNING ${PUBLIC_FIELDS}`,
    [estado, id]
  )
  return rows[0] || null
}

/**
 * Guarda el payment_id de Stripe en la orden (cuando se crea el PaymentIntent).
 */
export async function setPaymentId(id, paymentId) {
  const { rows } = await query(
    `UPDATE ordenes SET payment_id = $1 WHERE id = $2 RETURNING ${PUBLIC_FIELDS}`,
    [paymentId, id]
  )
  return rows[0] || null
}

/**
 * Marca la orden como pagada a partir de un evento webhook.
 * Idempotente: si ya está en 'paid' no hace nada.
 */
export async function markPaidByPaymentId(paymentId) {
  const { rows } = await query(
    `UPDATE ordenes
     SET estado = 'paid'
     WHERE payment_id = $1 AND estado IN ('pending', 'processing')
     RETURNING ${PUBLIC_FIELDS}`,
    [paymentId]
  )
  return rows[0] || null
}

/**
 * Marca una orden como cancelada cuando el pago falla definitivamente.
 * Restituye el stock.
 */
export async function markFailedByPaymentId(paymentId) {
  return withTransaction(async client => {
    const { rows } = await client.query(
      `SELECT ${PUBLIC_FIELDS} FROM ordenes
       WHERE payment_id = $1 AND estado = 'pending'
       FOR UPDATE`,
      [paymentId]
    )
    const orden = rows[0]
    if (!orden) return null

    // Restituir stock
    for (const item of orden.items || []) {
      await client.query(
        `UPDATE productos SET stock = stock + $1 WHERE id = $2`,
        [item.cantidad, item.producto_id]
      )
    }

    const { rows: updated } = await client.query(
      `UPDATE ordenes SET estado = 'cancelled' WHERE id = $1
       RETURNING ${PUBLIC_FIELDS}`,
      [orden.id]
    )
    return updated[0]
  })
}

/* ---------- Admin ---------- */

const VALID_STATES = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']

export async function listAdmin({ page = 1, limit = 20, estado, search = '' } = {}) {
  const conditions = []
  const values = []
  let i = 1
  if (estado && estado !== 'all') {
    conditions.push(`o.estado = $${i++}`)
    values.push(estado)
  }
  if (search && search.trim()) {
    conditions.push(`(o.numero_orden ILIKE $${i} OR u.email ILIKE $${i} OR u.nombre ILIKE $${i})`)
    values.push(`%${search.trim()}%`)
    i++
  }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  const offset = (page - 1) * limit

  const [dataRes, countRes] = await Promise.all([
    query(
      `SELECT
         o.id, o.numero_orden AS numero, o.usuario_id, o.estado,
         o.subtotal, o.envio_costo AS envio, o.impuestos, o.descuento, o.total,
         o.items, o.direccion_envio, o.metodo_pago, o.payment_id,
         o.tracking_numero, o.notas, o.created_at, o.updated_at,
         u.email AS usuario_email, u.nombre AS usuario_nombre
       FROM ordenes o
       LEFT JOIN usuarios u ON u.id = o.usuario_id
       ${where}
       ORDER BY o.created_at DESC
       LIMIT $${i++} OFFSET $${i++}`,
      [...values, limit, offset]
    ),
    query(
      `SELECT COUNT(*)::int AS total
       FROM ordenes o LEFT JOIN usuarios u ON u.id = o.usuario_id ${where}`,
      values
    ),
  ])
  return {
    ordenes: dataRes.rows,
    total: countRes.rows[0].total,
    page, limit,
    totalPages: Math.max(1, Math.ceil(countRes.rows[0].total / limit)),
  }
}

export async function updateAdmin(id, patch) {
  const sets = []
  const values = []
  let i = 1
  if (patch.estado !== undefined) {
    if (!VALID_STATES.includes(patch.estado)) {
      const err = new Error(`Estado inválido: ${patch.estado}`)
      err.status = 400
      throw err
    }
    sets.push(`estado = $${i++}`)
    values.push(patch.estado)
  }
  if (patch.tracking_numero !== undefined) {
    sets.push(`tracking_numero = $${i++}`)
    values.push(patch.tracking_numero || null)
  }
  if (patch.notas !== undefined) {
    sets.push(`notas = $${i++}`)
    values.push(patch.notas || null)
  }
  if (!sets.length) {
    const { rows } = await query(`SELECT ${PUBLIC_FIELDS} FROM ordenes WHERE id = $1`, [id])
    return rows[0] || null
  }
  values.push(id)
  const { rows } = await query(
    `UPDATE ordenes SET ${sets.join(', ')} WHERE id = $${i} RETURNING ${PUBLIC_FIELDS}`,
    values
  )
  return rows[0] || null
}

/**
 * Métricas para el dashboard admin.
 */
export async function getStats() {
  const [counts, revenue, topProducts, recent] = await Promise.all([
    query(`
      SELECT estado, COUNT(*)::int AS total
      FROM ordenes
      GROUP BY estado
    `),
    query(`
      SELECT
        COALESCE(SUM(total) FILTER (WHERE estado IN ('paid','processing','shipped','delivered')), 0)::float AS total_revenue,
        COALESCE(SUM(total) FILTER (WHERE estado IN ('paid','processing','shipped','delivered')
          AND created_at >= NOW() - INTERVAL '30 days'), 0)::float AS revenue_30d,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days')::int AS orders_30d
      FROM ordenes
    `),
    query(`
      SELECT
        (item->>'producto_id')::int AS producto_id,
        item->>'nombre' AS nombre,
        SUM((item->>'cantidad')::int)::int AS vendidos,
        SUM((item->>'subtotal')::numeric)::float AS ingresos
      FROM ordenes, jsonb_array_elements(items) AS item
      WHERE estado IN ('paid','processing','shipped','delivered')
      GROUP BY producto_id, nombre
      ORDER BY vendidos DESC
      LIMIT 5
    `),
    query(`
      SELECT
        o.id, o.numero_orden AS numero, o.estado, o.total, o.created_at,
        u.email AS usuario_email, u.nombre AS usuario_nombre
      FROM ordenes o
      LEFT JOIN usuarios u ON u.id = o.usuario_id
      ORDER BY o.created_at DESC
      LIMIT 5
    `),
  ])

  const byState = Object.fromEntries(counts.rows.map(r => [r.estado, r.total]))

  return {
    ordenesPorEstado: byState,
    totalOrdenes: Object.values(byState).reduce((a, b) => a + b, 0),
    ingresosTotales: revenue.rows[0].total_revenue,
    ingresos30d: revenue.rows[0].revenue_30d,
    ordenes30d: revenue.rows[0].orders_30d,
    topProductos: topProducts.rows,
    ultimasOrdenes: recent.rows,
  }
}

export async function findById(id) {
  const { rows } = await query(
    `SELECT ${PUBLIC_FIELDS} FROM ordenes WHERE id = $1`,
    [id]
  )
  return rows[0] || null
}
