# Aloe Ecommerce — Backend

API REST para la tienda de productos de aloe vera.

**Stack:** Node.js 20 · Express · PostgreSQL · JWT · bcrypt · Zod · Knex (solo migraciones) · Stripe · Cloudinary.

> 📖 Para una visión completa del proyecto, ver el [README raíz](../README.md).

## Requisitos

- Node.js >= 20
- PostgreSQL >= 14 (local) o URL de Render

## Setup local

```bash
cp .env.example .env
# Editar .env con DATABASE_URL local y JWT_SECRET
npm install
npm run migrate
npm run seed
npm run dev
```

El servidor arranca en `http://localhost:5000`.
Healthcheck: `GET /health`.

## Variables de entorno

| Variable | Descripción |
|---|---|
| `NODE_ENV` | `development` \| `production` |
| `PORT` | Puerto HTTP (default 5000) |
| `DATABASE_URL` | Connection string Postgres (`postgresql://user:pass@host:5432/db`) |
| `JWT_SECRET` | Secreto para firmar tokens (min 32 chars) |
| `JWT_EXPIRES_IN` | Duración del token (default `7d`) |
| `CORS_ORIGINS` | Lista separada por comas de orígenes permitidos |
| `AUTH_RATE_LIMIT_MAX` | Máx. requests a /login y /register por ventana (default 10) |
| `AUTH_RATE_LIMIT_WINDOW_MS` | Ventana de rate-limit en ms (default 900000 = 15min) |

## Scripts

```bash
npm run dev          # watch mode
npm start            # producción
npm run migrate      # aplica migraciones pendientes
npm run seed         # siembra productos + reviews de ejemplo
npm run make-admin <email>   # promueve usuario a admin
```

## Endpoints

### Auth (`/api/auth`)

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/register` | Crea cuenta → `{ user, token }` |
| POST | `/login` | Inicia sesión → `{ user, token }` |
| GET | `/me` | Datos del usuario autenticado (Bearer) |

Rate limit: 10 reqs / 15 min por IP.

### Productos (`/api/productos`)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Lista paginada (`?page=1&limit=12&categoria=gel&sort=featured&onlyInStock=true`) |
| GET | `/:id` | Producto por ID |
| GET | `/slug/:slug` | Producto por slug |
| GET | `/:id/related` | Productos relacionados |
| GET | `/:id/reviews` | Reviews del producto |
| POST | `/:id/reviews` | Crear review (requiere auth) |

### Usuarios (`/api/usuarios`) — todas requieren Bearer

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/me` | Perfil del usuario |
| PATCH | `/me` | Actualiza perfil (nombre, telefono, direccion, etc.) |
| GET | `/me/ordenes` | Historial de órdenes |
| GET | `/me/ordenes/:id` | Detalle de una orden |

### Órdenes (`/api/ordenes`) — Bearer

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/` | Crea orden (valida y descuenta stock en transacción) |

Body: `{ items: [{producto_id, cantidad}], direccionEnvio, direccionFacturacion?, metodoPago, notas? }`.
`metodoPago`: `tarjeta` \| `transferencia` \| `contrareembolso`.
Envío gratis ≥ 40€, si no 3.99€.

### Carrito (`/api/carrito`) — Bearer (sync server-side opcional)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Carrito persistido del usuario |
| PUT | `/` | Reemplaza items `{ items: [{producto_id, cantidad}] }` |
| DELETE | `/` | Vacía el carrito |

### Pagos (`/api/payments`)

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/create-intent` | Crea PaymentIntent en Stripe (Bearer) |
| POST | `/webhook` | Endpoint de webhooks Stripe (firma verificada con `STRIPE_WEBHOOK_SECRET`) |

> El webhook recibe el body **crudo** (no JSON) — montado antes de `express.json()`.

### Admin (`/api/admin`) — Bearer + `rol = 'admin'`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/stats` | KPIs del dashboard (ingresos, pedidos por estado, top productos) |
| GET / POST | `/productos` | Listado paginado / crear |
| GET / PATCH / DELETE | `/productos/:id` | CRUD individual (DELETE = soft delete) |
| GET | `/ordenes` | Listado con filtros (`estado`, `search`, `page`) |
| PATCH | `/ordenes/:id` | Cambiar estado / tracking / notas |
| GET | `/usuarios` | Listado de usuarios |
| PATCH | `/usuarios/:id/rol` | Promover/degradar admin (auto-protegido) |
| GET | `/uploads/signature` | Firma para upload directo a Cloudinary |
| DELETE | `/uploads?public_id=…` | Borra asset del CDN |

## Estructura

```
src/
  config.js         # Carga y valida env
  db.js             # Pool de pg + query() + withTransaction()
  index.js          # App Express (CORS, routes, error handler)
  middleware/       # auth, validate, errorHandler
  utils/            # jwt, password, errors
  models/           # user, product, review (SQL raw parametrizado)
  controllers/      # Lógica HTTP
  routes/           # Definición de rutas + schemas Zod
migrations/         # Knex — schema
seeds/              # Knex — data inicial
```

## Deploy en Render

1. Crear el servicio desde este repo con `render.yaml` como Blueprint.
2. Render provisiona automáticamente:
   - Postgres 16 (plan free)
   - Web service Node (ejecuta `migrate + seed` en cada deploy)
3. Configurar manualmente:
   - `CORS_ORIGINS` → URL del frontend en producción (ej. `https://aloe-shop.vercel.app`)
4. El `JWT_SECRET` lo genera Render automáticamente.

**Internal Database URL:** usar la URL *interna* que provee Render (no la externa), para que el tráfico no salga de la red privada.

**SSL:** en producción el pool activa `ssl: { rejectUnauthorized: false }` automáticamente.

## Notas técnicas

- **Runtime:** pg raw parametrizado (`$1, $2, ...`). Knex solo para schema.
- **NUMERIC:** `pg.types.setTypeParser(1700, parseFloat)` convierte `DECIMAL` a `number` en JSON.
- **Passwords:** bcrypt con `SALT_ROUNDS=12`.
- **Errores:** clase `HttpError` → `errorHandler` devuelve `{ error: { code, message, details? } }`. `23505` (UNIQUE violation) → 409.
- **Transacciones:** `withTransaction(async client => { ... })` hace BEGIN/COMMIT/ROLLBACK.
