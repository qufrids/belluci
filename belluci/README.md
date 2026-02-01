# Belluci — Quiet Luxury

A production-ready, ultra-quiet luxury ecommerce storefront for the Belluci leather brand. Built with Next.js 15, TypeScript, and TailwindCSS.

## Features

- **Editorial Design**: Ultra-quiet luxury aesthetic with calm typography, extensive whitespace, and minimal UI
- **10-Block Homepage**: Top bar → Header → Hero split → Brand statement → Monogram detail → House codes → Materials → Product entry → Packaging → Closing
- **Currency Switcher**: GBP / USD / AED with localStorage persistence
- **Color Variants**: Black and Brown wallet options
- **Cart System**: Drawer-based cart with quantity controls
- **Dual Mode**: Works with local mock data or headless Shopify
- **Accessibility**: Semantic HTML, keyboard navigation, focus management, ARIA labels
- **SEO Optimized**: Metadata, Open Graph, JSON-LD structured data

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd belluci
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
npm run build
npm start
```

## Modes

### Mock Mode (Default)

The site runs with local mock data by default. No configuration needed.

Mock data includes:
- Product: Belluci Wallet with Black and Brown variants
- Prices: £285 / $365 / 1340 AED
- All brand copy and house codes

### Shopify Mode

To connect to a real Shopify store:

1. Create a `.env.local` file:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token
```

2. Ensure your Shopify store has:
   - A product with handle `belluci-wallet`
   - Variants with a "Color" option (Black, Brown)
   - Storefront API access enabled

3. Restart the dev server

When Shopify credentials are provided, the site will:
- Fetch product data from Shopify
- Create carts via Storefront API
- Redirect to Shopify checkout

**Note**: Currency conversion in Shopify mode is approximate unless you have multi-currency configured on your Shopify store.

## Project Structure

```
belluci/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx      # Site layout with providers
│   │   └── page.tsx        # Homepage with 10 blocks
│   ├── legal/
│   │   ├── layout.tsx
│   │   ├── privacy/
│   │   ├── terms/
│   │   └── shipping-returns/
│   └── layout.tsx          # Root layout with fonts
├── components/
│   ├── Block.tsx           # Section wrapper
│   ├── CartDrawer.tsx      # Cart slide-out
│   ├── ClientLayout.tsx    # Client-side layout
│   ├── DetailBlock.tsx     # Image + text block
│   ├── EditorialText.tsx   # Centered text block
│   ├── Footer.tsx
│   ├── Header.tsx          # Sticky header
│   ├── HeroSplit.tsx       # Hero with text + image
│   ├── HouseCodes.tsx      # 3-tile feature block
│   ├── ImagePlaceholder.tsx
│   ├── MenuDrawer.tsx      # Navigation drawer
│   ├── PackagingBlock.tsx
│   ├── ProductEntry.tsx    # Commerce module
│   ├── Providers.tsx       # Context providers
│   └── TopBar.tsx          # Announcement bar
├── lib/
│   ├── cart.ts             # Cart state & context
│   ├── currency.ts         # Currency formatting & context
│   ├── mockData.ts         # Local product data
│   ├── shopify.ts          # Shopify Storefront API
│   └── types.ts            # TypeScript types
├── styles/
│   └── globals.css         # Tailwind + custom styles
├── public/
│   └── images/             # Product images (placeholder)
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## Design System

### Colors

- Background: `#070707` (near-black)
- Text: `#F1EEE8` (warm off-white)
- Borders: `rgba(241, 238, 232, 0.08)` (whisper-thin)

### Typography

- Display: Fraunces (serif)
- Body: Inter (sans-serif)

### Spacing

- Max content width: 1240px
- Section padding: 96–110px desktop, 72–92px mobile
- Side padding: 24px

## Customization

### Adding Real Images

Replace the `ImagePlaceholder` components with Next.js `Image` components:

```tsx
import Image from 'next/image'

<Image
  src="/images/wallet-hero.jpg"
  alt="Belluci Wallet"
  fill
  className="object-cover"
/>
```

### Modifying Product Data

Edit `lib/mockData.ts` to update:
- Product title, description, features
- Variant colors and prices
- House codes and brand statements

### Changing Colors

Update `tailwind.config.ts` under `theme.extend.colors.brand`.

## License

Private — All rights reserved.
