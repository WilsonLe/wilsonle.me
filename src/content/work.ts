import type { Metadata } from 'next'
import { pangeaChat as enPangeaChat } from '@/content/en/work'
import { pangeaChat as viPangeaChat } from '@/content/vi/work'
import type { WorkContent } from '@/content/work-types'
import type { Locale } from '@/lib/i18n'
import { OG_IMAGE_URL, SITE_NAME, SITE_URL } from '@/site-config'

export const workSlugs = [enPangeaChat.slug]

export function getWorkContent(locale: Locale, slug: string): WorkContent | undefined {
  if (slug !== enPangeaChat.slug) return undefined
  return locale === 'vi' ? viPangeaChat : enPangeaChat
}

export function getWorkMetadata(content: WorkContent): Metadata {
  const path = `/work/${content.slug}`
  const canonical = new URL(`${content.locale === 'vi' ? '/vi' : ''}${path}`, SITE_URL).toString()

  return {
    title: { absolute: content.seo.title },
    description: content.seo.description,
    alternates: {
      canonical,
      languages: {
        en: new URL(`/en${path}`, SITE_URL).toString(),
        vi: new URL(`/vi${path}`, SITE_URL).toString(),
        'x-default': new URL(path, SITE_URL).toString(),
      },
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      locale: content.locale === 'vi' ? 'vi_VN' : 'en_US',
      alternateLocale: content.locale === 'vi' ? ['en_US'] : ['vi_VN'],
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: 'Wilson Le portfolio' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.seo.title,
      description: content.seo.description,
      images: [OG_IMAGE_URL],
    },
  }
}
