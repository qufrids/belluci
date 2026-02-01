import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://belluci.com'),
  title: {
    default: 'Belluci — Quiet Luxury',
    template: '%s | Belluci',
  },
  description:
    'Crafted from full-grain leather. Hand-finished in our atelier. The Belluci Wallet embodies quiet luxury.',
  keywords: ['luxury wallet', 'leather wallet', 'handmade wallet', 'designer wallet', 'Belluci'],
  authors: [{ name: 'Belluci' }],
  creator: 'Belluci',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://belluci.com',
    siteName: 'Belluci',
    title: 'Belluci — Quiet Luxury',
    description:
      'Crafted from full-grain leather. Hand-finished in our atelier. The Belluci Wallet embodies quiet luxury.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Belluci Wallet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Belluci — Quiet Luxury',
    description:
      'Crafted from full-grain leather. Hand-finished in our atelier. The Belluci Wallet embodies quiet luxury.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
