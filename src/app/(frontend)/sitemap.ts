import type { MetadataRoute } from 'next'
import { privacyLink } from '@/content/privacy'
import { SUPPORTED_LOCALES } from '@/lib/i18n'
import { SITE_URL } from '@/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const privacyUrls = {
    en: new URL(privacyLink('en').href, SITE_URL).toString(),
    vi: new URL(privacyLink('vi').href, SITE_URL).toString(),
  }
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: new URL('/en', SITE_URL).toString(),
          vi: new URL('/vi', SITE_URL).toString(),
        },
      },
    },
    {
      url: new URL('/en', SITE_URL).toString(),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: new URL('/en', SITE_URL).toString(),
          vi: new URL('/vi', SITE_URL).toString(),
        },
      },
    },
    {
      url: new URL('/vi', SITE_URL).toString(),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: new URL('/en', SITE_URL).toString(),
          vi: new URL('/vi', SITE_URL).toString(),
        },
      },
    },
    ...SUPPORTED_LOCALES.map((locale) => ({
      url: privacyUrls[locale],
      alternates: { languages: { ...privacyUrls, 'x-default': privacyUrls.en } },
    })),
  ]
}
