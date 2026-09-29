import type { About, Hero, HomeContent, Now, Principles, Project, Projects } from '@/content/types'
import { siteSettings } from '@/content/en/site'

const hero: Hero = {
  identity: 'Wilson Le',
  heading: 'Forward Deployed Engineer at Lyra',
  workCta: 'Explore selected work',
  resumeCta: 'View résumé',
  skipToWorkLabel: 'Skip to selected work',
  locationLabel: 'Based in',
  socialLabel: 'Social profiles',
}

const about: About = {
  heading: 'About Me',
  portrait: {
    src: 'https://avatars.githubusercontent.com/u/43991506',
    alt: 'Portrait of Wilson Le',
  },
  content: [
    "I'm Wilson Le, a forward deployed engineer based in Brisbane, Queensland.",
    'I build useful products and keep them dependable after launch.',
  ],
}

const projectItems: Project[] = [
  {
    id: 'pangea-chat',
    name: 'Pangea Chat',
    visibility: 'Public product',
    summary:
      'Friends practise new languages together through AI-powered conversations in Pangea Chat.',
    contribution: 'I built the frontend, AI services, and delivery systems behind the product.',
    url: 'https://app.pangea.chat/',
    linkLabel: 'Open Pangea Chat',
  },
  {
    id: 'cyobot-robotics-quest',
    name: 'CYOBot Robotics Quest',
    visibility: 'Public product',
    summary: 'Students learn coding and robotics through a browser-based learning platform.',
    contribution: 'I built its coding portal, content system, and shared sign-in flow.',
    url: 'https://dashboard.cyobot.com/',
    linkLabel: 'Open Robotics Quest',
  },
  {
    id: 'vulcan-internal-platform',
    name: 'Vulcan internal platform',
    visibility: 'Private internal system',
    summary: 'An internal platform helped teams manage content, access, and production services.',
    contribution: 'I built content and access workflows, then added monitoring for production.',
  },
]

const projects: Projects = {
  heading: 'Selected work',
  productLabel: 'The product',
  contributionLabel: 'My part',
  items: projectItems,
}

const principles: Principles = {
  eyebrow: 'How I work',
  heading: 'The principles behind the build.',
  introduction: 'Good engineering choices survive deployment and the work that follows.',
  items: [
    {
      id: 'whole-path',
      title: 'Follow the whole path',
      description:
        'I follow problems from the first user interaction through delivery and operation.',
    },
    {
      id: 'built-to-run',
      title: 'Build it to run',
      description: 'I plan for releases and monitoring while building the product itself.',
    },
    {
      id: 'leave-a-map',
      title: 'Leave a map',
      description:
        'I leave clear documentation so teammates can understand and improve the system.',
    },
  ],
}

const now: Now = {
  eyebrow: 'Now',
  heading: 'Currently in Brisbane.',
  updatedLabel: 'Updated September 2026',
  items: [
    {
      label: 'Based',
      value: 'Brisbane, Queensland',
    },
    {
      label: 'Studying',
      value:
        'Master of Information Systems at the University of Southern Queensland · expected August 2027',
    },
    {
      label: 'Focused on',
      value: 'Building useful products and keeping them dependable after launch.',
    },
  ],
}

export const homeContent: HomeContent = {
  locale: 'en',
  siteSettings,
  hero,
  about,
  projects,
  principles,
  now,
  seo: {
    title: siteSettings.seo?.metaTitle || `${siteSettings.name} | ${siteSettings.title}`,
    description: siteSettings.seo?.metaDescription || 'Portfolio website',
  },
}
