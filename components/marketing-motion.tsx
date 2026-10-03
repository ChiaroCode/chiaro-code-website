'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { motionSprings, springEase } from '@/lib/tactile-runtime';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function MarketingMotion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-mask-reveal]',
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.9,
            ease: springEase(motionSprings.reveal),
          },
        );
        gsap.fromTo(
          '[data-motion-enter]',
          { y: 18 },
          { y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
        );
      });
      media.add('(prefers-reduced-motion: no-preference)', () => {
        scope.current
          ?.querySelectorAll<HTMLElement>('[data-image-reveal]')
          .forEach((image) => {
            gsap.fromTo(
              image,
              { scale: 0.96, opacity: 0.75 },
              {
                scale: 1,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: image,
                  start: 'top 95%',
                  end: 'top 50%',
                  scrub: 0.25,
                },
              },
            );
          });
      });
      media.add(
        '(min-width: 1001px) and (prefers-reduced-motion: no-preference)',
        () => {
          scope.current
            ?.querySelectorAll<HTMLElement>('[data-depth-stack]')
            .forEach((stage) => {
              gsap.fromTo(
                stage.querySelectorAll('[data-stack-layer]'),
                { y: 22, rotation: 0 },
                {
                  y: 0,
                  rotation: -3,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: stage,
                    start: 'top 90%',
                    end: 'top 45%',
                    scrub: 0.3,
                  },
                },
              );
            });
        },
      );
      media.add(
        '(min-width: 1100px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)',
        () => {
          scope.current
            ?.querySelectorAll<HTMLElement>('[data-scroll-story]')
            .forEach((story) => {
              const title =
                story.querySelector<HTMLElement>('[data-pin-title]');
              if (title)
                ScrollTrigger.create({
                  trigger: story,
                  pin: title,
                  pinSpacing: false,
                  start: 'top 130px',
                  end: 'bottom 540px',
                  invalidateOnRefresh: true,
                });
            });
          scope.current
            ?.querySelectorAll<HTMLElement>('[data-scroll-reveal]')
            .forEach((paragraph) => {
              gsap.fromTo(
                paragraph.querySelectorAll('[data-scrub-word]'),
                { opacity: 0.1 },
                {
                  opacity: 1,
                  stagger: 0.08,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: paragraph,
                    start: 'top 82%',
                    end: 'bottom 45%',
                    scrub: 0.3,
                  },
                },
              );
            });
        },
      );
      return () => media.revert();
    },
    { scope },
  );
  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
