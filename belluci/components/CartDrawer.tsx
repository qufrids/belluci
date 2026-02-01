'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useCart } from '@/lib/cart'
import { useCurrency } from '@/lib/currency'
import { isShopifyMode } from '@/lib/shopify'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeItem, isLoading } = useCart()
  const { currency, formatPrice } = useCurrency()
  const drawerRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)

  // Calculate subtotal
  const subtotal = cart.items.reduce((sum, item) => {
    const price = item.variant.prices[currency]
    return sum + price * item.quantity
  }, 0)

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

  const handleCheckout = () => {
    if (isShopifyMode && cart.checkoutUrl) {
      window.location.href = cart.checkoutUrl
    } else {
      // Mock mode: show alert
      alert('Checkout is not available in mock mode. Configure Shopify to enable checkout.')
    }
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Cart">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-brand-black border-l border-brand-cream-08 shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 md:h-20 px-6 border-b border-brand-cream-08">
            <span className="font-sans text-body-sm uppercase tracking-widest">
              Cart ({cart.items.length})
            </span>
            <button
              ref={firstFocusableRef}
              onClick={onClose}
              className="btn-text"
              aria-label="Close cart"
            >
              Close
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {cart.items.length === 0 ? (
              <div className="flex items-center justify-center h-full px-6">
                <p className="text-body text-brand-cream-70 text-center">
                  Your cart is empty.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-brand-cream-08">
                {cart.items.map((item) => (
                  <li key={item.variantId} className="p-6">
                    <div className="flex gap-4">
                      {/* Image placeholder */}
                      <div className="relative w-20 h-24 bg-brand-cream-05 flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center text-brand-cream-50">
                          <svg
                            className="w-8 h-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-body">{item.product.title}</h3>
                        <p className="text-body-sm text-brand-cream-70 mt-1">
                          {item.variant.color}
                        </p>
                        <p className="text-body-sm mt-2">
                          {formatPrice(item.variant.prices[currency])}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border border-brand-cream-08">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              disabled={isLoading}
                              className="w-8 h-8 flex items-center justify-center text-brand-cream-70 hover:text-brand-cream transition-colors disabled:opacity-50"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-body-sm tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              disabled={isLoading}
                              className="w-8 h-8 flex items-center justify-center text-brand-cream-70 hover:text-brand-cream transition-colors disabled:opacity-50"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.variantId)}
                            disabled={isLoading}
                            className="text-body-sm text-brand-cream-50 hover:text-brand-cream transition-colors disabled:opacity-50"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="border-t border-brand-cream-08 p-6 space-y-6">
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-body-sm text-brand-cream-70">Subtotal</span>
                <span className="font-serif text-body-lg">{formatPrice(subtotal)}</span>
              </div>

              <p className="text-caption text-brand-cream-50">
                Shipping calculated at checkout.
              </p>

              {/* Checkout button */}
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Checkout'}
              </button>

              {!isShopifyMode && (
                <p className="text-caption text-brand-cream-50 text-center">
                  Mock mode — checkout disabled
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
