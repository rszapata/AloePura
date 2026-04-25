import { Check } from 'lucide-react'

export default function BenefitsList({ benefits }) {
  if (!benefits?.length) return null

  return (
    <div className="p-5 rounded-2xl bg-[#E8F5E9] border border-[#66BB6A]/30">
      <h3
        className="text-sm font-bold uppercase tracking-wider mb-3"
        style={{ color: '#2D7B4A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
      >
        Beneficios clave
      </h3>
      <ul className="flex flex-col gap-2.5">
        {benefits.map(benefit => (
          <li key={benefit} className="flex items-start gap-2.5 text-sm text-[#2C2C2A]" style={{ lineHeight: 1.5 }}>
            <span className="flex items-center justify-center w-5 h-5 rounded-full shrink-0 mt-0.5" style={{ backgroundColor: '#2D7B4A' }}>
              <Check size={12} className="text-white" strokeWidth={3} />
            </span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
