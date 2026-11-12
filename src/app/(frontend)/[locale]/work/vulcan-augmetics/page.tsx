import { notFound } from 'next/navigation'
import { VulcanWorkPageView } from '@/components/pages/VulcanWorkPageView'
import { getVulcanContent, getVulcanMetadata } from '@/content/vulcan'
import { isSupportedLocale, SUPPORTED_LOCALES } from '@/lib/i18n'

type VulcanWorkPageProps = { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: VulcanWorkPageProps) {
  const { locale } = await params
  if (!isSupportedLocale(locale)) notFound()
  return getVulcanMetadata(locale)
}

export default async function LocaleVulcanWorkPage({ params }: VulcanWorkPageProps) {
  const { locale } = await params
  if (!isSupportedLocale(locale)) notFound()
  return <VulcanWorkPageView content={getVulcanContent(locale)} basePath={`/${locale}`} />
}
