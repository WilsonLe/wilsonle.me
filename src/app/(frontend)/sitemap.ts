import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const templatePages: MetadataRoute.Sitemap = ['', '/en', '/vi'].map((basePath) => ({
    url: new URL(`${basePath}/website-templates`, SITE_URL).toString(),
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: {
      languages: {
        en: new URL('/en/website-templates', SITE_URL).toString(),
        vi: new URL('/vi/website-templates', SITE_URL).toString(),
      },
    },
  }))

  return [
    ...templatePages,
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
    {
      url: new URL('/resume', SITE_URL).toString(),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: new URL('/en/resume', SITE_URL).toString(),
          vi: new URL('/vi/resume', SITE_URL).toString(),
        },
      },
    },
    {
      url: new URL('/en/resume', SITE_URL).toString(),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: new URL('/en/resume', SITE_URL).toString(),
          vi: new URL('/vi/resume', SITE_URL).toString(),
        },
      },
    },
    {
      url: new URL('/vi/resume', SITE_URL).toString(),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: new URL('/en/resume', SITE_URL).toString(),
          vi: new URL('/vi/resume', SITE_URL).toString(),
        },
      },
    },
  ]
}
