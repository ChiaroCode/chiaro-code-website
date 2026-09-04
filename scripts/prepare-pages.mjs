import { copyFile, mkdir } from 'node:fs/promises';
const outputDirectory = new URL('../dist/client/', import.meta.url);

// GitHub Pages serves nested paths most reliably when each has an index file.
for (const route of ['products', 'pricing']) {
  const routeDirectory = new URL(`${route}/`, outputDirectory);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(new URL(`${route}.html`, outputDirectory), new URL('index.html', routeDirectory));
}
