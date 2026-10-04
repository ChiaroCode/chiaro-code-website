import { sitePath } from '@/lib/base-path';

export type RideReadyIntroVideoAsset = {
  src: string;
  poster: string;
  captionsSrc: string;
  transcript: string;
  portraitSrc: string;
  portraitPoster: string;
  portraitCaptionsSrc: string;
};

export const approvedRideReadyIntroVideo: RideReadyIntroVideoAsset = {
  src: sitePath('/media/rideready/ride-ready-intro-79s.mp4'),
  poster: sitePath('/media/rideready/ride-ready-intro-poster.jpg'),
  captionsSrc: sitePath('/media/rideready/ride-ready-intro-captions.vtt'),
  portraitSrc: sitePath('/media/rideready/ride-ready-intro-portrait-79s.mp4'),
  portraitPoster: sitePath('/media/rideready/ride-ready-intro-portrait-poster.jpg'),
  portraitCaptionsSrc: sitePath('/media/rideready/ride-ready-intro-portrait-captions.vtt'),
  transcript: `Chiaro Code presents RideReady. Clear numbers. Clear zones. A calmer pickup.

Your laptop is the controller. Put the pickup board on a TV.

Enter two forty-seven. Choose Zone one, then add it. The TV updates.

Drag the number to Zone two. Check the destination and confirm the move.

Scan the pairing code on your phone. Use the same Wi-Fi and keep the laptop running.

Your phone is now a wireless controller. Add four oh eight to Zone one. The same TV updates.

Chime and voice are optional. Switch them on for a chime before each spoken number.

Number two forty-seven. Zone two.

Choose a readable theme and show call counts in Settings.

Wireless control uses the same Wi-Fi. Online relay is planned.

Close the session when pickup is finished.

RideReady, by Chiaro Code. Explore the product online.`,
};
