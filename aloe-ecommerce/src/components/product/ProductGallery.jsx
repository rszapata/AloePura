import { useState, useRef } from 'react'
import { Leaf, ChevronLeft, ChevronRight } from 'lucide-react'

const gradients = [
  'linear-gradient(135deg, #E8F5E9, #E0F2F1)',
  'linear-gradient(135deg, #E0F2F1, #FFF8E1)',
  'linear-gradient(135deg, #FFF8E1, #FBE9E7)',
  'linear-gradient(135deg, #FBE9E7, #E8F5E9)',
]

export default function ProductGallery({ product }) {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef(null)

  const images = gradients.map((bg, i) => ({ id: i, bg, alt: `${product.name} vista ${i + 1}` }))
  const total = images.length

  function go(delta) {
    setIndex(i => (i + delta + total) % total)
  }

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }
  function onTouchEnd(e) {
    if (touchStartX.current == null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1)
    touchStartX.current = null
  }

  const current = images[index]

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-6">
      {/* Main image */}
      <div
        className="relative flex-1 aspect-square rounded-2xl overflow-hidden select-none"
        style={{ background: current.bg }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Leaf size={140} style={{ color: '#2D7B4A', opacity: 0.35 }} />
        </div>

        {product.badge && (
          <div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-white"
            style={{
              backgroundColor: product.badgeType === 'secondary' ? '#26A69A' : '#2D7B4A',
              fontFamily: "'Montserrat', system-ui, sans-serif",
            }}
          >
            {product.badge}
          </div>
        )}

        {/* Desktop arrows */}
        <button
          onClick={() => go(-1)}
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white transition"
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={20} style={{ color: '#2D7B4A' }} />
        </button>
        <button
          onClick={() => go(1)}
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white transition"
          aria-label="Imagen siguiente"
        >
          <ChevronRight size={20} style={{ color: '#2D7B4A' }} />
        </button>

        {/* Mobile dots */}
        <div className="sm:hidden absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full transition-all"
              style={{ backgroundColor: i === index ? '#2D7B4A' : 'rgba(45, 123, 74, 0.3)' }}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails - hidden on mobile */}
      <div className="hidden lg:flex flex-col gap-3 w-20 shrink-0">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setIndex(i)}
            className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
              i === index ? 'border-[#2D7B4A] shadow-md' : 'border-transparent hover:border-[#66BB6A]'
            }`}
            style={{ background: img.bg }}
            aria-label={img.alt}
            aria-current={i === index}
          >
            <div className="w-full h-full flex items-center justify-center">
              <Leaf size={28} style={{ color: '#2D7B4A', opacity: 0.4 }} />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
