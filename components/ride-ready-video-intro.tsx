'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import type { RideReadyIntroVideoAsset } from '@/lib/ride-ready-intro-video';
import styles from './ride-ready-video-intro.module.css';

type PlaybackPhase = 'idle' | 'playing' | 'paused' | 'ended' | 'blocked' | 'error';

function updateCaptionVisibility(player: HTMLVideoElement, showing: boolean) {
  const track = player.textTracks[0];
  if (track) track.mode = showing ? 'showing' : 'hidden';
}

export function RideReadyVideoIntro({
  asset,
  nextSectionId,
  attemptAutoplay = true,
}: {
  asset: RideReadyIntroVideoAsset;
  nextSectionId: string;
  attemptAutoplay?: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<PlaybackPhase>('idle');
  const [muted, setMuted] = useState(false);
  const [portrait, setPortrait] = useState(false);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const portraitWindow = window.matchMedia('(max-aspect-ratio: 1/1)');
    let disposed = false;
    let restorePosition: (() => void) | undefined;
    function choosePresentation() {
      const isPortrait = portraitWindow.matches;
      setPortrait(isPortrait);
      player!.poster = isPortrait ? asset.portraitPoster : asset.poster;
      return isPortrait ? asset.portraitSrc : asset.src;
    }
    const initialSource = choosePresentation();
    if (player.currentSrc !== new URL(initialSource, window.location.href).href) player.src = initialSource;
    function changePresentation() {
      const time = player!.currentTime;
      const wasPlaying = !player!.paused && !player!.ended;
      const currentMuted = player!.muted;
      player!.autoplay = false;
      if (restorePosition) player!.removeEventListener('loadedmetadata', restorePosition);
      restorePosition = () => {
        player!.currentTime = Math.min(time, player!.duration);
        player!.muted = currentMuted;
        if (wasPlaying) {
          void player!.play().catch(() => {
            if (!disposed) setPhase((current) => current === 'error' ? current : 'blocked');
          });
        }
      };
      player!.addEventListener('loadedmetadata', restorePosition, { once: true });
      player!.src = choosePresentation();
    }
    function stopAutomaticMotion() {
      if (reducedMotion.matches) {
        player!.autoplay = false;
        player!.pause();
      }
    }
    // Check the preference before enabling autoplay, including on hydration.
    if (attemptAutoplay && !reducedMotion.matches) {
      player.muted = false;
      player.autoplay = true;
      void player.play().catch(async (error: unknown) => {
        if (disposed || (error instanceof DOMException && error.name === 'AbortError')) return;
        if (!(error instanceof DOMException) || error.name !== 'NotAllowedError') {
          setPhase('error');
          return;
        }
        player.muted = true;
        setMuted(true);
        try {
          await player.play();
        } catch {
          if (!disposed) setPhase((current) => current === 'error' ? current : 'blocked');
        }
      });
    }
    reducedMotion.addEventListener('change', stopAutomaticMotion);
    portraitWindow.addEventListener('change', changePresentation);
    return () => {
      disposed = true;
      reducedMotion.removeEventListener('change', stopAutomaticMotion);
      portraitWindow.removeEventListener('change', changePresentation);
      if (restorePosition) player.removeEventListener('loadedmetadata', restorePosition);
      player.autoplay = false;
      player.pause();
    };
  }, [asset.src, asset.poster, asset.portraitSrc, asset.portraitPoster, attemptAutoplay]);

  useEffect(() => {
    if (video.current) updateCaptionVisibility(video.current, portrait);
  }, [portrait]);

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
        ? muted ? 'Playing muted because sound needs your permission. Select Turn sound on to hear the video.' : 'Playing with sound.'
        : phase === 'ended'
          ? 'Video finished. Replay or explore RideReady below.'
          : 'Select Play video to watch, or continue below at any time.';

  return (
    <>
      <section className={styles.intro} aria-labelledby="rideready-video-title" data-video-phase={phase}>
        <div className={styles.top}>
          <h2 id="rideready-video-title"><span className={styles.productName}>RideReady</span> <span>2.4 preview</span></h2>
          <a href={nextSection} onClick={continueBelow}>Skip video</a>
        </div>
        <div className={styles.frame}>
          <video
            id="rideready-intro-video"
            ref={video}
            className={styles.video}
            poster={asset.poster}
            controls
            muted={muted}
            playsInline
            preload="metadata"
            tabIndex={0}
            aria-label="RideReady introduction video"
            aria-describedby="rideready-video-status"
            onPlay={() => setPhase('playing')}
            onLoadedData={(event) => updateCaptionVisibility(event.currentTarget, portrait)}
            onVolumeChange={(event) => setMuted(event.currentTarget.muted || event.currentTarget.volume === 0)}
            onPause={(event) => {
              if (!event.currentTarget.ended) setPhase((current) => current === 'error' || current === 'ended' ? current : 'paused');
            }}
            onEnded={() => setPhase('ended')}
            onError={() => setPhase('error')}
          >
            <source src={asset.portraitSrc} media="(max-aspect-ratio: 1/1)" type="video/mp4" />
            <source src={asset.src} type="video/mp4" />
            <track kind="captions" src={portrait ? asset.portraitCaptionsSrc : asset.captionsSrc} srcLang="en" label="English" default={portrait} />
            Your browser cannot play this video. Read the transcript or continue to the RideReady overview.
          </video>
        </div>
        <div className={styles.bottom}>
          <div className={styles.controls}>
            <button type="button" onClick={toggleSound} aria-controls="rideready-intro-video" aria-pressed={!muted}>
              {muted ? <VolumeX size={20} aria-hidden="true" /> : <Volume2 size={20} aria-hidden="true" />}
              {muted ? 'Turn sound on' : 'Sound off'}
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
