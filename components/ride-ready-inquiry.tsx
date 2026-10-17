'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type SyntheticEvent } from 'react';
import { formatRideReadyInquiry, rideReadyContactEmail, rideReadyMailto, type RideReadyBrief } from '@/lib/ride-ready-inquiry';
import styles from './ride-ready-inquiry.module.css';

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function RideReadyInquiry() {
  const [draft, setDraft] = useState<RideReadyBrief | null>(null);
  const [copyStatus, setCopyStatus] = useState('');
  const isReady = useSyncExternalStore(subscribe, clientReady, serverReady);
  const draftHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => { if (draft) draftHeading.current?.focus(); }, [draft]);

  function prepareDraft(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => {
      const entry = data.get(key);
      return typeof entry === 'string' ? entry : '';
    };
    setDraft({ name: value('name'), email: value('email'), location: value('location'), computers: value('computers'), network: value('network'), setup: value('setup') });
    setCopyStatus('');
  }

  async function copyDraft() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(formatRideReadyInquiry(draft));
      setCopyStatus('Inquiry copied. Review it in your email service before sending.');
    } catch {
      setCopyStatus('Copy is unavailable. Select and copy the inquiry below.');
    }
  }

  return (
    <div className={styles.panel}>
      <form className={styles.form} onSubmit={prepareDraft} onChange={() => { setDraft(null); setCopyStatus(''); }}>
        <p id="pilot-inquiry-help" className={styles.note}>Prepare a local email draft. Nothing is sent, purchased or reserved here. Review and send it yourself.</p>
        <p id="pilot-inquiry-privacy" className={styles.note}>Adult business details only. Do not include child or student names, rosters, pickup numbers, license codes or passwords.</p>
        <fieldset className={styles.fields} disabled={!isReady} aria-describedby="pilot-inquiry-help pilot-inquiry-privacy">
          <legend className={styles.srOnly}>Prepare a RideReady pilot inquiry</legend>
          <div className={styles.pair}>
            <label>Adult contact name<input name="name" autoComplete="name" maxLength={100} required /></label>
            <label>Business reply email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
          </div>
          <label>Organization / location<input name="location" autoComplete="organization" maxLength={150} placeholder="e.g. Example Music School, north location" required /></label>
          <label>Host computer<select name="computers" defaultValue="Not sure yet"><option>Not sure yet</option><option>Mac</option><option>Windows PC</option><option>Mac and Windows PC</option></select></label>
          <label>Phone and host network<select name="network" defaultValue="Not sure yet"><option>Not sure yet</option><option>Same Wi-Fi / local network</option><option>Separate networks / cellular</option></select></label>
          <label>Founding first-year setup preference<select name="setup" defaultValue="Discuss options"><option>Discuss options</option><option>$99 self setup</option><option>$149 with one guided setup session</option></select></label>
          <p className={styles.note}>Either founding option renews at $199 per location per year unless canceled. Includes a main and spare host; phones and displays do not count as hosts. Pilot availability must be confirmed.</p>
          <button className="button-link" type="submit">Prepare my pilot inquiry</button>
        </fieldset>
        <noscript><p>Email <a href={rideReadyMailto()}>{rideReadyContactEmail}</a> with your organization, adult contact and computer/network setup to discuss pilot availability.</p></noscript>
      </form>
      {draft && (
        <section className={styles.draft} aria-labelledby="pilot-draft-title">
          <h3 id="pilot-draft-title" ref={draftHeading} tabIndex={-1}>Your inquiry draft is ready.</h3>
          <p>It hasn’t been sent. Open your email app, review it, then press send.</p>
          <div className={styles.actions}>
            <a className="button-link" href={rideReadyMailto(draft)}>Open my email app</a>
            <button className={styles.copy} type="button" onClick={copyDraft}>Copy the inquiry</button>
          </div>
          <label>Your email draft<textarea rows={12} readOnly value={formatRideReadyInquiry(draft)} /></label>
          <output className={styles.note}>{copyStatus}</output>
        </section>
      )}
      <p className={styles.direct}>Prefer direct email? <a href={rideReadyMailto()}>{rideReadyContactEmail}</a>. If an email app doesn’t open, copy this address and your draft into your usual email service.</p>
    </div>
  );
}
