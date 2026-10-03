# Chiaro Code

Chiaro Code's website presents **Frictionless Access** to music education: less operational friction for schools and fewer hardware barriers for students.

## Pages

- Home: mission, vision, and the connection between the two products.
- Products: RideReady in development; Typing-to-MIDI with setup guidance and published v1.0.0 downloads.
- Pricing: RideReady limited-pilot annual seat pricing and current test-checkout state; Typing-to-MIDI availability.
- RideReady: `/RideReady`, an illustrative, user-controlled pickup walkthrough and `/RideReady#download` release availability. No real phone connection or automatic audio is started by the walkthrough.

## Release policy

RideReady remains a limited pilot. Its annual pilot price is $99 per device license. The pricing page accepts only Stripe **test-mode** Payment Link URLs via build-time public variables; unset or live-mode links render disabled. This is not a production checkout or payment-to-license fulfillment flow. Do not configure live links, secrets, email delivery, or deployment without the owner’s approval.

Typing-to-MIDI links are maintained in `lib/typing-to-midi.ts`. Verify release assets and the tagged setup guide when updating them. Keep signing and platform testing notes consistent with the release.

## Development and hosting

The release owner verified stable version 2.2.1 and prerelease 2.3.0 on October 3, 2026. The stable checker manifest lives at `public/.well-known/rideready-release.json`. Keep it at 2.2.1 until the official next stable release and matching assets have been verified. Its fixed customer release page is `https://chiarocode.com/RideReady#download`. Do not link private GitHub installer assets before anonymous download access is confirmed. GitHub Pages manages the response cache lifetime; this change does not change hosting or set cache headers.

Run `npm ci`, then `npm run dev`. Run `npx tsc --noEmit` for type checking and `npm run build` for the static export in `dist/client`.

This checkout is linked to the existing Chiaro Code Site through `.openai/hosting.json`; preserve its project ID and current audience. The included GitHub Pages workflow is a separate, existing hosting option.

## Stripe test checkout

The static site has no server or Stripe webhook route. Optional test-mode hosted links are read at build time from `NEXT_PUBLIC_STRIPE_TEST_RIDEREADY_URL` and `NEXT_PUBLIC_STRIPE_TEST_SUPPORT_URL`. The site accepts only `https://buy.stripe.com/test_<id>` URLs. Leave both unset unless actual links have been created in Stripe test mode. These public checkout links are not secret keys. The site does not confirm payment, issue licenses, or send fulfillment email; see [the fulfillment and activation boundary](docs/stripe-test-checkout.md).
