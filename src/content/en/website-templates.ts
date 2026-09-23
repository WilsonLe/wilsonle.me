import type { WebsiteTemplatesContent } from '@/content/types'

export const websiteTemplatesContent: WebsiteTemplatesContent = {
  seo: {
    title: 'Website templates | Anh Minh',
    description: 'Explore portfolio, digital agency, and restaurant website templates.',
  },
  eyebrow: 'Templates',
  heading: 'Website templates',
  introduction:
    'Three website designs to explore: a personal portfolio, a digital agency, and a neighbourhood restaurant.',
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
    {
      id: 'digital-agency',
      name: 'Digital agency',
      category: 'Agency & services',
      description:
        'A bold agency website with a dark gradient hero, service cards, and a clear path through the offer. Previewed with fictional branding and sample copy.',
      previewTitle: 'Digital agency website template preview',
      path: '/template-previews/en/agency',
      standalonePreview: true,
      features: ['Gradient hero', 'Service showcase', 'Expandable FAQs'],
    },
    {
      id: 'neighbourhood-restaurant',
      name: 'Neighbourhood restaurant',
      category: 'Food & hospitality',
      description:
        'A warm restaurant website with generous food photography, a menu grid, and space for your story. Previewed with fictional branding and sample copy.',
      previewTitle: 'Neighbourhood restaurant website template preview',
      path: '/template-previews/en/restaurant',
      standalonePreview: true,
      features: ['Food photography', 'Menu showcase', 'Visit section'],
    },
  ],
}
