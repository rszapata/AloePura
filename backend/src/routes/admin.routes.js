import { Router } from 'express'
import { z } from 'zod'
import { validate } from '../middleware/validate.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import * as ctrl from '../controllers/admin.controller.js'
import * as uploads from '../controllers/uploads.controller.js'

const router = Router()

router.use(requireAuth, requireAdmin)

const idParam = z.object({ id: z.coerce.number().int().positive() })

/* ---------- Stats ---------- */
router.get('/stats', asyncHandler(ctrl.getStats))

/* ---------- Productos ---------- */
const productSchema = z.object({
  nombre: z.string().min(2).max(200),
  slug: z.string().min(2).max(220).regex(/^[a-z0-9-]+$/, 'Slug inválido (minúsculas, números y guiones)'),
  descripcion: z.string().max(500).optional(),
  descripcion_larga: z.string().optional(),
  precio: z.coerce.number().positive(),
  precio_original: z.coerce.number().positive().nullable().optional(),
  descuento: z.coerce.number().int().min(0).max(99).nullable().optional(),
  imagen_principal: z.string().url().max(500).optional(),
  imagenes: z.array(z.string().url()).optional(),
  categoria: z.string().min(1).max(60),
  stock: z.coerce.number().int().min(0).default(0),
  sku: z.string().max(60).nullable().optional(),
  especificaciones: z.record(z.any()).optional(),
  ingredientes: z.array(z.string()).optional(),
  beneficios: z.array(z.string()).optional(),
  vegan: z.boolean().optional(),
  organico: z.boolean().optional(),
  dermatology_tested: z.boolean().optional(),
  featured: z.boolean().optional(),
  bestseller: z.boolean().optional(),
  activo: z.boolean().optional(),
})
const productUpdateSchema = productSchema.partial()

router.get('/productos', asyncHandler(ctrl.listProducts))
router.get('/productos/:id', validate({ params: idParam }), asyncHandler(ctrl.getProduct))
router.post('/productos', validate({ body: productSchema }), asyncHandler(ctrl.createProduct))
router.patch('/productos/:id',
  validate({ params: idParam, body: productUpdateSchema }),
  asyncHandler(ctrl.updateProduct),
)
router.delete('/productos/:id', validate({ params: idParam }), asyncHandler(ctrl.deleteProduct))

/* ---------- Órdenes ---------- */
const orderUpdateSchema = z.object({
  estado: z.enum(['pending','paid','processing','shipped','delivered','cancelled','refunded']).optional(),
  tracking_numero: z.string().max(60).nullable().optional(),
  notas: z.string().max(1000).nullable().optional(),
})

router.get('/ordenes', asyncHandler(ctrl.listOrders))
router.get('/ordenes/:id', validate({ params: idParam }), asyncHandler(ctrl.getOrder))
router.patch('/ordenes/:id',
  validate({ params: idParam, body: orderUpdateSchema }),
  asyncHandler(ctrl.updateOrder),
)

/* ---------- Usuarios ---------- */
const rolSchema = z.object({ rol: z.enum(['customer', 'admin']) })

router.get('/usuarios', asyncHandler(ctrl.listUsers))
router.patch('/usuarios/:id/rol',
  validate({ params: idParam, body: rolSchema }),
  asyncHandler(ctrl.updateUserRol),
)

/* ---------- Uploads (Cloudinary signed) ---------- */
router.get('/uploads/signature', asyncHandler(uploads.getSignature))
router.delete('/uploads', asyncHandler(uploads.deleteUpload))

export default router
