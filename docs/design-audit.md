# Design review and access audit

Overall: production-ready web refinement with optional tactile feedback. No critical access defect remains in the tested frontend paths. Scores below are editorial review judgments, not automated conformance certification.

| Dimension | Score / 10 | Evidence and resolution |
|---|---:|---|
| Identity | 9 | Original company logo/social pixels and car/music product icons remain; blue brand and Geist unify all routes. `app/page.tsx`, `app/layout.tsx`. |
| Hierarchy | 9 | Two-line desktop hero, readable lede, primary/secondary actions, separate product/release facts. `app/home.module.css`, `app/RideReady/page.tsx`. |
| Layout | 9 | Editorial split, dense three-choice chooser, layered instrument, mission/story and clear release action. Compact content stacks with no document overflow. |
| Typography | 9 | Self-hosted Geist variable, optical tracking, fluid headings and readable body. No remote-font dependency. |
| Color | 9 | Semantic light/dark roles; measured text/action ratios 6.47–15.25:1, selected note 10.24–10.84:1. Violet is illustrative and amber also has pressed/text state. |
| Materials | 8 | One small static 28px glass navigation; opaque content materials, specular borders and fixed shadows. Stronger/opaque accessibility fallbacks. |
| Motion | 9 | One finite pointer driver, physical spring presets, scoped GSAP masks/pin/scrub/stack; no audio/video/ambient loop. Visible stationary content without motion. |
| Input/access | 9 | Native links/buttons/range, stable hit regions, focus reset, 320px note targets ≥63.5×48px, 200% CSS zoom and reduced motion pass. |
| Performance | 7 | Root CSS reduced 80.1%; measured pointer trace has no long tasks. Local uncompressed Lighthouse mobile performance 68, with FCP/LCP remaining transfer-limited. See measurement report rather than an unsupported frame-rate claim. |
| Content/trust | 9 | Illustrations labeled; exact approved per-location/pilot/renewal terms; checkout disabled; stable 2.2.1 and unreleased additions remain accurate. |

The main craft choice is a restrained musical surface within a practical site. No empty feature grid, invented partners/testimonials, generic stat badges, neon-heavy card wall or fabricated product UI was added. The keyboard/pickup walkthrough remains user controlled. This web treatment approximates glass/material principles; it is not native Apple UI.

## Manual checks and remaining limits

Scoped axe 4.12.1 reported zero violations and a contrast review item for overlapping decorative layers/one-character notes. The measured semantic ratios and a worst-case translucent white glare over slate remain legible; the glare never carries instructions. Both appearance modes and static fallbacks were visually inspected. The sample has no Layout trace events and 19 Paint events; it does not establish permanent GPU promotion or guarantees for low-end devices.

Browser tests cover desktop, 320/390/720px, keyboard, reduced motion, 200% CSS zoom, repeated mounts, all four routes and the full fictional RideReady flow. A physical touch device, screen-reader session, 200% browser text-only scaling, phone-cellular pairing, actual MIDI hardware and field performance are not established by headless testing. No payment or license fulfillment is exercised. These limits are explicit in the delivery evidence.

Platform note: on the web, native anchors/buttons/range and media preferences take precedence over macOS/iOS menu-bar or app-window conventions. No implementation details are introduced into the product's ordinary user flows beyond truthful demo/release/availability labels.
