import type { WebsiteTemplatesContent } from '@/content/types'

export const websiteTemplatesContent: WebsiteTemplatesContent = {
  seo: {
    title: 'Website templates | Anh Minh',
    description:
      'Explore website templates, starting with the current wilsonle.me portfolio design.',
  },
  eyebrow: 'Templates',
  heading: 'Website templates',
  introduction: 'A collection of website designs. Starting with the one you’re browsing now.',
  previewLabel: 'Open full preview',
  items: [
    {
      id: 'wilsonle-portfolio',
      name: 'wilsonle.me',
      category: 'Personal portfolio',
      description:
        'The current wilsonle.me website: a personal portfolio with selected work, an introduction, and a dedicated résumé.',
      previewTitle: 'wilsonle.me website template preview',
      path: '/',
      features: ['Responsive layout', 'Project showcase', 'Dedicated résumé'],
    },
  ],
}
