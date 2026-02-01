import { ReactNode } from 'react'

interface BlockProps {
  children: ReactNode
  className?: string
  id?: string
  noPadding?: boolean
  fullWidth?: boolean
}

export function Block({
  children,
  className = '',
  id,
  noPadding = false,
  fullWidth = false,
}: BlockProps) {
  return (
    <section
      id={id}
      className={`
        ${noPadding ? '' : 'section-padding'}
        ${className}
      `.trim()}
    >
      {fullWidth ? (
        children
      ) : (
        <div className="container-content">{children}</div>
      )}
    </section>
  )
}

interface BlockDividerProps {
  className?: string
}

export function BlockDivider({ className = '' }: BlockDividerProps) {
  return (
    <div className={`container-content ${className}`}>
      <div className="h-px bg-brand-cream-08" />
    </div>
  )
}
