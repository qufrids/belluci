import Link from 'next/link'

const footerLinks = [
  { label: 'Shipping & Returns', href: '/legal/shipping-returns' },
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-brand-cream-08">
      <div className="container-content py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body-sm text-brand-cream-70 transition-colors hover:text-brand-cream"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-caption text-brand-cream-50">
            © {currentYear} Belluci. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
