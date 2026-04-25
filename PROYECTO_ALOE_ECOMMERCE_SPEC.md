# 🌿 PROYECTO E-COMMERCE ALOE VERA - ESPECIFICACIÓN COMPLETA

## 📋 ÍNDICE
1. [Visión y Objetivos](#visión-y-objetivos)
2. [Arquitectura de Sitio](#arquitectura-de-sitio)
3. [Diseño UX/UI](#diseño-uxui)
4. [Requerimientos Técnicos](#requerimientos-técnicos)
5. [Flujos de Usuario](#flujos-de-usuario)
6. [Especificaciones de Página](#especificaciones-de-página)
7. [Cumplimiento Legal](#cumplimiento-legal)
8. [Optimización CRO](#optimización-cro)

---

## 🎯 VISIÓN Y OBJETIVOS

### Visión General
Crear una tienda online premium para la venta de productos de aloe vera 100% natural, dirigida al mercado español. La plataforma debe transmitir confianza, calidad y sostenibilidad, optimizada para convertir visitantes en compradores.

### Objetivos Principales
- **Conversión**: Maximizar el CTR (Click-Through Rate) y CR (Conversion Rate)
- **Confianza**: Transmitir calidad, origen local y seguridad
- **Experiencia**: Mobile-first, rápida, intuitiva
- **Cumplimiento**: RGPD, regulaciones de e-commerce españolas
- **Retención**: Fomentar compras recurrentes

### Público Objetivo
- **Principal**: Mujeres 25-55 años, conscientes de salud y skincare natural
- **Secundario**: Hombres 30-50 años, cuidado personal premium
- **Terciario**: Emprendedores de wellness, tiendas físicas que busquen distribuidores

---

## 🏗️ ARQUITECTURA DE SITIO

### Estructura de Páginas
```
inicio/
├── Homepage (con hero, destacados, testimonios)
├── /productos
│   ├── Catálogo (con filtros)
│   ├── /producto/[id]
│   └── /producto/[id]/reviews
├── /cuenta
│   ├── /login
│   ├── /registro
│   ├── /perfil
│   └── /mis-compras
├── /carrito
├── /checkout
├── /confirmacion
├── /acerca-de
├── /contacto
├── /blog (opcional, para SEO)
├── /faq
└── /politicas
    ├── privacidad
    ├── cookies
    └── devoluciones
```

---

## 🎨 DISEÑO UX/UI

### Identidad Visual

#### Paleta de Colores
```
PRIMARIO:
- Verde Natura: #2D7B4A (confianza, naturaleza)
- Verde Claro: #66BB6A (energía, vitalidad)

SECUNDARIO:
- Blanco Cálido: #FAFAF8 (minimalismo)
- Beige Natural: #F5E6D3 (organicidad)
- Gris Sofisticado: #4A4A4A (texto)

ACENTOS:
- Verde Menta: #26A69A (botones secundarios)
- Coral Suave: #E88B7B (ofertas/urgencia)
- Oro Natural: #D4AF37 (premium)

FUNCIONALES:
- Error: #E53935
- Éxito: #43A047
- Advertencia: #FB8C00
```

#### Tipografía
```
DISPLAY (Títulos principales):
- Fuente: Playfair Display o Georgia (serif elegante)
- Uso: H1, H2 principales, hero

BODY (Textos):
- Fuente: Inter, Poppins o Segoe UI (sans-serif moderna)
- Uso: Párrafos, descripciones

ACCENTO (CTA y etiquetas):
- Fuente: Montserrat Bold
- Uso: Botones, badges, precios
```

#### Elementos de Diseño
- **Iconografía**: Línea fina, minimalista (lucide-react)
- **Espaciado**: Generoso, respira (grid de 8px)
- **Bordes**: Sutiles, radio 8px-16px
- **Sombras**: Suaves, múltiples capas
- **Animaciones**: Transiciones 300-500ms, easing smooth

---

## 📱 REQUERIMIENTOS TÉCNICOS

### Stack Tecnológico
```
FRONTEND:
- React (componentes funcionales)
- Tailwind CSS (styling)
- React Icons / Lucide React (iconografía)
- React Router (navegación)
- Zustand o Context API (state management)

BACKEND (Recomendado):
- Node.js + Express / Next.js API Routes
- MongoDB o PostgreSQL
- Stripe API (pagos internacionales)
- Redsys SDK (pago local españa)

HOSTING:
- Vercel, Netlify o AWS (frontend)
- Firebase, Railway o Render (backend)
```

### Requisitos Funcionales Core
- [x] Catálogo dinámico de productos
- [x] Sistema de carrito persistente (localStorage)
- [x] Gestión de usuarios (registro/login)
- [x] Búsqueda y filtros avanzados
- [x] Sistema de calificaciones y reviews
- [x] Integración de pagos (múltiples métodos)
- [x] Notificaciones por email
- [x] Panel de administración básico
- [x] Analytics (Google Analytics 4)
- [x] SEO optimizado

### Performance
- **Lighthouse Score**: Min 90 (Desktop), 80 (Mobile)
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1
- **Time to Interactive**: <3s en 4G
- **Images**: Optimizadas, lazy loading, formato WebP

---

## 👥 FLUJOS DE USUARIO

### FLUJO 1: Navegación y Descubrimiento
```
1. Usuario llega a homepage
2. Lee banner de promoción (top bar)
3. Explora hero section
4. Ve productos destacados
5. Clickea en producto → Product Page
6. Lee reviews y especificaciones
7. Agrega a carrito
8. Continúa comprando o checkout
```

### FLUJO 2: Compra Completa
```
1. Usuario ve carrito (ícono con contador)
2. Revisa carrito (modal o página dedicada)
3. Aplica cupón (si existe)
4. Va a checkout
5. Login/Registro rápido (email + password)
6. Dirección de envío
7. Método de pago (selector visual)
8. Revisión final
9. Confirmación + email
10. Redirección a página de éxito
```

### FLUJO 3: Gestión de Cuenta
```
1. Login desde navbar
2. Dashboard personal:
   - Mis compras (historial)
   - Dirección guardadas
   - Método de pago guardado
   - Wishlist
   - Datos personales
```

---

## 🖥️ ESPECIFICACIONES DE PÁGINA

### 1. HOMEPAGE

#### Secciones (Mobile-First)
```
┌─────────────────────────────────────┐
│ TOP BAR (Fijo)                      │
│ "Envío gratis en pedidos > 30€"    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ NAVBAR                              │
│ Logo | Menu | Search | User | Cart │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ HERO SECTION                        │
│ Imagen + Texto + CTA                │
│ "La Naturaleza en tu Piel"         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ PRODUCTOS DESTACADOS (Bestsellers)  │
│ [Card] [Card] [Card]                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ CATEGORÍAS (Grid)                   │
│ Skincare | Cuerpo | Cabello | etc  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ TESTIMONIOS / SOCIAL PROOF           │
│ ⭐⭐⭐⭐⭐ "Cambió mi piel..."       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ VENTAJAS (4 Columnas)               │
│ ✓ 100% Natural | ✓ Local            │
│ ✓ Dermatólogo | ✓ Garantía         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ NEWSLETTER CTA                      │
│ Email input + Submit                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ FOOTER                              │
│ Links | Pagos | Contacto | Social  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ COOKIE BANNER (RGPD)                │
│ [Aceptar] [Configurar] [Rechazar]   │
└─────────────────────────────────────┘
```

#### Elementos Clave - TOP BAR
- Altura: 40px (móvil), 48px (desktop)
- Fondo: Verde oscuro (#2D7B4A)
- Texto: Blanco, centrado, rotación de mensajes
- Mensajes:
  - "🚚 Envío gratis en pedidos > 30€"
  - "🎁 Descuento 15% en tu primer compra"
  - "📦 Entrega en 24-48h en España"
- Cerrable (solo mobile)

#### Elementos Clave - NAVBAR
```
MOBILE (collapse menu):
[☰] Logo [🔍] [👤] [🛒 2]

DESKTOP (expanded):
Logo  [Inicio] [Productos] [Blog] [Contacto]  [🔍] [👤] [🛒 2]
```

- Logo: Texto + icono de hoja
- Menú responsive (hamburger en mobile)
- Search bar con autocomplete
- User account icon con dropdown
- Cart con contador de items
- Sticky en scroll

#### Elementos Clave - HERO
- Imagen/Video de fondo con aloe vera natural
- Gradiente overlay (80% opacidad)
- Headline: "La Naturaleza en tu Piel"
- Subheadline: "Productos premium de aloe vera 100% natural"
- 2 CTA buttons (primario + secundario)
- Badge: "100% Orgánico Certificado"
- Animación subtle de entrada

#### Elementos Clave - PRODUCTO DESTACADO (Card)
```
┌────────────────────┐
│   [Imagen]  NEW    │
│                    │
│ ⭐⭐⭐⭐⭐ (234)   │
│ Gel Puro 100ml     │
│ Hidratación profunda│
│                    │
│ €12.99  €15.99 ✓  │
│ [Agregar Carrito]  │
└────────────────────┘
```

- Imagen con hover zoom
- Rating stars + número de reviews (clickeable)
- Nombre producto
- Descripción corta
- Precio actual + tachado original
- Badge de descuento (si aplica)
- Badge "Bestseller" o "Nuevo"
- Botón "Agregar al Carrito"
- Icono corazón (wishlist) en esquina

---

### 2. PÁGINA DE PRODUCTO

#### Layout (Mobile-First)
```
MOBILE:
┌──────────────────┐
│ [◄ Atrás]        │
├──────────────────┤
│ [Imagen 1]       │
│ [Imagen 2]       │
│ [Imagen 3]       │ (Galería swipeable)
├──────────────────┤
│ ⭐⭐⭐⭐⭐ (234)  │
│ Gel Puro 100ml   │
│ Código: ALO-001  │
├──────────────────┤
│ €12.99  €15.99   │
│ [- 18%]          │
├──────────────────┤
│ Cantidad:        │
│ [- 1 +]          │
│                  │
│ [AGREGAR CARRITO]│
│ [♡ Wishlist]     │
├──────────────────┤
│ BENEFICIOS:      │
│ ✓ Hidratación    │
│ ✓ Calmante       │
│ ✓ Testado        │
├──────────────────┤
│ ESPECIFICACIONES │
│ Tamaño: 100ml    │
│ Tipo piel: Todas │
│ Ingredientes: ...│
├──────────────────┤
│ ENVÍO & DEVOLUCIÓN
│ 🚚 Gratis > 30€  │
│ ↩ 30 días       │
├──────────────────┤
│ REVIEWS (5)      │
│ [Review 1]       │
│ [Review 2]       │
│ [Ver todos]      │
├──────────────────┤
│ PRODUCTOS RELACIONADOS
│ [Card] [Card]    │
└──────────────────┘

DESKTOP (2 columnas):
[Galería Completa] [Detalles + CTA + Reviews]
```

#### Secciones de Producto

**1. GALERÍA DE IMÁGENES**
- Mínimo 3 imágenes
- Zoom en hover (desktop)
- Swipe en móvil
- Lightbox al clickear
- Miniaturas seleccionables

**2. INFORMACIÓN PRINCIPAL**
- Nombre producto
- Rating (stars + cantidad reviews con link)
- Código SKU
- Disponibilidad (stock indicator)
- Precio actual + original tachado
- Porcentaje de descuento
- Badge (Bestseller, Nuevo, Oferta)

**3. PROPUESTA DE VALOR (Trust Badges)**
```
✓ 100% Orgánico Certificado
✓ Dermatológicamente Testado
✓ Sin Parabenos
✓ Fabricado en España
✓ Garantía Satisfacción 100%
```

**4. SELECTOR DE CANTIDAD Y CTA**
```
Cantidad:
[−] 1 [+]

[AGREGAR AL CARRITO] (verde primario, ancho completo)
[♡ Agregar a Wishlist] (solo borde)
```

**5. CARACTERÍSTICAS / BENEFICIOS**
```
BENEFICIOS PARA LA PIEL:
- Hidratación profunda
- Efecto calmante inmediato
- Reduce inflamación
- Propiedades regenerativas
- Apto para todas las pieles
```

**6. ESPECIFICACIONES TÉCNICAS**
```
Tamaño: 100ml
Tipo de Piel: Todas las pieles
Aplicación: Rostro y cuerpo
Frecuencia: 2 veces diaria
Ingredientes principales: Aloe Vera, Vitamina E, Glicerina
Dermatológicamente testado: Sí
Apto para veganos: Sí
```

**7. POLÍTICA DE ENVÍO Y DEVOLUCIÓN**
```
🚚 Envío
- Gratis en pedidos > €30
- 24-48h a nivel nacional
- Seguimiento incluido

↩ Devolución
- 30 días sin preguntas
- Envío de devolución gratis
- Reembolso en 5-7 días
```

**8. SECCIÓN DE REVIEWS**
```
OPINIONES CLIENTES (234 reviews)
⭐⭐⭐⭐⭐ 4.8/5

[Review 1]
"Increíble para la piel seca"
- María G. | Compra verificada ✓ | Hace 2 semanas

[Review 2]
"Mi dermatólogo lo recomendó"
- Juan M. | Compra verificada ✓ | Hace 1 mes

[Ver todas las opiniones (234)]
[Escribir una opinión]
```

**9. PRODUCTOS RELACIONADOS**
```
CLIENTES TAMBIÉN COMPRARON:
[Card] [Card] [Card]
(Mostrar 3 productos del mismo tipo o categoría)
```

#### Interactividad
- Agregar al carrito → Toast de confirmación
- Wishlist → Toggle de corazón + guardado
- Cambio de cantidad → Actualización de precio total
- Reviews → Modal o página nueva
- Imágenes → Lightbox modal

---

## 🔐 CUMPLIMIENTO LEGAL

### RGPD y Cookies

#### Banner de Cookies (RGPD Compliant)
```
┌─────────────────────────────────────┐
│ 🍪 PRIVACIDAD Y COOKIES            │
│                                     │
│ Utilizamos cookies para mejorar tu  │
│ experiencia. Al continuar aceptas   │
│ nuestra política.                   │
│                                     │
│ [Aceptar] [Personalizar] [Rechazar]│
└─────────────────────────────────────┘

Características:
- Aparece al cargar (primera vez)
- Posición: Bottom-right (responsive)
- Rechazable (botón Rechazar visible)
- Personalizable (elegir consentimientos)
- Recordar decisión (365 días)
```

#### Consentimientos Granulares
- [ ] Cookies Esenciales (siempre activas)
- [ ] Analytics (Google Analytics 4)
- [ ] Marketing (Publicidad, Email)
- [ ] Redes Sociales (Píxeles, Tracking)

#### Textos Legales
- ✓ Política de Privacidad
- ✓ Política de Cookies
- ✓ Términos y Condiciones
- ✓ Política de Devoluciones
- ✓ Aviso Legal
- ✓ Política de Envíos

---

## 💳 MÉTODOS DE PAGO (España)

### Integración de Pagos
```
┌─────────────────────────────────────┐
│ SELECCIONA MÉTODO DE PAGO          │
│                                     │
│ ○ Bizum (Pago instantáneo)         │
│ ○ Tarjeta Crédito/Débito          │
│ ○ Redsys (Sistema bancario españa) │
│ ○ PayPal                           │
│ ○ Transferencia Bancaria           │
│                                     │
│ Logos de métodos de pago           │
│ 🏦 💳 📱                           │
└─────────────────────────────────────┘
```

### Logos en Footer
- Visa
- Mastercard
- American Express
- Bizum
- Redsys
- PayPal
- Certificados de seguridad (SSL, PCI-DSS)

### Procesamiento
- Stripe API (internacional)
- Redsys/TPV Virtual (local España)
- Fallback a transferencia manual

---

## 📊 OPTIMIZACIÓN CRO (Conversion Rate Optimization)

### Métricas a Trackear
```
ACQUISITION:
- Fuentes de tráfico (Direct, Organic, Paid, Referral)
- Device (Mobile vs Desktop)
- Ubicación geográfica

ENGAGEMENT:
- Bounce rate por página
- Time on page
- Scroll depth
- Product page views
- Review engagement

CONVERSION:
- Cart abandonment rate
- Conversion rate general
- Average order value (AOV)
- Product mix (qué vende más)

RETENTION:
- Email subscriptions
- Repeat customers
- Customer lifetime value
```

### A/B Testing Prioritized
1. **CTA Colors** (Verde primario vs secundario)
2. **Hero Image** (Producto vs Lifestyle)
3. **Button Copy** ("Agregar al Carrito" vs "Comprar Ahora")
4. **Pricing Display** (Precio grande vs tamaño normal)
5. **Review Position** (Arriba vs abajo del CTA)
6. **Free Shipping Threshold** (€30 vs €50)

### Micro-Conversions
- Email newsletter signup
- Wishlist addition
- Product review submission
- Social share
- Live chat engagement

### Elementos de Urgencia (Subtle)
- Stock indicator ("Solo 3 disponibles")
- "Bestseller" badge
- "Últimas unidades" en rojo
- Testimonios recientes
- "50+ comprado esta semana"

### Trust Signals
- Certificaciones visibles
- Número de reviews
- Rating prominente
- Fotos de clientes
- Testimonios con nombre y verificación
- Logo de garantía
- Política de devolución clara

---

## 🎯 FASES DE DESARROLLO

### FASE 1: MVP (Semana 1-2)
- [x] Estructura base (React + Tailwind)
- [x] Homepage completa
- [x] Product Page
- [x] Carrito básico (localStorage)
- [x] Top bar + Navbar
- [x] Footer
- [x] Cookie banner

### FASE 2: Funcionalidad (Semana 3-4)
- [ ] Sistema de usuarios (Auth básico)
- [ ] Búsqueda y filtros
- [ ] Página de catálogo
- [ ] Reviews y ratings
- [ ] Wishlist

### FASE 3: Pagos (Semana 5-6)
- [ ] Integración Stripe
- [ ] Integración Redsys
- [ ] Página de checkout completa
- [ ] Confirmación por email

### FASE 4: Admin y Polish (Semana 7-8)
- [ ] Panel de administración básico
- [ ] Analytics integrado
- [ ] SEO optimizado
- [ ] Performance tunning
- [ ] QA y bug fixes

---

## 📈 KPIs DE ÉXITO

| KPI | Target | Timeline |
|-----|--------|----------|
| Lighthouse Score | 90+ Mobile | Semana 2 |
| Time to Interactive | <3s | Semana 2 |
| Bounce Rate | <50% | Mes 1 |
| Conversion Rate | >2% | Mes 2 |
| Cart Abandonment | <70% | Mes 2 |
| Email Signup | >15% | Mes 1 |
| AOV | €35+ | Mes 3 |

---

## 🚀 PRÓXIMOS PASOS

1. **Revisar y ajustar esta especificación** (30 min)
2. **Crear base de datos de productos** (JSON inicial)
3. **Diseñar sistema de componentes** (Figma o código)
4. **Iniciar en Claude Code** con MVP
5. **Iteración rápida y testing**

---

*Documento versión 1.0 - Actualizado 18/04/2026*
