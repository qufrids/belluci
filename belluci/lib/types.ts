export type Currency = 'GBP' | 'USD' | 'AED'

export type ProductColor = 'Black' | 'Brown'

export interface ProductVariant {
  id: string
  color: ProductColor
  available: boolean
  prices: Record<Currency, number>
}

export interface Product {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml?: string
  variants: ProductVariant[]
  images: ProductImage[]
  features?: string[]
}

export interface ProductImage {
  id: string
  src: string
  alt: string
}

export interface CartItem {
  variantId: string
  quantity: number
  product: Product
  variant: ProductVariant
}

export interface Cart {
  id: string | null
  items: CartItem[]
  checkoutUrl: string | null
}

export interface CurrencyConfig {
  code: Currency
  symbol: string
  label: string
}

export const CURRENCIES: CurrencyConfig[] = [
  { code: 'GBP', symbol: '£', label: 'GBP' },
  { code: 'USD', symbol: '$', label: 'USD' },
  { code: 'AED', symbol: 'د.إ', label: 'AED' },
]
