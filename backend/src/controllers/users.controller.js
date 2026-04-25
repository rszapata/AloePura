import * as User from '../models/user.model.js'
import * as Order from '../models/order.model.js'
import { notFound } from '../utils/errors.js'

export async function getMe(req, res) {
  const user = await User.findPublicById(req.user.id)
  if (!user) throw notFound('Usuario no encontrado')
  res.json({ user })
}

export async function updateMe(req, res) {
  const user = await User.updateProfile(req.user.id, req.body)
  if (!user) throw notFound('Usuario no encontrado')
  res.json({ user })
}

export async function listOrders(req, res) {
  const ordenes = await Order.listByUser(req.user.id)
  res.json({ ordenes })
}

export async function getOrder(req, res) {
  const { id } = req.params
  const orden = await Order.findByIdForUser(id, req.user.id)
  if (!orden) throw notFound('Orden no encontrada')
  res.json({ orden })
}
