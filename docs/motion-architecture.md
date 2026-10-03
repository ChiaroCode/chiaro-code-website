# Motion architecture and rendering budget

The production implementation uses React client leaves, the existing GSAP 3.15.0 / @gsap/react 2.1.2, native pointer events and one finite requestAnimationFrame loop. There is no added motion runtime, video, autoplay audio or continuous background animation.

## Ownership

| Owner | Responsibility | Lifetime |
|---|---|---|
| `CursorHalo` | Starts the shared pointer driver once; native cursor stays | Root layout mount |
| `tactile-runtime` | Registry, spring integration, cached geometry, cursor, tilt, magnet | Only eligible pointer input and settling |
| `TactileSurface` / `MagneticLink` | Register host and visual refs, visibility/resize observers | Client component mount/unmount |
| `MusicMaterial` | Selected note and native slider state | User interaction only |
| `MarketingMotion` | GSAP reveal masks, image scrub, title pin and depth stack | Scoped useGSAP + matchMedia context |

Stationary hosts define hit regions; only their visual children move. Focus resets decoration and keeps focused controls stationary. A 60px proximity radius drives magnetic content at most 7px. Surface tilt is limited to ±5 degrees and scale ≤1.04 at perspective 1000px. Keys and the visualizer use shallow 24/32px depth; the precomputed glare sits at 40px. The glare gradient itself never changes per frame: transform and opacity move a static layer.

## Physical presets

| Preset | Stiffness | Damping | Mass | Use |
|---|---:|---:|---:|---|
| Subtle UI | 240 | 28 | 1 | Magnetic CTA visual |
| Tactile | 350 | 20 | 1 | Pointer tilt and intensity |
| Large reveal | 140 | 24 | 1 | Sampled spring ease for the 0.9s GSAP reveal mask |

Semi-implicit integration divides a clamped 32ms frame into ≤8ms substeps. It never tries to catch up after a hidden tab. Springs stop when displacement <0.001 and velocity <0.01. Cursor position uses exponential smoothing with a 38ms time constant and a 0.1px settle threshold. One pending RAF is shared across all targets; it exits once every active target settles. `will-change` is present only while a surface is settling and is removed at rest.

The reveal ease samples its physical spring once, then uses GSAP's existing ticker. ScrollTrigger is the owner of scroll progress; no raw scroll handler calculates animation progress. A passive scroll listener only cancels pointer decoration and invalidates cached geometry. Mobile has no pin or stacked backplate. Readable base text remains underneath the decorative word-opacity scrub, including before JS or reduced motion.

## Event and cleanup path

A fine-hover mouse with no reduced-motion preference activates decoration. Touch/pen, selection drag, keyboard, focus, scrolling, pointer exit and blur reset it. Visibility change cancels pending frames when the document becomes hidden. IntersectionObserver resets offscreen targets; ResizeObserver invalidates cached bounds. Geometry is read on the first pointer event after invalidation, not every animation frame. There are no React setters inside the pointer frame loop.

Unmount removes a target, disconnects both observers and resets visual styles. Root unmount or capability changes cancel RAF and remove all global listeners. GSAP's context and media cleanup restore pins, transforms and scroll triggers when the component unmounts or the preference/breakpoint changes. Link navigation can be repeated without accumulating pointer subscriptions. Tests exercise one-loop behavior, settling after a delayed frame, mouse versus touch, capability changes, focus, scroll and cleanup.

## Input equivalents

The music figure is a silent illustrative component, not a simulated MIDI connection. Pointer hover can select one of seven notes; clicking, tapping, Enter or Space does the same. Native `aria-pressed` communicates selection. The range supports drag on touch/mouse and arrow/Home/End keys, with `aria-valuetext` describing its displayed example velocity. Text output reports pitch, note number and example velocity; no color or movement alone carries state. No pointer capture or drag gesture is required to reach a result. Touch-action pan-y leaves ordinary vertical scrolling available around the range.

## Rendering costs and measurement

Transform and opacity are preferred because a browser may composite them, but they do not guarantee GPU promotion or a frame budget. Filters, blur, shadows, gradients and clip masks can incur rasterization or paint; backdrop blur also samples underlying content. This design keeps blur static on one small navigation island, uses a static shadow, and moves a precomputed glare layer. The reveal clip is static; only the child translates. The illustrated pitch changes its SVG transform only on discrete note selection; the velocity updates text. Neither runs a perpetual visualizer. Layer promotion consumes memory, so permanent `will-change` on every card is deliberately avoided.

Do not claim 120fps. The attached measurement report identifies viewport, browser, headless execution, lab traces and Lighthouse conditions. RAF intervals are observed callback cadence, not proof that each frame was painted or presented. Lighthouse and synthetic interactions are lab evidence, not field INP or a guarantee for every phone. Actual traces separate layout, paint and scripting work. Test ordinary and reduced-motion paths on desktop/mobile and retain readable controls when the browser cannot afford the material effect.

## Reuse and tuning

Start with these bounded defaults. To reduce cost, remove glare first, then tilt depth, and reduce navigation blur; functional note/slider controls remain. Keep exactly one CursorHalo/driver per app root. Do not introduce a local RAF inside every surface, animate backdrop blur, move the actual focusable host, connect audio from hover, or hide important content until scroll. Any change to motion or layout needs fresh keyboard, touch, 200% zoom, reduced-motion and performance checks.
