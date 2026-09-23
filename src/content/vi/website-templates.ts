import type { WebsiteTemplatesContent } from '@/content/types'
import { websiteTemplatesContent as enWebsiteTemplatesContent } from '@/content/en/website-templates'

// TODO(i18n): replace English fallback with reviewed Vietnamese template copy.
export const websiteTemplatesContent: WebsiteTemplatesContent = {
  ...enWebsiteTemplatesContent,
  items: enWebsiteTemplatesContent.items.map((item) => ({
    ...item,
    path: item.path.replace('/template-previews/en/', '/template-previews/vi/'),
  })),
}
