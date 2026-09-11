import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FieldNotePageView } from '@/components/pages/FieldNotePageView'
import { getShopFloorSystemsNote } from '@/content'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isSupportedLocale } from '@/lib/i18n'
import { SITE_URL } from '@/site-config'

type LocaleFieldNotePageProps = {
  params: Promise<{
    locale: string
  }>
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LocaleFieldNotePageProps): Promise<Metadata> {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const content = getShopFloorSystemsNote(locale)
  const canonicalPath =
    locale === DEFAULT_LOCALE ? '/notes/shop-floor-systems' : `/${locale}/notes/shop-floor-systems`
  const canonicalUrl = new URL(canonicalPath, SITE_URL).toString()
  const heroUrl = new URL(content.hero.src, SITE_URL).toString()

  return {
    title: {
      absolute: content.seo.title,
    },
    description: content.seo.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: new URL('/en/notes/shop-floor-systems', SITE_URL).toString(),
        vi: new URL('/vi/notes/shop-floor-systems', SITE_URL).toString(),
        'x-default': new URL('/notes/shop-floor-systems', SITE_URL).toString(),
      },
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: canonicalUrl,
      type: 'article',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      alternateLocale: locale === 'vi' ? ['en_US'] : ['vi_VN'],
      publishedTime: content.publishedDate,
      authors: [content.siteSettings.name],
      images: [
        {
          url: heroUrl,
          width: content.hero.width,
          height: content.hero.height,
          alt: content.hero.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.seo.title,
      description: content.seo.description,
      images: [heroUrl],
    },
  }
}

export default async function LocaleShopFloorSystemsPage({ params }: LocaleFieldNotePageProps) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const canonicalPath =
    locale === DEFAULT_LOCALE ? '/notes/shop-floor-systems' : `/${locale}/notes/shop-floor-systems`

  return (
    <FieldNotePageView
      canonicalPath={canonicalPath}
      content={getShopFloorSystemsNote(locale)}
      routeBasePath={`/${locale}`}
    />
  )
}
