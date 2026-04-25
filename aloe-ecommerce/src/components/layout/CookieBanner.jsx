import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Cookie } from 'lucide-react'
import Button from '../common/Button'
import Modal from '../common/Modal'

const STORAGE_KEY = 'aloe_cookie_consent'

const DEFAULT_PREFS = {
  essential: true,
  analytics: false,
  marketing: false,
}

const LEGAL_LINKS = [
  { to: '/cookies',    label: 'Política de cookies' },
  { to: '/privacidad', label: 'Política de privacidad' },
  { to: '/aviso-legal', label: 'Aviso legal' },
]

function savePrefs(prefs) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...prefs, date: new Date().toISOString() })
  )
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [prefs, setPrefs] = useState(DEFAULT_PREFS)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  // Lock body scroll while the banner is visible (modal behaviour)
  useEffect(() => {
    if (!visible) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [visible])

  function acceptAll() {
    savePrefs({ essential: true, analytics: true, marketing: true })
    setVisible(false)
  }
  function rejectAll() {
    savePrefs({ essential: true, analytics: false, marketing: false })
    setVisible(false)
  }
  function saveCustom() {
    savePrefs(prefs)
    setSettingsOpen(false)
    setVisible(false)
  }
  function togglePref(key) {
    setPrefs(p => ({ ...p, [key]: !p[key] }))
  }

  if (!visible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(44, 44, 42, 0.55)', backdropFilter: 'blur(2px)' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-banner-title"
      >
        <div
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E8E8E6] overflow-hidden"
          style={{ animation: 'fadeInUp .35s ease-out both' }}
        >
          <div className="p-6 sm:p-7">
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{ backgroundColor: '#E8F5E9' }}
              >
                <Cookie size={20} style={{ color: '#2D7B4A' }} />
              </span>
              <h3
                id="cookie-banner-title"
                className="font-bold text-[#2C2C2A] text-lg"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Política de Cookies
              </h3>
            </div>
            <p className="text-sm text-[#4A4A4A] mb-5" style={{ lineHeight: 1.6 }}>
              Usamos cookies propias y de terceros para mejorar tu experiencia y analizar el uso
              de nuestra web. Conforme al RGPD puedes aceptar, rechazar o configurar las cookies
              que utilizamos.
            </p>
            <div className="flex flex-col gap-2">
              <Button onClick={acceptAll} fullWidth>Aceptar todas</Button>
              <Button onClick={() => setSettingsOpen(true)} variant="outline" fullWidth>
                Personalizar
              </Button>
              <Button onClick={rejectAll} variant="ghost" fullWidth>
                Rechazar
              </Button>
            </div>
          </div>

          {/* Legal links footer */}
          <div
            className="px-6 sm:px-7 py-3.5 border-t border-[#E8E8E6] flex flex-wrap justify-center gap-x-4 gap-y-1.5"
            style={{ backgroundColor: '#FAFAF8' }}
          >
            {LEGAL_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setVisible(false)}
                className="text-xs text-[#757571] hover:text-[#2D7B4A] hover:underline underline-offset-2 transition-colors"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="Preferencias de cookies"
      >
        <div className="flex flex-col gap-4">
          <CookieToggle
            label="Esenciales"
            description="Necesarias para el funcionamiento básico del sitio (carrito, sesión). No se pueden desactivar."
            checked={true}
            disabled
          />
          <CookieToggle
            label="Analíticas"
            description="Nos ayudan a entender cómo se usa la web para mejorarla (Google Analytics)."
            checked={prefs.analytics}
            onChange={() => togglePref('analytics')}
          />
          <CookieToggle
            label="Marketing"
            description="Permiten mostrar anuncios personalizados en otras webs y redes sociales."
            checked={prefs.marketing}
            onChange={() => togglePref('marketing')}
          />

          <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-[#E8E8E6] mt-2">
            <Button onClick={rejectAll} variant="ghost" size="sm" fullWidth>
              Rechazar todas
            </Button>
            <Button onClick={saveCustom} variant="outline" size="sm" fullWidth>
              Guardar selección
            </Button>
            <Button onClick={acceptAll} size="sm" fullWidth>
              Aceptar todas
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

function CookieToggle({ label, description, checked, onChange, disabled = false }) {
  return (
    <label
      className={`flex items-start justify-between gap-4 p-3 rounded-xl border border-[#E8E8E6] ${
        disabled ? 'bg-[#F5F5F3]' : 'cursor-pointer hover:bg-[#FAFAF8]'
      }`}
    >
      <div className="flex-1">
        <p
          className="text-sm font-semibold text-[#2C2C2A]"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          {label}
        </p>
        <p className="text-xs text-[#757571] mt-1" style={{ lineHeight: 1.5 }}>
          {description}
        </p>
      </div>
      <span
        className="relative inline-flex shrink-0 w-10 h-6 rounded-full transition-colors mt-0.5"
        style={{
          backgroundColor: checked ? '#2D7B4A' : '#D8D8D4',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        <span
          className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
          style={{ left: checked ? 'calc(100% - 1.375rem)' : '0.125rem' }}
        />
      </span>
    </label>
  )
}
