# Chiaro Code design review

Reviewed 29 September 2026. Scope: Home, Products, Pricing, shared navigation and footer. This is an audit and refinement of the existing system, not a new visual identity.

## Direction

Preserve the editorial character: paper-colored surfaces, dark ink, burgundy accents, serif headlines, generous space, and fine rules. The visual hierarchy should support the new **Frictionless Access** proposition without adding ornamental gradients, decorative glass panels, or scroll effects.

The audience is schools and students. RideReady addresses operational friction and is explicitly **in development, not ready to ship**. Typing-to-MIDI addresses hardware friction and links to its published v1.0.0 files. The latter requires a receiving instrument and MIDI routing; it is not a sound generator.

## Audit scorecard

Scores are qualitative design judgments, not certification. File references refer to the reviewed source.

| Dimension | Score / 10 | Example and applied correction |
| --- | --- | --- |
| Color consistency | 9 | Retained the shared palette at `app/globals.css:4`. Corrected dark text on the dark mission band with explicit paper text at `app/globals.css:86`. |
| Typography hierarchy | 9 | Preserved serif display type and sans-serif body text. More readable headline leading at `app/globals.css:53`; navigation and action labels are 14px at the default size. |
| Spacing rhythm | 8 | Retained the existing half-rem-based component spacing and fluid section spacing at `app/globals.css:38`. A shared 44px control-height token is defined at `app/globals.css:16`. |
| Component consistency | 9 | All action links share the same underline, hover and active treatment at `app/globals.css:57`. Unavailable RideReady downloads are now plain status copy, not disabled-looking actions. |
| Responsive behavior | 9 | Grids collapse at 850px and 560px (`app/globals.css:184`, `app/globals.css:206`). Fixed pricing status overflow with wrapping at `app/globals.css:56`; all three pages checked down to 320px. |
| Dark mode | 8 | The existing brand is intentionally light-only, now declared at `app/globals.css:22`. Dark content bands have explicit contrast. No theme toggle or unsupported dark theme is implied. |
| Animation | 9 | Removed layout-shifting hover padding at `app/globals.css:58`. Only color transitions and anchor scrolling remain; reduced-motion preferences are respected at `app/globals.css:223`. |
| Accessibility | 9 | Focus indicators at `app/globals.css:34` and `app/globals.css:179`; usable target heights at lines 43, 46, 48, 57 and 178. Escape closes the mobile menu and restores focus at `components/site-header.tsx:27`. |
| Information density | 9 | Two clear product sections with an in-page index, a factual development notice, an actual controller screenshot, and platform-specific downloads in `app/products/page.tsx`. Pricing now explains availability instead of displaying a placeholder. |
| Polish | 9 | In-page targets clear the sticky header at `app/globals.css:27`. Mobile navigation closes on selection, Escape, outside interaction, focus departure and desktop resize in `components/site-header.tsx`. |

## Verification

- 34 rendered internal link instances across all three routes resolved, including their fragment targets; no empty or placeholder destinations.
- The setup guide, release notes, and four Typing-to-MIDI download URLs returned HTTP 200 after redirects. Asset contents were not downloaded or runtime-tested as part of this website review.
- Mobile menu open/close, Escape focus return, and keyboard navigation to Products passed in Chrome.
- Product anchor navigation positioned the section below the sticky header.
- No horizontal overflow at 320, 390, 768, or 1200px on all three pages. Text enlargement to 200% checked at 390 and 1200px; the pricing overflow found during that check was corrected and retested.
- Products passed the mobile Lighthouse snapshot audit: Accessibility, Best Practices, SEO, and Agentic Browsing all 100; 28 checks passed, none failed. A snapshot audit does not measure performance or replace manual accessibility review.
- Products produced no browser console warnings or errors during the checked flow.
- No RideReady download or purchase controls are rendered. Public launch requires a separate owner decision.

## Maintenance

Use the palette and type variables in `app/globals.css`. Keep controls at least 44px high, use semantic links for destinations, and preserve visible keyboard focus. Check product claims against their actual release documentation. Do not add unannounced prices, launch dates, market statistics, or customer claims.
