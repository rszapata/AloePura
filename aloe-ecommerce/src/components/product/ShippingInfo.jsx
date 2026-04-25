import { Truck, RotateCcw, ShieldCheck, CreditCard } from 'lucide-react'

const items = [
  {
    icon: Truck,
    title: 'Envío gratuito',
    description: 'En pedidos superiores a 40€. Entrega en 24-48h en Península.',
  },
  {
    icon: RotateCcw,
    title: 'Devolución 30 días',
    description: 'Si no quedas satisfecho/a, te devolvemos el dinero sin preguntas.',
  },
  {
    icon: ShieldCheck,
    title: 'Pago 100% seguro',
    description: 'Protección del comprador y cifrado SSL en todas las transacciones.',
  },
  {
    icon: CreditCard,
    title: 'Paga como quieras',
    description: 'Visa, Mastercard, PayPal, Bizum y transferencia bancaria.',
  },
]

export default function ShippingInfo() {
  return (
    <div className="rounded-2xl border border-[#E8E8E6] bg-white p-5">
      <ul className="flex flex-col gap-4">
        {items.map(({ icon: Icon, title, description }) => (
          <li key={title} className="flex items-start gap-3">
            <span
              className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
              style={{ backgroundColor: '#E8F5E9' }}
            >
              <Icon size={18} style={{ color: '#2D7B4A' }} />
            </span>
            <div>
              <p
                className="text-sm font-bold text-[#2C2C2A]"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {title}
              </p>
              <p className="text-xs text-[#757571] mt-0.5" style={{ lineHeight: 1.5 }}>
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
