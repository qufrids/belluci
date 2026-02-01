import { Block } from './Block'
import { ImagePlaceholder } from './ImagePlaceholder'

interface DetailBlockProps {
  headline: string
  description: string
  imageAlt: string
  imagePosition?: 'left' | 'right'
}

export function DetailBlock({
  headline,
  description,
  imageAlt,
  imagePosition = 'right',
}: DetailBlockProps) {
  return (
    <Block>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text */}
        <div
          className={`
            space-y-4 md:space-y-6
            ${imagePosition === 'left' ? 'lg:order-2' : ''}
          `.trim()}
        >
          <h2 className="editorial-subheading text-balance">
            {headline}
          </h2>
          <p className="editorial-body max-w-md">
            {description}
          </p>
        </div>

        {/* Image */}
        <div className={imagePosition === 'left' ? 'lg:order-1' : ''}>
          <ImagePlaceholder
            alt={imageAlt}
            aspectRatio="square"
          />
        </div>
      </div>
    </Block>
  )
}
