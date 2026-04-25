import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const messages = [
  '🌿 Envío GRATIS en pedidos +40€ · Entrega en 24-48h',
  '✨ Productos certificados ecológicos · 100% naturales de Canarias',
  '🎁 -15% en tu primera compra con código BIENVENIDA15',
]

export default function TopBar() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(i => (i + 1) % messages.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  if (!visible) return null

  return (
    <div
      className="relative flex items-center justify-center px-4 py-2.5 text-sm text-white"
      style={{ backgroundColor: '#2D7B4A', fontFamily: "'Montserrat', system-ui, sans-serif" }}
    >
      <button
        onClick={() => setCurrent(i => (i - 1 + messages.length) % messages.length)}
        className="hidden sm:flex absolute left-4 p-0.5 rounded hover:bg-white/20 transition-colors"
        aria-label="Mensaje anterior"
      >
        <ChevronLeft size={16} />
      </button>

      <p className="text-center font-medium text-xs sm:text-sm px-8 sm:px-0 transition-all duration-300">
        {messages[current]}
      </p>

      <div className="flex items-center gap-3 absolute right-4">
        <div className="hidden sm:flex gap-1">
          {messages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === current ? 'bg-white' : 'bg-white/40'
              }`}
              aria-label={`Mensaje ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrent(i => (i + 1) % messages.length)}
          className="hidden sm:flex p-0.5 rounded hover:bg-white/20 transition-colors"
          aria-label="Mensaje siguiente"
        >
          <ChevronRight size={16} />
        </button>

        <button
          onClick={() => setVisible(false)}
          className="p-0.5 rounded hover:bg-white/20 transition-colors"
          aria-label="Cerrar banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
