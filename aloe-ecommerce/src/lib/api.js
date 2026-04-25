/**
 * Fetch wrapper para la API del backend.
 * - Prepende VITE_API_URL
 * - Inyecta Authorization: Bearer <token> si hay sesión en localStorage
 * - Parsea JSON y normaliza errores al formato { code, message, details }
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const TOKEN_KEY = 'aloe_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export class ApiError extends Error {
  constructor({ status, code, message, details }) {
    super(message || 'Error de API')
    this.status = status
    this.code = code
    this.details = details
  }
}

async function request(path, { method = 'GET', body, headers = {}, auth = true } = {}) {
  const url = `${BASE_URL}${path}`
  const finalHeaders = { 'Content-Type': 'application/json', ...headers }

  if (auth) {
    const token = getToken()
    if (token) finalHeaders.Authorization = `Bearer ${token}`
  }

  let res
  try {
    res = await fetch(url, {
      method,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch (err) {
    throw new ApiError({
      status: 0,
      code: 'network_error',
      message: 'No se pudo conectar con el servidor',
    })
  }

  if (res.status === 204) return null

  let data = null
  const ct = res.headers.get('content-type') || ''
  if (ct.includes('application/json')) {
    try {
      data = await res.json()
    } catch {
      data = null
    }
  }

  if (!res.ok) {
    const errObj = data?.error || {}
    // Sesión expirada → limpiar token
    if (res.status === 401) setToken(null)
    throw new ApiError({
      status: res.status,
      code: errObj.code || 'http_error',
      message: errObj.message || res.statusText,
      details: errObj.details,
    })
  }

  return data
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  patch: (path, body, opts) => request(path, { ...opts, method: 'PATCH', body }),
  delete: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
}

// ---------- Endpoints tipados ----------

export const authApi = {
  register: payload => api.post('/auth/register', payload, { auth: false }),
  login: payload => api.post('/auth/login', payload, { auth: false }),
  me: () => api.get('/auth/me'),
}

/**
 * Normaliza un producto del backend (es_ES / snake_case) al shape que
 * consumen los componentes del frontend.
 */
export function mapProduct(p) {
  if (!p) return null
  let badge = null
  let badgeType = null
  if (p.bestseller) { badge = 'Bestseller'; badgeType = 'secondary' }
  else if (p.featured) { badge = 'Destacado'; badgeType = 'primary' }

  return {
    id: p.id,
    slug: p.slug,
    name: p.nombre,
    description: p.descripcion,
    longDescription: p.descripcion_larga,
    price: Number(p.precio),
    oldPrice: p.precio_original != null ? Number(p.precio_original) : null,
    discount: p.descuento || 0,
    image: p.imagen_principal,
    images: p.imagenes || [],
    category: p.categoria,
    rating: Number(p.rating) || 0,
    reviewsCount: p.review_count || 0,
    stock: p.stock || 0,
    sku: p.sku,
    specs: p.especificaciones || {},
    ingredients: p.ingredientes || [],
    benefits: p.beneficios || [],
    vegan: !!p.vegan,
    organic: !!p.organico,
    dermatologyTested: !!p.dermatology_tested,
    featured: !!p.featured,
    bestseller: !!p.bestseller,
    badge,
    badgeType,
  }
}

export function mapReview(r) {
  if (!r) return null
  return {
    id: r.id,
    name: r.nombre_autor,
    rating: r.rating,
    title: r.titulo,
    text: r.contenido,
    verified: !!r.verificada,
    helpful: r.helpful_count || 0,
    date: r.created_at,
  }
}

export const productsApi = {
  list: async (params = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== '' && v !== null)
    ).toString()
    const data = await api.get(`/productos${qs ? `?${qs}` : ''}`, { auth: false })
    return {
      ...data,
      productos: (data.productos || []).map(mapProduct),
    }
  },
  getById: async id => {
    const data = await api.get(`/productos/${id}`, { auth: false })
    return { producto: mapProduct(data.producto) }
  },
  getBySlug: async slug => {
    const data = await api.get(`/productos/slug/${slug}`, { auth: false })
    return { producto: mapProduct(data.producto) }
  },
  getRelated: async (id, limit = 3) => {
    const data = await api.get(`/productos/${id}/related?limit=${limit}`, { auth: false })
    return { relacionados: (data.relacionados || []).map(mapProduct) }
  },
  getReviews: async id => {
    const data = await api.get(`/productos/${id}/reviews`, { auth: false })
    return { reviews: (data.reviews || []).map(mapReview) }
  },
  createReview: (id, payload) => api.post(`/productos/${id}/reviews`, payload),
}

export const usersApi = {
  me: () => api.get('/usuarios/me'),
  update: patch => api.patch('/usuarios/me', patch),
  orders: () => api.get('/usuarios/me/ordenes'),
  order: id => api.get(`/usuarios/me/ordenes/${id}`),
}

export const ordersApi = {
  create: payload => api.post('/ordenes', payload),
}

export const cartApi = {
  get: () => api.get('/carrito'),
  save: items => api.put('/carrito', { items }),
  clear: () => api.delete('/carrito'),
}

export const paymentsApi = {
  createIntent: ordenId => api.post('/payments/create-intent', { ordenId }),
}

/* ---------- Admin ---------- */

function qs(params = {}) {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== '' && v !== null
  )
  if (!entries.length) return ''
  return '?' + new URLSearchParams(entries).toString()
}

export const adminApi = {
  stats: () => api.get('/admin/stats'),

  productos: (params = {}) => api.get(`/admin/productos${qs(params)}`),
  producto: id => api.get(`/admin/productos/${id}`),
  createProducto: body => api.post('/admin/productos', body),
  updateProducto: (id, body) => api.patch(`/admin/productos/${id}`, body),
  deleteProducto: id => api.delete(`/admin/productos/${id}`),

  ordenes: (params = {}) => api.get(`/admin/ordenes${qs(params)}`),
  orden: id => api.get(`/admin/ordenes/${id}`),
  updateOrden: (id, body) => api.patch(`/admin/ordenes/${id}`, body),

  usuarios: (params = {}) => api.get(`/admin/usuarios${qs(params)}`),
  updateUsuarioRol: (id, rol) => api.patch(`/admin/usuarios/${id}/rol`, { rol }),

  uploadSignature: (params = {}) => api.get(`/admin/uploads/signature${qs(params)}`),
  deleteUpload: publicId =>
    api.delete(`/admin/uploads?public_id=${encodeURIComponent(publicId)}`),
}
