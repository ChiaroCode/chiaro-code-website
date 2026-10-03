# Measured performance and verification

Production static export, isolated HeadlessChrome 153 on the current Mac host, October 3, 2026. Lighthouse 13.5.0 mobile defaults use simulated throttling; the local Python preview does not compress assets. These are lab results, not field INP, painted-frame proof or a 120fps promise.

| Local mobile category | Score |
|---|---:|
| performance | 68 |
| accessibility | 100 |
| best-practices | 100 |
| seo | 100 |

| Metric | Local result |
|---|---|
| first-contentful-paint | 4.1 s |
| largest-contentful-paint | 6.2 s |
| total-blocking-time | 0 ms |
| cumulative-layout-shift | 0 |
| speed-index | 4.1 s |

The first local run measured performance 63 with 155,740 bytes of root CSS. Restricting Tailwind scanning to actual route/app components reduced root CSS to 30,990 bytes, an 80.1% reduction. The remaining framework transfer and original large artwork are visible in the Lighthouse diagnostics; no new animation library or video was added. The live HTTPS Pages measurements will be retained in the delivery evidence, where actual CDN compression differs from this preview.

## Pointer motion trace

A 2.4-second synthetic pointer path across the music surface at 1440×1000 sampled 145 RAF intervals. Median 16.70ms, p95 16.70ms, maximum 16.80ms, 0 intervals over 34ms and no observed >50ms long tasks. This measures callback cadence on this host, not guaranteed presentation rate.

| Trace event | Count | Total ms | Longest ms |
|---|---:|---:|---:|
| Layout | 0 | 0.0 | 0.0 |
| Paint | 19 | 0.79 | 0.16 |
| UpdateLayoutTree | 151 | 44.52 | 0.63 |
| FunctionCall | 476 | 47.52 | 0.52 |
| RunTask | 0 | 0.0 | 0.0 |

Trace scopes overlap, so these totals must not be summed as a frame budget. Zero Layout events and the recorded Paint events are observations in this sample, not guarantees about every interaction/browser. The scoped axe 4.12.1 audit reported zero violations; color-contrast checks for overlapped decorative layers and one-character note labels require manual review. Measured semantic color ratios are 6.47–15.25:1 for reported text/action pairs and 10.24–10.84:1 for selected notes.

## Functional verification

TypeScript, oxlint, six actual pointer-runtime lifecycle/physics tests, two checkout URL guard tests and the production export passed. Browser scripts passed 12 tactile checks, 21 site layout/URL/pricing checks and 21 RideReady flow checks. They cover keyboard focus and native slider endpoints, 320/390/720px layouts, light/dark, 200% CSS zoom, reduced motion, repeated route mounts, no page errors, fictional pickup data, shared-board updates and explicit speech controls. Speech is stubbed during automated QA, so no audio plays. Phone-cellular pairing, real MIDI hardware and payment/license fulfillment are not verified by these frontend tests.

320px note targets measured 63.5×48px (first row) and 86×48px (second row), with no document overflow. A physical touch-device test and production field metrics remain outside this headless lab.
