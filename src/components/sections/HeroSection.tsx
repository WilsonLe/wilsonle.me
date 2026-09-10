import Link from 'next/link'
import type { Hero, SiteSettings } from '@/content/types'

interface HeroSectionProps {
  basePath: string
  hero: Hero
  siteSettings: SiteSettings
}

export function HeroSection({ basePath, hero, siteSettings }: HeroSectionProps) {
  const homepagePath = basePath || '/'
  const socialProfiles = [
    {
      id: 'github',
      label: siteSettings.socialLabels.github,
      url: siteSettings.social?.github,
    },
    {
      id: 'linkedin',
      label: siteSettings.socialLabels.linkedin,
      url: siteSettings.social?.linkedin,
    },
    {
      id: 'twitter',
      label: siteSettings.socialLabels.twitter,
      url: siteSettings.social?.twitter,
    },
  ].filter((profile): profile is { id: string; label: string; url: string } => Boolean(profile.url))

  return (
    <section
      className="field-grid relative min-h-[min(58rem,100svh)] overflow-hidden border-b border-rule px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[8%] hidden w-px bg-blueprint/15 lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-20 hidden h-36 w-px border-l border-dashed border-blueprint/35 lg:block"
      />

      <div className="relative mx-auto flex min-h-[calc(min(58rem,100svh)-9.5rem)] max-w-7xl flex-col justify-between">
        <div className="grid flex-1 items-center gap-12 py-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.5fr)] lg:gap-16 lg:py-12">
          <div className="min-w-0">
            <p className="font-label mb-8 text-xs font-semibold uppercase tracking-[0.16em] text-signal sm:text-sm">
              {hero.identity}
            </p>
            <h1
              id="hero-heading"
              className="font-display max-w-5xl text-[clamp(3.25rem,9vw,8.5rem)] font-medium leading-[0.88] tracking-[-0.055em] text-paper"
            >
              {hero.heading}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-paper-muted sm:text-lg sm:leading-8">
              {hero.introduction}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={`${homepagePath}#work`}
                className="font-label inline-flex min-h-12 items-center justify-center border border-signal bg-signal px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-paper hover:text-ink"
              >
                {hero.workCta}
                <span className="ml-3" aria-hidden="true">
                  ↓
                </span>
              </Link>
              <Link
                href={`${basePath}/resume`}
                className="font-label inline-flex min-h-12 items-center justify-center border border-rule px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:border-blueprint hover:text-blueprint"
              >
                {hero.resumeCta}
                <span className="ml-3" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>

          <aside className="min-w-0 border-t border-rule pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="font-label text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-blueprint">
              <span aria-hidden="true">01 / </span>
              {siteSettings.title}
            </p>
            <dl className="mt-8 space-y-7">
              {siteSettings.location ? (
                <div>
                  <dt className="font-label text-[0.68rem] uppercase tracking-[0.14em] text-paper-muted">
                    {hero.locationLabel}
                  </dt>
                  <dd className="font-display mt-2 text-2xl text-paper">{siteSettings.location}</dd>
                </div>
              ) : null}
              {socialProfiles.length > 0 ? (
                <div>
                  <dt className="font-label text-[0.68rem] uppercase tracking-[0.14em] text-paper-muted">
                    {hero.socialLabel}
                  </dt>
                  <dd className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                    {socialProfiles.map((profile) => (
                      <a
                        key={profile.id}
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-label text-xs font-semibold uppercase tracking-[0.1em] text-paper decoration-signal decoration-2 underline-offset-4 hover:underline"
                      >
                        {profile.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
          </aside>
        </div>

        <Link
          href={`${homepagePath}#work`}
          aria-label={hero.skipToWorkLabel}
          className="font-label inline-flex w-fit items-center gap-3 border-l border-blueprint pl-4 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-paper-muted transition-colors hover:text-paper"
        >
          <span aria-hidden="true">↓</span>
          {hero.skipToWorkLabel}
        </Link>
      </div>
    </section>
  )
}
