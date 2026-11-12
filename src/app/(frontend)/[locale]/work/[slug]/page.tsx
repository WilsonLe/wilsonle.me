import { notFound } from 'next/navigation'
import { WorkShowcasePageView } from '@/components/pages/WorkShowcasePageView'
import { getWorkContent, getWorkMetadata, workSlugs } from '@/content/work'
import { isSupportedLocale, SUPPORTED_LOCALES } from '@/lib/i18n'

type LocaleWorkPageProps = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => workSlugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: LocaleWorkPageProps) {
  const { locale, slug } = await params
  if (!isSupportedLocale(locale)) notFound()
  const content = getWorkContent(locale, slug)
  if (!content) notFound()
  return getWorkMetadata(content)
}

export default async function LocaleWorkPage({ params }: LocaleWorkPageProps) {
  const { locale, slug } = await params
  if (!isSupportedLocale(locale)) notFound()
  const content = getWorkContent(locale, slug)
  if (!content) notFound()
  return <WorkShowcasePageView content={content} routeBasePath={`/${locale}`} />
}
