import { Navigate, useLocation } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

/**
 * Envuelve rutas del panel admin. Requiere user autenticado + rol='admin'.
 * - Si no está autenticado → /login
 * - Si está autenticado pero no es admin → pantalla 403
 */
export default function RequireAdmin({ children }) {
  const { user, isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div
          className="w-10 h-10 rounded-full border-4 border-[#E8F5E9] animate-spin"
          style={{ borderTopColor: '#2D7B4A' }}
        />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
  }

  if (user?.rol !== 'admin') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#E8E8E6] shadow-sm p-8 text-center">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
            style={{ backgroundColor: '#FDECEA' }}
          >
            <ShieldAlert size={32} style={{ color: '#E53935' }} />
          </div>
          <h1
            className="text-2xl font-bold text-[#2C2C2A] mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Acceso restringido
          </h1>
          <p className="text-[#4A4A4A]" style={{ lineHeight: 1.6 }}>
            Esta área es sólo para administradores.
          </p>
        </div>
      </div>
    )
  }

  return children
}
