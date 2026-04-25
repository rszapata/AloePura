# 🌿 AloePura — E-commerce Full-Stack

Tienda online completa construida desde cero con React 19, Node.js y PostgreSQL. Incluye catálogo con filtros, carrito persistente, checkout con pagos reales via Stripe y panel de administración completo.

---

## Capturas

### Inicio
![Inicio](assets/Index.png)

### Política de Cookies (RGPD)
![Cookies RGPD](assets/Cookies_RGPD_UEuropea.png)

### Catálogo de productos
![Productos](assets/Productos.png)

### Carrito
![Carrito](assets/Carrito_envio_gratis.png)

### Checkout — Pago con Stripe
![Pago Stripe](assets/Pago_Stripe.png)

### Mi cuenta — Mis pedidos
![Mis pedidos](assets/Mi_Cuenta_pedidos.png)

### Panel Admin — Dashboard
![Panel Admin](assets/Panel_admin.png)

### Panel Admin — Pedidos
![Admin Pedidos](assets/Admin_Pedidos.png)

---

## Descripción

AloePura es un e-commerce funcional con todo el ciclo de compra implementado: desde la navegación del catálogo hasta la confirmación del pago. El proyecto cubre tanto el lado del cliente como el panel de administración y la integración con servicios externos (Stripe, Cloudinary).

---

## Páginas

| Página | Descripción |
|---|---|
| **Inicio** | Landing con productos destacados y navegación principal |
| **Productos** | Catálogo con filtros por categoría, precio y búsqueda |
| **Contacto** | Formulario de contacto |
| **Mi cuenta → Mi perfil** | Datos personales del usuario |
| **Mi cuenta → Mis pedidos** | Historial de órdenes con estado en tiempo real |
| **Mi cuenta → Preferencias** | Configuración de la cuenta |
| **Panel Admin** | CRUD completo de productos, pedidos y usuarios (solo rol admin) |

---

## Stack

| Tecnología | Uso |
|---|---|
| **React 19** | Frontend con code splitting (React.lazy) |
| **Node.js + Express** | API REST backend |
| **PostgreSQL** | Base de datos relacional |
| **Knex** | Query builder y migraciones |
| **Stripe** | Pagos (Payment Intents + webhooks) |
| **Cloudinary** | Almacenamiento y gestión de imágenes |
| **JWT** | Autenticación con guards por rol |

---

## Funcionalidades destacadas

**Catálogo y carrito**
- Filtros por categoría, rango de precios y búsqueda en tiempo real
- Carrito lateral persistente con barra de progreso hacia envío gratis

**Checkout en 3 pasos**
- Paso 1: Datos de contacto
- Paso 2: Dirección de envío con normalización para base de datos
- Paso 3: Pago con Stripe (Payment Intents)

**Pagos con Stripe**
- Integración completa con Payment Intents
- Webhooks para confirmar el estado del pago server-side
- El pedido se confirma solo cuando Stripe valida el cobro

**Autenticación y roles**
- Registro e inicio de sesión con JWT
- Guards por rol: `customer` accede a su cuenta, `admin` accede al panel de administración
- Rutas protegidas en frontend y backend

**Panel de administración**
- Dashboard con ingresos totales, pedidos, productos activos y clientes
- CRUD completo de productos con subida de imágenes (signed-upload directo a Cloudinary)
- Gestión de pedidos con estados: Pendiente, Pagada, Enviada, Reembolsada, Cancelada
- Administración de usuarios

**Cumplimiento legal**
- Política de cookies con opciones de aceptar, personalizar y rechazar (RGPD)
- Política de privacidad y aviso legal
- Accesibilidad WCAG 2.1 AA

---

## Instalación

### Requisitos

- Node.js ≥ 18
- PostgreSQL

### Configuración

1. Clonar el repositorio.
2. Crear un archivo `.env` en `/server`:

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/aloepura
JWT_SECRET=tu_jwt_secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

> ⚠️ **Nunca subas `.env` a GitHub.** Está incluido en `.gitignore`.

### Ejecutar migraciones

```bash
cd server && npx knex migrate:latest
```

### Ejecutar el proyecto

```bash
# Backend (puerto 4000)
cd server && npm run dev

# Frontend (puerto 5173)
cd client && npm run dev
```

---

## Estructura

```
aloepura/
├── client/                  # Frontend React
│   ├── src/
│   │   ├── pages/           # index, productos, contacto, cuenta, admin
│   │   ├── components/      # Componentes reutilizables
│   │   └── context/         # Estado global (carrito, auth)
│   └── public/
├── server/                  # Backend Node.js + Express
│   ├── routes/              # Productos, pedidos, usuarios, pagos
│   ├── middleware/          # Auth JWT, guards por rol
│   ├── db/
│   │   └── migrations/      # Migraciones Knex
│   └── index.js
├── assets/                  # Capturas de pantalla
└── README.md
```

---

## Decisiones técnicas

- **Payment Intents sobre Checkout de Stripe**: permite mayor control sobre el flujo de pago y personalización de la UI sin redirigir al usuario a una página externa.
- **Webhooks para confirmar pedidos**: el estado del pedido se actualiza server-side solo cuando Stripe confirma el cobro, evitando pedidos confirmados sin pago real.
- **Signed-upload a Cloudinary**: las imágenes se suben directamente desde el browser a Cloudinary con una firma generada por el servidor, evitando que el API secret quede expuesto en el frontend.
- **Guards por rol en frontend y backend**: la protección de rutas existe en ambas capas — el frontend para UX, el backend para seguridad real.
- **Knex para migraciones**: permite versionar los cambios de esquema de la base de datos y reproducir el entorno exacto en cualquier deploy.

---

## Autor

**Rodrigo Nicolás Zapata**  
[LinkedIn](https://linkedin.com/in/rnzapata) · [GitHub](https://github.com/rszapata)
