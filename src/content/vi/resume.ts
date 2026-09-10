import type { ResumeContent } from '@/content/types'
import { resumeContent as enResumeContent } from '@/content/en/resume'
import { siteSettings } from '@/content/vi/site'

// TODO(i18n): replace English fallback with real Vietnamese résumé-page copy.
export const resumeContent: ResumeContent = {
  ...enResumeContent,
  locale: 'vi',
  siteSettings,
}
