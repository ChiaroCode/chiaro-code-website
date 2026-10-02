'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { BrandMark } from '@/components/brand-mark';
import { sitePath } from '@/lib/base-path';

const navigation = [
  { href: '/products', label: 'Products' },
  { href: '/pricing', label: 'Pricing' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu if the viewport returns to the desktop layout.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 851px)');
    const closeMenu = () => media.matches && setIsOpen(false);
    media.addEventListener('change', closeMenu);
    return () => media.removeEventListener('change', closeMenu);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      menuRef.current?.focus();
    };
    const dismissOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('keydown', dismissOnEscape);
    document.addEventListener('pointerdown', dismissOutside);
    return () => {
      document.removeEventListener('keydown', dismissOnEscape);
      document.removeEventListener('pointerdown', dismissOutside);
    };
  }, [isOpen]);

  return (
    <header className="site-header" ref={headerRef} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsOpen(false);
    }}>
      <div className="header-inner shell">
        <a className="brand" href={sitePath('/')} aria-label="Chiaro Code home" onClick={() => setIsOpen(false)}>
          <BrandMark />
          <span className="wordmark">Chiaro Code</span>
        </a>
        <button
          className="menu-button"
          ref={menuRef}
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
            const normalizedPath = pathname.replace(/\/$/, '') || '/';
            const normalizedTarget = target.replace(/\/$/, '') || '/';
            const isCurrent = normalizedPath === normalizedTarget;
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
