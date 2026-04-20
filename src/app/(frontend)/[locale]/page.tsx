import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HomePageView } from '@/components/pages/HomePageView'
import { getHomeContent } from '@/content'
import { OG_IMAGE_URL, SITE_URL } from '@/site-config'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, getLocalizedHref, isSupportedLocale } from '@/lib/i18n'

type LocalePageProps = {
  params: Promise<{
    locale: string
  }>
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const canonicalPath = locale === DEFAULT_LOCALE ? '/' : `/${locale}`
  const content = getHomeContent(locale)
  const openGraphLocale = locale === 'vi' ? 'vi_VN' : 'en_US'

  return {
    title: {
      absolute: content.seo.title,
    },
    description: content.seo.description,
    alternates: {
      canonical: locale === DEFAULT_LOCALE ? SITE_URL : new URL(canonicalPath, SITE_URL).toString(),
      languages: {
        en: new URL('/en', SITE_URL).toString(),
        vi: new URL('/vi', SITE_URL).toString(),
        'x-default': SITE_URL,
      },
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: locale === DEFAULT_LOCALE ? SITE_URL : new URL(canonicalPath, SITE_URL).toString(),
      type: 'website',
      locale: openGraphLocale,
      alternateLocale: locale === 'vi' ? ['en_US'] : ['vi_VN'],
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: `${content.siteSettings.name} portfolio preview`,
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

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const content = getHomeContent(locale)
  const canonicalPath = locale === DEFAULT_LOCALE ? '/' : getLocalizedHref(locale)

  return <HomePageView canonicalPath={canonicalPath} content={content} />
}
