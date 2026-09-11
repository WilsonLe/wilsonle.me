import type { FieldNoteContent } from '@/content/types'
import { shopFloorSystemsNote as enShopFloorSystemsNote } from '@/content/en/notes'
import { siteSettings } from '@/content/vi/site'

// TODO(i18n): replace English fallback with approved Vietnamese field-note copy.
export const shopFloorSystemsNote: FieldNoteContent = {
  ...enShopFloorSystemsNote,
  locale: 'vi',
  siteSettings,
}
