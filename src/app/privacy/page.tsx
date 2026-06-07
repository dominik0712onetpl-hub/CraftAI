import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Vorn",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f2efe9] px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-[11px] font-bold tracking-[0.1em] uppercase text-black/40 hover:text-black transition-colors">
          ← vorn
        </Link>

        <h1 className="text-3xl font-black mt-8 mb-2">Privacy Policy</h1>
        <p className="text-sm text-zinc-400 mb-10">Last updated: June 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-zinc-600 leading-relaxed">

          <section>
            <h2 className="text-base font-black text-black mb-2">1. Data controller</h2>
            <p>Vorn (&ldquo;we&rdquo;) is the data controller for personal data collected through vorn.co. Contact: <a href="mailto:hello@vorn.co" className="underline">hello@vorn.co</a></p>
          </section>

          <section>
            <h2 className="text-base font-black text-black mb-2">2. What data we collect</h2>
            <p>When you place an order we collect: name, email address, delivery address, and order details. We do <strong>not</strong> collect or store payment card data — this is handled entirely by Stripe (stripe.com), a PCI-DSS certified payment processor.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-black mb-2">3. Why we collect it</h2>
            <p>Your data is used solely to: process and fulfill your order, send order confirmation and shipping updates, handle returns and warranty claims, and comply with legal obligations.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-black mb-2">4. Legal basis</h2>
            <p>Processing is based on contract performance (Art. 6(1)(b) GDPR) and legal obligation (Art. 6(1)(c) GDPR). We do not use your data for marketing without explicit consent.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-black mb-2">5. Data retention</h2>
            <p>Order data is retained for 5 years to comply with accounting and tax obligations. You may request deletion of data not required by law at any time.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-black mb-2">6. Third parties</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Stripe</strong> — payment processing (stripe.com/privacy)</li>
              <li><strong>Vercel</strong> — website hosting (vercel.com/legal/privacy-policy)</li>
              <li><strong>InPost / DPD</strong> — delivery, receives name and delivery address only</li>
            </ul>
            <p className="mt-2">We do not sell or share personal data with any other third parties.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-black mb-2">7. Your rights (GDPR)</h2>
            <p>You have the right to: access your personal data, correct inaccuracies, request deletion, restrict processing, and data portability. To exercise these rights, contact us at <a href="mailto:hello@vorn.co" className="underline">hello@vorn.co</a>.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-black mb-2">8. Cookies</h2>
            <p>This site uses only functional cookies necessary for operation (language preference, session). No advertising or tracking cookies are used without consent.</p>
          </section>

          <section>
            <h2 className="text-base font-black text-black mb-2">9. Contact</h2>
            <p>Data protection queries: <a href="mailto:hello@vorn.co" className="underline">hello@vorn.co</a>. You also have the right to lodge a complaint with your national data protection authority.</p>
          </section>

        </div>

        <div className="mt-12 pt-6 border-t border-black/8 flex gap-6">
          <Link href="/terms" className="text-[11px] text-black/40 hover:text-black transition-colors underline">Terms of Service</Link>
          <Link href="/" className="text-[11px] text-black/40 hover:text-black transition-colors">← Back to shop</Link>
        </div>
      </div>
    </div>
  );
}
