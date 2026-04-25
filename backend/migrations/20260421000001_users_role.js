/**
 * Añade rol a usuarios (customer | admin). Usado para proteger el panel /admin.
 *
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.alterTable('usuarios', t => {
    t.string('rol', 20).notNullable().defaultTo('customer')
  })
  await knex.raw(`
    ALTER TABLE usuarios ADD CONSTRAINT usuarios_rol_chk
    CHECK (rol IN ('customer', 'admin'))
  `)
}

/** @param {import('knex').Knex} knex */
export async function down(knex) {
  await knex.raw(`ALTER TABLE usuarios DROP CONSTRAINT IF EXISTS usuarios_rol_chk`)
  await knex.schema.alterTable('usuarios', t => t.dropColumn('rol'))
}
