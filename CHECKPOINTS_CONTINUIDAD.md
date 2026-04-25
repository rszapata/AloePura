# 🔄 SISTEMA DE CHECKPOINTS Y CONTINUIDAD MULTI-CUENTA

## 📌 INTRODUCCIÓN

Este documento garantiza que **cuando cambies de cuenta de Claude**, la nueva cuenta entienda exactamente en qué punto está el proyecto y qué se debe hacer a continuación.

---

## 🎯 CÓMO USAR ESTE SISTEMA

### **Paso 1: Antes de cambiar de cuenta**
- Revisa cuál es tu **CHECKPOINT ACTUAL**
- Copia el **PROMPT DE CONTINUIDAD** correspondiente
- Documenta cualquier **DECISIÓN TOMADA** en esa sesión

### **Paso 2: En la nueva cuenta**
- Pega el **PROMPT DE CONTINUIDAD** completo
- Sube los archivos de especificación (si es necesario)
- La nueva Claude retoma exactamente donde se quedó

### **Paso 3: Registra el progreso**
- Marca el checkpoint como completado
- Agrega notas de lo que se hizo
- Define el siguiente checkpoint

---

## ✅ CHECKPOINTS POR ETAPA

## CHECKPOINT 1: SETUP BASE ✅

### Descripción
Estructura React inicial, Tailwind configurado, componentes base listos.

### Estado del Proyecto
```
✅ COMPLETADO:
- Estructura de carpetas creada
- React Router instalado
- Tailwind configurado
- CSS variables con colores personalizados
- Google Fonts importados (Playfair Display, Inter, Montserrat)
- Componentes base creados: Button, Input, Card, Badge

📦 ARCHIVOS CREADOS:
- src/components/common/Button.jsx
- src/components/common/Input.jsx
- src/components/common/Card.jsx
- src/components/common/Badge.jsx
- src/App.jsx (con routing básico)
- tailwind.config.js (con colores personalizados)
- globals.css (con variables CSS y animaciones)

✅ VERIFICACIÓN:
- [ ] npm run dev ejecuta sin errores
- [ ] HomePage se carga
- [ ] Responsive en 320px, 768px, 1024px
- [ ] Colores son correctos
```

### Archivos a Compartir
```
- DESIGN_SYSTEM.md (para referencias de colores)
- ARQUITECTURA_COMPONENTES.md (para estructura)
- El código generado hasta ahora (opcional)
```

### Prompt de Continuidad
```
"Continuamos un proyecto de e-commerce de aloe vera para España.

ESTADO ACTUAL (Checkpoint 1):
✅ Setup base completado
✅ React + Tailwind configurado
✅ Componentes base creados (Button, Input, Card, Badge)
✅ Colores personalizados en tailwind.config.js

SIGUIENTE PASO (Checkpoint 2):
Crear componentes de LAYOUT:
1. TopBar.jsx - Banner superior con mensajes rotatorios
2. Navbar.jsx - Navegación sticky con carrito
3. Footer.jsx - Pie de página
4. CookieBanner.jsx - RGPD compliant
5. Layout.jsx - Componente padre

REQUISITOS:
- TopBar: Verde primario (#2D7B4A), 40px altura, 3 mensajes rotatorios cada 5s
- Navbar: Sticky en scroll, responsive (hamburger en mobile), carrito con contador
- Footer: Links, métodos pago visibles, redes sociales
- Cookie Banner: Bottom-right, 3 botones (Aceptar, Personalizar, Rechazar), localStorage
- Layout: Envuelve todas las páginas, TopBar > Navbar > {children} > Footer > CookieBanner

Colores a usar: Ver DESIGN_SYSTEM.md
Tipografía: Playfair Display (títulos), Inter (body), Montserrat (énfasis)

¿Revisamos ARQUITECTURA_COMPONENTES.md sección 'COMPONENTES GLOBALES' 
y comenzamos con TopBar.jsx?"
```

---

## CHECKPOINT 2: LAYOUT GLOBAL ✅

### Descripción
TopBar, Navbar, Footer, CookieBanner funcionando. Estructura global lista.

### Estado del Proyecto
```
✅ COMPLETADO EN CHECKPOINT 1:
- Setup base y componentes base

✅ NUEVO EN CHECKPOINT 2:
- TopBar con mensajes rotatorios
- Navbar sticky con carrito (contador)
- Footer con links y métodos de pago
- CookieBanner RGPD compliant
- Layout.jsx ensamblando todo

📦 ARCHIVOS CREADOS:
- src/components/layout/TopBar.jsx
- src/components/layout/Navbar.jsx
- src/components/layout/Footer.jsx
- src/components/layout/CookieBanner.jsx
- src/components/layout/Layout.jsx

✅ VERIFICACIÓN:
- [ ] TopBar visible en top, mensajes rotan cada 5s
- [ ] Navbar es sticky, visible en scroll
- [ ] Carrito muestra contador (comienza en 0)
- [ ] Footer visible al bottom
- [ ] CookieBanner aparece bottom-right
- [ ] Hamburger menu funciona en mobile
- [ ] Colores correctos en todo
- [ ] Mobile-first responsive
- [ ] Lighthouse score >80
```

### Archivos a Compartir
```
- DESIGN_SYSTEM.md (para colores exactos)
- El código del Layout hasta ahora
```

### Prompt de Continuidad
```
"Continuamos e-commerce aloe vera España.

ESTADO ACTUAL (Checkpoint 2):
✅ Setup y componentes base completado
✅ Layout global completado (TopBar, Navbar, Footer, CookieBanner, Layout)

SIGUIENTE PASO (Checkpoint 3):
Crear HOMEPAGE COMPLETA con:
1. HeroSection - Titular 'La Naturaleza en tu Piel' + CTA buttons
2. ProductHighlight - 3 productos destacados (bestsellers)
3. CategoriesGrid - 6-8 categorías
4. TestimonialsSection - 3 testimonios
5. FeaturesSection - 4 beneficios (Orgánico, Local, Dermatólogo, Garantía)
6. NewsletterCTA - Email signup
7. HomePage.jsx - Ensambla todo

DATOS A USAR:
Productos en DESIGN_SYSTEM.md:
- Gel Puro 100ml - €12.99
- Crema Antienvejecimiento - €24.99
- Sérum Facial - €18.99

Beneficios:
- 100% Orgánico Certificado
- Fabricado en España
- Dermatológicamente Testado
- Garantía Satisfacción 30 días

Testimonios: También en DESIGN_SYSTEM.md

REQUISITOS:
- Mobile-first (320px)
- Responsive desktop (1024px+)
- Colores de DESIGN_SYSTEM.md
- Tipografía: Playfair Display (H1 grande), Inter (body)
- Animaciones: slideUp, fadeIn (suaves)
- ProductCard tiene: imagen, nombre, rating, precio, descuento, botón

¿Comenzamos con HeroSection.jsx?"
```

---

## CHECKPOINT 3: HOMEPAGE COMPLETA ✅

### Descripción
Homepage visualmente atractiva, mobile-first, con todos los elementos.

### Estado del Proyecto
```
✅ COMPLETADO CHECKPOINTS 1-2:
- Setup base
- Layout global

✅ NUEVO EN CHECKPOINT 3:
- HeroSection con CTA buttons
- ProductHighlight (3 productos)
- CategoriesGrid (6-8 categorías)
- TestimonialsSection (3 testimonios)
- FeaturesSection (4 beneficios)
- NewsletterCTA (email signup)
- HomePage completa

📦 ARCHIVOS CREADOS:
- src/components/home/HeroSection.jsx
- src/components/home/ProductHighlight.jsx
- src/components/home/CategoriesGrid.jsx
- src/components/home/TestimonialsSection.jsx
- src/components/home/FeaturesSection.jsx
- src/components/home/NewsletterCTA.jsx
- src/pages/HomePage.jsx

✅ VERIFICACIÓN:
- [ ] Hero se ve bien en mobile y desktop
- [ ] Productos muestran correctamente
- [ ] Categorías en grid responsive
- [ ] Testimonios visibles
- [ ] Beneficios con iconos
- [ ] Newsletter con input
- [ ] Colores exactos
- [ ] Tipografía: Playfair grande para H1
- [ ] Animaciones suaves
- [ ] Lighthouse >85
```

### Archivos a Compartir
```
- El código de componentes home
- Screenshot de cómo se ve
```

### Prompt de Continuidad
```
"Continuamos e-commerce aloe vera España.

ESTADO ACTUAL (Checkpoint 3):
✅ Setup, Layout y Homepage completados

SIGUIENTE PASO (Checkpoint 4):
Crear PÁGINA DE PRODUCTO con:
1. ProductGallery - Galería de imágenes (swipeable mobile)
2. ProductInfo - Información: nombre, rating, precio, descuento
3. BenefitsList - Beneficios del producto
4. QuantitySelector - Selector de cantidad
5. AddToCartButton - Botón agregar con lógica
6. SpecsTable - Especificaciones técnicas
7. ShippingInfo - Envío y devolución
8. ReviewSection - Reviews y ratings
9. RelatedProducts - Productos relacionados
10. ProductPage.jsx - Página completa

REQUISITOS:
- Recibe product ID como parámetro
- Usa datos de DESIGN_SYSTEM.md (6 productos iniciales)
- Galería swipeable en mobile, thumbnails en desktop
- Agregar al carrito actualiza contador en navbar
- Toast de confirmación
- Mobile-first responsive
- Colores exactos

Productos disponibles:
1. Gel Puro 100ml - €12.99 (Bestseller)
2. Crema Antienvejecimiento - €24.99 (New)
3. Sérum Facial - €18.99 (Bestseller)
4. Mascarilla Detox - €14.99
5. Loción Corporal 250ml - €9.99
6. Stick Labial - €5.99

¿Comenzamos con ProductGallery.jsx?"
```

---

## CHECKPOINT 4: PÁGINA DE PRODUCTO ✅

### Descripción
Página de producto funcional, con galería, reviews y "Agregar al carrito".

### Estado del Proyecto
```
✅ COMPLETADO CHECKPOINTS 1-3:
- Setup, Layout, Homepage

✅ NUEVO EN CHECKPOINT 4:
- ProductGallery (swipeable)
- ProductInfo (detalles)
- Reviews section
- AddToCart lógica
- ProductPage completa

📦 ARCHIVOS CREADOS:
- src/components/products/ProductGallery.jsx
- src/components/products/ProductInfo.jsx
- src/components/products/ReviewList.jsx
- src/components/products/ReviewCard.jsx
- src/pages/ProductPage.jsx
- src/store/cartStore.js (Zustand)

✅ VERIFICACIÓN:
- [ ] Galería funciona (swipe mobile, thumbnails desktop)
- [ ] Precio y descuento se ven bien
- [ ] Rating muestra correctamente
- [ ] Reviews visibles
- [ ] Agregar al carrito funciona
- [ ] Contador de carrito se actualiza
- [ ] Toast de confirmación aparece
- [ ] Responsive mobile/desktop
- [ ] localStorage persiste carrito
```

### Archivos a Compartir
```
- Código de ProductPage
- Estado de cartStore (Zustand)
```

### Prompt de Continuidad
```
"Continuamos e-commerce aloe vera España.

ESTADO ACTUAL (Checkpoint 4):
✅ Setup, Layout, Homepage y ProductPage completados

SIGUIENTE PASO (Checkpoint 5):
Crear CATÁLOGO DE PRODUCTOS y CARRITO:

PARTE A - CatalogPage:
1. ProductList - Grid de productos
2. FiltersPanel - Filtros por categoría, precio, rating
3. SortDropdown - Ordenar por relevancia, precio, rating
4. ProductCard - Mostrar productos (versión grid)
5. Pagination - Navegación entre páginas
6. CatalogPage.jsx - Página completa

PARTE B - CartPage:
1. CartItem - Item dentro del carrito
2. CartSummary - Subtotal, envío, total
3. CartEmpty - Carrito vacío
4. CartPage.jsx - Página del carrito completa
5. CouponInput - Cupón de descuento

PARTE C - CartSidebar:
1. CartSidebar - Mostrar carrito flotante desde navbar
2. CartIcon con contador (ya existe en Navbar)

REQUISITOS:
- Filtros funcionales
- Grid responsive (1 columna mobile, 4 desktop)
- Carrito muestra todos los items
- Puedo cambiar cantidad
- Puedo eliminar items
- localStorage persiste
- Colores exactos de DESIGN_SYSTEM.md
- Mobile-first

¿Comenzamos con CatalogPage y CartPage?"
```

---

## CHECKPOINT 5: CATÁLOGO Y CARRITO ✅

### Descripción
Catálogo de productos con filtros, carrito funcional, localStorage persistente.

### Estado del Proyecto
```
✅ COMPLETADO CHECKPOINTS 1-4:
- Setup, Layout, Homepage, ProductPage

✅ NUEVO EN CHECKPOINT 5:
- CatalogPage completa
- Filtros funcionales
- CartPage completa
- CartSidebar
- Carrito persistente en localStorage

📦 ARCHIVOS CREADOS:
- src/pages/CatalogPage.jsx
- src/components/catalog/ProductList.jsx
- src/components/catalog/FiltersPanel.jsx
- src/components/catalog/SortDropdown.jsx
- src/pages/CartPage.jsx
- src/components/cart/CartItem.jsx
- src/components/cart/CartSummary.jsx
- src/components/cart/CartEmpty.jsx
- src/components/cart/CartSidebar.jsx

✅ VERIFICACIÓN:
- [ ] Catálogo muestra 6 productos
- [ ] Filtros funcionan
- [ ] Sort funciona
- [ ] Grid responsive
- [ ] CartPage muestra items
- [ ] Puedo cambiar cantidad
- [ ] Puedo eliminar items
- [ ] localStorage persiste carrito
- [ ] Total se calcula correctamente
- [ ] Envío gratis >€30
- [ ] Mobile responsive
```

### Archivos a Compartir
```
- Código de CatalogPage y CartPage
- Estado de cartStore actualizado
```

### Prompt de Continuidad
```
"Continuamos e-commerce aloe vera España.

ESTADO ACTUAL (Checkpoint 5):
✅ Setup, Layout, Homepage, ProductPage, Catálogo y Carrito completados

SIGUIENTE PASO (Checkpoint 6):
Crear CHECKOUT y CONFIRMACIÓN:

CHECKOUT (3 pasos):
1. Paso 1: Email y autenticación
   - Input email
   - Botón continuar o crear cuenta
   - Newsletter checkbox

2. Paso 2: Dirección de envío
   - Formulario dirección (nombre, calle, ciudad, CP)
   - RadioButtons métodos envío:
     * 24-48h (€2.99)
     * 3-5 días (Gratis >€30)

3. Paso 3: Método de pago
   - RadioButtons:
     * Bizum
     * Tarjeta Crédito/Débito
     * PayPal
     * Transferencia Bancaria

COMPONENTES:
- CheckoutPage.jsx (orquesta los 3 pasos)
- CheckoutStep1.jsx (email)
- CheckoutStep2.jsx (dirección + envío)
- CheckoutStep3.jsx (pago)
- OrderReview.jsx (resumen final)
- ProgressBar.jsx (indicador de paso)

CONFIRMACIÓN:
- ConfirmationPage.jsx
- Mostrar: número orden, total, dirección, seguimiento
- Email de confirmación (simulado)

REQUISITOS:
- Progress bar visible
- Validación de formularios
- Métodos pago españoles visibles (Bizum, Redsys)
- Colores exactos
- Mobile responsive
- localStorage → sessionStorage para checkout

¿Comenzamos con CheckoutPage.jsx?"
```

---

## CHECKPOINT 6: CHECKOUT Y CONFIRMACIÓN ✅

### Descripción
Flujo de checkout completo en 3 pasos, métodos de pago locales, confirmación.

### Estado del Proyecto
```
✅ COMPLETADO CHECKPOINTS 1-5:
- Toda la funcionalidad anterior

✅ NUEVO EN CHECKPOINT 6:
- Checkout 3 pasos completo
- Validación de formularios
- Métodos de pago españoles
- Página de confirmación
- Progress bar

📦 ARCHIVOS CREADOS:
- src/pages/CheckoutPage.jsx
- src/components/checkout/CheckoutStep1.jsx
- src/components/checkout/CheckoutStep2.jsx
- src/components/checkout/CheckoutStep3.jsx
- src/components/checkout/OrderReview.jsx
- src/components/checkout/ProgressBar.jsx
- src/pages/ConfirmationPage.jsx

✅ VERIFICACIÓN:
- [ ] Progress bar funciona
- [ ] Paso 1: email valida
- [ ] Paso 2: dirección completa
- [ ] Paso 2: métodos envío correctos
- [ ] Paso 3: métodos pago visibles
- [ ] Logos métodos pago visibles
- [ ] Resumen muestra todo
- [ ] Confirmación genera número orden
- [ ] Mobile responsive
- [ ] Colores exactos
- [ ] Validación completa
```

### Archivos a Compartir
```
- Código de CheckoutPage
- ConfirmationPage
- Actualizaciones de store
```

### Prompt de Continuidad
```
"Continuamos e-commerce aloe vera España.

ESTADO ACTUAL (Checkpoint 6):
✅ Setup, Layout, Homepage, ProductPage, Catálogo, Carrito y Checkout completados

SIGUIENTE PASO (Checkpoint 7):
PULIDO Y OPTIMIZACIÓN:

1. PÁGINA DE USUARIO/CUENTA:
   - AccountPage.jsx
   - Perfil usuario
   - Historial compras
   - Mis direcciones
   - Preferencias

2. PÁGINAS LEGALES:
   - PrivacyPage.jsx
   - TermsPage.jsx
   - CookiePolicyPage.jsx
   - FAQPage.jsx

3. OPTIMIZACIONES:
   - SEO: meta tags
   - Performance: code splitting
   - Accesibilidad: WCAG 2.1 AA
   - Animaciones: micro-interacciones

4. TESTING:
   - Responsive en todos los dispositivos
   - Lighthouse >90
   - Core Web Vitals Green
   - Sin errores en console

REQUISITOS:
- Todos los links funcionales
- Colores exactos
- Tipografía consistente
- Mobile-first
- Rápido y fluido

¿Verificamos el estado actual y comenzamos con optimizaciones?"
```

---

## CHECKPOINT 7: PULIDO Y OPTIMIZACIÓN ✅

### Descripción
Páginas legales, cuenta de usuario, optimizaciones finales.

### Estado del Proyecto
```
✅ COMPLETADO CHECKPOINTS 1-6:
- MVP completamente funcional

✅ NUEVO EN CHECKPOINT 7:
- Página de cuenta usuario
- Páginas legales (privacidad, términos, cookies)
- FAQ
- Optimizaciones de performance
- SEO básico
- Accesibilidad mejorada

📦 ARCHIVOS CREADOS:
- src/pages/AccountPage.jsx
- src/pages/PrivacyPage.jsx
- src/pages/TermsPage.jsx
- src/pages/CookiePolicyPage.jsx
- src/pages/FAQPage.jsx
- src/pages/NotFoundPage.jsx

✅ VERIFICACIÓN:
- [ ] Lighthouse score >90 (desktop y mobile)
- [ ] Core Web Vitals todos green
- [ ] Accesibilidad WCAG AA
- [ ] Responsive perfecto 320px-1920px
- [ ] Sin errores console
- [ ] Meta tags en todas las páginas
- [ ] Images optimizadas
- [ ] Animaciones suaves
- [ ] Toda la navegación funciona
```

### Archivos a Compartir
```
- Código final del proyecto
- Lighthouse report
- Screenshot de páginas clave
```

---

## CHECKPOINT 8: BACKEND API ⏳

### Descripción
Reemplazar toda la capa de datos simulada (`localStorage`/`sessionStorage` + mocks) por un backend real con base de datos, auth y endpoints REST/GraphQL.

### Estado del Proyecto
```
✅ COMPLETADO CHECKPOINTS 1-7:
- MVP 100% funcional pero sin persistencia server-side
- Contact, Newsletter, Checkout y AccountPage solo simulados

✅ NUEVO EN CHECKPOINT 8:
- Elección de stack backend (Node/Express, NestJS, Supabase, Fastify…)
- Schema BD: users, products, orders, order_items, addresses, newsletter_subscribers, contact_messages
- Auth real (email/password, opcionalmente Google OAuth) con JWT o sesiones
- Endpoints:
  * POST /auth/register, /auth/login, /auth/logout, GET /auth/me
  * GET /products, GET /products/:id
  * POST /orders, GET /orders, GET /orders/:id
  * POST /newsletter, POST /contact
  * CRUD /addresses
- Cliente API centralizado en src/lib/api.js
- Reemplazar datos hardcoded de src/data/products.js por fetch
- CheckoutContext: envía POST /orders al confirmar
- AccountPage: tabs conectadas a endpoints reales
- Variables de entorno (.env + VITE_API_URL)

📦 ARCHIVOS NUEVOS:
- backend/ (carpeta completa si es monorepo) o repo separado
- src/lib/api.js (cliente fetch con credentials)
- src/context/AuthContext.jsx
- src/hooks/useProducts.js, useOrders.js
- .env.example

✅ VERIFICACIÓN:
- [ ] Login/registro funcionan y persisten sesión
- [ ] Catálogo viene de la BD
- [ ] Un pedido creado aparece en /cuenta/pedidos
- [ ] CORS configurado correctamente en dev y prod
- [ ] Manejo de errores de red + estados loading
- [ ] Seguridad básica: rate limit, helmet, validación server-side
```

### Archivos a Compartir
```
- Schema de BD (SQL o Prisma/Drizzle)
- Código del cliente API
- Ejemplo de una ruta protegida funcionando end-to-end
```

### Prompt de Continuidad
```
"Continuamos e-commerce aloe vera España.

ESTADO ACTUAL (Checkpoint 8):
✅ Backend API conectado: auth, productos, pedidos, contacto, newsletter
✅ Cliente src/lib/api.js centralizado
✅ AuthContext y CheckoutContext envían al servidor

SIGUIENTE PASO (Checkpoint 9):
Integrar PASARELA DE PAGO REAL (Redsys + Stripe + Bizum).

¿Comenzamos con la integración de Stripe en el backend?"
```

---

## CHECKPOINT 9: PASARELA DE PAGO REAL ⏳

### Descripción
Checkpoint 6 implementa los 3 pasos del checkout, pero el pago es simulado (solo guarda `aloe_last_order` en `sessionStorage`). Este checkpoint conecta pasarelas reales.

### Estado del Proyecto
```
✅ COMPLETADO CHECKPOINT 8:
- Backend y BD funcionando

✅ NUEVO EN CHECKPOINT 9:
- Integración Stripe (tarjeta + Apple/Google Pay via Payment Element)
- Integración Redsys (TPV bancos españoles) usando redsys-easy o similar
- Bizum vía pasarela compatible (Redsys Bizum, Adyen o MONEI)
- PayPal (Checkout SDK)
- Transferencia bancaria: flujo "pedido pendiente" + email con IBAN
- Webhooks de confirmación (Stripe /webhook, Redsys notificación HTTP)
- Estados de pedido: pending → paid → processing → shipped → delivered / refunded
- 3DS / SCA compliant (obligatorio en EU)
- Página de pago fallido + retry

📦 ARCHIVOS NUEVOS:
- backend/src/payments/stripe.service.js
- backend/src/payments/redsys.service.js
- backend/src/payments/webhooks.controller.js
- src/components/checkout/StripePaymentElement.jsx
- src/components/checkout/BizumButton.jsx
- src/pages/PaymentFailedPage.jsx

✅ VERIFICACIÓN:
- [ ] Compra con tarjeta de prueba Stripe (4242…) finaliza OK
- [ ] Webhook actualiza order a "paid"
- [ ] Redsys sandbox completa transacción
- [ ] 3DS challenge se muestra cuando corresponde
- [ ] Devolución (refund) desde panel admin funciona
- [ ] IVA 21% calculado en el total y mostrado en factura
```

### Archivos a Compartir
```
- IDs de productos/price en Stripe (dev)
- Configuración de Redsys (merchant code, terminal)
- Código de webhook handler
```

### Prompt de Continuidad
```
"Continuamos e-commerce aloe vera España.

ESTADO ACTUAL (Checkpoint 9):
✅ Pagos reales funcionando (Stripe, Redsys, Bizum, PayPal, transferencia)
✅ Webhooks y estados de pedido actualizados correctamente

SIGUIENTE PASO (Checkpoint 10):
Migrar catálogo a CMS y panel admin.

¿Comenzamos con la elección de CMS (Strapi, Sanity, Payload, Directus)?"
```

---

## CHECKPOINT 10: CMS Y CATÁLOGO DINÁMICO ⏳

### Descripción
Hoy los 6 productos viven hardcoded en `src/data/products.js`. Este checkpoint mueve todo el contenido editable a un CMS headless y crea un panel admin para gestión sin tocar código.

### Estado del Proyecto
```
✅ COMPLETADO CHECKPOINTS 1-9:
- Tienda funcional con pagos reales

✅ NUEVO EN CHECKPOINT 10:
- Elección de CMS (Strapi / Sanity / Payload / Directus)
- Modelado de content-types: Product, Category, Review, Banner,
  BlogPost, FAQItem, LegalPage, Testimonial
- Migración de los 6 productos + categorías + reviews + testimonios al CMS
- Panel admin accesible (/admin o subdomain) con roles: admin, editor
- Frontend: fetch de productos desde CMS, no desde src/data
- ISR/SSG si se migra a Next.js, o revalidación con SWR si sigue en Vite
- Rich text para longDescription, especificaciones y política
- Upload de imágenes integrado con el CMS

📦 ARCHIVOS NUEVOS:
- cms/ (config de Strapi/Payload si es monorepo)
- src/lib/cms.js (cliente CMS)
- src/hooks/useProducts.js → usa CMS ahora
- eliminar src/data/products.js (o dejar como seed)

✅ VERIFICACIÓN:
- [ ] Crear producto desde panel admin aparece en /productos sin deploy
- [ ] Editar precio se refleja en catálogo y detalle
- [ ] Desactivar producto lo oculta de la tienda
- [ ] Banner home editable desde CMS
- [ ] FAQ editable desde CMS
```

### Archivos a Compartir
```
- Schema de content-types del CMS
- Screenshots del panel admin
```

### Prompt de Continuidad
```
"Continuamos e-commerce aloe vera España.

ESTADO ACTUAL (Checkpoint 10):
✅ CMS headless integrado, catálogo dinámico, panel admin operativo

SIGUIENTE PASO (Checkpoint 11):
Reemplazar placeholders por imágenes reales optimizadas.

¿Comenzamos con la pipeline de imágenes (Cloudinary / ImgIX / next/image)?"
```

---

## CHECKPOINT 11: IMÁGENES REALES Y MEDIA ⏳

### Descripción
Toda la tienda usa placeholders SVG (`<Leaf />` + gradientes). Este checkpoint introduce fotografía real de producto con pipeline moderna.

### Estado del Proyecto
```
✅ COMPLETADO CHECKPOINTS 1-10:
- Catálogo dinámico, pagos y backend

✅ NUEVO EN CHECKPOINT 11:
- Sesión de fotos producto (o compra de stock ético) para los 6 SKUs
- 4 imágenes por producto: principal, lifestyle, textura, detalle packaging
- Pipeline: Cloudinary (o equivalente) con transformaciones on-the-fly
- WebP/AVIF con fallback JPEG
- Componente <Image /> custom con:
  * srcSet + sizes
  * loading="lazy" / fetchPriority="high" en hero
  * blur-up placeholder (LQIP)
- ProductGallery: reemplazar gradientes por las fotos reales
- Hero: imagen lifestyle sustituyendo el círculo verde
- Categorías: icono + foto de fondo

📦 ARCHIVOS NUEVOS:
- src/components/common/Image.jsx
- src/lib/cloudinary.js (o src/lib/imageLoader.js)
- public/ o CDN: fotos subidas

✅ VERIFICACIÓN:
- [ ] LCP < 2.5s en home (Lighthouse móvil)
- [ ] CLS < 0.1 (reservar aspect-ratio en <Image />)
- [ ] Imágenes servidas en AVIF a navegadores compatibles
- [ ] Alt text descriptivo en todas
- [ ] Tamaño total home < 1 MB
```

### Archivos a Compartir
```
- URL del CDN / cuenta Cloudinary
- Ejemplo de <Image /> en producción
```

### Prompt de Continuidad
```
"Continuamos e-commerce aloe vera España.

ESTADO ACTUAL (Checkpoint 11):
✅ Fotos reales con pipeline WebP/AVIF y lazy loading

SIGUIENTE PASO (Checkpoint 12):
Internacionalización (ES default + EN + opcional CA).

¿Comenzamos con la elección de librería i18n (react-intl, react-i18next, Lingui)?"
```

---

## CHECKPOINT 12: INTERNACIONALIZACIÓN (i18n) ⏳

### Descripción
Añadir soporte multi-idioma para abrir mercado fuera de España peninsular. Español como default, inglés obligatorio, catalán opcional.

### Estado del Proyecto
```
✅ COMPLETADO CHECKPOINTS 1-11:
- Tienda completa en español

✅ NUEVO EN CHECKPOINT 12:
- Librería: react-i18next o @lingui/react
- Extracción de todos los strings del código a ficheros JSON
- Namespaces: common, home, product, cart, checkout, account, legal
- Detección idioma navegador + toggle manual en navbar
- Rutas con prefix: / (es) · /en/ · /ca/
- Contenido CMS traducido (locales en el content-type)
- Formato de fecha/hora/moneda con Intl API
- SEO: <html lang>, hreflang, sitemaps por idioma
- Legal: adaptar textos a cada jurisdicción

📦 ARCHIVOS NUEVOS:
- src/i18n/index.js
- src/i18n/locales/es/*.json
- src/i18n/locales/en/*.json
- src/components/layout/LanguageSwitcher.jsx

✅ VERIFICACIÓN:
- [ ] Cambio de idioma persiste en localStorage
- [ ] URLs con prefix funcionan
- [ ] Precio muestra € en ES/CA y £/$ opcional en EN (config)
- [ ] Fechas de reviews formateadas por locale
- [ ] Sin strings hardcoded sin traducir (lint rule)
```

### Archivos a Compartir
```
- Configuración de i18next
- Ejemplo de JSON de traducción
```

### Prompt de Continuidad
```
"Continuamos e-commerce aloe vera España.

ESTADO ACTUAL (Checkpoint 12):
✅ ES/EN funcionando, CMS traducido, SEO multilingüe

SIGUIENTE PASO (Checkpoint 13):
Analytics respetando consentimiento de cookies del usuario.

¿Comenzamos con GA4 + gestión de consentimiento (CookieBanner ya existente)?"
```

---

## CHECKPOINT 13: ANALYTICS Y TRACKING ⏳

### Descripción
El `CookieBanner` ya guarda las preferencias del usuario en `localStorage`, pero hoy no hay ningún tracker conectado. Este checkpoint añade analítica y respeta el consentimiento existente.

### Estado del Proyecto
```
✅ COMPLETADO CHECKPOINTS 1-12:
- Tienda multilingüe con backend y CMS

✅ NUEVO EN CHECKPOINT 13:
- GA4 (Google Analytics 4) + Google Tag Manager
- Eventos ecommerce estándar GA4:
  * view_item_list, view_item, add_to_cart, remove_from_cart
  * begin_checkout, add_shipping_info, add_payment_info, purchase
- Opcional: Meta Pixel, TikTok Pixel
- Consent Mode v2 (obligatorio EU 2024+)
- Gate de scripts: no cargar hasta que el usuario acepte analytics/marketing
- Hotjar o Microsoft Clarity (opcional, bajo consentimiento)
- Dashboard de métricas clave en el admin (conversión, AOV, LTV)

📦 ARCHIVOS NUEVOS:
- src/lib/analytics.js (wrapper que lee consent del CookieBanner)
- src/hooks/useTrackPageView.js, useTrackEcommerce.js

✅ VERIFICACIÓN:
- [ ] Rechazar cookies NO carga gtag.js (verificar en Network tab)
- [ ] Aceptar analytics carga GA4 y dispara page_view
- [ ] Compra completa dispara evento purchase con items + value
- [ ] Debug View de GA4 recibe eventos correctamente
- [ ] Consent Mode v2 default_consent configurado
```

### Archivos a Compartir
```
- ID de GA4 / GTM
- Screenshot de eventos llegando a Debug View
```

### Prompt de Continuidad
```
"Continuamos e-commerce aloe vera España.

ESTADO ACTUAL (Checkpoint 13):
✅ GA4 + Consent Mode v2 funcionando, ecommerce events activos

SIGUIENTE PASO (Checkpoint 14):
Auditoría final Lighthouse + WCAG AA.

¿Comenzamos con la auditoría Lighthouse para identificar gaps?"
```

---

## CHECKPOINT 14: AUDITORÍA LIGHTHOUSE + WCAG AA ⏳

### Descripción
Cerrar las verificaciones pendientes del Checkpoint 7 (todos los checkboxes `[ ]`) y dejar la tienda lista para producción con métricas verificables.

### Estado del Proyecto
```
✅ COMPLETADO CHECKPOINTS 1-13:
- Tienda feature-complete con backend, pagos, CMS, i18n y analytics

✅ NUEVO EN CHECKPOINT 14:
- Lighthouse CI corriendo en cada PR
- Target: score > 90 en Performance, Accessibility, Best Practices, SEO
  tanto en mobile como desktop, en las 5 páginas clave:
  home, producto, catálogo, carrito, checkout
- Core Web Vitals en verde (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- Auditoría WCAG AA manual con axe-core + lectores de pantalla:
  * Navegación completa por teclado sin trampas de focus
  * Contraste AA en todos los pares texto/fondo
  * Todos los formularios con labels y mensajes de error conectados vía aria-describedby
  * Landmarks correctos, headings jerárquicos, sin H1 duplicados
- Tests responsive 320px → 1920px (Chromium + WebKit)
- Bundle size analysis (rollup-plugin-visualizer), code-splitting extra si hace falta
- robots.txt, sitemap.xml, Open Graph + Twitter Card en todas las páginas
- Schema.org: Product, Organization, BreadcrumbList, FAQPage

📦 ARCHIVOS NUEVOS / MODIFICADOS:
- .github/workflows/lighthouse.yml
- tests/a11y/*.spec.js (playwright + @axe-core/playwright)
- public/robots.txt, public/sitemap.xml (o generado)
- src/components/common/SEO.jsx (JSON-LD)

✅ VERIFICACIÓN:
- [ ] Lighthouse mobile > 90 en las 5 rutas clave
- [ ] Lighthouse desktop > 95 en las 5 rutas clave
- [ ] axe-core 0 violaciones críticas ni serias
- [ ] Navegación completa con Tab sin ratón
- [ ] NVDA/VoiceOver lee todos los productos y formularios
- [ ] Rich Results test pasa en Google Search Console
- [ ] OG tags validados en Facebook Sharing Debugger
```

### Archivos a Compartir
```
- Reporte final de Lighthouse (5 rutas × 2 dispositivos)
- Reporte de axe-core
- Captura de Rich Results
```

### Prompt de Continuidad
```
"Proyecto e-commerce aloe vera COMPLETADO ✅ (todos los checkpoints).

Métricas finales:
- Lighthouse Performance mobile: [número]
- Lighthouse Performance desktop: [número]
- WCAG AA: [% conformidad]
- Core Web Vitals: [todos green / issues]

El proyecto está listo para producción.
Siguientes trabajos opcionales fuera de roadmap:
- Blog + estrategia SEO de contenidos
- Programa de fidelización / puntos
- App móvil React Native
- A/B testing (Optimizely, GrowthBook)
- Expansión a marketplaces (Amazon, El Corte Inglés)"
```

---

## 📋 TABLA DE CHECKPOINTS RÁPIDA

### Fase 1 — MVP (Checkpoints 1-7) ✅

| Checkpoint | Etapa | Estado | Duración |
|-----------|-------|--------|----------|
| 1 | Setup Base | ✅ Completado | 30-40 min |
| 2 | Layout Global | ✅ Completado | 30-40 min |
| 3 | Homepage | ✅ Completado | 40-60 min |
| 4 | Página Producto | ✅ Completado | 40-60 min |
| 5 | Catálogo y Carrito | ✅ Completado | 45-60 min |
| 6 | Checkout | ✅ Completado | 45-60 min |
| 7 | Pulido y SEO | ✅ Completado | 30-45 min |
| **Subtotal** | **MVP Completo** | ✅ | **240-365 min (4-6 h)** |

### Fase 2 — Producción (Checkpoints 8-14) ⏳

| Checkpoint | Etapa | Estado | Duración estimada |
|-----------|-------|--------|-------------------|
| 8  | Backend API (auth, BD, endpoints) | ⏳ Próximo | 6-10 h |
| 9  | Pasarela de pago real | ⏳ | 4-6 h |
| 10 | CMS y catálogo dinámico | ⏳ | 4-6 h |
| 11 | Imágenes reales y media | ⏳ | 3-5 h |
| 12 | Internacionalización (i18n) | ⏳ | 3-5 h |
| 13 | Analytics y tracking | ⏳ | 2-3 h |
| 14 | Auditoría Lighthouse + WCAG AA | ⏳ | 3-5 h |
| **Subtotal** | **Producción-ready** | ⏳ | **25-40 h** |

---

## 🎯 CÓMO USAR EN PRÁCTICA

### **Escenario: Se acabó el contexto en Checkpoint 3**

**En Claude actual:**
1. Copia el **Prompt de Continuidad de Checkpoint 4**
2. Documenta qué se hizo exactamente en Checkpoint 3
3. Nota cualquier decisión especial

**Comando exacto:**
```
"He llegado al límite de contexto. Voy a cambiar de cuenta.

ESTADO ACTUAL: Checkpoint 3 - Homepage completada
✅ Setup, Layout, Homepage funcionando perfectamente
✅ Colores exactos
✅ Responsive 100%
✅ Lighthouse >85

SIGUIENTE SESIÓN: Checkpoint 4 - Página de Producto

Aquí va el prompt de continuidad..."
```

**En nueva cuenta Claude:**
1. Pega el **Prompt de Continuidad** completo
2. Copia los **5 documentos principales** si es necesario
3. Sube el **código actual** (opcional)
4. Continúa exactamente donde se quedó

---

## 📝 TEMPLATE PARA DOCUMENTAR SESIÓN

Usa esto al terminar cada sesión:

```
═══════════════════════════════════════
🔄 REPORTE DE SESIÓN
═══════════════════════════════════════

CHECKPOINT COMPLETADO: [número]
NOMBRE: [nombre de etapa]

✅ LOGROS DE ESTA SESIÓN:
- [logro 1]
- [logro 2]
- [logro 3]

🔧 COMPONENTES CREADOS:
- [archivo 1]
- [archivo 2]
- [archivo 3]

⚙️ DECISIONES IMPORTANTES:
- [decisión 1] → [razón]
- [decisión 2] → [razón]

🐛 PROBLEMAS ENCONTRADOS:
- [problema 1] → [solución aplicada]
- [problema 2] → [solución aplicada]

📊 ESTADO DEL PROYECTO:
- Lighthouse score: [número]
- Responsive: [sí/no]
- Errores console: [sí/no]

🚀 PRÓXIMO CHECKPOINT:
[número y nombre]

⏱️ TIEMPO USADO:
[minutos] de [estimado]

📌 NOTAS:
[notas adicionales importantes]

════════════════════════════════════════
```

---

## ⚡ QUICK START CON CONTINUIDAD

### **Session 1: Checkpoint 1**
```bash
# Comando inicial
"Setup e-commerce aloe vera. 
Comenzamos desde cero con INICIO_RAPIDO_CLAUDE_CODE.md"
```

### **Session 2: Checkpoint 2**
```bash
# Comando al cambiar de cuenta
"Checkpoint 1 completado. 
Continuamos con Checkpoint 2 - Layout Global.
Aquí va prompt de continuidad específico..."
```

### **Session 3: Checkpoint 3**
```bash
# Mismo proceso
"Checkpoint 2 completado.
Continuamos con Checkpoint 3 - Homepage.
..."
```

---

## 🎓 BUENAS PRÁCTICAS

✅ **HACER:**
- Copiar el prompt de continuidad COMPLETO
- Documentar decisiones importantes
- Compartir código cuando cambies de cuenta
- Revisar el checkpoint anterior antes de continuar

❌ **NO HACER:**
- Resumir el trabajo (usa el prompt que ya lo hace)
- Explicar todo de nuevo (está en los docs)
- Saltar checkpoints
- Mezclar múltiples checkpoints en una sesión

---

## 📞 EJEMPLO REAL

**FIN DE SESIÓN 1 (Checkpoint 1):**
```
"Checkpoint 1 completado! ✅

Preparé para continuar en otra cuenta.
Copié este prompt para la próxima sesión:

[Inserta Prompt de Continuidad de Checkpoint 2]

También tomé nota:
- Usé verde #2D7B4A como primario (correcto)
- Button component soporta 3 variantes
- Tailwind config lista para usar
- No hay problemas, todo responsivo"
```

**INICIO SESIÓN 2 (Nueva cuenta):**
```
"Continúo un proyecto de e-commerce.
Estoy en Checkpoint 1 completado, voy a Checkpoint 2.

[Pega prompt de continuidad de Checkpoint 2 COMPLETO]

¿Comenzamos?"
```

---

## ✨ RESUMEN

**Con este sistema:**
1. ✅ Nunca pierdes progreso
2. ✅ La nueva cuenta entiende el contexto inmediatamente
3. ✅ No necesitas explicar de nuevo
4. ✅ Puedes cambiar de cuenta sin fricción
5. ✅ Cada checkpoint es un hito claro
6. ✅ Documentación vive en los archivos originales

---

*Sistema de Continuidad v1.1 - 19/04/2026*
*v1.0 cubría Checkpoints 1-7 (MVP). v1.1 añade Checkpoints 8-14 (Fase Producción).*
