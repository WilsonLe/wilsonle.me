import { notFound } from 'next/navigation'
import { WorkPageView } from '@/components/pages/WorkPageView'
import { getWork, getWorkMetadata, works } from '@/content/work'
import { isSupportedLocale, SUPPORTED_LOCALES } from '@/lib/i18n'

type Props = { params: Promise<{ locale: string; slug: string }> }
export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => works.map(({ slug }) => ({ locale, slug })))
}
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  const work = getWork(slug)
  if (!isSupportedLocale(locale) || !work) notFound()
  return getWorkMetadata(work, locale)
}
export default async function WorkPage({ params }: Props) {
  const { locale, slug } = await params
  const work = getWork(slug)
  if (!isSupportedLocale(locale) || !work) notFound()
  // Product showcases currently use English copy, matching the résumé fallback.
  return <WorkPageView work={work} basePath={`/${locale}`} />
}
