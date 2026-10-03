'use client';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TactileSurface, MagneticLink } from './tactile-surface';
import { sitePath } from '@/lib/base-path';
import styles from './music-material.module.css';
const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
/** A silent, illustrative interaction; it does not connect to a MIDI device. */
export function MusicMaterial() {
  const [selected, setSelected] = useState(2);
  const [intensity, setIntensity] = useState(58);
  return (
    <section
      className={`${styles.section} shell`}
      aria-labelledby="music-material-title"
      id="music-material"
    >
      <div className={styles.copy}>
        <h2 id="music-material-title">
          A small gesture.
          <br />A new way in.
        </h2>
        <p>
          A familiar keyboard can open a musical door. Typing-to-MIDI connects
          it to compatible music software.
        </p>
        <p className={styles.instruction} id="music-instructions">
          Explore this silent illustration. Choose a note, then drag the energy
          slider or use its arrow keys.
        </p>
        <MagneticLink href={sitePath('/products#midi-downloads')}>
          Explore Typing-to-MIDI{' '}
          <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
        </MagneticLink>
      </div>
      <div className={styles.stage} data-depth-stack>
        <div className={styles.ambient} aria-hidden="true" />
        <div className={styles.backplate} data-stack-layer aria-hidden="true">
          <span>Space for a first note.</span>
          <span>Chiaro Code</span>
        </div>
        <TactileSurface className={styles.instrument}>
          <div className={styles.panel}>
            <div className={styles.top}>
              <span>From a key to a note</span>
              <span>Silent illustration</span>
            </div>
            <div className={styles.visualizer} aria-hidden="true">
              <div className={styles.staff} />
              {Array.from({ length: 23 }, (_, i) => (
                <span
                  key={i}
                  className={styles.bar}
                  style={{
                    transform: `scaleY(${0.18 + Math.abs(Math.sin((i + selected) * 0.64)) * intensity * 0.0085})`,
                    opacity:
                      0.3 + Math.abs(Math.sin((i + selected) * 0.64)) * 0.7,
                  }}
                />
              ))}
              <span
                className={styles.note}
                style={{ transform: `translateY(${(3 - selected) * 8}px)` }}
              >
                {notes[selected]}
              </span>
            </div>
            <fieldset
              className={styles.keys}
              aria-describedby="music-instructions"
            >
              <legend className={styles.srOnly}>
                Choose a note for the illustration
              </legend>
              {notes.map((note, index) => (
                <button
                  type="button"
                  key={note}
                  aria-pressed={selected === index}
                  aria-label={`Select note ${note}`}
                  onClick={() => setSelected(index)}
                  onPointerEnter={(event) => {
                    if (event.pointerType === 'mouse' && event.buttons === 0)
                      setSelected(index);
                  }}
                >
                  <span>{note}</span>
                </button>
              ))}
            </fieldset>
            <div className={styles.energy}>
              <label htmlFor="music-energy">Visual energy</label>
              <output htmlFor="music-energy">{intensity}%</output>
              <input
                id="music-energy"
                name="visual-energy"
                type="range"
                min="10"
                max="100"
                value={intensity}
                onChange={(event) => setIntensity(Number(event.target.value))}
              />
            </div>
            <output className={styles.status}>
              {notes[selected]} selected · {intensity}% visual energy · no sound
            </output>
          </div>
        </TactileSurface>
      </div>
    </section>
  );
}
