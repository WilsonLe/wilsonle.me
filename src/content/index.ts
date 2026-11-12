import { homeContent as enHomeContent } from '@/content/en/home'
import { siteSettings as enSiteSettings } from '@/content/en/site'
import type { HomeContent, SiteSettings } from '@/content/types'
import { homeContent as viHomeContent } from '@/content/vi/home'
import { siteSettings as viSiteSettings } from '@/content/vi/site'
import type { Locale } from '@/lib/i18n'

const homeContentByLocale: Record<Locale, HomeContent> = {
  en: enHomeContent,
  vi: viHomeContent,
}

const siteSettingsByLocale: Record<Locale, SiteSettings> = {
  en: enSiteSettings,
  vi: viSiteSettings,
}

export function getHomeContent(locale: Locale) {
  return homeContentByLocale[locale]
}

export function getSiteSettings(locale: Locale) {
  return siteSettingsByLocale[locale]
}
