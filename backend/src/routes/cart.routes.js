import { Router } from 'express'
import { z } from 'zod'
import { validate } from '../middleware/validate.js'
import { requireAuth } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import * as ctrl from '../controllers/cart.controller.js'

const router = Router()

const saveCartSchema = z.object({
  items: z.array(
    z.object({
      producto_id: z.coerce.number().int().positive(),
      cantidad: z.coerce.number().int().positive().max(100),
    })
  ),
})

router.use(requireAuth)

router.get('/', asyncHandler(ctrl.get))
router.put('/', validate({ body: saveCartSchema }), asyncHandler(ctrl.save))
router.delete('/', asyncHandler(ctrl.clear))

export default router
