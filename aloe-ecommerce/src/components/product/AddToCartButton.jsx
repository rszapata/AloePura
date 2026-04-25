import { ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'

export default function AddToCartButton({ product, quantity = 1, onAdded }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const disabled = product.stock <= 0

  function handleClick() {
    if (disabled) return
    addItem(product, quantity)
    setAdded(true)
    onAdded?.(quantity)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl text-base font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
      style={{
        backgroundColor: added ? '#43A047' : '#2D7B4A',
        fontFamily: "'Montserrat', system-ui, sans-serif",
      }}
      aria-label={`Añadir ${product.name} al carrito`}
    >
      {added ? (
        <>
          <Check size={18} strokeWidth={3} />
          Añadido al carrito
        </>
      ) : (
        <>
          <ShoppingCart size={18} />
          {disabled ? 'Agotado' : 'Añadir al carrito'}
        </>
      )}
    </button>
  )
}
