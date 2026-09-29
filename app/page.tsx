import { sitePath } from '@/lib/base-path';

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <>
      {/* Hero: the company proposition, expressed through type alone. */}
      <section className="home-hero shell" aria-labelledby="home-title">
        <div className="hero-register" aria-label="Company focus">
          <span>Frictionless access to music education</span>
          <span>For schools. For students.</span>
        </div>
        <h1 id="home-title">Fewer barriers.<br />More music.</h1>
        <div className="hero-bottom">
          <div>
            <p className="hero-lede">Chiaro Code builds the infrastructure that makes music education easier to run and easier to access. From a calmer pickup line to a first note on a laptop, we make room for learning.</p>
            <a className="button-link hero-action" href={sitePath('/products')}>Explore our tools</a>
          </div>
          <dl className="hero-aside">
            <dt>For the school</dt>
            <dd>Less time managing logistics. More attention for students.</dd>
            <dt>For the student</dt>
            <dd>A way into music creation, using the keyboard already in front of you.</dd>
          </dl>
        </div>
      </section>

      {/* About Us lives on the home page to keep the company story concise. */}
      <section className="section about-section" id="about" aria-labelledby="about-title">
        <div className="shell">
          <div className="section-intro">
            <p className="section-label">01 / About us</p>
            <h2 id="about-title">Music education should be easier to reach, and easier to run.</h2>
          </div>
          <div className="about-grid">
            <article className="about-item">
              <span className="about-item-number">I.</span>
              <h3>Our mission</h3>
              <p>To remove the everyday barriers between people and music. We build practical tools for the work around a lesson and the creativity within it.</p>
            </article>
            <article className="about-item">
              <span className="about-item-number">II.</span>
              <h3>Our vision</h3>
              <p>Frictionless Access: schools with more time to teach, and students with the freedom to create. Music education becomes more accessible when the logistics and the tools stop getting in the way.</p>
            </article>
            <article className="about-item">
              <span className="about-item-number">III.</span>
              <h3>Our commitment</h3>
              <p>Start with a real obstacle. Make the next step simpler. From coordinating pickup to playing a virtual instrument, our measure of progress is what a school or student can do more easily.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="mission-band" aria-labelledby="mission-title">
        <div className="mission-inner shell">
          <p className="section-label">Frictionless Access</p>
          <p className="mission-quote" id="mission-title">More time for students.<br />More ways to <em>start playing.</em></p>
        </div>
      </section>

      <section className="section shell" aria-labelledby="standards-title">
        <div className="standards-header">
          <div>
            <p className="section-label">02 / One connected vision</p>
            <h2 id="standards-title">Two tools. A shared purpose.</h2>
          </div>
          <p>Supporting music education means caring for the whole experience: the program that makes it possible and the student ready to begin.</p>
        </div>
        <dl className="standards-list">
          <div className="standard-row">
            <dt>01</dt>
            <dd>Less operational friction</dd>
            <dd>RideReady is in development, bringing called numbers, controllers, and a shared display together to help schools and after-school programs coordinate a busy pickup line.</dd>
          </div>
          <div className="standard-row">
            <dt>02</dt>
            <dd>Less hardware friction</dd>
            <dd>Typing-to-MIDI turns a QWERTY keyboard into a MIDI controller. With a compatible instrument app and MIDI routing set up, students can explore notes, chords, and synths without a separate controller.</dd>
          </div>
          <div className="standard-row">
            <dt>03</dt>
            <dd>Trust through usefulness</dd>
            <dd>Solving everyday problems is the foundation for a lasting relationship with a school. As our tools grow, that same practical approach carries into the classroom.</dd>
          </div>
        </dl>
      </section>

      <section className="section closing-section" aria-labelledby="collection-title">
        <div className="closing-inner shell">
          <div>
            <p className="section-label">For schools &amp; students</p>
            <h2 id="collection-title">Clear the way for music.</h2>
          </div>
          <a className="button-link" href={sitePath('/products')}>Explore our tools</a>
        </div>
      </section>
    </>
  );
}
