import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { ArrowLeft, Lock, ShieldCheck, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCheckout } from '../../context/CheckoutContext'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { ordersApi, paymentsApi } from '../../lib/api'
import { stripePromise, stripeEnabled } from '../../lib/stripe'
import Button from '../common/Button'
import StripePaymentForm from './StripePaymentForm'

/**
 * Configuración de métodos de pago disponibles.
 * Solo "card" (Stripe) está activo. El resto muestra "(Próximamente)".
 */
const PAYMENT_METHODS = [
  {
    id: 'card',
    label: 'Tarjeta crédito / débito',
    description: 'Visa, Mastercard · procesado por Stripe (3DS)',
    icon: '💳',
    enabled: true,
  },
  {
    id: 'bizum',
    label: 'Bizum',
    description: 'Pago instantáneo con tu móvil',
    icon: '📱',
    enabled: false,
  },
  {
    id: 'paypal',
    label: 'PayPal',
    description: 'Paga con tu cuenta PayPal',
    icon: '🅿️',
    enabled: false,
  },
  {
    id: 'transfer',
    label: 'Transferencia bancaria',
    description: 'Datos bancarios por email tras el pedido',
    icon: '🏦',
    enabled: false,
  },
]

const STRIPE_APPEARANCE = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#2D7B4A',
    colorBackground: '#ffffff',
    colorText: '#2C2C2A',
    colorDanger: '#E53935',
    fontFamily: "'Inter', system-ui, sans-serif",
    borderRadius: '10px',
    spacingUnit: '4px',
  },
}

export default function CheckoutStep3() {
  const { data, setPayment, prevStep, reset, getShippingCost } = useCheckout()
  const { items, total: subtotal, clearCart } = useCart()
  const { isAuthenticated, refresh: refreshUser } = useAuth()
  const navigate = useNavigate()

  const [payment, setPaymentLocal] = useState(data.payment === 'card' ? 'card' : 'card')
  const [stage, setStage] = useState('select') // 'select' | 'paying'
  const [clientSecret, setClientSecret] = useState(null)
  const [orderRef, setOrderRef] = useState(null) // { id, numero, total, … }
  const [submitError, setSubmitError] = useState(null)
  const [loading, setLoading] = useState(false)

  const shippingCost = getShippingCost(subtotal)
  const orderTotal   = subtotal + shippingCost

  // Si el usuario vuelve al paso 3 desde el paso 2, cancela cualquier intent previo
  useEffect(() => {
    if (stage === 'select') {
      setClientSecret(null)
      setOrderRef(null)
      setSubmitError(null)
    }
  }, [stage])

  /**
   * Paso 1 de dos: crea la orden en el backend y obtiene el clientSecret
   * del PaymentIntent. Tras esto pasamos al formulario de Stripe.
   */
  async function startPayment() {
    setSubmitError(null)

    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } })
      return
    }
    if (!stripeEnabled) {
      setSubmitError('El pago con tarjeta no está configurado en este entorno')
      return
    }

    setLoading(true)
    setPayment(payment)

    try {
      // 1. Crear la orden (estado "pending")
      const { orden } = await ordersApi.create({
        items: items.map(i => ({ producto_id: i.id, cantidad: i.quantity })),
        direccionEnvio: data.address,
        metodoPago: 'tarjeta',
      })

      // 2. Crear PaymentIntent de Stripe
      const { clientSecret: secret } = await paymentsApi.createIntent(orden.id)

      setOrderRef(orden)
      setClientSecret(secret)
      setStage('paying')

      // La orden guardó la dirección en el perfil; refrescamos el user
      // para que esté disponible en futuros checkouts / "Mi cuenta".
      refreshUser().catch(() => {})
    } catch (err) {
      setSubmitError(err.message || 'No se pudo iniciar el pago')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Paso 2 de dos: llamado por StripePaymentForm cuando confirmPayment
   * termina con status=succeeded (el webhook marcará la orden como 'paid').
   */
  function handlePaymentSuccess() {
    sessionStorage.setItem('aloe_last_order', JSON.stringify({
      id: orderRef.numero,
      orderId: orderRef.id,
      email: data.email,
      address: data.address,
      shipping: data.shipping,
      payment: 'card',
      items,
      subtotal: orderRef.subtotal,
      shippingCost: orderRef.envio,
      total: orderRef.total,
      date: orderRef.created_at,
    }))
    clearCart()
    reset()
    navigate('/confirmacion')
  }

  /* ---------- Render: estamos ya pagando con Stripe ---------- */
  if (stage === 'paying' && clientSecret) {
    return (
      <div>
        <div className="mb-6">
          <h2
            className="text-2xl font-bold text-[#2C2C2A] mb-1"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Introduce los datos de tu tarjeta
          </h2>
          <p className="text-sm text-[#757571]" style={{ lineHeight: 1.6 }}>
            Pedido <strong className="text-[#2D7B4A]">{orderRef.numero}</strong> ·
            Total <strong>{orderTotal.toFixed(2).replace('.', ',')}€</strong>
          </p>
        </div>

        <Elements stripe={stripePromise} options={{ clientSecret, appearance: STRIPE_APPEARANCE }}>
          <StripePaymentForm
            orderTotal={orderTotal}
            onBack={() => setStage('select')}
            onSuccess={handlePaymentSuccess}
          />
        </Elements>

        <div className="flex items-center gap-2 mt-6 text-xs text-[#9E9E9A]">
          <ShieldCheck size={14} style={{ color: '#43A047' }} />
          <span>Pago cifrado SSL · Procesado por Stripe · SCA/3DS compliant</span>
        </div>
      </div>
    )
  }

  /* ---------- Render: selección de método ---------- */
  return (
    <form onSubmit={e => { e.preventDefault(); startPayment() }} noValidate>
      <div className="mb-8">
        <h2
          className="text-2xl font-bold text-[#2C2C2A] mb-1"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Método de pago
        </h2>
        <p className="text-sm text-[#757571]" style={{ lineHeight: 1.6 }}>
          Todos los pagos son seguros y están cifrados.
        </p>
      </div>

      {!isAuthenticated && (
        <div
          className="flex items-start gap-2 p-3 mb-6 rounded-xl bg-[#FFF8E1] border border-[#D4AF37]/30 text-sm text-[#B26A00]"
          role="status"
        >
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>
            Para completar el pedido necesitas una cuenta. Al confirmar te llevaremos a iniciar sesión.
          </span>
        </div>
      )}

      <div className="flex flex-col gap-3 mb-6">
        {PAYMENT_METHODS.map(opt => {
          const selected = payment === opt.id
          const disabled = !opt.enabled
          return (
            <label
              key={opt.id}
              className={[
                'flex items-center gap-4 p-4 rounded-xl border-2 transition-all',
                disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
              ].join(' ')}
              style={{
                borderColor: selected ? '#2D7B4A' : '#E8E8E6',
                backgroundColor: selected ? '#F0FBF4' : disabled ? '#FAFAF8' : 'white',
              }}
            >
              <input
                type="radio"
                name="payment"
                value={opt.id}
                checked={selected}
                disabled={disabled}
                onChange={() => !disabled && setPaymentLocal(opt.id)}
                className="sr-only"
              />
              <div
                className="flex items-center justify-center w-5 h-5 rounded-full border-2 shrink-0 transition-all"
                style={{
                  borderColor: selected ? '#2D7B4A' : '#D8D8D4',
                  backgroundColor: selected ? '#2D7B4A' : 'white',
                }}
              >
                {selected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <span className="text-xl" aria-hidden="true">{opt.icon}</span>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold text-[#2C2C2A] flex items-center gap-2 flex-wrap"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif", lineHeight: 1.4 }}
                >
                  {opt.label}
                  {disabled && (
                    <span
                      className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: '#F5F5F3', color: '#9E9E9A' }}
                    >
                      Próximamente
                    </span>
                  )}
                </p>
                <p className="text-xs text-[#757571]" style={{ lineHeight: 1.5 }}>
                  {opt.description}
                </p>
              </div>
            </label>
          )
        })}
      </div>

      <div className="bg-white rounded-xl border border-[#E8E8E6] p-4 mb-6 flex justify-between items-center">
        <span className="text-sm text-[#757571]">Total a pagar</span>
        <span
          className="text-2xl font-bold"
          style={{ color: '#2D7B4A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          {orderTotal.toFixed(2).replace('.', ',')}€
        </span>
      </div>

      {submitError && (
        <div
          role="alert"
          className="flex items-start gap-2 p-3 mb-6 rounded-xl bg-[#FDECEA] border border-[#E53935]/30 text-sm text-[#B71C1C]"
        >
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      <div className="flex items-center gap-2 mb-6 text-xs text-[#9E9E9A]">
        <ShieldCheck size={14} style={{ color: '#43A047' }} />
        <span>Pago cifrado SSL · Nunca almacenamos datos de tu tarjeta</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="button" variant="outline" onClick={prevStep} className="flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Volver
        </Button>
        <Button
          type="submit"
          size="lg"
          fullWidth
          disabled={loading}
          className="flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Preparando pago…
            </>
          ) : (
            <>
              <Lock size={16} />
              Continuar al pago · {orderTotal.toFixed(2).replace('.', ',')}€
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
