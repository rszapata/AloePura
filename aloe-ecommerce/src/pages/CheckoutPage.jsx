import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ShieldCheck, Leaf } from 'lucide-react'
import { CheckoutProvider, useCheckout } from '../context/CheckoutContext'
import { useCart } from '../context/CartContext'
import ProgressBar from '../components/checkout/ProgressBar'
import CheckoutStep1 from '../components/checkout/CheckoutStep1'
import CheckoutStep2 from '../components/checkout/CheckoutStep2'
import CheckoutStep3 from '../components/checkout/CheckoutStep3'
import OrderReview from '../components/checkout/OrderReview'

function CheckoutInner() {
  const { data } = useCheckout()
  const { count } = useCart()
  const navigate  = useNavigate()

  // Redirect to cart if empty — PERO no si acabamos de crear una orden
  // (clearCart() dispararía este efecto y nos llevaría a /carrito
  // antes de que el navigate('/confirmacion') tome efecto).
  useEffect(() => {
    if (count === 0 && !sessionStorage.getItem('aloe_last_order')) {
      navigate('/carrito', { replace: true })
    }
  }, [count, navigate])

  const stepComponents = {
    1: <CheckoutStep1 />,
    2: <CheckoutStep2 />,
    3: <CheckoutStep3 />,
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Minimal header */}
      <header
        className="sticky top-0 z-30 bg-white border-b border-[#E8E8E6] shadow-sm"
      >
        <div className="container">
          <div
            className="flex items-center justify-between"
            style={{ paddingTop: 16, paddingBottom: 16 }}
          >
            <Link to="/" className="flex items-center gap-2">
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full"
                style={{ backgroundColor: '#2D7B4A' }}
              >
                <Leaf size={16} className="text-white" />
              </span>
              <span
                className="text-lg font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#2D7B4A' }}
              >
                AloePura
              </span>
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-[#9E9E9A]">
              <ShieldCheck size={14} style={{ color: '#43A047' }} />
              <span>Pago seguro</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 64 }}>
        {/* Progress bar */}
        <ProgressBar current={data.step} />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Form card */}
          <div className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm p-6 sm:p-8">
            {stepComponents[data.step]}
          </div>

          {/* Order review sidebar */}
          <div className="sticky top-28">
            <OrderReview step={data.step} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <CheckoutInner />
    </CheckoutProvider>
  )
}
