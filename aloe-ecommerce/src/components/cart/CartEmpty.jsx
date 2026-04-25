import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import Button from '../common/Button'

export default function CartEmpty({ compact = false, onContinue }) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? 'py-10 px-4' : 'min-h-[50vh] px-4'}`}>
      <ShoppingBag size={compact ? 48 : 64} style={{ color: '#D8D8D4' }} className="mb-4" />
      <h2
        className={`${compact ? 'text-xl' : 'text-2xl'} font-bold text-[#2C2C2A] mb-3`}
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Tu carrito está vacío
      </h2>
      <p className="text-[#757571] mb-6 max-w-sm text-sm">
        Añade productos para comenzar tu pedido y disfruta de envío gratuito en compras superiores a 40€.
      </p>
      <Link to="/productos" onClick={onContinue}>
        <Button>Explorar productos</Button>
      </Link>
    </div>
  )
}
