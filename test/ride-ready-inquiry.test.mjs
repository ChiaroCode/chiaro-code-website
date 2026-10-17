import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../lib/ride-ready-inquiry.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const { formatRideReadyInquiry, rideReadyContactEmail, rideReadyInquirySubject, rideReadyMailto } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
const brief = { name: 'Jo & Lee', email: 'jo+pilot@example.com', location: 'École #1', computers: 'Mac', network: 'Same Wi-Fi / local network', setup: '$99 self setup' };

test('pilot draft preserves Unicode and symbols with the established recipient and subject', () => {
  const url = new URL(rideReadyMailto(brief));
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, 'admin@chiarocode.com');
  assert.equal(rideReadyContactEmail, url.pathname);
  assert.equal(url.searchParams.get('subject'), rideReadyInquirySubject);
  assert.equal(url.searchParams.get('body'), formatRideReadyInquiry(brief));
  assert.match(url.searchParams.get('body'), /jo\+pilot@example.com/);
  assert.match(url.searchParams.get('body'), /École #1/);
});

test('visitor input cannot add recipients or headers to the mailto query', () => {
  const url = new URL(rideReadyMailto({ ...brief, name: 'Name\r\nBcc: stranger@example.com', location: 'Example&cc=stranger@example.com' }));
  assert.equal(url.pathname, rideReadyContactEmail);
  assert.deepEqual([...url.searchParams.keys()], ['subject', 'body']);
  assert.equal(url.searchParams.get('subject'), rideReadyInquirySubject);
});

test('bounded draft retains pilot limitations and confirms fit before any agreement', () => {
  const body = formatRideReadyInquiry({ ...brief, name: 'N'.repeat(10000), computers: '', network: '', setup: '' });
  assert.ok(body.length < 1500);
  assert.match(body, /Adult business contact: N{100}\n/);
  assert.match(body, /Host computer: To be discussed/);
  assert.match(body, /Checkout and production license activation are not enabled/);
  assert.match(body, /before any pilot or payment is agreed/);
});

test('direct fallback prepares only a subject, with no visitor details', () => {
  const url = new URL(rideReadyMailto());
  assert.equal(url.pathname, rideReadyContactEmail);
  assert.deepEqual([...url.searchParams.keys()], ['subject']);
});
