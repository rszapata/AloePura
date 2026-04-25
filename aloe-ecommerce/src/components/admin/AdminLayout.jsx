import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingBag, Users, ArrowLeft, LogOut, Leaf } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import usePageMeta from '../../hooks/usePageMeta'

const NAV = [
  { to: '/admin',           label: 'Dashboard',  icon: LayoutDashboard, end: true },
  { to: '/admin/productos', label: 'Productos',  icon: Package },
  { to: '/admin/pedidos',   label: 'Pedidos',    icon: ShoppingBag },
  { to: '/admin/usuarios',  label: 'Usuarios',   icon: Users },
]

export default function AdminLayout() {
  usePageMeta({ title: 'Panel admin · AloePura' })
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#E8E8E6] shadow-sm">
        <div className="px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full"
                style={{ backgroundColor: '#2D7B4A' }}
              >
                <Leaf size={16} className="text-white" />
              </span>
              <span
                className="text-base font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#2D7B4A' }}
              >
                AloePura
              </span>
            </Link>
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ backgroundColor: '#E8F5E9', color: '#2D7B4A' }}
            >
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#757571] hidden sm:inline">
              {user?.email}
            </span>
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs text-[#4A4A4A] hover:text-[#2D7B4A] transition-colors"
            >
              <ArrowLeft size={14} /> Volver a la tienda
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-[#E53935] hover:underline cursor-pointer"
            >
              <LogOut size={14} /> Salir
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-0 items-start">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] bg-white border-r border-[#E8E8E6] p-3">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all shrink-0',
                    isActive ? '' : 'text-[#4A4A4A] hover:bg-[#F5F5F3]',
                  ].join(' ')
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#E8F5E9' : 'transparent',
                  color: isActive ? '#2D7B4A' : undefined,
                  fontFamily: "'Montserrat', system-ui, sans-serif",
                })}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="p-4 sm:p-8 max-w-full overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
