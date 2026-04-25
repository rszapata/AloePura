import { useState } from 'react'
import { MapPin, Mail, Phone, Clock, Send, Check } from 'lucide-react'
import Breadcrumb from '../components/common/Breadcrumb'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import usePageMeta from '../hooks/usePageMeta'

const ADDRESS = {
  line1: 'Calle Aloe 42, Local B',
  line2: '35001 Las Palmas de Gran Canaria',
  country: 'España',
  // Encoded for the Google Maps embed URL.
  query: 'Calle+Triana+78,+Las+Palmas+de+Gran+Canaria,+España',
}

const HOURS = [
  { day: 'Lunes – Viernes', time: '09:00 – 18:00' },
  { day: 'Sábado',          time: '10:00 – 14:00' },
  { day: 'Domingo',         time: 'Cerrado' },
]

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E8E6] p-5 flex items-start gap-4">
      <div
        className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
        style={{ backgroundColor: '#E8F5E9' }}
      >
        <Icon size={18} style={{ color: '#2D7B4A' }} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <h3
          className="text-xs font-bold uppercase tracking-wider text-[#9E9E9A] mb-1"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          {title}
        </h3>
        <div className="text-sm text-[#2C2C2A]" style={{ lineHeight: 1.6 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  usePageMeta({
    title: 'Contacto',
    description: 'Contacta con AloePura. Visítanos en Las Palmas de Gran Canaria, escríbenos o llámanos. Estaremos encantados de ayudarte.',
  })

  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors]   = useState({})
  const [submitted, setSubmitted] = useState(false)

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.name.trim())    e.name    = 'Nombre obligatorio'
    if (!form.email.trim())   e.email   = 'Email obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email no válido'
    if (!form.subject.trim()) e.subject = 'Asunto obligatorio'
    if (!form.message.trim()) e.message = 'Escribe un mensaje'
    else if (form.message.trim().length < 10) e.message = 'Mensaje demasiado corto'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    // Demo: no backend wired. Simulate success.
    setSubmitted(true)
  }

  return (
    <div className="section-padding" style={{ backgroundColor: '#FAFAF8' }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        <Breadcrumb
          items={[{ to: '/', label: 'Inicio' }, { label: 'Contacto' }]}
          className="mb-6"
        />

        {/* Header */}
        <header className="text-center mb-10">
          <h1
            className="text-3xl sm:text-4xl font-bold text-[#2C2C2A] mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Estamos aquí para ayudarte
          </h1>
          <p className="text-[#757571] max-w-xl mx-auto" style={{ lineHeight: 1.7 }}>
            ¿Tienes dudas sobre un producto, tu pedido o colaboraciones? Escríbenos, llámanos o
            pásate por la tienda en Las Palmas de Gran Canaria.
          </p>
        </header>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <InfoCard icon={MapPin} title="Dirección">
            {ADDRESS.line1}<br />
            {ADDRESS.line2}<br />
            {ADDRESS.country}
          </InfoCard>
          <InfoCard icon={Mail} title="Email">
            <a href="mailto:hola@aloepura.es" className="hover:text-[#2D7B4A] transition-colors break-all">
              hola@aloepura.es
            </a>
            <p className="text-xs text-[#9E9E9A] mt-1">Respuesta en 24-48h</p>
          </InfoCard>
          <InfoCard icon={Phone} title="Teléfono">
            <a href="tel:+34922000000" className="hover:text-[#2D7B4A] transition-colors">
              +34 922 000 000
            </a>
            <p className="text-xs text-[#9E9E9A] mt-1">L-V · 09:00-18:00</p>
          </InfoCard>
          <InfoCard icon={Clock} title="Horario">
            {HOURS.map(h => (
              <div key={h.day} className="flex justify-between gap-2 text-xs">
                <span className="text-[#757571]">{h.day}</span>
                <span className="font-semibold">{h.time}</span>
              </div>
            ))}
          </InfoCard>
        </div>

        {/* Map + form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Map */}
          <div className="bg-white rounded-2xl border border-[#E8E8E6] overflow-hidden shadow-sm">
            <div className="aspect-[4/3] w-full bg-[#F5F5F3]">
              <iframe
                title="Ubicación de AloePura en Las Palmas de Gran Canaria"
                src={`https://maps.google.com/maps?q=${ADDRESS.query}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
            <div className="px-5 py-4 border-t border-[#E8E8E6] flex items-center justify-between gap-3 flex-wrap">
              <div>
                <p
                  className="text-sm font-bold text-[#2C2C2A]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Nuestra tienda
                </p>
                <p className="text-xs text-[#757571]">
                  {ADDRESS.line1}, {ADDRESS.line2}
                </p>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${ADDRESS.query}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#2D7B4A] hover:underline"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                Cómo llegar →
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm p-6 sm:p-7">
            {submitted ? (
              <div className="text-center py-8">
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
                  style={{ backgroundColor: '#E8F5E9' }}
                >
                  <Check size={26} style={{ color: '#2D7B4A' }} />
                </div>
                <h2
                  className="text-xl font-bold text-[#2C2C2A] mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  ¡Mensaje enviado!
                </h2>
                <p className="text-sm text-[#757571] mb-5" style={{ lineHeight: 1.6 }}>
                  Gracias por escribirnos. Te responderemos en un plazo de 24-48 horas.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false)
                    setForm({ name: '', email: '', subject: '', message: '' })
                  }}
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <div>
                  <h2
                    className="text-xl font-bold text-[#2C2C2A] mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Envíanos un mensaje
                  </h2>
                  <p className="text-xs text-[#757571]">
                    Responderemos en un plazo de 24-48 horas laborables.
                  </p>
                </div>

                <Input
                  id="contact-name"
                  label="Nombre"
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  error={errors.name}
                  required
                />
                <Input
                  id="contact-email"
                  type="email"
                  label="Email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  error={errors.email}
                  required
                />
                <Input
                  id="contact-subject"
                  label="Asunto"
                  placeholder="¿Sobre qué nos escribes?"
                  value={form.subject}
                  onChange={e => update('subject', e.target.value)}
                  error={errors.subject}
                  required
                />

                <div className="flex flex-col gap-1">
                  <label htmlFor="contact-message" className="text-sm font-medium text-[#4A4A4A]">
                    Mensaje <span className="text-[#E53935]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    placeholder="Cuéntanos en qué podemos ayudarte…"
                    className="w-full px-4 py-3 rounded-lg border text-[#4A4A4A] text-base bg-white resize-y transition-colors focus:outline-none focus:border-[#2D7B4A]"
                    style={{
                      borderColor: errors.message ? '#E53935' : '#D8D8D4',
                      fontFamily: "'Inter', sans-serif",
                      lineHeight: 1.6,
                      minHeight: 120,
                    }}
                  />
                  {errors.message && <p className="text-xs text-[#E53935]">{errors.message}</p>}
                </div>

                <p className="text-xs text-[#9E9E9A]" style={{ lineHeight: 1.5 }}>
                  Al enviar aceptas nuestra{' '}
                  <a href="/privacidad" className="text-[#2D7B4A] underline underline-offset-2">
                    política de privacidad
                  </a>.
                </p>

                <Button type="submit" size="lg" className="flex items-center justify-center gap-2 mt-1">
                  <Send size={16} />
                  Enviar mensaje
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
