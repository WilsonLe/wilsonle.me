import { cyobotContent as enContent } from '@/content/en/cyobot'
import { cyobotContent as viContent } from '@/content/vi/cyobot'
import type { Locale } from '@/lib/i18n'

export function getCyobotContent(locale: Locale) {
  return locale === 'vi' ? viContent : enContent
}
