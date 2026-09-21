import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { WebsiteTemplatesPageView } from '@/components/pages/WebsiteTemplatesPageView'
import { getWebsiteTemplatesContent } from '@/content'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isSupportedLocale } from '@/lib/i18n'
import { OG_IMAGE_URL, SITE_NAME, SITE_URL } from '@/site-config'

type LocaleWebsiteTemplatesPageProps = {
  params: Promise<{
    locale: string
  }>
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: LocaleWebsiteTemplatesPageProps): Promise<Metadata> {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const content = getWebsiteTemplatesContent(locale)
  const canonicalPath =
    locale === DEFAULT_LOCALE ? '/website-templates' : `/${locale}/website-templates`
  const canonicalUrl = new URL(canonicalPath, SITE_URL).toString()

  return {
    title: {
      absolute: content.seo.title,
    },
    description: content.seo.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: new URL('/en/website-templates', SITE_URL).toString(),
        vi: new URL('/vi/website-templates', SITE_URL).toString(),
        'x-default': new URL('/website-templates', SITE_URL).toString(),
      },
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: canonicalUrl,
      type: 'website',
      siteName: SITE_NAME,
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      alternateLocale: locale === 'vi' ? ['en_US'] : ['vi_VN'],
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: 'wilsonle.me portfolio preview',
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

export default async function LocaleWebsiteTemplatesPage({
  params,
}: LocaleWebsiteTemplatesPageProps) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  return (
    <WebsiteTemplatesPageView
      content={getWebsiteTemplatesContent(locale)}
      routeBasePath={`/${locale}`}
    />
  )
}
