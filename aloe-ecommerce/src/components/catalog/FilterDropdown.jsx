import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

/**
 * Small button-triggered dropdown used for catalog filters.
 * options: [{ id, label }]
 */
export default function FilterDropdown({ icon: Icon, label, value, options, onChange, active }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const selected = options.find(o => o.id === value)

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) {
      document.addEventListener('mousedown', onDocClick)
      document.addEventListener('keydown', onKey)
      return () => {
        document.removeEventListener('mousedown', onDocClick)
        document.removeEventListener('keydown', onKey)
      }
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-2 bg-white border rounded-xl px-3 py-2 text-sm transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D7B4A]"
        style={{
          borderColor: active ? '#2D7B4A' : '#E8E8E6',
          color: active ? '#2D7B4A' : '#2C2C2A',
          fontFamily: "'Montserrat', system-ui, sans-serif",
          fontWeight: active ? 600 : 500,
        }}
      >
        {Icon && <Icon size={15} style={{ color: active ? '#2D7B4A' : '#757571' }} />}
        <span className="text-[#757571] hidden sm:inline">{label}:</span>
        <span className="truncate max-w-[140px]">{selected?.label ?? label}</span>
        <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-30 mt-2 min-w-[200px] bg-white border border-[#E8E8E6] rounded-xl shadow-lg py-1 max-h-72 overflow-auto"
        >
          {options.map(opt => {
            const isSelected = opt.id === value
            return (
              <li key={opt.id} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => { onChange(opt.id); setOpen(false) }}
                  className="w-full flex items-center justify-between gap-3 px-4 py-2 text-sm text-left hover:bg-[#F0FBF4] cursor-pointer transition-colors"
                  style={{
                    color: isSelected ? '#2D7B4A' : '#2C2C2A',
                    fontWeight: isSelected ? 600 : 400,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check size={14} style={{ color: '#2D7B4A' }} />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
