import { Metadata, Viewport } from 'next'

const Site = 'Marszy'
const Description = "Marszy's Profile"
const twitterCard = `https://image.loveur.life/fengmian.png`
const CanonicalUrl = 'https://loveur.life'

export const SiteMeta: Metadata = {
  metadataBase: new URL(CanonicalUrl),
  title: Site,
  description: Description,
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
    icon: [{ url: '/favicon.ico' }, new URL('/favicon.ico', CanonicalUrl)],
    shortcut: ['/android-chrome-192x192.png'],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
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