import { ReactNode } from 'react'
import { Providers } from '@/components/Providers'
import { ClientLayout } from '@/components/ClientLayout'

interface LegalLayoutProps {
  children: ReactNode
}

export default function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <Providers>
      <ClientLayout>
        <div className="container-content py-section-y-mobile md:py-section-y">
          <div className="max-w-2xl mx-auto">
            {children}
          </div>
        </div>
      </ClientLayout>
    </Providers>
  )
}
