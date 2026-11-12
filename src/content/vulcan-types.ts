import type { PageSeo, ShowcaseImage } from '@/content/types'

export interface VulcanChapter {
  icon: VulcanFeature
  id: string
  label: string
  heading: string
  description: string
  image: ShowcaseImage
  caption: string
}

export type VulcanFeature = 'content' | 'access' | 'monitoring'

export interface VulcanShowcaseContent {
  seo: PageSeo
  name: string
  category: string
  heading: string
  introduction: string
  backLabel: string
  visitLabel: string
  visitUrl: string
  facts: { label: string; value: string }[]
  heroImage: ShowcaseImage
  imageNote: string
  workLabel: string
  workHeading: string
  chapters: VulcanChapter[]
  signIn: {
    label: string
    heading: string
    description: string
    image: ShowcaseImage
    caption: string
  }
  impact: {
    label: string
    heading: string
    items: { icon: VulcanFeature; image: ShowcaseImage; heading: string; description: string }[]
  }
  closingHeading: string
  brandImage: ShowcaseImage
}
