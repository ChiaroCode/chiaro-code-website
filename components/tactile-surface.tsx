'use client';
import { useEffect, useRef } from 'react';
import { registerTactileTarget } from '@/lib/tactile-runtime';
import styles from './tactile-surface.module.css';
/** A stationary hit region around a decorative moving surface. */
export function TactileSurface({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (host.current && visual.current)
      return registerTactileTarget(
        host.current,
        visual.current,
        'tilt',
        glare.current ?? undefined,
      );
  }, []);
  return (
    <div
      ref={host}
      className={`${styles.host} ${className}`}
      data-tactile-surface
    >
      <div ref={visual} className={styles.visual}>
        {children}
        <span ref={glare} className={styles.glare} aria-hidden="true" />
      </div>
    </div>
  );
}
export function MagneticLink({
  children,
  href,
  className = '',
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const host = useRef<HTMLAnchorElement>(null);
  const visual = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (host.current && visual.current)
      return registerTactileTarget(host.current, visual.current, 'magnet');
  }, []);
  return (
    <a
      ref={host}
      href={href}
      className={`${styles.magnetic} ${className}`}
      data-magnetic
    >
      <span ref={visual} className="button-link">
        {children}
      </span>
    </a>
  );
}
