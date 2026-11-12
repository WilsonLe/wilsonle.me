import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import type { CyobotShowcase } from '@/content/cyobot-types'
import { OG_IMAGE_URL, SITE_NAME, SITE_URL } from '@/site-config'

export function cyobotMetadata(content: CyobotShowcase, locale: Locale): Metadata {
  const canonicalUrl = new URL(`${locale === 'vi' ? '/vi' : ''}/work/cyobot`, SITE_URL).toString()
  return {
    title: { absolute: content.seo.title },
    description: content.seo.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: new URL('/en/work/cyobot', SITE_URL).toString(),
        vi: new URL('/vi/work/cyobot', SITE_URL).toString(),
        'x-default': new URL('/work/cyobot', SITE_URL).toString(),
      },
    },
    openGraph: {
      siteName: SITE_NAME,
      title: content.seo.title,
      description: content.seo.description,
      url: canonicalUrl,
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      alternateLocale: [locale === 'vi' ? 'en_US' : 'vi_VN'],
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: content.seo.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.seo.title,
      description: content.seo.description,
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: content.seo.title }],
    },
  }
}
