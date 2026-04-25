export class HttpError extends Error {
  constructor(status, code, message, details) {
    super(message)
    this.status = status
    this.code = code
    this.details = details
  }
}

export const badRequest = (msg, details) => new HttpError(400, 'BAD_REQUEST', msg, details)
export const unauthorized = (msg = 'No autorizado') => new HttpError(401, 'UNAUTHORIZED', msg)
export const forbidden = (msg = 'Prohibido') => new HttpError(403, 'FORBIDDEN', msg)
export const notFound = (msg = 'No encontrado') => new HttpError(404, 'NOT_FOUND', msg)
export const conflict = (msg, details) => new HttpError(409, 'CONFLICT', msg, details)
