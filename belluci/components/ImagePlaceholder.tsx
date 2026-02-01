interface ImagePlaceholderProps {
  alt: string
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'hero'
  className?: string
}

const aspectRatioClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  hero: 'aspect-[4/5] md:aspect-[3/4]',
}

export function ImagePlaceholder({
  alt,
  aspectRatio = 'portrait',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`
        relative bg-brand-cream-05 overflow-hidden
        ${aspectRatioClasses[aspectRatio]}
        ${className}
      `.trim()}
      role="img"
      aria-label={alt}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-cream-08 to-transparent" />

      {/* Centered placeholder content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-cream-50 p-8">
        <svg
          className="w-12 h-12 mb-4 opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={0.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <p className="text-caption text-center opacity-70">{alt}</p>
      </div>
    </div>
  )
}
