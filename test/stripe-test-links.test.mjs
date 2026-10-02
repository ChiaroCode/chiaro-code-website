import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../lib/stripe-test-links.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const compiledModule = { exports: {} };
vm.runInNewContext(compiled, { module: compiledModule, exports: compiledModule.exports, process: { env: {} }, URL });
const { stripeTestPaymentLink } = compiledModule.exports;

test('accepts only the standard Stripe test Payment Link origin and path', () => {
  const valid = 'https://buy.stripe.com/test_eVa5nPg1j1wmfXq5kr';
  assert.equal(stripeTestPaymentLink(valid), valid);
});

test('rejects live, untrusted, credentialed, nonstandard-port, and modified URLs', () => {
  for (const value of [
    'https://buy.stripe.com/live_link_id',
    'https://example.com/test_link_id',
    'http://buy.stripe.com/test_link_id',
    'https://user:pass@buy.stripe.com/test_link_id',
    'https://buy.stripe.com:8443/test_link_id',
    'https://buy.stripe.com/test_link_id?redirect=live',
    'https://buy.stripe.com/test_link_id#fragment',
    'not a URL',
  ]) {
    assert.equal(stripeTestPaymentLink(value), null, `should reject ${value}`);
  }
});
