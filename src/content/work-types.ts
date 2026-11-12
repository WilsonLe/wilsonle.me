import type { PageSeo } from '@/content/types'

export interface WorkImage {
  src: string
  alt: string
}

export interface WorkShowcase {
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
  heroImages: WorkImage[]
  workLabel: string
  workHeading: string
  contributions: { title: string; description: string }[]
  storyLabel: string
  chapters: {
    id: string
    label: string
    heading: string
    description: string
    image: WorkImage
    caption: string
  }[]
  impactLabel: string
  impactHeading: string
  capabilities: { title: string; description: string }[]
  closingHeading: string
  imageCredit: string
  imageCreditLabel: string
  imageCreditUrl: string
}
