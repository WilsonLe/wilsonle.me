import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { siteSettings } from '@/lib/content'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wilsonle.me'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteSettings.seo?.metaTitle || `${siteSettings.name} | ${siteSettings.title}`,
    template: `%s | ${siteSettings.name}`,
  },
  description:
    siteSettings.seo?.metaDescription || siteSettings.tagline || 'Portfolio website',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteSettings.name,
    title: siteSettings.seo?.metaTitle || `${siteSettings.name} | ${siteSettings.title}`,
    description:
      siteSettings.seo?.metaDescription || siteSettings.tagline || 'Portfolio website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteSettings.seo?.metaTitle || `${siteSettings.name} | ${siteSettings.title}`,
    description:
      siteSettings.seo?.metaDescription || siteSettings.tagline || 'Portfolio website',
    creator: '@wilsonle02',
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
        <Header siteSettings={siteSettings} />
        <main className="min-h-screen">{children}</main>
        <Footer siteSettings={siteSettings} />
      </body>
    </html>
  )
}
