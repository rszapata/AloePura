import { Router } from 'express'
import { z } from 'zod'
import { validate } from '../middleware/validate.js'
import { requireAuth } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import * as ctrl from '../controllers/products.controller.js'

const router = Router()

const listQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(50).optional(),
  categoria: z.string().max(50).optional(),
  sort: z.enum(['featured', 'newest', 'price-asc', 'price-desc', 'rating', 'name']).optional(),
  onlyInStock: z.union([z.boolean(), z.enum(['true', 'false'])]).optional(),
})

const idParam = z.object({ id: z.coerce.number().int().positive() })
const slugParam = z.object({ slug: z.string().min(1).max(120) })

const reviewSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  titulo: z.string().min(2).max(120),
  contenido: z.string().min(10).max(2000),
})

router.get('/', validate({ query: listQuerySchema }), asyncHandler(ctrl.list))

router.get('/slug/:slug', validate({ params: slugParam }), asyncHandler(ctrl.getBySlug))

router.get('/:id', validate({ params: idParam }), asyncHandler(ctrl.getById))

router.get('/:id/related', validate({ params: idParam }), asyncHandler(ctrl.getRelated))

router.get('/:id/reviews', validate({ params: idParam }), asyncHandler(ctrl.getReviews))

router.post(
  '/:id/reviews',
  requireAuth,
  validate({ params: idParam, body: reviewSchema }),
  asyncHandler(ctrl.createReview)
)

export default router
