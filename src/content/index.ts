import { websiteTemplatesContent as enWebsiteTemplatesContent } from '@/content/en/website-templates'
import { websiteTemplatesContent as viWebsiteTemplatesContent } from '@/content/vi/website-templates'
import { homeContent as enHomeContent } from '@/content/en/home'
import { resumeContent as enResumeContent } from '@/content/en/resume'
import { siteSettings as enSiteSettings } from '@/content/en/site'
import type { HomeContent, ResumeContent, SiteSettings } from '@/content/types'
import { homeContent as viHomeContent } from '@/content/vi/home'
import { resumeContent as viResumeContent } from '@/content/vi/resume'
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

const resumeContentByLocale: Record<Locale, ResumeContent> = {
  en: enResumeContent,
  vi: viResumeContent,
}

export function getHomeContent(locale: Locale) {
  return homeContentByLocale[locale]
}

export function getSiteSettings(locale: Locale) {
  return siteSettingsByLocale[locale]
}

export function getResumeContent(locale: Locale) {
  return resumeContentByLocale[locale]
}

export function getWebsiteTemplatesContent(locale: Locale) {
  return locale === 'vi' ? viWebsiteTemplatesContent : enWebsiteTemplatesContent
}
