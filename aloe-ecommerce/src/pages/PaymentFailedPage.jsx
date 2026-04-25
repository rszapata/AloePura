import { Link } from 'react-router-dom'
import { XCircle, RotateCcw, ArrowLeft } from 'lucide-react'
import Button from '../components/common/Button'
import usePageMeta from '../hooks/usePageMeta'

export default function PaymentFailedPage() {
  usePageMeta({
    title: 'Pago no completado',
    description: 'El pago no pudo procesarse. Puedes intentarlo de nuevo.',
  })

  return (
    <div
      className="min-h-[60vh] flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: '#FAFAF8' }}
    >
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E8E8E6] shadow-sm p-8 text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
          style={{ backgroundColor: '#FDECEA' }}
          aria-hidden="true"
        >
          <XCircle size={32} style={{ color: '#E53935' }} />
        </div>

        <h1
          className="text-2xl sm:text-3xl font-bold text-[#2C2C2A] mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Pago no completado
        </h1>

        <p className="text-[#4A4A4A] mb-6" style={{ lineHeight: 1.6 }}>
          El pago no pudo procesarse. No se ha efectuado ningún cargo en tu tarjeta.
          Puedes intentarlo de nuevo o elegir otro método de pago.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/checkout" className="flex-1">
            <Button size="lg" fullWidth className="flex items-center justify-center gap-2">
              <RotateCcw size={16} />
              Intentar de nuevo
            </Button>
          </Link>
          <Link to="/carrito" className="flex-1">
            <Button variant="outline" size="lg" fullWidth className="flex items-center justify-center gap-2">
              <ArrowLeft size={16} />
              Volver al carrito
            </Button>
          </Link>
        </div>

        <p className="text-xs text-[#9E9E9A] mt-6" style={{ lineHeight: 1.5 }}>
          Si el problema persiste,{' '}
          <Link to="/contacto" className="underline hover:text-[#2D7B4A]">
            contáctanos
          </Link>{' '}
          y te ayudaremos.
        </p>
      </div>
    </div>
  )
}
