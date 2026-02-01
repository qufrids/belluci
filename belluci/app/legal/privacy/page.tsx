import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="font-serif text-display-sm md:text-display mb-12">Privacy Policy</h1>

      <div className="space-y-8 text-brand-cream-70">
        <section>
          <h2 className="font-serif text-heading text-brand-cream mb-4">Information We Collect</h2>
          <p className="text-body leading-relaxed">
            When you make a purchase, we collect the information necessary to process your order: your name, email address, shipping address, and payment information. We do not store complete payment card details on our servers.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-heading text-brand-cream mb-4">How We Use Your Information</h2>
          <p className="text-body leading-relaxed">
            Your information is used solely to process orders, communicate about your purchase, and improve our service. We do not sell or share your personal data with third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-heading text-brand-cream mb-4">Cookies</h2>
          <p className="text-body leading-relaxed">
            We use essential cookies to remember your cart and currency preferences. We do not use tracking cookies or third-party analytics that follow you across the web.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-heading text-brand-cream mb-4">Data Security</h2>
          <p className="text-body leading-relaxed">
            All transactions are processed through secure, encrypted connections. We implement appropriate technical measures to protect your personal information.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-heading text-brand-cream mb-4">Your Rights</h2>
          <p className="text-body leading-relaxed">
            You have the right to access, correct, or delete your personal data. Contact us at privacy@belluci.com with any requests.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-heading text-brand-cream mb-4">Contact</h2>
          <p className="text-body leading-relaxed">
            For questions about this privacy policy, please contact us at privacy@belluci.com.
          </p>
        </section>
      </div>

      <p className="text-caption text-brand-cream-50 mt-12">
        Last updated: January 2025
      </p>
    </article>
  )
}
