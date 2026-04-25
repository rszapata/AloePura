import { createContext, useContext, useState, useEffect } from 'react'
import { EMPTY_ADDRESS } from '../utils/address'

const STORAGE_KEY = 'aloe_checkout'

const INITIAL_STATE = {
  step: 1,
  email: '',
  newsletter: false,
  address: { ...EMPTY_ADDRESS },
  shipping: 'standard', // 'express' | 'standard'
  payment: 'card',      // 'card' | 'bizum' | 'paypal' | 'transfer'
}

export const SHIPPING_OPTIONS = [
  {
    id: 'express',
    label: 'Envío Express 24-48h',
    description: 'Recíbelo mañana si pides antes de las 14h',
    price: 2.99,
    free: false,
  },
  {
    id: 'standard',
    label: 'Envío Estándar 3-5 días',
    description: 'Gratis en pedidos superiores a 30€',
    price: 2.99,
    freeThreshold: 30,
  },
]

export const PAYMENT_OPTIONS = [
  { id: 'card',     label: 'Tarjeta crédito / débito', icon: '💳', description: 'Visa, Mastercard · Pago seguro Redsys' },
  { id: 'bizum',   label: 'Bizum',                    icon: '📱', description: 'Pago instantáneo con tu móvil' },
  { id: 'paypal',  label: 'PayPal',                   icon: '🅿️', description: 'Paga con tu cuenta PayPal' },
  { id: 'transfer',label: 'Transferencia bancaria',   icon: '🏦', description: 'Datos bancarios por email tras el pedido' },
]

const CheckoutContext = createContext(null)

export function CheckoutProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      return stored ? { ...INITIAL_STATE, ...JSON.parse(stored) } : INITIAL_STATE
    } catch {
      return INITIAL_STATE
    }
  })

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  function setStep(step) {
    setData(d => ({ ...d, step }))
  }

  function nextStep() {
    setData(d => ({ ...d, step: Math.min(3, d.step + 1) }))
  }

  function prevStep() {
    setData(d => ({ ...d, step: Math.max(1, d.step - 1) }))
  }

  function setEmail(email, newsletter = false) {
    setData(d => ({ ...d, email, newsletter }))
  }

  function setAddress(address) {
    setData(d => ({ ...d, address: { ...d.address, ...address } }))
  }

  function setShipping(shipping) {
    setData(d => ({ ...d, shipping }))
  }

  function setPayment(payment) {
    setData(d => ({ ...d, payment }))
  }

  function reset() {
    sessionStorage.removeItem(STORAGE_KEY)
    setData(INITIAL_STATE)
  }

  function getShippingCost(subtotal) {
    const opt = SHIPPING_OPTIONS.find(o => o.id === data.shipping)
    if (!opt) return 0
    if (opt.freeThreshold && subtotal >= opt.freeThreshold) return 0
    return opt.price
  }

  return (
    <CheckoutContext.Provider
      value={{ data, setStep, nextStep, prevStep, setEmail, setAddress, setShipping, setPayment, reset, getShippingCost }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext)
  if (!ctx) throw new Error('useCheckout must be inside CheckoutProvider')
  return ctx
}
