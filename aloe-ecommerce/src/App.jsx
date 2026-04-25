import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { CartUIProvider } from './context/CartUIContext'
import Layout from './components/layout/Layout'
import RouteErrorBoundary from './components/common/RouteErrorBoundary'
import HomePage from './pages/HomePage'
import RequireAuth from './components/auth/RequireAuth'
import RequireAdmin from './components/auth/RequireAdmin'

// Lazy-loaded routes (code splitting) — HomePage stays eager for fast first paint.
const CartPage         = lazy(() => import('./pages/CartPage'))
const ProductPage      = lazy(() => import('./pages/ProductPage'))
const CatalogPage      = lazy(() => import('./pages/CatalogPage'))
const CheckoutPage     = lazy(() => import('./pages/CheckoutPage'))
const ConfirmationPage = lazy(() => import('./pages/ConfirmationPage'))
const AccountPage      = lazy(() => import('./pages/AccountPage'))
const PrivacyPage      = lazy(() => import('./pages/PrivacyPage'))
const TermsPage        = lazy(() => import('./pages/TermsPage'))
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'))
const LegalNoticePage  = lazy(() => import('./pages/LegalNoticePage'))
const ContactPage      = lazy(() => import('./pages/ContactPage'))
const LoginPage        = lazy(() => import('./pages/LoginPage'))
const RegisterPage     = lazy(() => import('./pages/RegisterPage'))
const PaymentFailedPage = lazy(() => import('./pages/PaymentFailedPage'))
const FAQPage          = lazy(() => import('./pages/FAQPage'))
const NotFoundPage     = lazy(() => import('./pages/NotFoundPage'))

// Admin
const AdminLayout          = lazy(() => import('./components/admin/AdminLayout'))
const AdminDashboardPage   = lazy(() => import('./pages/admin/AdminDashboardPage'))
const AdminProductsPage    = lazy(() => import('./pages/admin/AdminProductsPage'))
const AdminOrdersPage      = lazy(() => import('./pages/admin/AdminOrdersPage'))
const AdminUsersPage       = lazy(() => import('./pages/admin/AdminUsersPage'))

function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <h1
        className="text-3xl font-bold text-[#2C2C2A] mb-3"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {title}
      </h1>
      <p className="text-[#757571]">Esta sección estará disponible en el próximo sprint.</p>
    </div>
  )
}

function RouteFallback() {
  return (
    <div
      className="flex items-center justify-center min-h-[60vh]"
      role="status"
      aria-live="polite"
      aria-label="Cargando"
    >
      <div
        className="w-10 h-10 rounded-full border-4 border-[#E8F5E9] animate-spin"
        style={{ borderTopColor: '#2D7B4A' }}
      />
      <span className="sr-only">Cargando contenido…</span>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <CartProvider>
        <CartUIProvider>
          <RouteErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/carrito" element={<CartPage />} />
                <Route path="/producto/:id" element={<ProductPage />} />
                <Route path="/productos" element={<CatalogPage />} />
                <Route path="/confirmacion" element={<ConfirmationPage />} />
                <Route path="/pago-fallido" element={<PaymentFailedPage />} />
                <Route
                  path="/cuenta"
                  element={
                    <RequireAuth>
                      <AccountPage />
                    </RequireAuth>
                  }
                />
                <Route path="/privacidad" element={<PrivacyPage />} />
                <Route path="/terminos" element={<TermsPage />} />
                <Route path="/cookies" element={<CookiePolicyPage />} />
                <Route path="/aviso-legal" element={<LegalNoticePage />} />
                <Route path="/preguntas-frecuentes" element={<FAQPage />} />
                <Route path="/ingredientes" element={<PlaceholderPage title="Ingredientes" />} />
                <Route path="/nosotros" element={<PlaceholderPage title="Nuestra Historia" />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="/sostenibilidad" element={<PlaceholderPage title="Sostenibilidad" />} />
                <Route path="/blog" element={<PlaceholderPage title="Blog" />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
              {/* Auth pages use their own minimal layout */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegisterPage />} />
              {/* Checkout uses its own minimal layout (no navbar/footer) */}
              <Route path="/checkout" element={<CheckoutPage />} />
              {/* Admin — layout propio con sidebar, protegido por RequireAdmin */}
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminLayout />
                  </RequireAdmin>
                }
              >
                <Route index element={<AdminDashboardPage />} />
                <Route path="productos" element={<AdminProductsPage />} />
                <Route path="pedidos" element={<AdminOrdersPage />} />
                <Route path="usuarios" element={<AdminUsersPage />} />
              </Route>
            </Routes>
            </Suspense>
          </RouteErrorBoundary>
        </CartUIProvider>
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
