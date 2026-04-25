/**
 * Normaliza la dirección del usuario para que coincida con el shape que
 * pedimos en el checkout (src/utils/address.js).
 *
 * Se añaden columnas nuevas (sin eliminar las antiguas `direccion`/`pais`/etc.
 * por compatibilidad). La columna `nombre` pasa a usarse como "nombre de pila"
 * en el frontend; añadimos `apellidos` para separar el apellido.
 *
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.alterTable('usuarios', t => {
    t.string('apellidos', 120)
    t.string('calle', 200)
    t.string('numero', 20)
    t.string('piso', 20)
    t.string('puerta', 20)
    t.string('provincia', 100)
  })
}

/** @param {import('knex').Knex} knex */
export async function down(knex) {
  await knex.schema.alterTable('usuarios', t => {
    t.dropColumn('apellidos')
    t.dropColumn('calle')
    t.dropColumn('numero')
    t.dropColumn('piso')
    t.dropColumn('puerta')
    t.dropColumn('provincia')
  })
}
