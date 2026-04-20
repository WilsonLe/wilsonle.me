import { siteSettings } from '@/content/en/site'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://wilsonle.me'

export const SITE_NAME = siteSettings.name

export const DEFAULT_META_TITLE =
  siteSettings.seo?.metaTitle || `${siteSettings.name} | ${siteSettings.title}`

export const DEFAULT_META_DESCRIPTION =
  siteSettings.seo?.metaDescription || siteSettings.tagline || 'Portfolio website'

export const OG_IMAGE_PATH = '/og-image.svg'

export const OG_IMAGE_URL = new URL(OG_IMAGE_PATH, SITE_URL).toString()

export function buildAbsoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString()
}

export function getTwitterHandle() {
  const twitterUrl = siteSettings.social?.twitter

  if (!twitterUrl) {
    return undefined
  }

  try {
    const pathname = new URL(twitterUrl).pathname.replace(/^\/+/, '')

    if (!pathname) {
      return undefined
    }

    return pathname.startsWith('@') ? pathname : `@${pathname}`
  } catch {
    return undefined
  }
}

export function getSocialLinks() {
  return [
    siteSettings.social?.github,
    siteSettings.social?.linkedin,
    siteSettings.social?.twitter,
  ].filter((value): value is string => Boolean(value))
}
