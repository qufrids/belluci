import { Block } from './Block'

interface EditorialTextProps {
  headline: string
  description?: string
  centered?: boolean
  size?: 'default' | 'large'
}

export function EditorialText({
  headline,
  description,
  centered = true,
  size = 'default',
}: EditorialTextProps) {
  return (
    <Block>
      <div
        className={`
          max-w-2xl space-y-4 md:space-y-6
          ${centered ? 'mx-auto text-center' : ''}
        `.trim()}
      >
        <h2
          className={`
            font-serif text-balance
            ${size === 'large' ? 'text-display-sm md:text-display' : 'editorial-subheading'}
          `.trim()}
        >
          {headline}
        </h2>
        {description && (
          <p className="editorial-body">
            {description}
          </p>
        )}
      </div>
    </Block>
  )
}
