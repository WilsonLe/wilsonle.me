import type { Locale } from '@/lib/i18n'

export interface WorkImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface WorkChapter {
  id: string
  label: string
  heading: string
  description: string
  image: WorkImage
  caption: string
}

export interface WorkContent {
  slug: string
  locale: Locale
  name: string
  eyebrow: string
  heading: string
  introduction: string
  backLabel: string
  productUrl: string
  productLabel: string
  role: { label: string; value: string }
  period: { label: string; value: string }
  heroImages: [WorkImage, WorkImage, WorkImage]
  imageNote: string
  story: { label: string; heading: string; chapters: WorkChapter[] }
  contribution: {
    label: string
    heading: string
    introduction: string
    items: { heading: string; description: string }[]
  }
  impact: {
    label: string
    heading: string
    description: string
    items: { heading: string; description: string }[]
  }
  closing: string
  seo: { title: string; description: string }
}
