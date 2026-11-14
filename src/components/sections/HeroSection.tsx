import Link from 'next/link'
import type { Hero, SiteSettings } from '@/content/types'

interface HeroSectionProps {
  basePath: string
  hero: Hero
  siteSettings: SiteSettings
}

export function HeroSection({ basePath, hero, siteSettings }: HeroSectionProps) {
  const homepagePath = basePath || '/'

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
        <div className="grid flex-1 items-center gap-12 py-8 lg:gap-16 lg:py-12">
          <div className="min-w-0">
            <p className="font-label mb-8 text-xs font-semibold uppercase tracking-[0.16em] text-signal sm:text-sm">
              {hero.identity}
            </p>
            <h1
              id="hero-heading"
              className="font-display max-w-5xl text-[clamp(3.25rem,9vw,8.5rem)] font-medium leading-display tracking-[-0.035em] text-paper"
            >
              {hero.heading}
            </h1>
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
              <a
                href={siteSettings.resumeUrl}
                download
                className="font-label inline-flex min-h-12 items-center justify-center border border-rule px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:border-blueprint hover:text-blueprint"
              >
                {hero.resumeCta}
                <span className="ml-3" aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>
          </div>

          <aside className="min-w-0 border-t border-rule pt-7">
            <h2 className="font-display text-3xl text-paper">{hero.stack.heading}</h2>
            <div className="mt-6 space-y-6">
              {hero.stack.groups.map((group) => (
                <section key={group.id} id={`skills-fallback-${group.id}`}>
                  <h3 className="font-display text-2xl text-paper">{group.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-paper-muted">
                    {group.technologies.map((technology) => technology.name).join(' · ')}
                  </p>
                </section>
              ))}
            </div>
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
