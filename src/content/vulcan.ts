import type { Metadata } from 'next'
import { vulcanContent as enContent } from '@/content/en/vulcan-augmetics'
import { vulcanContent as viContent } from '@/content/vi/vulcan-augmetics'
import type { Locale } from '@/lib/i18n'
import { OG_IMAGE_URL, SITE_NAME, SITE_URL } from '@/site-config'

export function getVulcanContent(locale: Locale) {
  return locale === 'vi' ? viContent : enContent
}

export function getVulcanMetadata(locale: Locale): Metadata {
  const { seo } = getVulcanContent(locale)
  const path = '/work/vulcan-augmetics'
  const url = new URL(`${locale === 'vi' ? '/vi' : ''}${path}`, SITE_URL).toString()
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: {
      canonical: url,
      languages: {
        en: new URL(`/en${path}`, SITE_URL).toString(),
        vi: new URL(`/vi${path}`, SITE_URL).toString(),
        'x-default': new URL(path, SITE_URL).toString(),
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      alternateLocale: locale === 'vi' ? ['en_US'] : ['vi_VN'],
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: 'Wilson Le portfolio' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [OG_IMAGE_URL],
    },
  }
}
