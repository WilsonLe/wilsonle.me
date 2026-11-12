import type { PageSeo } from '@/content/types'

export interface CyobotImage {
  src: string
  alt: string
  width: number
  height: number
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
  roleLabel: string
  role: string
  scopeLabel: string
  scope: string
  heroImage: CyobotImage
  heroCaption: string
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
  }[]
  impactLabel: string
  impactHeading: string
  capabilities: {
    title: string
    description: string
    demo: {
      src: string
      poster: string
      width: number
      height: number
      alt: string
      sourceUrl: string
    }
  }[]
  demoSourceLabel: string
  closingHeading: string
  imageCredit: string
  sourceLabel: string
  sourceUrl: string
}
