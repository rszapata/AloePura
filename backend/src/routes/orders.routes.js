import { Router } from 'express'
import { z } from 'zod'
import { validate } from '../middleware/validate.js'
import { requireAuth } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import * as ctrl from '../controllers/orders.controller.js'

const router = Router()

const addressSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  street: z.string().min(1).max(200),
  number: z.string().min(1).max(20),
  floor: z.string().max(20).optional(),
  door: z.string().max(20).optional(),
  postalCode: z.string().min(4).max(10),
  city: z.string().min(1).max(100),
  province: z.string().min(1).max(100),
  phone: z.string().min(6).max(30),
})

const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        producto_id: z.coerce.number().int().positive(),
        cantidad: z.coerce.number().int().positive().max(100),
      })
    )
    .min(1, 'El carrito no puede estar vacío'),
  direccionEnvio: addressSchema,
  direccionFacturacion: addressSchema.optional(),
  metodoPago: z.enum(['tarjeta', 'bizum', 'paypal', 'transferencia', 'contrareembolso']),
  notas: z.string().max(500).optional(),
})

router.use(requireAuth)

router.post('/', validate({ body: createOrderSchema }), asyncHandler(ctrl.create))

export default router
