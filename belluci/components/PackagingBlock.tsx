import { Block } from './Block'
import { ImagePlaceholder } from './ImagePlaceholder'

interface PackagingBlockProps {
  headline: string
  description: string
}

export function PackagingBlock({ headline, description }: PackagingBlockProps) {
  return (
    <Block id="packaging">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image */}
        <div>
          <ImagePlaceholder
            alt="Belluci packaging with rigid box, tissue paper and ribbon"
            aspectRatio="landscape"
          />
        </div>

        {/* Text */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="editorial-subheading text-balance">
            {headline}
          </h2>
          <p className="editorial-body max-w-md">
            {description}
          </p>
        </div>
      </div>
    </Block>
  )
}
