import { query, withTransaction } from '../db.js'

const PUBLIC_FIELDS = `
  id, producto_id, usuario_id, nombre_autor,
  rating, titulo, contenido, verificada,
  helpful_count, created_at
`

export async function listByProduct(productoId) {
  const { rows } = await query(
    `SELECT ${PUBLIC_FIELDS} FROM reviews
     WHERE producto_id = $1 AND publicada = TRUE
     ORDER BY verificada DESC, created_at DESC`,
    [productoId]
  )
  return rows
}

/**
 * Crea review y recalcula rating + review_count del producto (transacción).
 */
export async function create({ productoId, usuarioId, nombreAutor, rating, titulo, contenido }) {
  return withTransaction(async client => {
    const insert = await client.query(
      `INSERT INTO reviews (producto_id, usuario_id, nombre_autor, rating, titulo, contenido, verificada)
       VALUES ($1, $2, $3, $4, $5, $6, TRUE)
       RETURNING ${PUBLIC_FIELDS}`,
      [productoId, usuarioId, nombreAutor, rating, titulo, contenido]
    )
    await client.query(
      `
      UPDATE productos
      SET rating = (
        SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0)
        FROM reviews WHERE producto_id = $1 AND publicada = TRUE
      ),
      review_count = (
        SELECT COUNT(*) FROM reviews WHERE producto_id = $1 AND publicada = TRUE
      )
      WHERE id = $1
      `,
      [productoId]
    )
    return insert.rows[0]
  })
}
