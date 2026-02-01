import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for purchasing from Belluci.',
}

export default function TermsPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="font-serif text-display-sm md:text-display mb-12">Terms of Service</h1>

      <div className="space-y-8 text-brand-cream-70">
        <section>
          <h2 className="font-serif text-heading text-brand-cream mb-4">General</h2>
          <p className="text-body leading-relaxed">
            By accessing and using this website, you accept and agree to be bound by these terms. If you do not agree with any part of these terms, you may not use our services.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-heading text-brand-cream mb-4">Products</h2>
          <p className="text-body leading-relaxed">
            All products are handcrafted from natural leather. Due to the nature of the material, each piece may exhibit subtle variations in texture and color. This is not a defect but a characteristic of genuine leather.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-heading text-brand-cream mb-4">Pricing</h2>
          <p className="text-body leading-relaxed">
            Prices are displayed in your selected currency. For currencies other than GBP, prices are approximate conversions. The final charge will be processed in GBP and converted by your payment provider.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-heading text-brand-cream mb-4">Orders</h2>
          <p className="text-body leading-relaxed">
            Once an order is placed, you will receive a confirmation email. Orders are processed within 2–3 business days. We reserve the right to refuse or cancel any order at our discretion.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-heading text-brand-cream mb-4">Intellectual Property</h2>
          <p className="text-body leading-relaxed">
            All content on this website, including images, text, and design, is the property of Belluci and may not be reproduced without permission.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-heading text-brand-cream mb-4">Limitation of Liability</h2>
          <p className="text-body leading-relaxed">
            Belluci shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-heading text-brand-cream mb-4">Governing Law</h2>
          <p className="text-body leading-relaxed">
            These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>
        </section>
      </div>

      <p className="text-caption text-brand-cream-50 mt-12">
        Last updated: January 2025
      </p>
    </article>
  )
}
