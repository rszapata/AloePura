import crypto from 'node:crypto'
import { config, cloudinaryEnabled } from '../config.js'

/**
 * Signed uploads directos navegador → Cloudinary.
 *
 * El backend sólo firma peticiones. La imagen viaja directa del cliente al
 * CDN, así ahorramos banda y memoria del servidor. Ver:
 *   https://cloudinary.com/documentation/upload_images#generating_authentication_signatures
 *
 * Los secretos NUNCA salen del backend: sólo api_key (pública), timestamp,
 * folder y la firma SHA1 derivada.
 */

export function ensureCloudinary() {
  if (!cloudinaryEnabled) {
    const err = new Error('Cloudinary no está configurado (CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET)')
    err.status = 503
    err.code = 'cloudinary_disabled'
    throw err
  }
}

/**
 * Cloudinary firma como SHA1( paramsOrdenados + apiSecret ).
 * `params` se ordenan alfabéticamente y se unen con "&" tipo querystring.
 */
function sha1Signature(params, apiSecret) {
  const toSign = Object.keys(params)
    .sort()
    .filter(k => params[k] !== undefined && params[k] !== '')
    .map(k => `${k}=${params[k]}`)
    .join('&')
  return crypto.createHash('sha1').update(toSign + apiSecret).digest('hex')
}

/**
 * Firma una subida. El cliente POSTea a {uploadUrl} un FormData con
 *   file, api_key, timestamp, signature, folder
 * y Cloudinary devuelve `secure_url` + `public_id`.
 */
export function signUpload({ folder } = {}) {
  ensureCloudinary()
  const { cloudName, apiKey, apiSecret } = config.cloudinary
  const finalFolder = (folder || config.cloudinary.folder).trim()
  const timestamp = Math.floor(Date.now() / 1000)

  const signature = sha1Signature({ folder: finalFolder, timestamp }, apiSecret)

  return {
    signature,
    timestamp,
    apiKey,
    cloudName,
    folder: finalFolder,
    uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  }
}

/**
 * Borra un asset server-side (evita exponer la firma de destroy al browser).
 * Es idempotente: si no existe, Cloudinary devuelve `result: 'not found'`.
 */
export async function destroyAsset(publicId) {
  ensureCloudinary()
  const { cloudName, apiKey, apiSecret } = config.cloudinary
  const timestamp = Math.floor(Date.now() / 1000)
  const signature = sha1Signature({ public_id: publicId, timestamp }, apiSecret)

  const form = new URLSearchParams({
    public_id: publicId,
    timestamp: String(timestamp),
    api_key: apiKey,
    signature,
  })

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
    method: 'POST',
    body: form,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data?.error?.message || 'Cloudinary destroy falló')
    err.status = res.status
    throw err
  }
  return data // { result: 'ok' | 'not found' }
}
