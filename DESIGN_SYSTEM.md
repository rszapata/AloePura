# 🎨 SISTEMA DE DISEÑO - ALOE VERA E-COMMERCE

## 📐 PALETA DE COLORES

### Colores Primarios
```css
:root {
  /* Verde Natura - Principal */
  --color-primary: #2D7B4A;
  --color-primary-light: #3E8F5C;
  --color-primary-lighter: #66BB6A;
  --color-primary-lightest: #E8F5E9;
  
  /* Verde Secundario */
  --color-secondary: #26A69A;
  --color-secondary-light: #4DB8A8;
  --color-secondary-lighter: #80CBC4;
  
  /* Neutrales */
  --color-white: #FFFFFF;
  --color-gray-50: #FAFAF8;
  --color-gray-100: #F5F5F3;
  --color-gray-200: #E8E8E6;
  --color-gray-300: #D8D8D4;
  --color-gray-400: #BDBDBA;
  --color-gray-500: #9E9E9A;
  --color-gray-600: #757571;
  --color-gray-700: #5A5A55;
  --color-gray-800: #4A4A4A;
  --color-gray-900: #2C2C2A;
  --color-black: #1A1A18;
  
  /* Acentos */
  --color-success: #43A047;
  --color-warning: #FB8C00;
  --color-error: #E53935;
  --color-info: #1976D2;
  
  /* Especiales */
  --color-gold: #D4AF37;
  --color-coral: #E88B7B;
  --color-beige: #F5E6D3;
}
```

### Uso de Colores por Contexto
```
PRIMARIO (#2D7B4A):
- Botones principales "Agregar al Carrito"
- Enlaces principales en navegación
- Headers de secciones
- Icons principales

SECUNDARIO (#26A69A):
- Botones secundarios
- Badges "Bestseller"
- Líneas decorativas
- Hover states

NEUTRALES:
- Backgrounds: gray-50/100
- Textos: gray-800/900
- Bordes: gray-200/300

ACENTOS:
- Ofertas/Descuentos: coral (#E88B7B)
- Stock crítico: error (#E53935)
- Envío gratis: success (#43A047)
- Premium/Luxury: gold (#D4AF37)
```

---

## 🔤 SISTEMA TIPOGRÁFICO

### Familias de Fuentes (Google Fonts)

#### Display Font (Títulos principales)
```
PLAYFAIR DISPLAY o GEORGIA
- Serif elegante, luxuoso
- Weights: 400, 700, 900
- Uso: H1 en hero, títulos principales
- Fallback: Georgia, serif
```

#### Body Font (Texto principal)
```
INTER o POPPINS
- Sans-serif moderna, legible
- Weights: 300, 400, 500, 600, 700
- Uso: Párrafos, descripciones, body text
- Fallback: -apple-system, BlinkMacSystemFont, Segoe UI
```

#### Accent Font (Énfasis)
```
MONTSERRAT
- Geometric sans-serif
- Weights: 500, 600, 700, 800
- Uso: Botones, badges, precios, énfasis
- Fallback: system fonts
```

### Escala Tipográfica
```css
/* Títulos */
h1 {
  font-size: 48px;      /* Desktop: 56px */
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.5px;
  font-family: 'Playfair Display', Georgia, serif;
}

h2 {
  font-size: 36px;      /* Desktop: 42px */
  font-weight: 700;
  line-height: 1.3;
  font-family: 'Playfair Display', Georgia, serif;
}

h3 {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.4;
  font-family: 'Playfair Display', Georgia, serif;
}

h4 {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
}

h5 {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
}

h6 {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
}

/* Body */
body, p {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--color-gray-800);
}

/* Small */
small, .text-sm {
  font-size: 14px;
  line-height: 1.5;
}

.text-xs {
  font-size: 12px;
  line-height: 1.4;
}

/* Especiales */
.price {
  font-size: 32px;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  color: var(--color-primary);
}

.button-text {
  font-size: 16px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--color-gray-600);
}
```

---

## 📏 SISTEMA DE ESPACIADO

### Escala de Espaciado (8px base)
```css
--spacing-0: 0;
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;      /* Base estándar */
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-7: 28px;
--spacing-8: 32px;
--spacing-10: 40px;
--spacing-12: 48px;
--spacing-16: 64px;
--spacing-20: 80px;
--spacing-24: 96px;
```

### Espacios Comunes
```
PADDING:
- Componentes: 16px (2 lados), 24px (2 lados)
- Secciones: 40px top/bottom (mobile), 80px (desktop)
- Contenedor: 16px mobile, 32px desktop

MARGIN:
- Entre títulos y contenido: 24px
- Entre secciones: 80px (desktop), 40px (mobile)
- Entre items: 16px

GAP (Grid/Flex):
- Productos: 16px (mobile), 24px (desktop)
- Buttons en fila: 12px
- Lista: 12px
```

---

## 🎯 COMPONENTES BASE - SISTEMA DE TOKENS

### Botones

#### Primario (Verde Principal)
```css
.btn-primary {
  background-color: var(--color-primary);
  color: white;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 300ms ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-primary:hover {
  background-color: var(--color-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(45, 123, 74, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(45, 123, 74, 0.2);
}

.btn-primary:disabled {
  background-color: var(--color-gray-300);
  cursor: not-allowed;
  transform: none;
}
```

#### Secundario (Outline)
```css
.btn-secondary {
  background-color: transparent;
  color: var(--color-primary);
  padding: 12px 32px;
  border: 2px solid var(--color-primary);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 300ms ease;
}

.btn-secondary:hover {
  background-color: var(--color-primary-lightest);
  border-color: var(--color-primary-light);
}
```

#### Texto (Text-Only)
```css
.btn-text {
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  transition: color 300ms ease;
}

.btn-text:hover {
  color: var(--color-primary-light);
}
```

### Inputs

```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--color-gray-300);
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  transition: all 300ms ease;
  background-color: var(--color-white);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(45, 123, 74, 0.1);
}

.input:disabled {
  background-color: var(--color-gray-100);
  cursor: not-allowed;
}

.input::placeholder {
  color: var(--color-gray-500);
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-success {
  background-color: var(--color-primary-lightest);
  color: var(--color-primary);
}

.badge-warning {
  background-color: #FFF3E0;
  color: var(--color-warning);
}

.badge-error {
  background-color: #FFEBEE;
  color: var(--color-error);
}

.badge-gold {
  background-color: #FEF3C7;
  color: #B8860B;
}
```

### Cards

```css
.card {
  background-color: var(--color-white);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--color-gray-200);
  transition: all 300ms ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}
```

---

## 📱 BREAKPOINTS

```css
/* Mobile First */
--breakpoint-xs: 320px   /* Default mobile */
--breakpoint-sm: 640px   /* @media (min-width: 640px) */
--breakpoint-md: 768px   /* Tablet */
--breakpoint-lg: 1024px  /* Desktop */
--breakpoint-xl: 1280px  /* Large desktop */
--breakpoint-2xl: 1536px /* Extra large */

/* Tailwind already handles these */
```

### Patrones Responsivos
```css
/* Grilla productos */
@media (max-width: 640px) {
  grid-template-columns: 1fr;  /* 1 columna mobile */
}

@media (min-width: 640px) {
  grid-template-columns: repeat(2, 1fr);  /* 2 columnas mobile grande */
}

@media (min-width: 768px) {
  grid-template-columns: repeat(3, 1fr);  /* 3 columnas tablet */
}

@media (min-width: 1024px) {
  grid-template-columns: repeat(4, 1fr);  /* 4 columnas desktop */
}
```

---

## 🎬 ANIMACIONES Y TRANSICIONES

### Timing Functions
```css
--timing-fast: 150ms;
--timing-standard: 300ms;
--timing-slow: 500ms;

--easing-linear: linear;
--easing-ease: ease;
--easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
--easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
--easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--easing-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Animaciones Predefinidas
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Bounce */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Pulse (urgencia) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

### Usos Recomendados
```
fadeIn: Carga inicial, modales
slideUp: Contenido que aparece del bottom
scaleIn: Productos, cards
bounce: Notificaciones, CTAs importantes
pulse: Stock bajo, promociones urgentes
```

---

## 🌑 SOPORTE DARK MODE (Futuro)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-white: #1A1A18;
    --color-gray-50: #2C2C2A;
    --color-gray-900: #F5F5F3;
    --color-black: #FFFFFF;
    /* ... */
  }
}
```

---

## 📦 BASE DE DATOS DE PRODUCTOS INICIALES

### JSON Products

```json
{
  "products": [
    {
      "id": "prod_001",
      "name": "Gel Puro de Aloe Vera 100ml",
      "slug": "gel-puro-aloe-100ml",
      "category": "skincare",
      "subcategory": "gels",
      "description": "Gel puro, hidratante y calmante para rostro y cuerpo",
      "longDescription": "Gel 100% puro de aloe vera cultivado en España. Fórmula transparente que absorbe rápidamente sin dejar residuos. Ideal para pieles irritadas, quemaduras solares y deshidratación. Uso diario recomendado.",
      "price": 12.99,
      "originalPrice": 15.99,
      "discount": 18,
      "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
      "images": [
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
        "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500",
        "https://images.unsplash.com/photo-1585966963903-5c3739a57f8f?w=500"
      ],
      "rating": 4.8,
      "reviewCount": 234,
      "stock": 145,
      "sku": "ALO-001-100ML",
      "available": true,
      "specs": {
        "size": "100ml",
        "skinType": ["Todas", "Seca", "Sensible", "Irritada"],
        "ingredients": ["Aloe Vera puro", "Glicerina", "Vitamina E", "Conservantes naturales"],
        "vegan": true,
        "organic": true,
        "dermatologyTested": true,
        "parabenFree": true,
        "sulfateFree": true
      },
      "featured": true,
      "bestseller": true,
      "new": false,
      "tags": ["hidratante", "calmante", "natural", "puro"],
      "benefits": [
        "Hidratación profunda",
        "Efecto calmante inmediato",
        "Reduce inflamación",
        "Regeneración celular"
      ],
      "instructions": "Aplicar en rostro y cuerpo después de limpiar. 2 veces diaria para mejor resultado.",
      "seo": {
        "metaDescription": "Gel puro de aloe vera 100% natural - Hidratación profunda para tu piel",
        "keywords": ["aloe vera", "gel hidratante", "skincare natural"]
      }
    },
    {
      "id": "prod_002",
      "name": "Crema Antienvejecimiento de Aloe",
      "slug": "crema-antienvejecimiento-aloe",
      "category": "skincare",
      "subcategory": "cremas",
      "description": "Crema regeneradora con extracto concentrado de aloe vera",
      "longDescription": "Crema premium con aloe vera concentrado, ácido hialurónico y colágeno marino. Fórmula anti-aging que reduce líneas de expresión, aumenta la elasticidad y proporciona luminosidad natural. Textura ligera, rápida absorción.",
      "price": 24.99,
      "originalPrice": 29.99,
      "discount": 16,
      "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
      "images": [
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
        "https://images.unsplash.com/photo-1585966963903-5c3739a57f8f?w=500"
      ],
      "rating": 4.6,
      "reviewCount": 89,
      "stock": 67,
      "sku": "ALO-002-50ML",
      "available": true,
      "specs": {
        "size": "50ml",
        "skinType": ["Madura", "Seca", "Todas"],
        "ingredients": ["Aloe Vera", "Ácido Hialurónico", "Colágeno marino", "Vitamina C"],
        "vegan": false,
        "organic": true,
        "dermatologyTested": true,
        "parabenFree": true,
        "sulfateFree": true
      },
      "featured": true,
      "bestseller": false,
      "new": true,
      "tags": ["antienvejecimiento", "antiedad", "crema", "premium"],
      "benefits": [
        "Reduce líneas de expresión",
        "Aumenta elasticidad",
        "Protección antioxidante",
        "Luminosidad y firmeza"
      ],
      "instructions": "Aplicar por la mañana y noche en rostro y cuello con ligero masaje.",
      "seo": {
        "metaDescription": "Crema antienvejecimiento con aloe vera - Rejuvenecimiento natural",
        "keywords": ["crema antiedad", "antienvejecimiento", "aloe vera premium"]
      }
    },
    {
      "id": "prod_003",
      "name": "Sérum Facial de Aloe + Vitamina C",
      "slug": "serum-facial-aloe-vitamina-c",
      "category": "skincare",
      "subcategory": "serums",
      "description": "Sérum luminoso con potencia antioxidante",
      "longDescription": "Sérum concentrado con aloe vera puro y vitamina C estabilizada. Fórmula poderosa que ilumina, revitaliza y protege la piel. Ideal para pieles opacas, con manchas y signos de envejecimiento. Absorción rápida, sin residuos grasosos.",
      "price": 18.99,
      "originalPrice": 22.99,
      "discount": 17,
      "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
      "images": [
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500"
      ],
      "rating": 4.9,
      "reviewCount": 234,
      "stock": 89,
      "sku": "ALO-003-30ML",
      "available": true,
      "specs": {
        "size": "30ml",
        "skinType": ["Todas", "Opaca", "Manchada"],
        "ingredients": ["Aloe Vera", "Vitamina C", "Niacinamida", "Ácido Ferúlico"],
        "vegan": true,
        "organic": true,
        "dermatologyTested": true,
        "parabenFree": true,
        "sulfateFree": true
      },
      "featured": true,
      "bestseller": true,
      "new": false,
      "tags": ["sérum", "vitamina-c", "radiancia", "antioxidante"],
      "benefits": [
        "Radiancia inmediata",
        "Protección antioxidante",
        "Piel uniforme y luminosa",
        "Antiedad potente"
      ],
      "instructions": "Aplicar 2-3 gotas en rostro limpio, antes de la crema hidratante.",
      "seo": {
        "metaDescription": "Sérum facial con vitamina C y aloe vera - Radiancia y protección",
        "keywords": ["sérum vitamina c", "sérum aloe vera", "sérum antiedad"]
      }
    },
    {
      "id": "prod_004",
      "name": "Mascarilla Detox de Aloe y Carbón",
      "slug": "mascarilla-detox-aloe-carbon",
      "category": "skincare",
      "subcategory": "mascarillas",
      "description": "Mascarilla purificante con carbón activado y aloe vera",
      "longDescription": "Mascarilla intensiva que limpia profundamente los poros. Combina carbón activado con aloe vera para purificar sin resecar. Ideal para pieles grasas y mixtas. Aplicación semanal para resultados óptimos.",
      "price": 14.99,
      "originalPrice": 18.99,
      "discount": 21,
      "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
      "images": [],
      "rating": 4.5,
      "reviewCount": 45,
      "stock": 120,
      "sku": "ALO-004-100ML",
      "available": true,
      "specs": {
        "size": "100ml",
        "skinType": ["Grasa", "Mixta"],
        "ingredients": ["Aloe Vera", "Carbón activado", "Arcilla", "Té verde"],
        "vegan": true,
        "organic": true,
        "dermatologyTested": true,
        "parabenFree": true,
        "sulfateFree": true
      },
      "featured": false,
      "bestseller": false,
      "new": true,
      "tags": ["mascarilla", "detox", "carbon", "purificante"],
      "benefits": [
        "Limpieza profunda",
        "Purifica poros",
        "Controla sebo",
        "Refrescante"
      ],
      "instructions": "Aplicar en rostro limpio, dejar 10-15 minutos, enjuagar con agua tibia.",
      "seo": {
        "metaDescription": "Mascarilla detox con carbón y aloe vera - Purificación profunda",
        "keywords": ["mascarilla carbón", "mascarilla detox", "limpieza profunda"]
      }
    },
    {
      "id": "prod_005",
      "name": "Loción Corporal Aloe Vera 250ml",
      "slug": "locion-corporal-aloe-250ml",
      "category": "body",
      "subcategory": "locion-corporal",
      "description": "Loción hidratante para cuerpo con aloe vera 100% natural",
      "longDescription": "Loción ligera pero intensamente hidratante. Absorción rápida, aroma natural suave. Ideal para pieles secas después del baño o ducha. Mantiene la piel hidratada durante todo el día.",
      "price": 9.99,
      "originalPrice": 11.99,
      "discount": 16,
      "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
      "images": [],
      "rating": 4.7,
      "reviewCount": 156,
      "stock": 267,
      "sku": "ALO-005-250ML",
      "available": true,
      "specs": {
        "size": "250ml",
        "skinType": ["Todas"],
        "ingredients": ["Aloe Vera", "Manteca de karité", "Vitamina E"],
        "vegan": true,
        "organic": true,
        "dermatologyTested": true,
        "parabenFree": true,
        "sulfateFree": true
      },
      "featured": false,
      "bestseller": false,
      "new": false,
      "tags": ["loción", "cuerpo", "hidratante", "económica"],
      "benefits": [
        "Hidratación 24 horas",
        "Absorción rápida",
        "Aroma natural",
        "Textura ligera"
      ],
      "instructions": "Aplicar sobre piel limpia y seca, masajear suavemente.",
      "seo": {
        "metaDescription": "Loción corporal con aloe vera - Hidratación natural",
        "keywords": ["loción cuerpo", "aloe vera loción", "hidratante natural"]
      }
    },
    {
      "id": "prod_006",
      "name": "Stick Labial Aloe y Manteca de Cacao",
      "slug": "stick-labial-aloe-cacao",
      "category": "body",
      "subcategory": "labios",
      "description": "Bálsamo labial hidratante con aloe vera",
      "longDescription": "Stick labial suave con fórmula natural. Contiene aloe vera hidratante y manteca de cacao nutritiva. Protege y regenera los labios secos. Tamaño perfecto para llevar siempre contigo.",
      "price": 5.99,
      "originalPrice": 7.99,
      "discount": 25,
      "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500",
      "images": [],
      "rating": 4.6,
      "reviewCount": 78,
      "stock": 345,
      "sku": "ALO-006-4.5G",
      "available": true,
      "specs": {
        "size": "4.5g",
        "skinType": ["Todas"],
        "ingredients": ["Aloe Vera", "Manteca de cacao", "Vitamina E", "Aceite de jojoba"],
        "vegan": false,
        "organic": true,
        "dermatologyTested": true,
        "parabenFree": true,
        "sulfateFree": true
      },
      "featured": false,
      "bestseller": false,
      "new": false,
      "tags": ["labios", "bálsamo", "portátil", "económico"],
      "benefits": [
        "Hidratación labios",
        "Reparación",
        "Portátil",
        "Aroma natural"
      ],
      "instructions": "Aplicar sobre labios limpios según sea necesario.",
      "seo": {
        "metaDescription": "Stick labial con aloe vera - Hidratación natural",
        "keywords": ["bálsamo labios", "stick labial", "labios secos"]
      }
    }
  ]
}
```

### Categorías
```json
{
  "categories": [
    {
      "id": "cat_skincare",
      "name": "Skincare",
      "slug": "skincare",
      "description": "Productos para el cuidado del rostro",
      "icon": "face",
      "image": "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500"
    },
    {
      "id": "cat_body",
      "name": "Cuerpo",
      "slug": "body",
      "description": "Productos para el cuerpo",
      "icon": "heart",
      "image": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500"
    },
    {
      "id": "cat_hair",
      "name": "Cabello",
      "slug": "hair",
      "description": "Productos para el cabello",
      "icon": "feather",
      "image": "https://images.unsplash.com/photo-1585966963903-5c3739a57f8f?w=500"
    },
    {
      "id": "cat_supplements",
      "name": "Suplementos",
      "slug": "supplements",
      "description": "Suplementos y bebibles",
      "icon": "pill",
      "image": "https://images.unsplash.com/photo-1584308666744-24d5f400f8f6?w=500"
    }
  ]
}
```

### Testimonios
```json
{
  "testimonials": [
    {
      "id": "test_001",
      "author": "María García",
      "rating": 5,
      "content": "Cambió completamente mi piel. Llevo 3 meses usando el gel y los resultados son increíbles. Super recomendado!",
      "verified": true,
      "product": "Gel Puro de Aloe Vera 100ml"
    },
    {
      "id": "test_002",
      "author": "Juan Rodríguez",
      "rating": 5,
      "content": "La mejor crema antienvejecimiento que he probado. A un precio justo y calidad premium. Mi dermatólogo la recomendó.",
      "verified": true,
      "product": "Crema Antienvejecimiento de Aloe"
    },
    {
      "id": "test_003",
      "author": "Laura Martínez",
      "rating": 5,
      "content": "El sérum es increíble. Mi piel brilla y se ve mucho más joven. Vale cada euro invertido.",
      "verified": true,
      "product": "Sérum Facial de Aloe + Vitamina C"
    }
  ]
}
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN DE DISEÑO

- [ ] Importar Google Fonts (Playfair Display, Inter, Montserrat)
- [ ] Configurar CSS variables (colores, espaciado, tipografía)
- [ ] Crear componentes base (Button, Input, Badge)
- [ ] Implementar animaciones CSS
- [ ] Configurar Tailwind config personalizado
- [ ] Testing responsive en todos los breakpoints
- [ ] Verificar accesibilidad (contraste, WCAG)
- [ ] Optimizar tipografía para performance

---

*Documento versión 1.0 - Actualizado 18/04/2026*
