import { useState } from 'react'
import { Mail, ArrowRight } from 'lucide-react'
import { useCheckout } from '../../context/CheckoutContext'
import Input from '../common/Input'
import Button from '../common/Button'

export default function CheckoutStep1() {
  const { data, setEmail, nextStep } = useCheckout()
  const [email, setEmailLocal]       = useState(data.email)
  const [newsletter, setNewsletter]  = useState(data.newsletter)
  const [error, setError]            = useState('')

  function validate() {
    if (!email.trim()) return 'El email es obligatorio'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Introduce un email válido'
    return ''
  }

  function handleSubmit(e) {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }
    setEmail(email.trim(), newsletter)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-8">
        <h2
          className="text-2xl font-bold text-[#2C2C2A] mb-1"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          ¿Cuál es tu email?
        </h2>
        <p className="text-sm text-[#757571]" style={{ lineHeight: 1.6 }}>
          Lo usaremos para enviarte la confirmación y seguimiento de tu pedido.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <Input
          id="email"
          type="email"
          label="Correo electrónico"
          placeholder="tu@email.com"
          value={email}
          onChange={e => { setEmailLocal(e.target.value); setError('') }}
          error={error}
          required
          autoFocus
        />

        {/* Newsletter */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative shrink-0 mt-0.5">
            <input
              type="checkbox"
              className="sr-only"
              checked={newsletter}
              onChange={e => setNewsletter(e.target.checked)}
            />
            <div
              className="w-5 h-5 rounded border-2 transition-all flex items-center justify-center"
              style={{
                borderColor: newsletter ? '#2D7B4A' : '#D8D8D4',
                backgroundColor: newsletter ? '#2D7B4A' : 'white',
              }}
            >
              {newsletter && (
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm text-[#4A4A4A]" style={{ lineHeight: 1.6 }}>
            Quiero recibir novedades, ofertas exclusivas y consejos de belleza natural.{' '}
            <span className="text-[#9E9E9A]">(Opcional)</span>
          </span>
        </label>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px bg-[#E8E8E6]" />
          <span className="text-xs text-[#9E9E9A] shrink-0">
            o continúa como invitado
          </span>
          <div className="flex-1 h-px bg-[#E8E8E6]" />
        </div>

        {/* Info box */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#E8F5E9] border border-[#66BB6A]/30">
          <Mail size={16} className="shrink-0 mt-0.5" style={{ color: '#2D7B4A' }} />
          <p className="text-sm text-[#2D7B4A]" style={{ lineHeight: 1.6 }}>
            No necesitas cuenta para comprar. Recibirás la confirmación y el seguimiento directamente en tu email.
          </p>
        </div>

        <Button type="submit" size="lg" fullWidth className="flex items-center justify-center gap-2">
          Continuar
          <ArrowRight size={18} />
        </Button>
      </div>
    </form>
  )
}
