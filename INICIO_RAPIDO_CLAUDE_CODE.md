# 🚀 GUÍA DE INICIO RÁPIDO - CLAUDE CODE

## 📋 PRE-REQUISITOS

Antes de comenzar en Claude Code, asegúrate de tener:
- Leer completamente: `PROYECTO_ALOE_ECOMMERCE_SPEC.md`
- Leer: `ARQUITECTURA_COMPONENTES.md`
- Leer: `DESIGN_SYSTEM.md`
- ✅ Tener claros objetivos y flujos
- ✅ Entender paleta de colores y tipografía

---

## 🎯 PRIORIDADES DEL MVP (Mínimo Viable Product)

### FASE 1: Estructura Base (Primer Sprint)
```
[1] Setup React + Tailwind
[2] Componentes base (Button, Input, Card)
[3] Layout global (TopBar, Navbar, Footer, CookieBanner)
[4] Homepage estructura basic
[5] Carrito con localStorage
[6] Responsive mobile
```

**Duración estimada**: 2-3 sesiones

### FASE 2: Páginas Principales (Segundo Sprint)
```
[7] Página de producto (detalle)
[8] Galería de imágenes
[9] Reviews y ratings
[10] Página de catálogo/productos
[11] Búsqueda y filtros básicos
```

**Duración estimada**: 2-3 sesiones

### FASE 3: Checkout (Tercer Sprint)
```
[12] Página de carrito completa
[13] Formulario de checkout
[14] Confirmación de orden
[15] Página de usuario/cuenta básica
```

**Duración estimada**: 2 sesiones

---

## 🔧 SETUP INICIAL EN CLAUDE CODE

### Paso 1: Crear Proyecto React
```bash
# El proyecto debe ser una aplicación React moderna
# Usaremos:
# - React (JSX)
# - Tailwind CSS (estilos)
# - React Router (navegación)
# - Lucide React (iconografía)
# - Zustand o Context API (estado global)
```

### Paso 2: Estructura de Carpetas Base
```
src/
├── components/
│   ├── layout/
│   │   ├── TopBar.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── CookieBanner.jsx
│   │   └── Layout.jsx
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── Modal.jsx
│   │   └── Toast.jsx
│   ├── products/
│   │   ├── ProductCard.jsx
│   │   ├── ProductGallery.jsx
│   │   └── ReviewCard.jsx
│   └── home/
│       ├── HeroSection.jsx
│       ├── ProductHighlight.jsx
│       └── FeaturesSection.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── ProductPage.jsx
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   └── 404.jsx
├── context/ o /store/
│   ├── CartContext.jsx
│   └── UserContext.jsx
├── data/
│   ├── products.json
│   └── categories.json
├── styles/
│   └── globals.css
├── App.jsx
└── index.js
```

### Paso 3: Importaciones Esenciales
```javascript
// En la parte superior de cada archivo
import React, { useState, useEffect } from 'react'
import { ShoppingCart, Menu, X, Heart, Star } from 'lucide-react'
import Button from '@/components/common/Button'

// Para routing
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Para estado
import { useCart } from '@/context/CartContext'
```

### Paso 4: Configuración de Tailwind
```javascript
// tailwind.config.js debe tener:
module.exports = {
  theme: {
    extend: {
      colors: {
        'primary': '#2D7B4A',
        'primary-light': '#66BB6A',
        'secondary': '#26A69A',
        // ... resto de colores
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Inter', '-apple-system', 'sans-serif'],
      },
      // Espaciado personalizado
      spacing: {
        '128': '32rem',
      }
    }
  }
}
```

---

## 📦 PRIMEROS COMPONENTES A CREAR

### 1. Button.jsx (Componente Base)
```jsx
// Requisitos:
// - Variantes: primary, secondary, text
// - Sizes: sm, md, lg
// - Disabled state
// - Loading state (opcional)
// - Full width option

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
  ...props
}) {
  const baseStyles = 'font-semibold transition-all duration-300'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-light',
    secondary: 'border-2 border-primary text-primary',
    text: 'text-primary underline'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-12 py-4 text-lg'
  }
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
```

### 2. Card.jsx
```jsx
// Simple card component con padding, border y shadow

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 ${className}`}>
      {children}
    </div>
  )
}
```

### 3. TopBar.jsx
```jsx
// Requisitos:
// - Mensajes rotatorios (3 opciones)
// - Close button en mobile
// - Background verde oscuro
// - Texto blanco centrado

export default function TopBar() {
  const [visible, setVisible] = useState(true)
  const [messageIndex, setMessageIndex] = useState(0)
  
  const messages = [
    '🚚 Envío gratis en pedidos > 30€',
    '🎁 Descuento 15% en tu primer compra',
    '📦 Entrega en 24-48h en España'
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  
  if (!visible) return null
  
  return (
    <div className="bg-primary text-white py-2 px-4 flex items-center justify-center">
      <span className="flex-1 text-center">{messages[messageIndex]}</span>
      <button onClick={() => setVisible(false)} className="md:hidden">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
```

### 4. Navbar.jsx
```jsx
// Requisitos:
// - Logo
// - Menu de navegación
// - Search bar
// - User icon
// - Cart icon con contador
// - Hamburger menu en mobile
// - Sticky en scroll

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  
  return (
    <nav className="sticky top-0 bg-white border-b border-gray-200 z-40">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between px-8 py-4">
        <div className="text-2xl font-bold text-primary">🌿 AloeVera</div>
        <div className="flex gap-6">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 text-gray-600" />
          <User className="w-5 h-5 text-gray-600" />
          <button className="relative">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">
        <div className="text-xl font-bold text-primary">🌿 AloeVera</div>
        <div className="flex gap-4">
          <ShoppingCart className="w-5 h-5" />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4 space-y-2">
          <Link to="/" className="block py-2">Inicio</Link>
          <Link to="/productos" className="block py-2">Productos</Link>
          <Link to="/contacto" className="block py-2">Contacto</Link>
        </div>
      )}
    </nav>
  )
}
```

### 5. CookieBanner.jsx
```jsx
// Requisitos:
// - RGPD compliant
// - 3 botones: Aceptar, Personalizar, Rechazar
// - Bottom-right position
// - Recordar decisión

export default function CookieBanner() {
  const [shown, setShown] = useState(true)
  
  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShown(false)
  }
  
  if (!shown) return null
  
  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-6 max-w-sm z-50 border border-gray-200">
      <h3 className="font-bold mb-2">🍪 Privacidad y Cookies</h3>
      <p className="text-sm text-gray-600 mb-4">
        Utilizamos cookies para mejorar tu experiencia. Al continuar aceptas nuestra política de privacidad.
      </p>
      <div className="flex gap-2">
        <Button size="sm" onClick={handleAccept}>Aceptar</Button>
        <button className="text-sm text-gray-600">Rechazar</button>
      </div>
    </div>
  )
}
```

---

## 🎨 PRIMER COMPONENTE PÁGINA: HomePage.jsx

```jsx
import React from 'react'
import Layout from '@/components/layout/Layout'
import HeroSection from '@/components/home/HeroSection'
import ProductHighlight from '@/components/home/ProductHighlight'
import FeaturesSection from '@/components/home/FeaturesSection'

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-lightest to-white py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Texto */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900">
              La Naturaleza en tu Piel
            </h1>
            <p className="text-lg text-gray-600">
              Productos premium de aloe vera 100% natural cultivado en España.
            </p>
            <div className="flex gap-4">
              <Button size="lg">Explorar Productos</Button>
              <Button variant="secondary" size="lg">Ver Colección</Button>
            </div>
          </div>
          
          {/* Right: Imagen */}
          <div className="bg-gradient-to-br from-primary-light to-secondary rounded-2xl h-96 flex items-center justify-center">
            <div className="text-6xl">🌿</div>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <ProductHighlight />

      {/* Características */}
      <FeaturesSection />
    </Layout>
  )
}
```

---

## 📝 DATOS INICIALES A USAR

Para empezar, usa los productos JSON que están en `DESIGN_SYSTEM.md`.

Crea un archivo `data/products.json` con los 6 productos.

```javascript
// En el componente, importa así:
import products from '@/data/products.json'

// Usa en map:
{products.map(product => (
  <ProductCard key={product.id} product={product} />
))}
```

---

## 🎯 CHECKPOINTS DE VALIDACIÓN POR SPRINT

### Sprint 1: ¿Se ve bien en móvil?
- [ ] TopBar responsive
- [ ] Navbar hamburger funciona
- [ ] Homepage se ve correctamente en 320px
- [ ] Botones son clickeables
- [ ] Colores son correctos
- [ ] Tipografía es legible

### Sprint 2: ¿Funciona la navegación?
- [ ] Puedo ver productos
- [ ] Puedo clickear un producto
- [ ] Veo detalles del producto
- [ ] Puedo agregar al carrito
- [ ] El carrito cuenta se actualiza

### Sprint 3: ¿El flujo de compra es completo?
- [ ] Puedo ver mi carrito
- [ ] Puedo proceder al checkout
- [ ] Puedo llenar formulario
- [ ] Veo confirmación final

---

## 💡 TIPS IMPORTANTES

### Performance
```javascript
// Lazy load componentes
const ProductPage = React.lazy(() => import('./pages/ProductPage'))

// Usar dentro de Suspense
<Suspense fallback={<Loading />}>
  <ProductPage />
</Suspense>
```

### Responsiveness
```javascript
// Siempre pensar mobile-first
<div className="
  px-4 md:px-8 lg:px-16  /* Padding responsive */
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  /* Grid responsive */
  text-sm md:text-base lg:text-lg  /* Tipografía responsive */
">
  {/* Contenido */}
</div>
```

### Accesibilidad
```javascript
// Siempre agregar atributos aria
<button aria-label="Abrir carrito" onClick={...}>
  <ShoppingCart />
</button>

// Input con label
<label htmlFor="email">Email:</label>
<input id="email" type="email" />
```

---

## 🔗 REFERENCIAS EN CLAUDE CODE

Cuando estés en Claude Code y necesites referencia:
- Pregunta: "¿Cuál es el color primario?" → Respuesta: "#2D7B4A"
- Pregunta: "¿Qué estructura tiene un ProductCard?" → Revisar ARQUITECTURA_COMPONENTES.md
- Pregunta: "¿Cómo implemento X?" → Revisar ejemplos en este archivo

---

## 🚀 COMANDO PARA EMPEZAR EN CLAUDE CODE

Una vez abras Claude Code, el prompt inicial podría ser:

```
"Estoy construyendo una tienda online de aloe vera para España. 
Necesito crear el MVP usando React + Tailwind.

He preparado especificaciones completas en estos archivos:
1. PROYECTO_ALOE_ECOMMERCE_SPEC.md - Requisitos completos
2. ARQUITECTURA_COMPONENTES.md - Estructura de componentes
3. DESIGN_SYSTEM.md - Colores, tipografía, datos

Por favor:
1. Crear estructura React base
2. Implementar componentes: Button, Card, TopBar, Navbar, CookieBanner
3. Crear Homepage con HeroSection y ProductHighlight
4. Agregar Navbar sticky y responsive
5. Implementar carrito básico con localStorage
6. Asegurar que sea mobile-first y 100% responsive

Paleta: Verde primario #2D7B4A, tipografía Playfair Display + Inter"
```

---

## ⚠️ ERRORES COMUNES A EVITAR

```javascript
// ❌ NO HACER: Olvidar key en lists
products.map(product => <div>{product.name}</div>)

// ✅ HACER:
products.map(product => <div key={product.id}>{product.name}</div>)

// ❌ NO HACER: className inconsistentes
<div className="px-4 md:px-8 gap-4">  // gap-4 no funciona en div

// ✅ HACER:
<div className="px-4 md:px-8">
  <div className="flex gap-4">  // gap funciona en flex

// ❌ NO HACER: Estilos inline (a menos que sea dinámica)
<div style={{color: 'red'}}>Texto</div>

// ✅ HACER:
<div className="text-red-500">Texto</div>
```

---

## 📞 DURANTE EL DESARROLLO EN CLAUDE CODE

Mientras trabajas, puedes:
1. Copiar diseños específicos de DESIGN_SYSTEM.md
2. Pedir que agregue funcionalidad nueva basándose en ARQUITECTURA_COMPONENTES.md
3. Pedir optimizaciones de CRO desde PROYECTO_ALOE_ECOMMERCE_SPEC.md
4. Iterar rápidamente en los componentes

---

*¡Listo para comenzar en Claude Code!* 🚀

Última actualización: 18/04/2026*
