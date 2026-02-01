'use client'

import { ReactNode } from 'react'
import { CurrencyProvider } from '@/lib/currency'
import { CartProvider } from '@/lib/cart'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CurrencyProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </CurrencyProvider>
  )
}
