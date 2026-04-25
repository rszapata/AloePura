/**
 * Seed inicial: los 6 productos que estaban hardcoded en
 * frontend src/data/products.js, migrados a PostgreSQL.
 *
 * @param {import('knex').Knex} knex
 */
export async function seed(knex) {
  // Orden importa por FKs: reviews -> productos
  await knex('reviews').del()
  await knex('productos').del()
  await knex.raw('ALTER SEQUENCE productos_id_seq RESTART WITH 1')

  const products = [
    {
      nombre: 'Gel Puro Aloe 100ml',
      slug: 'gel-puro-aloe-100ml',
      descripcion: 'Gel puro de aloe vera al 99% directo de nuestra planta. Hidratación intensa y calmante para todo tipo de pieles.',
      descripcion_larga: 'Gel 100% puro extraído de hojas de aloe vera cultivadas en Fuerteventura. De rápida absorción, calma rojeces, quemaduras solares y sirve como base de hidratación diaria. Sin alcohol, sin parabenos, sin colorantes.',
      precio: 12.99,
      precio_original: 15.99,
      descuento: 19,
      categoria: 'geles',
      rating: 4.9,
      review_count: 342,
      stock: 50,
      sku: 'ALO-GEL-100',
      imagenes: JSON.stringify([]),
      beneficios: JSON.stringify([
        'Hidratación profunda sin sensación grasa',
        'Calma rojeces y quemaduras solares',
        'Apto para pieles sensibles y atópicas',
        'Efecto refrescante inmediato',
      ]),
      especificaciones: JSON.stringify({
        Formato: '100 ml',
        Uso: 'Facial y corporal',
        Ingredientes: 'Aloe Barbadensis 99%, Glicerina vegetal',
        Certificacion: 'ECO CAAE · Cruelty Free',
        Origen: 'Fuerteventura, España',
        Caducidad: '12 meses tras apertura',
      }),
      ingredientes: JSON.stringify(['Aloe Barbadensis Leaf Juice 99%', 'Glycerin', 'Xanthan Gum']),
      vegan: true, organico: true, dermatology_tested: true, featured: true, bestseller: true,
    },
    {
      nombre: 'Crema Antienvejecimiento',
      slug: 'crema-antienvejecimiento',
      descripcion: 'Fórmula avanzada con aloe vera y ácido hialurónico. Reduce arrugas visiblemente en 4 semanas.',
      descripcion_larga: 'Nuestra crema antiedad combina aloe vera puro, ácido hialurónico de bajo peso molecular y vitamina E. Clínicamente testada: -27% de líneas de expresión tras 4 semanas de uso.',
      precio: 24.99, precio_original: null, descuento: null,
      categoria: 'cremas', rating: 4.8, review_count: 156, stock: 30,
      sku: 'ALO-CRM-050',
      imagenes: JSON.stringify([]),
      beneficios: JSON.stringify([
        'Reduce arrugas y líneas de expresión',
        'Reafirma el contorno facial',
        'Hidrata durante 48h',
        'Textura ligera, no comedogénica',
      ]),
      especificaciones: JSON.stringify({
        Formato: '50 ml', Uso: 'Facial día/noche',
        Ingredientes: 'Aloe Vera 40%, Ácido Hialurónico, Vitamina E',
        Certificacion: 'ECO CAAE · Dermatólogo testado',
        Origen: 'Fuerteventura, España', Caducidad: '12 meses tras apertura',
      }),
      ingredientes: JSON.stringify(['Aloe Barbadensis Leaf Juice', 'Sodium Hyaluronate', 'Tocopherol', 'Glycerin']),
      vegan: true, organico: true, dermatology_tested: true, featured: true, bestseller: false,
    },
    {
      nombre: 'Sérum Facial',
      slug: 'serum-facial',
      descripcion: 'Sérum concentrado con vitamina C y aloe vera. Luminosidad y uniformidad del tono de piel.',
      descripcion_larga: 'Sérum de alta concentración con 15% de vitamina C estabilizada y aloe vera. Ilumina, unifica el tono y protege del daño oxidativo causado por la contaminación.',
      precio: 18.99, precio_original: 22.99, descuento: 17,
      categoria: 'serums', rating: 4.9, review_count: 287, stock: 45,
      sku: 'ALO-SER-030',
      imagenes: JSON.stringify([]),
      beneficios: JSON.stringify([
        'Luminosidad y tono uniforme',
        'Antioxidante de alto rendimiento',
        'Reduce manchas en 6 semanas',
        'Pre-base de maquillaje perfecta',
      ]),
      especificaciones: JSON.stringify({
        Formato: '30 ml', Uso: 'Facial mañana',
        Ingredientes: 'Vitamina C 15%, Aloe Vera, Niacinamida',
        Certificacion: 'ECO CAAE · Vegano',
        Origen: 'Fuerteventura, España', Caducidad: '6 meses tras apertura',
      }),
      ingredientes: JSON.stringify(['Ascorbic Acid 15%', 'Aloe Barbadensis Leaf Juice', 'Niacinamide']),
      vegan: true, organico: true, dermatology_tested: true, featured: true, bestseller: true,
    },
    {
      nombre: 'Mascarilla Detox',
      slug: 'mascarilla-detox',
      descripcion: 'Mascarilla purificante con arcilla verde y aloe vera. Limpieza profunda de poros y control del sebo.',
      descripcion_larga: 'Mascarilla semanal con arcilla verde francesa, aloe vera y carbón activado. Purifica los poros sin resecar la piel.',
      precio: 14.99, precio_original: null, descuento: null,
      categoria: 'mascarillas', rating: 4.7, review_count: 94, stock: 25,
      sku: 'ALO-MSK-075',
      imagenes: JSON.stringify([]),
      beneficios: JSON.stringify([
        'Limpieza profunda de poros',
        'Control del exceso de sebo',
        'Textura cremosa no reseca',
        'Resultados visibles en 1 uso',
      ]),
      especificaciones: JSON.stringify({
        Formato: '75 ml', Uso: 'Facial 1-2 veces/semana',
        Ingredientes: 'Arcilla verde, Aloe Vera, Carbón activado',
        Certificacion: 'ECO CAAE · Vegano',
        Origen: 'Fuerteventura, España', Caducidad: '12 meses tras apertura',
      }),
      ingredientes: JSON.stringify(['Kaolin', 'Aloe Barbadensis Leaf Juice', 'Charcoal Powder']),
      vegan: true, organico: true, dermatology_tested: true, featured: false, bestseller: false,
    },
    {
      nombre: 'Loción Corporal 250ml',
      slug: 'locion-corporal-250ml',
      descripcion: 'Loción hidratante corporal de rápida absorción. Piel suave y nutrida durante todo el día.',
      descripcion_larga: 'Loción corporal ligera con aloe vera y manteca de karité. Ideal para uso diario tras la ducha.',
      precio: 9.99, precio_original: null, descuento: null,
      categoria: 'cuerpo', rating: 4.8, review_count: 211, stock: 60,
      sku: 'ALO-BOD-250',
      imagenes: JSON.stringify([]),
      beneficios: JSON.stringify([
        'Hidratación 24h',
        'Absorción rápida sin pegajoso',
        'Aroma suave natural',
        'Formato familiar 250 ml',
      ]),
      especificaciones: JSON.stringify({
        Formato: '250 ml', Uso: 'Corporal diario',
        Ingredientes: 'Aloe Vera 30%, Karité, Almendra dulce',
        Certificacion: 'ECO CAAE',
        Origen: 'Fuerteventura, España', Caducidad: '12 meses tras apertura',
      }),
      ingredientes: JSON.stringify(['Aloe Barbadensis Leaf Juice', 'Butyrospermum Parkii Butter', 'Prunus Amygdalus Dulcis Oil']),
      vegan: true, organico: true, dermatology_tested: false, featured: false, bestseller: false,
    },
    {
      nombre: 'Stick Labial',
      slug: 'stick-labial',
      descripcion: 'Bálsamo labial nutritivo con aloe vera y aceite de argán. Labios hidratados y protegidos.',
      descripcion_larga: 'Stick de bolsillo con aloe vera, argán y cera de abeja. Protege frente al frío y el sol.',
      precio: 5.99, precio_original: null, descuento: null,
      categoria: 'labios', rating: 4.9, review_count: 167, stock: 80,
      sku: 'ALO-LIP-004',
      imagenes: JSON.stringify([]),
      beneficios: JSON.stringify([
        'Hidratación intensa',
        'Protección frente al frío',
        'Formato de bolsillo',
        'Sin sabor artificial',
      ]),
      especificaciones: JSON.stringify({
        Formato: '4.5 g', Uso: 'Labios, tantas veces como sea necesario',
        Ingredientes: 'Aloe Vera, Argán, Cera de abeja',
        Certificacion: 'ECO CAAE',
        Origen: 'Fuerteventura, España', Caducidad: '18 meses tras apertura',
      }),
      ingredientes: JSON.stringify(['Aloe Barbadensis Leaf Juice', 'Argania Spinosa Kernel Oil', 'Cera Alba']),
      vegan: false, organico: true, dermatology_tested: false, featured: false, bestseller: false,
    },
  ]

  const inserted = await knex('productos').insert(products).returning(['id', 'nombre'])
  console.log(`  → ${inserted.length} productos insertados`)

  // Reviews de ejemplo
  const byName = Object.fromEntries(inserted.map(p => [p.nombre, p.id]))
  await knex('reviews').insert([
    { producto_id: byName['Gel Puro Aloe 100ml'], nombre_autor: 'María G.', rating: 5, titulo: 'Increíble', contenido: 'Mi piel está mucho más hidratada desde la primera semana. 100% recomendado.', verificada: true },
    { producto_id: byName['Gel Puro Aloe 100ml'], nombre_autor: 'Elena P.', rating: 5, titulo: 'Perfecto verano', contenido: 'Textura ligera, se absorbe rápido. Perfecto para después de la playa.', verificada: true },
    { producto_id: byName['Crema Antienvejecimiento'], nombre_autor: 'Carlos R.', rating: 5, titulo: 'Se nota', contenido: 'Textura ligera, se absorbe rápido. Noto la piel más firme tras un mes.', verificada: true },
    { producto_id: byName['Sérum Facial'], nombre_autor: 'Lucía M.', rating: 5, titulo: 'Brillo espectacular', contenido: 'Me ha dado un brillo espectacular. Volveré a comprar seguro.', verificada: true },
    { producto_id: byName['Mascarilla Detox'], nombre_autor: 'Laura F.', rating: 5, titulo: 'Poros limpios', contenido: 'Mis poros se ven mucho más limpios. Me encanta.', verificada: true },
    { producto_id: byName['Loción Corporal 250ml'], nombre_autor: 'Marta B.', rating: 5, titulo: 'Muy rentable', contenido: 'Me dura muchísimo y huele de maravilla.', verificada: true },
    { producto_id: byName['Stick Labial'], nombre_autor: 'Inés R.', rating: 5, titulo: 'Salva labios', contenido: 'Lo llevo siempre en el bolso. Salva labios.', verificada: true },
  ])
  console.log('  → reviews de ejemplo insertadas')
}
