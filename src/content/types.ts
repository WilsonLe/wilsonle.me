import type { Locale } from '@/lib/i18n'

export interface SiteSettings {
  name: string
  alternateName?: string
  title: string
  tagline?: string
  location?: string
  email?: string
  phone?: string
  resumeUrl: string
  social?: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  socialLabels: {
    github: string
    linkedin: string
    twitter: string
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  navigation: {
    work: string
    approach: string
    now: string
    about: string
    resume: string
    contact: string
    menuLabel: string
    footerLabel: string
  }
  contact: {
    heading: string
    emailLabel: string
    booking: {
      url: string
      label: string
      text: string
    }
  }
}

export interface TechStack {
  heading: string
  categoriesLabel: string
  playLabel: string
  pauseLabel: string
  playDescription: string
  pauseDescription: string
  groups: { id: string; label: string; technologies: string[] }[]
}

export interface Hero {
  identity: string
  heading: string
  workCta: string
  resumeCta: string
  skipToWorkLabel: string
  stack: TechStack
}

export interface About {
  heading: string
  portrait: {
    src: string
    alt: string
  }
  content: string[]
}

export interface Project {
  id: string
  name: string
  summary: string
  contribution: string
  url?: string
  linkLabel?: string
}

export interface Projects {
  heading: string
  productLabel: string
  contributionLabel: string
  featuresLabel: string
  tabsLabel: string
  bottomTabsLabel: string
  items: Project[]
}

export interface CycleStage {
  id: string
  label: string
  detail: string
}

export interface Principles {
  eyebrow: string
  heading: string
  chartLabel: string
  agentLabel: string
  agentDetail: string
  iterationLabel: string
  nextLabel: string
  feedbackLabel: string
  stages: CycleStage[]
  source: {
    label: string
    url: string
  }
}

export interface NowItem {
  label: string
  value: string
}

export interface Now {
  eyebrow: string
  heading: string
  updatedLabel: string
  items: NowItem[]
}

export interface Experience {
  id: string
  title: string
  company: string
  employmentType: string
  duration: string
  summary?: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
}

export interface Education {
  id: string
  institution: string
  degree: string
  location?: string
  graduationDate: string
  gpa?: string
  coursework?: string[]
}

export interface PageSeo {
  title: string
  description: string
}

export interface HomeContent {
  locale: Locale
  siteSettings: SiteSettings
  hero: Hero
  about: About
  projects: Projects
  principles: Principles
  now: Now
  seo: PageSeo
}
