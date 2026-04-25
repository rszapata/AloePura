import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p
        className="text-8xl font-bold mb-4"
        style={{ color: '#66BB6A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
      >
        404
      </p>
      <h1
        className="text-3xl font-bold text-[#2C2C2A] mb-3"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Página no encontrada
      </h1>
      <p className="text-[#757571] mb-8 max-w-md">
        La página que buscas no existe o ha sido movida. Vuelve al inicio para
        continuar explorando nuestros productos.
      </p>
      <Link to="/">
        <Button>Volver al inicio</Button>
      </Link>
    </div>
  )
}
