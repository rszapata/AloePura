import { Link } from 'react-router-dom'
import { Leaf, Mail, Phone, MapPin } from 'lucide-react'

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  )
}

function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

const columnHeaderClass = 'text-sm font-bold uppercase tracking-wider mb-3'
const columnHeaderStyle = {
  color: '#66BB6A',
  fontFamily: "'Montserrat', system-ui, sans-serif",
  lineHeight: 1.4,
}

const linkClass =
  'text-sm text-[#9E9E9A] hover:text-white transition-colors inline-block'
const linkStyle = { lineHeight: 1.6 }

const paymentMethods = ['Visa', 'Mastercard', 'PayPal', 'Bizum', 'Transferencia']

const productCategories = ['Geles', 'Cremas', 'Sérums', 'Mascarillas', 'Cuerpo', 'Labios']

const infoLinks = [
  { to: '/nosotros', label: 'Sobre nosotros' },
  { to: '/sostenibilidad', label: 'Sostenibilidad' },
  { to: '/blog', label: 'Blog' },
  { to: '/preguntas-frecuentes', label: 'FAQ' },
]

const legalLinks = [
  { to: '/privacidad', label: 'Privacidad' },
  { to: '/terminos', label: 'Términos' },
  { to: '/cookies', label: 'Cookies' },
  { to: '/aviso-legal', label: 'Aviso legal' },
]

export default function Footer() {
  return (
    <footer
      className="text-white mt-auto"
      style={{ backgroundColor: '#2C2C2A' }}
    >
      <div className="container footer-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <span
                className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
                style={{ backgroundColor: '#2D7B4A' }}
              >
                <Leaf size={20} className="text-white" />
              </span>
              <span
                className="text-xl font-bold"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: '#66BB6A',
                  lineHeight: 1.2,
                }}
              >
                AloePura
              </span>
            </Link>
            <p
              className="text-sm text-[#9E9E9A] mb-4 max-w-xs"
              style={{ lineHeight: 1.6 }}
            >
              Cosméticos naturales de aloe vera cultivado en las Islas Canarias.
              Certificados ecológicos y sostenibles.
            </p>
            <div className="flex gap-3 mt-auto">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-[#2D7B4A] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-[#2D7B4A] transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={16} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className={columnHeaderClass} style={columnHeaderStyle}>
              Productos
            </h4>
            <ul className="flex flex-col gap-1.5">
              {productCategories.map(cat => (
                <li key={cat} style={{ lineHeight: 1.4 }}>
                  <Link
                    to={`/productos?categoria=${cat.toLowerCase()}`}
                    className={linkClass}
                    style={linkStyle}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className={columnHeaderClass} style={columnHeaderStyle}>
              Información
            </h4>
            <ul className="flex flex-col gap-1.5">
              {infoLinks.map(link => (
                <li key={link.to} style={{ lineHeight: 1.6 }}>
                  <Link to={link.to} className={linkClass} style={linkStyle}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={columnHeaderClass} style={columnHeaderStyle}>
              Contacto
            </h4>
            <ul className="flex flex-col gap-1.5">
              <li
                className="flex items-center gap-2.5 text-sm text-[#9E9E9A]"
                style={{ lineHeight: 1.4 }}
              >
                <Mail size={15} className="shrink-0" style={{ color: '#66BB6A' }} />
                <a href="mailto:hola@aloepura.es" className="hover:text-white transition-colors">
                  hola@aloepura.es
                </a>
              </li>
              <li
                className="flex items-center gap-2.5 text-sm text-[#9E9E9A]"
                style={{ lineHeight: 1.4 }}
              >
                <Phone size={15} className="shrink-0" style={{ color: '#66BB6A' }} />
                <a href="tel:+34922000000" className="hover:text-white transition-colors">
                  +34 922 000 000
                </a>
              </li>
              <li
                className="flex items-start gap-2.5 text-sm text-[#9E9E9A]"
                style={{ lineHeight: 1.4 }}
              >
                <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: '#66BB6A' }} />
                <span>Las Palmas de Gran Canaria, España</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#757571] text-center lg:text-left">
            © {new Date().getFullYear()} AloePura. Todos los derechos reservados.
          </p>

          {/* Legal links */}
          <nav
            aria-label="Enlaces legales"
            className="flex items-center gap-x-4 gap-y-1 flex-wrap justify-center"
          >
            {legalLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs text-[#9E9E9A] hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {paymentMethods.map(method => (
              <span
                key={method}
                className="text-[10px] text-[#757571] border border-white/10 rounded px-2 py-0.5"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
