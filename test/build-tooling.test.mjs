import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { Miniflare } from 'miniflare';

void test('patched native image tooling processes a synthetic image and rejects malformed input', { timeout: 20000 }, async () => {
  const source = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8" fill="blue"/></svg>');
  const png = await sharp(source).resize(4, 4).png().toBuffer();
  const metadata = await sharp(png).metadata();
  assert.equal(metadata.width, 4);
  assert.equal(metadata.height, 4);
  assert.equal(metadata.format, 'png');
  await assert.rejects(sharp(Buffer.from('<svg')).metadata());
});

void test('stable local Worker tooling dispatches a synthetic request without external services', { timeout: 20000 }, async () => {
  const worker = new Miniflare({
    modules: true,
    compatibilityDate: '2026-07-22',
    script: 'export default { fetch() { return new Response("synthetic-worker-ok") } }',
  });
  try {
    const response = await worker.dispatchFetch('http://fixture/');
    assert.equal(response.status, 200);
    assert.equal(await response.text(), 'synthetic-worker-ok');
  } finally {
    await worker.dispose();
  }
});
