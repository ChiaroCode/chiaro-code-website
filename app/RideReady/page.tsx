import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Monitor,
  Smartphone,
  Volume2,
} from 'lucide-react';
import { RideReadyDemo } from '@/components/ride-ready-demo';
import { MarketingMotion } from '@/components/marketing-motion';
import { RideReadyPricing } from '@/components/ride-ready-pricing';
import { rideReadyBillingNote } from '@/lib/ride-ready-pricing';
import { sitePath } from '@/lib/base-path';
import styles from './ride-ready.module.css';

const rideReadyTitle = 'RideReady — A clearer pickup line';
const rideReadyDescription =
  'Explore RideReady with an interactive pickup walkthrough: pair a phone, call a number, confirm its zone, and keep the shared board clear. Pilot and release availability.';
const rideReadyImage = {
  url: 'https://chiarocode.com/images/ride-ready-icon.jpg',
  width: 1080,
  height: 1080,
  type: 'image/jpeg',
  alt: 'RideReady app icon: a blue car with the numbers four, five, and six',
};
export const metadata: Metadata = {
  title: rideReadyTitle,
  description: rideReadyDescription,
  alternates: { canonical: 'https://chiarocode.com/RideReady/' },
  openGraph: {
    type: 'website',
    url: 'https://chiarocode.com/RideReady/',
    siteName: 'Chiaro Code',
    title: rideReadyTitle,
    description: rideReadyDescription,
    images: [rideReadyImage],
  },
  twitter: {
    card: 'summary',
    title: rideReadyTitle,
    description: rideReadyDescription,
    images: [rideReadyImage],
  },
};
export const dynamic = 'force-static';

export default function RideReadyPage() {
  return (
    <MarketingMotion className={styles.page}>
      <link
        rel="preload"
        href={sitePath('/fonts/geist-variable.woff2')}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <section
        className={`${styles.hero} shell`}
        aria-labelledby="rideready-title"
      >
        <div className={styles.productLabel}>
          <Image
            src={sitePath('/images/ride-ready-icon.jpg')}
            width={1080}
            height={1080}
            alt=""
            aria-hidden="true"
          />
          <span>RideReady</span>
          <span className={styles.heroStatus}>Pilot in development</span>
        </div>
        <h1 id="rideready-title" data-motion-enter>
          A calmer way
          <br />
          to call the next ride.
        </h1>
        <p className={styles.heroLede}>
          From the pickup line to the room inside.
          <br className={styles.wideBreak} /> One number, one clear place to
          look.
        </p>
        <div className={styles.actions}>
          <a className="button-link" href="#how-it-works">
            Try the walkthrough <ArrowDown size={17} aria-hidden="true" />
          </a>
          <a className="text-link" href="#download">
            Download &amp; availability
          </a>
        </div>
        <div
          className={styles.heroBoard}
          aria-label="Illustration of a shared pickup board with fictional numbers"
        >
          <div className={styles.boardTop}>
            <span>
              <span className={styles.dot} /> Shared pickup board
            </span>
            <span>Illustration</span>
          </div>
          <div className={styles.heroNumbers} aria-hidden="true">
            <div>
              <span>Zone A</span>
              <strong>247</strong>
              <span>Called</span>
            </div>
            <div>
              <span>Zone B</span>
              <strong>408</strong>
              <span>Called</span>
            </div>
            <div>
              <span>Zone A</span>
              <strong>156</strong>
              <span>Called</span>
            </div>
          </div>
          <div className={styles.boardBottom}>
            <span>Easy to call. Easy to see.</span>
            <span>Fictional example numbers</span>
          </div>
        </div>
      </section>

      <section
        className={`${styles.flowSection} shell`}
        id="how-it-works"
        aria-labelledby="flow-title"
      >
        <div className={styles.sectionHeading}>
          <div>
            <p className="section-label">Follow a number</p>
            <h2 id="flow-title">
              Five steps.
              <br />
              One shared picture.
            </h2>
          </div>
          <p>
            Tap through the pickup flow. Change the example number, choose a
            zone, and see how a call reaches the board.
          </p>
        </div>
        <RideReadyDemo />
      </section>

      <section className={styles.benefitBand} aria-labelledby="benefit-title">
        <div className="shell">
          <div className={styles.sectionHeading}>
            <div>
              <p className="section-label">Room to focus</p>
              <h2 id="benefit-title">
                The practical part,
                <br />a little clearer.
              </h2>
            </div>
            <p>
              RideReady is being built around the small decisions that keep a
              busy pickup moving.
            </p>
          </div>
          <div className={styles.benefits}>
            <article>
              <Smartphone size={27} aria-hidden="true" />
              <h3>Work from the line.</h3>
              <p>
                Pair a phone browser with the host so the controller can be
                where staff are needed. Local pairing is part of the pilot;
                online relay testing is in progress.
              </p>
            </article>
            <article>
              <Monitor size={27} aria-hidden="true" />
              <h3>Keep the room in view.</h3>
              <p>
                A separate shared board keeps called numbers visible. Zone
                confirmation, introduced in the 2.3.0 preview, gives a call a
                destination before it reaches the display.
              </p>
            </article>
            <article>
              <Volume2 size={27} aria-hidden="true" />
              <h3>Make the call clear.</h3>
              <p>
                Spoken number announcements complement the board. Optional
                chimes and their sound controls are being integrated for the
                next release.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className={`${styles.releaseSection} shell`}
        aria-labelledby="release-title"
        data-scroll-story
      >
        <div data-pin-title>
          <p className="section-label">In progress</p>
          <h2 id="release-title">
            A fresh session.
            <br />A familiar flow.
          </h2>
          <p className={styles.releaseLede}>
            The next version is being prepared with a simpler online setup and
            more control over announcements.
          </p>
        </div>
        <div className={styles.releaseDetails}>
          <span className={styles.pilotBadge}>
            Planned for 2.4.0 · not yet released
          </span>
          <ul>
            <li>
              <Check size={18} aria-hidden="true" />
              <div>
                <strong>A fresh pairing session</strong>
                <p>
                  An isolated online relay session and a new QR code each time a
                  licensed host starts.
                </p>
              </div>
            </li>
            <li>
              <Check size={18} aria-hidden="true" />
              <div>
                <strong>Connections that close with the host</strong>
                <p>
                  Session revocation on close, with a 30-second lease to expire
                  a connection after a crash.
                </p>
              </div>
            </li>
            <li>
              <Check size={18} aria-hidden="true" />
              <div>
                <strong>Your announcement, your sound</strong>
                <p>
                  Two optional MP3 chimes before speech, with a selector, volume
                  control, toggle, and preview.
                </p>
              </div>
            </li>
            <li>
              <Check size={18} aria-hidden="true" />
              <div>
                <strong>A way to check for updates</strong>
                <p>
                  An update checker to help the host find the current published
                  release.
                </p>
              </div>
            </li>
          </ul>
          <p className={styles.smallPrint}>
            These additions are under development. The walkthrough is an
            illustration, and does not connect a phone or a real pickup board.
          </p>
        </div>
      </section>

      <section
        className={styles.downloadBand}
        id="download"
        aria-labelledby="download-title"
      >
        <div className={`shell ${styles.downloadLayout}`}>
          <div>
            <p className="section-label">Download &amp; availability</p>
            <h2 id="download-title">Getting RideReady.</h2>
            <p className={styles.releaseLede}>
              The current stable release is 2.2.1. Version 2.3.0 is a zoning
              preview; 2.4.0 is still being developed.
            </p>
            <p className={styles.smallPrint}>
              Preview/test installers: macOS apps are ad-hoc signed and not
              notarized; Windows installers are unsigned. Production license
              activation is not configured.
            </p>
          </div>
          <div className={styles.availabilityCard}>
            <span className={styles.pilotBadge}>Stable version 2.2.1</span>
            <h3>RideReady pilot</h3>
            <RideReadyPricing />
            <p>{rideReadyBillingNote}</p>
            <p>
              Public download access is being prepared. Verified installer links
              will appear here when available.
            </p>
            <a
              className="button-link"
              href={sitePath('/pricing#ride-ready-status')}
            >
              Pilot pricing &amp; status{' '}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <p className={styles.smallPrint}>
              Version 2.4.0 is in development and is not a published download.
            </p>
          </div>
        </div>
      </section>
    </MarketingMotion>
  );
}
