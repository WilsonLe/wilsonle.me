import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AgencyTemplate } from '@/components/templates/AgencyTemplate'
import { RestaurantTemplate } from '@/components/templates/RestaurantTemplate'
import { templatePreviews as enContent } from '@/content/en/template-previews'
import { templatePreviews as viContent } from '@/content/vi/template-previews'
import { type Locale, getLocaleBasePath, isSupportedLocale, SUPPORTED_LOCALES } from '@/lib/i18n'
import { OG_IMAGE_URL, SITE_URL } from '@/site-config'

const templates = ['agency', 'restaurant'] as const

type Props = { params: Promise<{ locale: string; template: string }> }

async function getPreview({ params }: Props): Promise<{
  locale: Locale
  template: (typeof templates)[number]
  content: typeof enContent
}> {
  const { locale, template } = await params
  if (!isSupportedLocale(locale) || (template !== 'agency' && template !== 'restaurant')) notFound()
  const content = locale === 'vi' ? viContent : enContent
  return { locale, template, content }
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => templates.map((template) => ({ locale, template })))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, template, content } = await getPreview(props)
  const { title, description } = content[template]
  const url = new URL(`/template-previews/${locale}/${template}`, SITE_URL).toString()
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: new URL(`/template-previews/en/${template}`, SITE_URL).toString(),
        vi: new URL(`/template-previews/vi/${template}`, SITE_URL).toString(),
        'x-default': new URL(`/template-previews/en/${template}`, SITE_URL).toString(),
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: content[template].name,
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE_URL] },
  }
}

export default async function TemplatePreviewPage(props: Props) {
  const { locale, template, content } = await getPreview(props)
  return (
    <>
      <aside className="flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-ink px-6 py-3 font-sans text-xs text-paper-muted">
        <span>{content.notice}</span>
        <a
          href={`${getLocaleBasePath(locale)}/website-templates`}
          target="_top"
          className="text-paper underline underline-offset-4"
        >
          ← {content.backLabel}
        </a>
      </aside>
      {template === 'agency' ? (
        <AgencyTemplate content={content.agency} />
      ) : (
        <RestaurantTemplate content={content.restaurant} />
      )}
    </>
  )
}
