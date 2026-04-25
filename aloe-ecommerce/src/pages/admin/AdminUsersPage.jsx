import { useEffect, useState, useCallback } from 'react'
import { Search, AlertCircle, Users as UsersIcon, ShieldCheck, Shield } from 'lucide-react'
import Button from '../../components/common/Button'
import { adminApi } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'

function RolBadge({ rol }) {
  const isAdmin = rol === 'admin'
  return (
    <span
      className="text-xs font-semibold px-2 py-1 rounded-full inline-flex items-center gap-1"
      style={{
        backgroundColor: isAdmin ? '#E8F5E9' : '#F5F5F3',
        color: isAdmin ? '#2D7B4A' : '#4A4A4A',
      }}
    >
      {isAdmin ? <ShieldCheck size={12} /> : <Shield size={12} />}
      {isAdmin ? 'Admin' : 'Cliente'}
    </span>
  )
}

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth()
  const [data, setData] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updating, setUpdating] = useState(null) // id en curso

  const load = useCallback(() => {
    setLoading(true)
    adminApi.usuarios({ page, search })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [page, search])

  useEffect(() => { load() }, [load])

  async function toggleRol(u) {
    const nuevoRol = u.rol === 'admin' ? 'customer' : 'admin'
    const verb = nuevoRol === 'admin' ? 'promover a administrador' : 'quitar permisos de administrador de'
    if (!confirm(`¿Seguro que quieres ${verb} ${u.email}?`)) return
    setUpdating(u.id)
    try {
      await adminApi.updateUsuarioRol(u.id, nuevoRol)
      load()
    } catch (err) {
      alert(err.message)
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div>
      <h1
        className="text-2xl sm:text-3xl font-bold text-[#2C2C2A] mb-6"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Usuarios
      </h1>

      {/* Filtros */}
      <div className="bg-white rounded-2xl border border-[#E8E8E6] p-4 mb-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9E9A]" />
          <input
            type="search"
            placeholder="Buscar por email, nombre o apellidos…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#D8D8D4] text-sm"
          />
        </div>
      </div>

      {loading && <p className="text-sm text-[#757571]">Cargando…</p>}

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-[#FDECEA] border border-[#E53935]/30 text-sm text-[#B71C1C] mb-4">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {data && data.usuarios.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#E8E8E6]">
          <UsersIcon size={36} className="mx-auto mb-3 text-[#9E9E9A]" />
          <p className="text-[#757571]">No hay usuarios con esta búsqueda.</p>
        </div>
      )}

      {data && data.usuarios.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[#9E9E9A] uppercase tracking-wide border-b border-[#F5F5F3] bg-[#FAFAF8]">
                  <th className="py-3 px-4 font-semibold">Usuario</th>
                  <th className="py-3 px-4 font-semibold">Teléfono</th>
                  <th className="py-3 px-4 font-semibold">Rol</th>
                  <th className="py-3 px-4 font-semibold">Alta</th>
                  <th className="py-3 px-4 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.usuarios.map(u => {
                  const isSelf = currentUser && u.id === currentUser.id
                  return (
                    <tr key={u.id} className="border-b border-[#F5F5F3] last:border-0 hover:bg-[#FAFAF8]">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-[#2C2C2A]">
                          {u.nombre || '—'} {u.apellidos || ''}
                          {isSelf && (
                            <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-[#2D7B4A]">
                              (tú)
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-[#757571]">{u.email}</p>
                      </td>
                      <td className="py-3 px-4 text-[#4A4A4A]">
                        {u.telefono || <span className="text-[#9E9E9A]">—</span>}
                      </td>
                      <td className="py-3 px-4"><RolBadge rol={u.rol} /></td>
                      <td className="py-3 px-4 text-xs text-[#757571]">
                        {u.created_at ? new Date(u.created_at).toLocaleDateString('es-ES') : '—'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={isSelf || updating === u.id}
                          onClick={() => toggleRol(u)}
                        >
                          {updating === u.id
                            ? '…'
                            : u.rol === 'admin' ? 'Quitar admin' : 'Hacer admin'}
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {data.totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-[#F5F5F3] text-sm">
              <span className="text-[#757571]">
                Página {data.page} de {data.totalPages} · {data.total} usuarios
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline" size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline" size="sm"
                  disabled={page >= data.totalPages}
                  onClick={() => setPage(p => p + 1)}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
