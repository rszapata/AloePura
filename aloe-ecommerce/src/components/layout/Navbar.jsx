import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X, Leaf, User, LogIn } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useCartUI } from '../../context/CartUIContext'
import { useAuth } from '../../context/AuthContext'

const navLinks = [
  { to: '/productos', label: 'Productos' },
  { to: '/ingredientes', label: 'Ingredientes' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count } = useCart()
  const { openSidebar } = useCartUI()
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav
      className={[
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'bg-white shadow-md border-b border-[#E8E8E6]'
          : 'bg-white/95 backdrop-blur-sm border-b border-[#E8E8E6]',
      ].join(' ')}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="AloePura - Inicio"
          >
            <span
              className="flex items-center justify-center w-9 h-9 rounded-full"
              style={{ backgroundColor: '#2D7B4A' }}
            >
              <Leaf size={20} className="text-white" />
            </span>
            <span
              className="text-xl font-bold hidden sm:block"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: '#2D7B4A',
              }}
            >
              AloePura
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={[
                  'text-sm font-medium transition-colors duration-200 hover:text-[#2D7B4A]',
                  'relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5',
                  'after:bg-[#2D7B4A] after:scale-x-0 after:origin-left after:transition-transform',
                  'hover:after:scale-x-100 pb-0.5',
                  location.pathname === link.to
                    ? 'text-[#2D7B4A] after:scale-x-100'
                    : 'text-[#4A4A4A]',
                ].join(' ')}
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Account link */}
            {isAuthenticated ? (
              <Link
                to="/cuenta"
                className="hidden sm:flex items-center gap-2 px-3 h-10 rounded-full hover:bg-[#E8F5E9] transition-colors text-sm font-medium text-[#2D7B4A]"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                aria-label="Mi cuenta"
                title={user?.email}
              >
                <User size={18} />
                <span className="hidden lg:inline max-w-[120px] truncate">
                  {user?.nombre?.split(' ')[0] || 'Mi cuenta'}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-2 px-3 h-10 rounded-full hover:bg-[#E8F5E9] transition-colors text-sm font-medium text-[#2D7B4A]"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                aria-label="Iniciar sesión"
              >
                <LogIn size={18} />
                <span className="hidden lg:inline">Entrar</span>
              </Link>
            )}

            {/* Cart button */}
            <button
              type="button"
              onClick={openSidebar}
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#E8F5E9] transition-colors"
              aria-label={`Carrito (${count} artículos)`}
            >
              <ShoppingCart size={22} style={{ color: '#2D7B4A' }} />
              {count > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full"
                  style={{
                    backgroundColor: '#26A69A',
                    fontFamily: "'Montserrat', system-ui, sans-serif",
                  }}
                >
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#E8F5E9] transition-colors"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X size={22} style={{ color: '#2D7B4A' }} />
              ) : (
                <Menu size={22} style={{ color: '#2D7B4A' }} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#E8E8E6] bg-white">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={[
                  'px-4 py-3 rounded-xl text-base font-medium transition-colors',
                  location.pathname === link.to
                    ? 'bg-[#E8F5E9] text-[#2D7B4A]'
                    : 'text-[#4A4A4A] hover:bg-[#F5F5F3]',
                ].join(' ')}
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-[#E8E8E6] my-2" />
            {isAuthenticated ? (
              <Link
                to="/cuenta"
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium text-[#2D7B4A] hover:bg-[#E8F5E9]"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                <User size={18} /> Mi cuenta
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium text-[#2D7B4A] hover:bg-[#E8F5E9]"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                <LogIn size={18} /> Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
