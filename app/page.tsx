import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, Keyboard, Monitor } from 'lucide-react';
import { MarketingMotion } from '@/components/marketing-motion';
import { MusicMaterial } from '@/components/music-material';
import { TactileSurface, MagneticLink } from '@/components/tactile-surface';
import { ProductStoryChooser } from '@/components/product-story-chooser';
import { sitePath } from '@/lib/base-path';
import {
  rideReadyPricingSummary,
  rideReadyBillingNote,
} from '@/lib/ride-ready-pricing';
import styles from './home.module.css';

const homeTitle = 'Chiaro Code | Frictionless Access to Music Education';
const homeDescription =
  'Fewer barriers. More music. Chiaro Code builds practical tools for schools and students: RideReady for pickup logistics and Typing-to-MIDI for accessible music creation.';
const companyImage = {
  url: 'https://chiarocode.com/images/chiaro-code-mark.png',
  width: 1254,
  height: 1254,
  type: 'image/png',
  alt: 'Chiaro Code company logo: a planning grid flowing into music staff lines and two notes',
};
export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: 'https://chiarocode.com/' },
  openGraph: {
    type: 'website',
    url: 'https://chiarocode.com/',
    siteName: 'Chiaro Code',
    title: homeTitle,
    description: homeDescription,
    images: [companyImage],
  },
  twitter: {
    card: 'summary',
    title: homeTitle,
    description: homeDescription,
    images: [companyImage],
  },
};

export const dynamic = 'force-static';
const story =
  'A lesson starts before the first note. Clear the practical barriers around it, and make more room for the music itself.';

export default function HomePage() {
  return (
    <MarketingMotion className={styles.page}>
      <link
        rel="preload"
        href={sitePath('/fonts/geist-variable.woff2')}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <div className={styles.heroBand}>
        <section
          className={`${styles.hero} shell`}
          aria-labelledby="home-title"
        >
          <div className={styles.heroCopy}>
            <p>Practical tools. More room for music.</p>
            <h1 id="home-title" className={styles.revealMask}>
              <span data-mask-reveal>
                A clearer
                <br />
                pickup line.
              </span>
            </h1>
            <p className={styles.lede}>
              RideReady is in development to help staff call numbers and keep a
              shared display clear.
            </p>
            <div className={styles.heroActions}>
              <MagneticLink href={sitePath('/RideReady')}>
                Explore RideReady{' '}
                <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
              </MagneticLink>
              <a
                className="text-link"
                href={sitePath('/pricing#ride-ready-status')}
              >
                Pilot pricing &amp; availability
              </a>
            </div>
          </div>
          <figure className={styles.heroVisual} data-motion-enter>
            <TactileSurface>
              <Image
                src={sitePath('/images/ride-ready-icon.jpg')}
                alt="RideReady app icon showing a blue car with the numbers four, five, and six"
                width={1080}
                height={1080}
                priority
              />
            </TactileSurface>
            <figcaption>Call a number. Keep it in view.</figcaption>
          </figure>
        </section>
      </div>
      <section
        className={`${styles.interest} shell`}
        aria-labelledby="tools-title"
      >
        <div className={styles.sectionIntro}>
          <h2 id="tools-title">Find your way in.</h2>
          <p>
            Tools for the people around a lesson and the students ready to
            create. Choose a story to see what fits.
          </p>
        </div>
        <ProductStoryChooser />
      </section>
      <MusicMaterial />
      <section
        className={styles.storyBand}
        id="about"
        aria-labelledby="access-title"
      >
        <div className={`${styles.storyGrid} shell`} data-scroll-story>
          <div className={styles.storyTitle} data-pin-title>
            <h2 id="access-title">
              Make room{' '}
              <span className={styles.inlineImage}>
                <Image
                  src={sitePath('/images/chiaro-festival-story.png')}
                  alt=""
                  aria-hidden="true"
                  width={1672}
                  height={941}
                />
              </span>{' '}
              for music.
            </h2>
            <p>
              Frictionless Access is the idea behind Chiaro Code: fewer
              operational barriers for schools, fewer hardware barriers for
              students.
            </p>
          </div>
          <div>
            <p className={styles.storySentence} data-scroll-reveal>
              <span>{story}</span>
              <span className={styles.wordOverlay} aria-hidden="true">
                {story.split(' ').map((word, index) => (
                  <span data-scrub-word key={`${word}-${index}`}>
                    {word}{' '}
                  </span>
                ))}
              </span>
            </p>
            <figure className={styles.festival}>
              <Image
                data-image-reveal
                src={sitePath('/images/chiaro-festival-story.png')}
                alt="A planning grid flows into music staff lines above an outdoor festival stage"
                width={1672}
                height={941}
                sizes="(max-width: 1000px) 100vw, 55vw"
              />
              <figcaption>
                Plan the practical. Make room for music. Illustrative artwork.
              </figcaption>
            </figure>
            <article className={styles.storyFact}>
              <Monitor aria-hidden="true" />
              <div>
                <h3>A shared picture for staff.</h3>
                <p>
                  RideReady brings a focused controller and a separate shared
                  display together around called numbers.
                </p>
              </div>
            </article>
            <article className={styles.storyFact}>
              <Keyboard aria-hidden="true" />
              <div>
                <h3>A familiar keyboard for students.</h3>
                <p>
                  Typing-to-MIDI lets a laptop keyboard control compatible music
                  software, with a separate MIDI keyboard optional.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section
        className={`${styles.action} shell`}
        aria-labelledby="start-title"
      >
        <h2 id="start-title">
          Start with what
          <br />
          is ready.
        </h2>
        <p>
          Typing-to-MIDI version 1.0.0 is available for macOS and Windows.
          RideReady’s limited pilot is still taking shape.
        </p>
        <div className={styles.actionLinks}>
          <a
            className="button-link"
            href={sitePath('/products#midi-downloads')}
          >
            Get Typing-to-MIDI <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="text-link" href={sitePath('/RideReady#download')}>
            RideReady release &amp; pilot status
          </a>
        </div>
        <p className={styles.actionNote}>
          RideReady pilot pricing: {rideReadyPricingSummary}.{' '}
          {rideReadyBillingNote}
        </p>
      </section>
    </MarketingMotion>
  );
}
