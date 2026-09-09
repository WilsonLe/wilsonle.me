import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ResumePageView } from '@/components/pages/ResumePageView'
import { getResumeContent } from '@/content'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isSupportedLocale } from '@/lib/i18n'
import { OG_IMAGE_URL, SITE_URL } from '@/site-config'

type LocaleResumePageProps = {
  params: Promise<{
    locale: string
  }>
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LocaleResumePageProps): Promise<Metadata> {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const content = getResumeContent(locale)
  const canonicalPath = locale === DEFAULT_LOCALE ? '/resume' : `/${locale}/resume`
  const canonicalUrl = new URL(canonicalPath, SITE_URL).toString()

  return {
    title: {
      absolute: content.seo.title,
    },
    description: content.seo.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: new URL('/en/resume', SITE_URL).toString(),
        vi: new URL('/vi/resume', SITE_URL).toString(),
        'x-default': new URL('/resume', SITE_URL).toString(),
      },
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: canonicalUrl,
      type: 'profile',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      alternateLocale: locale === 'vi' ? ['en_US'] : ['vi_VN'],
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: `${content.siteSettings.name} résumé preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.seo.title,
      description: content.seo.description,
      images: [OG_IMAGE_URL],
    },
  }
}

export default async function LocaleResumePage({ params }: LocaleResumePageProps) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  return <ResumePageView content={getResumeContent(locale)} />
}
