import { notFound } from 'next/navigation'
import { CyobotShowcasePageView } from '@/components/pages/CyobotShowcasePageView'
import { getCyobotContent } from '@/content'
import { SUPPORTED_LOCALES, isSupportedLocale } from '@/lib/i18n'
import { cyobotMetadata } from '@/lib/cyobot-metadata'

type Props = { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  if (!isSupportedLocale(locale)) notFound()
  return cyobotMetadata(getCyobotContent(locale), locale)
}

export default async function CyobotPage({ params }: Props) {
  const { locale } = await params
  if (!isSupportedLocale(locale)) notFound()
  return <CyobotShowcasePageView content={getCyobotContent(locale)} basePath={`/${locale}`} />
}
