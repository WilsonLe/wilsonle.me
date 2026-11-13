import type { About, Hero, HomeContent, Now, Principles, Project, Projects } from '@/content/types'
import { siteSettings } from '@/content/en/site'
import { techStack } from '@/content/en/tech-stack'

const hero: Hero = {
  identity: 'Wilson Le',
  heading: 'Forward Deployed Engineer at Lyra',
  workCta: 'View work',
  resumeCta: 'Download résumé',
  skipToWorkLabel: 'Skip to work',
  stack: techStack,
}

const about: About = {
  heading: 'About Me',
  portrait: {
    src: '/images/wilson-portrait.jpg',
    alt: 'Portrait of Wilson Le',
  },
  content: [
    "I'm Wilson Le, a forward deployed engineer based in Brisbane, Queensland.",
    'I build useful products and keep them dependable after launch.',
  ],
}

const projectItems: Project[] = [
  {
    id: 'kalibr',
    name: 'Kalibr',
    summary: 'Competitive games and gameplay analytics.',
    contribution: 'Built the game library UI, analytics processing pipelines and admin panels.',
    url: 'https://usekalibr.com',
    linkLabel: 'Open Kalibr',
  },
  {
    id: 'pangea-chat',
    name: 'Pangea Chat',
    summary:
      'Friends practise new languages together through AI-powered conversations in Pangea Chat.',
    contribution: 'I built the frontend, AI services, and delivery systems behind the product.',
    url: 'https://app.pangea.chat/',
    linkLabel: 'Open Pangea Chat',
  },
  {
    id: 'cyobot-robotics-quest',
    name: 'CYOBot Robotics Quest',
    summary: 'Students learn coding and robotics through a browser-based learning platform.',
    contribution:
      'Founding software engineer; led the landing page, instructor and student dashboards, and streamlined internal operations.',
    url: 'https://dashboard.cyobot.com/',
    linkLabel: 'Open Robotics Quest',
  },
  {
    id: 'vulcan-internal-platform',
    name: 'Vulcan internal platform',
    summary: 'An internal platform helped teams manage content, access, and production services.',
    contribution:
      'Founding software engineer; led the internal admin dashboard, access control, telemetry, monitoring and on-call support.',
  },
  {
    id: 'localcut',
    name: 'LocalCut',
    summary: 'A video editor that works with media directly in the browser.',
    contribution:
      'Open-source, browser-local timeline editing and asset indexing with external-agent control.',
    url: 'https://wilsonle.github.io/LocalCut/',
    linkLabel: 'Open LocalCut',
  },
  {
    id: 'localdesign',
    name: 'LocalDesign',
    summary: 'A browser-local canvas for designing with editable layers, text and images.',
    contribution:
      'Open-source, browser-local pages, layers and frames with external-agent control.',
    url: 'https://wilsonle.github.io/LocalDesign/',
    linkLabel: 'Open LocalDesign',
  },
]

const projects: Projects = {
  heading: 'Work',
  productLabel: 'The product',
  contributionLabel: 'My part',
  featuresLabel: 'Features',
  tabsLabel: 'Choose a project',
  bottomTabsLabel: 'Choose another project',
  previousTabsLabel: 'Scroll projects left',
  nextTabsLabel: 'Scroll projects right',
  items: projectItems,
}

const principles: Principles = {
  eyebrow: 'How I work',
  heading: 'Build. Learn. Repeat.',
  chartLabel: 'Software development life cycle',
  agentLabel: 'AI agents',
  agentDetail: 'Faster iterations',
  iterationLabel: 'Iteration',
  nextLabel: 'Next stage',
  feedbackLabel: 'New client need',
  stages: [
    {
      id: 'understand',
      label: 'Understand',
      detail: 'Define the client’s goal.',
    },
    {
      id: 'design',
      label: 'Design',
      detail: 'Map a workable solution.',
    },
    {
      id: 'build',
      label: 'Build',
      detail: 'Build with agent support.',
    },
    {
      id: 'test',
      label: 'Test',
      detail: 'Verify the result.',
    },
    {
      id: 'release',
      label: 'Release',
      detail: 'Ship and observe.',
    },
    {
      id: 'learn',
      label: 'Learn',
      detail: 'Turn feedback into the next pass.',
    },
  ],
  source: {
    label: 'SDLC source: W. W. Royce, Managing the Development of Large Software Systems (1970)',
    url: 'https://cse.msu.edu/~cse435/Homework/HW3/royce1970.pdf',
  },
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
