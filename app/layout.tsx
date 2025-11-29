import { SiteMeta, SiteViewport } from './components/siteMeta'
import './globals.css'
import Footer from './components/Footer'
import { Providers } from './components/Providers'

// 修复 FontAwesome
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import { Overpass } from 'next/font/google'
const overpass = Overpass({
  subsets: ['latin'],
  variable: '--font-overpass',
  weight: ['400', '500', '800'],
  display: 'swap',
})

export const metadata = SiteMeta
export const viewport = SiteViewport

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${overpass.variable} font-sans`} suppressHydrationWarning>
      <body className="dotback2 box-border flex min-h-[100dvh] flex-col bg-[#F5F5F7] tracking-tight antialiased selection:bg-sky-600/20 dark:bg-[#0d1117] dark:text-gray-100 md:tracking-normal">
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
