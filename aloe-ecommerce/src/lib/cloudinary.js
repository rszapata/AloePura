/**
 * Cliente para subidas signed a Cloudinary.
 *
 * Flujo:
 *   1. `adminApi.uploadSignature()` → backend devuelve { signature, timestamp, apiKey, cloudName, folder, uploadUrl }
 *   2. POST FormData directo a `uploadUrl` con la firma. La imagen NO pasa por nuestro backend.
 *   3. Cloudinary responde con `secure_url` + `public_id`; guardamos ambos.
 */
import { adminApi } from './api'

export class UploadError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

const MAX_BYTES = 8 * 1024 * 1024 // 8 MB
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']

export function validateImage(file) {
  if (!file) throw new UploadError('No has seleccionado ningún archivo')
  if (!ACCEPTED.includes(file.type)) {
    throw new UploadError('Formato no soportado (usa JPG, PNG, WebP o AVIF)')
  }
  if (file.size > MAX_BYTES) {
    throw new UploadError(`Archivo demasiado grande (máx ${MAX_BYTES / 1024 / 1024} MB)`)
  }
}

/**
 * Sube un único File y resuelve con { url, publicId, width, height, bytes }.
 * `onProgress(pct)` se llama con enteros 0-100.
 */
export async function uploadImage(file, { folder, onProgress } = {}) {
  validateImage(file)
  const sig = await adminApi.uploadSignature({ folder })

  const form = new FormData()
  form.append('file', file)
  form.append('api_key',   sig.apiKey)
  form.append('timestamp', sig.timestamp)
  form.append('signature', sig.signature)
  form.append('folder',    sig.folder)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', sig.uploadUrl)
    xhr.upload.onprogress = e => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100))
      }
    }
    xhr.onload = () => {
      let data
      try { data = JSON.parse(xhr.responseText) } catch { data = null }
      if (xhr.status >= 200 && xhr.status < 300 && data?.secure_url) {
        resolve({
          url:      data.secure_url,
          publicId: data.public_id,
          width:    data.width,
          height:   data.height,
          bytes:    data.bytes,
          format:   data.format,
        })
      } else {
        reject(new UploadError(
          data?.error?.message || `Upload falló (${xhr.status})`,
          xhr.status,
        ))
      }
    }
    xhr.onerror = () => reject(new UploadError('Red caída al subir'))
    xhr.onabort = () => reject(new UploadError('Subida cancelada'))
    xhr.send(form)
  })
}

/**
 * Extrae el public_id de un secure_url para poder borrarlo.
 *   https://res.cloudinary.com/demo/image/upload/v1700000000/aloepura/products/abc123.jpg
 *     → "aloepura/products/abc123"
 *
 * Devuelve null si la URL no parece ser de Cloudinary (ej: URL manual legacy).
 */
export function publicIdFromUrl(url) {
  if (!url || typeof url !== 'string') return null
  const m = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+(?:\?.*)?$/)
  return m ? m[1] : null
}

/**
 * Borra el asset de Cloudinary si la URL lo permite. No-op para URLs externas.
 * No propaga errores de "not found" — es idempotente.
 */
export async function destroyImageByUrl(url) {
  const publicId = publicIdFromUrl(url)
  if (!publicId) return { result: 'skipped' }
  try {
    return await adminApi.deleteUpload(publicId)
  } catch (err) {
    // Silenciamos: si no se borra del CDN no es crítico, el producto ya apunta a otra imagen.
    console.warn('[cloudinary] destroy failed:', err.message)
    return { result: 'error', error: err.message }
  }
}
