import type { Metadata } from 'next';
import { sitePath } from '@/lib/base-path';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Pricing information for RideReady by Chiaro Code.',
};
export const dynamic = 'force-static';

export default function PricingPage() {
  return (
    <>
      <section className="pricing-hero shell" aria-labelledby="pricing-title">
        <p className="section-label">Pricing</p>
        <h1 id="pricing-title">A clear model is in composition.</h1>
        <p className="pricing-lede">We are shaping RideReady’s pricing to serve individual operators and larger organizations with the same care built into the product itself.</p>
      </section>

      <section className="shell pricing-panel" aria-labelledby="pricing-status-title">
        <p className="pricing-status">TBD</p>
        <div className="pricing-copy">
          <h2 id="pricing-status-title">Pricing details are forthcoming.</h2>
          <p>Plans, licensing terms, and release availability are still being finalized. This page is ready to hold the complete pricing structure when those decisions are made.</p>
          <div className="pricing-principles" aria-label="Pricing principles">
            <div className="pricing-principle">
              <strong>Transparent</strong>
              <span>Clear terms, without hidden platform fees.</span>
            </div>
            <div className="pricing-principle">
              <strong>Proportionate</strong>
              <span>Options suited to individual and institutional use.</span>
            </div>
            <div className="pricing-principle">
              <strong>Considered</strong>
              <span>A model designed around sustainable music programs.</span>
            </div>
          </div>
          <a className="button-link" href={sitePath('/products')}>Return to RideReady</a>
        </div>
      </section>

      <section className="products-note" aria-labelledby="pricing-note-title">
        <div className="products-note-inner shell">
          <p className="section-label">In development</p>
          <p id="pricing-note-title">When pricing is ready, every plan and inclusion will be set out here in plain language.</p>
        </div>
      </section>
    </>
  );
}
