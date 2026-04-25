import { useState } from 'react'
import { Mail, Check, Gift } from 'lucide-react'
import Button from '../common/Button'

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const trimmed = email.trim()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
    if (!valid) {
      setError('Introduce un email válido')
      return
    }
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 600)
  }

  return (
    <section className="section-padding" style={{ backgroundColor: '#FAFAF8' }}>
      <div className="container">
        <div
          className="relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12 sm:py-16 text-center"
          style={{ background: 'linear-gradient(135deg, #2D7B4A 0%, #26A69A 100%)' }}
        >
          <div
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold mb-5"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              <Gift size={14} />
              Oferta de bienvenida
            </div>

            <h2
              className="text-white mb-3"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)',
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              -15% en tu primera compra
            </h2>
            <p className="text-white/90 text-base sm:text-lg mb-8" style={{ lineHeight: 1.6 }}>
              Suscríbete a nuestra newsletter y recibe consejos de belleza natural, ofertas exclusivas
              y tu código de descuento de bienvenida.
            </p>

            {status === 'success' ? (
              <div
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#2D7B4A] font-semibold"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                <Check size={18} />
                ¡Gracias! Revisa tu email para obtener el código.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                noValidate
              >
                <div className="relative flex-1">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#757571]"
                    aria-hidden="true"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-white text-[#2C2C2A] placeholder:text-[#9E9E9A] focus:outline-none focus:ring-2 focus:ring-white/60"
                    aria-label="Email para newsletter"
                    disabled={status === 'loading'}
                  />
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                  disabled={status === 'loading'}
                  className="!bg-white !text-[#2D7B4A] hover:!bg-[#F5F5F3] hover:!text-[#2D7B4A]"
                >
                  {status === 'loading' ? 'Enviando…' : 'Suscribirme'}
                </Button>
              </form>
            )}

            {error && (
              <p className="mt-3 text-sm text-white bg-[#E53935]/80 inline-block px-3 py-1 rounded-lg">
                {error}
              </p>
            )}

            <p className="text-xs text-white/70 mt-5" style={{ lineHeight: 1.5 }}>
              Sin spam. Puedes darte de baja en cualquier momento. Respetamos tu privacidad (RGPD).
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
