import type { HomeContent } from '@/content/types'
import { homeContent as enHomeContent } from '@/content/en/home'
import { siteSettings } from '@/content/vi/site'

// TODO(i18n): replace English fallback with real Vietnamese home-page copy.
export const homeContent: HomeContent = {
  ...enHomeContent,
  locale: 'vi',
  siteSettings,
}
