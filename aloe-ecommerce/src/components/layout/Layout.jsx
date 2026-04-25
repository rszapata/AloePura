import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import Navbar from './Navbar'
import Footer from './Footer'
import CookieBanner from './CookieBanner'
import CartSidebar from '../cart/CartSidebar'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-svh" style={{ backgroundColor: '#FAFAF8' }}>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <TopBar />
      <Navbar />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <CartSidebar />
      <CookieBanner />
    </div>
  )
}
