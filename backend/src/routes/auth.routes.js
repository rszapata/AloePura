import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { z } from 'zod'
import { validate } from '../middleware/validate.js'
import { requireAuth } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import { config } from '../config.js'
import * as ctrl from '../controllers/auth.controller.js'

const router = Router()

const authLimiter = rateLimit({
  windowMs: config.authRateLimit.windowMs,
  max: config.authRateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: 'rate_limited', message: 'Demasiados intentos. Intenta más tarde.' } },
})

const registerSchema = z.object({
  email: z.string().email('Email inválido').max(255),
  password: z.string().min(8, 'Mínimo 8 caracteres').max(100),
  nombre: z.string().min(2, 'Nombre requerido').max(100),
  telefono: z.string().max(30).optional(),
  newsletter: z.boolean().optional(),
})

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
})

router.post(
  '/register',
  authLimiter,
  validate({ body: registerSchema }),
  asyncHandler(ctrl.register)
)

router.post(
  '/login',
  authLimiter,
  validate({ body: loginSchema }),
  asyncHandler(ctrl.login)
)

router.get('/me', requireAuth, asyncHandler(ctrl.me))

export default router
