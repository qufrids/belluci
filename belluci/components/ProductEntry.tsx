'use client'

import { useState } from 'react'
import { Block } from './Block'
import { useCurrency } from '@/lib/currency'
import { useCart } from '@/lib/cart'
import { Product, ProductColor, Currency, CURRENCIES } from '@/lib/types'
import { deliveryInfo } from '@/lib/mockData'

interface ProductEntryProps {
  product: Product
}

export function ProductEntry({ product }: ProductEntryProps) {
  const { currency, setCurrency, formatPrice } = useCurrency()
  const { addItem, isLoading } = useCart()
  const [selectedColor, setSelectedColor] = useState<ProductColor>('Black')
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  const selectedVariant = product.variants.find((v) => v.color === selectedColor)
  const price = selectedVariant?.prices[currency] ?? 0

  const handleAddToCart = async () => {
    if (!selectedVariant) return
    await addItem(product, selectedVariant)
  }

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  const accordionItems = [
    {
      id: 'delivery',
      title: 'Delivery',
      content: deliveryInfo.shipping,
    },
    {
      id: 'returns',
      title: 'Returns',
      content: deliveryInfo.returns,
    },
    {
      id: 'care',
      title: 'Care',
      content: deliveryInfo.care,
    },
  ]

  return (
    <Block id="product">
      <div className="max-w-xl mx-auto">
        <div className="space-y-8">
          {/* Product title */}
          <div className="text-center space-y-4">
            <h2 className="font-serif text-display-sm md:text-display">
              {product.title}
            </h2>
            <p className="font-serif text-heading">
              {formatPrice(price)}
            </p>
          </div>

          {/* Currency selector */}
          <div className="flex justify-center">
            <div className="inline-flex border border-brand-cream-08 divide-x divide-brand-cream-08">
              {CURRENCIES.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => setCurrency(curr.code)}
                  className={`
                    px-4 py-2 text-body-sm tracking-wide transition-colors
                    ${currency === curr.code
                      ? 'bg-brand-cream text-brand-black'
                      : 'text-brand-cream-70 hover:text-brand-cream'
                    }
                  `.trim()}
                  aria-pressed={currency === curr.code}
                >
                  {curr.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color selector */}
          <div className="space-y-4">
            <p className="text-center text-body-sm text-brand-cream-70">
              Color: {selectedColor}
            </p>
            <div className="flex justify-center gap-4">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedColor(variant.color)}
                  disabled={!variant.available}
                  className={`
                    w-10 h-10 rounded-full border-2 transition-all
                    ${selectedColor === variant.color
                      ? 'border-brand-cream scale-110'
                      : 'border-brand-cream-08 hover:border-brand-cream-50'
                    }
                    ${!variant.available ? 'opacity-30 cursor-not-allowed' : ''}
                  `.trim()}
                  style={{
                    backgroundColor: variant.color === 'Black' ? '#1a1a1a' : '#8B6914',
                  }}
                  aria-label={`Select ${variant.color}`}
                  aria-pressed={selectedColor === variant.color}
                />
              ))}
            </div>
          </div>

          {/* Add to bag button */}
          <button
            onClick={handleAddToCart}
            disabled={isLoading || !selectedVariant?.available}
            className="btn-bordered w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Adding...' : 'Add to Bag'}
          </button>

          {/* Delivery & Returns accordion */}
          <div className="border-t border-brand-cream-08 pt-8 space-y-0">
            {accordionItems.map((item) => (
              <div key={item.id} className="border-b border-brand-cream-08">
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between py-4 text-left"
                  aria-expanded={openAccordion === item.id}
                >
                  <span className="text-body-sm tracking-wide">{item.title}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${openAccordion === item.id ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === item.id && (
                  <div className="pb-4">
                    <p className="text-body-sm text-brand-cream-70 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Block>
  )
}
