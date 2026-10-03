# Chiaro Code tactile design system

Design read: a practical education and music site with the existing blue identity, clear product status, and one tactile musical gesture that invites exploration.

Dials: design variance 7, motion intensity 5, visual density 3. This is an evolution of the current site, preserving all four routes, original company logo, product icons, download anchors, custom domain, hosting and public audience. It is an original web material treatment inspired by depth and clarity; it is not Apple's native Liquid Glass implementation.

## Roles and signature

Obsidian is the dark canvas, slate is the elevated content material, and light mode uses cool neutral surfaces. Cyan indicates actions, violet belongs to the illustrative notes, and amber identifies the selected note. Meaning also appears in text and native pressed state. Only the compact floating navigation uses a 28px backdrop blur. Content panels use opaque fills, double specular edges, and a static shadow. A fixed radial wash suggests stage light without a perpetual loop or animated filter.

The signature is the music surface: a quiet backplate, a readable panel, and notes/keys on two shallow depth planes. Pointer tilt is bounded at 5 degrees and 1.04 scale with a 1000px perspective. The panel never conveys real product capabilities: it explicitly says Silent illustration and does not connect to MIDI or make sound.

## Tokens and hierarchy

`design-tokens.json` is the portable specification. `app/globals.css` holds production semantic variables. Geist is self-hosted with swap; Lucide is the existing thin icon system. Controls keep 48px preferred hit height, visible focus, normal reading order, and a stationary hit region. Major materials use 32px radius, compact surfaces 24px, buttons one pill family. Main sections have 80–176px breathing room; compact layouts reduce this without squeezing controls.

The original company image is unchanged, including its original transparency and pixels. Root OG/Twitter metadata uses its absolute HTTPS URL. RideReady retains the car image and its independent metadata. Social platforms may retain older previews in their own caches.

## Layout plan

```
Wide:   [floating brand + navigation]
        [two-line RideReady heading/actions] [real car icon, shallow tilt]
        [three manual product-story choices / expanded content]
        [music explanation] [layered silent instrument]
        [pinned mission title] [readable text + actual artwork + facts]
        [available product / truthful RideReady release action]
Narrow: each pair becomes one column; layers flatten; controls remain reachable.
```

Seed 1032026 selects editorial split, inline typography imagery, accordion slices and a notation strip, with image reveals/depth stacking. Existing Geist overrides the randomized Cabinet choice to preserve the brand. The chosen partner-marquee architecture is translated to stationary notation rather than fictional partners or continuous animation. The existing controlled story chooser and typography image remain; no fake testimonials are added. Three choices fill three columns with no vacant grid cells. The hero remains two desktop lines without decorative badges or statistics.

## Motion and access

One shared event-driven pointer driver handles cursor ring/dot, tilt and magnetic links. GSAP owns contextual scroll and reveal motion. See `docs/motion-architecture.md` for physical tokens, rendering costs, cleanup and instrumentation. No React state changes continuously with pointer movement; note selection and slider changes are discrete functional interactions. The slider is a native range input, supporting touch drag and keyboard arrows. All notes are native pressed buttons.

Reduced motion removes the cursor, tilt, magnet, pin, scrub, depth and entry movement. Content remains visible. Reduced transparency removes the navigation blur; increased contrast strengthens the material boundary and uses opaque navigation. Forced colors retain native controls and selected borders. Motion stops at rest and resets when hidden, offscreen, scrolling, dragging or using the keyboard.

## References and interpretation

- [Apple Logic Pro](https://www.apple.com/logic-pro/): clear typography and authentic product imagery suggest the editorial hierarchy.
- [Ableton Live](https://www.ableton.com/en/live/): restrained surfaces frame musical content; we do not copy its product interface.
- [MuseScore](https://musescore.org/en): approachable notation motivates a simple, understandable music interaction.
- [Apple materials](https://developer.apple.com/design/human-interface-guidelines/materials), [motion](https://developer.apple.com/design/human-interface-guidelines/motion), [accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility): hierarchy, brief optional feedback, keyboard/gesture alternatives and legibility guide the web translation.

The requested ECC taste file concerns angelcore/cloud-trance music-video visuals. Only its coherent dark base, crystalline cool colors and sparse warm accent inform this web task. Its music/video generation pipeline and invented tempo/key are inapplicable. Apple HIG native conventions are translated to web semantics, not copied as app chrome. User instructions and current release facts override any skill's animation or stock-image suggestions.

## Product and publication boundaries

The approved public plan is $199 USD per location per 12 months, main plus spare host. Phones and displays do not count as hosts. Founding first-year pilot options are $99 self setup or $149 with one guided setup session. All renew automatically at $199/year unless canceled; paid-term access remains. Email support is bounded, multi-location arrangements separate. No unlimited support, SLA, identity verification, guardian authorization, compliance, SIS or enterprise promises are added.

Checkout remains disabled pending security, architecture and verified live account/fulfillment settings. Stable release metadata stays 2.2.1; 2.3.0 remains prerelease and 2.4.0 additions unreleased. No installer or live payment links are enabled. The public host is the existing GitHub Pages repo/domain. The older unbound Site is not this publication target.
