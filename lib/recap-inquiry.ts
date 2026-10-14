export const recapContactEmail = 'admin@chiarocode.com';
export const recapInquirySubject = 'Recap Pack inquiry — $150';

export type RecapBrief = {
  name: string;
  email: string;
  project: string;
  deadline: string;
  footage: string;
  brief: string;
};

const clean = (value: string, limit: number) => value.trim().slice(0, limit);

export function formatRecapInquiry(brief: RecapBrief): string {
  return [
    'Hi Chiaro Code,',
    '',
    'I’m interested in the $150 Recap Pack: one 30–60 second vertical edit, two shorter cutdowns, and one revision, using up to 15 minutes of my footage.',
    '',
    `Name: ${clean(brief.name, 100)}`,
    `Reply email: ${clean(brief.email, 254)}`,
    `Project / organization: ${clean(brief.project, 150)}`,
    `Ideal delivery date: ${clean(brief.deadline, 100) || 'To be discussed'}`,
    `Footage length / format: ${clean(brief.footage, 200) || 'To be discussed'}`,
    '',
    'What I want the video to do:',
    clean(brief.brief, 1000),
    '',
    'Please confirm fit, final scope, delivery date, and payment arrangements before I book.',
  ].join('\n');
}

export function recapMailto(brief?: RecapBrief): string {
  const query = new URLSearchParams({ subject: recapInquirySubject });
  if (brief) query.set('body', formatRecapInquiry(brief));
  // URLSearchParams uses + for spaces; mail clients expect percent encoding.
  return `mailto:${recapContactEmail}?${query.toString().replace(/\+/g, '%20')}`;
}
