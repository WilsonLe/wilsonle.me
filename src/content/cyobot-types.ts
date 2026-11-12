import type { PageSeo } from '@/content/types'

export interface CyobotImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface CyobotDemo {
  src: string
  poster: string
  width: number
  height: number
  alt: string
  caption: string
  sourceUrl: string
}

export interface CyobotShowcase {
  seo: PageSeo
  name: string
  category: string
  heading: string
  introduction: string
  backLabel: string
  visitLabel: string
  url: string
  instructorLabel: string
  instructorUrl: string
  roleLabel: string
  role: string
  scopeLabel: string
  scope: string
  robotImage: CyobotImage
  workLabel: string
  workHeading: string
  contributions: { title: string; description: string; image: CyobotImage }[]
  chapters: {
    id: string
    label: string
    heading: string
    description: string
    image: CyobotImage
    caption: string
    url: string
    linkLabel: string
    workflow?: {
      heading: string
      steps: { kind: 'dashboard' | 'wireless' | 'robot'; label: string }[]
      demo: CyobotDemo
    }
  }[]
  demoSourceLabel: string
  closingHeading: string
  imageCredit: string
  sourceLabel: string
  sourceUrl: string
}
