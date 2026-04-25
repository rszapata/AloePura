import Stripe from 'stripe'
import { config, stripeEnabled } from '../config.js'

let _stripe = null

export function getStripe() {
  if (!stripeEnabled) {
    throw new Error('Stripe no está configurado (falta STRIPE_SECRET_KEY)')
  }
  if (!_stripe) {
    _stripe = new Stripe(config.stripe.secretKey, {
      apiVersion: '2024-12-18.acacia',
      typescript: false,
    })
  }
  return _stripe
}

/**
 * Stripe trabaja en enteros (céntimos para EUR).
 * 12.34 € → 1234.
 */
export function toStripeAmount(euros) {
  return Math.round(Number(euros) * 100)
}

/**
 * Crea un PaymentIntent para una orden.
 * Guarda orden_id en metadata para que el webhook sepa qué orden actualizar.
 */
export async function createPaymentIntent({ orden, userEmail }) {
  const stripe = getStripe()
  return stripe.paymentIntents.create({
    amount: toStripeAmount(orden.total),
    currency: config.stripe.currency,
    // payment_method_types se deja a la integración automática del Payment Element
    automatic_payment_methods: { enabled: true },
    receipt_email: userEmail,
    description: `Pedido ${orden.numero}`,
    metadata: {
      orden_id: String(orden.id),
      numero: orden.numero,
      usuario_id: String(orden.usuario_id || ''),
    },
  })
}

/**
 * Verifica la firma del webhook y parsea el evento.
 * `rawBody` debe ser el Buffer crudo (NO JSON parseado).
 */
export function constructWebhookEvent(rawBody, signature) {
  const stripe = getStripe()
  return stripe.webhooks.constructEvent(
    rawBody,
    signature,
    config.stripe.webhookSecret
  )
}
