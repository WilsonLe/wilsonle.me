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
  workLabel: string
  workHeading: string
  contributions: { title: string; description: string }[]
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
  capabilities: { title: string; description: string }[]
  closingHeading: string
  imageCredit: string
  sourceLabel: string
  sourceUrl: string
}
