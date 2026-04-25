import { Link } from 'react-router-dom'
import { Leaf, Star } from 'lucide-react'
import { useRelatedProducts } from '../../hooks/useProducts'

export default function RelatedProducts({ currentId }) {
  const { relacionados, loading } = useRelatedProducts(currentId, 3)
  if (loading || !relacionados.length) return null

  return (
    <section>
      <h2
        className="text-2xl font-bold text-[#2C2C2A] mb-6"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        También te podría interesar
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relacionados.map(p => (
          <Link
            key={p.id}
            to={`/producto/${p.id}`}
            className="group flex flex-col rounded-2xl bg-white border border-[#E8E8E6] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div
              className="relative w-full h-48 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #E8F5E9, #E0F2F1)' }}
            >
              <Leaf size={56} style={{ color: '#66BB6A', opacity: 0.5 }} />
              {p.badge && (
                <span
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
                  style={{
                    backgroundColor: p.badgeType === 'secondary' ? '#26A69A' : '#2D7B4A',
                    fontFamily: "'Montserrat', system-ui, sans-serif",
                  }}
                >
                  {p.badge}
                </span>
              )}
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3
                className="text-base font-bold text-[#2C2C2A] mb-1 group-hover:text-[#2D7B4A] transition-colors"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {p.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-[#757571] mb-3">
                <Star size={12} fill="#D4AF37" stroke="#D4AF37" />
                <span>{p.rating.toFixed(1)}</span>
                <span>· {p.reviewsCount} reseñas</span>
              </div>
              <div className="mt-auto">
                <span
                  className="text-xl font-bold"
                  style={{ color: '#2D7B4A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  {p.price.toFixed(2).replace('.', ',')}€
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
