import { loadStripe } from '@stripe/stripe-js'

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ''

/**
 * Singleton con la instancia de Stripe. loadStripe devuelve una Promise.
 * Si la key no está configurada, exporta null → el checkout mostrará
 * un mensaje explicando que el pago con tarjeta está deshabilitado.
 */
export const stripePromise = publishableKey ? loadStripe(publishableKey) : null

export const stripeEnabled = Boolean(publishableKey)
