import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, ShoppingBag, Users, TrendingUp, AlertCircle, Euro } from 'lucide-react'
import { adminApi } from '../../lib/api'
import formatPrice from '../../utils/formatPrice'

const STATE_LABELS = {
  pending:    { label: 'Pendiente',   color: '#B26A00' },
  paid:       { label: 'Pagada',      color: '#1565C0' },
  processing: { label: 'En proceso',  color: '#5E35B1' },
  shipped:    { label: 'Enviada',     color: '#00695C' },
  delivered:  { label: 'Entregada',   color: '#2D7B4A' },
  cancelled:  { label: 'Cancelada',   color: '#B71C1C' },
  refunded:   { label: 'Reembolsada', color: '#4A4A4A' },
}

function StatCard({ icon: Icon, label, value, hint, accent = '#2D7B4A' }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E6] p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl"
          style={{ backgroundColor: `${accent}15` }}
        >
          <Icon size={18} style={{ color: accent }} />
        </div>
      </div>
      <p
        className="text-xs font-semibold uppercase tracking-wide text-[#9E9E9A] mb-1"
        style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
      >
        {label}
      </p>
      <p
        className="text-2xl font-bold text-[#2C2C2A]"
        style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
      >
        {value}
      </p>
      {hint && <p className="text-xs text-[#757571] mt-1">{hint}</p>}
    </div>
  )
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    adminApi.stats()
      .then(setStats)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-sm text-[#757571]">Cargando estadísticas…</p>

  if (error) {
    return (
      <div className="flex items-start gap-2 p-3 rounded-xl bg-[#FDECEA] border border-[#E53935]/30 text-sm text-[#B71C1C]">
        <AlertCircle size={16} className="shrink-0 mt-0.5" />
        <span>{error}</span>
      </div>
    )
  }

  const { ordenes, usuarios, productos } = stats

  return (
    <div>
      <h1
        className="text-2xl sm:text-3xl font-bold text-[#2C2C2A] mb-6"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Resumen
      </h1>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Euro}
          label="Ingresos totales"
          value={formatPrice(ordenes.ingresosTotales)}
          hint={`${formatPrice(ordenes.ingresos30d)} últimos 30 días`}
        />
        <StatCard
          icon={ShoppingBag}
          label="Pedidos"
          value={ordenes.totalOrdenes}
          hint={`${ordenes.ordenes30d} en 30 días`}
          accent="#1565C0"
        />
        <StatCard
          icon={Package}
          label="Productos activos"
          value={`${productos.activos} / ${productos.total}`}
          hint={productos.sin_stock > 0 ? `${productos.sin_stock} sin stock` : 'Todos con stock'}
          accent="#5E35B1"
        />
        <StatCard
          icon={Users}
          label="Clientes"
          value={usuarios.total}
          hint={`${usuarios.nuevos_30d} nuevos · ${usuarios.admins} admins`}
          accent="#00695C"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pedidos por estado */}
        <section className="bg-white rounded-2xl border border-[#E8E8E6] p-5 shadow-sm">
          <h2
            className="text-base font-bold text-[#2C2C2A] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Pedidos por estado
          </h2>
          {Object.keys(ordenes.ordenesPorEstado).length === 0 ? (
            <p className="text-sm text-[#757571]">Aún no hay pedidos.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {Object.entries(ordenes.ordenesPorEstado).map(([estado, total]) => {
                const info = STATE_LABELS[estado] || { label: estado, color: '#4A4A4A' }
                return (
                  <li key={estado} className="flex items-center justify-between py-2 border-b border-[#F5F5F3] last:border-0">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ backgroundColor: `${info.color}15`, color: info.color }}
                    >
                      {info.label}
                    </span>
                    <span className="text-sm font-bold text-[#2C2C2A]">{total}</span>
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        {/* Top productos */}
        <section className="bg-white rounded-2xl border border-[#E8E8E6] p-5 shadow-sm">
          <h2
            className="text-base font-bold text-[#2C2C2A] mb-4 flex items-center gap-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            <TrendingUp size={16} style={{ color: '#2D7B4A' }} /> Top productos
          </h2>
          {ordenes.topProductos.length === 0 ? (
            <p className="text-sm text-[#757571]">Sin ventas todavía.</p>
          ) : (
            <ol className="flex flex-col gap-2">
              {ordenes.topProductos.map((p, i) => (
                <li key={p.producto_id} className="flex items-center justify-between gap-3 py-2 border-b border-[#F5F5F3] last:border-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-bold text-[#9E9E9A] w-5">#{i + 1}</span>
                    <span className="text-sm text-[#2C2C2A] truncate">{p.nombre}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-[#2D7B4A]">{p.vendidos} uds</p>
                    <p className="text-xs text-[#9E9E9A]">{formatPrice(p.ingresos)}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>

      {/* Últimas órdenes */}
      <section className="bg-white rounded-2xl border border-[#E8E8E6] p-5 shadow-sm mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-base font-bold text-[#2C2C2A]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Últimos pedidos
          </h2>
          <Link to="/admin/pedidos" className="text-xs text-[#2D7B4A] font-semibold hover:underline">
            Ver todos →
          </Link>
        </div>
        {ordenes.ultimasOrdenes.length === 0 ? (
          <p className="text-sm text-[#757571]">Sin pedidos todavía.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[#9E9E9A] uppercase tracking-wide border-b border-[#F5F5F3]">
                  <th className="py-2 pr-4 font-semibold">Número</th>
                  <th className="py-2 pr-4 font-semibold">Cliente</th>
                  <th className="py-2 pr-4 font-semibold">Estado</th>
                  <th className="py-2 pr-4 font-semibold">Fecha</th>
                  <th className="py-2 pl-4 font-semibold text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {ordenes.ultimasOrdenes.map(o => {
                  const info = STATE_LABELS[o.estado] || { label: o.estado, color: '#4A4A4A' }
                  return (
                    <tr key={o.id} className="border-b border-[#F5F5F3] last:border-0">
                      <td className="py-3 pr-4 font-mono text-xs text-[#2D7B4A]">{o.numero}</td>
                      <td className="py-3 pr-4 text-[#2C2C2A]">
                        {o.usuario_nombre || <span className="text-[#9E9E9A]">—</span>}
                        <span className="block text-xs text-[#9E9E9A]">{o.usuario_email}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className="text-xs font-semibold px-2 py-1 rounded-full"
                          style={{ backgroundColor: `${info.color}15`, color: info.color }}
                        >
                          {info.label}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-xs text-[#757571]">
                        {new Date(o.created_at).toLocaleDateString('es-ES')}
                      </td>
                      <td className="py-3 pl-4 font-bold text-right">{formatPrice(o.total)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
