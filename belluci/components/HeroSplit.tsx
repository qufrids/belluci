import { ImagePlaceholder } from './ImagePlaceholder'

interface HeroSplitProps {
  headline: string
  subline: string
}

export function HeroSplit({ headline, subline }: HeroSplitProps) {
  return (
    <section className="min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] flex items-center">
      <div className="container-content w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 md:py-0">
          {/* Left: Editorial text */}
          <div className="order-2 lg:order-1 space-y-6 md:space-y-8 lg:pr-8">
            <h1 className="editorial-heading text-balance">
              {headline}
            </h1>
            <p className="editorial-body max-w-md">
              {subline}
            </p>
            <a
              href="#product"
              className="btn-bordered inline-block"
            >
              Discover
            </a>
          </div>

          {/* Right: Hero image */}
          <div className="order-1 lg:order-2">
            <ImagePlaceholder
              alt="Belluci Wallet with signature stripe and monogram"
              aspectRatio="hero"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
