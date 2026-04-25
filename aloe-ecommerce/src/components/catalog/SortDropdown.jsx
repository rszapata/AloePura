import { ArrowDownWideNarrow } from 'lucide-react'

export const SORT_OPTIONS = [
  { id: 'featured', label: 'Destacados' },
  { id: 'price-asc', label: 'Precio: más barato' },
  { id: 'price-desc', label: 'Precio: más caro' },
  { id: 'rating', label: 'Mejor valorados' },
  { id: 'name', label: 'Nombre A-Z' },
]

export default function SortDropdown({ value, onChange }) {
  return (
    <label className="inline-flex items-center gap-2 bg-white border border-[#E8E8E6] rounded-xl px-3 py-2 text-sm">
      <ArrowDownWideNarrow size={16} style={{ color: '#2D7B4A' }} />
      <span className="text-[#757571] hidden sm:inline">Ordenar:</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="bg-transparent focus:outline-none text-[#2C2C2A] font-semibold pr-1"
        style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        aria-label="Ordenar productos"
      >
        {SORT_OPTIONS.map(o => (
          <option key={o.id} value={o.id}>{o.label}</option>
        ))}
      </select>
    </label>
  )
}
