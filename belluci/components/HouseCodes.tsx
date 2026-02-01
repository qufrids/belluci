import { Block } from './Block'

interface HouseCode {
  id: string
  title: string
  description: string
}

interface HouseCodesProps {
  codes: HouseCode[]
}

export function HouseCodes({ codes }: HouseCodesProps) {
  return (
    <Block>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {codes.map((code, index) => (
          <article
            key={code.id}
            className="text-center space-y-4 md:space-y-5"
          >
            {/* Subtle number indicator */}
            <span className="inline-block text-caption text-brand-cream-50 tracking-widest">
              0{index + 1}
            </span>

            <h3 className="font-serif text-heading">
              {code.title}
            </h3>

            <p className="text-body-sm text-brand-cream-70 max-w-xs mx-auto leading-relaxed">
              {code.description}
            </p>
          </article>
        ))}
      </div>
    </Block>
  )
}
