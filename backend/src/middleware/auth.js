import { verifyToken } from '../utils/jwt.js'
import { unauthorized, forbidden } from '../utils/errors.js'
import * as User from '../models/user.model.js'

/**
 * Requiere JWT válido. Inyecta `req.user = { id, email }`.
 * Uso: router.get('/foo', requireAuth, handler)
 */
export function requireAuth(req, _res, next) {
  const header = req.headers.authorization || ''
  const [scheme, token] = header.split(' ')
  if (scheme !== 'Bearer' || !token) {
    return next(unauthorized('Falta token Bearer'))
  }
  try {
    const payload = verifyToken(token)
    req.user = { id: payload.sub, email: payload.email }
    next()
  } catch {
    next(unauthorized('Token inválido o expirado'))
  }
}

/**
 * Opcional: si hay token lo parsea, si no, continúa con req.user = null.
 */
/**
 * Debe usarse DESPUÉS de requireAuth. Carga el usuario de DB y comprueba
 * que tenga rol 'admin'. Inyecta `req.userRecord` con los campos públicos.
 */
export async function requireAdmin(req, _res, next) {
  try {
    if (!req.user) return next(unauthorized('No autenticado'))
    const u = await User.findPublicById(req.user.id)
    if (!u) return next(unauthorized('Usuario no encontrado'))
    if (u.rol !== 'admin') return next(forbidden('Requiere permisos de administrador'))
    req.userRecord = u
    next()
  } catch (err) {
    next(err)
  }
}

export function optionalAuth(req, _res, next) {
  const header = req.headers.authorization || ''
  const [scheme, token] = header.split(' ')
  if (scheme === 'Bearer' && token) {
    try {
      const payload = verifyToken(token)
      req.user = { id: payload.sub, email: payload.email }
    } catch {
      req.user = null
    }
  } else {
    req.user = null
  }
  next()
}
