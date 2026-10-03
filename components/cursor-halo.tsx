'use client';
import { useEffect, useRef } from 'react';
import { startPointerMotion } from '@/lib/tactile-runtime';
/** Decorative response. Native cursor and hit regions remain intact. */
export function CursorHalo() {
  const haloRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (haloRef.current) return startPointerMotion(haloRef.current);
  }, []);
  return (
    <div ref={haloRef} className="cursor-halo" aria-hidden="true">
      <span />
      <i data-cursor-dot />
    </div>
  );
}
