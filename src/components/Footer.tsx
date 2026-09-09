'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { SiteSettings } from '@/content/types'
import { getPathnameBasePath } from '@/lib/i18n'

interface FooterProps {
  siteSettings: SiteSettings
}

export function Footer({ siteSettings }: FooterProps) {
  const pathname = usePathname()
  const basePath = getPathnameBasePath(pathname)
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-ink bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-ink/20 pb-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Link href={basePath || '/'} className="group inline-flex items-center gap-3">
              <span
                aria-hidden="true"
                className="font-label grid h-10 w-14 place-items-center bg-ink text-xs font-bold text-signal transition-transform group-hover:rotate-2"
              >
                AM/W
              </span>
              <span className="font-display text-3xl font-semibold">{siteSettings.name}</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-ink/70">
              {siteSettings.title}
              {siteSettings.location ? ` · ${siteSettings.location}` : ''}
            </p>
          </div>

          <div className="font-label flex flex-wrap gap-5 text-xs font-semibold uppercase tracking-[0.12em]">
            {siteSettings.social?.github && (
              <a
                href={siteSettings.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="decoration-signal decoration-2 underline-offset-4 hover:underline"
              >
                {siteSettings.socialLabels.github} <span aria-hidden="true">↗</span>
              </a>
            )}
            {siteSettings.social?.linkedin && (
              <a
                href={siteSettings.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="decoration-signal decoration-2 underline-offset-4 hover:underline"
              >
                {siteSettings.socialLabels.linkedin} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>

        <p className="font-label pt-6 text-[0.68rem] uppercase tracking-[0.14em] text-ink/60">
          © {currentYear} {siteSettings.name}
        </p>
      </div>
    </footer>
  )
}
