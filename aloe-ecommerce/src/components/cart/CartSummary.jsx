import { Link } from 'react-router-dom'
import Button from '../common/Button'

const FREE_SHIPPING_THRESHOLD = 40
const STANDARD_SHIPPING = 3.99

export function computeTotals(subtotal) {
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING
  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
    freeShipping: shipping === 0,
    missingForFree: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
  }
}

export default function CartSummary({ count, subtotal, compact = false, onCheckout }) {
  const { shipping, total, freeShipping, missingForFree } = computeTotals(subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <div className={`bg-white rounded-2xl border border-[#E8E8E6] ${compact ? 'p-5' : 'p-6 shadow-sm'}`}>
      <h2
        className="text-lg font-bold text-[#2C2C2A] mb-4"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Resumen
      </h2>

      {/* Free shipping progress */}
      {!freeShipping && (
        <div className="mb-4 p-3 rounded-xl bg-[#E8F5E9]">
          <p className="text-xs text-[#2D7B4A] mb-2" style={{ lineHeight: 1.5 }}>
            Añade <strong>{missingForFree.toFixed(2).replace('.', ',')}€</strong> más para conseguir envío gratuito.
          </p>
          <div className="h-1.5 rounded-full bg-white overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: '#2D7B4A' }} />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2.5 mb-4 text-sm">
        <div className="flex justify-between text-[#757571]">
          <span>Subtotal ({count} artíc.)</span>
          <span>{subtotal.toFixed(2).replace('.', ',')}€</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#757571]">Envío</span>
          <span className="font-medium" style={{ color: freeShipping ? '#43A047' : '#2C2C2A' }}>
            {freeShipping ? 'GRATIS' : `${shipping.toFixed(2).replace('.', ',')}€`}
          </span>
        </div>
        <div className="border-t border-[#E8E8E6] pt-3 flex justify-between font-bold text-base">
          <span className="text-[#2C2C2A]">Total</span>
          <span style={{ color: '#2D7B4A', fontFamily: "'Montserrat', system-ui, sans-serif" }}>
            {total.toFixed(2).replace('.', ',')}€
          </span>
        </div>
      </div>

      <Link to="/checkout" onClick={onCheckout}>
        <Button fullWidth size={compact ? 'md' : 'lg'}>
          Finalizar compra
        </Button>
      </Link>
      {!compact && (
        <Link to="/productos" className="block text-center mt-3">
          <Button variant="text" fullWidth size="sm">
            Seguir comprando
          </Button>
        </Link>
      )}
    </div>
  )
}
