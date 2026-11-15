import type { Metadata } from 'next'
import { ReplayPreference } from '@/components/ReplayPreference'
import { privacyCopy, privacyLink } from '@/content/privacy'
import { getLocalizedHref, type Locale } from '@/lib/i18n'
import { buildAbsoluteUrl, OG_IMAGE_URL, SITE_NAME } from '@/site-config'

export function privacyMetadata(locale: Locale): Metadata {
  const { title, description } = privacyCopy[locale]
  const url = buildAbsoluteUrl(privacyLink(locale).href)
  const englishUrl = buildAbsoluteUrl(privacyLink('en').href)
  const vietnameseUrl = buildAbsoluteUrl(privacyLink('vi').href)
  const images = [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: SITE_NAME }]
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: englishUrl, vi: vietnameseUrl, 'x-default': englishUrl },
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: SITE_NAME,
      images,
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      alternateLocale: locale === 'vi' ? ['en_US'] : ['vi_VN'],
    },
    twitter: { card: 'summary_large_image', title, description, images },
  }
}

export function PrivacyPolicy({ locale }: { locale: Locale }) {
  const copy = privacyCopy[locale]
  const otherLocale = locale === 'vi' ? 'en' : 'vi'
  const languageLink = privacyLink(otherLocale)
  return (
    <article
      lang={locale}
      data-replay-private=""
      className="mx-auto max-w-3xl px-5 pt-32 pb-20 sm:px-8 sm:pt-36"
    >
      <a
        href={getLocalizedHref(locale)}
        className="text-sm text-signal underline underline-offset-4"
      >
        {copy.back}
      </a>
      <h1 className="mt-6 font-display text-4xl font-medium tracking-tight sm:text-5xl">
        {copy.title}
      </h1>
      <a
        href={languageLink.href}
        hrefLang={otherLocale}
        lang={otherLocale}
        className="mt-4 inline-block text-sm text-signal underline underline-offset-4"
      >
        {otherLocale === 'vi' ? 'Tiếng Việt' : 'English'}
      </a>
      <div className="mt-9 space-y-10 text-base leading-relaxed text-paper-muted">
        <section aria-labelledby="privacy-analytics" className="space-y-3">
          <h2 id="privacy-analytics" className="text-xl font-semibold text-paper">
            {copy.analyticsTitle}
          </h2>
          <p>{copy.analytics}</p>
          <p>
            <a
              href="https://posthog.com/privacy"
              className="text-signal underline underline-offset-4"
            >
              {copy.providerPolicy}
            </a>
          </p>
        </section>
        <section aria-labelledby="privacy-replay" className="space-y-3">
          <h2 id="privacy-replay" className="text-xl font-semibold text-paper">
            {copy.replayTitle}
          </h2>
          <p>{copy.replay}</p>
          <ReplayPreference copy={copy.choice} />
        </section>
        <p>
          <a
            href={getLocalizedHref(locale, '#contact')}
            className="text-signal underline underline-offset-4"
          >
            {copy.contact}
          </a>
        </p>
      </div>
    </article>
  )
}
