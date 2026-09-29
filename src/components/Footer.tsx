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
  const homepagePath = basePath || '/'
  const currentYear = new Date().getFullYear()
  const navigation = siteSettings.navigation
  const navLinks = [
    { href: `${homepagePath}#work`, label: navigation.work },
    { href: `${homepagePath}#approach`, label: navigation.approach },
    { href: `${homepagePath}#now`, label: navigation.now },
    { href: `${homepagePath}#about`, label: navigation.about },
    { href: `${basePath}/resume`, label: navigation.resume },
    { href: `${basePath}/website-templates`, label: navigation.templates },
    { href: `${homepagePath}#contact`, label: navigation.contact },
  ]

  return (
    <footer className="border-t border-ink bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-ink/20 pb-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
          <div>
            <Link href={basePath || '/'} className="inline-flex items-center">
              <span className="font-display text-3xl font-semibold">{siteSettings.name}</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-ink/70">
              {siteSettings.title}
              {siteSettings.location ? ` · ${siteSettings.location}` : ''}
            </p>
          </div>

          <nav aria-label={navigation.footerLabel}>
            <p className="font-label mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-ink/60">
              {navigation.footerLabel}
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-label text-xs font-semibold uppercase tracking-[0.12em] decoration-signal decoration-2 underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

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
