import type { Metadata } from 'next';
import Image from 'next/image';
import { sitePath } from '@/lib/base-path';
import { midiDownloads, midiGuideUrl, midiReleaseUrl } from '@/lib/typing-to-midi';

export const metadata: Metadata = {
  title: 'Products',
  description: 'RideReady simplifies program logistics. Typing-to-MIDI makes a typing keyboard a way into music creation. Two tools for frictionless access to music education.',
};
export const dynamic = 'force-static';

const rideReadyFeatures = [
  { title: 'One shared queue', text: 'Keep called numbers synchronized between a focused controller and a separate, fullscreen-friendly display.' },
  { title: 'Quick corrections', text: 'Adjust repeated calls or remove a number from the controller as the pickup line moves.' },
  { title: 'Control from a phone', text: 'Pair a browser or phone over the local network so staff can work where they are needed.' },
  { title: 'A readable room', text: 'Flexible grid capacity, optional counts, and light or dark themes help keep the queue clear.' },
];
const midiFeatures = [
  { title: 'Use the keys you have', text: 'Play notes and chords from your typing keyboard, or click and touch the on-screen keys.' },
  { title: 'Shape each phrase', text: 'Adjust octave and velocity, hold sustain, and add pitch bend or modulation with keyboard controls.' },
  { title: 'Connect your instrument', text: 'Choose a MIDI output and channel to send notes to a compatible standalone instrument or music application.' },
  { title: 'Start with less equipment', text: 'Explore virtual instruments without buying or carrying a separate MIDI keyboard.' },
];

export default function ProductsPage() {
  return (
    <>
      <section className="products-hero shell" aria-labelledby="products-title">
        <p className="section-label">Our tools</p>
        <h1 id="products-title">Less in the way.<br />More possibility.</h1>
        <div className="products-hero-bottom">
          <p className="products-lede">A school’s daily logistics and a student’s first creative steps belong to the same story. Our tools remove friction at both ends.</p>
          <nav className="product-index" aria-label="On this page">
            <a href="#ride-ready">01 / RideReady <span>For schools</span></a>
            <a href="#typing-to-midi">02 / Typing-to-MIDI <span>For students</span></a>
          </nav>
        </div>
      </section>

      <section className="shell ride-ready" id="ride-ready" aria-labelledby="ride-ready-title">
        <div className="product-icon-wrap">
          <Image className="product-icon" src={sitePath('/images/ride-ready-icon.png')} alt="RideReady app icon: a blue car with the numbers four, five, and six" width={1080} height={1080} priority />
          <p className="product-caption">For schools &amp; after-school programs</p>
        </div>
        <div className="product-content">
          <div className="product-register"><span className="product-number">01 / Operational friction</span><span className="status-pill">In development</span></div>
          <div className="product-heading">
            <span className="product-category">A calmer pickup line</span>
            <h2 id="ride-ready-title">RideReady</h2>
          </div>
          <div className="product-copy">
            <p>Running a music program means coordinating everything around the lesson, too. RideReady is being built to give staff a clear, synchronized way to call numbers and manage a busy pickup line.</p>
            <p>A dedicated controller manages the queue, while a shared display keeps called numbers visible. Less back-and-forth means more attention for the students in front of you.</p>
          </div>
          <div className="feature-list" aria-label="RideReady features in development">
            {rideReadyFeatures.map((feature) => <article className="feature-item" key={feature.title}><h3>{feature.title}</h3><p>{feature.text}</p></article>)}
          </div>
          <div className="availability-note" id="downloads">
            <p className="section-label">Development status</p>
            <h3>Still being built with care.</h3>
            <p>RideReady is not ready to ship. Downloads, release timing, and pricing are not yet available.</p>
          </div>
        </div>
      </section>

      <section className="shell midi-product" id="typing-to-midi" aria-labelledby="midi-title">
        <div className="midi-intro">
          <div>
            <div className="product-register"><span className="product-number">02 / Hardware friction</span><span className="status-pill">Version 1.0.0</span></div>
            <Image className="midi-app-icon" src={sitePath('/images/typing-to-midi-icon.png')} alt="Typing-to-MIDI Controller app icon: piano keys with a glowing blue key and purple notes" width={1254} height={1254} />
            <span className="product-category">Your keyboard. Your starting point.</span>
            <h2 id="midi-title">Typing-to-MIDI</h2>
          </div>
          <div className="product-copy">
            <p>A first step into music creation should not depend on owning a MIDI keyboard. Typing-to-MIDI turns the QWERTY keyboard on a laptop into a controller for virtual instruments.</p>
            <p>Explore a synth, try a chord, or work through an idea wherever you have your laptop and music software. A separate hardware controller is optional.</p>
          </div>
        </div>
        <figure className="product-screenshot">
          <Image src={sitePath('/images/typing-to-midi.png')} alt="Typing-to-MIDI Controller showing piano notes mapped to typing keys, with octave, velocity, sustain, pitch bend, and MIDI output controls" width={2320} height={1380} />
          <figcaption>The desktop controller · Typing keys become musical controls.</figcaption>
        </figure>
        <div className="feature-list midi-features" aria-label="Typing-to-MIDI benefits">
          {midiFeatures.map((feature) => <article className="feature-item" key={feature.title}><h3>{feature.title}</h3><p>{feature.text}</p></article>)}
        </div>
        <div className="midi-setup">
          <div><p className="section-label">Before you play</p><h3>Connect it to your sound.</h3></div>
          <div><p>Typing-to-MIDI sends MIDI notes; it does not produce audio on its own. You’ll need a MIDI-capable instrument or music app and a physical or virtual MIDI port. Select the same port in both apps to start playing.</p><a className="button-link" href={midiGuideUrl}>Read the setup guide</a></div>
        </div>
        <div className="downloads" id="midi-downloads">
          <div className="downloads-header"><div><p className="section-label">Typing-to-MIDI downloads</p><h3>Choose your platform.</h3></div><a className="button-link" href={midiReleaseUrl}>Release notes</a></div>
          <p className="download-note">These early builds may trigger operating-system security prompts. macOS builds are ad-hoc signed and not notarized; Windows builds are unsigned. Apple silicon has been runtime-tested; Intel Mac and Windows builds have not.</p>
          <div className="download-grid">
            {midiDownloads.map((download) => <div className="download-card" key={download.file}><strong>{download.platform}</strong><span>{download.format}</span><a className="button-link" href={download.href} aria-label={`Download Typing-to-MIDI for ${download.platform}`}>Download</a></div>)}
          </div>
        </div>
      </section>

      <section className="products-note" aria-labelledby="product-note-title">
        <div className="products-note-inner shell"><p className="section-label">One shared purpose</p><p id="product-note-title">Give schools more room to teach. Give students more ways to create.</p></div>
      </section>
      <section className="section closing-section" aria-labelledby="pricing-link-title">
        <div className="closing-inner shell"><div><p className="section-label">Next steps</p><h2 id="pricing-link-title">Know what’s available.</h2></div><a className="button-link" href={sitePath('/pricing')}>Pricing &amp; availability</a></div>
      </section>
    </>
  );
}
