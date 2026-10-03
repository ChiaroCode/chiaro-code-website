/** Owner-approved pilot amounts. Billing period and renewal are not yet set. */
export const rideReadyPlans = [
  { name: '1 device', amount: 99 },
  { name: '2 devices', amount: 150 },
  { name: '5 devices', amount: 300 },
  { name: 'Unlimited + Support', amount: 800 },
] as const;

export const rideReadyPricingSummary =
  '1 device $99 · 2 devices $150 · 5 devices $300 · Unlimited + Support $800';

export const rideReadyBillingNote =
  'Billing period, renewal terms, and support details are being finalized. Checkout and automated license delivery are not enabled.';
