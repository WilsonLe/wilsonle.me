import { pangeaChat as enPangeaChat } from '@/content/en/work'
import type { WorkContent } from '@/content/work-types'

// TODO(i18n): replace this explicit English fallback with reviewed Vietnamese copy.
export const pangeaChat: WorkContent = { ...enPangeaChat, locale: 'vi' }
