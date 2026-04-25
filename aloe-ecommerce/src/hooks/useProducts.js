import { useCallback, useEffect, useState } from 'react'
import { productsApi } from '../lib/api'

/**
 * Lista paginada de productos con filtros.
 *   const { productos, total, page, totalPages, loading, error, refetch } = useProducts({ categoria, sort, page, limit, onlyInStock })
 */
export function useProducts(params = {}) {
  const [state, setState] = useState({
    productos: [],
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
    loading: true,
    error: null,
  })

  const key = JSON.stringify(params)

  const fetchList = useCallback(async () => {
    setState(s => ({ ...s, loading: true, error: null }))
    try {
      const data = await productsApi.list(params)
      setState({ ...data, loading: false, error: null })
    } catch (err) {
      setState(s => ({ ...s, loading: false, error: err.message || 'Error' }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  return { ...state, refetch: fetchList }
}

/**
 * Producto individual por id.
 */
export function useProduct(id) {
  const [producto, setProducto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    setError(null)
    productsApi
      .getById(id)
      .then(data => {
        if (!cancelled) setProducto(data.producto)
      })
      .catch(err => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  return { producto, loading, error }
}

/**
 * Productos relacionados.
 */
export function useRelatedProducts(id, limit = 3) {
  const [relacionados, setRelacionados] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    productsApi
      .getRelated(id, limit)
      .then(data => {
        if (!cancelled) setRelacionados(data.relacionados || [])
      })
      .catch(() => {
        if (!cancelled) setRelacionados([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id, limit])

  return { relacionados, loading }
}

/**
 * Reviews de un producto.
 */
export function useReviews(productoId) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    if (!productoId) return
    setLoading(true)
    setError(null)
    try {
      const data = await productsApi.getReviews(productoId)
      setReviews(data.reviews || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [productoId])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { reviews, loading, error, refetch }
}
