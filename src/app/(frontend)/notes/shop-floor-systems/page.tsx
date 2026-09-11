import type { Metadata } from 'next'
import { FieldNotePageView } from '@/components/pages/FieldNotePageView'
import { getShopFloorSystemsNote } from '@/content'
import { SITE_URL } from '@/site-config'

const content = getShopFloorSystemsNote('en')
const canonicalPath = '/notes/shop-floor-systems'
const canonicalUrl = new URL(canonicalPath, SITE_URL).toString()
const heroUrl = new URL(content.hero.src, SITE_URL).toString()

export const metadata: Metadata = {
  title: {
    absolute: content.seo.title,
  },
  description: content.seo.description,
  alternates: {
    canonical: canonicalUrl,
    languages: {
      en: new URL('/en/notes/shop-floor-systems', SITE_URL).toString(),
      vi: new URL('/vi/notes/shop-floor-systems', SITE_URL).toString(),
      'x-default': canonicalUrl,
    },
  },
  openGraph: {
    title: content.seo.title,
    description: content.seo.description,
    url: canonicalUrl,
    type: 'article',
    locale: 'en_US',
    alternateLocale: ['vi_VN'],
    publishedTime: content.publishedDate,
    authors: [content.siteSettings.name],
    images: [
      {
        url: heroUrl,
        width: content.hero.width,
        height: content.hero.height,
        alt: content.hero.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: content.seo.title,
    description: content.seo.description,
    images: [heroUrl],
  },
}

export default function ShopFloorSystemsPage() {
  return <FieldNotePageView canonicalPath={canonicalPath} content={content} routeBasePath="" />
}
