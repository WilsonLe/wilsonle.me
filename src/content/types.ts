import type { Locale } from '@/lib/i18n'

export interface SiteSettings {
  name: string
  alternateName?: string
  title: string
  tagline?: string
  location?: string
  email?: string
  phone?: string
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
    templates: string
    contact: string
    menuLabel: string
  }
  contact: {
    eyebrow: string
    heading: string
    emailLabel: string
  }
}

export interface Hero {
  identity: string
  heading: string
  introduction: string
  workCta: string
  resumeCta: string
  skipToWorkLabel: string
  locationLabel: string
  socialLabel: string
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
  visibility: string
  summary: string
  contribution: string
  technologies: string[]
  url?: string
  linkLabel?: string
}

export interface Projects {
  eyebrow: string
  heading: string
  introduction: string
  productLabel: string
  contributionLabel: string
  technologiesLabel: string
  items: Project[]
}

export interface Principle {
  id: string
  title: string
  description: string
}

export interface Principles {
  eyebrow: string
  heading: string
  introduction: string
  items: Principle[]
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
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  highlights: string[]
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

export interface SkillStack {
  frontend: string[]
  backend: string[]
  cloud: string[]
  languages: string[]
  tools: string[]
}

export interface PageSeo {
  title: string
  description: string
}

export interface ResumeIntro {
  eyebrow: string
  heading: string
  summary: string
  backLabel: string
}

export interface ResumeLabels {
  experienceHeading: string
  skillsHeading: string
  toolsHeading: string
  frontendHeading: string
  backendHeading: string
  cloudHeading: string
  languagesHeading: string
  educationHeading: string
  presentLabel: string
  expectedGraduationLabel: string
  graduatedLabel: string
  gpaLabel: string
  courseworkLabel: string
}

export interface ResumeContent {
  locale: Locale
  siteSettings: SiteSettings
  intro: ResumeIntro
  labels: ResumeLabels
  experiences: Experience[]
  education: Education[]
  skillStack: SkillStack
  seo: PageSeo
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

export interface WebsiteTemplatesContent {
  seo: PageSeo
  eyebrow: string
  heading: string
  introduction: string
  previewLabel: string
  items: {
    id: string
    name: string
    category: string
    description: string
    previewTitle: string
    path: string
    features: string[]
  }[]
}
