import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { sitePath } from '@/lib/base-path';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Chiaro Code | Frictionless Access to Music Education',
    template: '%s | Chiaro Code',
  },
  description: 'Fewer barriers. More music. Chiaro Code builds practical tools for schools and students: RideReady for pickup logistics and Typing-to-MIDI for accessible music creation.',
  icons: {
    icon: [
      { url: sitePath('/favicon.svg'), type: 'image/svg+xml' },
      { url: sitePath('/images/chiaro-code-mark.png'), type: 'image/png', sizes: '1254x1254' },
    ],
    apple: sitePath('/images/chiaro-code-mark.png'),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
