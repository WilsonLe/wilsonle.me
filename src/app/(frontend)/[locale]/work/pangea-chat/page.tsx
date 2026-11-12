import { notFound } from 'next/navigation'
import { workShowcaseMetadata } from '@/app/(frontend)/work/metadata'
import { WorkShowcasePageView } from '@/components/pages/WorkShowcasePageView'
import { getPangeaChatContent } from '@/content'
import { SUPPORTED_LOCALES, isSupportedLocale } from '@/lib/i18n'

interface LocalePangeaChatPageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LocalePangeaChatPageProps) {
  const { locale } = await params
  if (!isSupportedLocale(locale)) notFound()
  return workShowcaseMetadata(getPangeaChatContent(locale), locale)
}

export default async function LocalePangeaChatPage({ params }: LocalePangeaChatPageProps) {
  const { locale } = await params
  if (!isSupportedLocale(locale)) notFound()
  return <WorkShowcasePageView content={getPangeaChatContent(locale)} basePath={`/${locale}`} />
}
