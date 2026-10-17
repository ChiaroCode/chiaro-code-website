# Dependency reachability and fixes — October 17, 2026

The website is deployed by `.github/workflows/deploy.yml` to GitHub Pages from `dist/client`. Its static export contains no API or server directory. No payment or React Server Function endpoint is deployed. Local development/prerendering and the unused generated Worker output are separate attack surfaces; do not expose them as a production payment backend without a new review.

## Fixed

| Finding | Original path and prerequisites | Change |
| --- | --- | --- |
| Critical `proxy-addr` 2.0.7, [CVE-2026-90711 / GHSA-jqcg-44mw-7w3h](https://github.com/advisories/GHSA-jqcg-44mw-7w3h) | Unused `shadcn` CLI → MCP SDK → Express. Exploitation requires a running server that trusts an incorrectly specified IPv4-mapped IPv6 subnet and relies on the resulting client IP. There is no such server in the Pages deployment. | Removed the unused CLI and its dependency chain, including Express and `proxy-addr`, rather than hiding it under dev dependencies. Existing UI source and `@shadcn/react` remain. |
| Critical Tinypool prototype-pollution gadgets, [GHSA-5gmw-xhrv-c9v3](https://github.com/advisories/GHSA-5gmw-xhrv-c9v3), [GHSA-85c8-ppgw-ccpr](https://github.com/advisories/GHSA-85c8-ppgw-ccpr) | `oxfmt` development formatter → Tinypool 2.1.0. A Node worker gadget needs attacker-controlled prototype/options in that process. The formatter is not exported to browsers or run by the deploy build. | Scoped override to Tinypool 2.1.2; formatter retained. |
| High React Server Functions denial of service, [GHSA-wx67-qw84-cm4g](https://github.com/advisories/GHSA-wx67-qw84-cm4g) | `react-server-dom-webpack` 19.2.6. Requires a reachable server-function handler; the Pages artifact serves static content. Local/framework server use would need the patch. | Aligned React, React DOM and RSC at patched 19.2.8, within current peer ranges. |
| High Vite Windows file-deny bypass, [GHSA-fx2h-pf6j-xcff](https://github.com/advisories/GHSA-fx2h-pf6j-xcff) | Vite 8.0.13 development server, exposed to a network on Windows with sensitive files in allowed paths. Pages does not run Vite. | Patched to 8.0.16 within the same release line. |
| WebSocket and Undici advisories | Local Cloudflare/Vite/Miniflare tooling; not a public socket server on this host. | Scoped patched `ws` 8.21.3 in both dependency paths and `undici` 7.29.1. |
| Image parser, source-map and URI parser advisories | Framework/build tools process image, map or URI input. The current site does not accept public image or source-map uploads. | `image-size` 2.0.3, `source-map-js` 1.2.2 and `fast-uri` 3.1.8. |

The lockfile removes 264 unused CLI dependencies and updates the explicit patched versions. No framework replacement, major-version force fix, hosting migration, credential or payment setting is involved. The critical-audit CI gate checks the full dependency tree, including development tools.

## Stable toolchain follow-up

The remaining native-image findings were remediated with a reviewed stable same-major toolchain: Cloudflare Vite plugin 1.47.0, Wrangler 4.114.0 and Miniflare 4.20260722.0. Their supported Vite range includes the existing Vite 8. The current latest plugin uses a Miniflare 5 prerelease; that path was deliberately not selected. The stable Miniflare release already uses Sharp 0.35.2, so its scoped override to patched 0.35.5 stays within the same Sharp minor. Wrangler also supplies patched Esbuild 0.28.1.

An old optional Worker-types peer conflicted with the supported toolchain. No application code uses Worker-specific globals, so the unused ambient type entry and direct package were removed instead of forcing peer resolution or adopting a new global types major. Node, DOM and Vinext types remain; TypeScript validates the result. Node test-registration promises are explicitly marked with `void` under those types; their runner behavior is unchanged. No binding, compatibility flag, public hosting setting or Worker deployment changed.

Native tests process a synthetic SVG into PNG, inspect its result, reject malformed input, and dispatch a local Miniflare request. The tested native versions are Sharp 0.35.5, libvips 8.18.7, librsvg 2.63.2 and libheif 1.23.5. See [Sharp's release notes](https://sharp.pixelplumbing.com/changelog/v0.35.5/).

## Remaining findings

The final full `npm audit` reports **0 critical, 6 high, 0 moderate and 0 low findings**. These are package/parent counts for one unresolved advisory:

- `braces` 3.0.3 has an unpatched deeply nested-pattern stack-exhaustion advisory, [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). It is pulled through micromatch/fast-glob and the existing Vinext CommonJS build plugin. The affected input is a glob pattern in a Node build process; visitors supply no build patterns to the static site. The audit's suggested Vinext downgrade is not an acceptable narrow fix. A future upstream removal/fix needs a separately tested framework/tooling update.

The unresolved package chain is `vinext` → `vite-plugin-commonjs` → `vite-plugin-dynamic-import` → `fast-glob` → `micromatch` → `braces`. npm currently publishes Braces 3.0.3 as latest, and the advisory lists no patched release. The next action requires choosing a tested upstream fix or a reviewed framework/plugin replacement or maintained fork. Do not force npm's suggested Vinext downgrade to 0.0.15 or claim the audit is clean. This is a build-pattern input risk, not a public endpoint in the static artifact.

These reachability conclusions follow the inspected deployment workflow, static artifact and input paths; they are not a general guarantee that the packages are safe in other server deployments. Keep development servers local and treat these findings as blockers to reusing this toolchain as a public backend until remediated.

## Validation

The 16 application unit tests plus two native/Worker integration tests, TypeScript, lint and the final static production build pass. Browser verification covers the RideReady draft/email/copy flow, disabled checkout, no-JavaScript fallback, three widths and an automated accessibility check. The retired public video-editing route is absent from the artifact and returns 404; its inquiry utilities and tests are retained. No visual redesign, branding, installer or live payment change is part of this release.
