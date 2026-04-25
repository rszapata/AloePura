import { HttpError } from '../utils/errors.js'
import { isProd } from '../config.js'

// Wrapper para evitar try/catch en cada handler async
export const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

// 404 catch-all (montar al final de las rutas)
export function notFoundHandler(req, res) {
  res.status(404).json({
    error: { code: 'NOT_FOUND', message: `Ruta ${req.method} ${req.path} no existe` },
  })
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      error: { code: err.code, message: err.message, details: err.details },
    })
  }

  // Violación de UNIQUE en Postgres
  if (err.code === '23505') {
    return res.status(409).json({
      error: { code: 'CONFLICT', message: 'Registro duplicado', details: err.detail },
    })
  }

  // eslint-disable-next-line no-console
  console.error('[unhandled]', err)
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Error interno del servidor',
      ...(isProd ? {} : { stack: err.stack }),
    },
  })
}
