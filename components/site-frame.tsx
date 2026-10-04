'use client';

import { usePathname } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { RideReadyVideoIntro } from '@/components/ride-ready-video-intro';
import { approvedRideReadyIntroVideo } from '@/lib/ride-ready-intro-video';

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().replace(/\/$/, '');
  return (
    <>
      {pathname === '/RideReady' && (
        <RideReadyVideoIntro
          asset={approvedRideReadyIntroVideo}
          nextSectionId="rideready-overview"
          attemptMutedAutoplay
        />
      )}
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>{children}</main>
    </>
  );
}
