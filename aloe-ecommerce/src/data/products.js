export const products = [
  {
    id: 1,
    slug: 'gel-puro-aloe-100ml',
    name: 'Gel Puro Aloe 100ml',
    price: 12.99,
    oldPrice: 15.99,
    badge: 'Bestseller',
    badgeType: 'secondary',
    description:
      'Gel puro de aloe vera al 99% directo de nuestra planta. Hidratación intensa y calmante para todo tipo de pieles.',
    longDescription:
      'Gel 100% puro extraído de hojas de aloe vera cultivadas en Fuerteventura. De rápida absorción, calma rojeces, quemaduras solares y sirve como base de hidratación diaria. Sin alcohol, sin parabenos, sin colorantes.',
    rating: 4.9,
    reviewsCount: 342,
    stock: 50,
    category: 'geles',
    benefits: [
      'Hidratación profunda sin sensación grasa',
      'Calma rojeces y quemaduras solares',
      'Apto para pieles sensibles y atópicas',
      'Efecto refrescante inmediato',
    ],
    specs: {
      Formato: '100 ml',
      Uso: 'Facial y corporal',
      Ingredientes: 'Aloe Barbadensis 99%, Glicerina vegetal',
      Certificación: 'ECO CAAE · Cruelty Free',
      Origen: 'Fuerteventura, España',
      Caducidad: '12 meses tras apertura',
    },
    reviews: [
      { id: 1, name: 'María G.', rating: 5, date: '2026-03-10', text: 'Mi piel está mucho más hidratada desde la primera semana. 100% recomendado.' },
      { id: 2, name: 'Elena P.', rating: 5, date: '2026-02-22', text: 'Textura ligera, se absorbe rápido. Perfecto para después de la playa.' },
      { id: 3, name: 'Sara L.', rating: 4, date: '2026-02-05', text: 'Muy buen producto. El envase podría ser un poco más grande.' },
    ],
  },
  {
    id: 2,
    slug: 'crema-antienvejecimiento',
    name: 'Crema Antienvejecimiento',
    price: 24.99,
    oldPrice: null,
    badge: 'Nuevo',
    badgeType: 'primary',
    description:
      'Fórmula avanzada con aloe vera y ácido hialurónico. Reduce arrugas visiblemente en 4 semanas.',
    longDescription:
      'Nuestra crema antiedad combina aloe vera puro, ácido hialurónico de bajo peso molecular y vitamina E. Clínicamente testada: -27% de líneas de expresión tras 4 semanas de uso.',
    rating: 4.8,
    reviewsCount: 156,
    stock: 30,
    category: 'cremas',
    benefits: [
      'Reduce arrugas y líneas de expresión',
      'Reafirma el contorno facial',
      'Hidrata durante 48h',
      'Textura ligera, no comedogénica',
    ],
    specs: {
      Formato: '50 ml',
      Uso: 'Facial día/noche',
      Ingredientes: 'Aloe Vera 40%, Ácido Hialurónico, Vitamina E',
      Certificación: 'ECO CAAE · Dermatólogo testado',
      Origen: 'Fuerteventura, España',
      Caducidad: '12 meses tras apertura',
    },
    reviews: [
      { id: 1, name: 'Carlos R.', rating: 5, date: '2026-03-01', text: 'Textura ligera, se absorbe rápido. Noto la piel más firme tras un mes.' },
      { id: 2, name: 'Patricia M.', rating: 5, date: '2026-02-15', text: 'Lo que promete, lo cumple. La mejor crema antiedad natural que he probado.' },
    ],
  },
  {
    id: 3,
    slug: 'serum-facial',
    name: 'Sérum Facial',
    price: 18.99,
    oldPrice: 22.99,
    badge: 'Bestseller',
    badgeType: 'secondary',
    description:
      'Sérum concentrado con vitamina C y aloe vera. Luminosidad y uniformidad del tono de piel.',
    longDescription:
      'Sérum de alta concentración con 15% de vitamina C estabilizada y aloe vera. Ilumina, unifica el tono y protege del daño oxidativo causado por la contaminación.',
    rating: 4.9,
    reviewsCount: 287,
    stock: 45,
    category: 'serums',
    benefits: [
      'Luminosidad y tono uniforme',
      'Antioxidante de alto rendimiento',
      'Reduce manchas en 6 semanas',
      'Pre-base de maquillaje perfecta',
    ],
    specs: {
      Formato: '30 ml',
      Uso: 'Facial mañana',
      Ingredientes: 'Vitamina C 15%, Aloe Vera, Niacinamida',
      Certificación: 'ECO CAAE · Vegano',
      Origen: 'Fuerteventura, España',
      Caducidad: '6 meses tras apertura',
    },
    reviews: [
      { id: 1, name: 'Lucía M.', rating: 5, date: '2026-03-12', text: 'Me ha dado un brillo espectacular. Volveré a comprar seguro.' },
      { id: 2, name: 'Ana V.', rating: 5, date: '2026-02-28', text: 'Perfecto bajo el maquillaje. Mi piel luce más uniforme.' },
    ],
  },
  {
    id: 4,
    slug: 'mascarilla-detox',
    name: 'Mascarilla Detox',
    price: 14.99,
    oldPrice: null,
    badge: null,
    badgeType: null,
    description:
      'Mascarilla purificante con arcilla verde y aloe vera. Limpieza profunda de poros y control del sebo.',
    longDescription:
      'Mascarilla semanal con arcilla verde francesa, aloe vera y carbón activado. Purifica los poros sin resecar la piel.',
    rating: 4.7,
    reviewsCount: 94,
    stock: 25,
    category: 'mascarillas',
    benefits: [
      'Limpieza profunda de poros',
      'Control del exceso de sebo',
      'Textura cremosa no reseca',
      'Resultados visibles en 1 uso',
    ],
    specs: {
      Formato: '75 ml',
      Uso: 'Facial 1-2 veces/semana',
      Ingredientes: 'Arcilla verde, Aloe Vera, Carbón activado',
      Certificación: 'ECO CAAE · Vegano',
      Origen: 'Fuerteventura, España',
      Caducidad: '12 meses tras apertura',
    },
    reviews: [
      { id: 1, name: 'Laura F.', rating: 5, date: '2026-03-05', text: 'Mis poros se ven mucho más limpios. Me encanta.' },
    ],
  },
  {
    id: 5,
    slug: 'locion-corporal-250ml',
    name: 'Loción Corporal 250ml',
    price: 9.99,
    oldPrice: null,
    badge: null,
    badgeType: null,
    description:
      'Loción hidratante corporal de rápida absorción. Piel suave y nutrida durante todo el día.',
    longDescription:
      'Loción corporal ligera con aloe vera y manteca de karité. Ideal para uso diario tras la ducha.',
    rating: 4.8,
    reviewsCount: 211,
    stock: 60,
    category: 'cuerpo',
    benefits: [
      'Hidratación 24h',
      'Absorción rápida sin pegajoso',
      'Aroma suave natural',
      'Formato familiar 250 ml',
    ],
    specs: {
      Formato: '250 ml',
      Uso: 'Corporal diario',
      Ingredientes: 'Aloe Vera 30%, Karité, Almendra dulce',
      Certificación: 'ECO CAAE',
      Origen: 'Fuerteventura, España',
      Caducidad: '12 meses tras apertura',
    },
    reviews: [
      { id: 1, name: 'Marta B.', rating: 5, date: '2026-03-08', text: 'Me dura muchísimo y huele de maravilla.' },
    ],
  },
  {
    id: 6,
    slug: 'stick-labial',
    name: 'Stick Labial',
    price: 5.99,
    oldPrice: null,
    badge: null,
    badgeType: null,
    description:
      'Bálsamo labial nutritivo con aloe vera y aceite de argán. Labios hidratados y protegidos.',
    longDescription:
      'Stick de bolsillo con aloe vera, argán y cera de abeja. Protege frente al frío y el sol.',
    rating: 4.9,
    reviewsCount: 167,
    stock: 80,
    category: 'labios',
    benefits: [
      'Hidratación intensa',
      'Protección frente al frío',
      'Formato de bolsillo',
      'Sin sabor artificial',
    ],
    specs: {
      Formato: '4.5 g',
      Uso: 'Labios, tantas veces como sea necesario',
      Ingredientes: 'Aloe Vera, Argán, Cera de abeja',
      Certificación: 'ECO CAAE',
      Origen: 'Fuerteventura, España',
      Caducidad: '18 meses tras apertura',
    },
    reviews: [
      { id: 1, name: 'Inés R.', rating: 5, date: '2026-03-14', text: 'Lo llevo siempre en el bolso. Salva labios.' },
    ],
  },
]

export const featuredProducts = products.slice(0, 3)

export function getProductById(id) {
  return products.find(p => p.id === Number(id))
}

export function getRelatedProducts(id, limit = 3) {
  const current = getProductById(id)
  if (!current) return []
  const sameCat = products.filter(p => p.id !== current.id && p.category === current.category)
  const others = products.filter(p => p.id !== current.id && p.category !== current.category)
  return [...sameCat, ...others].slice(0, limit)
}
