import { useEffect, useState, useCallback } from 'react'
import { Plus, Search, Edit2, Trash2, AlertCircle, Package, X, Check } from 'lucide-react'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import ImageUpload, { GalleryUpload } from '../../components/admin/ImageUpload'
import formatPrice from '../../utils/formatPrice'
import { adminApi } from '../../lib/api'

const CATEGORIES = ['corporal', 'facial', 'capilar', 'bebidas', 'pack']

/** Slug básico a partir del nombre. */
function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

const EMPTY_PRODUCT = {
  nombre: '', slug: '',
  descripcion: '', descripcion_larga: '',
  precio: '', precio_original: '', descuento: '',
  imagen_principal: '',
  imagenes: [],
  categoria: 'corporal',
  stock: 0, sku: '',
  especificaciones: {},
  ingredientes: [],
  beneficios: [],
  vegan: true, organico: false, dermatology_tested: false,
  featured: false, bestseller: false, activo: true,
}

/* ---------- Modal crear/editar ---------- */
function ProductModal({ producto, onClose, onSaved }) {
  const editing = !!producto
  const [form, setForm] = useState(() =>
    editing
      ? {
          ...EMPTY_PRODUCT,
          ...producto,
          imagenes: producto.imagenes || [],
          ingredientes: producto.ingredientes || [],
          beneficios: producto.beneficios || [],
          especificaciones: producto.especificaciones || {},
          precio_original: producto.precio_original ?? '',
          descuento: producto.descuento ?? '',
        }
      : EMPTY_PRODUCT
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function update(patch) {
    setForm(f => ({ ...f, ...patch }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    // Serializa campos antes de enviar
    const payload = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock) || 0,
      precio_original: form.precio_original === '' ? null : Number(form.precio_original),
      descuento: form.descuento === '' ? null : Number(form.descuento),
      ingredientes: typeof form.ingredientes === 'string'
        ? form.ingredientes.split(',').map(s => s.trim()).filter(Boolean)
        : form.ingredientes,
      beneficios: typeof form.beneficios === 'string'
        ? form.beneficios.split(',').map(s => s.trim()).filter(Boolean)
        : form.beneficios,
      imagenes: form.imagenes,
    }
    if (!payload.imagen_principal) delete payload.imagen_principal
    if (!payload.sku) payload.sku = null

    try {
      if (editing) {
        await adminApi.updateProducto(producto.id, payload)
      } else {
        await adminApi.createProducto(payload)
      }
      onSaved()
    } catch (err) {
      setError(err.message || 'No se pudo guardar')
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-2xl sm:rounded-2xl max-h-[95vh] overflow-y-auto shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-[#E8E8E6] px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#2C2C2A]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {editing ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button type="button" onClick={onClose} className="text-[#757571] hover:text-[#2C2C2A] cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-[#FDECEA] border border-[#E53935]/30 text-sm text-[#B71C1C]">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <Input
            id="nombre"
            label="Nombre *"
            value={form.nombre}
            onChange={e => {
              const nombre = e.target.value
              update({ nombre, slug: editing ? form.slug : slugify(nombre) })
            }}
            required
          />
          <Input
            id="slug"
            label="Slug *"
            value={form.slug}
            onChange={e => update({ slug: e.target.value })}
            required
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="descripcion" className="text-sm font-medium text-[#4A4A4A]">
              Descripción corta
            </label>
            <textarea
              id="descripcion"
              rows={2}
              maxLength={500}
              value={form.descripcion}
              onChange={e => update({ descripcion: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-[#D8D8D4] text-[#4A4A4A] text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="descripcion_larga" className="text-sm font-medium text-[#4A4A4A]">
              Descripción larga
            </label>
            <textarea
              id="descripcion_larga"
              rows={5}
              value={form.descripcion_larga}
              onChange={e => update({ descripcion_larga: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-[#D8D8D4] text-[#4A4A4A] text-sm"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Input
              id="precio"
              label="Precio (€) *"
              type="number"
              step="0.01"
              min="0"
              value={form.precio}
              onChange={e => update({ precio: e.target.value })}
              required
            />
            <Input
              id="precio_original"
              label="Precio original (€)"
              type="number"
              step="0.01"
              min="0"
              value={form.precio_original}
              onChange={e => update({ precio_original: e.target.value })}
            />
            <Input
              id="descuento"
              label="Descuento (%)"
              type="number"
              min="0"
              max="99"
              value={form.descuento}
              onChange={e => update({ descuento: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="categoria" className="text-sm font-medium text-[#4A4A4A]">Categoría *</label>
              <select
                id="categoria"
                value={form.categoria}
                onChange={e => update({ categoria: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-[#D8D8D4] text-sm bg-white"
                required
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <Input
              id="stock"
              label="Stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={e => update({ stock: e.target.value })}
            />
            <Input
              id="sku"
              label="SKU"
              value={form.sku || ''}
              onChange={e => update({ sku: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#4A4A4A]">Imagen principal</label>
            <ImageUpload
              value={form.imagen_principal}
              onChange={url => update({ imagen_principal: url })}
              folder="aloepura/products"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#4A4A4A]">
              Galería <span className="text-[#9E9E9A] font-normal">· opcional, hasta 6</span>
            </label>
            <GalleryUpload
              value={Array.isArray(form.imagenes) ? form.imagenes : []}
              onChange={arr => update({ imagenes: arr })}
              folder="aloepura/products"
              max={6}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="ingredientes" className="text-sm font-medium text-[#4A4A4A]">
              Ingredientes (separados por coma)
            </label>
            <input
              id="ingredientes"
              type="text"
              value={Array.isArray(form.ingredientes) ? form.ingredientes.join(', ') : form.ingredientes}
              onChange={e => update({ ingredientes: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-[#D8D8D4] text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="beneficios" className="text-sm font-medium text-[#4A4A4A]">
              Beneficios (separados por coma)
            </label>
            <input
              id="beneficios"
              type="text"
              value={Array.isArray(form.beneficios) ? form.beneficios.join(', ') : form.beneficios}
              onChange={e => update({ beneficios: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-[#D8D8D4] text-sm"
            />
          </div>

          <fieldset className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <legend className="text-sm font-medium text-[#4A4A4A] mb-2 col-span-full">Flags</legend>
            {[
              ['vegan', 'Vegano'],
              ['organico', 'Orgánico'],
              ['dermatology_tested', 'Dermotestado'],
              ['featured', 'Destacado'],
              ['bestseller', 'Bestseller'],
              ['activo', 'Activo'],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm text-[#4A4A4A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!form[key]}
                  onChange={e => update({ [key]: e.target.checked })}
                />
                {label}
              </label>
            ))}
          </fieldset>

          <div className="flex gap-3 pt-4 border-t border-[#F5F5F3]">
            <Button type="submit" disabled={saving} className="flex items-center gap-2">
              <Check size={16} /> {saving ? 'Guardando…' : editing ? 'Actualizar' : 'Crear'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ---------- Page ---------- */
export default function AdminProductsPage() {
  const [data, setData] = useState(null)
  const [search, setSearch] = useState('')
  const [categoria, setCategoria] = useState('all')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null) // null | 'new' | productObject

  const load = useCallback(() => {
    setLoading(true)
    adminApi.productos({ page, search, categoria })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [page, search, categoria])

  useEffect(() => { load() }, [load])

  async function handleDelete(p) {
    if (!confirm(`¿Desactivar el producto "${p.nombre}"? Seguirá en los pedidos existentes.`)) return
    try {
      await adminApi.deleteProducto(p.id)
      load()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <h1
          className="text-2xl sm:text-3xl font-bold text-[#2C2C2A]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Productos
        </h1>
        <Button onClick={() => setEditing('new')} className="flex items-center gap-2">
          <Plus size={16} /> Nuevo producto
        </Button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl border border-[#E8E8E6] p-4 mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9E9A]" />
          <input
            type="search"
            placeholder="Buscar por nombre, slug o SKU…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#D8D8D4] text-sm"
          />
        </div>
        <select
          value={categoria}
          onChange={e => { setCategoria(e.target.value); setPage(1) }}
          className="px-4 py-2.5 rounded-lg border border-[#D8D8D4] text-sm bg-white"
        >
          <option value="all">Todas las categorías</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {loading && <p className="text-sm text-[#757571]">Cargando…</p>}

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-[#FDECEA] border border-[#E53935]/30 text-sm text-[#B71C1C] mb-4">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {data && data.productos.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#E8E8E6]">
          <Package size={36} className="mx-auto mb-3 text-[#9E9E9A]" />
          <p className="text-[#757571]">No hay productos con estos filtros.</p>
        </div>
      )}

      {data && data.productos.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[#9E9E9A] uppercase tracking-wide border-b border-[#F5F5F3] bg-[#FAFAF8]">
                  <th className="py-3 px-4 font-semibold">Producto</th>
                  <th className="py-3 px-4 font-semibold">Categoría</th>
                  <th className="py-3 px-4 font-semibold">Precio</th>
                  <th className="py-3 px-4 font-semibold">Stock</th>
                  <th className="py-3 px-4 font-semibold">Estado</th>
                  <th className="py-3 px-4 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.productos.map(p => (
                  <tr key={p.id} className="border-b border-[#F5F5F3] last:border-0 hover:bg-[#FAFAF8]">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3 min-w-0">
                        {p.imagen_principal ? (
                          <img src={p.imagen_principal} alt="" className="w-10 h-10 rounded-lg object-cover border border-[#E8E8E6]" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-[#F5F5F3] flex items-center justify-center shrink-0">
                            <Package size={16} className="text-[#9E9E9A]" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-[#2C2C2A] truncate">{p.nombre}</p>
                          <p className="text-xs text-[#9E9E9A] truncate">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#4A4A4A]">{p.categoria}</td>
                    <td className="py-3 px-4 font-semibold">{formatPrice(p.precio)}</td>
                    <td className="py-3 px-4">
                      <span
                        className="text-xs font-semibold"
                        style={{ color: p.stock === 0 ? '#E53935' : p.stock <= 5 ? '#B26A00' : '#2D7B4A' }}
                      >
                        {p.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: p.activo ? '#E8F5E9' : '#F5F5F3',
                          color: p.activo ? '#2D7B4A' : '#9E9E9A',
                        }}
                      >
                        {p.activo ? 'Activo' : 'Oculto'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditing(p)}
                          className="p-2 rounded-lg hover:bg-[#F5F5F3] cursor-pointer text-[#4A4A4A]"
                          aria-label="Editar"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p)}
                          className="p-2 rounded-lg hover:bg-[#FEEBEE] cursor-pointer text-[#E53935]"
                          aria-label="Desactivar"
                          disabled={!p.activo}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data.totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-[#F5F5F3] text-sm">
              <span className="text-[#757571]">
                Página {data.page} de {data.totalPages} · {data.total} productos
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline" size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline" size="sm"
                  disabled={page >= data.totalPages}
                  onClick={() => setPage(p => p + 1)}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {editing && (
        <ProductModal
          producto={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); load() }}
        />
      )}
    </div>
  )
}
