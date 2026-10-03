'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCheck,
  Link2,
  MapPin,
  Monitor,
  RotateCcw,
  Smartphone,
  Volume2,
} from 'lucide-react';
import styles from '@/app/RideReady/ride-ready.module.css';

const steps = [
  {
    name: 'Pair',
    title: 'A phone joins the host.',
    description:
      'Staff open the pairing link on a phone. The host and controller share the same pickup session.',
    action: 'Pair demo phone',
    result: 'Demo phone paired. Next, call an example number.',
  },
  {
    name: 'Call',
    title: 'Call the next number.',
    description:
      'Enter a number from the pickup line. Try your own fictional number below.',
    action: 'Call this number',
    result: 'Example number called. Next, confirm its zone.',
  },
  {
    name: 'Confirm',
    title: 'Give the call a destination.',
    description:
      'Choose a zone and confirm the call before it reaches the shared board.',
    action: 'Confirm zone',
    result: 'Example zone confirmed. Next, view the shared board.',
  },
  {
    name: 'Display',
    title: 'Everyone sees the same call.',
    description:
      'The shared board holds the number and its zone in view, so the room has a clear reference.',
    action: 'Continue to announcement',
    result: 'Shared board displayed. Next, explore the announcement.',
  },
  {
    name: 'Announce',
    title: 'A visible call. A spoken cue.',
    description:
      'A spoken announcement gives the room another way to follow the call. Optional chimes are planned for 2.4.0.',
    action: 'Restart walkthrough',
    result: 'Walkthrough restarted. Pair the demo phone to begin.',
  },
];
const icons = [Smartphone, Link2, MapPin, Monitor, Volume2];

export function RideReadyDemo() {
  const [step, setStep] = useState(0);
  const [number, setNumber] = useState('247');
  const [zone, setZone] = useState('Zone A');
  const [announcement, setAnnouncement] = useState('');
  const [audioUnavailable, setAudioUnavailable] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const selectedStep = steps[step];
  const validNumber = /^\d{1,4}$/.test(number);
  const exampleNumber = validNumber ? number : '247';

  useEffect(() => {
    return () => {
      utteranceRef.current = null;
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  function stopSpeech() {
    utteranceRef.current = null;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  function selectStep(next: number) {
    stopSpeech();
    setStep(next);
    setAnnouncement(`Step ${next + 1} of 5: ${steps[next].title}`);
  }

  function advance() {
    stopSpeech();
    setStep((step + 1) % steps.length);
    setAnnouncement(selectedStep.result);
  }

  function previewSpeech() {
    if (speaking) {
      stopSpeech();
      return;
    }
    if (
      !('speechSynthesis' in window) ||
      !('SpeechSynthesisUtterance' in window)
    ) {
      setAudioUnavailable(true);
      setAnnouncement(
        'Audio preview is unavailable in this browser. The announcement text is shown on the screen.',
      );
      return;
    }
    const utterance = new SpeechSynthesisUtterance(
      `Number ${exampleNumber.split('').join(' ')}, ${zone}.`,
    );
    utterance.rate = 0.9;
    utterance.onend = () => {
      if (utteranceRef.current !== utterance) return;
      setSpeaking(false);
      utteranceRef.current = null;
    };
    utterance.onerror = () => {
      if (utteranceRef.current !== utterance) return;
      setSpeaking(false);
      utteranceRef.current = null;
      setAnnouncement(
        'Audio preview is unavailable in this browser. The announcement text is shown on the screen.',
      );
    };
    utteranceRef.current = utterance;
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className={styles.demo}>
      <div className={styles.demoTop}>
        <span>Interactive walkthrough</span>
        <span>Fictional example · no real connection</span>
      </div>
      <div className={styles.stepList} aria-label="Walkthrough steps">
        {steps.map((item, index) => {
          const Icon = icons[index];
          return (
            <button
              key={item.name}
              type="button"
              aria-pressed={step === index}
              aria-label={`Step ${index + 1}: ${item.name}`}
              className={`${styles.stepButton} ${step === index ? styles.activeStep : ''}`}
              onClick={() => selectStep(index)}
            >
              <span className={styles.stepIcon}>
                <Icon size={20} aria-hidden="true" />
              </span>
              <span>
                {index + 1}. {item.name}
              </span>
            </button>
          );
        })}
      </div>
      <div className={styles.demoBody}>
        <div className={styles.demoCopy}>
          <p className="section-label">Step {step + 1} of 5</p>
          <h3>{selectedStep.title}</h3>
          <p>{selectedStep.description}</p>
          {step === 1 && (
            <div className={styles.field}>
              <label htmlFor="demo-number">Example number</label>
              <input
                id="demo-number"
                name="example-number"
                autoComplete="off"
                spellCheck={false}
                type="text"
                inputMode="numeric"
                pattern="[0-9]{1,4}"
                maxLength={4}
                value={number}
                onChange={(event) =>
                  setNumber(event.target.value.replace(/\D/g, ''))
                }
                aria-describedby="demo-number-note"
              />
              <span id="demo-number-note">
                Use 1–4 digits. Fictional numbers only.
              </span>
            </div>
          )}
          {step === 2 && (
            <div className={styles.field}>
              <label htmlFor="demo-zone">Pickup zone</label>
              <select
                id="demo-zone"
                name="pickup-zone"
                autoComplete="off"
                value={zone}
                onChange={(event) => setZone(event.target.value)}
              >
                <option>Zone A</option>
                <option>Zone B</option>
                <option>Zone C</option>
              </select>
            </div>
          )}
          <button
            type="button"
            className="button-link"
            onClick={advance}
            disabled={step === 1 && !validNumber}
          >
            {selectedStep.action}
            {step === 4 ? (
              <RotateCcw size={17} aria-hidden="true" />
            ) : (
              <ArrowRight size={17} aria-hidden="true" />
            )}
          </button>
          <div className={styles.demoNavigation}>
            <button
              type="button"
              onClick={() => selectStep(step - 1)}
              disabled={step === 0}
            >
              <ArrowLeft size={16} aria-hidden="true" /> Previous step
            </button>
            <span>{step + 1} / 5</span>
          </div>
        </div>
        <div className={styles.stage}>
          <div className={styles.stageScene} key={step}>
            {step === 0 && (
              <div className={styles.pairScene}>
                <div className={styles.device}>
                  <Monitor size={40} aria-hidden="true" />
                  <strong>Host</strong>
                  <span>Pickup session</span>
                </div>
                <div className={styles.pairLink}>
                  <Link2 size={26} aria-hidden="true" />
                  <span>Pairing link</span>
                </div>
                <div className={`${styles.device} ${styles.phone}`}>
                  <Smartphone size={40} aria-hidden="true" />
                  <strong>Phone</strong>
                  <span>Ready to pair</span>
                </div>
              </div>
            )}
            {step === 1 && (
              <div className={styles.callScene}>
                <Smartphone size={26} aria-hidden="true" />
                <span>Phone controller</span>
                <strong className={styles.bigNumber}>{number || '—'}</strong>
                <span>Ready to call</span>
                <div className={styles.numberDots} aria-hidden="true">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && (
              <div className={styles.confirmScene}>
                <span>Confirm this call</span>
                <strong className={styles.bigNumber}>{number || '247'}</strong>
                <div className={styles.zonePill}>
                  <MapPin size={18} aria-hidden="true" />
                  {zone}
                </div>
                <div className={styles.confirmMark}>
                  <Check size={26} aria-hidden="true" />
                </div>
                <span>Choose the destination, then confirm.</span>
              </div>
            )}
            {step === 3 && (
              <div className={styles.sharedScene}>
                <div className={styles.sceneLabel}>
                  <Monitor size={18} aria-hidden="true" /> Shared board
                </div>
                <div className={styles.sharedCards}>
                  <div className={styles.calledCard}>
                    <span>{zone}</span>
                    <strong>{number || '247'}</strong>
                    <span>
                      <CheckCheck size={16} aria-hidden="true" /> Called
                    </span>
                  </div>
                  <div className={styles.quietCard}>
                    <span>Zone B</span>
                    <strong>408</strong>
                    <span>Called</span>
                  </div>
                </div>
                <p>The same number, in view.</p>
              </div>
            )}
            {step === 4 && (
              <div className={styles.audioScene}>
                <Volume2 size={32} aria-hidden="true" />
                <p className={styles.speechText}>
                  “Number {exampleNumber}, {zone}.”
                </p>
                <div
                  className={`${styles.wave} ${speaking ? styles.isSpeaking : ''}`}
                  aria-hidden="true"
                >
                  {Array.from({ length: 17 }, (_, index) => (
                    <span
                      key={index}
                      style={
                        {
                          '--bar-height': `${16 + ((index * 13) % 37)}px`,
                          '--bar-delay': `${index * 35}ms`,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
                <button
                  className={styles.previewButton}
                  type="button"
                  disabled={audioUnavailable}
                  onClick={previewSpeech}
                >
                  {speaking
                    ? 'Stop audio'
                    : audioUnavailable
                      ? 'Browser audio unavailable'
                      : 'Play speech example'}
                </button>
                <p className={styles.audioNote}>
                  Uses your browser voice. App voices may differ.
                  <br />
                  Planned: optional chime → spoken number.
                </p>
              </div>
            )}
          </div>
          <span className={styles.sceneCaption}>
            Illustrative flow · pilot software in development
          </span>
        </div>
      </div>
      <output className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {announcement}
      </output>
      <p className={styles.demoFootnote}>
        The current online relay uses manual setup. Automatic online pairing is
        being integrated; a phone connection over cellular has not yet been
        confirmed.
      </p>
    </div>
  );
}
