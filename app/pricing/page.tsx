import type { Metadata } from 'next';
import { sitePath } from '@/lib/base-path';

export const metadata: Metadata = {
  title: 'Pricing & Availability',
  description: 'RideReady is in development. Typing-to-MIDI version 1.0.0 is available to download. See current availability and pricing status for Chiaro Code tools.',
};
export const dynamic = 'force-static';

export default function PricingPage() {
  return (
    <>
      <section className="pricing-hero shell" aria-labelledby="pricing-title">
        <p className="section-label">Pricing &amp; availability</p>
        <h1 id="pricing-title">A clear place to start.</h1>
        <p className="pricing-lede">Our tools are at different stages. Here is what you can use today, and what is still taking shape.</p>
      </section>
      <section className="shell pricing-panel" id="ride-ready-status" aria-labelledby="ride-ready-status-title">
        <div><p className="section-label">01 / For schools</p><p className="pricing-status">In development</p></div>
        <div className="pricing-copy"><h2 id="ride-ready-status-title">RideReady</h2><p>RideReady is not ready to ship. We are still developing the product, and have not announced pricing or a release date.</p><p>Downloads and purchases are not available yet. You can explore the approach and features we are working on.</p><a className="button-link" href={sitePath('/products#ride-ready')}>Explore RideReady</a></div>
      </section>
      <section className="shell pricing-panel" aria-labelledby="midi-status-title">
        <div><p className="section-label">02 / For students</p><p className="pricing-status">Available to try</p></div>
        <div className="pricing-copy"><h2 id="midi-status-title">Typing-to-MIDI</h2><p>Version 1.0.0 is available as a direct download for macOS and Windows, with no checkout required. See the product page for platform options, setup instructions, and testing notes.</p><p>You will need a compatible instrument or music application to hear sound. Any cost for that software is separate.</p><a className="button-link" href={sitePath('/products#midi-downloads')}>Get Typing-to-MIDI</a></div>
      </section>
      <section className="products-note" aria-labelledby="pricing-note-title"><div className="products-note-inner shell"><p className="section-label">Frictionless Access</p><p id="pricing-note-title">Practical tools. Clear expectations. More space for music.</p></div></section>
    </>
  );
}
