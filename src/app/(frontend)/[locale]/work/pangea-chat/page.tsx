import { notFound } from 'next/navigation'
import { WorkShowcasePageView } from '@/components/pages/WorkShowcasePageView'
import { getPangeaChatContent } from '@/content'
import { SUPPORTED_LOCALES, isSupportedLocale } from '@/lib/i18n'
import { workMetadata } from '@/lib/work-metadata'

type Props = { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  if (!isSupportedLocale(locale)) notFound()
  return workMetadata(getPangeaChatContent(locale), locale)
}

export default async function PangeaChatPage({ params }: Props) {
  const { locale } = await params
  if (!isSupportedLocale(locale)) notFound()
  return <WorkShowcasePageView content={getPangeaChatContent(locale)} basePath={`/${locale}`} />
}
