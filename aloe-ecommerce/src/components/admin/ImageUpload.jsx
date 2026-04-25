import { useRef, useState, useCallback } from 'react'
import { UploadCloud, X, AlertCircle, ImagePlus } from 'lucide-react'
import { uploadImage, destroyImageByUrl } from '../../lib/cloudinary'

/**
 * Componente base de subida. Usado por ImageUpload (single) y GalleryUpload (multi).
 * Renderiza una drop-zone que abre el selector de archivos o acepta drag&drop.
 */
function DropZone({ onPick, disabled, multi = false, children }) {
  const inputRef = useRef(null)
  const [hover, setHover] = useState(false)

  function handleFiles(fileList) {
    const files = Array.from(fileList || [])
    if (!files.length) return
    onPick(multi ? files : [files[0]])
  }

  return (
    <div
      onClick={() => !disabled && inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); if (!disabled) setHover(true) }}
      onDragLeave={() => setHover(false)}
      onDrop={e => {
        e.preventDefault(); setHover(false)
        if (!disabled) handleFiles(e.dataTransfer.files)
      }}
      className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all"
      style={{
        borderColor: hover ? '#2D7B4A' : '#D8D8D4',
        backgroundColor: hover ? '#F0FBF4' : '#FAFAF8',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple={multi}
        onChange={e => handleFiles(e.target.files)}
        className="hidden"
      />
      {children}
    </div>
  )
}

function ProgressBar({ pct }) {
  return (
    <div className="w-full h-1.5 rounded-full bg-[#E8E8E6] overflow-hidden">
      <div
        className="h-full transition-all"
        style={{ width: `${pct}%`, backgroundColor: '#2D7B4A' }}
      />
    </div>
  )
}

function ErrorNote({ message }) {
  return (
    <div className="flex items-start gap-2 p-2 rounded-lg bg-[#FDECEA] border border-[#E53935]/30 text-xs text-[#B71C1C]">
      <AlertCircle size={14} className="shrink-0 mt-0.5" /><span>{message}</span>
    </div>
  )
}

/* =========================================================
   ImageUpload — single image (ej. imagen_principal)
   ========================================================= */
export default function ImageUpload({ value, onChange, folder, disabled }) {
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState(null)

  const handleFiles = useCallback(async files => {
    const file = files[0]
    setError(null)
    setProgress(0)
    try {
      const prev = value
      const result = await uploadImage(file, { folder, onProgress: setProgress })
      onChange(result.url)
      // Borrado diferido de la imagen anterior si era nuestra
      if (prev) destroyImageByUrl(prev)
    } catch (err) {
      setError(err.message)
    } finally {
      setProgress(null)
    }
  }, [folder, value, onChange])

  async function handleRemove(e) {
    e.stopPropagation()
    const prev = value
    onChange('')
    if (prev) destroyImageByUrl(prev)
  }

  if (value) {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative group rounded-xl border border-[#E8E8E6] overflow-hidden bg-[#FAFAF8]">
          <img src={value} alt="" className="w-full h-48 object-contain" />
          {!disabled && (
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Quitar imagen"
              className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-md text-[#E53935] hover:bg-[#FEEBEE] cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>
        {error && <ErrorNote message={error} />}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <DropZone onPick={handleFiles} disabled={disabled || progress !== null}>
        {progress !== null ? (
          <div className="flex flex-col gap-2 items-center">
            <UploadCloud size={28} style={{ color: '#2D7B4A' }} className="animate-pulse" />
            <p className="text-sm font-semibold text-[#2C2C2A]">Subiendo… {progress}%</p>
            <div className="w-48"><ProgressBar pct={progress} /></div>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5 items-center">
            <ImagePlus size={28} style={{ color: '#2D7B4A' }} />
            <p className="text-sm font-semibold text-[#2C2C2A]">
              Haz clic o arrastra una imagen
            </p>
            <p className="text-xs text-[#9E9E9A]">JPG, PNG, WebP o AVIF · hasta 8 MB</p>
          </div>
        )}
      </DropZone>
      {error && <ErrorNote message={error} />}
    </div>
  )
}

/* =========================================================
   GalleryUpload — multi imagen (galería)
   ========================================================= */
export function GalleryUpload({ value = [], onChange, folder, disabled, max = 6 }) {
  const [uploading, setUploading] = useState([]) // [{id, pct}]
  const [error, setError] = useState(null)

  const handleFiles = useCallback(async files => {
    setError(null)
    const available = Math.max(0, max - value.length)
    const toUpload = files.slice(0, available)
    if (files.length > available) {
      setError(`Máximo ${max} imágenes en la galería`)
    }

    // Sube en paralelo con tracking individual
    const jobs = toUpload.map(file => {
      const id = Math.random().toString(36).slice(2)
      setUploading(u => [...u, { id, pct: 0 }])
      return uploadImage(file, {
        folder,
        onProgress: pct => setUploading(u => u.map(j => j.id === id ? { ...j, pct } : j)),
      })
        .then(result => ({ id, ok: true, url: result.url }))
        .catch(err => ({ id, ok: false, error: err.message }))
    })

    const results = await Promise.all(jobs)
    const newUrls = results.filter(r => r.ok).map(r => r.url)
    const failed = results.filter(r => !r.ok)
    if (failed.length) setError(failed[0].error)
    if (newUrls.length) onChange([...value, ...newUrls])
    setUploading([])
  }, [folder, value, onChange, max])

  async function removeAt(idx) {
    const url = value[idx]
    onChange(value.filter((_, i) => i !== idx))
    if (url) destroyImageByUrl(url)
  }

  return (
    <div className="flex flex-col gap-3">
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {value.map((url, i) => (
            <div
              key={url + i}
              className="relative rounded-lg border border-[#E8E8E6] overflow-hidden bg-[#FAFAF8] group"
            >
              <img src={url} alt="" className="w-full h-24 object-cover" />
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  aria-label={`Quitar imagen ${i + 1}`}
                  className="absolute top-1 right-1 p-1 rounded-full bg-white shadow text-[#E53935] hover:bg-[#FEEBEE] cursor-pointer"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {value.length < max && (
        <DropZone onPick={handleFiles} disabled={disabled || uploading.length > 0} multi>
          {uploading.length > 0 ? (
            <div className="flex flex-col gap-2 items-center">
              <UploadCloud size={22} style={{ color: '#2D7B4A' }} className="animate-pulse" />
              <p className="text-xs font-semibold text-[#2C2C2A]">
                Subiendo {uploading.length} {uploading.length === 1 ? 'imagen' : 'imágenes'}…
              </p>
              <div className="w-48">
                <ProgressBar
                  pct={Math.round(uploading.reduce((a, j) => a + j.pct, 0) / uploading.length)}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1 items-center">
              <ImagePlus size={22} style={{ color: '#2D7B4A' }} />
              <p className="text-xs font-semibold text-[#2C2C2A]">
                Añadir imágenes ({value.length}/{max})
              </p>
              <p className="text-[10px] text-[#9E9E9A]">Selecciona varias a la vez si quieres</p>
            </div>
          )}
        </DropZone>
      )}

      {error && <ErrorNote message={error} />}
    </div>
  )
}
