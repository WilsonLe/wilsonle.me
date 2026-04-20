import type { SiteSettings } from '@/content/types'
import { siteSettings as enSiteSettings } from '@/content/en/site'

// TODO(i18n): replace English fallback with real Vietnamese site copy.
export const siteSettings: SiteSettings = {
  ...enSiteSettings,
}
