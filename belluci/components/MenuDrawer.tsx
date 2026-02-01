'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

interface MenuDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const menuLinks = [
  { label: 'Shop', href: '/#product' },
  { label: 'Packaging', href: '/#packaging' },
  { label: 'Shipping', href: '/legal/shipping-returns' },
  { label: 'Contact', href: 'mailto:hello@belluci.com' },
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
]

export function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }

      // Focus trap
      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    firstFocusableRef.current?.focus()

    // Prevent body scroll
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Menu">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="absolute left-0 top-0 h-full w-full max-w-md bg-brand-black border-r border-brand-cream-08 shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 md:h-20 px-6 border-b border-brand-cream-08">
            <span className="font-serif text-lg tracking-widest">BELLUCI</span>
            <button
              ref={firstFocusableRef}
              onClick={onClose}
              className="btn-text"
              aria-label="Close menu"
            >
              Close
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-12 px-6">
            <ul className="space-y-6">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block font-serif text-display-sm md:text-display transition-opacity hover:opacity-70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="px-6 py-8 border-t border-brand-cream-08">
            <p className="text-caption text-brand-cream-50">
              © {new Date().getFullYear()} Belluci
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
