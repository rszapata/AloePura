import { Star, BadgeCheck } from 'lucide-react'
import { useReviews } from '../../hooks/useProducts'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return iso
  }
}

export default function ReviewSection({ product }) {
  const { rating, reviewsCount } = product
  const { reviews, loading, error } = useReviews(product.id)

  const distribution = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => r.rating === stars).length
    const pct = reviews.length ? (count / reviews.length) * 100 : 0
    return { stars, count, pct }
  })

  return (
    <section id="reviews">
      <h2
        className="text-2xl font-bold text-[#2C2C2A] mb-6"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Opiniones de clientes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[240px,1fr] gap-8 mb-8">
        <div className="flex flex-col items-center md:items-start p-6 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E6]">
          <p
            className="text-5xl font-bold text-[#2D7B4A] mb-1"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            {Number(rating || 0).toFixed(1)}
          </p>
          <div className="flex gap-0.5 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill={i < Math.round(rating || 0) ? '#D4AF37' : 'none'} stroke="#D4AF37" />
            ))}
          </div>
          <p className="text-xs text-[#757571]">Basado en {reviewsCount} reseñas</p>
        </div>

        <div className="flex flex-col gap-2 justify-center">
          {distribution.map(({ stars, count, pct }) => (
            <div key={stars} className="flex items-center gap-3 text-xs text-[#757571]">
              <span className="w-8 text-right font-semibold text-[#4A4A4A]">{stars}★</span>
              <span className="flex-1 h-2 rounded-full bg-[#E8E8E6] overflow-hidden">
                <span className="block h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: '#D4AF37' }} />
              </span>
              <span className="w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {loading && (
          <p className="text-sm text-[#757571]">Cargando reseñas…</p>
        )}
        {error && !loading && (
          <p className="text-sm text-[#E53935]">No se pudieron cargar las reseñas.</p>
        )}
        {!loading && !error && reviews.map(r => (
          <article key={r.id} className="p-5 rounded-2xl border border-[#E8E8E6] bg-white">
            <div className="flex items-center justify-between gap-3 mb-2">
              <p
                className="font-semibold text-[#2C2C2A] inline-flex items-center gap-1.5"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {r.name}
                {r.verified && (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#2D7B4A]"
                    title="Compra verificada"
                  >
                    <BadgeCheck size={12} />
                    Verificada
                  </span>
                )}
              </p>
              <time className="text-xs text-[#9E9E9A]" dateTime={r.date}>
                {formatDate(r.date)}
              </time>
            </div>
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill={i < r.rating ? '#D4AF37' : 'none'} stroke="#D4AF37" />
              ))}
            </div>
            {r.title && (
              <p
                className="text-sm font-semibold text-[#2C2C2A] mb-1"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {r.title}
              </p>
            )}
            <p className="text-sm text-[#4A4A4A]" style={{ lineHeight: 1.6 }}>
              {r.text}
            </p>
          </article>
        ))}
        {!loading && !error && reviews.length === 0 && (
          <p className="text-sm text-[#757571]">Sé el primero en dejar una reseña.</p>
        )}
      </div>
    </section>
  )
}
