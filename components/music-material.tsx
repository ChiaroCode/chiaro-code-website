'use client';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TactileSurface, MagneticLink } from './tactile-surface';
import { sitePath } from '@/lib/base-path';
import styles from './music-material.module.css';
const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const midiNotes = [60, 62, 64, 65, 67, 69, 71];
/** A silent, illustrative interaction; it does not connect to a MIDI device. */
export function MusicMaterial() {
  const [selected, setSelected] = useState(2);
  const [intensity, setIntensity] = useState(58);
  const exampleVelocity = Math.round(intensity * 1.27);
  return (
    <section
      className={`${styles.section} shell`}
      aria-labelledby="music-material-title"
      id="music-material"
    >
      <div className={styles.copy}>
        <p className={styles.productLabel}>Typing-to-MIDI · Version 1.0.0</p>
        <h2 id="music-material-title">
          Type a key.
          <br />
          Send a note.
        </h2>
        <p>
          Typing-to-MIDI turns a laptop keyboard into a MIDI controller for
          compatible music software. That software supplies the sound.
        </p>
        <p className={styles.instruction} id="music-instructions">
          Try the silent illustration: choose a note, then adjust its example
          velocity. No music software is connected.
        </p>
        <MagneticLink href={sitePath('/products#midi-downloads')}>
          Explore Typing-to-MIDI{' '}
          <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
        </MagneticLink>
      </div>
      <div className={styles.stage} data-depth-stack>
        <div className={styles.backplate} data-stack-layer aria-hidden="true">
          <span>A message for music software</span>
          <span>MIDI</span>
        </div>
        <TactileSurface className={styles.instrument}>
          <div className={styles.panel}>
            <div className={styles.top}>
              <span>From a key to MIDI</span>
              <span>Silent illustration</span>
            </div>
            <div className={styles.visualizer}>
              <div className={styles.pitch} aria-hidden="true">
                <svg viewBox="0 0 200 160" focusable="false">
                  {[50, 66, 82, 98, 114].map((y) => (
                    <line key={y} x1="0" x2="200" y1={y} y2={y} />
                  ))}
                  {selected === 0 && (
                    <line x1="75" x2="125" y1="130" y2="130" />
                  )}
                  <g
                    className={styles.note}
                    style={{ transform: `translateY(${-selected * 8}px)` }}
                  >
                    <ellipse
                      cx="100"
                      cy="130"
                      rx="13"
                      ry="9"
                      transform="rotate(-15 100 130)"
                    />
                    <path d="M112 128V76" />
                  </g>
                </svg>
                <span>{notes[selected]}4</span>
              </div>
              <dl className={styles.message} aria-label="Example MIDI message">
                <div>
                  <dt>Note number</dt>
                  <dd>{midiNotes[selected]}</dd>
                </div>
                <div>
                  <dt>Example velocity</dt>
                  <dd>
                    {exampleVelocity}
                    <span> / 127</span>
                  </dd>
                </div>
              </dl>
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
              <label htmlFor="music-energy">Illustrated velocity</label>
              <output htmlFor="music-energy">{exampleVelocity} / 127</output>
              <input
                id="music-energy"
                name="visual-energy"
                type="range"
                min="10"
                max="100"
                value={intensity}
                aria-valuetext={`${exampleVelocity} of 127, illustrative MIDI velocity`}
                onChange={(event) => setIntensity(Number(event.target.value))}
              />
            </div>
            <output className={styles.status}>
              {notes[selected]}4 selected · MIDI note {midiNotes[selected]} · no
              sound
            </output>
          </div>
        </TactileSurface>
      </div>
    </section>
  );
}
