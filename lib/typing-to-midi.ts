/** Published v1.0.0 assets, verified against the project's GitHub release. */
export const midiReleaseUrl = 'https://github.com/Retroalligator/typing-to-midi-controller/releases/tag/v1.0.0';
export const midiGuideUrl = 'https://github.com/Retroalligator/typing-to-midi-controller/blob/v1.0.0/README.md';

export const midiDownloads = [
  { platform: 'macOS · Apple silicon', format: 'ZIP · M-series Macs', file: 'Typing-to-MIDI-1.0.0-mac-arm64.zip' },
  { platform: 'macOS · Intel', format: 'ZIP · Intel Macs', file: 'Typing-to-MIDI-1.0.0-mac-x64.zip' },
  { platform: 'Windows · Installer', format: 'EXE · Windows x64', file: 'Typing-to-MIDI-1.0.0-win-x64.exe' },
  { platform: 'Windows · Portable', format: 'ZIP · Windows x64', file: 'Typing-to-MIDI-1.0.0-win-x64.zip' },
].map((download) => ({
  ...download,
  href: `https://github.com/Retroalligator/typing-to-midi-controller/releases/download/v1.0.0/${download.file}`,
}));
