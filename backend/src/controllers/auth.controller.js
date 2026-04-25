import * as User from '../models/user.model.js'
import { hashPassword, verifyPassword } from '../utils/password.js'
import { signToken } from '../utils/jwt.js'
import { unauthorized, conflict, notFound } from '../utils/errors.js'

export async function register(req, res) {
  const { email, password, nombre, telefono, newsletter } = req.body

  const existing = await User.findByEmail(email)
  if (existing) throw conflict('Ya existe una cuenta con ese email')

  const hash = await hashPassword(password)
  const user = await User.create({ email, password: hash, nombre, telefono, newsletter })

  const token = signToken({ sub: user.id, email: user.email })
  res.status(201).json({ user, token })
}

export async function login(req, res) {
  const { email, password } = req.body

  const record = await User.findByEmail(email)
  if (!record) throw unauthorized('Credenciales inválidas')

  const ok = await verifyPassword(password, record.password)
  if (!ok) throw unauthorized('Credenciales inválidas')

  const user = await User.findPublicById(record.id)
  const token = signToken({ sub: user.id, email: user.email })
  res.json({ user, token })
}

export async function me(req, res) {
  const user = await User.findPublicById(req.user.id)
  if (!user) throw notFound('Usuario no encontrado')
  res.json({ user })
}
