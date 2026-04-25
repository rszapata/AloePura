import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Package, Mail, MapPin, CreditCard, ArrowRight, Leaf } from 'lucide-react'
import { SHIPPING_OPTIONS, PAYMENT_OPTIONS } from '../context/CheckoutContext'
import { formatAddressInline } from '../utils/address'
import Button from '../components/common/Button'

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
        style={{ backgroundColor: '#E8F5E9' }}
      >
        <Icon size={16} style={{ color: '#2D7B4A' }} />
      </div>
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-wide text-[#9E9E9A] mb-0.5"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          {label}
        </p>
        <p className="text-sm text-[#2C2C2A]" style={{ lineHeight: 1.6 }}>
          {value}
        </p>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('aloe_last_order')
      if (stored) setOrder(JSON.parse(stored))
    } catch {}
  }, [])

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <p className="text-[#757571] mb-6">No se encontró información del pedido.</p>
        <Link to="/"><Button>Volver al inicio</Button></Link>
      </div>
    )
  }

  const shippingOpt = SHIPPING_OPTIONS.find(o => o.id === order.shipping)
  const paymentOpt  = PAYMENT_OPTIONS.find(o => o.id === order.payment)
  const orderDate    = new Date(order.date).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="section-padding" style={{ backgroundColor: '#FAFAF8' }}>
      <div className="container" style={{ maxWidth: 680 }}>

        {/* Success header */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-5"
            style={{ backgroundColor: '#E8F5E9' }}
          >
            <CheckCircle size={42} style={{ color: '#2D7B4A' }} strokeWidth={1.5} />
          </div>
          <h1
            className="text-3xl font-bold text-[#2C2C2A] mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            ¡Pedido confirmado!
          </h1>
          <p className="text-[#757571]" style={{ lineHeight: 1.7 }}>
            Gracias por tu compra. Hemos recibido tu pedido y lo estamos preparando con cuidado.
          </p>
          <div
            className="inline-block mt-4 px-4 py-2 rounded-full text-sm font-bold"
            style={{
              backgroundColor: '#E8F5E9',
              color: '#2D7B4A',
              fontFamily: "'Montserrat', system-ui, sans-serif",
            }}
          >
            {order.id}
          </div>
        </div>

        {/* Email notice */}
        <div
          className="flex items-start gap-3 p-4 rounded-xl border mb-8"
          style={{ backgroundColor: '#FFF8E1', borderColor: '#D4AF37' + '40' }}
        >
          <Mail size={18} className="shrink-0 mt-0.5" style={{ color: '#D4AF37' }} />
          <p className="text-sm text-[#4A4A4A]" style={{ lineHeight: 1.6 }}>
            Hemos enviado la confirmación a <strong>{order.email}</strong>. Revisa también tu
            carpeta de spam si no lo encuentras.
          </p>
        </div>

        {/* Order details card */}
        <div className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm overflow-hidden mb-6">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#E8E8E6]">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2
                className="text-base font-bold text-[#2C2C2A]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Detalles del pedido
              </h2>
              <span className="text-xs text-[#9E9E9A]">{orderDate}</span>
            </div>
          </div>

          {/* Items */}
          <ul className="divide-y divide-[#F5F5F3]">
            {order.items.map(item => (
              <li key={item.id} className="flex items-center gap-3 px-6 py-4">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                  style={{ backgroundColor: '#E8F5E9' }}
                >
                  <Leaf size={18} style={{ color: '#66BB6A' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#2C2C2A] truncate" style={{ lineHeight: 1.4 }}>
                    {item.name}
                  </p>
                  <p className="text-xs text-[#9E9E9A]">Cantidad: {item.quantity}</p>
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
          <div className="px-6 py-4 border-t border-[#E8E8E6] flex flex-col gap-2">
            <div className="flex justify-between text-sm text-[#757571]">
              <span>Subtotal</span>
              <span>{order.subtotal.toFixed(2).replace('.', ',')}€</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#757571]">Envío</span>
              <span style={{ color: order.shippingCost === 0 ? '#43A047' : '#2C2C2A', fontWeight: 500 }}>
                {order.shippingCost === 0 ? 'GRATIS' : `${order.shippingCost.toFixed(2).replace('.', ',')}€`}
              </span>
            </div>
            <div className="flex justify-between font-bold text-base pt-2 mt-1 border-t border-[#E8E8E6]">
              <span className="text-[#2C2C2A]">Total pagado</span>
              <span style={{ color: '#2D7B4A', fontFamily: "'Montserrat', system-ui, sans-serif" }}>
                {order.total.toFixed(2).replace('.', ',')}€
              </span>
            </div>
          </div>
        </div>

        {/* Info rows */}
        <div className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm p-6 flex flex-col gap-5 mb-8">
          <InfoRow
            icon={MapPin}
            label="Dirección de entrega"
            value={formatAddressInline(order.address)}
          />
          <InfoRow
            icon={Package}
            label="Método de envío"
            value={shippingOpt?.label ?? order.shipping}
          />
          <InfoRow
            icon={CreditCard}
            label="Pago"
            value={`${paymentOpt?.icon ?? ''} ${paymentOpt?.label ?? order.payment}`}
          />
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/productos">
            <Button variant="outline" size="lg" className="flex items-center gap-2 justify-center">
              Seguir comprando
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Link to="/">
            <Button size="lg">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
