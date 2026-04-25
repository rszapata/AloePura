import { badRequest } from '../utils/errors.js'

/**
 * Middleware que valida req.body | req.query | req.params contra un schema zod.
 * Uso:
 *   router.post('/login', validate({ body: loginSchema }), handler)
 */
export function validate(schemas) {
  return (req, _res, next) => {
    try {
      for (const key of ['body', 'query', 'params']) {
        const schema = schemas[key]
        if (!schema) continue
        const result = schema.safeParse(req[key])
        if (!result.success) {
          const details = result.error.issues.map(i => ({
            path: i.path.join('.'),
            message: i.message,
          }))
          return next(badRequest('Datos inválidos', details))
        }
        req[key] = result.data
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}
