import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  User, Package, Settings as SettingsIcon,
  Mail, Phone, MapPin, Calendar, Edit2, Check, LogOut, AlertCircle,
  ShieldCheck,
} from 'lucide-react'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Breadcrumb from '../components/common/Breadcrumb'
import usePageMeta from '../hooks/usePageMeta'
import formatPrice from '../utils/formatPrice'
import { useAuth } from '../context/AuthContext'
import { usersApi } from '../lib/api'

const TABS = [
  { id: 'profile',     label: 'Mi perfil',    icon: User },
  { id: 'orders',      label: 'Mis pedidos',  icon: Package },
  { id: 'preferences', label: 'Preferencias', icon: SettingsIcon },
]

/* ---------- Profile tab ---------- */
const PROVINCES = [
  'Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Baleares',
  'Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real',
  'Córdoba','Cuenca','Girona','Granada','Guadalajara','Guipúzcoa','Huelva',
  'Huesca','Jaén','La Coruña','La Rioja','Las Palmas','León','Lleida','Lugo',
  'Madrid','Málaga','Murcia','Navarra','Ourense','Palencia','Pontevedra',
  'Salamanca','Santa Cruz de Tenerife','Segovia','Sevilla','Soria','Tarragona',
  'Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza','Ceuta','Melilla',
]

const EMPTY_PROFILE_FORM = {
  nombre: '', apellidos: '', telefono: '',
  calle: '', numero: '', piso: '', puerta: '',
  codigo_postal: '', ciudad: '', provincia: '', pais: 'España',
}

function profileFormFromUser(u) {
  if (!u) return EMPTY_PROFILE_FORM
  return {
    nombre: u.nombre || '',
    apellidos: u.apellidos || '',
    telefono: u.telefono || '',
    calle: u.calle || '',
    numero: u.numero || '',
    piso: u.piso || '',
    puerta: u.puerta || '',
    codigo_postal: u.codigo_postal || '',
    ciudad: u.ciudad || '',
    provincia: u.provincia || '',
    pais: u.pais || 'España',
  }
}

function ProfileTab() {
  const { user, setUser, logout } = useAuth()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(() => profileFormFromUser(user))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  if (!user) return null

  const memberDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString('es-ES', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const { user: updated } = await usersApi.update(form)
      setUser(updated)
      setEditing(false)
    } catch (err) {
      setError(err.message || 'No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  function resetForm() {
    setForm(profileFormFromUser(user))
    setEditing(false)
    setError(null)
  }

  const fullName = [user.nombre, user.apellidos].filter(Boolean).join(' ') || user.nombre || ''
  const initials = (fullName || user.email)
    .split(' ')
    .map(s => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  // Dirección formateada para la vista read-only (normalizada)
  const streetLine = [
    [user.calle, user.numero].filter(Boolean).join(' '),
    user.piso ? `${user.piso}º` : '',
    user.puerta,
  ].filter(Boolean).join(', ')
  const cityLine = [
    [user.codigo_postal, user.ciudad].filter(Boolean).join(' '),
    user.provincia,
  ].filter(Boolean).join(', ')
  const addressDisplay = [streetLine, cityLine].filter(Boolean).join(' · ') || '—'

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold text-white shrink-0"
            style={{
              backgroundColor: '#2D7B4A',
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div>
            <h2
              className="text-xl font-bold text-[#2C2C2A]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {fullName || user.email}
            </h2>
            {memberDate && (
              <p className="text-sm text-[#757571] flex items-center gap-1.5">
                <Calendar size={12} aria-hidden="true" /> Miembro desde {memberDate}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {!editing && (
            <Button variant="outline" size="sm" onClick={() => setEditing(true)} className="flex items-center gap-2">
              <Edit2 size={14} /> Editar
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="flex items-center gap-2 border-[#E53935]! text-[#E53935]! hover:bg-[#FEEBEE]!"
          >
            <LogOut size={14} /> Salir
          </Button>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 p-3 mb-4 rounded-xl bg-[#FDECEA] border border-[#E53935]/30 text-sm text-[#B71C1C]"
        >
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {!editing ? (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCell icon={Mail}  label="Email"    value={user.email} />
          <InfoCell icon={Phone} label="Teléfono" value={user.telefono || '—'} />
          <InfoCell
            icon={MapPin}
            label="Dirección"
            value={addressDisplay}
            className="sm:col-span-2"
          />
        </dl>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSave}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="nombre"
              label="Nombre"
              value={form.nombre}
              onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
              required
            />
            <Input
              id="apellidos"
              label="Apellidos"
              value={form.apellidos}
              onChange={e => setForm(f => ({ ...f, apellidos: e.target.value }))}
            />
          </div>
          <Input
            id="telefono"
            label="Teléfono"
            placeholder="612 345 678"
            value={form.telefono}
            onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
          />

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px] gap-4">
            <Input
              id="calle"
              label="Calle / Avenida"
              placeholder="Gran Vía"
              value={form.calle}
              onChange={e => setForm(f => ({ ...f, calle: e.target.value }))}
            />
            <Input
              id="numero"
              label="Número"
              placeholder="45"
              value={form.numero}
              onChange={e => setForm(f => ({ ...f, numero: e.target.value }))}
            />
          </div>

          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wide text-[#9E9E9A] mb-2"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              Piso y puerta <span className="font-normal normal-case tracking-normal text-[#BDBDBA]">· opcional</span>
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="piso"
                label="Piso"
                placeholder="3 · bajo · ático"
                value={form.piso}
                onChange={e => setForm(f => ({ ...f, piso: e.target.value }))}
              />
              <Input
                id="puerta"
                label="Puerta / Letra"
                placeholder="B · izq · 5"
                value={form.puerta}
                onChange={e => setForm(f => ({ ...f, puerta: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Input
              id="codigo_postal"
              label="Código postal"
              placeholder="28001"
              value={form.codigo_postal}
              onChange={e => setForm(f => ({ ...f, codigo_postal: e.target.value }))}
            />
            <Input
              id="ciudad"
              label="Ciudad"
              placeholder="Madrid"
              value={form.ciudad}
              onChange={e => setForm(f => ({ ...f, ciudad: e.target.value }))}
              className="sm:col-span-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="provincia" className="text-sm font-medium text-[#4A4A4A]">
              Provincia
            </label>
            <select
              id="provincia"
              value={form.provincia}
              onChange={e => setForm(f => ({ ...f, provincia: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border text-[#4A4A4A] text-base bg-white transition-colors"
              style={{ borderColor: '#D8D8D4', outline: 'none' }}
            >
              <option value="">Selecciona provincia…</option>
              {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <Input
            id="pais"
            label="País"
            value={form.pais}
            onChange={e => setForm(f => ({ ...f, pais: e.target.value }))}
          />

          <div className="flex gap-3">
            <Button type="submit" disabled={saving} className="flex items-center gap-2">
              <Check size={16} /> {saving ? 'Guardando…' : 'Guardar'}
            </Button>
            <Button type="button" variant="outline" onClick={resetForm} disabled={saving}>
              Cancelar
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

function InfoCell({ icon: Icon, label, value, className = '' }) {
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl bg-[#FAFAF8] border border-[#E8E8E6] ${className}`}>
      <div
        className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
        style={{ backgroundColor: '#E8F5E9' }}
      >
        <Icon size={15} style={{ color: '#2D7B4A' }} aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <dt
          className="text-xs font-semibold uppercase tracking-wide text-[#9E9E9A] mb-0.5"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          {label}
        </dt>
        <dd className="text-sm text-[#2C2C2A] break-words">{value}</dd>
      </div>
    </div>
  )
}

/* ---------- Orders tab ---------- */
// La DB guarda estados en inglés; los mostramos traducidos al español
const ORDER_STATUS = {
  pending:    { label: 'Pendiente',   bg: '#FFF8E1', fg: '#B26A00' },
  paid:       { label: 'Pagada',      bg: '#E3F2FD', fg: '#1565C0' },
  processing: { label: 'En proceso',  bg: '#EDE7F6', fg: '#5E35B1' },
  shipped:    { label: 'Enviada',     bg: '#E0F2F1', fg: '#00695C' },
  delivered:  { label: 'Entregada',   bg: '#E8F5E9', fg: '#2D7B4A' },
  cancelled:  { label: 'Cancelada',   bg: '#FDECEA', fg: '#B71C1C' },
  refunded:   { label: 'Reembolsada', bg: '#F5F5F3', fg: '#4A4A4A' },
}

function StatusBadge({ estado }) {
  const info = ORDER_STATUS[estado] || { label: estado, bg: '#F5F5F3', fg: '#4A4A4A' }
  return (
    <span
      className="text-xs font-semibold px-3 py-1 rounded-full"
      style={{ backgroundColor: info.bg, color: info.fg }}
    >
      {info.label}
    </span>
  )
}

function OrdersTab() {
  const [ordenes, setOrdenes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    usersApi.orders()
      .then(data => { if (!cancelled) setOrdenes(data.ordenes || []) })
      .catch(err => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return <p className="text-sm text-[#757571]">Cargando pedidos…</p>
  }

  if (error) {
    return (
      <div className="flex items-start gap-2 p-3 rounded-xl bg-[#FDECEA] border border-[#E53935]/30 text-sm text-[#B71C1C]">
        <AlertCircle size={16} className="shrink-0 mt-0.5" />
        <span>No se pudieron cargar tus pedidos.</span>
      </div>
    )
  }

  if (ordenes.length === 0) {
    return (
      <div className="text-center py-12">
        <Package size={36} className="mx-auto mb-3" style={{ color: '#9E9E9A' }} />
        <p className="text-[#757571] mb-4">Todavía no has realizado pedidos.</p>
        <Link to="/productos"><Button>Descubrir productos</Button></Link>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-4">
      {ordenes.map(order => {
        const d = new Date(order.created_at).toLocaleDateString('es-ES', {
          day: 'numeric', month: 'long', year: 'numeric',
        })
        return (
          <li
            key={order.id}
            className="border border-[#E8E8E6] rounded-2xl bg-white p-5 hover:border-[#66BB6A]/50 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
              <div>
                <p
                  className="text-xs font-bold text-[#2D7B4A] mb-1"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  {order.numero}
                </p>
                <p className="text-xs text-[#9E9E9A]">{d}</p>
              </div>
              <StatusBadge estado={order.estado} />
            </div>
            <ul className="text-sm text-[#4A4A4A] mb-3" style={{ lineHeight: 1.7 }}>
              {(order.items || []).map((it, i) => (
                <li key={i}>
                  · {it.nombre} <span className="text-[#9E9E9A]">× {it.cantidad}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between pt-3 border-t border-[#F5F5F3]">
              <span className="text-sm text-[#757571]">Total</span>
              <span
                className="text-base font-bold"
                style={{ color: '#2D7B4A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {formatPrice(order.total)}
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

/* ---------- Preferences tab ---------- */
function PreferencesTab() {
  const { user, setUser } = useAuth()
  const [newsletter, setNewsletter] = useState(!!user?.newsletter)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)

  async function toggle() {
    const next = !newsletter
    setNewsletter(next)
    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      const { user: updated } = await usersApi.update({ newsletter: next })
      setUser(updated)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      setNewsletter(!next) // revert
      setError(err.message || 'No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <label
        className="flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all hover:border-[#66BB6A]/50"
        style={{ borderColor: '#E8E8E6', backgroundColor: 'white' }}
      >
        <input
          type="checkbox"
          checked={newsletter}
          onChange={toggle}
          disabled={saving}
          className="sr-only"
        />
        <span
          className="flex items-center justify-center w-11 h-6 rounded-full transition-colors shrink-0 mt-0.5"
          style={{ backgroundColor: newsletter ? '#2D7B4A' : '#D8D8D4' }}
          aria-hidden="true"
        >
          <span
            className="w-5 h-5 bg-white rounded-full shadow transition-transform"
            style={{ transform: newsletter ? 'translateX(10px)' : 'translateX(-10px)' }}
          />
        </span>
        <div>
          <p
            className="text-sm font-semibold text-[#2C2C2A]"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Newsletter mensual
          </p>
          <p className="text-xs text-[#757571] mt-0.5" style={{ lineHeight: 1.5 }}>
            Recibe consejos de cuidado natural y novedades del blog.
          </p>
        </div>
      </label>

      {saved && (
        <p className="text-xs text-[#2D7B4A] flex items-center gap-1">
          <Check size={12} /> Preferencias guardadas
        </p>
      )}
      {error && (
        <p className="text-xs text-[#E53935]">{error}</p>
      )}
    </div>
  )
}

/* ---------- Page ---------- */
export default function AccountPage() {
  usePageMeta({
    title: 'Mi cuenta',
    description: 'Gestiona tu perfil, pedidos y preferencias en AloePura.',
  })

  const { user } = useAuth()
  const [tab, setTab] = useState('profile')
  const isAdmin = user?.rol === 'admin'

  return (
    <div className="section-padding" style={{ backgroundColor: '#FAFAF8' }}>
      <div className="container" style={{ maxWidth: 1080 }}>
        <Breadcrumb
          items={[{ to: '/', label: 'Inicio' }, { label: 'Mi cuenta' }]}
          className="mb-6"
        />

        <h1
          className="text-3xl sm:text-4xl font-bold text-[#2C2C2A] mb-8"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Mi cuenta
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 items-start">
          <aside className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm p-3">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto" aria-label="Secciones de cuenta">
              {TABS.map(t => {
                const Icon = t.icon
                const active = tab === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    aria-current={active ? 'page' : undefined}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D7B4A] focus-visible:ring-offset-1"
                    style={{
                      backgroundColor: active ? '#E8F5E9' : 'transparent',
                      color: active ? '#2D7B4A' : '#4A4A4A',
                      fontFamily: "'Montserrat', system-ui, sans-serif",
                    }}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {t.label}
                  </button>
                )
              })}

              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D7B4A] focus-visible:ring-offset-1 mt-2 lg:mt-3 border-t lg:border-t-0 lg:border-none border-[#E8E8E6] lg:pt-3"
                  style={{
                    backgroundColor: '#E8F5E9',
                    color: '#2D7B4A',
                    fontFamily: "'Montserrat', system-ui, sans-serif",
                  }}
                >
                  <ShieldCheck size={16} aria-hidden="true" />
                  Panel admin
                </Link>
              )}
            </nav>
          </aside>

          <section
            className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm p-6 sm:p-8"
            aria-live="polite"
          >
            {tab === 'profile'     && <ProfileTab />}
            {tab === 'orders'      && <OrdersTab />}
            {tab === 'preferences' && <PreferencesTab />}
          </section>
        </div>
      </div>
    </div>
  )
}
