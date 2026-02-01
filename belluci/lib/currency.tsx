'use client'

import { Currency, CURRENCIES } from './types'

const CURRENCY_STORAGE_KEY = 'belluci-currency'
const DEFAULT_CURRENCY: Currency = 'GBP'

export function getCurrencySymbol(currency: Currency): string {
  return CURRENCIES.find((c) => c.code === currency)?.symbol ?? '£'
}

export function formatPrice(amount: number, currency: Currency): string {
  const symbol = getCurrencySymbol(currency)

  // Format with proper decimal places
  const formatted = new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)

  // AED symbol goes after the number
  if (currency === 'AED') {
    return `${formatted} ${symbol}`
  }

  return `${symbol}${formatted}`
}

export function getStoredCurrency(): Currency {
  if (typeof window === 'undefined') return DEFAULT_CURRENCY

  const stored = localStorage.getItem(CURRENCY_STORAGE_KEY)
  if (stored && ['GBP', 'USD', 'AED'].includes(stored)) {
    return stored as Currency
  }
  return DEFAULT_CURRENCY
}

export function setStoredCurrency(currency: Currency): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CURRENCY_STORAGE_KEY, currency)
}

// Currency context for React
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (amount: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | null>(null)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(DEFAULT_CURRENCY)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setCurrencyState(getStoredCurrency())
    setIsHydrated(true)
  }, [])

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    setStoredCurrency(newCurrency)
  }

  const format = (amount: number) => formatPrice(amount, currency)

  // Prevent hydration mismatch
  if (!isHydrated) {
    return (
      <CurrencyContext.Provider value={{ currency: DEFAULT_CURRENCY, setCurrency, formatPrice: (amount) => formatPrice(amount, DEFAULT_CURRENCY) }}>
        {children}
      </CurrencyContext.Provider>
    )
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice: format }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
