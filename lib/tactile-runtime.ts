/** One event-driven pointer loop shared by the cursor, tilt and magnetic targets. */
export const motionSprings = {
  subtle: { stiffness: 240, damping: 28, mass: 1 },
  tactile: { stiffness: 350, damping: 20, mass: 1 },
  reveal: { stiffness: 140, damping: 24, mass: 1 },
} as const;
export type Spring = { value: number; velocity: number; target: number };
export function advanceSpring(
  s: Spring,
  seconds: number,
  config: {
    stiffness: number;
    damping: number;
    mass: number;
  } = motionSprings.tactile,
): boolean {
  // Substeps keep the physical spring stable after delayed frames; never catch up a hidden tab.
  const dt = Math.min(Math.max(seconds, 0), 0.032);
  const count = Math.max(1, Math.ceil(dt / 0.008));
  for (let i = 0; i < count; i++) {
    const h = dt / count;
    s.velocity +=
      ((config.stiffness * (s.target - s.value) - config.damping * s.velocity) /
        config.mass) *
      h;
    s.value += s.velocity * h;
  }
  if (Math.abs(s.target - s.value) < 0.001 && Math.abs(s.velocity) < 0.01) {
    s.value = s.target;
    s.velocity = 0;
    return false;
  }
  return true;
}
export function magneticOffset(
  x: number,
  y: number,
  r: Pick<DOMRect, 'left' | 'top' | 'right' | 'bottom' | 'width' | 'height'>,
) {
  const distance = Math.hypot(
    Math.max(r.left - x, 0, x - r.right),
    Math.max(r.top - y, 0, y - r.bottom),
  );
  if (distance > 60) return [0, 0];
  const strength = 0.12 * (1 - distance / 60);
  return [
    Math.max(-7, Math.min(7, (x - r.left - r.width / 2) * strength)),
    Math.max(-7, Math.min(7, (y - r.top - r.height / 2) * strength)),
  ];
}
type Target = {
  host: HTMLElement;
  visual: HTMLElement;
  glare?: HTMLElement;
  kind: 'tilt' | 'magnet';
  visible: boolean;
  bounds?: DOMRect;
  x: Spring;
  y: Spring;
  amount: Spring;
};
const targets = new Set<Target>();
const spring = (): Spring => ({ value: 0, velocity: 0, target: 0 });
function reset(t: Target) {
  for (const s of [t.x, t.y, t.amount]) {
    s.value = 0;
    s.velocity = 0;
    s.target = 0;
  }
  t.visual.style.transform = '';
  t.visual.style.willChange = '';
  if (t.glare) {
    t.glare.style.opacity = '0';
    t.glare.style.transform = '';
  }
}
export function registerTactileTarget(
  host: HTMLElement,
  visual: HTMLElement,
  kind: Target['kind'],
  glare?: HTMLElement,
) {
  const t: Target = {
    host,
    visual,
    kind,
    glare,
    visible: true,
    x: spring(),
    y: spring(),
    amount: spring(),
  };
  targets.add(t);
  const observer = new IntersectionObserver(([entry]) => {
    t.visible = entry.isIntersecting;
    t.bounds = undefined;
    if (!t.visible) reset(t);
  });
  observer.observe(host);
  const resize = new ResizeObserver(() => {
    t.bounds = undefined;
  });
  resize.observe(host);
  return () => {
    observer.disconnect();
    resize.disconnect();
    reset(t);
    targets.delete(t);
  };
}
export function startPointerMotion(halo: HTMLElement) {
  const position = halo.firstElementChild as HTMLElement | null;
  if (!position) return () => {};
  const dot = halo.querySelector<HTMLElement>('[data-cursor-dot]');
  const preference = window.matchMedia(
    '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  );
  let disconnect: (() => void) | undefined;
  const connect = () => {
    disconnect?.();
    disconnect = undefined;
    if (!preference.matches) return;
    let frame = 0,
      visible = false,
      x = 0,
      y = 0,
      tx = 0,
      ty = 0,
      lastTime = 0;
    const hide = () => {
      visible = false;
      halo.dataset.visible = 'false';
      cancelAnimationFrame(frame);
      frame = 0;
      for (const t of targets) {
        reset(t);
        t.bounds = undefined;
      }
    };
    const draw = (time: number) => {
      const elapsed = Math.min(time - lastTime, 32);
      lastTime = time;
      const step = 1 - Math.exp(-elapsed / 38);
      x += (tx - x) * step;
      y += (ty - y) * step;
      position.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      let running = visible && Math.abs(tx - x) + Math.abs(ty - y) > 0.1;
      for (const t of targets) {
        if (!t.visible || !t.host.isConnected) continue;
        const config =
          t.kind === 'magnet' ? motionSprings.subtle : motionSprings.tactile;
        const a = advanceSpring(t.x, elapsed / 1000, config);
        const b = advanceSpring(t.y, elapsed / 1000, config);
        const c = advanceSpring(t.amount, elapsed / 1000, config);
        const active = a || b || c;
        running = running || active;
        t.visual.style.willChange = active ? 'transform' : '';
        if (t.kind === 'tilt') {
          const px = Math.max(-1, Math.min(1, t.x.value));
          const py = Math.max(-1, Math.min(1, t.y.value));
          const amount = Math.max(0, Math.min(1, t.amount.value));
          t.visual.style.transform = `perspective(1000px) rotateX(${-py * 5}deg) rotateY(${px * 5}deg) scale(${1 + amount * 0.04})`;
          if (t.glare) {
            t.glare.style.opacity = String(amount * 0.28);
            t.glare.style.transform = `translate3d(${px * 18}%, ${py * 18}%, 40px)`;
          }
        } else
          t.visual.style.transform = `translate3d(${t.x.value}px, ${t.y.value}px, 0)`;
      }
      frame = running ? requestAnimationFrame(draw) : 0;
    };
    const move = (event: PointerEvent) => {
      if (
        document.hidden ||
        event.pointerType !== 'mouse' ||
        event.buttons !== 0
      ) {
        hide();
        return;
      }
      tx = event.clientX;
      ty = event.clientY;
      if (!visible) {
        x = tx;
        y = ty;
        position.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        visible = true;
        halo.dataset.visible = 'true';
      }
      if (dot) dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      halo.dataset.interactive = String(
        event.target instanceof Element &&
          Boolean(
            event.target.closest('a[href], button:not(:disabled), input'),
          ),
      );
      for (const t of targets) {
        if (!t.visible || !t.host.isConnected) continue;
        const r = (t.bounds ??= t.host.getBoundingClientRect());
        if (t.host.contains(document.activeElement)) {
          reset(t);
          continue;
        }
        if (t.kind === 'magnet') {
          [t.x.target, t.y.target] = magneticOffset(tx, ty, r);
        } else {
          const inside =
            tx >= r.left && tx <= r.right && ty >= r.top && ty <= r.bottom;
          t.x.target = inside
            ? Math.max(-1, Math.min(1, ((tx - r.left) / r.width) * 2 - 1))
            : 0;
          t.y.target = inside
            ? Math.max(-1, Math.min(1, ((ty - r.top) / r.height) * 2 - 1))
            : 0;
          t.amount.target = inside ? 1 : 0;
        }
      }
      if (!frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };
    const hidden = () => {
      if (document.hidden) hide();
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', hide, { passive: true });
    window.addEventListener('pointerout', leave, { passive: true });
    window.addEventListener('blur', hide);
    window.addEventListener('keydown', hide);
    window.addEventListener('focusin', hide);
    window.addEventListener('scroll', hide, { passive: true, capture: true });
    window.addEventListener('resize', hide, { passive: true });
    document.addEventListener('visibilitychange', hidden);
    disconnect = () => {
      hide();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', hide);
      window.removeEventListener('pointerout', leave);
      window.removeEventListener('blur', hide);
      window.removeEventListener('keydown', hide);
      window.removeEventListener('focusin', hide);
      window.removeEventListener('scroll', hide, true);
      window.removeEventListener('resize', hide);
      document.removeEventListener('visibilitychange', hidden);
    };
  };
  connect();
  preference.addEventListener('change', connect);
  return () => {
    preference.removeEventListener('change', connect);
    disconnect?.();
  };
}

/** Sample a physical spring once for GSAP's existing ticker, without another runtime. */
export function springEase(
  config: { stiffness: number; damping: number; mass: number },
  duration = 0.9,
) {
  const s = spring();
  s.target = 1;
  const steps = Math.ceil(duration * 240),
    samples = [0];
  for (let i = 0; i < steps; i++) {
    advanceSpring(s, duration / steps, config);
    samples.push(s.value);
  }
  const final = samples[steps] || 1;
  return (progress: number) => {
    const index = Math.max(0, Math.min(steps, progress * steps));
    const lo = Math.floor(index),
      hi = Math.min(steps, lo + 1);
    return (samples[lo] + (samples[hi] - samples[lo]) * (index - lo)) / final;
  };
}
