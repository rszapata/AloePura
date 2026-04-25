import { useEffect, useState, useCallback } from 'react'
import { Search, AlertCircle, ShoppingBag, X, Check, Truck } from 'lucide-react'
import Button from '../../components/common/Button'
import formatPrice from '../../utils/formatPrice'
import { formatAddressInline } from '../../utils/address'
import { adminApi } from '../../lib/api'

const STATES = [
  { id: 'pending',    label: 'Pendiente',   color: '#B26A00' },
  { id: 'paid',       label: 'Pagada',      color: '#1565C0' },
  { id: 'processing', label: 'En proceso',  color: '#5E35B1' },
  { id: 'shipped',    label: 'Enviada',     color: '#00695C' },
  { id: 'delivered',  label: 'Entregada',   color: '#2D7B4A' },
  { id: 'cancelled',  label: 'Cancelada',   color: '#B71C1C' },
  { id: 'refunded',   label: 'Reembolsada', color: '#4A4A4A' },
]
const STATE_MAP = Object.fromEntries(STATES.map(s => [s.id, s]))

function StateBadge({ estado }) {
  const info = STATE_MAP[estado] || { label: estado, color: '#4A4A4A' }
  return (
    <span
      className="text-xs font-semibold px-2 py-1 rounded-full"
      style={{ backgroundColor: `${info.color}15`, color: info.color }}
    >
      {info.label}
    </span>
  )
}

/** Convierte direccion_envio (snake_case desde BD) a la shape que espera formatAddressInline. */
function normalizeAddress(raw = {}) {
  return {
    firstName:  raw.firstName  ?? raw.nombre     ?? '',
    lastName:   raw.lastName   ?? raw.apellidos  ?? '',
    street:     raw.street     ?? raw.calle      ?? '',
    number:     raw.number     ?? raw.numero     ?? '',
    floor:      raw.floor      ?? raw.piso       ?? '',
    door:       raw.door       ?? raw.puerta     ?? '',
    postalCode: raw.postalCode ?? raw.codigo_postal ?? '',
    city:       raw.city       ?? raw.ciudad     ?? '',
    province:   raw.province   ?? raw.provincia  ?? '',
    phone:      raw.phone      ?? raw.telefono   ?? '',
  }
}

/* ---------- Detail drawer ---------- */
function OrderDetailDrawer({ orden, onClose, onSaved }) {
  const [estado, setEstado] = useState(orden.estado)
  const [tracking, setTracking] = useState(orden.tracking_numero || '')
  const [notas, setNotas] = useState(orden.notas || '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const dirty =
    estado !== orden.estado ||
    (tracking || '') !== (orden.tracking_numero || '') ||
    (notas || '') !== (orden.notas || '')

  async function handleSave() {
    setSaving(true)
    setError(null)
    try {
      const { orden: updated } = await adminApi.updateOrden(orden.id, {
        estado,
        tracking_numero: tracking.trim() || null,
        notas: notas.trim() || null,
      })
      onSaved(updated)
    } catch (err) {
      setError(err.message || 'No se pudo guardar')
      setSaving(false)
    }
  }

  const address = normalizeAddress(orden.direccion_envio || {})

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-xl h-full overflow-y-auto shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E8E8E6] px-6 py-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-xs text-[#2D7B4A] font-bold">{orden.numero}</p>
            <p className="text-xs text-[#9E9E9A]">
              {new Date(orden.created_at).toLocaleString('es-ES')}
            </p>
          </div>
          <button type="button" onClick={onClose} className="text-[#757571] hover:text-[#2C2C2A] cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-[#FDECEA] border border-[#E53935]/30 text-sm text-[#B71C1C]">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Cliente */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wide text-[#9E9E9A] mb-2">Cliente</h3>
            <p className="text-sm text-[#2C2C2A]">
              {orden.usuario_nombre || <span className="text-[#9E9E9A]">—</span>}
            </p>
            <p className="text-xs text-[#757571]">{orden.usuario_email}</p>
          </section>

          {/* Dirección */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wide text-[#9E9E9A] mb-2">Dirección de envío</h3>
            <p className="text-sm text-[#4A4A4A]" style={{ lineHeight: 1.6 }}>
              {formatAddressInline(address)}
            </p>
          </section>

          {/* Items */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wide text-[#9E9E9A] mb-2">Artículos</h3>
            <ul className="flex flex-col gap-2">
              {(orden.items || []).map((it, i) => (
                <li key={i} className="flex items-center justify-between gap-3 py-2 border-b border-[#F5F5F3] last:border-0">
                  <div className="min-w-0">
                    <p className="text-sm text-[#2C2C2A] truncate">{it.nombre}</p>
                    <p className="text-xs text-[#9E9E9A]">
                      {it.cantidad} × {formatPrice(it.precio_unitario)}
                      {it.sku && ` · ${it.sku}`}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-[#2C2C2A]">{formatPrice(it.subtotal)}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Totales */}
          <section className="flex flex-col gap-1 text-sm">
            <div className="flex justify-between text-[#757571]">
              <span>Subtotal</span><span>{formatPrice(orden.subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#757571]">
              <span>Envío</span>
              <span>{orden.envio === 0 || orden.envio === '0' ? 'GRATIS' : formatPrice(orden.envio)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-[#E8E8E6]">
              <span>Total</span>
              <span style={{ color: '#2D7B4A' }}>{formatPrice(orden.total)}</span>
            </div>
            <p className="text-xs text-[#9E9E9A] mt-1">
              Pago: {orden.metodo_pago}{orden.payment_id ? ` · ${orden.payment_id}` : ''}
            </p>
          </section>

          {/* Editable */}
          <section className="flex flex-col gap-3 pt-3 border-t border-[#F5F5F3]">
            <h3 className="text-xs font-bold uppercase tracking-wide text-[#9E9E9A]">Gestión</h3>

            <div className="flex flex-col gap-1">
              <label htmlFor="estado" className="text-sm font-medium text-[#4A4A4A]">Estado</label>
              <select
                id="estado"
                value={estado}
                onChange={e => setEstado(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#D8D8D4] text-sm bg-white"
              >
                {STATES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="tracking" className="text-sm font-medium text-[#4A4A4A] flex items-center gap-1.5">
                <Truck size={14} /> Número de seguimiento
              </label>
              <input
                id="tracking"
                type="text"
                value={tracking}
                onChange={e => setTracking(e.target.value)}
                placeholder="SEUR1234567ES"
                className="w-full px-4 py-2.5 rounded-lg border border-[#D8D8D4] text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="notas" className="text-sm font-medium text-[#4A4A4A]">Notas internas</label>
              <textarea
                id="notas"
                rows={3}
                value={notas}
                onChange={e => setNotas(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#D8D8D4] text-sm"
              />
            </div>
          </section>

          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={!dirty || saving} className="flex items-center gap-2">
              <Check size={16} /> {saving ? 'Guardando…' : 'Guardar cambios'}
            </Button>
            <Button variant="outline" onClick={onClose} disabled={saving}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Page ---------- */
export default function AdminOrdersPage() {
  const [data, setData] = useState(null)
  const [estado, setEstado] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    adminApi.ordenes({ page, estado, search })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [page, estado, search])

  useEffect(() => { load() }, [load])

  return (
    <div>
      <h1
        className="text-2xl sm:text-3xl font-bold text-[#2C2C2A] mb-6"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Pedidos
      </h1>

      {/* Filtros */}
      <div className="bg-white rounded-2xl border border-[#E8E8E6] p-4 mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9E9A]" />
          <input
            type="search"
            placeholder="Buscar por número, email o nombre…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#D8D8D4] text-sm"
          />
        </div>
        <select
          value={estado}
          onChange={e => { setEstado(e.target.value); setPage(1) }}
          className="px-4 py-2.5 rounded-lg border border-[#D8D8D4] text-sm bg-white"
        >
          <option value="all">Todos los estados</option>
          {STATES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </div>

      {loading && <p className="text-sm text-[#757571]">Cargando…</p>}

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-[#FDECEA] border border-[#E53935]/30 text-sm text-[#B71C1C] mb-4">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {data && data.ordenes.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#E8E8E6]">
          <ShoppingBag size={36} className="mx-auto mb-3 text-[#9E9E9A]" />
          <p className="text-[#757571]">No hay pedidos con estos filtros.</p>
        </div>
      )}

      {data && data.ordenes.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[#9E9E9A] uppercase tracking-wide border-b border-[#F5F5F3] bg-[#FAFAF8]">
                  <th className="py-3 px-4 font-semibold">Número</th>
                  <th className="py-3 px-4 font-semibold">Cliente</th>
                  <th className="py-3 px-4 font-semibold">Estado</th>
                  <th className="py-3 px-4 font-semibold">Fecha</th>
                  <th className="py-3 px-4 font-semibold text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.ordenes.map(o => (
                  <tr
                    key={o.id}
                    onClick={() => setSelected(o)}
                    className="border-b border-[#F5F5F3] last:border-0 hover:bg-[#FAFAF8] cursor-pointer"
                  >
                    <td className="py-3 px-4 font-mono text-xs text-[#2D7B4A]">{o.numero}</td>
                    <td className="py-3 px-4 text-[#2C2C2A]">
                      {o.usuario_nombre || <span className="text-[#9E9E9A]">—</span>}
                      <span className="block text-xs text-[#9E9E9A]">{o.usuario_email}</span>
                    </td>
                    <td className="py-3 px-4"><StateBadge estado={o.estado} /></td>
                    <td className="py-3 px-4 text-xs text-[#757571]">
                      {new Date(o.created_at).toLocaleDateString('es-ES')}
                    </td>
                    <td className="py-3 px-4 font-bold text-right">{formatPrice(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-[#F5F5F3] text-sm">
              <span className="text-[#757571]">
                Página {data.page} de {data.totalPages} · {data.total} pedidos
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

      {selected && (
        <OrderDetailDrawer
          orden={selected}
          onClose={() => setSelected(null)}
          onSaved={() => { setSelected(null); load() }}
        />
      )}
    </div>
  )
}
