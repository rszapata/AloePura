import { Leaf } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useCheckout } from '../../context/CheckoutContext'
import { SHIPPING_OPTIONS, PAYMENT_OPTIONS } from '../../context/CheckoutContext'

export default function OrderReview({ step }) {
  const { items, total: subtotal } = useCart()
  const { data, getShippingCost } = useCheckout()

  const shippingCost = getShippingCost(subtotal)
  const orderTotal   = subtotal + shippingCost
  const shippingOpt  = SHIPPING_OPTIONS.find(o => o.id === data.shipping)
  const paymentOpt   = PAYMENT_OPTIONS.find(o => o.id === data.payment)

  return (
    <div
      className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#E8E8E6]">
        <h3
          className="text-base font-bold text-[#2C2C2A]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Tu pedido
        </h3>
      </div>

      {/* Items */}
      <ul className="divide-y divide-[#F5F5F3]">
        {items.map(item => (
          <li key={item.id} className="flex items-center gap-3 px-5 py-3">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
              style={{ backgroundColor: '#E8F5E9' }}
            >
              <Leaf size={18} style={{ color: '#66BB6A' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-semibold text-[#2C2C2A] truncate"
                style={{ lineHeight: 1.4 }}
              >
                {item.name}
              </p>
              <p className="text-xs text-[#9E9E9A]" style={{ lineHeight: 1.4 }}>
                Cant. {item.quantity}
              </p>
            </div>
            <span
              className="text-sm font-bold shrink-0"
              style={{ color: '#2D7B4A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              {(item.price * item.quantity).toFixed(2).replace('.', ',')}€
            </span>
          </li>
        ))}
      </ul>

      {/* Totals */}
      <div className="px-5 py-4 border-t border-[#E8E8E6] flex flex-col gap-2">
        <div className="flex justify-between text-sm text-[#757571]">
          <span>Subtotal</span>
          <span>{subtotal.toFixed(2).replace('.', ',')}€</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#757571]">Envío</span>
          <span
            className="font-medium"
            style={{ color: shippingCost === 0 ? '#43A047' : '#2C2C2A' }}
          >
            {shippingCost === 0 ? 'GRATIS' : `${shippingCost.toFixed(2).replace('.', ',')}€`}
          </span>
        </div>
        <div
          className="flex justify-between font-bold text-base pt-2 mt-1 border-t border-[#E8E8E6]"
        >
          <span className="text-[#2C2C2A]">Total</span>
          <span style={{ color: '#2D7B4A', fontFamily: "'Montserrat', system-ui, sans-serif" }}>
            {orderTotal.toFixed(2).replace('.', ',')}€
          </span>
        </div>
      </div>

      {/* Step 2+: shipping info */}
      {step >= 2 && data.shipping && (
        <div className="px-5 py-3 border-t border-[#E8E8E6] bg-[#FAFAF8]">
          <p className="text-xs text-[#757571] font-semibold uppercase tracking-wide mb-1"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
            Método de envío
          </p>
          <p className="text-sm text-[#4A4A4A]" style={{ lineHeight: 1.5 }}>
            {shippingOpt?.label}
          </p>
        </div>
      )}

      {/* Step 3: payment info */}
      {step >= 3 && data.payment && (
        <div className="px-5 py-3 border-t border-[#E8E8E6] bg-[#FAFAF8]">
          <p className="text-xs text-[#757571] font-semibold uppercase tracking-wide mb-1"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
            Pago
          </p>
          <p className="text-sm text-[#4A4A4A]" style={{ lineHeight: 1.5 }}>
            {paymentOpt?.icon} {paymentOpt?.label}
          </p>
        </div>
      )}

      {/* Guarantees */}
      <div className="px-5 py-4 border-t border-[#E8E8E6]">
        {['🔒 Pago 100% seguro', '🌿 Envío ecológico', '↩️ Devolución 30 días'].map(g => (
          <p key={g} className="text-xs text-[#9E9E9A]" style={{ lineHeight: 1.8 }}>{g}</p>
        ))}
      </div>
    </div>
  )
}
