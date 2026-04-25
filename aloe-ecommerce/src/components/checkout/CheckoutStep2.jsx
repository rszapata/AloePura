import { useEffect, useState } from 'react'
import { ArrowRight, ArrowLeft, Truck, Clock } from 'lucide-react'
import { useCheckout, SHIPPING_OPTIONS } from '../../context/CheckoutContext'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import Input from '../common/Input'
import Button from '../common/Button'

/**
 * Mapea el perfil del usuario (columnas DB) al shape normalizado de address.
 * Si no hay perfil, devuelve null.
 */
function addressFromUser(u) {
  if (!u) return null
  return {
    firstName:  u.nombre || '',
    lastName:   u.apellidos || '',
    street:     u.calle || '',
    number:     u.numero || '',
    floor:      u.piso || '',
    door:       u.puerta || '',
    postalCode: u.codigo_postal || '',
    city:       u.ciudad || '',
    province:   u.provincia || '',
    phone:      u.telefono || '',
  }
}

function isAddressEmpty(addr) {
  return !addr || Object.values(addr).every(v => !v || !String(v).trim())
}

const PROVINCES = [
  'Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Baleares',
  'Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ciudad Real',
  'Córdoba','Cuenca','Girona','Granada','Guadalajara','Guipúzcoa','Huelva',
  'Huesca','Jaén','La Coruña','La Rioja','Las Palmas','León','Lleida','Lugo',
  'Madrid','Málaga','Murcia','Navarra','Ourense','Palencia','Pontevedra',
  'Salamanca','Santa Cruz de Tenerife','Segovia','Sevilla','Soria','Tarragona',
  'Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza','Ceuta','Melilla',
]

function validateAddress(form) {
  const errors = {}
  if (!form.firstName.trim()) errors.firstName = 'Nombre obligatorio'
  if (!form.lastName.trim())  errors.lastName  = 'Apellidos obligatorios'
  if (!form.street.trim())    errors.street    = 'Calle obligatoria'
  if (!form.number.trim())    errors.number    = 'Número obligatorio'
  // floor & door are optional (houses / ground-floor shops)
  if (!form.city.trim())      errors.city      = 'Ciudad obligatoria'
  if (!form.province.trim())  errors.province  = 'Provincia obligatoria'
  if (!form.postalCode.trim()) errors.postalCode = 'Código postal obligatorio'
  else if (!/^\d{5}$/.test(form.postalCode)) errors.postalCode = 'CP debe tener 5 dígitos'
  if (!form.phone.trim())     errors.phone     = 'Teléfono obligatorio'
  else if (!/^[67]\d{8}$/.test(form.phone.replace(/\s/g, '')))
    errors.phone = 'Teléfono español no válido (6xx/7xx)'
  return errors
}

export default function CheckoutStep2() {
  const { data, setAddress, setShipping, nextStep, prevStep } = useCheckout()
  const { total: subtotal } = useCart()
  const { user } = useAuth()

  // Si el address del checkout está vacío y el usuario tiene dirección guardada
  // en su perfil, la usamos como valor inicial.
  const initialAddress = isAddressEmpty(data.address)
    ? (addressFromUser(user) || data.address)
    : data.address

  const [form, setForm] = useState({ ...initialAddress })
  const [shipping, setShippingLocal] = useState(data.shipping)
  const [errors, setErrors] = useState({})

  // Si el usuario hace login DESPUÉS de entrar al paso 2 (caso raro pero
  // posible) y el formulario sigue vacío, lo rellenamos.
  useEffect(() => {
    if (!user) return
    setForm(prev => {
      if (!isAddressEmpty(prev)) return prev
      return addressFromUser(user) || prev
    })
  }, [user])

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validateAddress(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setAddress(form)
    setShipping(shipping)
    nextStep()
  }

  function shippingPrice(opt) {
    if (opt.freeThreshold && subtotal >= opt.freeThreshold) return 'GRATIS'
    return `${opt.price.toFixed(2).replace('.', ',')}€`
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Title */}
      <div className="mb-8">
        <h2
          className="text-2xl font-bold text-[#2C2C2A] mb-1"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Dirección de envío
        </h2>
        <p className="text-sm text-[#757571]" style={{ lineHeight: 1.6 }}>
          Entregamos en toda España peninsular, Baleares y Canarias.
        </p>
      </div>

      {/* Address form */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input id="firstName" label="Nombre"    value={form.firstName} onChange={e => update('firstName', e.target.value)} error={errors.firstName} required />
          <Input id="lastName"  label="Apellidos" value={form.lastName}  onChange={e => update('lastName',  e.target.value)} error={errors.lastName}  required />
        </div>
        {/* Street + number split — normalized for DB */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px] gap-4">
          <Input
            id="street"
            label="Calle / Avenida"
            placeholder="Gran Vía"
            value={form.street}
            onChange={e => update('street', e.target.value)}
            error={errors.street}
            required
          />
          <Input
            id="number"
            label="Número"
            placeholder="45"
            value={form.number}
            onChange={e => update('number', e.target.value)}
            error={errors.number}
            required
          />
        </div>

        {/* Apartment details — optional */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wide text-[#9E9E9A] mb-2"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Piso y puerta <span className="font-normal normal-case tracking-normal text-[#BDBDBA]">· opcional, si es un edificio</span>
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="floor"
              label="Piso"
              placeholder="3 · bajo · ático"
              value={form.floor}
              onChange={e => update('floor', e.target.value)}
            />
            <Input
              id="door"
              label="Puerta / Letra"
              placeholder="B · izq · 5"
              value={form.door}
              onChange={e => update('door', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Input id="postalCode" label="Código postal" placeholder="28001" value={form.postalCode} onChange={e => update('postalCode', e.target.value)} error={errors.postalCode} required />
          <Input id="city" label="Ciudad" placeholder="Madrid" value={form.city} onChange={e => update('city', e.target.value)} error={errors.city} required className="sm:col-span-2" />
        </div>

        {/* Province select */}
        <div className="flex flex-col gap-1">
          <label htmlFor="province" className="text-sm font-medium text-[#4A4A4A]">
            Provincia <span className="text-[#E53935]">*</span>
          </label>
          <select
            id="province"
            value={form.province}
            onChange={e => update('province', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border text-[#4A4A4A] text-base bg-white transition-colors"
            style={{
              borderColor: errors.province ? '#E53935' : '#D8D8D4',
              outline: 'none',
            }}
          >
            <option value="">Selecciona provincia…</option>
            {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          {errors.province && <p className="text-xs text-[#E53935]">{errors.province}</p>}
        </div>

        <Input id="phone" label="Teléfono de contacto" placeholder="612 345 678" value={form.phone} onChange={e => update('phone', e.target.value)} error={errors.phone} required />
      </div>

      {/* Shipping options */}
      <div className="mb-8">
        <h3
          className="text-base font-bold text-[#2C2C2A] mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Método de envío
        </h3>
        <div className="flex flex-col gap-3">
          {SHIPPING_OPTIONS.map(opt => {
            const selected = shipping === opt.id
            const price    = shippingPrice(opt)
            const isFree   = price === 'GRATIS'
            return (
              <label
                key={opt.id}
                className="flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all"
                style={{
                  borderColor: selected ? '#2D7B4A' : '#E8E8E6',
                  backgroundColor: selected ? '#F0FBF4' : 'white',
                }}
              >
                <input
                  type="radio"
                  name="shipping"
                  value={opt.id}
                  checked={selected}
                  onChange={() => setShippingLocal(opt.id)}
                  className="sr-only"
                />
                <div
                  className="flex items-center justify-center w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 transition-all"
                  style={{
                    borderColor: selected ? '#2D7B4A' : '#D8D8D4',
                    backgroundColor: selected ? '#2D7B4A' : 'white',
                  }}
                >
                  {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    {opt.id === 'express' ? <Clock size={15} style={{ color: '#2D7B4A' }} /> : <Truck size={15} style={{ color: '#2D7B4A' }} />}
                    <span
                      className="text-sm font-semibold text-[#2C2C2A]"
                      style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                    >
                      {opt.label}
                    </span>
                  </div>
                  <p className="text-xs text-[#757571]" style={{ lineHeight: 1.5 }}>{opt.description}</p>
                </div>
                <span
                  className="text-sm font-bold shrink-0"
                  style={{
                    color: isFree ? '#43A047' : '#2C2C2A',
                    fontFamily: "'Montserrat', system-ui, sans-serif",
                  }}
                >
                  {price}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="button" variant="outline" onClick={prevStep} className="flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Volver
        </Button>
        <Button type="submit" size="lg" fullWidth className="flex items-center justify-center gap-2">
          Continuar al pago
          <ArrowRight size={18} />
        </Button>
      </div>
    </form>
  )
}
