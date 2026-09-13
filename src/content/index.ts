import { homeContent as enHomeContent } from '@/content/en/home'
import { shopFloorSystemsNote as enShopFloorSystemsNote } from '@/content/en/notes'
import { resumeContent as enResumeContent } from '@/content/en/resume'
import { siteSettings as enSiteSettings } from '@/content/en/site'
import type { FieldNoteContent, HomeContent, ResumeContent, SiteSettings } from '@/content/types'
import { homeContent as viHomeContent } from '@/content/vi/home'
import { shopFloorSystemsNote as viShopFloorSystemsNote } from '@/content/vi/notes'
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

const shopFloorSystemsNoteByLocale: Record<Locale, FieldNoteContent> = {
  en: enShopFloorSystemsNote,
  vi: viShopFloorSystemsNote,
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

export function getShopFloorSystemsNote(locale: Locale) {
  return shopFloorSystemsNoteByLocale[locale]
}
