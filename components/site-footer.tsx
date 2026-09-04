import { sitePath } from '@/lib/base-path';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main shell">
        <div>
          <span className="footer-brand">Chiaro Code</span>
          <p>Music education software composed with purpose, precision, and respect for the craft.</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href={sitePath('/')}>Home</a>
          <a href={sitePath('/#about')}>About us</a>
          <a href={sitePath('/products')}>Products</a>
          <a href={sitePath('/pricing')}>Pricing</a>
        </nav>
      </div>
      <div className="footer-meta shell">
        <span>For musicians, educators &amp; institutions</span>
        <span>© {new Date().getFullYear()} Chiaro Code</span>
      </div>
    </footer>
  );
}
