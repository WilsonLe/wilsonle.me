import { notFound } from 'next/navigation'
import { PrivacyPolicy, privacyMetadata } from '@/components/pages/PrivacyPolicy'
import { isSupportedLocale, SUPPORTED_LOCALES } from '@/lib/i18n'

type Params = { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Params) {
  const { locale } = await params
  if (!isSupportedLocale(locale)) notFound()
  return privacyMetadata(locale)
}

export default async function LocalizedPrivacyPage({ params }: Params) {
  const { locale } = await params
  if (!isSupportedLocale(locale)) notFound()
  return <PrivacyPolicy locale={locale} />
}
