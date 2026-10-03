import type { Metadata } from 'next';
import { sitePath } from '@/lib/base-path';
import { rideReadyTestCheckoutUrl, supportTestCheckoutUrl } from '@/lib/stripe-test-links';

export const metadata: Metadata = {
  title: 'Pricing & Availability',
  description: 'RideReady pilot pricing is $99 per device license per year. Typing-to-MIDI version 1.0.0 is available to download.',
};
export const dynamic = 'force-static';

export default function PricingPage() {
  return (
    <>
      <section className="pricing-hero shell" aria-labelledby="pricing-title">
        <h1 id="pricing-title">A clear place to start.</h1>
        <p className="pricing-lede">Our tools are at different stages. Here is what you can use today, and what is still taking shape.</p>
      </section>
      <section className="shell pricing-panel" id="ride-ready-status" aria-labelledby="ride-ready-status-title">
        <div><p className="pricing-audience">For schools</p><p className="pricing-status">Pilot pricing</p></div>
        <div className="pricing-copy">
          <h2 id="ride-ready-status-title">RideReady</h2>
          <p className="ride-ready-price">$99 <span>per device license / year</span></p>
          <p>Annual device licenses are $99 each. That is $495/year for 5 devices, $990/year for 10, or $1,980/year for 20, before applicable tax. Each license is issued for one device from its original RideReady request file.</p>
          <p>RideReady remains a limited pilot. Stripe checkout is test-only and does not create a real order or deliver a license. Real checkout and payment-to-license fulfillment are not enabled.</p>
          <div className="pricing-checkout" aria-label="RideReady test checkout status">
            <div><strong>RideReady annual plan</strong><span>Per-device: 1 or 2 seats · Business: 5, 10, or 20 seats</span></div>
            {rideReadyTestCheckoutUrl
              ? <a className="button-link" href={rideReadyTestCheckoutUrl} target="_blank" rel="noreferrer">Open Stripe test checkout</a>
              : <button className="button-link is-disabled" type="button" disabled>Test checkout unavailable</button>}
          </div>
          <p className="checkout-note">Billing and renewal terms are being finalized. Renewal, cancellation, refund, tax, and seat-quantity terms must be configured and reviewed in Stripe before checkout is enabled.</p>
          {rideReadyTestCheckoutUrl
            ? <p className="checkout-note">This build opens Stripe test-mode checkout only. Its product, annual interval, and supported seat quantities must match the displayed plan; checkout cannot collect a live payment.</p>
            : <p className="checkout-note">The Stripe test Payment Link is not configured in this build. Its product, annual interval, and supported seat quantities must be verified before enabling checkout.</p>}
          <a className="button-link" href={sitePath('/RideReady')}>Explore RideReady</a>
        </div>
      </section>
      <section className="shell pricing-available" aria-labelledby="midi-status-title">
        <div className="pricing-available-heading">
          <p className="pricing-audience">For students</p>
          <h2 id="midi-status-title">Typing-to-MIDI</h2>
          <p className="pricing-status">Available to download</p>
        </div>
        <div className="pricing-available-copy">
          <p>Version 1.0.0 is available as a direct download for macOS and Windows, with no checkout required. See the product page for platform options, setup instructions, and testing notes.</p>
          <p>You will need a compatible instrument or music application to hear sound. Any cost for that software is separate.</p>
          <a className="button-link" href={sitePath('/products#midi-downloads')}>Get Typing-to-MIDI</a>
        </div>
      </section>
      <section className="shell pricing-support" aria-labelledby="support-status-title">
        <div className="pricing-support-intro">
          <p className="pricing-audience">Optional support</p>
          <h2 id="support-status-title">Buy Chiaro Code a coffee</h2>
          <p>One-time support is separate from RideReady licenses and does not include a product entitlement.</p>
        </div>
        <div className="pricing-support-action">
          {supportTestCheckoutUrl
            ? <a className="button-link" href={supportTestCheckoutUrl} target="_blank" rel="noreferrer">Open Stripe test checkout</a>
            : <button className="button-link is-disabled" type="button" disabled>Test checkout unavailable</button>}
          {supportTestCheckoutUrl
            ? <p className="checkout-note">This build opens Stripe test-mode checkout only. Verify that its Stripe settings are for a one-time support payment and match the displayed terms.</p>
            : <p className="checkout-note">Support checkout is not configured. Any later test link must use Stripe’s one-time “customers choose what to pay” option; no amount or live link is set here.</p>}
        </div>
      </section>
    </>
  );
}
