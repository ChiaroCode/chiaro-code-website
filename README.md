# Chiaro Code

Production-ready static website for Chiaro Code, a music education software company. The site is built with Next-compatible React components and statically exported for fast, low-maintenance hosting.

## Pages

- Home, including the complete About Us section
- Products, featuring RideReady and desktop downloads
- Pricing, currently marked TBD

## Add RideReady installers

1. Copy the Windows installer to `public/downloads/RideReady-Setup.exe`.
2. Copy the macOS installer to `public/downloads/RideReady.dmg`.
3. Open `lib/ride-ready.ts` and change the matching platform's `available` value from `false` to `true`.

The corresponding download link will then be included automatically the next time the site is built.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Static output is written to `dist/client`. The included GitHub Actions workflow deploys that directory to GitHub Pages whenever the `main` branch is updated.
