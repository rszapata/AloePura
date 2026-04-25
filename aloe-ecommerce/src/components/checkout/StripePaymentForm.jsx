import { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Lock, AlertCircle } from 'lucide-react'
import Button from '../common/Button'

/**
 * Formulario interno que usa useStripe/useElements. Debe estar DENTRO
 * de <Elements> (ver StripePaymentElement.jsx).
 *
 * Props:
 *   orderTotal: number (para mostrar en el botón)
 *   onBack: () => void
 *   onSuccess: () => void  — lo llama cuando el pago se confirma (o requiere action)
 */
export default function StripePaymentForm({ orderTotal, onBack, onSuccess }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError(null)

    // URL de retorno que Stripe usa en métodos redirect-based (3DS, wallets…)
    const returnUrl = `${window.location.origin}/confirmacion`

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
      redirect: 'if_required', // Solo redirige si el método lo exige (3DS, PayPal, iDEAL…)
    })

    if (result.error) {
      // Error inmediato (validación de tarjeta, rechazo del emisor, …)
      setError(result.error.message || 'El pago no pudo completarse')
      setLoading(false)
      return
    }

    // Si llegamos aquí: pago confirmado sin redirect (tarjeta sin 3DS).
    // Stripe habrá disparado el webhook, el backend está marcando la orden.
    // El webhook es async, así que confiamos en el PaymentIntent.status:
    if (result.paymentIntent?.status === 'succeeded') {
      onSuccess()
    } else if (result.paymentIntent?.status === 'requires_action') {
      // Stripe manejará la autenticación 3DS automáticamente en la siguiente llamada
      setError('Autenticación adicional requerida. Por favor, intenta de nuevo.')
      setLoading(false)
    } else {
      setError(`Estado inesperado: ${result.paymentIntent?.status}`)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement options={{ layout: 'tabs' }} />

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 p-3 rounded-xl bg-[#FDECEA] border border-[#E53935]/30 text-sm text-[#B71C1C]"
        >
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={loading}
          className="flex items-center justify-center gap-2"
        >
          Volver
        </Button>
        <Button
          type="submit"
          size="lg"
          fullWidth
          disabled={!stripe || loading}
          className="flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Procesando pago…
            </>
          ) : (
            <>
              <Lock size={16} />
              Pagar {orderTotal.toFixed(2).replace('.', ',')}€
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
