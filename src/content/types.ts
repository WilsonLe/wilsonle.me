import type { Locale } from '@/lib/i18n'

export interface SiteSettings {
  name: string
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
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface About {
  heading: string
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

export interface HomeContent {
  locale: Locale
  siteSettings: SiteSettings
  about: About
  projects: Project[]
  experiences: Experience[]
  education: Education[]
  skillStack: SkillStack
  seo: PageSeo
}
