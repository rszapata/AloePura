import express from 'express'
import cors from 'cors'
import { config, isProd } from './config.js'
import { healthCheck } from './db.js'
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js'
import authRoutes from './routes/auth.routes.js'
import productsRoutes from './routes/products.routes.js'
import usersRoutes from './routes/users.routes.js'
import ordersRoutes from './routes/orders.routes.js'
import cartRoutes from './routes/cart.routes.js'
import paymentsRoutes from './routes/payments.routes.js'
import adminRoutes from './routes/admin.routes.js'
import { webhook as stripeWebhook } from './controllers/payments.controller.js'
import { asyncHandler } from './middleware/errorHandler.js'

const app = express()

app.set('trust proxy', 1)

app.use(
  cors({
    origin(origin, cb) {
      // Permitir requests sin Origin (curl, health checks)
      if (!origin) return cb(null, true)
      if (config.corsOrigins.includes(origin)) return cb(null, true)
      return cb(new Error(`Origen no permitido: ${origin}`))
    },
    credentials: true,
  })
)

// ⚠️  Webhook de Stripe: necesita el body crudo (Buffer) para verificar la
// firma. Por eso va montado ANTES de express.json() y con express.raw.
app.post(
  '/api/payments/webhook',
  express.raw({ type: 'application/json' }),
  asyncHandler(stripeWebhook)
)

app.use(express.json({ limit: '1mb' }))

app.get('/health', async (_req, res) => {
  const db = await healthCheck()
  res.status(db.ok ? 200 : 503).json({
    status: db.ok ? 'ok' : 'degraded',
    env: config.env,
    db,
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/productos', productsRoutes)
app.use('/api/usuarios', usersRoutes)
app.use('/api/ordenes', ordersRoutes)
app.use('/api/carrito', cartRoutes)
app.use('/api/payments', paymentsRoutes)
app.use('/api/admin', adminRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`[backend] listening on :${config.port} (${config.env})`)
  if (!isProd) {
    console.log(`[backend] CORS origins:`, config.corsOrigins)
  }
})
