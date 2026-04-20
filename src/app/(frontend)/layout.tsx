import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HtmlLangSync } from '@/components/HtmlLangSync'
import { siteSettings } from '@/content/en/site'
import {
  DEFAULT_META_DESCRIPTION,
  DEFAULT_META_TITLE,
  OG_IMAGE_URL,
  SITE_URL,
  getTwitterHandle,
} from '@/site-config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_META_TITLE,
    template: `%s | ${siteSettings.name}`,
  },
  description: DEFAULT_META_DESCRIPTION,
  keywords: [
    'Full Stack Developer',
    'Software Engineer',
    'Backend Engineer',
    'Python',
    'TypeScript',
    'React',
    'Next.js',
    'FastAPI',
    'AWS',
    'Cloud',
  ],
  authors: [{ name: siteSettings.name }],
  creator: siteSettings.name,
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['vi_VN'],
    url: SITE_URL,
    siteName: siteSettings.name,
    title: DEFAULT_META_TITLE,
    description: DEFAULT_META_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: `${siteSettings.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_META_TITLE,
    description: DEFAULT_META_DESCRIPTION,
    images: [OG_IMAGE_URL],
    creator: getTwitterHandle(),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}>
        <HtmlLangSync />
        <Header siteSettings={siteSettings} />
        <main className="min-h-screen">{children}</main>
        <Footer siteSettings={siteSettings} />
      </body>
    </html>
  )
}
