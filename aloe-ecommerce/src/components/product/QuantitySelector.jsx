import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  function set(next) {
    const clamped = Math.max(min, Math.min(max, next))
    onChange(clamped)
  }

  return (
    <div className="inline-flex items-center rounded-xl border border-[#E8E8E6] bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => set(value - 1)}
        disabled={value <= min}
        className="w-11 h-11 flex items-center justify-center text-[#2D7B4A] hover:bg-[#E8F5E9] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Reducir cantidad"
      >
        <Minus size={16} />
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={e => set(Number(e.target.value) || min)}
        className="w-12 h-11 text-center font-semibold text-[#2C2C2A] focus:outline-none focus:ring-2 focus:ring-[#2D7B4A] focus:ring-inset [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        aria-label="Cantidad"
      />
      <button
        type="button"
        onClick={() => set(value + 1)}
        disabled={value >= max}
        className="w-11 h-11 flex items-center justify-center text-[#2D7B4A] hover:bg-[#E8F5E9] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Aumentar cantidad"
      >
        <Plus size={16} />
      </button>
    </div>
  )
}
