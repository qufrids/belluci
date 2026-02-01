import { Metadata } from 'next'
import { HeroSplit } from '@/components/HeroSplit'
import { EditorialText } from '@/components/EditorialText'
import { DetailBlock } from '@/components/DetailBlock'
import { HouseCodes } from '@/components/HouseCodes'
import { ProductEntry } from '@/components/ProductEntry'
import { PackagingBlock } from '@/components/PackagingBlock'
import { BlockDivider } from '@/components/Block'
import { mockProduct, houseCodes, brandStatements } from '@/lib/mockData'
import { getProduct, isShopifyMode } from '@/lib/shopify'

// JSON-LD for product
function ProductJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'Belluci Wallet',
          description:
            'Crafted from full-grain leather, the Belluci Wallet embodies quiet luxury. Hand-finished in our atelier.',
          image: 'https://belluci.com/images/wallet-hero.jpg',
          brand: {
            '@type': 'Brand',
            name: 'Belluci',
          },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'GBP',
            lowPrice: '285',
            highPrice: '285',
            availability: 'https://schema.org/InStock',
          },
        }),
      }}
    />
  )
}

export const metadata: Metadata = {
  title: 'Belluci — Quiet Luxury',
  description:
    'Crafted from full-grain leather. Hand-finished in our atelier. The Belluci Wallet embodies quiet luxury.',
}

export default async function HomePage() {
  // Fetch product from Shopify if configured, otherwise use mock data
  let product = mockProduct

  if (isShopifyMode) {
    const shopifyProduct = await getProduct('belluci-wallet')
    if (shopifyProduct) {
      product = shopifyProduct
    }
  }

  return (
    <>
      <ProductJsonLd />

      {/* Block 3: Hero split - editorial text + hero image */}
      <HeroSplit
        headline={brandStatements.hero.headline}
        subline={brandStatements.hero.subline}
      />

      <BlockDivider />

      {/* Block 4: Text-only brand statement */}
      <EditorialText
        headline="Less, but better."
        description="One product. Perfected."
        size="large"
      />

      <BlockDivider />

      {/* Block 5: Detail close-up image + monogram copy */}
      <DetailBlock
        headline={brandStatements.monogram.headline}
        description={brandStatements.monogram.description}
        imageAlt="Close-up of monogram emboss detail"
        imagePosition="right"
      />

      <BlockDivider />

      {/* Block 6: House codes - 3 subtle tiles */}
      <HouseCodes codes={houseCodes} />

      <BlockDivider />

      {/* Block 7: Material story - editorial split */}
      <DetailBlock
        headline={brandStatements.materials.headline}
        description={brandStatements.materials.description}
        imageAlt="Leather craftsmanship in the atelier"
        imagePosition="left"
      />

      <BlockDivider />

      {/* Block 8: First commerce module - product entry */}
      <ProductEntry product={product} />

      <BlockDivider />

      {/* Block 9: Packaging */}
      <PackagingBlock
        headline={brandStatements.packaging.headline}
        description={brandStatements.packaging.description}
      />

      <BlockDivider />

      {/* Block 10: Closing statement */}
      <EditorialText
        headline={brandStatements.closing.headline}
        description={brandStatements.closing.description}
        size="large"
      />
    </>
  )
}
