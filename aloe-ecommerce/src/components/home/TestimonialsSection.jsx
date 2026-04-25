import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'María G.',
    location: 'Madrid',
    rating: 5,
    text: 'El gel puro es increíble. Mi piel está mucho más hidratada y noto la diferencia desde la primera semana. 100% recomendado.',
    product: 'Gel Puro Aloe 100ml',
  },
  {
    name: 'Carlos R.',
    location: 'Barcelona',
    rating: 5,
    text: 'La crema antiedad cumple lo que promete. Textura ligera, se absorbe rápido y noto la piel más firme tras un mes de uso.',
    product: 'Crema Antienvejecimiento',
  },
  {
    name: 'Lucía M.',
    location: 'Valencia',
    rating: 5,
    text: 'Me encanta saber que son productos naturales hechos en España. El sérum me ha dado un brillo espectacular. Volveré a comprar.',
    product: 'Sérum Facial',
  },
]

export default function TestimonialsSection() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FAFAF8 0%, #E8F5E9 100%)' }}
    >
      <div className="container relative">
        <div className="text-center mb-12 sm:mb-16">
          <p
            className="text-sm font-semibold uppercase tracking-wider mb-3"
            style={{ color: '#26A69A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Testimonios
          </p>
          <h2
            className="text-[#2C2C2A] mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
            }}
          >
            Lo que dicen nuestros clientes
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} fill="#D4AF37" stroke="#D4AF37" />
              ))}
            </div>
            <p
              className="text-sm font-semibold"
              style={{ color: '#2C2C2A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              4.9/5 · +1.200 reseñas verificadas
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <article
              key={t.name}
              className="relative flex flex-col p-8 rounded-2xl bg-white border border-[#E8E8E6] shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <Quote
                size={32}
                className="absolute top-6 right-6 opacity-20"
                style={{ color: '#2D7B4A' }}
                aria-hidden="true"
              />

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="#D4AF37" stroke="#D4AF37" />
                ))}
              </div>

              <p
                className="text-base text-[#4A4A4A] mb-6 flex-1"
                style={{ lineHeight: 1.7 }}
              >
                “{t.text}”
              </p>

              <div className="pt-4 border-t border-[#E8E8E6]">
                <p
                  className="text-sm font-bold text-[#2C2C2A]"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  {t.name}
                </p>
                <p className="text-xs text-[#757571] mt-0.5">
                  {t.location} · {t.product}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
