# Chiaro Code

Chiaro Code's website presents **Frictionless Access** to music education: less operational friction for schools and fewer hardware barriers for students.

## Pages

- Home: mission, vision, and the connection between the two products.
- Products: RideReady in development; Typing-to-MIDI with setup guidance and published v1.0.0 downloads.
- Pricing: honest availability for each product, without unannounced pricing promises.

## Release policy

RideReady is **not ready to ship**. Do not add downloads, purchasing controls, or release dates without the owner's explicit release decision.

Typing-to-MIDI links are maintained in `lib/typing-to-midi.ts`. Verify release assets and the tagged setup guide when updating them. Keep signing and platform testing notes consistent with the release.

## Development and hosting

Run `npm ci`, then `npm run dev`. Run `npx tsc --noEmit` for type checking and `npm run build` for the static export in `dist/client`.

This checkout is linked to the existing Chiaro Code Site through `.openai/hosting.json`; preserve its project ID and current audience. The included GitHub Pages workflow is a separate, existing hosting option.
