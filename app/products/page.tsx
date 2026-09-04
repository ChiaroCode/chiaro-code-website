import type { Metadata } from 'next';
import Image from 'next/image';
import { sitePath } from '@/lib/base-path';
import { rideReadyDownloads } from '@/lib/ride-ready';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Meet RideReady, a synchronized number calling and display system for ride lines, events, and other live queues.',
};
export const dynamic = 'force-static';

const features = [
  {
    title: 'Fast number entry',
    text: 'Enter called numbers from the Controller window. Repeating a number increases its count automatically.',
  },
  {
    title: 'Compact live control',
    text: 'Click a number in the controller grid to decrement its count, or Shift-click to remove it completely.',
  },
  {
    title: 'Clear public display',
    text: 'A fullscreen-friendly grid puts the most frequently called numbers first, with optional count visibility.',
  },
  {
    title: 'Remote controllers',
    text: 'Connect a phone or browser over the local network with a QR code, regenerate pairing, or disconnect controllers.',
  },
  {
    title: 'Flexible capacity',
    text: 'Keep the default limit of 30 unique numbers for a disciplined grid, or disable the limit when an event needs more.',
  },
  {
    title: 'Comfortable in any setting',
    text: 'Light, dark, and system theme modes keep both working windows legible throughout the day.',
  },
];

export default function ProductsPage() {
  return (
    <>
      <section className="products-hero shell" aria-labelledby="products-title">
        <p className="section-label">Products</p>
        <h1 id="products-title">Software in service of the music.</h1>
        <div className="products-hero-bottom">
          <p className="products-lede">Our product collection begins with one carefully defined tool: RideReady, a calm, synchronized way to manage called numbers across busy live environments.</p>
          <p className="product-count">Current collection<br />01 product</p>
        </div>
      </section>

      <section className="shell ride-ready" aria-labelledby="ride-ready-title">
        <div className="product-icon-wrap">
          <Image
            className="product-icon"
            src={sitePath('/images/ride-ready-icon.png')}
            alt="RideReady app icon: a blue car with the numbers four, five, and six"
            width={1080}
            height={1080}
            priority
          />
        </div>
        <div className="product-content">
          <span className="product-number">01 / 01</span>
          <div className="product-heading">
            <span className="product-category">Live queue control &amp; display</span>
            <h2 id="ride-ready-title">RideReady</h2>
          </div>
          <div className="product-copy">
            <p>RideReady is an Electron app for tracking called or entered numbers in real time. A focused Controller window handles entry and changes, while a separate, fullscreen-friendly Display window keeps the live queue visible to everyone. Every update stays synchronized across the controller, display, and connected remote controllers.</p>
            <p className="product-audience"><strong>Created for:</strong> ride-line coordinators, event teams, schools, and anyone managing a numbered live queue.</p>
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
          <p id="product-note-title">Built to make a busy queue readable, responsive, and easy to control from wherever the work is happening.</p>
        </div>
      </section>

      <section className="section closing-section" aria-labelledby="pricing-link-title">
        <div className="closing-inner shell">
          <div>
            <p className="section-label">Availability</p>
            <h2 id="pricing-link-title">Plan for RideReady.</h2>
          </div>
          <a className="button-link" href={sitePath('/pricing')}>View pricing details</a>
        </div>
      </section>
    </>
  );
}
