# AloePura — Frontend

SPA en React 19 + Vite 8 + Tailwind CSS v4 para la tienda online de AloePura.

> 📖 Para una visión completa del proyecto, ver el [README raíz](../README.md).

## Setup local

```bash
npm install
npm run dev          # http://localhost:5173
```

Requiere el backend corriendo en `http://localhost:5000` (ver [`../backend`](../backend)).

## Variables de entorno

Copia `.env.example` y rellena lo que necesites:

| Variable | Notas |
|---|---|
| `VITE_API_URL` | Default `http://localhost:5000/api` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_test_…` para modo desarrollo. Las claves publishable son públicas por diseño. |

## Scripts

```bash
npm run dev          # dev server con HMR
npm run build        # build de producción → dist/
npm run preview      # sirve el build localmente
npm run lint         # ESLint
```

## Estructura

```
src/
├── components/
│   ├── admin/        # AdminLayout, ImageUpload (signed Cloudinary)
│   ├── auth/         # RequireAuth, RequireAdmin, AuthShell
│   ├── cart/
│   ├── catalog/      # FilterDropdown, ProductCard, …
│   ├── checkout/     # 3 pasos del checkout
│   ├── common/       # Button, Input, Breadcrumb, CookieBanner, …
│   ├── home/
│   ├── layout/       # Navbar, Footer, Layout
│   └── product/
├── context/
│   ├── AuthContext.jsx     # JWT + perfil
│   ├── CartContext.jsx     # localStorage + sync server
│   ├── CartUIContext.jsx   # drawer del carrito
│   └── CheckoutContext.jsx # estado del checkout (sessionStorage)
├── pages/
│   ├── admin/        # Dashboard, Products, Orders, Users
│   └── …
├── lib/
│   ├── api.js        # fetch wrapper + endpoints tipados
│   ├── cloudinary.js # signed uploads + delete
│   └── stripe.js
├── hooks/
│   └── usePageMeta.js
└── utils/
    ├── address.js    # schema normalizado para BD
    └── formatPrice.js
```

## Highlights técnicos

- **Code splitting** por ruta con `React.lazy()` + `<Suspense>` (HomePage permanece eager).
- **Error boundary** a nivel ruta (`RouteErrorBoundary`).
- **Direcciones normalizadas**: `street/number/floor/door` separados (matchea schema Postgres).
- **Subida de imágenes** signed: el FE pide firma al backend y POSTea directo a Cloudinary — la imagen no pasa por nuestro servidor.
- **Accesibilidad**: skip-link, `:focus-visible`, ARIA en tabs/nav/forms, soporte `prefers-reduced-motion`.
- **SEO**: hook `usePageMeta` actualiza `<title>` + meta description por página.
- **Tailwind v4**: configuración inline con `@theme {}` en `index.css` (sin `tailwind.config.js`). El modificador `!important` va como **sufijo** (`border-red-500!`), no prefijo.
