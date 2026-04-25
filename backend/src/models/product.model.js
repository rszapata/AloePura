import { query } from '../db.js'

const PUBLIC_FIELDS = `
  id, nombre, slug, descripcion, descripcion_larga,
  precio, precio_original, descuento,
  imagen_principal, imagenes, categoria,
  rating, review_count, stock, sku,
  especificaciones, ingredientes, beneficios,
  vegan, organico, dermatology_tested,
  featured, bestseller, activo,
  created_at, updated_at
`

const SORT_WHITELIST = {
  'featured':   'featured DESC, id ASC',
  'newest':     'created_at DESC',
  'price-asc':  'precio ASC',
  'price-desc': 'precio DESC',
  'rating':     'rating DESC',
  'name':       'nombre ASC',
}

/**
 * Lista paginada con filtros opcionales.
 * @param {object} opts
 * @param {number} opts.page
 * @param {number} opts.limit
 * @param {string} [opts.categoria]
 * @param {string} [opts.sort]
 * @param {boolean} [opts.onlyInStock]
 */
export async function list({ page = 1, limit = 12, categoria, sort = 'featured', onlyInStock = false }) {
  const conditions = ['activo = TRUE']
  const values = []
  let i = 1

  if (categoria && categoria !== 'all') {
    conditions.push(`categoria = $${i++}`)
    values.push(categoria)
  }
  if (onlyInStock) {
    conditions.push('stock > 0')
  }

  const orderBy = SORT_WHITELIST[sort] || SORT_WHITELIST.featured
  const offset = (page - 1) * limit

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''

  const [dataRes, countRes] = await Promise.all([
    query(
      `SELECT ${PUBLIC_FIELDS} FROM productos ${where} ORDER BY ${orderBy} LIMIT $${i++} OFFSET $${i++}`,
      [...values, limit, offset]
    ),
    query(`SELECT COUNT(*)::int AS total FROM productos ${where}`, values),
  ])

  return {
    productos: dataRes.rows,
    total: countRes.rows[0].total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(countRes.rows[0].total / limit)),
  }
}

export async function findById(id) {
  const { rows } = await query(
    `SELECT ${PUBLIC_FIELDS} FROM productos WHERE id = $1 AND activo = TRUE`,
    [id]
  )
  return rows[0] || null
}

export async function findBySlug(slug) {
  const { rows } = await query(
    `SELECT ${PUBLIC_FIELDS} FROM productos WHERE slug = $1 AND activo = TRUE`,
    [slug]
  )
  return rows[0] || null
}

/* ---------- Admin ---------- */

/**
 * Listado admin: incluye inactivos, soporta búsqueda + filtro por categoría.
 */
export async function listAdmin({ page = 1, limit = 20, search = '', categoria } = {}) {
  const conditions = []
  const values = []
  let i = 1
  if (search && search.trim()) {
    conditions.push(`(nombre ILIKE $${i} OR slug ILIKE $${i} OR sku ILIKE $${i})`)
    values.push(`%${search.trim()}%`)
    i++
  }
  if (categoria && categoria !== 'all') {
    conditions.push(`categoria = $${i++}`)
    values.push(categoria)
  }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  const offset = (page - 1) * limit

  const [dataRes, countRes] = await Promise.all([
    query(
      `SELECT ${PUBLIC_FIELDS} FROM productos ${where}
       ORDER BY created_at DESC LIMIT $${i++} OFFSET $${i++}`,
      [...values, limit, offset]
    ),
    query(`SELECT COUNT(*)::int AS total FROM productos ${where}`, values),
  ])
  return {
    productos: dataRes.rows,
    total: countRes.rows[0].total,
    page, limit,
    totalPages: Math.max(1, Math.ceil(countRes.rows[0].total / limit)),
  }
}

export async function findByIdAdmin(id) {
  const { rows } = await query(`SELECT ${PUBLIC_FIELDS} FROM productos WHERE id = $1`, [id])
  return rows[0] || null
}

const INSERTABLE = [
  'nombre', 'slug', 'descripcion', 'descripcion_larga',
  'precio', 'precio_original', 'descuento',
  'imagen_principal', 'imagenes', 'categoria',
  'stock', 'sku',
  'especificaciones', 'ingredientes', 'beneficios',
  'vegan', 'organico', 'dermatology_tested',
  'featured', 'bestseller', 'activo',
]

const JSONB_FIELDS = new Set(['imagenes', 'especificaciones', 'ingredientes', 'beneficios'])

export async function createProduct(data) {
  const cols = []
  const placeholders = []
  const values = []
  let i = 1
  for (const f of INSERTABLE) {
    if (data[f] !== undefined) {
      cols.push(f)
      if (JSONB_FIELDS.has(f)) {
        placeholders.push(`$${i++}::jsonb`)
        values.push(JSON.stringify(data[f]))
      } else {
        placeholders.push(`$${i++}`)
        values.push(data[f])
      }
    }
  }
  const { rows } = await query(
    `INSERT INTO productos (${cols.join(', ')}) VALUES (${placeholders.join(', ')})
     RETURNING ${PUBLIC_FIELDS}`,
    values
  )
  return rows[0]
}

export async function updateProduct(id, patch) {
  const sets = []
  const values = []
  let i = 1
  for (const f of INSERTABLE) {
    if (patch[f] !== undefined) {
      if (JSONB_FIELDS.has(f)) {
        sets.push(`${f} = $${i++}::jsonb`)
        values.push(JSON.stringify(patch[f]))
      } else {
        sets.push(`${f} = $${i++}`)
        values.push(patch[f])
      }
    }
  }
  if (!sets.length) return findByIdAdmin(id)
  values.push(id)
  const { rows } = await query(
    `UPDATE productos SET ${sets.join(', ')} WHERE id = $${i} RETURNING ${PUBLIC_FIELDS}`,
    values
  )
  return rows[0] || null
}

/**
 * Soft-delete: marca `activo = FALSE`. Preserva integridad referencial
 * con ordenes/reviews existentes.
 */
export async function softDeleteProduct(id) {
  const { rows } = await query(
    `UPDATE productos SET activo = FALSE WHERE id = $1 RETURNING id`,
    [id]
  )
  return rows[0] || null
}

export async function findRelated(id, limit = 3) {
  const { rows } = await query(
    `
    WITH actual AS (SELECT categoria FROM productos WHERE id = $1)
    SELECT ${PUBLIC_FIELDS}
    FROM productos
    WHERE id <> $1 AND activo = TRUE
    ORDER BY (categoria = (SELECT categoria FROM actual)) DESC, bestseller DESC, rating DESC
    LIMIT $2
    `,
    [id, limit]
  )
  return rows
}
