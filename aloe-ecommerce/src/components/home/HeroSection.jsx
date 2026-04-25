import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Leaf } from 'lucide-react'
import Button from '../common/Button'

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #E8F5E9 0%, #F5F5F3 50%, #E0F2F1 100%)' }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ backgroundColor: '#66BB6A' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-15 pointer-events-none"
        style={{ backgroundColor: '#26A69A' }}
        aria-hidden="true"
      />

      <div className="container relative section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
              style={{
                backgroundColor: '#E8F5E9',
                color: '#2D7B4A',
                border: '1px solid #66BB6A',
                fontFamily: "'Montserrat', system-ui, sans-serif",
              }}>
              <Leaf size={14} />
              100% Natural · Cultivado en Canarias
            </div>

            {/* Headline */}
            <h1
              className="mb-6 text-[#2C2C2A]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.5px',
              }}
            >
              La Naturaleza{' '}
              <span style={{ color: '#2D7B4A' }}>en tu Piel</span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg sm:text-xl mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              style={{ color: '#757571' }}
            >
              Cosméticos de aloe vera puro, cultivados de forma sostenible en las Islas Canarias.
              Certificados ecológicos y avalados por dermatólogos.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              {[
                { icon: ShieldCheck, text: 'Dermatólogo testado' },
                { icon: Leaf, text: 'Certificado ECO' },
                { icon: ShieldCheck, text: 'Garantía 30 días' },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 text-sm"
                  style={{ color: '#2D7B4A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  <Icon size={15} />
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link to="/productos">
                <Button size="lg" className="flex items-center gap-2">
                  Ver Productos
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/nosotros">
                <Button variant="outline" size="lg">
                  Nuestra Historia
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual placeholder (image will be added in Sprint 2) */}
          <div className="hidden lg:flex items-center justify-center">
            <div
              className="relative w-80 h-80 rounded-full flex items-center justify-center shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #2D7B4A, #26A69A)' }}
            >
              <Leaf size={120} className="text-white/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p
                  className="text-white text-center font-bold text-2xl px-8 leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Aloe<br />Pura
                </p>
              </div>
              {/* Floating badges */}
              <div
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-2 text-center"
              >
                <p className="text-xs font-semibold" style={{ color: '#757571', fontFamily: "'Montserrat', system-ui, sans-serif" }}>desde</p>
                <p className="text-xl font-bold" style={{ color: '#2D7B4A', fontFamily: "'Montserrat', system-ui, sans-serif" }}>5,99€</p>
              </div>
              <div
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-2"
              >
                <p className="text-xs font-semibold" style={{ color: '#2D7B4A', fontFamily: "'Montserrat', system-ui, sans-serif" }}>⭐ 4.9/5</p>
                <p className="text-xs" style={{ color: '#757571' }}>+1.200 reseñas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile stats row */}
        <div className="mt-12 pt-8 border-t border-white/50 grid grid-cols-3 gap-4 lg:hidden text-center">
          {[
            { value: '100%', label: 'Natural' },
            { value: '4.9★', label: 'Valoración' },
            { value: '30d', label: 'Garantía' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p
                className="text-xl font-bold"
                style={{ color: '#2D7B4A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {value}
              </p>
              <p className="text-xs" style={{ color: '#757571' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
