'use client';

import { useRef } from 'react';
import gsap from 'gsap';
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
          '[data-motion-enter]',
          { y: 18 },
          { y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
        );
      });
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
