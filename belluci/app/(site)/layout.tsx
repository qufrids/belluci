import { ReactNode } from 'react'
import { Providers } from '@/components/Providers'
import { ClientLayout } from '@/components/ClientLayout'

interface SiteLayoutProps {
  children: ReactNode
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <Providers>
      <ClientLayout>
        {children}
      </ClientLayout>
    </Providers>
  )
}
