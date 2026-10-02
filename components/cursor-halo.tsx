'use client';

import { useEffect, useRef } from 'react';

/** Decorative glass response; the operating system cursor always stays intact. */
export function CursorHalo() {
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const halo = haloRef.current;
    const position = halo?.firstElementChild as HTMLElement | null;
    if (!halo || !position) return;

    const preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let disconnect: (() => void) | undefined;

    const connect = () => {
      disconnect?.();
      disconnect = undefined;
      if (!preference.matches) return;

      let frame = 0;
      let visible = false;
      let x = 0;
      let y = 0;
      let targetX = 0;
      let targetY = 0;
      let lastTime = 0;

      const hide = () => {
        visible = false;
        halo.dataset.visible = 'false';
        cancelAnimationFrame(frame);
        frame = 0;
      };
      const draw = (time: number) => {
        const elapsed = Math.min(time - lastTime, 32);
        lastTime = time;
        const step = 1 - Math.exp(-elapsed / 38);
        x += (targetX - x) * step;
        y += (targetY - y) * step;
        position.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        if (Math.abs(targetX - x) + Math.abs(targetY - y) > .1) {
          frame = requestAnimationFrame(draw);
        } else {
          frame = 0;
        }
      };
      const move = (event: PointerEvent) => {
        // Hybrid devices can expose a fine primary pointer and still send touch.
        if (event.pointerType !== 'mouse' || event.buttons !== 0) {
          hide();
          return;
        }
        targetX = event.clientX;
        targetY = event.clientY;
        if (!visible) {
          x = targetX;
          y = targetY;
          position.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          visible = true;
          halo.dataset.visible = 'true';
        }
        const target = event.target;
        halo.dataset.interactive = String(target instanceof Element && Boolean(target.closest('a[href], button:not(:disabled)')));
        if (!frame) {
          lastTime = performance.now();
          frame = requestAnimationFrame(draw);
        }
      };
      const leave = (event: PointerEvent) => {
        if (!event.relatedTarget) hide();
      };

      window.addEventListener('pointermove', move, { passive: true });
      window.addEventListener('pointerdown', hide, { passive: true });
      window.addEventListener('pointerout', leave, { passive: true });
      window.addEventListener('blur', hide);
      window.addEventListener('keydown', hide);
      window.addEventListener('scroll', hide, { passive: true, capture: true });
      document.addEventListener('visibilitychange', hide);
      disconnect = () => {
        hide();
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerdown', hide);
        window.removeEventListener('pointerout', leave);
        window.removeEventListener('blur', hide);
        window.removeEventListener('keydown', hide);
        window.removeEventListener('scroll', hide, true);
        document.removeEventListener('visibilitychange', hide);
      };
    };

    connect();
    preference.addEventListener('change', connect);
    return () => {
      preference.removeEventListener('change', connect);
      disconnect?.();
    };
  }, []);

  return <div ref={haloRef} className="cursor-halo" aria-hidden="true"><span /></div>;
}
