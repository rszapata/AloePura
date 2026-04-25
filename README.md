# 🌿 AloePura — E-commerce full-stack

E-commerce completo de cosmética natural a base de aloe vera, desarrollado como proyecto end-to-end: catálogo, checkout, pagos con Stripe, panel de administración y subida de imágenes a CDN.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Node](https://img.shields.io/badge/Node-20-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Postgres](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## ✨ Características

### Cliente (storefront)
- 🛍️ Catálogo con filtros (categoría, precio, stock) y orden
- 🔍 Página de producto con galería, reviews y productos relacionados
- 🛒 Carrito persistente (localStorage + sync server-side opcional)
- 💳 Checkout en 3 pasos con direcciones normalizadas para BD
- 💶 Pagos reales con **Stripe** (PaymentIntents + webhook firmado)
- 👤 Cuenta de usuario con perfil editable, historial de pedidos y preferencias
- 📜 Páginas legales (RGPD, LSSI-CE): privacidad, términos, cookies, aviso legal
- ♿ Accesibilidad WCAG 2.1 AA (skip-link, focus-visible, ARIA, reduced-motion)
- 🔍 SEO dinámico con `<title>` y meta description por página

### Panel admin
- 📊 Dashboard con KPIs (ingresos, pedidos por estado, top productos)
- 📦 CRUD de productos con **subida real de imágenes a Cloudinary** (signed uploads)
- 🚚 Gestión de pedidos: filtros, cambio de estado, número de tracking, notas internas
- 👥 Gestión de usuarios: promoción a admin con auto-protección
- 🔐 Guard `RequireAdmin` con redirección y pantalla 403

---

## 🧱 Stack

| Capa | Tecnologías |
|---|---|
| **Frontend** | React 19, Vite 8, React Router 7, Tailwind CSS v4 (`@theme`), Context API |
| **Backend** | Node.js 20, Express, PostgreSQL 16, Knex (migrations), Zod (validación) |
| **Auth** | JWT + bcrypt, middleware `requireAuth` / `requireAdmin` |
| **Pagos** | Stripe (PaymentIntents + Webhooks) |
| **Imágenes** | Cloudinary (signed uploads directos navegador → CDN) |
| **Despliegue** | Render (`render.yaml` blueprint, Postgres + Web service) |

---

## 📁 Estructura del repo

```
.
├── aloe-ecommerce/        # Frontend (Vite + React)
│   ├── src/
│   │   ├── components/    # ui, admin, auth, catalog, checkout, …
│   │   ├── context/       # Auth, Cart, Checkout
│   │   ├── pages/         # rutas públicas + /admin/*
│   │   ├── lib/           # api.js, cloudinary.js, stripe.js
│   │   ├── hooks/         # usePageMeta, …
│   │   └── utils/         # address.js, formatPrice.js
│   └── README.md
│
├── backend/               # API REST (Express + Postgres)
│   ├── src/
│   │   ├── routes/        # auth, productos, ordenes, payments, admin
│   │   ├── controllers/
│   │   ├── models/        # SQL parametrizado
│   │   ├── middleware/    # auth, validate, errorHandler
│   │   ├── services/      # stripe, cloudinary
│   │   └── utils/         # jwt, password, errors
│   ├── migrations/        # Knex
│   ├── seeds/             # productos de ejemplo
│   ├── scripts/           # make-admin.js
│   └── README.md
│
└── README.md              # este archivo
```

---

## 🚀 Setup local

### Requisitos
- Node.js ≥ 20
- PostgreSQL ≥ 14 (local o Docker)
- (Opcional) cuenta Stripe modo test
- (Opcional) cuenta Cloudinary

### Backend

```bash
cd backend
cp .env.example .env
# Edita .env con tus valores (DATABASE_URL, JWT_SECRET, …)
npm install
npm run migrate          # crea schema
npm run seed             # productos de ejemplo
npm run dev              # http://localhost:5000
```

Para promover tu usuario a admin (después de registrarte por la web):
```bash
npm run make-admin tu@email.com
```

### Frontend

```bash
cd aloe-ecommerce
npm install
npm run dev              # http://localhost:5173
```

`.env.development` ya viene con `VITE_API_URL=http://localhost:5000/api`. Si quieres usar Stripe en local, añade tu propia `VITE_STRIPE_PUBLISHABLE_KEY` (`pk_test_…`).

---

## 🔑 Variables de entorno

Ver `backend/.env.example` y `aloe-ecommerce/.env.example` para la lista completa con descripciones.

**Resumen rápido:**

| Servicio | Variables | Notas |
|---|---|---|
| Postgres | `DATABASE_URL` | `postgresql://user:pass@host:5432/db` |
| JWT | `JWT_SECRET`, `JWT_EXPIRES_IN` | Genera con `crypto.randomBytes(64).toString('hex')` |
| Stripe | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `VITE_STRIPE_PUBLISHABLE_KEY` | Modo test sirve para desarrollo |
| Cloudinary | `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | El `API_SECRET` jamás sale del backend |
| CORS | `CORS_ORIGINS` | Lista de orígenes permitidos separados por coma |

---

## 🚢 Despliegue

El backend incluye `render.yaml` para deploy en **Render** como Blueprint:
- Provisiona Postgres 16 + Web Service Node
- Ejecuta `migrate + seed` en cada deploy
- Genera `JWT_SECRET` automáticamente

El frontend se puede desplegar en **Vercel**, **Netlify** o **Render Static Site**:
```bash
npm run build    # → dist/
```

---

## 🗺️ Roadmap

Implementado en checkpoints incrementales (ver historial de commits):

- ✅ Catálogo + carrito + checkout
- ✅ Auth JWT + cuenta de usuario
- ✅ Pasos del checkout normalizados (calle/número/piso/puerta)
- ✅ Pagos con Stripe + webhook
- ✅ Base de datos (Postgres + Knex)
- ✅ Páginas legales + accesibilidad + code splitting
- ✅ Panel de administración (Checkpoint 10)
- ✅ Subida de imágenes Cloudinary (Checkpoint 11)
- 🔜 Transformaciones de imagen on-the-fly (`f_auto,q_auto,w_*`)
- 🔜 Tests (vitest + supertest)
- 🔜 Editor rich-text para descripciones largas

---

## 📄 Licencia

[MIT](./LICENSE) — uso libre para aprendizaje y proyectos derivados.
