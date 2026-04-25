import { signUpload, destroyAsset } from '../services/cloudinary.service.js'
import { badRequest } from '../utils/errors.js'

export function getSignature(req, res) {
  const folder = typeof req.query.folder === 'string' ? req.query.folder : undefined
  res.json(signUpload({ folder }))
}

export async function deleteUpload(req, res) {
  const publicId = req.query.public_id
  if (!publicId || typeof publicId !== 'string') {
    throw badRequest('public_id requerido')
  }
  const result = await destroyAsset(publicId)
  res.json(result)
}
