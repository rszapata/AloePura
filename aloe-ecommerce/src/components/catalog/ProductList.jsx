import { Link } from 'react-router-dom'
import { Leaf, Star, ShoppingCart, PackageSearch } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useCartUI } from '../../context/CartUIContext'

function ProductCard({ product }) {
  const { addItem } = useCart()
  const { openSidebar } = useCartUI()
  const outOfStock = product.stock <= 0

  function handleAdd(e) {
    e.preventDefault()
    if (outOfStock) return
    addItem(product, 1)
    openSidebar()
  }

  return (
    <Link
      to={`/producto/${product.id}`}
      className="group flex flex-col rounded-2xl bg-white border border-[#E8E8E6] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <div
        className="relative w-full aspect-square flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #E8F5E9, #E0F2F1)' }}
      >
        <Leaf size={72} style={{ color: '#66BB6A', opacity: 0.5 }} />
        {product.badge && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{
              backgroundColor: product.badgeType === 'secondary' ? '#26A69A' : '#2D7B4A',
              fontFamily: "'Montserrat', system-ui, sans-serif",
            }}
          >
            {product.badge}
          </span>
        )}
        {outOfStock && (
          <span
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white bg-[#E53935]"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Agotado
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-base font-bold text-[#2C2C2A] mb-1 group-hover:text-[#2D7B4A] transition-colors"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-[#757571] mb-3">
          <Star size={12} fill="#D4AF37" stroke="#D4AF37" />
          <span>{product.rating.toFixed(1)}</span>
          <span>· {product.reviewsCount} reseñas</span>
        </div>
        <p className="text-xs text-[#757571] mb-4 line-clamp-2" style={{ lineHeight: 1.5 }}>
          {product.description}
        </p>

        <div className="flex items-end justify-between gap-2 mt-auto">
          <div>
            {product.oldPrice && (
              <p className="text-xs text-[#9E9E9A] line-through">
                {product.oldPrice.toFixed(2).replace('.', ',')}€
              </p>
            )}
            <p
              className="text-xl font-bold"
              style={{ color: '#2D7B4A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              {product.price.toFixed(2).replace('.', ',')}€
            </p>
          </div>
          <button
            onClick={handleAdd}
            disabled={outOfStock}
            className="flex items-center justify-center w-10 h-10 rounded-xl text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#2D7B4A' }}
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  )
}

export default function ProductList({ products }) {
  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-2xl border border-[#E8E8E6]">
        <PackageSearch size={48} style={{ color: '#D8D8D4' }} className="mb-3" />
        <h3
          className="text-lg font-bold text-[#2C2C2A] mb-1"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          No hay productos que coincidan
        </h3>
        <p className="text-sm text-[#757571]">Prueba ajustando los filtros.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
