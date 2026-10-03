import type { Metadata } from 'next';
import { sitePath } from '@/lib/base-path';
import { supportTestCheckoutUrl } from '@/lib/stripe-test-links';

import { RideReadyPricing } from '@/components/ride-ready-pricing';
import { rideReadyBillingNote } from '@/lib/ride-ready-pricing';

export const metadata: Metadata = {
  title: 'Pricing & Availability',
  description:
    'RideReady is $199 USD per location per year, with founding pilot first-year options. Checkout unavailable. Typing-to-MIDI 1.0.0 is available.',
};
export const dynamic = 'force-static';

export default function PricingPage() {
  return (
    <>
      <section className="pricing-hero shell" aria-labelledby="pricing-title">
        <h1 id="pricing-title">A clear place to start.</h1>
        <p className="pricing-lede">
          Our tools are at different stages. Here is what you can use today, and
          what is still taking shape.
        </p>
      </section>
      <section
        className="shell pricing-panel"
        id="ride-ready-status"
        aria-labelledby="ride-ready-status-title"
      >
        <div>
          <p className="pricing-audience">For a school, campus or site</p>
          <p className="pricing-status">Annual location plan</p>
        </div>
        <div className="pricing-copy">
          <h2 id="ride-ready-status-title">RideReady</h2>
          <RideReadyPricing />
          <p>{rideReadyBillingNote}</p>
          <p>
            Founding pilot options are for the first year. The annual renewal is
            $199 per location for every option.
          </p>
          <div
            className="pricing-checkout"
            aria-label="RideReady checkout status"
          >
            <div>
              <strong>Pilot purchase availability</strong>
              <span>Checkout is being prepared</span>
            </div>
            <button className="button-link is-disabled" type="button" disabled>
              Checkout unavailable
            </button>
          </div>
          <p className="checkout-note">
            Live payments, tax and refund settings, and the remaining purchase
            terms must be verified before checkout is enabled.
          </p>
          <a className="button-link" href={sitePath('/RideReady')}>
            Explore RideReady
          </a>
        </div>
      </section>
      <section
        className="shell pricing-available"
        aria-labelledby="midi-status-title"
      >
        <div className="pricing-available-heading">
          <p className="pricing-audience">For students</p>
          <h2 id="midi-status-title">Typing-to-MIDI</h2>
          <p className="pricing-status">Available to download</p>
        </div>
        <div className="pricing-available-copy">
          <p>
            Version 1.0.0 is available as a direct download for macOS and
            Windows, with no checkout required. See the product page for
            platform options, setup instructions, and testing notes.
          </p>
          <p>
            You will need a compatible instrument or music application to hear
            sound. Any cost for that software is separate.
          </p>
          <a
            className="button-link"
            href={sitePath('/products#midi-downloads')}
          >
            Get Typing-to-MIDI
          </a>
        </div>
      </section>
      <section
        className="shell pricing-support"
        aria-labelledby="support-status-title"
      >
        <div className="pricing-support-intro">
          <p className="pricing-audience">Optional support</p>
          <h2 id="support-status-title">Buy Chiaro Code a coffee</h2>
          <p>
            One-time support is separate from RideReady licenses and does not
            include a product entitlement.
          </p>
        </div>
        <div className="pricing-support-action">
          {supportTestCheckoutUrl ? (
            <a
              className="button-link"
              href={supportTestCheckoutUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open Stripe test checkout
            </a>
          ) : (
            <button className="button-link is-disabled" type="button" disabled>
              Test checkout unavailable
            </button>
          )}
          {supportTestCheckoutUrl ? (
            <p className="checkout-note">
              This build opens Stripe test-mode checkout only. Verify that its
              Stripe settings are for a one-time support payment and match the
              displayed terms.
            </p>
          ) : (
            <p className="checkout-note">
              Support checkout is not configured. Any later test link must use
              Stripe’s one-time “customers choose what to pay” option; no amount
              or live link is set here.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
