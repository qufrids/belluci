import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description: 'Information about worldwide shipping and our 14-day return policy.',
}

export default function ShippingReturnsPage() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="font-serif text-display-sm md:text-display mb-12">Shipping & Returns</h1>

      <div className="space-y-12 text-brand-cream-70">
        {/* Shipping */}
        <section>
          <h2 className="font-serif text-heading text-brand-cream mb-6">Shipping</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-body font-medium text-brand-cream mb-2">Complimentary Worldwide Shipping</h3>
              <p className="text-body leading-relaxed">
                All orders ship free of charge to any destination worldwide.
              </p>
            </div>

            <div>
              <h3 className="text-body font-medium text-brand-cream mb-2">Processing Time</h3>
              <p className="text-body leading-relaxed">
                Orders are processed and dispatched within 2–3 business days. You will receive a confirmation email with tracking information once your order ships.
              </p>
            </div>

            <div>
              <h3 className="text-body font-medium text-brand-cream mb-2">Delivery Times</h3>
              <ul className="text-body leading-relaxed list-none pl-0 space-y-1">
                <li>United Kingdom: 2–4 business days</li>
                <li>Europe: 4–7 business days</li>
                <li>United States & Canada: 5–10 business days</li>
                <li>Middle East: 5–8 business days</li>
                <li>Rest of World: 7–14 business days</li>
              </ul>
            </div>

            <div>
              <h3 className="text-body font-medium text-brand-cream mb-2">Customs & Duties</h3>
              <p className="text-body leading-relaxed">
                International orders may be subject to local import duties and taxes. These charges are the responsibility of the recipient and are not included in the order total.
              </p>
            </div>
          </div>
        </section>

        {/* Returns */}
        <section>
          <h2 className="font-serif text-heading text-brand-cream mb-6">Returns</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-body font-medium text-brand-cream mb-2">14-Day Return Window</h3>
              <p className="text-body leading-relaxed">
                We accept returns within 14 days of delivery for unworn items in their original packaging. Items must be in the same condition as received.
              </p>
            </div>

            <div>
              <h3 className="text-body font-medium text-brand-cream mb-2">How to Return</h3>
              <p className="text-body leading-relaxed">
                To initiate a return, please contact us at returns@belluci.com with your order number. We will provide a prepaid return label for UK orders. International return shipping is the responsibility of the customer.
              </p>
            </div>

            <div>
              <h3 className="text-body font-medium text-brand-cream mb-2">Refund Process</h3>
              <p className="text-body leading-relaxed">
                Once we receive and inspect your return, we will process your refund within 5 business days. The refund will be issued to the original payment method.
              </p>
            </div>

            <div>
              <h3 className="text-body font-medium text-brand-cream mb-2">Exchanges</h3>
              <p className="text-body leading-relaxed">
                We do not offer direct exchanges. Please return your item for a refund and place a new order for the desired variant.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="font-serif text-heading text-brand-cream mb-4">Questions?</h2>
          <p className="text-body leading-relaxed">
            For any questions about shipping or returns, please contact us at hello@belluci.com.
          </p>
        </section>
      </div>
    </article>
  )
}
