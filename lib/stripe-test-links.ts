/**
 * Public Stripe Payment Links for the static site.
 *
 * A URL must be copied from a Stripe test-mode Payment Link. The strict path
 * check prevents accidentally wiring a live-mode `buy.stripe.com` URL into a
 * build. These links are public checkout URLs, never secret API credentials.
 */
const STRIPE_TEST_LINK_PATH = /^\/test_[A-Za-z0-9]+$/;

export function stripeTestPaymentLink(value: string | undefined): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (
      url.origin !== 'https://buy.stripe.com' ||
      url.username !== '' ||
      url.password !== '' ||
      !STRIPE_TEST_LINK_PATH.test(url.pathname) ||
      url.search ||
      url.hash
    ) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

export const rideReadyTestCheckoutUrl = stripeTestPaymentLink(
  process.env.NEXT_PUBLIC_STRIPE_TEST_RIDEREADY_URL,
);

export const supportTestCheckoutUrl = stripeTestPaymentLink(
  process.env.NEXT_PUBLIC_STRIPE_TEST_SUPPORT_URL,
);
