import * as Product from '../models/product.model.js'
import * as Order from '../models/order.model.js'
import * as User from '../models/user.model.js'
import { query } from '../db.js'
import { notFound, badRequest } from '../utils/errors.js'

/* ---------- Stats / Dashboard ---------- */

export async function getStats(_req, res) {
  const [orderStats, users, products] = await Promise.all([
    Order.getStats(),
    query(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days')::int AS nuevos_30d,
        COUNT(*) FILTER (WHERE rol = 'admin')::int AS admins
      FROM usuarios
    `),
    query(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE activo = TRUE)::int AS activos,
        COUNT(*) FILTER (WHERE stock = 0)::int AS sin_stock,
        COUNT(*) FILTER (WHERE stock > 0 AND stock <= 5)::int AS stock_bajo
      FROM productos
    `),
  ])

  res.json({
    ordenes: orderStats,
    usuarios: users.rows[0],
    productos: products.rows[0],
  })
}

/* ---------- Productos ---------- */

export async function listProducts(req, res) {
  const data = await Product.listAdmin({
    page: Number(req.query.page) || 1,
    limit: Math.min(Number(req.query.limit) || 20, 100),
    search: req.query.search || '',
    categoria: req.query.categoria,
  })
  res.json(data)
}

export async function getProduct(req, res) {
  const producto = await Product.findByIdAdmin(req.params.id)
  if (!producto) throw notFound('Producto no encontrado')
  res.json({ producto })
}

export async function createProduct(req, res) {
  const producto = await Product.createProduct(req.body)
  res.status(201).json({ producto })
}

export async function updateProduct(req, res) {
  const producto = await Product.updateProduct(req.params.id, req.body)
  if (!producto) throw notFound('Producto no encontrado')
  res.json({ producto })
}

export async function deleteProduct(req, res) {
  const result = await Product.softDeleteProduct(req.params.id)
  if (!result) throw notFound('Producto no encontrado')
  res.json({ ok: true })
}

/* ---------- Órdenes ---------- */

export async function listOrders(req, res) {
  const data = await Order.listAdmin({
    page: Number(req.query.page) || 1,
    limit: Math.min(Number(req.query.limit) || 20, 100),
    estado: req.query.estado,
    search: req.query.search || '',
  })
  res.json(data)
}

export async function getOrder(req, res) {
  const orden = await Order.findById(req.params.id)
  if (!orden) throw notFound('Orden no encontrada')
  res.json({ orden })
}

export async function updateOrder(req, res) {
  try {
    const orden = await Order.updateAdmin(req.params.id, req.body)
    if (!orden) throw notFound('Orden no encontrada')
    res.json({ orden })
  } catch (err) {
    if (err.status === 400) throw badRequest(err.message)
    throw err
  }
}

/* ---------- Usuarios ---------- */

export async function listUsers(req, res) {
  const data = await User.listAdmin({
    page: Number(req.query.page) || 1,
    limit: Math.min(Number(req.query.limit) || 20, 100),
    search: req.query.search || '',
  })
  res.json(data)
}

export async function updateUserRol(req, res) {
  const { rol } = req.body
  const id = Number(req.params.id)
  // Un admin no puede auto-degradarse (evita quedarse sin admins)
  if (id === req.user.id && rol !== 'admin') {
    throw badRequest('No puedes retirarte el rol de admin a ti mismo')
  }
  try {
    const user = await User.setRol(id, rol)
    if (!user) throw notFound('Usuario no encontrado')
    res.json({ user })
  } catch (err) {
    if (err.status === 400) throw badRequest(err.message)
    throw err
  }
}
