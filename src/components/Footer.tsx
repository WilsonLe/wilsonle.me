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
    { href: siteSettings.resumeUrl, label: navigation.resume, download: true },
    { href: `${homepagePath}#contact`, label: navigation.contact },
  ]

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col justify-between gap-6 pb-8 md:flex-row md:items-center md:gap-10">
          <div>
            <Link
              href={homepagePath}
              className="font-display inline-flex py-1 text-3xl font-medium tracking-[-0.03em] transition-colors hover:text-signal"
            >
              {siteSettings.name}
            </Link>
            <p className="mt-2 text-sm leading-6 text-paper-muted">{siteSettings.title}</p>
          </div>

          <nav aria-label={navigation.footerLabel}>
            <div className="flex flex-wrap gap-x-6 gap-y-1 sm:gap-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  download={link.download}
                  className="font-label inline-flex min-h-11 items-center gap-2 text-xs transition-colors hover:text-signal"
                >
                  {link.label}
                  {link.download && <span aria-hidden="true">↓</span>}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-rule pt-5 text-xs leading-5 text-paper-muted">
          <p>
            © {currentYear} {siteSettings.name}
          </p>
          {siteSettings.location && <p>{siteSettings.location}</p>}
        </div>
      </div>
    </footer>
  )
}
