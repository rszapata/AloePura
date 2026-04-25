import { Link } from 'react-router-dom'
import { Droplet, Sparkles, FlaskConical, Palette, Heart, Smile, Sun, Flower } from 'lucide-react'

const categories = [
  { slug: 'geles', label: 'Geles', icon: Droplet, color: '#2D7B4A', bg: '#E8F5E9' },
  { slug: 'cremas', label: 'Cremas', icon: Sparkles, color: '#26A69A', bg: '#E0F2F1' },
  { slug: 'serums', label: 'Sérums', icon: FlaskConical, color: '#D4AF37', bg: '#FFF8E1' },
  { slug: 'mascarillas', label: 'Mascarillas', icon: Palette, color: '#E88B7B', bg: '#FBE9E7' },
  { slug: 'cuerpo', label: 'Cuerpo', icon: Heart, color: '#2D7B4A', bg: '#E8F5E9' },
  { slug: 'labios', label: 'Labios', icon: Smile, color: '#E88B7B', bg: '#FBE9E7' },
  { slug: 'solar', label: 'Protección Solar', icon: Sun, color: '#D4AF37', bg: '#FFF8E1' },
  { slug: 'aromaterapia', label: 'Aromaterapia', icon: Flower, color: '#26A69A', bg: '#E0F2F1' },
]

export default function CategoriesGrid() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#FAFAF8' }}>
      <div className="container">
        <div className="text-center mb-12 sm:mb-16">
          <p
            className="text-sm font-semibold uppercase tracking-wider mb-3"
            style={{ color: '#26A69A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Explora
          </p>
          <h2
            className="text-[#2C2C2A] mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
            }}
          >
            Categorías
          </h2>
          <p className="text-[#757571] max-w-xl mx-auto text-base sm:text-lg">
            Encuentra el producto ideal para tu rutina de cuidado personal.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map(({ slug, label, icon: Icon, color, bg }) => (
            <Link
              key={slug}
              to={`/productos?categoria=${slug}`}
              className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-[#E8E8E6] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div
                className="flex items-center justify-center w-14 h-14 rounded-2xl mb-3 transition-transform group-hover:scale-110"
                style={{ backgroundColor: bg }}
              >
                <Icon size={26} style={{ color }} />
              </div>
              <p
                className="text-sm font-semibold text-center text-[#2C2C2A] group-hover:text-[#2D7B4A] transition-colors"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
