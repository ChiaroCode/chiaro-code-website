'use client';

import { useState, useSyncExternalStore, type SyntheticEvent } from 'react';
import { formatRecapInquiry, recapContactEmail, recapMailto, type RecapBrief } from '@/lib/recap-inquiry';
import styles from '@/app/recap/recap.module.css';

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function RecapInquiry() {
  const [draft, setDraft] = useState<RecapBrief | null>(null);
  const [copyStatus, setCopyStatus] = useState('');
  const isReady = useSyncExternalStore(subscribe, clientReady, serverReady);

  function prepareDraft(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => { const entry = data.get(key); return typeof entry === 'string' ? entry : ''; };
    setDraft({ name: value('name'), email: value('email'), project: value('project'), deadline: value('deadline'), footage: value('footage'), brief: value('brief') });
    setCopyStatus('');
  }

  async function copyDraft() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(formatRecapInquiry(draft));
      setCopyStatus('Brief copied. Paste it into an email and send it when you’re ready.');
    } catch {
      setCopyStatus('Copy is unavailable in this browser. Select and copy the brief below.');
    }
  }

  return (
    <div className={styles.inquiryPanel}>
      <form className={styles.form} onSubmit={prepareDraft} onChange={() => { setDraft(null); setCopyStatus(''); }}>
        <p className={styles.formNote} id="inquiry-help">This prepares an email draft on your device. Nothing is sent or booked here. You’ll review and send the email yourself.</p>
        <fieldset className={styles.formFields} disabled={!isReady}>
        <legend className={styles.srOnly}>Prepare your Recap Pack inquiry</legend>
        <div className={styles.fieldPair}>
          <label>Your name<input name="name" autoComplete="name" maxLength={100} required /></label>
          <label>Reply email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
        </div>
        <label>Project or organization<input name="project" maxLength={150} placeholder="e.g. a club showcase or new song" required /></label>
        <div className={styles.fieldPair}>
          <label>Ideal delivery date <span>(optional)</span><input name="deadline" maxLength={100} placeholder="e.g. November 6" /></label>
          <label>Footage length / format <span>(optional)</span><input name="footage" maxLength={200} placeholder="e.g. 8 minutes, phone clips" /></label>
        </div>
        <label>What should your video do?<textarea name="brief" rows={4} maxLength={1000} placeholder="Tell us the event, audience, key moments and any caption or call to action." required /></label>
        <button type="submit" className={`button-link ${styles.submit}`} aria-describedby="inquiry-help">Prepare my inquiry</button>
        </fieldset>
        <noscript><p>To inquire without JavaScript, email <a href={recapMailto()}>{recapContactEmail}</a> with your project, footage length and ideal delivery date.</p></noscript>
      </form>
      {draft && (
        <section className={styles.draft} aria-labelledby="draft-title">
          <h3 id="draft-title">Your draft is ready.</h3>
          <output className={styles.outputNotice}>It hasn’t been sent. Open your email app, review it, then press send.</output>
          <div className={styles.draftActions}>
            <a className="button-link" href={recapMailto(draft)}>Open my email app</a>
            <button className={styles.copyButton} type="button" onClick={copyDraft}>Copy the brief</button>
          </div>
          <label className={styles.draftLabel}>Your email brief<textarea rows={12} readOnly value={formatRecapInquiry(draft)} /></label>
          <output className={styles.copyStatus}>{copyStatus}</output>
        </section>
      )}
      <p className={styles.directEmail}>Prefer a direct email? <a href={recapMailto()}>{recapContactEmail}</a>. If an email app doesn’t open, copy the address and brief into your usual email service.</p>
    </div>
  );
}
