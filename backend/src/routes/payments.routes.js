import { Router } from 'express'
import { z } from 'zod'
import { validate } from '../middleware/validate.js'
import { requireAuth } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import * as ctrl from '../controllers/payments.controller.js'

const router = Router()

const createIntentSchema = z.object({
  ordenId: z.coerce.number().int().positive(),
})

router.post(
  '/create-intent',
  requireAuth,
  validate({ body: createIntentSchema }),
  asyncHandler(ctrl.createIntent)
)

export default router
