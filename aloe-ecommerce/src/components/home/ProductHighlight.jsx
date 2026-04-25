import { Link } from 'react-router-dom'
import { ShoppingCart, ArrowRight, Leaf } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useProducts } from '../../hooks/useProducts'
import Badge from '../common/Badge'
import Button from '../common/Button'
import Card from '../common/Card'

function ProductCard({ product }) {
  const { addItem } = useCart()
  const badgeVariant = product.badgeType === 'secondary' ? 'secondary' : 'primary'

  return (
    <Card hoverable className="flex flex-col overflow-hidden">
      <Link
        to={`/producto/${product.id}`}
        className="relative w-full h-52 sm:h-56 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #E8F5E9, #E0F2F1)' }}
        aria-label={`Ver ${product.name}`}
      >
        <Leaf size={64} style={{ color: '#66BB6A', opacity: 0.5 }} />
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge variant={badgeVariant}>{product.badge}</Badge>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-6">
        <h3
          className="text-lg font-bold mb-2 leading-snug"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          <Link
            to={`/producto/${product.id}`}
            className="text-[#2C2C2A] hover:text-[#2D7B4A] transition-colors"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-[#757571] leading-relaxed mb-4 flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-3 mt-auto">
          <span
            className="text-2xl font-bold"
            style={{ color: '#2D7B4A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            {product.price.toFixed(2).replace('.', ',')}€
          </span>
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: '#2D7B4A',
              fontFamily: "'Montserrat', system-ui, sans-serif",
            }}
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <ShoppingCart size={16} />
            Añadir
          </button>
        </div>
      </div>
    </Card>
  )
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white border border-[#E8E8E6] overflow-hidden animate-pulse">
      <div className="w-full h-52 sm:h-56 bg-[#F0F0ED]" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-[#F0F0ED] rounded w-3/4" />
        <div className="h-4 bg-[#F0F0ED] rounded w-full" />
        <div className="h-4 bg-[#F0F0ED] rounded w-5/6" />
        <div className="flex justify-between mt-4">
          <div className="h-8 bg-[#F0F0ED] rounded w-20" />
          <div className="h-10 bg-[#F0F0ED] rounded w-24" />
        </div>
      </div>
    </div>
  )
}

export default function ProductHighlight() {
  const { productos, loading, error } = useProducts({ sort: 'featured', limit: 3 })

  return (
    <section className="section-padding" style={{ backgroundColor: '#FAFAF8' }}>
      <div className="container">
        <div className="text-center mb-12 sm:mb-16">
          <p
            className="text-sm font-semibold uppercase tracking-wider mb-3"
            style={{ color: '#26A69A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Más Vendidos
          </p>
          <h2
            className="text-[#2C2C2A] mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
            }}
          >
            Productos Destacados
          </h2>
          <p className="text-[#757571] max-w-xl mx-auto text-base sm:text-lg">
            Seleccionados por su eficacia y los favoritos de nuestra comunidad.
          </p>
        </div>

        {error && (
          <p className="text-center text-[#E53935] mb-6">
            No se pudieron cargar los productos. Inténtalo más tarde.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : productos.map(product => <ProductCard key={product.id} product={product} />)}
        </div>

        <div className="text-center mt-10">
          <Link to="/productos">
            <Button variant="outline" size="lg" className="inline-flex items-center gap-2">
              Ver todos los productos
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
