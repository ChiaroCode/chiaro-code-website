import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../lib/recap-inquiry.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const { formatRecapInquiry, recapContactEmail, recapInquirySubject, recapMailto } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
const brief = { name: 'Jo & Lee', email: 'jo+video@example.com', project: 'Showcase #1', deadline: 'November 6', footage: '8 minutes, phone clips', brief: 'A résumé of the show 🎸\nEnd with “See you next week!” & keep captions.' };

test('mail client receives the original Unicode, line breaks, plus sign and ampersand', () => {
  const url = new URL(recapMailto(brief));
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, recapContactEmail);
  assert.equal(url.searchParams.get('subject'), recapInquirySubject);
  assert.equal(url.searchParams.get('body'), formatRecapInquiry(brief));
  assert.ok(recapMailto(brief).includes('%20'));
});

test('visitor text cannot add mail recipients or mail headers', () => {
  const url = new URL(recapMailto({ ...brief, project: 'My event&cc=stranger@example.com', name: 'Name\r\nBcc: stranger@example.com' }));
  assert.equal(url.pathname, recapContactEmail);
  assert.deepEqual([...url.searchParams.keys()], ['subject', 'body']);
  assert.equal(url.searchParams.get('subject'), recapInquirySubject);
});

test('long inputs are bounded while the inquiry retains the review-before-booking condition', () => {
  const body = formatRecapInquiry({ ...brief, brief: 'x'.repeat(10000), name: ' '.repeat(5) + 'N'.repeat(500), deadline: '', footage: '' });
  assert.ok(body.length < 2200);
  assert.ok(body.includes('Name: ' + 'N'.repeat(100) + '\n'));
  assert.ok(body.includes('Ideal delivery date: To be discussed'));
  assert.ok(body.includes('confirm fit, final scope, delivery date, and payment arrangements before I book'));
});

test('direct fallback opens a subject-only draft', () => {
  const url = new URL(recapMailto());
  assert.equal(url.searchParams.get('subject'), recapInquirySubject);
  assert.equal(url.searchParams.get('body'), null);
});
