'use client'

import { useCart } from '@/lib/cart'

interface HeaderProps {
  onMenuOpen: () => void
  onCartOpen: () => void
}

export function Header({ onMenuOpen, onCartOpen }: HeaderProps) {
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-40 bg-brand-black/90 backdrop-blur-md border-b border-brand-cream-08">
      <div className="container-content">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Menu button */}
          <button
            onClick={onMenuOpen}
            className="btn-text flex items-center gap-2"
            aria-label="Open menu"
          >
            <span className="hidden md:inline">Menu</span>
            <svg
              className="w-5 h-5 md:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            </svg>
          </button>

          {/* Logo */}
          <a
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-serif text-lg md:text-xl tracking-widest"
          >
            BELLUCI
          </a>

          {/* Cart button */}
          <button
            onClick={onCartOpen}
            className="btn-text flex items-center gap-2"
            aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ''}`}
          >
            <span className="hidden md:inline">Cart</span>
            {itemCount > 0 && (
              <span className="text-caption tabular-nums">({itemCount})</span>
            )}
            <svg
              className="w-5 h-5 md:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
