# Stripe test checkout and fulfillment boundary

## Website behavior

The pricing page shows RideReady pilot pricing of $99 per device license per year. A customer can buy 1, 2, 5, 10, or 20 seats at $99 each: 5 seats are $495/year, 10 are $990/year, and 20 are $1,980/year, before applicable tax. Stripe checkout is a separate hosted link and remains unavailable in this checkout because no test Payment Link has been supplied. If test URLs are later set at build time, the page accepts only `https://buy.stripe.com/test_<id>` and sends the visitor to Stripe-hosted test checkout. A live-mode URL is rejected. Stripe Payment Links can sell subscriptions and can permit adjustable item quantities when that setting is enabled on the link. See [Create a Payment Link](https://docs.stripe.com/payment-links/create), [customize Payment Links](https://docs.stripe.com/payment-links/customize), and [test cards](https://docs.stripe.com/testing).

Build-time variables (public links only):

```text
NEXT_PUBLIC_STRIPE_TEST_RIDEREADY_URL=
NEXT_PUBLIC_STRIPE_TEST_SUPPORT_URL=
```

Do not put Stripe API keys or webhook secrets in these variables. Do not set these values until verified links have been copied from the Stripe test-mode Dashboard. Before enabling the RideReady test link, verify the Stripe product, recurring annual interval, $99 per seat amount/currency, applicable tax behavior, and adjustable quantity boundaries that allow at least 1, 2, 5, 10, and 20 seats. The URL guard validates only the public test-link host and path; it cannot inspect the Stripe product, amount, billing interval, minimum/maximum quantity, tax settings, or collection settings. Before enabling the support test link, verify its one-time customer-chosen amount configuration and terms. This site is a static export; it has no webhook, database, authenticated admin, or license service. The test checkout page cannot create a real order or issue a license. No payment links, price IDs, keys, webhook endpoints, or external services are configured in the repository.

## Support payment

“Buy Chiaro Code a coffee” is a separate, optional one-time support payment and does not purchase a RideReady seat. Stripe Payment Links support one-time “customers choose what to pay” checkout; this type does not support recurring payments. No support amount, link, or production donation setup has been chosen. See [Stripe’s payment-link pricing models](https://docs.stripe.com/payment-links/create).

## Production fulfillment design (not implemented)

Use a verified server-side webhook receiver and durable order ledger before offering real checkout. A static browser redirect or a client-supplied “success” value is not proof of payment. Stripe documents `checkout.session.completed` for Payment Link fulfillment, while some payment methods complete asynchronously; verify the current payment/subscription state before fulfillment and handle applicable delayed-success/failure events. See [After a Payment Link payment](https://docs.stripe.com/payment-links/post-payment), [webhooks](https://docs.stripe.com/webhooks), and [test Billing](https://docs.stripe.com/billing/testing).

Proposed subscription lifecycle:

1. Create a server-owned plan mapping for the allowed annual product and seat quantity. Verify amount, currency, price, quantity, business contact, order reference, and Stripe account before recording entitlement. Keep test and live data separated.
2. Verify each webhook signature against the raw body. Persist Stripe event IDs with unique constraints and make event handling idempotent. For a repeated event or session, return the existing result. A separate test/live signing secret belongs in the host secret store, never in the website bundle.
3. Confirm paid state from Stripe before enabling an order. For annual subscriptions, set each issued device license’s `expiresAt` to the paid subscription period end in UTC. Extend only after confirmed renewal payment; do not grant an extra year from device activation or `checkout.session.completed` alone. A failed renewal does not extend the license. Define refund/dispute, cancellation-at-period-end, immediate cancellation, quantity reductions, and grace-period policy before accepting live subscriptions.
4. Continue to collect each computer’s original `.rreq`. After payment and admin review, issue one `.lic` per unique device using RideReady’s existing signer and current claim format. Its offline format is device-bound and cannot enforce a shared live 5/10/20-seat pool; the order ledger must enforce the purchased seat count. RideReady enforces a finite license’s `expiresAt` at the exact `now >= expiresAt` boundary during an active session: licensed functionality ends, application windows and network services close, and the activation screen reports `EXPIRED`. Expiry is also checked on import, app start, resume, activation, and focus. Offline revocation is not immediate.
5. Email only after payment is confirmed and the matching `.lic` files have been generated and reviewed. Today the existing issuer requires a hidden passphrase prompt, and the separate Gmail send flow requires a human to confirm `SEND`. It cannot safely run unattended. Fully automatic issuance needs a dedicated, restricted signer or managed key service, validated device request intake, durable idempotency, and an explicit policy for key custody. Automated email additionally needs a verified `chiarocode.com` sender, approved delivery provider/token, bounce handling, and an owner-approved message path.

## Domain and sender status

The source materials inspected for this task included a historical domain-purchase email naming `chiarocode.com`, `admin@chiarocode.com`, and Squarespace Domains. That is evidence of intended spelling and a past purchase, not proof of current registration, DNS, website ownership, or mail control. The requested `noreply@chiarocode.com` sender has not been verified or configured. Do not configure DNS, sender authentication, credentials, or a production webhook until the owner verifies control and approves the target host.

## Test sequence after a test account/link and approved endpoint exist

- Use Stripe test/sandbox objects and test cards only; do not enter real payment details.
- Test a successful initial annual checkout, unpaid/processing session, failure, delayed success/failure if a delayed method is enabled, event replay, different event IDs for the same session, and a second paid session for the same order.
- Reject invalid signatures, unknown orders, mismatched quantity/amount/currency/price, and test/live account mismatches.
- Verify period-end `expiresAt` uses the current paid-through value, successful renewal extends it once, failed renewal leaves it unchanged, and cancellation/refund/dispute behavior matches the approved policy.
- Confirm no `.lic` is signed before payment confirmation and admin eligibility review; confirm email is not sent until signing succeeds. Test duplicate delivery/idempotency without creating duplicate seat batches.

This checklist is design guidance, not an implemented payment service.
