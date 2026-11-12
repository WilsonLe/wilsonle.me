import type { Metadata } from 'next'
import type { WorkShowcaseContent } from '@/content/types'
import type { Locale } from '@/lib/i18n'
import { OG_IMAGE_URL, SITE_NAME, SITE_URL } from '@/site-config'

export function workShowcaseMetadata(content: WorkShowcaseContent, locale: Locale): Metadata {
  const path = content.path
  const canonicalUrl = new URL(locale === 'vi' ? `/vi${path}` : path, SITE_URL).toString()

  return {
    title: { absolute: content.seo.title },
    description: content.seo.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: new URL(`/en${path}`, SITE_URL).toString(),
        vi: new URL(`/vi${path}`, SITE_URL).toString(),
        'x-default': new URL(path, SITE_URL).toString(),
      },
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      siteName: SITE_NAME,
      url: canonicalUrl,
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      alternateLocale: locale === 'vi' ? ['en_US'] : ['vi_VN'],
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: content.seo.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.seo.title,
      description: content.seo.description,
      images: [OG_IMAGE_URL],
    },
  }
}
