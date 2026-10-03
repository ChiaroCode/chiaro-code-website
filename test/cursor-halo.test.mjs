import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

// Exercise the actual component effect without a browser or React renderer.
// Layout, visual appearance and browser event delivery still require browser QA.
const source = readFileSync(
  new URL('../components/cursor-halo.tsx', import.meta.url),
  'utf8',
);
const runtimeSource = readFileSync(
  new URL('../lib/tactile-runtime.ts', import.meta.url),
  'utf8',
);
const runtimeCompiled = ts.transpileModule(runtimeSource, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

function mount(enabled = true) {
  class Surface extends EventTarget {
    send(type, fields = {}) {
      const event = new Event(type);
      for (const [key, value] of Object.entries(fields))
        Object.defineProperty(event, key, { value });
      this.dispatchEvent(event);
    }
  }
  class FakeElement {
    constructor(interactive = false) {
      this.interactive = interactive;
    }
    closest() {
      return this.interactive ? this : null;
    }
  }
  const position = { style: {} };
  const halo = {
    dataset: {},
    firstElementChild: position,
    querySelector: () => null,
  };
  const preference = new Surface();
  preference.matches = enabled;
  const win = new Surface();
  let query;
  win.matchMedia = (value) => {
    query = value;
    return preference;
  };
  const doc = new Surface();
  doc.hidden = false;
  doc.activeElement = null;
  const frames = new Map();
  let nextFrame = 0;
  let time = 0;
  let cleanup;
  const exports = {};
  const runtime = {};
  const globals = {
    window: win,
    document: doc,
    Element: FakeElement,
    performance: { now: () => time },
    requestAnimationFrame: (callback) => {
      frames.set(++nextFrame, callback);
      return nextFrame;
    },
    cancelAnimationFrame: (id) => frames.delete(id),
    IntersectionObserver: class {
      constructor(fn) {
        this.fn = fn;
      }
      observe() {}
      disconnect() {}
    },
    ResizeObserver: class {
      observe() {}
      disconnect() {}
    },
  };
  vm.runInNewContext(runtimeCompiled, { ...globals, exports: runtime });
  vm.runInNewContext(compiled, {
    ...globals,
    exports,
    require: (name) => {
      if (name === '@/lib/tactile-runtime') return runtime;
      if (name === 'react')
        return {
          useRef: () => ({ current: halo }),
          useEffect: (effect) => {
            cleanup = effect();
          },
        };
      if (name === 'react/jsx-runtime')
        return {
          jsx: (type, props) => ({ type, props }),
          jsxs: (type, props) => ({ type, props }),
        };
      throw new Error(`Unexpected dependency ${name}`);
    },
    window: win,
    document: doc,
    Element: FakeElement,
    performance: { now: () => time },
    requestAnimationFrame: (callback) => {
      frames.set(++nextFrame, callback);
      return nextFrame;
    },
    cancelAnimationFrame: (id) => frames.delete(id),
  });
  const tree = exports.CursorHalo();
  const move = (fields = {}) =>
    win.send('pointermove', {
      pointerType: 'mouse',
      buttons: 0,
      clientX: 100,
      clientY: 80,
      target: new FakeElement(),
      ...fields,
    });
  const settle = () => {
    let ticks = 0;
    while (frames.size && ticks < 100) {
      const pending = [...frames.values()];
      frames.clear();
      time += 16;
      for (const callback of pending) callback(time);
      ticks++;
    }
    assert.equal(frames.size, 0, 'animation must stop when the pointer rests');
  };
  return {
    runtime,
    halo,
    position,
    preference,
    win,
    doc,
    frames,
    tree,
    move,
    settle,
    cleanup,
    query,
    interactive: () => new FakeElement(true),
  };
}

test('decorative only and opt-in to fine hover with no reduced motion', () => {
  const m = mount(false);
  assert.equal(m.tree.props['aria-hidden'], 'true');
  assert.match(m.query, /hover: hover/);
  assert.match(m.query, /pointer: fine/);
  assert.match(m.query, /prefers-reduced-motion: no-preference/);
  m.move();
  assert.equal(m.frames.size, 0);
  assert.equal(m.halo.dataset.visible, undefined);
  m.cleanup();
});

test('mouse response retains one finite frame loop and recognizes links', () => {
  const m = mount();
  m.move({ target: m.interactive() });
  assert.equal(m.halo.dataset.visible, 'true');
  assert.equal(m.halo.dataset.interactive, 'true');
  assert.equal(m.position.style.transform, 'translate3d(100px, 80px, 0)');
  m.move({ clientX: 220 });
  m.move({ clientX: 240 });
  assert.equal(m.frames.size, 1);
  m.settle();
  assert.equal(m.halo.dataset.interactive, 'false');
  m.cleanup();
});

test('touch, pen, selection drag, keyboard, scroll and leaving all hide it', () => {
  const m = mount();
  for (const fields of [
    { pointerType: 'touch' },
    { pointerType: 'pen' },
    { buttons: 1 },
  ]) {
    m.move();
    m.move(fields);
    assert.equal(m.halo.dataset.visible, 'false');
    assert.equal(m.frames.size, 0);
  }
  for (const type of ['keydown', 'scroll', 'blur', 'pointerdown']) {
    m.move();
    m.win.send(type);
    assert.equal(m.halo.dataset.visible, 'false');
    assert.equal(m.frames.size, 0);
  }
  m.move();
  m.win.send('pointerout', { relatedTarget: null });
  assert.equal(m.halo.dataset.visible, 'false');
  m.move();
  m.doc.hidden = true;
  m.doc.send('visibilitychange');
  assert.equal(m.halo.dataset.visible, 'false');
  m.cleanup();
});

test('live capability changes and unmount remove the effect and pending work', () => {
  const m = mount();
  m.move();
  m.preference.matches = false;
  m.preference.send('change');
  assert.equal(m.halo.dataset.visible, 'false');
  assert.equal(m.frames.size, 0);
  m.move();
  assert.equal(m.halo.dataset.visible, 'false');
  m.preference.matches = true;
  m.preference.send('change');
  m.move();
  assert.equal(m.halo.dataset.visible, 'true');
  m.cleanup();
  assert.equal(m.frames.size, 0);
  m.move();
  assert.equal(m.halo.dataset.visible, 'false');
});

test('physical spring settles after a long frame and magnetic displacement stays bounded', () => {
  const m = mount();
  const spring = { value: 0, velocity: 0, target: 1 };
  for (let i = 0; i < 300; i++)
    m.runtime.advanceSpring(spring, i === 3 ? 5 : 0.016);
  assert.equal(spring.value, 1);
  assert.equal(spring.velocity, 0);
  const r = {
    left: 100,
    top: 100,
    right: 200,
    bottom: 148,
    width: 100,
    height: 48,
  };
  assert.deepEqual(Array.from(m.runtime.magneticOffset(0, 0, r)), [0, 0]);
  const offset = Array.from(m.runtime.magneticOffset(199, 147, r));
  assert.ok(offset.every((v) => Math.abs(v) <= 7));
  m.cleanup();
});

test('tilt and cursor share one finite loop; focus, scroll and unregistration reset transforms', () => {
  const m = mount();
  const visual = { style: {} },
    glare = { style: {} };
  const host = {
    isConnected: true,
    contains: (element) => element === host,
    getBoundingClientRect: () => ({
      left: 0,
      top: 0,
      right: 300,
      bottom: 200,
      width: 300,
      height: 200,
    }),
  };
  const dispose = m.runtime.registerTactileTarget(host, visual, 'tilt', glare);
  m.move({ clientX: 240, clientY: 160 });
  m.move({ clientX: 260 });
  assert.equal(m.frames.size, 1);
  m.settle();
  assert.match(visual.style.transform, /perspective\(1000px\)/);
  assert.equal(visual.style.willChange, '');
  m.doc.activeElement = host;
  m.move();
  m.settle();
  assert.ok(
    !visual.style.transform || visual.style.transform.includes('rotateX(0deg)'),
  );
  m.win.send('scroll');
  assert.equal(visual.style.transform, '');
  assert.equal(m.frames.size, 0);
  dispose();
  m.move();
  m.settle();
  assert.equal(visual.style.transform, '');
  m.cleanup();
});
