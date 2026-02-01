'use client'

import { useState, ReactNode } from 'react'
import { TopBar } from './TopBar'
import { Header } from './Header'
import { Footer } from './Footer'
import { MenuDrawer } from './MenuDrawer'
import { CartDrawer } from './CartDrawer'
import { useCart } from '@/lib/cart'

interface ClientLayoutProps {
  children: ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isOpen: isCartOpen, openCart, closeCart } = useCart()

  return (
    <>
      <TopBar />
      <Header onMenuOpen={() => setIsMenuOpen(true)} onCartOpen={openCart} />
      <main>{children}</main>
      <Footer />
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  )
}
