import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, Leaf } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function CartItem({ item, compact = false, onLinkClick }) {
  const { removeItem, updateQuantity } = useCart()
  const subtotal = item.price * item.quantity

  return (
    <div className="flex items-center gap-3 sm:gap-4 bg-white rounded-2xl p-3 sm:p-4 border border-[#E8E8E6]">
      <Link
        to={`/producto/${item.id}`}
        onClick={onLinkClick}
        className={`${compact ? 'w-16 h-16' : 'w-20 h-20'} rounded-xl flex-shrink-0 flex items-center justify-center`}
        style={{ background: 'linear-gradient(135deg, #E8F5E9, #E0F2F1)' }}
        aria-label={`Ver ${item.name}`}
      >
        <Leaf size={compact ? 22 : 28} style={{ color: '#66BB6A', opacity: 0.6 }} />
      </Link>

      <div className="flex-1 min-w-0">
        <Link to={`/producto/${item.id}`} onClick={onLinkClick}>
          <h3
            className="font-bold text-[#2C2C2A] truncate hover:text-[#2D7B4A] transition-colors text-sm sm:text-base"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {item.name}
          </h3>
        </Link>
        <p
          className="text-xs text-[#757571]"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          {item.price.toFixed(2).replace('.', ',')}€ c/u
        </p>

        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="inline-flex items-center rounded-lg border border-[#E8E8E6] bg-white">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-[#2D7B4A] hover:bg-[#E8F5E9] rounded-l-lg"
              aria-label="Reducir cantidad"
            >
              <Minus size={12} />
            </button>
            <span
              className="w-7 text-center text-sm font-semibold text-[#2C2C2A]"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-[#2D7B4A] hover:bg-[#E8F5E9] rounded-r-lg"
              aria-label="Aumentar cantidad"
            >
              <Plus size={12} />
            </button>
          </div>

          <p
            className="font-bold text-[#2D7B4A] text-sm sm:text-base"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            {subtotal.toFixed(2).replace('.', ',')}€
          </p>
        </div>
      </div>

      <button
        onClick={() => removeItem(item.id)}
        className="self-start p-1.5 rounded-lg text-[#9E9E9A] hover:text-[#E53935] hover:bg-[#FBE9E7] transition-colors"
        aria-label={`Eliminar ${item.name}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}
