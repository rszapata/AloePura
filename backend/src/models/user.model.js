import { query } from '../db.js'

const PUBLIC_FIELDS = `
  id, email, nombre, apellidos, telefono,
  calle, numero, piso, puerta,
  codigo_postal, ciudad, provincia, pais,
  newsletter, rol, created_at, updated_at
`

export async function findByEmail(email) {
  const { rows } = await query(
    `SELECT id, email, password, nombre FROM usuarios WHERE email = $1`,
    [email.toLowerCase()]
  )
  return rows[0] || null
}

export async function findPublicById(id) {
  const { rows } = await query(
    `SELECT ${PUBLIC_FIELDS} FROM usuarios WHERE id = $1`,
    [id]
  )
  return rows[0] || null
}

export async function create({ email, password, nombre, telefono, newsletter = false }) {
  const { rows } = await query(
    `
    INSERT INTO usuarios (email, password, nombre, telefono, newsletter)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING ${PUBLIC_FIELDS}
    `,
    [email.toLowerCase(), password, nombre, telefono || null, !!newsletter]
  )
  return rows[0]
}

/**
 * Actualiza parcialmente el perfil. Sólo acepta columnas whitelisted.
 * Campos no provistos no se tocan; strings vacíos se guardan como NULL.
 */
export async function updateProfile(id, patch) {
  const fields = [
    'nombre', 'apellidos', 'telefono',
    'calle', 'numero', 'piso', 'puerta',
    'codigo_postal', 'ciudad', 'provincia', 'pais',
    'newsletter',
  ]
  const sets = []
  const values = []
  let i = 1
  for (const f of fields) {
    if (patch[f] !== undefined) {
      sets.push(`${f} = $${i++}`)
      // Normaliza strings vacíos a null (salvo booleanos)
      const v = patch[f]
      values.push(typeof v === 'string' && v.trim() === '' ? null : v)
    }
  }
  if (!sets.length) return findPublicById(id)
  values.push(id)
  const { rows } = await query(
    `UPDATE usuarios SET ${sets.join(', ')} WHERE id = $${i} RETURNING ${PUBLIC_FIELDS}`,
    values
  )
  return rows[0] || null
}

/**
 * Listado admin con paginación + búsqueda.
 */
export async function listAdmin({ page = 1, limit = 20, search = '' } = {}) {
  const conditions = []
  const values = []
  let i = 1
  if (search && search.trim()) {
    conditions.push(`(email ILIKE $${i} OR nombre ILIKE $${i} OR apellidos ILIKE $${i})`)
    values.push(`%${search.trim()}%`)
    i++
  }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  const offset = (page - 1) * limit

  const [dataRes, countRes] = await Promise.all([
    query(
      `SELECT ${PUBLIC_FIELDS} FROM usuarios ${where}
       ORDER BY created_at DESC LIMIT $${i++} OFFSET $${i++}`,
      [...values, limit, offset]
    ),
    query(`SELECT COUNT(*)::int AS total FROM usuarios ${where}`, values),
  ])
  return {
    usuarios: dataRes.rows,
    total: countRes.rows[0].total,
    page, limit,
    totalPages: Math.max(1, Math.ceil(countRes.rows[0].total / limit)),
  }
}

export async function setRol(id, rol) {
  if (!['customer', 'admin'].includes(rol)) {
    const err = new Error('Rol inválido')
    err.status = 400
    throw err
  }
  const { rows } = await query(
    `UPDATE usuarios SET rol = $1 WHERE id = $2 RETURNING ${PUBLIC_FIELDS}`,
    [rol, id]
  )
  return rows[0] || null
}

export async function setRolByEmail(email, rol) {
  if (!['customer', 'admin'].includes(rol)) {
    const err = new Error('Rol inválido')
    err.status = 400
    throw err
  }
  const { rows } = await query(
    `UPDATE usuarios SET rol = $1 WHERE email = $2 RETURNING ${PUBLIC_FIELDS}`,
    [rol, email.toLowerCase()]
  )
  return rows[0] || null
}

/**
 * Guarda la dirección de envío (shape normalizado del frontend) en el perfil.
 * Se llama tras completar un checkout para que el usuario no tenga que
 * reintroducirla en el siguiente pedido.
 *
 * address = { firstName, lastName, street, number, floor, door,
 *             postalCode, city, province, phone }
 */
export async function saveCheckoutAddress(id, address = {}) {
  return updateProfile(id, {
    nombre:        address.firstName,
    apellidos:     address.lastName,
    telefono:      address.phone,
    calle:         address.street,
    numero:        address.number,
    piso:          address.floor,
    puerta:        address.door,
    codigo_postal: address.postalCode,
    ciudad:        address.city,
    provincia:     address.province,
  })
}
