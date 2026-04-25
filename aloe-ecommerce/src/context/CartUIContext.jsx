import { createContext, useContext, useState, useCallback } from 'react'

const CartUIContext = createContext(null)

export function CartUIProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openSidebar = useCallback(() => setOpen(true), [])
  const closeSidebar = useCallback(() => setOpen(false), [])
  return (
    <CartUIContext.Provider value={{ open, openSidebar, closeSidebar }}>
      {children}
    </CartUIContext.Provider>
  )
}

export function useCartUI() {
  const ctx = useContext(CartUIContext)
  if (!ctx) throw new Error('useCartUI must be used inside CartUIProvider')
  return ctx
}
