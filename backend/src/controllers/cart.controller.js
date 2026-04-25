import * as Cart from '../models/cart.model.js'

export async function get(req, res) {
  const carrito = await Cart.getByUser(req.user.id)
  res.json({ carrito })
}

export async function save(req, res) {
  const { items } = req.body
  const carrito = await Cart.upsert(req.user.id, items)
  res.json({ carrito })
}

export async function clear(req, res) {
  await Cart.clear(req.user.id)
  res.status(204).end()
}
