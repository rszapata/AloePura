/**
 * Schema inicial AloePura.
 *
 * Notas:
 * - Nombres de tabla/columna en español pero SIN acentos ni caracteres
 *   especiales, para evitar quoted identifiers en cada consulta.
 * - Timestamps en UTC con DEFAULT now().
 * - Moneda: NUMERIC(10,2) (nunca float para dinero).
 * - JSON → JSONB (consultable, indexable).
 *
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  // Extensión útil para búsqueda (opcional pero barata)
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"')

  await knex.schema.createTable('usuarios', t => {
    t.increments('id').primary()
    t.string('email', 255).notNullable().unique()
    t.string('password', 255).notNullable() // bcrypt hash
    t.string('nombre', 120).notNullable()
    t.string('telefono', 32)
    t.string('direccion', 255)
    t.string('ciudad', 120)
    t.string('codigo_postal', 16)
    t.string('pais', 2).defaultTo('ES') // ISO-3166-1 alpha-2
    t.boolean('newsletter').notNullable().defaultTo(false)
    t.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('productos', t => {
    t.increments('id').primary()
    t.string('nombre', 200).notNullable()
    t.string('slug', 220).notNullable().unique()
    t.text('descripcion')
    t.text('descripcion_larga')
    t.decimal('precio', 10, 2).notNullable()
    t.decimal('precio_original', 10, 2) // null si no hay descuento
    t.integer('descuento') // porcentaje calculado o manual, null = sin descuento
    t.string('imagen_principal', 500)
    t.jsonb('imagenes').notNullable().defaultTo(knex.raw("'[]'::jsonb"))
    t.string('categoria', 60).notNullable()
    t.decimal('rating', 3, 2).notNullable().defaultTo(0)
    t.integer('review_count').notNullable().defaultTo(0)
    t.integer('stock').notNullable().defaultTo(0)
    t.string('sku', 60).unique()
    t.jsonb('especificaciones').notNullable().defaultTo(knex.raw("'{}'::jsonb"))
    t.jsonb('ingredientes').notNullable().defaultTo(knex.raw("'[]'::jsonb"))
    t.jsonb('beneficios').notNullable().defaultTo(knex.raw("'[]'::jsonb"))
    t.boolean('vegan').notNullable().defaultTo(false)
    t.boolean('organico').notNullable().defaultTo(false)
    t.boolean('dermatology_tested').notNullable().defaultTo(false)
    t.boolean('featured').notNullable().defaultTo(false)
    t.boolean('bestseller').notNullable().defaultTo(false)
    t.boolean('activo').notNullable().defaultTo(true)
    t.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now())

    t.index('categoria')
    t.index(['featured', 'activo'])
    t.index(['bestseller', 'activo'])
  })

  await knex.schema.createTable('ordenes', t => {
    t.increments('id').primary()
    t.string('numero_orden', 32).notNullable().unique() // human-friendly "ORD-2026-0001"
    t.integer('usuario_id').references('id').inTable('usuarios').onDelete('SET NULL')
    t.string('email_invitado', 255) // para compras sin cuenta
    t.jsonb('items').notNullable() // [{producto_id, nombre, precio, cantidad, subtotal}]
    t.decimal('subtotal', 10, 2).notNullable()
    t.decimal('envio_costo', 10, 2).notNullable().defaultTo(0)
    t.decimal('impuestos', 10, 2).notNullable().defaultTo(0)
    t.decimal('descuento', 10, 2).notNullable().defaultTo(0)
    t.decimal('total', 10, 2).notNullable()
    t.string('estado', 20).notNullable().defaultTo('pending')
    // pending | paid | processing | shipped | delivered | cancelled | refunded
    t.jsonb('direccion_envio').notNullable() // schema normalizado (ver frontend utils/address.js)
    t.string('metodo_pago', 20).notNullable() // bizum | card | paypal | transfer
    t.string('payment_id', 120) // ID de la pasarela (Stripe pi_…, Redsys Ds_AuthorisationCode…)
    t.string('tracking_numero', 60)
    t.text('notas')
    t.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now())

    t.index('usuario_id')
    t.index('estado')
    t.index('created_at')
  })

  await knex.schema.createTable('reviews', t => {
    t.increments('id').primary()
    t.integer('producto_id').notNullable().references('id').inTable('productos').onDelete('CASCADE')
    t.integer('usuario_id').references('id').inTable('usuarios').onDelete('SET NULL')
    t.string('nombre_autor', 120) // snapshot por si se borra el usuario
    t.integer('rating').notNullable().checkBetween([1, 5])
    t.string('titulo', 200)
    t.text('contenido').notNullable()
    t.boolean('verificada').notNullable().defaultTo(false)
    t.integer('helpful_count').notNullable().defaultTo(0)
    t.boolean('publicada').notNullable().defaultTo(true)
    t.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now())

    t.index('producto_id')
    t.unique(['producto_id', 'usuario_id']) // 1 review por usuario/producto
  })

  await knex.schema.createTable('carritos', t => {
    t.increments('id').primary()
    t.integer('usuario_id').notNullable().unique()
      .references('id').inTable('usuarios').onDelete('CASCADE')
    t.jsonb('items').notNullable().defaultTo(knex.raw("'[]'::jsonb"))
    t.string('cupon', 40)
    t.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now())
    t.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now())
  })

  // Trigger helper para updated_at
  await knex.raw(`
    CREATE OR REPLACE FUNCTION set_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `)

  for (const table of ['usuarios', 'productos', 'ordenes', 'reviews', 'carritos']) {
    await knex.raw(`
      CREATE TRIGGER ${table}_set_updated_at
      BEFORE UPDATE ON ${table}
      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    `)
  }
}

/** @param {import('knex').Knex} knex */
export async function down(knex) {
  for (const table of ['carritos', 'reviews', 'ordenes', 'productos', 'usuarios']) {
    await knex.raw(`DROP TRIGGER IF EXISTS ${table}_set_updated_at ON ${table}`)
  }
  await knex.raw('DROP FUNCTION IF EXISTS set_updated_at()')
  await knex.schema.dropTableIfExists('carritos')
  await knex.schema.dropTableIfExists('reviews')
  await knex.schema.dropTableIfExists('ordenes')
  await knex.schema.dropTableIfExists('productos')
  await knex.schema.dropTableIfExists('usuarios')
}
