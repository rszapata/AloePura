import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { authApi, getToken, setToken } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Al montar: si hay token, recuperamos el perfil
  useEffect(() => {
    const token = getToken()
    if (!token) {
      setLoading(false)
      return
    }
    authApi
      .me()
      .then(data => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async ({ email, password }) => {
    setError(null)
    try {
      const { user: u, token } = await authApi.login({ email, password })
      setToken(token)
      setUser(u)
      return u
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  const register = useCallback(async payload => {
    setError(null)
    try {
      const { user: u, token } = await authApi.register(payload)
      setToken(token)
      setUser(u)
      return u
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
  }, [])

  const refresh = useCallback(async () => {
    try {
      const { user: u } = await authApi.me()
      setUser(u)
      return u
    } catch {
      setUser(null)
      return null
    }
  }, [])

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refresh,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
