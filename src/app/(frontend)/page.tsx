import type { Metadata } from 'next'
import { HomePageView } from '@/components/pages/HomePageView'
import { getHomeContent } from '@/content'
import { DEFAULT_META_DESCRIPTION, DEFAULT_META_TITLE, OG_IMAGE_URL, SITE_URL } from '@/site-config'

const homeContent = getHomeContent('en')

export const metadata: Metadata = {
  title: {
    absolute: DEFAULT_META_TITLE,
  },
  description: DEFAULT_META_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: new URL('/en', SITE_URL).toString(),
      vi: new URL('/vi', SITE_URL).toString(),
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    title: DEFAULT_META_TITLE,
    description: DEFAULT_META_DESCRIPTION,
    url: SITE_URL,
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['vi_VN'],
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: `${homeContent.siteSettings.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_META_TITLE,
    description: DEFAULT_META_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
}

export default function HomePage() {
  return <HomePageView canonicalPath="/" content={homeContent} />
}
