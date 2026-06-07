import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Vorn",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f2efe9] px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-[11px] font-bold tracking-[0.1em] uppercase text-black/40 hover:text-black transition-colors">
          ← vorn
        </Link>

        <h1 className="text-3xl font-black mt-8 mb-2">Terms of Service</h1>
        <p className="text-sm text-zinc-400 mb-10">Last updated: June 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-zinc-600 leading-relaxed">

          <section>
            <h2 className="text-base font-black text-black mb-2">1. Parties</h2>
            <p>These Terms of Service govern purchases made through vorn.co (&ldquo;we&rdquo;, &ldquo;Vorn&rdquo;). By placing an order you agree to these terms.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-black mb-2">2. Product</h2>
            <p>Vorn earbuds are wireless Bluetooth earbuds with real-time AI translation functionality. Translation requires an active internet connection via the free Vorn companion app. Advertised translation latency (&lt; 0.5 s) is measured under optimal network conditions.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-black mb-2">3. Orders and payment</h2>
            <p>All orders are subject to availability and confirmation. Prices are displayed inclusive of VAT where applicable. Payment is processed securely by Stripe — we do not store card details. An order confirmation will be sent to the email address provided.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-black mb-2">4. Delivery</h2>
            <p>Orders within Poland are shipped via InPost Paczkomat within 1–2 business days. EU orders are shipped via tracked courier within 3–5 business days. Delivery times are estimates and may vary. Shipping is free on all orders.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-black mb-2">5. Returns and refunds</h2>
            <p>You have the right to return your order within <strong>30 days</strong> of delivery, for any reason, without providing justification (EU Consumer Rights Directive). The product must be returned in its original packaging. We cover return shipping costs within the EU. Refunds are issued to the original payment method within 5 business days of receiving the return.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-black mb-2">6. Warranty</h2>
            <p>Vorn earbuds carry a <strong>2-year manufacturer&apos;s warranty</strong> against defects in materials and workmanship, in accordance with EU law. This warranty does not cover damage caused by misuse, water ingress beyond the IPX5 rating, or unauthorized modifications.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-black mb-2">7. Limitation of liability</h2>
            <p>Vorn is not liable for indirect, incidental, or consequential damages arising from the use of the product. Our total liability shall not exceed the purchase price paid.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-black mb-2">8. Governing law</h2>
            <p>These terms are governed by Polish law. Disputes may be submitted to the online ODR platform provided by the European Commission at ec.europa.eu/odr.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-black mb-2">9. Contact</h2>
            <p>For questions, returns, or warranty claims: <a href="mailto:hello@vorn.co" className="underline">hello@vorn.co</a></p>
          </section>

        </div>

        <div className="mt-12 pt-6 border-t border-black/8 flex gap-6">
          <Link href="/privacy" className="text-[11px] text-black/40 hover:text-black transition-colors underline">Privacy Policy</Link>
          <Link href="/" className="text-[11px] text-black/40 hover:text-black transition-colors">← Back to shop</Link>
        </div>
      </div>
    </div>
  );
}
