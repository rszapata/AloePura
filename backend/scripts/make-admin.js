#!/usr/bin/env node
/**
 * Promueve (o degrada) un usuario existente a admin.
 *
 * Uso:
 *   node scripts/make-admin.js usuario@email.com
 *   node scripts/make-admin.js usuario@email.com --remove
 */
import '../src/config.js'
import { setRolByEmail } from '../src/models/user.model.js'
import { pool } from '../src/db.js'

const email = process.argv[2]
const remove = process.argv.includes('--remove')

if (!email) {
  console.error('Uso: node scripts/make-admin.js <email> [--remove]')
  process.exit(1)
}

try {
  const rol = remove ? 'customer' : 'admin'
  const user = await setRolByEmail(email, rol)
  if (!user) {
    console.error(`❌ Usuario con email "${email}" no encontrado`)
    process.exit(1)
  }
  console.log(`✅ ${user.email} → rol = ${user.rol}`)
} catch (err) {
  console.error('Error:', err.message)
  process.exit(1)
} finally {
  await pool.end()
}
