/**
 * RideReady release settings.
 *
 * To publish an installer:
 * 1. Add the file to public/downloads using the matching file name below.
 * 2. Change that platform's `available` value to true.
 */
export const rideReadyDownloads = [
  {
    platform: 'Windows',
    format: '.exe · Windows 10 or later',
    href: '/downloads/RideReady-Setup.exe',
    available: false,
  },
  {
    platform: 'macOS',
    format: '.dmg · Apple silicon & Intel',
    href: '/downloads/RideReady.dmg',
    available: false,
  },
] as const;
