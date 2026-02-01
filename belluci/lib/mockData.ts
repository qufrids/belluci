import { Product } from './types'

export const mockProduct: Product = {
  id: 'belluci-wallet-001',
  handle: 'belluci-wallet',
  title: 'Belluci Wallet',
  description: 'Crafted from full-grain leather, the Belluci Wallet embodies quiet luxury. Each piece is hand-finished in our atelier, featuring the signature monogram emboss and contrast stripe that define the house.',
  descriptionHtml: '<p>Crafted from full-grain leather, the Belluci Wallet embodies quiet luxury. Each piece is hand-finished in our atelier, featuring the signature monogram emboss and contrast stripe that define the house.</p>',
  variants: [
    {
      id: 'variant-black',
      color: 'Black',
      available: true,
      prices: {
        GBP: 285,
        USD: 365,
        AED: 1340,
      },
    },
    {
      id: 'variant-brown',
      color: 'Brown',
      available: true,
      prices: {
        GBP: 285,
        USD: 365,
        AED: 1340,
      },
    },
  ],
  images: [
    {
      id: 'img-hero',
      src: '/images/wallet-hero.jpg',
      alt: 'Belluci Wallet in black leather with signature stripe',
    },
    {
      id: 'img-detail',
      src: '/images/wallet-detail.jpg',
      alt: 'Close-up of monogram emboss detail',
    },
    {
      id: 'img-craft',
      src: '/images/wallet-craft.jpg',
      alt: 'Hand-finishing process in atelier',
    },
    {
      id: 'img-packaging',
      src: '/images/wallet-packaging.jpg',
      alt: 'Belluci packaging with ribbon and tissue',
    },
  ],
  features: [
    '8 card slots',
    '2 note compartments',
    'Hidden pocket',
    'Full-grain leather',
    'Hand-finished edges',
  ],
}

export const deliveryInfo = {
  shipping: 'Complimentary worldwide shipping. Orders ship within 2–3 business days.',
  returns: 'We offer a 14-day return window for unworn items in original packaging.',
  care: 'Store in the provided dust bag. Avoid prolonged exposure to direct sunlight.',
}

export const houseCodes = [
  {
    id: 'stripe',
    title: 'Signature Stripe',
    description: 'A single contrast stripe, hand-painted across the leather.',
  },
  {
    id: 'monogram',
    title: 'Monogram Emboss',
    description: 'The house mark, pressed quietly into the grain.',
  },
  {
    id: 'edges',
    title: 'Hand-Finished Edges',
    description: 'Burnished by hand for a subtle sheen.',
  },
]

export const brandStatements = {
  hero: {
    headline: 'Quiet luxury.',
    subline: 'Designed to last. Made to be used.',
  },
  monogram: {
    headline: 'A quiet mark.',
    description: 'The signature monogram, embossed into full-grain leather.',
  },
  materials: {
    headline: 'Materials, considered.',
    description: 'Full-grain leather from heritage tanneries. Each hide is selected for its character—the subtle variations that make every piece unique.',
  },
  packaging: {
    headline: 'Arrives ready.',
    description: 'Presented in a rigid box with tissue paper and ribbon. Made in Pakistan.',
  },
  closing: {
    headline: 'Less, but better.',
    description: 'One product. Perfected.',
  },
}
