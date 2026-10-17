import { BrandSignature } from '@/components/brand-mark';
import { sitePath } from '@/lib/base-path';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main shell">
        <div>
          <BrandSignature />
          <p>
            Practical tools for the people around a lesson and the students
            ready to create.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <a href={sitePath('/RideReady')}>RideReady</a>
          <a href={sitePath('/#about')}>Our approach</a>
          <a href={sitePath('/products')}>Products</a>
          <a href={sitePath('/pricing')}>Pricing</a>
        </nav>
      </div>
      <div className="footer-meta shell">
        <span>Frictionless Access</span>
        <span translate="no">© {new Date().getFullYear()} Chiarocode</span>
      </div>
    </footer>
  );
}
