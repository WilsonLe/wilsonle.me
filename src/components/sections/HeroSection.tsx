import Link from 'next/link'
import type { Hero, SiteSettings } from '@/content/types'

interface HeroSectionProps {
  basePath: string
  hero: Hero
  siteSettings: SiteSettings
}

export function HeroSection({ basePath, hero, siteSettings }: HeroSectionProps) {
  const workHref = `${basePath || '/'}#work`
  const resumeHref = `${basePath}/resume`

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-linear-to-br from-blue-900/20 via-slate-950 to-purple-900/20" />
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
          {hero.identity}
        </p>
        <h1 className="mt-6 max-w-5xl text-5xl font-bold leading-[1.05] md:text-7xl">
          <span className="gradient-text">{hero.heading}</span>
        </h1>
        <div className="mt-8 grid max-w-4xl gap-5 md:grid-cols-[auto_1fr] md:items-start md:gap-10">
          <p className="text-lg font-medium text-white md:text-xl">{siteSettings.title}</p>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">{hero.introduction}</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href={workHref}
            className="inline-flex min-h-12 items-center rounded-full bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
          >
            {hero.workCta}
          </Link>
          <Link
            href={resumeHref}
            className="inline-flex min-h-12 items-center rounded-full border border-slate-600 px-6 py-3 font-semibold text-slate-100 transition-colors hover:border-slate-400 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
          >
            {hero.resumeCta}
          </Link>
        </div>

        {siteSettings.location && (
          <p className="mt-8 text-sm text-slate-400">
            {hero.locationLabel} {siteSettings.location}
          </p>
        )}

        <div className="mt-8 flex items-center gap-6" aria-label={hero.socialLabel}>
          {siteSettings.social?.github && (
            <a
              href={siteSettings.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-300 underline decoration-slate-600 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          )}
          {siteSettings.social?.linkedin && (
            <a
              href={siteSettings.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-300 underline decoration-slate-600 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>

      <Link
        href={workHref}
        aria-label={hero.skipToWorkLabel}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-slate-400 motion-safe:animate-bounce focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
      >
        <svg
          aria-hidden="true"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </Link>
    </section>
  )
}
