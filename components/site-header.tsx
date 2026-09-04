'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { sitePath } from '@/lib/base-path';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/pricing', label: 'Pricing' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close the mobile menu if the viewport returns to the desktop layout.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 851px)');
    const closeMenu = () => media.matches && setIsOpen(false);
    media.addEventListener('change', closeMenu);
    return () => media.removeEventListener('change', closeMenu);
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <a className="brand" href={sitePath('/')} aria-label="Chiaro Code home" onClick={() => setIsOpen(false)}>
          <span className="wordmark">Chiaro Code</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
        <nav id="primary-navigation" className={isOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
          {navigation.map((item) => {
            const target = sitePath(item.href);
            const isCurrent = pathname === target || (item.href !== '/' && pathname.startsWith(target));
            return (
              <a key={item.href} href={target} aria-current={isCurrent ? 'page' : undefined} onClick={() => setIsOpen(false)}>
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
