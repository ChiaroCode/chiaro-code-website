---
name: Chiaro tactile music surface
category: interactive product illustration
dials: { variance: 7, motion: 5, density: 3 }
when: A quiet, optional musical interaction supports an education product story.
not_for: Checkout, production MIDI/audio controls, long text panels, motion-dependent instructions.
stack: React 19, TypeScript, CSS modules, GSAP 3, native pointer events
---

# Reusable tactile music surface

```
┌ quiet backplate ─────────────────────┐
  ┌ stationary host / moving panel ──────┐
  │ From a key to a note  ·  illustration │
  │ violet bars + selected-note lens     │
  │ [C] [D] [E] [F] [G] [A] [B]          │
  │ Visual energy ────────────────●       │
  │ E selected · 58% · no sound           │
  └──────────────────────────────────────┘
```

## Props and mounting

`TactileSurface({ children: ReactNode, className?: string })` is the reusable tilt shell. `MagneticLink({ children: ReactNode, href: string, className?: string })` supplies a stable anchor hit region with a moving visual child. `MusicMaterial()` composes both with seven native note buttons, a labeled native range and discrete React state. Change its strings or pass your own content to the primitive; never imply it is a working MIDI device.

```tsx
// Mount exactly once in your root layout:
<CursorHalo />
// Compose in a client leaf:
<TactileSurface className={styles.instrument}>
  <div className={styles.panel}>Your accessible content</div>
</TactileSurface>
<MagneticLink href="/products#midi-downloads">
  Explore Typing-to-MIDI
</MagneticLink>
```

Copy `components/{tactile-surface,cursor-halo,music-material}.tsx`, their CSS modules, and `lib/tactile-runtime.ts`. Resolve `@/` to your source root; replace `sitePath` with your app's URL helper if needed. `MusicMaterial` uses the existing Lucide ArrowUpRight; replace it with a text-only label if your app has no icon package. Supply the semantic CSS variables from `design-tokens.json`. `MarketingMotion` adds optional GSAP reveals; the pointer primitives do not require GSAP. Keep `use client` at the interactive leaves.

## Mobile and accessibility

At ≤1000px the story stacks. At ≤560px the decorative backplate disappears and the panel padding contracts, with seven 48px-high buttons. Coarse pointers flatten depth/tilt; range touch drag and note taps remain. Reduced motion disables pointer decoration and GSAP decoration while keeping note and energy state. Native cursor, scrolling, focus and keyboard behavior are preserved. Opaque/stronger material fallbacks support reduced transparency and increased contrast. Amber has explicit pressed state and a text label; the illustration produces no sound.

## Motion variants

Quiet: only discrete note/bar state, static panel, no cursor. Standard: finite tilt ±5°, 1.04 scale, 38ms cursor smoothing and 60px magnetic radius. Editorial: add scoped GSAP 0.9s reveal mask and desktop depth stack. Reduced: static surface, no cursor, magnet, pin, scrub or reveal. The three presets and physics limits are in the token JSON and architecture document.

## Dark appearance

Use obsidian canvas and elevated slate, cyan action text/fill, violet decorative notes and amber selection. Light mode uses cool neutral surfaces with deeper blue actions. Keep text on opaque surfaces; a CSS backdrop approximation is appropriate only for the compact floating navigation. Do not call it Apple's native material.

## Anti-patterns

Do not move the focusable anchor or shrink its target, set React state on every pointer event, add one RAF loop per card, promise GPU/120fps, animate blur or shadow continuously, autoplay audio, or replace product screenshots with invented capabilities. Do not use this illustration as a testimonial or imply a device connection.

References and design reasoning are in `DESIGN.md`; lifecycle/rendering details and test evidence are in `motion-architecture.md` and the measurement report.
