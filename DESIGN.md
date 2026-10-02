# Chiaro Code website design system

## Design read

Reading this as a three-page marketing site for schools, music teachers, and students, with a bright sky-glass language and one stage-like story: a planning grid resolves into music at a festival.

This is an identity refresh over the reconciled site. Keep /, /products, and /pricing, the existing navigation labels and anchor IDs, and all factual product and pricing copy. RideReady remains the lead product. Typing-to-MIDI stays the available student tool.

The dials are DESIGN_VARIANCE: 7, MOTION_INTENSITY: 4, and VISUAL_DENSITY: 3. The visual signature is a spreadsheet grid opening into music staff lines, with festival light at the end of that path. The sky and glass cues borrow a feeling from early Aero-era interfaces without copying Microsoft or Apple artwork, marks, or UI. The web treatment is an original CSS approximation.

## Point of view

Chiaro Code makes practical tools around music lessons. The site should show both sides of that work: a calmer school pickup for RideReady, and a low-equipment start for students using Typing-to-MIDI. The generated festival image carries the brand metaphor. It is illustrative artwork, not a product screen or a claim about either tool.

Keep the real RideReady and Typing-to-MIDI images as their product identifiers. Do not invent a RideReady screenshot, customers, adoption numbers, testimonials, launch dates, or product behavior.

## Logo and motion

- The primary mark uses a simple planning grid, five music-staff lines, and two noteheads. Its SVG form is one color and remains legible at small sizes.
- The generated PNG is the full-color brand mark for the home-page caption and high-resolution browser icons. The SVG favicon uses the high-contrast monochrome mark.
- The mark animates once on entry. Staff lines unfold from the grid and notes rise into place. Hovering or focusing the home link pauses it. Reduced-motion users see the complete static mark.
- Keep motion short and tied to the planning-to-music story. Do not add autoplay audio, scroll reveals, parallax, or looping animation.
- Frosted transparency is reserved for the sticky navigation. Use a solid surface when reduced transparency is requested. Product information stays on opaque surfaces.

## Color roles

Contrast ratios use the WCAG relative-luminance formula. Text colors are measured on their stated surfaces.

| Role | Light | Dark | Contrast |
|---|---|---|---|
| Canvas | #EFF8FF | #0D2037 | Primary text: 12.94:1 light, 15.36:1 dark |
| Surface | #FFFFFF | #152B45 | Muted text: 4.99:1 light, 8.47:1 dark |
| Primary text | #102D4F | #F2F8FF | 12.94:1 light, 15.36:1 dark |
| Body text | #39546F | #DAE9F8 | 7.31:1 light, 13.29:1 dark |
| Supporting text | #58728D | #B6C9DD | 4.99:1 light, 8.47:1 dark |
| Link accent | #1D5FA7 | #9BCFFF | 6.02:1 light, 9.98:1 dark |
| Primary action | #145AA8 with white | #9BCFFF with #0D2037 | 6.87:1 light, 9.98:1 dark |

Festival coral and warm stage light belong in imagery only. Availability is always described in words as well as color.

## Type and shape

- Use the system UI family, including Segoe UI where available, with no remote font dependency.
- Keep body text at 16px or above. H1 is fluid from about 46px on narrow layouts to about 98px on wide layouts. Buttons and navigation links are at least 48px tall.
- Use weight and scale for hierarchy. Eyebrows are rare and name a real topic.
- Keep native kerning enabled. Tracking is optical by size: H1 −.045em, H2 −.035em, H3 −.025em; small feature headings relax to −.015em. Smaller headings use more leading rather than the display heading’s tight spacing. Preserve the established wordmark.
- Buttons use a consistent pill shape. Panels use a single rounded rectangle family. Content surfaces remain opaque.

## Layout

Keep the existing route structure and reading order. The home page leads with RideReady, follows with the planning-to-festival brand story, then shows RideReady and Typing-to-MIDI as distinct pathways. Products and pricing preserve their current details and availability.

    Wide home:   [RideReady message and actions] [RideReady icon and purpose]
                 [planning-to-festival image and caption]
                 [RideReady pathway] [Typing-to-MIDI pathway]

    Narrow home: [RideReady message]
                 [actions and pilot price]
                 [RideReady icon and purpose]
                 [planning-to-festival image and caption]
                 [RideReady pathway]
                 [Typing-to-MIDI pathway]

Use the same shell across pages. Paired sections stack at compact widths. Images keep their aspect ratios and links remain independently reachable at 320px and 200% zoom.

## Interaction and accessibility

- The header keeps its keyboard-operable mobile menu, Escape dismissal, current-page state, and skip link.
- Every interactive element has a visible focus ring. Navigation uses links and actions use buttons.
- The logo transition runs only for people who have not requested reduced motion. Hover or focus pauses it.
- A small decorative glass halo may follow a fine mouse pointer. Keep the native cursor, never intercept input, and never update React state on pointer movement. It is hidden until an eligible mouse moves; disable it for reduced motion, touch/no-hover, forced colors and reduced transparency. Hide it while selecting, scrolling or using the keyboard. Stop its animation frame loop at rest and clean up listeners on preference changes and unmount.
- Respect reduced transparency with an opaque navigation surface. Keep text contrast high without blur.
- Test light and dark appearances, keyboard access, reduced motion, reduced transparency, contrast, image alternatives, 320px layout, and 200% browser zoom before publishing.

## Product and privacy boundaries

- RideReady remains in development, with a limited pilot being prepared at $99 per device license per year. It is not a released download. Stripe setup stays test-only and paused; no live checkout or payment-to-license fulfillment is enabled.
- Typing-to-MIDI version 1.0.0 is available for macOS and Windows. It sends MIDI and needs a compatible instrument app and MIDI routing to produce sound.
- Do not include private finance prototypes, data, modules, secrets, or credentials in public routes, imports, build output, or client bundles.
- Do not change static hosting, workflow, or project linkage as part of this visual iteration.
