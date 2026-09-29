import { sitePath } from '@/lib/base-path';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main shell">
        <div>
          <span className="footer-brand">Chiaro Code</span>
          <p>Frictionless access to music education. Practical tools for the schools that teach and the students ready to create.</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href={sitePath('/')}>Home</a>
          <a href={sitePath('/#about')}>About us</a>
          <a href={sitePath('/products')}>Products</a>
          <a href={sitePath('/pricing')}>Pricing</a>
        </nav>
      </div>
      <div className="footer-meta shell">
        <span>Fewer barriers. More music.</span>
        <span>© {new Date().getFullYear()} Chiaro Code</span>
      </div>
    </footer>
  );
}
