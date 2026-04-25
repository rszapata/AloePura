import 'dotenv/config'

/**
 * Knex config (ESM). Usado solo para migraciones y seeds.
 * El runtime de la API usa pg directo (src/db.js).
 */

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('knex').Knex.Config} */
const base = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    // Render Postgres requiere SSL en prod
    ssl: isProd ? { rejectUnauthorized: false } : false,
  },
  pool: { min: 2, max: 10 },
  migrations: { directory: './migrations', extension: 'js' },
  seeds: { directory: './seeds' },
}

export default {
  development: base,
  production: base,
  test: base,
}
