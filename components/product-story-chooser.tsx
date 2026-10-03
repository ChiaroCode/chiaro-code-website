'use client';

import Image from 'next/image';
import { useSyncExternalStore } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { sitePath } from '@/lib/base-path';
import { midiGuideUrl } from '@/lib/typing-to-midi';
import styles from '@/app/home.module.css';

const stories = [
  {
    key: 'rideready',
    label: 'Pickup coordination',
    title: 'One number. One shared picture.',
    copy: 'RideReady is being developed for staff calling numbers in a busy pickup line. Explore the pairing, zone confirmation, shared display, and announcement flow with a fictional number.',
    status: 'Pilot in development · 2.4.0 additions are not released',
    image: '/images/ride-ready-icon.jpg',
    alt: 'RideReady app icon: a blue car with the numbers four, five, and six',
    href: '/RideReady',
    action: 'Try the pickup walkthrough',
  },
  {
    key: 'midi',
    label: 'Music creation',
    title: 'Begin with the keys at hand.',
    copy: 'Typing-to-MIDI turns a laptop keyboard into a controller for compatible music apps. Play notes and chords, then send them to a virtual instrument using MIDI routing.',
    status: 'Version 1.0.0 available · macOS & Windows',
    image: '/images/typing-to-midi-icon.png',
    alt: 'Typing-to-MIDI app icon with piano keys and musical notes',
    href: '/products#midi-downloads',
    action: 'Get Typing-to-MIDI',
  },
  {
    key: 'setup',
    label: 'Setup essentials',
    title: 'A controller needs an instrument.',
    copy: 'Typing-to-MIDI sends MIDI; it does not make sound itself. Choose a compatible instrument app and a physical or virtual MIDI port, then select the same port in both apps.',
    status: 'Instrument software and MIDI routing required',
    image: '/images/typing-to-midi.png',
    alt: 'Typing-to-MIDI keyboard mapping and MIDI output controls',
    href: midiGuideUrl,
    action: 'Read the setup guide',
  },
];
function getStory() {
  const key = new URLSearchParams(window.location.search).get('tool');
  return Math.max(
    0,
    stories.findIndex((story) => story.key === key),
  );
}
function subscribe(listener: () => void) {
  window.addEventListener('popstate', listener);
  window.addEventListener('chiarocode:toolchange', listener);
  return () => {
    window.removeEventListener('popstate', listener);
    window.removeEventListener('chiarocode:toolchange', listener);
  };
}
export function ProductStoryChooser() {
  const selected = useSyncExternalStore(subscribe, getStory, () => 0);
  const story = stories[selected];
  function choose(index: number) {
    const url = new URL(window.location.href);
    url.searchParams.set('tool', stories[index].key);
    window.history.replaceState(
      window.history.state,
      '',
      `${url.pathname}${url.search}${url.hash}`,
    );
    window.dispatchEvent(new Event('chiarocode:toolchange'));
  }
  function onArrow(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? 2
          : (index + (event.key === 'ArrowRight' ? 1 : -1) + stories.length) %
            stories.length;
    choose(next);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('button')
      [next].focus();
  }
  return (
    <div className={styles.chooser}>
      <fieldset className={styles.storyTabs}>
        <legend className={styles.srOnly}>Choose a product story</legend>
        {stories.map((item, index) => (
          <button
            key={item.key}
            type="button"
            aria-expanded={selected === index}
            aria-controls="product-story-panel"
            onClick={() => choose(index)}
            onKeyDown={(event) => onArrow(event, index)}
          >
            <span>{item.label}</span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </button>
        ))}
      </fieldset>
      <section
        id="product-story-panel"
        className={styles.storyPanel}
        aria-labelledby="product-story-title"
      >
        <div key={story.key} className={styles.storyArtwork}>
          <Image
            src={sitePath(story.image)}
            alt={story.alt}
            width={story.key === 'setup' ? 2320 : 1254}
            height={story.key === 'setup' ? 1380 : 1254}
          />
        </div>
        <div className={styles.storyCopy} key={`${story.key}-copy`}>
          <p className={styles.storyStatus}>{story.status}</p>
          <h3 id="product-story-title">{story.title}</h3>
          <p>{story.copy}</p>
          <a
            className="button-link"
            href={
              story.href.startsWith('/') ? sitePath(story.href) : story.href
            }
          >
            {story.action}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
      <div className={styles.storyControls}>
        <span>
          {selected + 1} / {stories.length}
        </span>
        <div>
          <button
            type="button"
            aria-label="Previous product story"
            onClick={() =>
              choose((selected + stories.length - 1) % stories.length)
            }
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next product story"
            onClick={() => choose((selected + 1) % stories.length)}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <output className={styles.srOnly} aria-live="polite">
        {story.label}: {story.title}
      </output>
    </div>
  );
}
