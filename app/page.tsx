import { sitePath } from '@/lib/base-path';

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <>
      {/* Hero: the company proposition, expressed through type alone. */}
      <section className="home-hero shell" aria-labelledby="home-title">
        <div className="hero-register" aria-label="Company focus">
          <span>Music education software</span>
          <span>For musicians, educators &amp; institutions</span>
        </div>
        <h1 id="home-title">Music learning, made lucid.</h1>
        <div className="hero-bottom">
          <p className="hero-lede">Chiaro Code creates exacting digital tools for the serious study of music—helping learners hear more deeply, practise more intelligently, and teach with greater clarity.</p>
          <dl className="hero-aside">
            <dt>chiaro</dt>
            <dd>Clear, bright; with tonal transparency.</dd>
            <dt>code</dt>
            <dd>Carefully composed systems, built to serve musical thought.</dd>
          </dl>
        </div>
      </section>

      {/* About Us lives on the home page to keep the company story concise. */}
      <section className="section about-section" id="about" aria-labelledby="about-title">
        <div className="shell">
          <div className="section-intro">
            <p className="section-label">01 / About us</p>
            <h2 id="about-title">We believe technology should sharpen musical attention, never compete with it.</h2>
          </div>
          <div className="about-grid">
            <article className="about-item">
              <span className="about-item-number">I.</span>
              <h3>Our mission</h3>
              <p>To make rigorous music education more perceptive, personal, and accessible through software designed around the way musicians actually listen, practise, and grow.</p>
            </article>
            <article className="about-item">
              <span className="about-item-number">II.</span>
              <h3>Our vision</h3>
              <p>We imagine learning environments where digital tools deepen human judgement—giving every student a clearer path forward and every teacher more time for meaningful instruction.</p>
            </article>
            <article className="about-item">
              <span className="about-item-number">III.</span>
              <h3>Our commitment</h3>
              <p>Every Chiaro Code product is shaped with educators, tested against real musical practice, and refined until its purpose is unmistakable. Quality is not a feature; it is our method.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="mission-band" aria-labelledby="mission-title">
        <div className="mission-inner shell">
          <p className="section-label">Our point of view</p>
          <p className="mission-quote" id="mission-title">Musical progress begins with <em>attention</em>. The best software knows when to speak—and when to become quiet.</p>
        </div>
      </section>

      <section className="section shell" aria-labelledby="standards-title">
        <div className="standards-header">
          <div>
            <p className="section-label">02 / How we work</p>
            <h2 id="standards-title">Built to a musical standard.</h2>
          </div>
          <p>Our process joins pedagogical expertise with disciplined software craft. Every decision must earn its place.</p>
        </div>
        <dl className="standards-list">
          <div className="standard-row">
            <dt>01</dt>
            <dd>Pedagogy before novelty</dd>
            <dd>We begin with a genuine learning need, then choose the simplest technology capable of serving it well.</dd>
          </div>
          <div className="standard-row">
            <dt>02</dt>
            <dd>Nuance over noise</dd>
            <dd>Feedback is calibrated to develop judgement and independence—not to replace the student’s ear or the teacher’s insight.</dd>
          </div>
          <div className="standard-row">
            <dt>03</dt>
            <dd>Reliability by design</dd>
            <dd>Clear interfaces, accessible patterns, and considered implementation make our tools dependable in studios, classrooms, and institutions.</dd>
          </div>
        </dl>
      </section>

      <section className="section closing-section" aria-labelledby="collection-title">
        <div className="closing-inner shell">
          <div>
            <p className="section-label">Our first product</p>
            <h2 id="collection-title">Purposeful tools for a lifetime of music.</h2>
          </div>
          <a className="button-link" href={sitePath('/products')}>Discover Ride Ready</a>
        </div>
      </section>
    </>
  );
}
