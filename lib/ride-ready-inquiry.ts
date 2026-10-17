export const rideReadyContactEmail = 'admin@chiarocode.com';
export const rideReadyInquirySubject = 'RideReady pilot inquiry';

export type RideReadyBrief = {
  name: string;
  email: string;
  location: string;
  computers: string;
  network: string;
  setup: string;
};

const clean = (value: string, limit: number) => value.trim().slice(0, limit);

export function formatRideReadyInquiry(brief: RideReadyBrief): string {
  return [
    'Hi Chiaro Code,',
    '',
    'I’m interested in discussing RideReady pilot availability for one location.',
    '',
    `Adult business contact: ${clean(brief.name, 100)}`,
    `Reply email: ${clean(brief.email, 254)}`,
    `Organization / location: ${clean(brief.location, 150)}`,
    `Host computer: ${clean(brief.computers, 100) || 'To be discussed'}`,
    `Phone / host network: ${clean(brief.network, 100) || 'To be discussed'}`,
    `Setup preference: ${clean(brief.setup, 100) || 'To be discussed'}`,
    '',
    'I understand RideReady is a limited pilot in development. Checkout and production license activation are not enabled.',
    'Please confirm fit, availability, setup requirements and terms before any pilot or payment is agreed.',
  ].join('\n');
}

export function rideReadyMailto(brief?: RideReadyBrief): string {
  const query = new URLSearchParams({ subject: rideReadyInquirySubject });
  if (brief) query.set('body', formatRideReadyInquiry(brief));
  return `mailto:${rideReadyContactEmail}?${query.toString().replace(/\+/g, '%20')}`;
}
