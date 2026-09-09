import type { Metadata } from 'next'
import { ResumePageView } from '@/components/pages/ResumePageView'
import { getResumeContent } from '@/content'
import { OG_IMAGE_URL, SITE_URL } from '@/site-config'

const content = getResumeContent('en')
const canonicalUrl = new URL('/resume', SITE_URL).toString()

export const metadata: Metadata = {
  title: {
    absolute: content.seo.title,
  },
  description: content.seo.description,
  alternates: {
    canonical: canonicalUrl,
    languages: {
      en: new URL('/en/resume', SITE_URL).toString(),
      vi: new URL('/vi/resume', SITE_URL).toString(),
      'x-default': canonicalUrl,
    },
  },
  openGraph: {
    title: content.seo.title,
    description: content.seo.description,
    url: canonicalUrl,
    type: 'profile',
    locale: 'en_US',
    alternateLocale: ['vi_VN'],
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: `${content.siteSettings.name} résumé preview`,
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

export default function ResumePage() {
  return <ResumePageView content={content} />
}
