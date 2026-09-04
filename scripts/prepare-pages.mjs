import { copyFile, mkdir, rename, rm } from 'node:fs/promises';
const outputDirectory = new URL('../dist/client/', import.meta.url);

// Vinext writes prefixed Next assets into a nested repository directory.
// GitHub Pages already mounts the artifact at that repository path, so move
// _next back to the artifact root to prevent a duplicated URL segment.
const pagesBasePath = process.env.NEXT_PUBLIC_PAGES_BASE_PATH?.replace(/^\/+|\/+$/g, '');
if (pagesBasePath) {
  const nestedDirectory = new URL(`${pagesBasePath}/`, outputDirectory);
  await rename(new URL('_next/', nestedDirectory), new URL('_next/', outputDirectory));
  await rm(nestedDirectory, { recursive: true, force: true });
}

// GitHub Pages serves nested paths most reliably when each has an index file.
for (const route of ['products', 'pricing']) {
  const routeDirectory = new URL(`${route}/`, outputDirectory);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(new URL(`${route}.html`, outputDirectory), new URL('index.html', routeDirectory));
}
