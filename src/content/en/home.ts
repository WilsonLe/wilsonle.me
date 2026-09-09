import type { About, HomeContent, Project } from '@/content/types'
import { education, experiences, skillStack } from '@/content/en/resume'
import { siteSettings } from '@/content/en/site'

const about: About = {
  heading: 'About Me',
  content: [
    "I'm a software engineer who enjoys building end-to-end products, from user-facing experiences to the backend systems and infrastructure that keep them running.",
    'My work spans startups, freelance projects, and production systems at scale, with a focus on turning ideas into reliable software that teams can ship, operate, and grow with confidence.',
  ],
}

const projects: Project[] = [
  {
    id: 'pangea-chat',
    name: 'Pangea Chat',
    visibility: 'Public product',
    summary: 'A language-learning chat app where people practise while messaging friends.',
    contribution:
      'I owned frontend work on the product and built FastAPI services for its AI assistant and LLM workflows. I also set up delivery pipelines and the monitoring needed to run it in production.',
    technologies: ['Frontend', 'FastAPI', 'Python', 'LLM workflows', 'CI/CD', 'Observability'],
    url: 'https://app.pangea.chat/',
    linkLabel: 'Open Pangea Chat',
  },
  {
    id: 'cyobot-robotics-quest',
    name: 'CYOBot Robotics Quest',
    visibility: 'Public product',
    summary: 'A browser-based learning portal for coding and robotics.',
    contribution:
      'I led work on the core coding portal, implemented its CMS, and configured Keycloak SSO so authentication was managed consistently across the product.',
    technologies: ['Full-stack development', 'CMS', 'Keycloak', 'SSO'],
    url: 'https://dashboard.cyobot.com/',
    linkLabel: 'Open Robotics Quest',
  },
  {
    id: 'vulcan-internal-platform',
    name: 'Vulcan internal platform',
    visibility: 'Private internal system',
    summary: 'An internal platform for managing content, access, and production operations.',
    contribution:
      "I built the CMS, OAuth2 login flows, and a custom admin interface for identity and access management. I also added telemetry, alerting, and on-call support. Because the system is internal, I don't publish its URL, screenshots, or operational data.",
    technologies: ['CMS', 'OAuth2', 'Identity and access management', 'Observability'],
  },
]

export const homeContent: HomeContent = {
  locale: 'en',
  siteSettings,
  about,
  projects,
  experiences,
  education,
  skillStack,
  seo: {
    title: siteSettings.seo?.metaTitle || `${siteSettings.name} | ${siteSettings.title}`,
    description: siteSettings.seo?.metaDescription || 'Portfolio website',
  },
}
