import { useEffect } from 'react'
import { X, ShoppingCart } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useCartUI } from '../../context/CartUIContext'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import CartEmpty from './CartEmpty'

export default function CartSidebar() {
  const { open, closeSidebar } = useCartUI()
  const { items, count, total } = useCart()

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') closeSidebar() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, closeSidebar])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Carrito">
      <button
        onClick={closeSidebar}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label="Cerrar carrito"
      />
      <aside
        className="absolute right-0 top-0 bottom-0 w-full sm:w-[420px] bg-[#FAFAF8] shadow-2xl flex flex-col animate-[slideInRight_0.2s_ease-out]"
      >
        <header className="flex items-center justify-between p-5 border-b border-[#E8E8E6] bg-white">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} style={{ color: '#2D7B4A' }} />
            <h2
              className="text-lg font-bold text-[#2C2C2A]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Tu carrito {count > 0 && `(${count})`}
            </h2>
          </div>
          <button
            onClick={closeSidebar}
            className="p-2 rounded-lg text-[#757571] hover:text-[#2C2C2A] hover:bg-[#F5F5F3]"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </header>

        {count === 0 ? (
          <CartEmpty compact onContinue={closeSidebar} />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {items.map(item => (
                <CartItem key={item.id} item={item} compact onLinkClick={closeSidebar} />
              ))}
            </div>
            <div className="p-4 border-t border-[#E8E8E6] bg-white">
              <CartSummary count={count} subtotal={total} compact onCheckout={closeSidebar} />
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
