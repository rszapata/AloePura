import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'

/**
 * Layout envolvente para /login y /registro: tarjeta centrada con branding mínimo,
 * sin navbar/footer para no distraer.
 */
export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#FAFAF8' }}
    >
      <header className="py-6">
        <div className="container flex items-center justify-center">
          <Link to="/" className="flex items-center gap-2" aria-label="AloePura - Inicio">
            <span
              className="flex items-center justify-center w-9 h-9 rounded-full"
              style={{ backgroundColor: '#2D7B4A' }}
            >
              <Leaf size={20} className="text-white" />
            </span>
            <span
              className="text-xl font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#2D7B4A' }}
            >
              AloePura
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-4 pb-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-[#E8E8E6] shadow-sm p-7 sm:p-8">
            <h1
              className="text-2xl sm:text-3xl font-bold text-[#2C2C2A] mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-[#757571] mb-6" style={{ lineHeight: 1.6 }}>
                {subtitle}
              </p>
            )}
            {children}
          </div>
          {footer && (
            <p className="text-center text-sm text-[#757571] mt-5">
              {footer}
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
