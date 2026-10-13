import type { Metadata, Viewport } from 'next'

const Site = 'Marszy'
const Description = "Marszy's Profile"
const twitterCard = `https://image.loveur.life/fengmian.png`
const CanonicalUrl = 'https://loveur.life'

export const SiteMeta: Metadata = {
  metadataBase: new URL(CanonicalUrl),
  title: Site,
  description: Description,
  alternates: { canonical: '/' },
  manifest: '/site.webmanifest',
  openGraph: {
    title: Site,
    siteName: Site,
    description: Description,
    images: twitterCard,
    type: 'website',
    url: CanonicalUrl,
  },
  twitter: {
    site: '@Marszy_Official',
    card: 'summary_large_image',
  },
  applicationName: Site,
  icons: {
    icon: '/favicon.ico',
    shortcut: ['/android-chrome-192x192.png'],
    apple: '/apple-touch-icon.png',
  },
}

export const SiteViewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F5F7' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1117' },
  ],
  width: 'device-width',
  initialScale: 1,
}
