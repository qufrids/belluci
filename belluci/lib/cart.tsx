'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { Cart, CartItem, Product, ProductVariant } from './types'
import {
  isShopifyMode,
  createShopifyCart,
  addToShopifyCart,
  updateShopifyCartLine,
  removeFromShopifyCart,
} from './shopify'

const CART_STORAGE_KEY = 'belluci-cart'

interface CartContextType {
  cart: Cart
  isOpen: boolean
  isLoading: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (product: Product, variant: ProductVariant) => Promise<void>
  updateQuantity: (variantId: string, quantity: number) => Promise<void>
  removeItem: (variantId: string) => Promise<void>
  itemCount: number
}

const CartContext = createContext<CartContextType | null>(null)

const emptyCart: Cart = {
  id: null,
  items: [],
  checkoutUrl: null,
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(emptyCart)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setCart(parsed)
      } catch {
        // Invalid cart data
      }
    }
    setIsHydrated(true)
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    }
  }, [cart, isHydrated])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback(
    async (product: Product, variant: ProductVariant) => {
      setIsLoading(true)

      try {
        if (isShopifyMode) {
          // Shopify mode: use Shopify cart API
          if (cart.id) {
            const shopifyCart = await addToShopifyCart(cart.id, variant.id)
            setCart((prev) => ({
              ...prev,
              checkoutUrl: shopifyCart.checkoutUrl,
              items: [
                ...prev.items.filter((item) => item.variantId !== variant.id),
                {
                  variantId: variant.id,
                  quantity:
                    (prev.items.find((item) => item.variantId === variant.id)?.quantity || 0) + 1,
                  product,
                  variant,
                },
              ],
            }))
          } else {
            const shopifyCart = await createShopifyCart(variant.id)
            setCart({
              id: shopifyCart.id,
              checkoutUrl: shopifyCart.checkoutUrl,
              items: [{ variantId: variant.id, quantity: 1, product, variant }],
            })
          }
        } else {
          // Mock mode: local cart
          setCart((prev) => {
            const existingItem = prev.items.find((item) => item.variantId === variant.id)

            if (existingItem) {
              return {
                ...prev,
                items: prev.items.map((item) =>
                  item.variantId === variant.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
              }
            }

            return {
              ...prev,
              items: [...prev.items, { variantId: variant.id, quantity: 1, product, variant }],
            }
          })
        }

        setIsOpen(true)
      } catch (error) {
        console.error('Failed to add item to cart:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [cart.id]
  )

  const updateQuantity = useCallback(
    async (variantId: string, quantity: number) => {
      if (quantity < 1) {
        return removeItem(variantId)
      }

      setIsLoading(true)

      try {
        if (isShopifyMode && cart.id) {
          // For Shopify, we'd need to track line IDs
          // For simplicity, just update locally
        }

        setCart((prev) => ({
          ...prev,
          items: prev.items.map((item) =>
            item.variantId === variantId ? { ...item, quantity } : item
          ),
        }))
      } catch (error) {
        console.error('Failed to update quantity:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [cart.id]
  )

  const removeItem = useCallback(
    async (variantId: string) => {
      setIsLoading(true)

      try {
        setCart((prev) => ({
          ...prev,
          items: prev.items.filter((item) => item.variantId !== variantId),
        }))
      } catch (error) {
        console.error('Failed to remove item:', error)
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        openCart,
        closeCart,
        addItem,
        updateQuantity,
        removeItem,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
