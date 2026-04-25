import { Star } from 'lucide-react'

export default function ProductInfo({ product }) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <div>
      <p
        className="text-xs font-semibold uppercase tracking-wider mb-2"
        style={{ color: '#26A69A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
      >
        {product.category}
      </p>

      <h1
        className="text-[#2C2C2A] mb-3"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontWeight: 700,
          lineHeight: 1.15,
        }}
      >
        {product.name}
      </h1>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < Math.round(product.rating) ? '#D4AF37' : 'none'}
              stroke="#D4AF37"
            />
          ))}
        </div>
        <p
          className="text-sm font-semibold text-[#2C2C2A]"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          {product.rating.toFixed(1)}
        </p>
        <a href="#reviews" className="text-sm text-[#757571] hover:text-[#2D7B4A] underline underline-offset-2">
          ({product.reviewsCount} reseñas)
        </a>
      </div>

      <div className="flex items-end gap-3 mb-5">
        <span
          className="text-3xl sm:text-4xl font-bold"
          style={{ color: '#2D7B4A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          {product.price.toFixed(2).replace('.', ',')}€
        </span>
        {product.oldPrice && (
          <>
            <span className="text-lg text-[#9E9E9A] line-through mb-0.5">
              {product.oldPrice.toFixed(2).replace('.', ',')}€
            </span>
            <span
              className="px-2.5 py-1 rounded-lg text-xs font-bold text-white mb-1"
              style={{ backgroundColor: '#E53935', fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              -{discount}%
            </span>
          </>
        )}
      </div>

      <p className="text-base text-[#4A4A4A] mb-4" style={{ lineHeight: 1.7 }}>
        {product.longDescription || product.description}
      </p>

      <div className="flex items-center gap-2 text-sm">
        <span
          className={`inline-block w-2 h-2 rounded-full`}
          style={{ backgroundColor: product.stock > 0 ? '#43A047' : '#E53935' }}
        />
        <span className="text-[#4A4A4A]">
          {product.stock > 0 ? `En stock (${product.stock} disponibles)` : 'Agotado'}
        </span>
      </div>
    </div>
  )
}
