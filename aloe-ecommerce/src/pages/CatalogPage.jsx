import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tag, Euro, PackageCheck, X } from 'lucide-react'
import { CATEGORIES, PRICE_BUCKETS } from '../components/catalog/FiltersPanel'
import FilterDropdown from '../components/catalog/FilterDropdown'
import SortDropdown from '../components/catalog/SortDropdown'
import ProductList from '../components/catalog/ProductList'
import { useProducts } from '../hooks/useProducts'

const CATEGORY_OPTS = CATEGORIES.map(c => ({ id: c.slug, label: c.label }))
const PRICE_OPTS    = PRICE_BUCKETS.map(b => ({ id: b.id, label: b.label }))

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = CATEGORIES.some(c => c.slug === searchParams.get('categoria'))
    ? searchParams.get('categoria')
    : 'all'

  const [category, setCategory]       = useState(initialCategory)
  const [priceBucket, setPriceBucket] = useState('any')
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [sort, setSort]               = useState('featured')

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (category === 'all') params.delete('categoria')
    else params.set('categoria', category)
    setSearchParams(params, { replace: true })
  }, [category]) // eslint-disable-line react-hooks/exhaustive-deps

  // Categoría + orden + stock se hacen server-side.
  // El filtro de precio lo mantenemos client-side porque es local al fetch actual.
  const { productos, loading, error } = useProducts({
    categoria: category !== 'all' ? category : undefined,
    sort,
    onlyInStock: onlyInStock || undefined,
    limit: 50,
  })

  const filtered = useMemo(() => {
    const bucket = PRICE_BUCKETS.find(b => b.id === priceBucket)
    if (!bucket) return productos
    return productos.filter(p => p.price >= bucket.min && p.price <= bucket.max)
  }, [productos, priceBucket])

  const hasFilters = category !== 'all' || priceBucket !== 'any' || onlyInStock
  function clearFilters() {
    setCategory('all')
    setPriceBucket('any')
    setOnlyInStock(false)
  }

  return (
    <div className="section-padding" style={{ backgroundColor: '#FAFAF8' }}>
      <div className="container">
        <div className="mb-6">
          <h1
            className="text-[#2C2C2A] mb-2"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 700,
            }}
          >
            Nuestros Productos
          </h1>
          <p className="text-[#757571]">Descubre toda nuestra gama de cosméticos de aloe vera.</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E8E6] p-3 mb-6 flex flex-wrap items-center gap-2">
          <FilterDropdown
            icon={Tag}
            label="Categoría"
            value={category}
            options={CATEGORY_OPTS}
            onChange={setCategory}
            active={category !== 'all'}
          />
          <FilterDropdown
            icon={Euro}
            label="Precio"
            value={priceBucket}
            options={PRICE_OPTS}
            onChange={setPriceBucket}
            active={priceBucket !== 'any'}
          />

          <button
            type="button"
            onClick={() => setOnlyInStock(v => !v)}
            aria-pressed={onlyInStock}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D7B4A]"
            style={{
              borderColor: onlyInStock ? '#2D7B4A' : '#E8E8E6',
              backgroundColor: onlyInStock ? '#F0FBF4' : 'white',
              color: onlyInStock ? '#2D7B4A' : '#2C2C2A',
              fontFamily: "'Montserrat', system-ui, sans-serif",
              fontWeight: onlyInStock ? 600 : 500,
            }}
          >
            <PackageCheck size={15} style={{ color: onlyInStock ? '#2D7B4A' : '#757571' }} />
            Solo en stock
          </button>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-xs text-[#757571] hover:text-[#2D7B4A] ml-1 cursor-pointer transition-colors"
            >
              <X size={12} /> Limpiar
            </button>
          )}

          <div className="flex-1" />

          <span className="hidden sm:inline text-sm text-[#757571]">
            {loading ? 'Cargando…' : `${filtered.length} ${filtered.length === 1 ? 'producto' : 'productos'}`}
          </span>
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        {error && (
          <div className="p-4 mb-4 rounded-xl bg-[#FDECEA] border border-[#E53935] text-sm text-[#B71C1C]">
            No se pudieron cargar los productos. Inténtalo más tarde.
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white border border-[#E8E8E6] overflow-hidden animate-pulse">
                <div className="w-full h-52 bg-[#F0F0ED]" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-[#F0F0ED] rounded w-3/4" />
                  <div className="h-4 bg-[#F0F0ED] rounded w-full" />
                  <div className="h-10 bg-[#F0F0ED] rounded w-1/2 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProductList products={filtered} />
        )}
      </div>
    </div>
  )
}
