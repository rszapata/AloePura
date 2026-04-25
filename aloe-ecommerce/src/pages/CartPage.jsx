import { useCart } from '../context/CartContext'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import CartEmpty from '../components/cart/CartEmpty'

export default function CartPage() {
  const { items, count, total } = useCart()

  if (count === 0) {
    return (
      <div className="section-padding">
        <div className="container">
          <CartEmpty />
        </div>
      </div>
    )
  }

  return (
    <div className="section-padding" style={{ backgroundColor: '#FAFAF8' }}>
      <div className="container max-w-5xl">
        <h1
          className="text-[#2C2C2A] mb-8"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.3rem)',
            fontWeight: 700,
          }}
        >
          Mi carrito ({count})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary count={count} subtotal={total} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
