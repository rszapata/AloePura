import pg from 'pg'
import { config, isProd } from './config.js'

// pg devuelve NUMERIC como string por defecto. Para dinero esto es correcto,
// pero en la API queremos numbers en el JSON. Parseamos NUMERIC → float.
pg.types.setTypeParser(1700, v => (v == null ? null : parseFloat(v)))

export const pool = new pg.Pool({
  connectionString: config.databaseUrl,
  ssl: isProd ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30_000,
})

pool.on('error', err => {
  // eslint-disable-next-line no-console
  console.error('[pg pool error]', err)
})

/**
 * Ejecuta una query parametrizada. Siempre usar placeholders $1, $2… NUNCA
 * interpolar strings con template literals (SQL injection).
 *
 * @example
 *   const { rows } = await query('SELECT * FROM productos WHERE id = $1', [id])
 */
export function query(text, params) {
  return pool.query(text, params)
}

/**
 * Ejecuta una serie de queries dentro de una transacción.
 *
 * @example
 *   await withTransaction(async client => {
 *     await client.query('INSERT …')
 *     await client.query('UPDATE …')
 *   })
 */
export async function withTransaction(fn) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await fn(client)
    await client.query('COMMIT')
    return result
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}

export async function healthCheck() {
  const started = Date.now()
  try {
    const { rows } = await pool.query('SELECT 1 AS ok')
    return {
      ok: rows[0]?.ok === 1,
      latencyMs: Date.now() - started,
    }
  } catch (err) {
    return {
      ok: false,
      error: err.message,
      latencyMs: Date.now() - started,
    }
  }
}
