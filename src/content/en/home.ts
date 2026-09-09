import type { About, Hero, HomeContent, Now, Principles, Project, Projects } from '@/content/types'
import { siteSettings } from '@/content/en/site'

const hero: Hero = {
  identity: 'Anh Minh · Wilson online',
  heading: 'I build the whole path from idea to reliable software.',
  introduction:
    "I'm a Brisbane-based software engineer working across product interfaces, backend systems, and the infrastructure that keeps them running.",
  workCta: 'Explore selected work',
  resumeCta: 'View résumé',
  skipToWorkLabel: 'Skip to selected work',
  locationLabel: 'Based in',
  socialLabel: 'Social profiles',
}

const about: About = {
  heading: 'About Me',
  content: [
    "Anh Minh is my name; Wilson is the name I use around the internet. I'm a software engineer based in Brisbane, Queensland.",
    "I'm happiest working across the whole product path—from the interface people use to the services, delivery pipelines, and monitoring that keep it dependable.",
    'That range has taken me through language learning, robotics education, internal platforms, and infrastructure work. The common thread is making complex systems easier to ship, operate, and understand.',
  ],
}

const projectItems: Project[] = [
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

const projects: Projects = {
  eyebrow: 'Selected work',
  heading: 'Selected work, with context.',
  introduction:
    'Three products that show how I move between user experience, platform foundations, and the work of running software.',
  productLabel: 'The product',
  contributionLabel: 'My part',
  technologiesLabel: 'Across the stack',
  items: projectItems,
}

const principles: Principles = {
  eyebrow: 'How I work',
  heading: 'The principles behind the build.',
  introduction:
    'The most useful engineering choices hold up across the interface, the deployment, and the day after launch.',
  items: [
    {
      id: 'whole-path',
      title: 'Follow the whole path',
      description:
        'The seams between interface, backend, delivery, and infrastructure shape the experience, so I work across them.',
    },
    {
      id: 'built-to-run',
      title: 'Build it to run',
      description:
        'Releases, monitoring, and operating clarity are part of the product—not chores left for later.',
    },
    {
      id: 'leave-a-map',
      title: 'Leave a map',
      description:
        'Documentation and shared workflows should make a system easier for the next person, including future me.',
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
      value:
        'End-to-end products, dependable delivery, and the operating details that keep software useful.',
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
