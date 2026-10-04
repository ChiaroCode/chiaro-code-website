'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import type { RideReadyIntroVideoAsset } from '@/lib/ride-ready-intro-video';
import styles from './ride-ready-video-intro.module.css';

type PlaybackPhase = 'idle' | 'playing' | 'paused' | 'ended' | 'blocked' | 'error';

export function RideReadyVideoIntro({
  asset,
  nextSectionId,
  attemptMutedAutoplay = true,
}: {
  asset: RideReadyIntroVideoAsset;
  nextSectionId: string;
  attemptMutedAutoplay?: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<PlaybackPhase>('idle');
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    function stopAutomaticMotion() {
      if (reducedMotion.matches) {
        player!.autoplay = false;
        player!.pause();
      }
    }
    // Check the preference before enabling autoplay, including on hydration.
    if (attemptMutedAutoplay && !reducedMotion.matches) {
      player.muted = true;
      player.autoplay = true;
      void player.play().catch(() => {
        if (!disposed) setPhase((current) => current === 'error' ? current : 'blocked');
      });
    }
    reducedMotion.addEventListener('change', stopAutomaticMotion);
    return () => {
      disposed = true;
      reducedMotion.removeEventListener('change', stopAutomaticMotion);
      player.autoplay = false;
      player.pause();
    };
  }, [asset.src, attemptMutedAutoplay]);

  function play() {
    const player = video.current;
    if (!player) return;
    if (player.ended) player.currentTime = 0;
    void player.play().catch(() => {
      setPhase((current) => current === 'error' ? current : 'blocked');
    });
  }

  function toggleSound() {
    const player = video.current;
    if (!player) return;
    const enableSound = player.muted || player.volume === 0;
    if (enableSound && player.volume === 0) player.volume = 1;
    player.muted = !enableSound;
    setMuted(!enableSound);
  }

  function continueBelow() {
    video.current?.pause();
  }

  const nextSection = `#${nextSectionId}`;
  const status = phase === 'blocked'
    ? 'Automatic playback was blocked. Select Play video to watch.'
    : phase === 'error'
      ? 'The video is unavailable. Read the transcript or continue below.'
      : phase === 'playing'
        ? muted ? 'Playing muted. Select Sound on to hear the video.' : 'Playing with sound.'
        : phase === 'ended'
          ? 'Video finished. Replay or explore RideReady below.'
          : 'Select Play video to watch, or continue below at any time.';

  return (
    <>
      <section className={styles.intro} aria-labelledby="rideready-video-title" data-video-phase={phase}>
        <div className={styles.top}>
          <h2 id="rideready-video-title">RideReady <span>2.4 preview</span></h2>
          <a href={nextSection} onClick={continueBelow}>Skip video</a>
        </div>
        <div className={styles.frame}>
          <video
            id="rideready-intro-video"
            ref={video}
            className={styles.video}
            src={asset.src}
            poster={asset.poster}
            controls
            muted={muted}
            playsInline
            preload="metadata"
            tabIndex={0}
            aria-label="RideReady introduction video"
            aria-describedby="rideready-video-status"
            onPlay={() => setPhase('playing')}
            onVolumeChange={(event) => setMuted(event.currentTarget.muted || event.currentTarget.volume === 0)}
            onPause={(event) => {
              if (!event.currentTarget.ended) setPhase((current) => current === 'error' ? current : 'paused');
            }}
            onEnded={() => setPhase('ended')}
            onError={() => setPhase('error')}
          >
            <track kind="captions" src={asset.captionsSrc} srcLang="en" label="English" />
            Your browser cannot play this video. Read the transcript or continue to the RideReady overview.
          </video>
        </div>
        <div className={styles.bottom}>
          <div className={styles.controls}>
            <button type="button" onClick={toggleSound} aria-controls="rideready-intro-video" aria-pressed={!muted}>
              {muted ? <VolumeX size={20} aria-hidden="true" /> : <Volume2 size={20} aria-hidden="true" />}
              {muted ? 'Sound on' : 'Sound off'}
            </button>
            {phase !== 'playing' && phase !== 'error' && (
              <button type="button" onClick={play} aria-controls="rideready-intro-video">
                {phase === 'ended' ? <RotateCcw size={20} aria-hidden="true" /> : <Play size={20} aria-hidden="true" />}
                {phase === 'ended' ? 'Replay video' : 'Play video'}
              </button>
            )}
          </div>
          <output id="rideready-video-status" className={styles.status} aria-live="polite">{status}</output>
          {phase === 'ended' && (
            <a className={styles.endCue} href={nextSection} onClick={continueBelow}>
              <ArrowDown size={22} aria-hidden="true" />
              <span>Explore RideReady below</span>
            </a>
          )}
          {(phase === 'blocked' || phase === 'error') && <p className={styles.fallback}>{status}</p>}
        </div>
      </section>
      <details className={styles.transcript}>
        <summary>Read video transcript</summary>
        {asset.transcript.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </details>
    </>
  );
}
