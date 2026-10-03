# Chiaro Code

Chiaro Code's website presents **Frictionless Access** to music education: less operational friction for schools and fewer hardware barriers for students.

## Pages

- Home: mission, vision, and the connection between the two products.
- Products: RideReady in development; Typing-to-MIDI with setup guidance and published v1.0.0 downloads.
- Pricing: RideReady limited-pilot pilot plan pricing and current test-checkout state; Typing-to-MIDI availability.
- RideReady: `/RideReady`, an illustrative, user-controlled pickup walkthrough and `/RideReady#download` release availability. No real phone connection or automatic audio is started by the walkthrough.

## Release policy

RideReady remains a limited pilot. The owner-approved plan is $199 USD per location per 12 months, with main and spare host computers. Phone controllers/displays do not count as hosts. Founding pilot first year is $99 self setup or $149 with one guided setup session. All options renew at $199/year automatically unless canceled; access remains through the paid term. Support is bounded email support, with no SLA or unlimited promise. Multi-location arrangements are separate. Checkout and automated license delivery remain disabled pending security, architecture, and live vendor/account verification. The optional support section accepts only explicitly labeled Stripe **test-mode** links; unset or live-mode links render disabled. This is not a production checkout or payment-to-license fulfillment flow.

Typing-to-MIDI links are maintained in `lib/typing-to-midi.ts`. Verify release assets and the tagged setup guide when updating them. Keep signing and platform testing notes consistent with the release.

## Development and hosting

The release owner verified stable version 2.2.1 and prerelease 2.3.0 on October 3, 2026. The stable checker manifest lives at `public/.well-known/rideready-release.json`. Keep it at 2.2.1 until the official next stable release and matching assets have been verified. Its fixed customer release page is `https://chiarocode.com/RideReady#download`. Do not link private GitHub installer assets before anonymous download access is confirmed. GitHub Pages manages the response cache lifetime; this change does not change hosting or set cache headers.

Run `npm ci`, then `npm run dev`. Run `npx tsc --noEmit` for type checking and `npm run build` for the static export in `dist/client`.

The authoritative public host is GitHub Pages from this repository, with the existing `chiarocode.com` custom domain and public audience. `.openai/hosting.json` references an older separate Site without this domain; preserve the file but do not use it to publish this website. No hosting migration is part of this change.

## Stripe test checkout

The static site has no server or Stripe webhook route. Optional test-mode hosted links are read at build time from `NEXT_PUBLIC_STRIPE_TEST_RIDEREADY_URL` and `NEXT_PUBLIC_STRIPE_TEST_SUPPORT_URL`. The site accepts only `https://buy.stripe.com/test_<id>` URLs. Leave both unset unless actual links have been created in Stripe test mode. These public checkout links are not secret keys. The site does not confirm payment, issue licenses, or send fulfillment email; see [the fulfillment and activation boundary](docs/stripe-test-checkout.md).

## Tactile design

The reusable `MusicMaterial`, `TactileSurface`, and `MagneticLink` components use one finite pointer driver alongside the existing GSAP scroll system. See [design tokens](design-tokens.json), [motion architecture](docs/motion-architecture.md), and [component usage](docs/tactile-music-surface.md). Run `npm run test:cursor`, `npm run test:stripe-links`, types, lint, and a production build. The music illustration is silent and never connects to a MIDI device.
