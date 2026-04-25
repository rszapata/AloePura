import * as Order from '../models/order.model.js'
import * as User from '../models/user.model.js'
import { stripeEnabled, config } from '../config.js'
import { createPaymentIntent, constructWebhookEvent } from '../services/stripe.service.js'
import { badRequest, notFound, forbidden } from '../utils/errors.js'

/**
 * POST /api/payments/create-intent
 * body: { ordenId }
 * Crea un PaymentIntent en Stripe y guarda su id en la orden.
 * Responde { clientSecret, publishableKey: (no, eso va en frontend env) }
 */
export async function createIntent(req, res) {
  if (!stripeEnabled) {
    throw badRequest('Stripe no está configurado en este entorno')
  }

  const { ordenId } = req.body

  const orden = await Order.findById(ordenId)
  if (!orden) throw notFound('Orden no encontrada')
  if (orden.usuario_id !== req.user.id) throw forbidden('Esta orden no te pertenece')
  if (orden.estado !== 'pending') {
    throw badRequest(`La orden ya está en estado "${orden.estado}"`)
  }

  const user = await User.findPublicById(req.user.id)

  const intent = await createPaymentIntent({
    orden,
    userEmail: user?.email,
  })

  // Guardar el payment_id en la orden (idempotente: misma orden → mismo PI id
  // si Stripe ve el mismo amount + metadata)
  await Order.setPaymentId(orden.id, intent.id)

  res.json({
    clientSecret: intent.client_secret,
    paymentIntentId: intent.id,
  })
}

/**
 * POST /api/payments/webhook
 * Stripe envía los eventos aquí. Hay que verificar la firma con el raw body.
 */
export async function webhook(req, res) {
  if (!stripeEnabled || !config.stripe.webhookSecret) {
    return res.status(503).json({
      error: { code: 'webhook_disabled', message: 'Webhook no configurado' },
    })
  }

  const signature = req.headers['stripe-signature']
  if (!signature) {
    return res.status(400).send('Falta cabecera stripe-signature')
  }

  let event
  try {
    // req.body es un Buffer porque la ruta usa express.raw
    event = constructWebhookEvent(req.body, signature)
  } catch (err) {
    console.error('[stripe webhook] firma inválida:', err.message)
    return res.status(400).send(`Webhook signature invalid: ${err.message}`)
  }

  const pi = event.data?.object
  const paymentId = pi?.id

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const updated = await Order.markPaidByPaymentId(paymentId)
        console.log(
          `[stripe webhook] payment_intent.succeeded pi=${paymentId} orden=${updated?.numero || '(no encontrada)'}`
        )
        break
      }
      case 'payment_intent.payment_failed':
      case 'payment_intent.canceled': {
        const updated = await Order.markFailedByPaymentId(paymentId)
        console.log(
          `[stripe webhook] ${event.type} pi=${paymentId} orden=${updated?.numero || '(no encontrada)'} — stock restituido`
        )
        break
      }
      default:
        console.log(`[stripe webhook] evento no manejado: ${event.type}`)
    }
  } catch (err) {
    console.error('[stripe webhook] error procesando evento:', err)
    // Stripe reintentará si devolvemos 5xx
    return res.status(500).send('Error procesando evento')
  }

  res.json({ received: true })
}
