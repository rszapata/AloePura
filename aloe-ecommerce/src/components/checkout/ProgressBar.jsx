import { Check } from 'lucide-react'

const STEPS = [
  { n: 1, label: 'Contacto' },
  { n: 2, label: 'Envío' },
  { n: 3, label: 'Pago' },
]

export default function ProgressBar({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map(({ n, label }, i) => {
        const done    = n < current
        const active  = n === current
        const pending = n > current

        return (
          <div key={n} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold transition-all"
                style={{
                  fontFamily: "'Montserrat', system-ui, sans-serif",
                  backgroundColor: done ? '#2D7B4A' : active ? '#2D7B4A' : '#E8E8E6',
                  color: done || active ? '#fff' : '#9E9E9A',
                  boxShadow: active ? '0 0 0 4px #E8F5E9' : 'none',
                }}
              >
                {done ? <Check size={16} strokeWidth={2.5} /> : n}
              </div>
              <span
                className="text-xs font-semibold hidden sm:block"
                style={{
                  fontFamily: "'Montserrat', system-ui, sans-serif",
                  color: active ? '#2D7B4A' : done ? '#2D7B4A' : '#9E9E9A',
                }}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                className="mx-3 sm:mx-4 transition-all"
                style={{
                  height: 2,
                  width: 56,
                  borderRadius: 1,
                  backgroundColor: done ? '#2D7B4A' : '#E8E8E6',
                  marginBottom: '20px',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
