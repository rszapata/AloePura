import { X } from 'lucide-react'

const CATEGORIES = [
  { slug: 'all', label: 'Todas' },
  { slug: 'geles', label: 'Geles' },
  { slug: 'cremas', label: 'Cremas' },
  { slug: 'serums', label: 'Sérums' },
  { slug: 'mascarillas', label: 'Mascarillas' },
  { slug: 'cuerpo', label: 'Cuerpo' },
  { slug: 'labios', label: 'Labios' },
]

const PRICE_BUCKETS = [
  { id: 'any', label: 'Cualquier precio', min: 0, max: Infinity },
  { id: 'under10', label: 'Menos de 10€', min: 0, max: 10 },
  { id: '10to20', label: 'De 10€ a 20€', min: 10, max: 20 },
  { id: 'over20', label: 'Más de 20€', min: 20, max: Infinity },
]

export { CATEGORIES, PRICE_BUCKETS }

export default function FiltersPanel({
  category,
  onCategory,
  priceBucket,
  onPriceBucket,
  onlyInStock,
  onToggleStock,
  onClear,
}) {
  const hasFilters = category !== 'all' || priceBucket !== 'any' || onlyInStock

  return (
    <aside className="bg-white rounded-2xl border border-[#E8E8E6] p-5 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3
          className="text-sm font-bold uppercase tracking-wider text-[#2C2C2A]"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          Filtros
        </h3>
        {hasFilters && (
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1 text-xs text-[#757571] hover:text-[#2D7B4A]"
          >
            <X size={12} /> Limpiar
          </button>
        )}
      </div>

      <div>
        <p
          className="text-xs font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wider"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          Categoría
        </p>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map(c => (
            <label
              key={c.slug}
              className={`flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer text-sm transition-colors ${
                category === c.slug ? 'bg-[#E8F5E9] text-[#2D7B4A] font-semibold' : 'text-[#4A4A4A] hover:bg-[#FAFAF8]'
              }`}
            >
              <input
                type="radio"
                name="category"
                value={c.slug}
                checked={category === c.slug}
                onChange={() => onCategory(c.slug)}
                className="sr-only"
              />
              <span
                className="w-3.5 h-3.5 rounded-full border-2 flex-shrink-0"
                style={{
                  borderColor: category === c.slug ? '#2D7B4A' : '#D8D8D4',
                  backgroundColor: category === c.slug ? '#2D7B4A' : 'transparent',
                  boxShadow: category === c.slug ? 'inset 0 0 0 2px white' : 'none',
                }}
                aria-hidden="true"
              />
              {c.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p
          className="text-xs font-semibold text-[#4A4A4A] mb-2 uppercase tracking-wider"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          Precio
        </p>
        <div className="flex flex-col gap-1">
          {PRICE_BUCKETS.map(b => (
            <label
              key={b.id}
              className={`flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer text-sm transition-colors ${
                priceBucket === b.id ? 'bg-[#E8F5E9] text-[#2D7B4A] font-semibold' : 'text-[#4A4A4A] hover:bg-[#FAFAF8]'
              }`}
            >
              <input
                type="radio"
                name="price"
                value={b.id}
                checked={priceBucket === b.id}
                onChange={() => onPriceBucket(b.id)}
                className="sr-only"
              />
              <span
                className="w-3.5 h-3.5 rounded-full border-2 flex-shrink-0"
                style={{
                  borderColor: priceBucket === b.id ? '#2D7B4A' : '#D8D8D4',
                  backgroundColor: priceBucket === b.id ? '#2D7B4A' : 'transparent',
                  boxShadow: priceBucket === b.id ? 'inset 0 0 0 2px white' : 'none',
                }}
                aria-hidden="true"
              />
              {b.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 cursor-pointer text-sm text-[#4A4A4A]">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={onToggleStock}
            className="w-4 h-4 accent-[#2D7B4A]"
          />
          Solo en stock
        </label>
      </div>
    </aside>
  )
}
