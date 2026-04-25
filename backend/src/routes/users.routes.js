import { Router } from 'express'
import { z } from 'zod'
import { validate } from '../middleware/validate.js'
import { requireAuth } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import * as ctrl from '../controllers/users.controller.js'

const router = Router()

const updateProfileSchema = z.object({
  nombre:        z.string().max(120).optional(),
  apellidos:     z.string().max(120).optional(),
  telefono:      z.string().max(30).optional(),
  calle:         z.string().max(200).optional(),
  numero:        z.string().max(20).optional(),
  piso:          z.string().max(20).optional(),
  puerta:        z.string().max(20).optional(),
  codigo_postal: z.string().max(20).optional(),
  ciudad:        z.string().max(120).optional(),
  provincia:     z.string().max(100).optional(),
  pais:          z.string().max(100).optional(),
  newsletter:    z.boolean().optional(),
})

const idParam = z.object({ id: z.coerce.number().int().positive() })

router.use(requireAuth)

router.get('/me', asyncHandler(ctrl.getMe))
router.patch('/me', validate({ body: updateProfileSchema }), asyncHandler(ctrl.updateMe))
router.get('/me/ordenes', asyncHandler(ctrl.listOrders))
router.get('/me/ordenes/:id', validate({ params: idParam }), asyncHandler(ctrl.getOrder))

export default router
