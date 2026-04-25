# 🏗️ ARQUITECTURA DE COMPONENTES - E-COMMERCE ALOE VERA

## 📦 ESTRUCTURA DE DATOS

### 1. MODELO DE PRODUCTO
```javascript
{
  id: string (UUID),
  name: string,
  slug: string, // "gel-puro-aloe-100ml"
  category: "skincare" | "body" | "hair" | "supplements",
  description: string,
  longDescription: string, // Para page
  price: number,
  originalPrice?: number,
  discount?: number, // %
  image: string, // URL principal
  images: string[], // Galería
  rating: number, // 0-5
  reviewCount: number,
  reviews: Review[], // Expandable
  
  // Stock & Availability
  stock: number,
  sku: string,
  available: boolean,
  
  // Especificaciones
  specs: {
    size: string,
    skinType: string[],
    ingredients: string[],
    vegan: boolean,
    organic: boolean,
    dermatologyTested: boolean,
    paraben_free: boolean,
  },
  
  // Marketing
  featured: boolean,
  bestseller: boolean,
  new: boolean,
  tags: string[],
  
  // Meta
  seo: {
    metaDescription: string,
    keywords: string[],
  }
}

// Ejemplo de Producto
{
  id: "prod_001",
  name: "Gel Puro de Aloe Vera 100ml",
  slug: "gel-puro-aloe-100ml",
  category: "skincare",
  description: "Gel puro, hidratante y calmante para rostro y cuerpo",
  longDescription: "Gel 100% puro de aloe vera...",
  price: 12.99,
  originalPrice: 15.99,
  discount: 18,
  image: "https://cdn.example.com/gel-1.jpg",
  images: [
    "https://cdn.example.com/gel-1.jpg",
    "https://cdn.example.com/gel-2.jpg",
    "https://cdn.example.com/gel-3.jpg",
  ],
  rating: 4.8,
  reviewCount: 234,
  stock: 145,
  sku: "ALO-001-100ML",
  available: true,
  specs: {
    size: "100ml",
    skinType: ["Todas", "Seca", "Sensible"],
    ingredients: ["Aloe Vera", "Glicerina", "Vitamina E"],
    vegan: true,
    organic: true,
    dermatologyTested: true,
    paraben_free: true,
  },
  featured: true,
  bestseller: true,
  new: false,
  tags: ["aloe-vera", "hidratante", "natural", "calmante"],
  seo: {
    metaDescription: "Gel puro de aloe vera 100ml - Hidratación natural",
    keywords: ["aloe vera", "gel hidratante", "natural"],
  }
}
```

### 2. MODELO DE REVIEW
```javascript
{
  id: string,
  productId: string,
  userId: string,
  rating: number, // 1-5
  title: string,
  content: string,
  verified: boolean, // Compra verificada
  helpful: number, // Votos de utilidad
  author: {
    name: string,
    avatar?: string,
  },
  createdAt: Date,
}
```

### 3. MODELO DE CARRITO
```javascript
{
  items: [
    {
      productId: string,
      quantity: number,
      price: number, // Precio en momento de agregación
      addedAt: Date,
    }
  ],
  coupon?: {
    code: string,
    discount: number, // % o cantidad
  },
  updatedAt: Date,
}
```

### 4. MODELO DE USUARIO
```javascript
{
  id: string,
  email: string,
  password: string (hashed),
  name: string,
  avatar?: string,
  
  // Dirección
  address: {
    street: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
  },
  
  // Preferencias
  preferences: {
    newsletter: boolean,
    notifications: boolean,
  },
  
  // Historial
  orders: Order[],
  wishlist: string[], // productIds
  
  createdAt: Date,
  updatedAt: Date,
}
```

### 5. MODELO DE ORDEN
```javascript
{
  id: string,
  userId: string,
  items: [
    {
      productId: string,
      quantity: number,
      price: number,
    }
  ],
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled",
  
  // Dirección de envío
  shippingAddress: {
    name: string,
    email: string,
    phone: string,
    street: string,
    city: string,
    postalCode: string,
  },
  
  // Pagos
  paymentMethod: "bizum" | "card" | "paypal" | "transfer",
  paymentId: string,
  
  // Totales
  subtotal: number,
  shipping: number,
  tax: number,
  discount: number,
  total: number,
  
  createdAt: Date,
  updatedAt: Date,
}
```

---

## 🧩 ARQUITECTURA DE COMPONENTES

### COMPONENTES GLOBALES (Siempre visibles)

```
<Layout>
  ├── <TopBar /> (Banner de promoción)
  ├── <Navbar /> (Menú principal + Cart)
  ├── {children} (Contenido de página)
  ├── <Newsletter /> (CTA de email)
  ├── <Footer />
  └── <CookieBanner /> (RGPD)
  └── <CartSidebar /> (Carrito flotante)
```

### PÁGINA: HOMEPAGE

```
<HomePage>
  ├── <HeroSection />
  │   ├── Imagen + Gradiente
  │   ├── Headline + Subheadline
  │   ├── CTA Buttons
  │   └── Trust Badges
  │
  ├── <ProductHighlight /> (3 productos principales)
  │   ├── <ProductCard /> × 3
  │   └── "Ver Más"
  │
  ├── <CategoriesGrid /> (6-8 categorías)
  │   └── <CategoryCard /> × n
  │
  ├── <TestimonialsSection />
  │   └── <TestimonialCard /> × 3
  │
  ├── <FeaturesSection /> (4 ventajas)
  │   └── <FeatureCard /> × 4
  │
  ├── <NewsletterCTA />
  │   └── Email input + Submit
  │
  └── <SocialProof /> (números de confianza)
      ├── "15,000+ clientes satisfechos"
      ├── "4.8★ rating"
      └── "Envíos en 48h"
```

### PÁGINA: CATÁLOGO (Products List)

```
<ProductsPage>
  ├── <PageHeader />
  │   └── "Nuestros Productos"
  │
  ├── <FiltersBar /> (Sidebar en mobile/desktop)
  │   ├── <FilterCategory />
  │   ├── <FilterPrice />
  │   ├── <FilterRating />
  │   ├── <FilterTags />
  │   └── <ClearFilters />
  │
  ├── <SortBar />
  │   └── Dropdown: [Relevancia, Precio, Mejor Valorado, Nuevos]
  │
  ├── <ProductGrid />
  │   └── <ProductCard /> × n
  │
  └── <Pagination />
```

### PÁGINA: PRODUCTO (Product Detail)

```
<ProductPage>
  ├── <Breadcrumb /> (Inicio > Skincare > Producto)
  │
  ├── <ProductGrid>
  │   ├── <ImageGallery />
  │   │   ├── Main image (large)
  │   │   ├── Thumbnails (carousel)
  │   │   └── Lightbox modal
  │   │
  │   └── <ProductInfo />
  │       ├── <ProductTitle /> + Rating + SKU
  │       ├── <PriceTag /> (actual + original + descuento)
  │       ├── <TrustBadges /> (4-5 sellos)
  │       ├── <BenefitsList />
  │       ├── <QuantitySelector />
  │       ├── <AddToCartButton /> + <WishlistButton />
  │       ├── <ShippingInfo />
  │       ├── <SpecsTable />
  │       └── <ShareButtons />
  │
  ├── <TabsSection />
  │   ├── Tab: "Descripción"
  │   ├── Tab: "Ingredientes"
  │   ├── Tab: "Modo de uso"
  │   └── Tab: "Opiniones" (234 reviews)
  │
  ├── <ReviewsSection />
  │   ├── <ReviewSummary /> (Rating + Review Count)
  │   ├── <ReviewFilters />
  │   ├── <ReviewList /> (8 items)
  │   │   └── <ReviewCard /> × 8
  │   ├── <ReviewPagination />
  │   └── <ReviewForm /> (Dejar opinión)
  │
  ├── <RelatedProducts />
  │   └── <ProductCard /> × 3
  │
  └── <FAQSection /> (Preguntas frecuentes del producto)
      └── <FAQItem /> × n
```

### PÁGINA: CARRITO

```
<CartPage>
  ├── <CartEmpty /> (Si no hay items)
  │   ├── "Tu carrito está vacío"
  │   └── CTA a productos
  │
  └── <CartFull />
      ├── <CartItemsList />
      │   └── <CartItem /> × n
      │       ├── Imagen producto
      │       ├── Nombre + Precio
      │       ├── Quantity selector
      │       └── Delete button
      │
      ├── <CouponSection />
      │   └── Input + Apply button
      │
      ├── <CartSummary />
      │   ├── Subtotal
      │   ├── Shipping (gratis/pagado)
      │   ├── Tax (IVA)
      │   ├── Discount
      │   └── TOTAL
      │
      ├── <CheckoutButton /> (Proceder pago)
      │
      └── <ContinueShopping /> (Link a productos)
```

### PÁGINA: CHECKOUT

```
<CheckoutPage>
  ├── <ProgressBar /> (Paso 1/3, 2/3, 3/3)
  │
  ├── Step 1: INFORMACIÓN
  │   ├── <LoginForm /> O <GuestCheckout />
  │   ├── Email input
  │   └── Newsletter checkbox
  │
  ├── Step 2: ENVÍO
  │   ├── <AddressForm />
  │   │   ├── Nombre
  │   │   ├── Teléfono
  │   │   ├── Dirección
  │   │   ├── Ciudad
  │   │   ├── CP
  │   │   └── Save address checkbox
  │   │
  │   └── <ShippingMethods />
  │       ├── Radio: "24-48h (€2.99)"
  │       └── Radio: "3-5 días (Gratis > €30)"
  │
  ├── Step 3: PAGO
  │   ├── <PaymentMethods />
  │   │   ├── Bizum
  │   │   ├── Tarjeta Crédito
  │   │   ├── PayPal
  │   │   └── Transferencia
  │   │
  │   └── <PaymentForm /> (dinámica según método)
  │
  ├── <OrderReview />
  │   ├── Items resumen
  │   ├── Dirección
  │   ├── Método pago
  │   └── Total final
  │
  └── <SubmitButton /> ("Confirmar Pedido")
```

### PÁGINA: CONFIRMACIÓN

```
<OrderConfirmation>
  ├── <SuccessMessage />
  │   ├── ✓ Icono
  │   ├── "¡Pedido confirmado!"
  │   └── Número de orden
  │
  ├── <OrderDetails />
  │   ├── Items comprados
  │   ├── Total pagado
  │   ├── Dirección envío
  │   └── Número seguimiento
  │
  ├── <EmailSent />
  │   └── "Confirmación enviada a tu email"
  │
  └── <NextSteps />
      ├── Button: "Ir a mis compras"
      ├── Button: "Seguir comprando"
      └── Button: "Descargar factura"
```

### PÁGINA: CUENTA USUARIO

```
<UserAccount>
  ├── <Sidebar>
  │   ├── Avatar + Nombre
  │   ├── Link: "Mi perfil"
  │   ├── Link: "Mis compras"
  │   ├── Link: "Direcciones"
  │   ├── Link: "Métodos de pago"
  │   ├── Link: "Wishlist"
  │   ├── Link: "Preferencias"
  │   └── Button: "Logout"
  │
  └── <Content>
      ├── <ProfileEdit /> (Nombre, email, avatar)
      ├── <OrderHistory /> (Tabla de compras)
      ├── <AddressesList /> (Direcciones guardadas)
      ├── <PaymentMethods /> (Tarjetas guardadas)
      ├── <WishlistPage />
      └── <Preferences /> (Newsletter, notifications)
```

---

## 🎨 COMPONENTES REUTILIZABLES

### Básicos
```
<Button /> - Primario, secundario, text-only
<Input /> - Text, email, number, password
<Select /> - Dropdown
<Checkbox /> / <Radio />
<Badge /> - Para labels (Bestseller, New, etc)
<Rating /> - Stars (1-5)
<Tag /> - Para filters/categorías
<Modal /> - Popup dialogs
<Tabs /> - Tab navigation
<Toast /> - Notificaciones flotantes
<Tooltip /> - Información al hover
```

### Complejos
```
<ProductCard /> - Card producto (display flexible)
<ReviewCard /> - Card opinión
<TestimonialCard /> - Card testimonio
<CategoryCard /> - Card categoría
<CartItem /> - Item dentro del carrito
<ImageGallery /> - Galería con thumbnails
<AddressForm /> - Formulario dirección
<PaymentForm /> - Formulario pago dinámico
<FilterPanel /> - Panel de filtros
<PriceTag /> - Display de precio (actual + original + %)
<TrustBadges /> - Sellos de confianza (4-5)
<StockIndicator /> - Indicador de disponibilidad
<Newsletter /> - Email signup
```

---

## 🔄 STATE MANAGEMENT

### Zustand Stores (Recomendado)

```javascript
// store/cartStore.js
import create from 'zustand'

export const useCartStore = create((set) => ({
  items: [],
  addItem: (product, quantity) => set(state => ({
    items: [...state.items, { ...product, quantity }]
  })),
  removeItem: (productId) => set(state => ({
    items: state.items.filter(item => item.id !== productId)
  })),
  updateQuantity: (productId, quantity) => set(state => ({
    items: state.items.map(item =>
      item.id === productId ? { ...item, quantity } : item
    )
  })),
  clearCart: () => set({ items: [] }),
  total: (state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
}))

// store/userStore.js
export const useUserStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  updateProfile: (data) => set(state => ({
    user: { ...state.user, ...data }
  })),
}))

// store/uiStore.js
export const useUIStore = create((set) => ({
  cartOpen: false,
  toggleCart: () => set(state => ({ cartOpen: !state.cartOpen })),
  mobileMenuOpen: false,
  toggleMobileMenu: () => set(state => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  cookieConsent: null,
  setCookieConsent: (consent) => set({ cookieConsent: consent }),
}))
```

---

## 📁 ESTRUCTURA DE CARPETAS

```
src/
├── components/
│   ├── Layout/
│   │   ├── TopBar.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── CookieBanner.jsx
│   │   └── CartSidebar.jsx
│   │
│   ├── Products/
│   │   ├── ProductCard.jsx
│   │   ├── ProductGallery.jsx
│   │   ├── ProductInfo.jsx
│   │   ├── ReviewList.jsx
│   │   └── ReviewForm.jsx
│   │
│   ├── Cart/
│   │   ├── CartItem.jsx
│   │   ├── CartSummary.jsx
│   │   └── CartEmpty.jsx
│   │
│   ├── Checkout/
│   │   ├── CheckoutForm.jsx
│   │   ├── AddressForm.jsx
│   │   ├── PaymentForm.jsx
│   │   └── OrderReview.jsx
│   │
│   ├── Common/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   ├── Rating.jsx
│   │   └── Badge.jsx
│   │
│   └── Homepage/
│       ├── HeroSection.jsx
│       ├── ProductHighlight.jsx
│       ├── CategoriesGrid.jsx
│       ├── TestimonialsSection.jsx
│       └── FeaturesSection.jsx
│
├── pages/
│   ├── index.jsx (Homepage)
│   ├── products.jsx (Catálogo)
│   ├── products/[id].jsx (Detalle)
│   ├── cart.jsx
│   ├── checkout.jsx
│   ├── confirmation.jsx
│   ├── account.jsx
│   └── 404.jsx
│
├── hooks/
│   ├── useCart.js
│   ├── useUser.js
│   ├── useProducts.js
│   └── useFetch.js
│
├── store/
│   ├── cartStore.js
│   ├── userStore.js
│   └── uiStore.js
│
├── utils/
│   ├── api.js (Llamadas a backend)
│   ├── formatting.js (Precios, fechas)
│   ├── constants.js (URLs, keys, etc)
│   └── validation.js (Validación de formularios)
│
├── data/
│   ├── products.json (Datos iniciales)
│   ├── categories.json
│   └── testimonials.json
│
├── styles/
│   ├── globals.css (Tailwind + custom)
│   └── variables.css (CSS variables por tema)
│
├── App.jsx
└── index.js
```

---

## 🔌 INTEGRACIONES EXTERNAS

### APIs Necesarias
```
- Stripe API (Pagos internacionales)
- Redsys API (Pagos locales España)
- Resend / SendGrid (Email)
- Google Analytics 4 (Analytics)
- Cloudinary (Gestión de imágenes)
- Auth0 o Firebase Auth (Autenticación)
```

### Environment Variables
```
REACT_APP_API_URL=https://api.example.com
REACT_APP_STRIPE_PUBLIC_KEY=pk_live_...
REACT_APP_REDSYS_MERCHANT_CODE=...
REACT_APP_GA_ID=G-...
REACT_APP_CLOUDINARY_CLOUD_NAME=...
```

---

## 🎬 FLUJOS DE USUARIO TÉCNICOS

### Flujo: Agregar al Carrito
```
1. Usuario hace click en ProductCard
2. Se abre Modal con galería + cantidad
3. Selecciona cantidad
4. Click "Agregar al Carrito"
5. useCartStore.addItem() actualiza estado
6. Toast de confirmación aparece
7. Contador de carrito se actualiza
8. Modal se cierra (opcional)
```

### Flujo: Checkout
```
1. Usuario en carrito hace click "Proceder Pago"
2. Si no logged in → Redirect a login/register
3. Si logged in → Step 1: Confirmar email
4. Step 2: Dirección envío
5. Step 2b: Seleccionar método de envío
6. Step 3: Seleccionar método de pago
7. Mostrar resumen final
8. Click "Confirmar Pedido"
9. Enviar datos a backend API
10. Backend procesa pago con Stripe/Redsys
11. Si success → Redirect a página de confirmación
12. Email de confirmación se envía
13. Mostrar número de seguimiento
```

### Flujo: Login Social (Futuro)
```
1. Usuario hace click "Continuar con Google/Apple"
2. Redirige a Google/Apple OAuth
3. Usuario autoriza
4. Backend intercambia token
5. Usuario autenticado automáticamente
6. Datos de usuario se populan
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [ ] Componentes base (Button, Input, etc)
- [ ] Zustand stores
- [ ] Layouts (TopBar, Navbar, Footer)
- [ ] Homepage completa
- [ ] Página de producto
- [ ] Carrito funcional
- [ ] Checkout básico
- [ ] Sistema de usuarios (localStorage)
- [ ] Formulario de reviews
- [ ] Búsqueda y filtros
- [ ] Responsive design
- [ ] Accesibilidad (WCAG 2.1 AA)
- [ ] Performance optimization
- [ ] Cookie banner (RGPD)
- [ ] Analytics tracking
- [ ] SEO basics (meta tags, sitemaps)
- [ ] Testing (Unit + E2E)

---

*Documento versión 1.0 - Actualizado 18/04/2026*
