import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
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
  ]
}
