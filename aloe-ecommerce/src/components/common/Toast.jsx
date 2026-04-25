import { useEffect } from 'react'
import { Check, X } from 'lucide-react'

export default function Toast({ message, visible, onClose, duration = 2500 }) {
  useEffect(() => {
    if (!visible) return
    const id = setTimeout(onClose, duration)
    return () => clearTimeout(id)
  }, [visible, duration, onClose])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl bg-white border border-[#E8E8E6] animate-[fadeIn_0.2s_ease-out]"
      role="status"
      aria-live="polite"
    >
      <span className="flex items-center justify-center w-7 h-7 rounded-full" style={{ backgroundColor: '#43A047' }}>
        <Check size={16} className="text-white" strokeWidth={3} />
      </span>
      <p
        className="text-sm font-semibold text-[#2C2C2A]"
        style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
      >
        {message}
      </p>
      <button
        onClick={onClose}
        className="ml-2 p-1 rounded hover:bg-[#F5F5F3] text-[#757571]"
        aria-label="Cerrar notificación"
      >
        <X size={14} />
      </button>
    </div>
  )
}
