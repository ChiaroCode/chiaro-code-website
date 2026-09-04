import type { Metadata } from 'next';
import Image from 'next/image';
import { sitePath } from '@/lib/base-path';
import { rideReadyDownloads } from '@/lib/ride-ready';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Meet Ride Ready, the first music education application from Chiaro Code.',
};
export const dynamic = 'force-static';

const features = [
  {
    title: 'Purposeful practice',
    text: 'Students receive a clear musical focus for every session, turning assignments into specific, achievable work.',
  },
  {
    title: 'Thoughtful feedback',
    text: 'Guidance supports attentive listening and reflection while preserving the student’s own musical judgement.',
  },
  {
    title: 'Rehearsal readiness',
    text: 'Educators see where preparation is secure and where focused instruction will make the greatest difference.',
  },
  {
    title: 'Designed for ensembles',
    text: 'Individual work remains connected to repertoire, section goals, and the shared responsibility of performance.',
  },
];

export default function ProductsPage() {
  return (
    <>
      <section className="products-hero shell" aria-labelledby="products-title">
        <p className="section-label">Products</p>
        <h1 id="products-title">Software in service of the music.</h1>
        <div className="products-hero-bottom">
          <p className="products-lede">Our product collection begins with one carefully defined tool: Ride Ready, a more considered path from individual practice to collective rehearsal.</p>
          <p className="product-count">Current collection<br />01 product</p>
        </div>
      </section>

      <section className="shell ride-ready" aria-labelledby="ride-ready-title">
        <div className="product-icon-wrap">
          <Image
            className="product-icon"
            src={sitePath('/images/ride-ready-icon.png')}
            alt="Ride Ready app icon: a blue car with the numbers four, five, and six"
            width={1080}
            height={1080}
            priority
          />
        </div>
        <div className="product-content">
          <span className="product-number">01 / 01</span>
          <div className="product-heading">
            <span className="product-category">Practice &amp; ensemble readiness</span>
            <h2 id="ride-ready-title">Ride Ready</h2>
          </div>
          <div className="product-copy">
            <p>Ride Ready helps developing musicians arrive prepared. It gives students a focused way to understand, complete, and reflect on their practice while giving educators a clearer view of ensemble readiness before rehearsal begins.</p>
            <p className="product-audience"><strong>Created for:</strong> student musicians, private teachers, ensemble directors, and school music programs.</p>
          </div>

          <div className="feature-list" aria-label="Ride Ready benefits">
            {features.map((feature) => (
              <article className="feature-item" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>

          <div className="downloads" id="downloads">
            <div className="downloads-header">
              <div>
                <p className="section-label">Desktop downloads</p>
                <h3>Choose your platform.</h3>
              </div>
              <span className="status-pill">Coming soon</span>
            </div>
            <div className="download-grid">
              {rideReadyDownloads.map((download) => (
                <div className="download-card" key={download.platform}>
                  <strong>{download.platform}</strong>
                  <span>{download.format}</span>
                  {download.available ? (
                    <a className="button-link" href={sitePath(download.href)} download>Download</a>
                  ) : (
                    <span className="button-link disabled" aria-disabled="true">Not yet available</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="products-note" aria-labelledby="product-note-title">
        <div className="products-note-inner shell">
          <p className="section-label">The Chiaro standard</p>
          <p id="product-note-title">Built for serious learning. Quiet enough to keep the musician’s attention where it belongs.</p>
        </div>
      </section>

      <section className="section closing-section" aria-labelledby="pricing-link-title">
        <div className="closing-inner shell">
          <div>
            <p className="section-label">Availability</p>
            <h2 id="pricing-link-title">Plan for Ride Ready.</h2>
          </div>
          <a className="button-link" href={sitePath('/pricing')}>View pricing details</a>
        </div>
      </section>
    </>
  );
}
