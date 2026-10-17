import type { Metadata, Viewport } from 'next';
import { companyImage } from '@/lib/site-brand';
import { CursorHalo } from '@/components/cursor-halo';
import { SiteFooter } from '@/components/site-footer';
import { SiteFrame } from '@/components/site-frame';
import { sitePath } from '@/lib/base-path';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Chiarocode | Frictionless Access to Music Education',
    template: '%s | Chiarocode',
  },
  description:
    'Fewer barriers. More music. Chiarocode builds practical tools for schools and students: RideReady for pickup logistics and Typing-to-MIDI for accessible music creation.',
  openGraph: {
    type: 'website',
    siteName: 'Chiarocode',
    images: [companyImage],
  },
  twitter: { card: 'summary_large_image', images: [companyImage] },
  icons: {
    icon: [
      { url: sitePath('/brand/favicon.svg'), type: 'image/svg+xml' },
      {
        url: sitePath('/brand/favicon-32.png'),
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: sitePath('/brand/favicon-48.png'),
        type: 'image/png',
        sizes: '48x48',
      },
    ],
    apple: sitePath('/brand/apple-touch-icon.png'),
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F9FC' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href={sitePath('/fonts/lato-400.woff2')}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteFrame>{children}</SiteFrame>
        <SiteFooter />
        <CursorHalo />
      </body>
    </html>
  );
}
