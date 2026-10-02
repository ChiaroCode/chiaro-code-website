import Image from 'next/image';
import { BrandMark } from '@/components/brand-mark';
import { sitePath } from '@/lib/base-path';

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <>
      <section className="home-hero ride-ready-hero shell" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow">RideReady · in development</p>
          <h1 id="home-title">A clearer pickup line.</h1>
          <p className="hero-lede">
            RideReady is being developed to help staff call numbers and keep them visible on a shared display.
          </p>
          <div className="hero-actions">
            <a className="button-link" href={sitePath('/products#ride-ready')}>Explore RideReady</a>
            <a className="text-link" href={sitePath('/pricing#ride-ready-status')}>Pilot pricing &amp; availability</a>
          </div>
          <p className="hero-pilot-note">Limited pilot being prepared <span aria-hidden="true">·</span> $99 per device license / year</p>
        </div>

        <div className="ride-ready-visual" aria-label="RideReady, a school pickup tool in development">
          <div className="ride-ready-emblem">
            <Image
              src={sitePath('/images/ride-ready-icon.jpg')}
              alt="RideReady app icon showing a blue car with the numbers four, five, and six"
              width={1080}
              height={1080}
              priority
            />
          </div>
          <div className="ride-ready-visual-copy">
            <p className="ride-ready-visual-label">A tool for school pickup</p>
            <p className="ride-ready-visual-title">Call a number.<br />Keep it in view.</p>
            <p className="ride-ready-visual-detail">Staff call numbers. A shared display keeps them visible.</p>
            <span className="pathway-status status-development">In development</span>
          </div>
        </div>
      </section>

      <section className="section home-access" id="about" aria-labelledby="access-title">
        <div className="shell">
          <div className="home-section-heading">
            <div>
              <p className="section-label">Plan first</p>
              <h2 id="access-title">A lesson starts before the first note.</h2>
            </div>
            <p>Chiaro Code builds practical tools for the people around a lesson and the students ready to create.</p>
          </div>

          <figure className="festival-story">
            <Image
              className="festival-story-image"
              src={sitePath('/images/chiaro-festival-story.png')}
              alt="A planning grid flows into music staff lines above an outdoor festival stage."
              width={1672}
              height={941}
              sizes="(max-width: 850px) 100vw, 84rem"
            />
            <figcaption className="festival-story-caption">
              <BrandMark className="festival-story-mark" label="Chiaro Code mark: a planning grid flowing into a five-line music staff." />
              <span>Plan the practical. Make room for music.</span>
            </figcaption>
          </figure>

          <div className="home-pathway-list">
            <article className="home-pathway">
              <Image
                className="pathway-mark"
                src={sitePath('/images/ride-ready-icon.jpg')}
                alt=""
                aria-hidden="true"
                width={1080}
                height={1080}
              />
              <div className="pathway-title">
                <p className="pathway-audience">For schools</p>
                <h3>A clearer pickup line.</h3>
              </div>
              <div className="pathway-description">
                <p>RideReady is in development to help staff call numbers and keep them visible on a shared display.</p>
                <span className="pathway-status status-development">In development</span>
              </div>
              <a className="text-link" href={sitePath('/products#ride-ready')}>RideReady details</a>
            </article>

            <article className="home-pathway">
              <Image
                className="pathway-mark"
                src={sitePath('/images/typing-to-midi-icon.png')}
                alt=""
                aria-hidden="true"
                width={1254}
                height={1254}
              />
              <div className="pathway-title">
                <p className="pathway-audience">For students</p>
                <h3>Begin with the keys at hand.</h3>
              </div>
              <div className="pathway-description">
                <p>Typing-to-MIDI turns a laptop keyboard into a controller for compatible music apps.</p>
                <span className="pathway-status status-available">Available to download</span>
              </div>
              <a className="text-link" href={sitePath('/products#typing-to-midi')}>Typing-to-MIDI details</a>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
