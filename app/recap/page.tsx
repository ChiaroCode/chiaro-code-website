import type { Metadata } from 'next';
import { RecapInquiry } from '@/components/recap-inquiry';
import styles from './recap.module.css';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Recap Pack — $150 Video Editing',
  description: 'Turn your event, performance or launch footage into one 30–60 second vertical video and two cutdowns. $150 introductory editing package. Inquire to confirm scope and delivery.',
  alternates: { canonical: 'https://chiarocode.com/recap/' },
  openGraph: { title: 'Your footage. Three posts. | Chiaro Code', description: '$150 Recap Pack: one vertical recap, two cutdowns and one revision. You supply the footage; scope and delivery are confirmed before booking.', url: 'https://chiarocode.com/recap/', type: 'website', images: [{ url: 'https://chiarocode.com/images/chiaro-code-mark.png', alt: 'Chiaro Code' }] },
};

const outputs = [
  { number: '01', name: 'The recap', detail: 'One 30–60 second vertical video with a clear opening, selected highlights and an ending.' },
  { number: '02', name: 'Two cutdowns', detail: 'Two shorter edits drawn from the same footage, ready for separate posts.' },
  { number: '03', name: 'One revision', detail: 'One consolidated round of changes within the agreed brief, before the final exports.' },
];

export default function RecapPage() {
  return (
    <div className={styles.page}>
      <section className={`${styles.hero} shell`} aria-labelledby="recap-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Chiaro Code / video editing</p>
          <h1 id="recap-title">The event is over.<br /><span>Keep it in the feed.</span></h1>
          <p className={styles.lede}>For clubs, performers and small brands with footage worth sharing. Turn the clips you already have into a vertical recap and two shorter posts.</p>
          <div className={styles.offerLine}><strong>$150 <span>USD</span></strong><span>Introductory Recap Pack<br />Editing from your footage</span></div>
          <a className="button-link" href="#inquire">Tell us about your footage <span aria-hidden="true">↗</span></a>
          <p className={styles.heroNote}>Scope and delivery date confirmed before booking or payment.</p>
        </div>
        <figure className={styles.packageFigure}>
          <div className={styles.packageIllustration}>
            <div className={styles.slateTop}><span>RECAP PACK</span><span>9:16 / MP4</span></div>
            <div className={styles.slateTitle}>Your footage.<br /><span>Three posts.</span></div>
            <div className={styles.editSequence} aria-label="Example edit structure"><span>Opening</span><span>Highlights</span><span>Ending</span></div>
            <div className={styles.slateOutputs}><div><strong>1</strong><span>30–60s recap</span></div><div><strong>2</strong><span>shorter cutdowns</span></div></div>
            <div className={styles.slateBottom}><span>You bring the moments.</span><span>We shape the edit.</span></div>
          </div>
          <figcaption>Package illustration. No client footage is shown.</figcaption>
        </figure>
      </section>

      <section className={`${styles.deliverables} shell`} aria-labelledby="deliverables-title">
        <div className={styles.sectionHeading}><h2 id="deliverables-title">One brief.<br />A small set of good edits.</h2><p>A defined package you can understand before committing.</p></div>
        <div className={styles.outputList}>{outputs.map(output => <article className={styles.outputRow} key={output.number}><span className={styles.number}>{output.number}</span><h3>{output.name}</h3><p>{output.detail}</p></article>)}</div>
        <div className={styles.scopeNote}><strong>What’s included for $150</strong><p>Up to 15 minutes of client-provided footage. Basic cuts, pacing, titles or captions, and light color and audio adjustments. Final vertical MP4 exports. One revision within the agreed brief.</p></div>
      </section>

      <section className={styles.processBand} aria-labelledby="process-title"><div className={`${styles.process} shell`}>
        <div><p className={styles.eyebrow}>From camera roll to recap</p><h2 id="process-title">Start with the clips.<br />Agree on the edit.</h2></div>
        <ol className={styles.steps}>
          <li><h3>Describe the project.</h3><p>Tell us what happened, who the video is for, your footage length and your ideal delivery date.</p></li>
          <li><h3>Confirm the plan.</h3><p>We review whether it fits the pack and confirm final scope, delivery date, file sharing and payment arrangements before you book.</p></li>
          <li><h3>Review, revise, post.</h3><p>Review the first edit, send one combined set of notes and receive the final recap and cutdowns.</p></li>
        </ol>
      </div></section>

      <section className={`${styles.details} shell`} aria-labelledby="details-title">
        <h2 id="details-title">A few things to know.</h2>
        <div className={styles.faqs}>
          <details open><summary>Do you film the event?</summary><p>This pack covers editing only. You supply the footage. It works best with a selection of usable phone or camera clips and a clear goal.</p></details>
          <details><summary>When will I get the videos?</summary><p>Your delivery date is agreed after the footage and brief are reviewed. Please include your ideal date in the inquiry; availability is confirmed before you book.</p></details>
          <details><summary>What about music, captions and footage quality?</summary><p>Provide any required wording and only footage, logos or music you have permission to use. Music selection and usage rights are confirmed with the brief. Editing cannot recover missing footage or guarantee a fix for severely blurred video or distorted audio.</p></details>
          <details><summary>Can I add more footage or a bigger edit?</summary><p>Extra footage, additional revisions, filming, advanced effects and longer or differently formatted videos fall outside this pack. Any changed scope and price must be agreed before work starts.</p></details>
          <details><summary>Does this inquiry charge me or reserve a slot?</summary><p>No. This page prepares an email draft for you to review and send. It takes no payment and does not reserve a date. Booking and payment arrangements are confirmed separately.</p></details>
        </div>
      </section>

      <section className={`${styles.inquiry} shell`} id="inquire" aria-labelledby="inquiry-title">
        <div className={styles.inquiryIntro}><p className={styles.eyebrow}>Let’s see if it fits</p><h2 id="inquiry-title">What have<br />you captured?</h2><p>A club showcase, a gig, a launch, a few great moments. Start with a short description. Share files after we agree on a way to send them.</p><p className={styles.inquiryPrice}>Recap Pack <strong>$150 USD</strong></p><p className={styles.privacyNote}>The draft stays on your device until you send it through your email service. This form does not upload footage or store your answers.</p></div>
        <RecapInquiry />
      </section>
    </div>
  );
}
