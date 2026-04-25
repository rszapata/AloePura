import { Leaf, MapPin, ShieldCheck, RotateCcw } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    title: 'Certificado Orgánico',
    description:
      'Todos nuestros productos están certificados por CAAE (Comité Andaluz de Agricultura Ecológica), garantizando ingredientes 100% libres de pesticidas.',
    color: '#2D7B4A',
    bg: '#E8F5E9',
  },
  {
    icon: MapPin,
    title: 'Cultivo Local',
    description:
      'Nuestro aloe vera se cultiva en nuestras propias plantaciones en Fuerteventura, con el clima y el suelo volcánico ideales para la planta.',
    color: '#26A69A',
    bg: '#E0F2F1',
  },
  {
    icon: ShieldCheck,
    title: 'Dermatólogo Testado',
    description:
      'Cada fórmula es testada clínicamente por dermatólogos y apta para pieles sensibles, incluyendo pruebas de alergias y tolerancia cutánea.',
    color: '#D4AF37',
    bg: '#FFF8E1',
  },
  {
    icon: RotateCcw,
    title: 'Garantía 30 Días',
    description:
      'Si no estás completamente satisfecho/a con tu compra, te devolvemos el dinero sin preguntas. Tu satisfacción es nuestra prioridad.',
    color: '#E88B7B',
    bg: '#FBE9E7',
  },
]

export default function FeaturesSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#F5F5F3' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p
            className="text-sm font-semibold uppercase tracking-wider mb-3"
            style={{ color: '#26A69A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Por qué elegirnos
          </p>
          <h2
            className="text-[#2C2C2A]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
            }}
          >
            Nuestra Diferencia
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description, color, bg }) => (
            <div
              key={title}
              className="flex flex-col p-8 rounded-2xl bg-white border border-[#E8E8E6] shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Icon + title side by side */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                  style={{ backgroundColor: bg }}
                >
                  <Icon size={24} style={{ color }} />
                </div>
                <h3
                  className="text-base font-bold text-[#2C2C2A] leading-snug"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {title}
                </h3>
              </div>
              {/* Description below */}
              <p className="text-sm text-[#757571] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
