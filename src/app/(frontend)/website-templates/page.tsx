import type { Metadata } from 'next'
import { WebsiteTemplatesPageView } from '@/components/pages/WebsiteTemplatesPageView'
import { getWebsiteTemplatesContent } from '@/content'
import { OG_IMAGE_URL, SITE_NAME, SITE_URL } from '@/site-config'

const content = getWebsiteTemplatesContent('en')
const canonicalUrl = new URL('/website-templates', SITE_URL).toString()

export const metadata: Metadata = {
  title: {
    absolute: content.seo.title,
  },
  description: content.seo.description,
  alternates: {
    canonical: canonicalUrl,
    languages: {
      en: new URL('/en/website-templates', SITE_URL).toString(),
      vi: new URL('/vi/website-templates', SITE_URL).toString(),
      'x-default': canonicalUrl,
    },
  },
  openGraph: {
    title: content.seo.title,
    description: content.seo.description,
    url: canonicalUrl,
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    alternateLocale: ['vi_VN'],
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'wilsonle.me portfolio preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: content.seo.title,
    description: content.seo.description,
    images: [OG_IMAGE_URL],
  },
}

export default function WebsiteTemplatesPage() {
  return <WebsiteTemplatesPageView content={content} routeBasePath="" />
}
