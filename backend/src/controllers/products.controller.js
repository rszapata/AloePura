import * as Product from '../models/product.model.js'
import * as Review from '../models/review.model.js'
import * as User from '../models/user.model.js'
import { notFound } from '../utils/errors.js'

export async function list(req, res) {
  const { page, limit, categoria, sort, onlyInStock } = req.query
  const result = await Product.list({
    page: page ?? 1,
    limit: limit ?? 12,
    categoria,
    sort,
    onlyInStock: onlyInStock === true || onlyInStock === 'true',
  })
  res.json(result)
}

export async function getById(req, res) {
  const { id } = req.params
  const producto = await Product.findById(id)
  if (!producto) throw notFound('Producto no encontrado')
  res.json({ producto })
}

export async function getBySlug(req, res) {
  const { slug } = req.params
  const producto = await Product.findBySlug(slug)
  if (!producto) throw notFound('Producto no encontrado')
  res.json({ producto })
}

export async function getRelated(req, res) {
  const { id } = req.params
  const { limit = 3 } = req.query
  const producto = await Product.findById(id)
  if (!producto) throw notFound('Producto no encontrado')
  const relacionados = await Product.findRelated(id, Number(limit))
  res.json({ relacionados })
}

export async function getReviews(req, res) {
  const { id } = req.params
  const producto = await Product.findById(id)
  if (!producto) throw notFound('Producto no encontrado')
  const reviews = await Review.listByProduct(id)
  res.json({ reviews })
}

export async function createReview(req, res) {
  const { id: productoId } = req.params
  const { rating, titulo, contenido } = req.body

  const producto = await Product.findById(productoId)
  if (!producto) throw notFound('Producto no encontrado')

  const user = await User.findPublicById(req.user.id)
  if (!user) throw notFound('Usuario no encontrado')

  const review = await Review.create({
    productoId,
    usuarioId: user.id,
    nombreAutor: user.nombre,
    rating,
    titulo,
    contenido,
  })
  res.status(201).json({ review })
}
