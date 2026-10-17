# Chiarocode website brand rollout

The approved A/code hybrid brand kit replaces the previous company logo on the four public routes: home, products, pricing, and RideReady. The rollout uses the original primary lockup, symbol, favicon, avatar, and PNG social artwork. `brand-source-manifest.json` records source filenames and SHA-256 hashes. No customer, license, or administrative information is included in these assets.

Compact header wordmarks retain every approved glyph, color, and transform. Only the descriptor group is omitted and the viewBox is cropped with 32 units of clear space. The full descriptor lockup appears only when its image is at least 480px wide. The supplied monochrome white symbol and wordmark serve dark headers; full color lockups sit on white fields. The company name is marked against automatic translation.

`app/brand-tokens.css` contains the approved palette. UI semantics use indigo/blue and accessible surface/text tints; green and amber remain accents. Lato is self hosted, with its OFL license and source URLs included. Explicit image dimensions, eager header images, lazy lower-page artwork, font swapping, and a font preload keep layout stable.

The release preserves product downloads, RideReady pilot and preview disclosures, existing $199/location/year pricing and founding options, the local-only inquiry, disabled checkout, and the removed video-editing route. Product icons and existing video content are unchanged.

## Verification

- Production export succeeds; all four routes prerender.
- TypeScript and lint pass; all 18 existing tests pass.
- Sixteen Chromium/axe WCAG A/AA scans: four routes × light/dark × 375/1440px, zero violations and page errors.
- All four routes additionally checked at 320px and 768px: no horizontal overflow. Sampled keyboard traversal finds no focus covered by the sticky header.
- Mobile menu opens, closes with Escape, and restores focus. Reduced motion leaves the RideReady video paused without autoplay.
- Pilot inquiry validates, prepares the exact Unicode-safe email draft, copies it, and clears stale drafts after edits. No submission or copy network requests. No-JavaScript fallback works. Checkout remains disabled; `/recap/` returns 404.
- Copied assets match the source hashes; compact SVG derivatives preserve all artwork paths. Screenshots reviewed in light/dark and mobile/desktop layouts.

Browser results are evidence for the tested Chromium layouts, not a guarantee for every device or assistive technology. Existing recorded dependency advisories remain outside this visual change; the established critical audit gate remains required.

## Release and rollback

Publish through the existing GitHub Pages workflow on `main`; no hosting, payment, or account changes. The previous production revision is `63cc5439ea8b1a964267aa2803d518c09c914ccb`. To roll back, revert the single brand rollout commit on main and let the same workflow deploy the revert. Avoid force-pushing or resetting unrelated work.
