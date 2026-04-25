import { query } from '../db.js'

/**
 * Carrito server-side (opcional, persistente por usuario).
 * El frontend puede seguir usando localStorage, pero este endpoint
 * permite sincronizar entre dispositivos si hay sesión.
 */

export async function getByUser(usuarioId) {
  const { rows } = await query(
    `SELECT id, usuario_id, items, updated_at
     FROM carritos WHERE usuario_id = $1`,
    [usuarioId]
  )
  return rows[0] || { usuario_id: usuarioId, items: [] }
}

export async function upsert(usuarioId, items) {
  const { rows } = await query(
    `
    INSERT INTO carritos (usuario_id, items)
    VALUES ($1, $2::jsonb)
    ON CONFLICT (usuario_id)
    DO UPDATE SET items = EXCLUDED.items, updated_at = NOW()
    RETURNING id, usuario_id, items, updated_at
    `,
    [usuarioId, JSON.stringify(items)]
  )
  return rows[0]
}

export async function clear(usuarioId) {
  await query(`DELETE FROM carritos WHERE usuario_id = $1`, [usuarioId])
}
