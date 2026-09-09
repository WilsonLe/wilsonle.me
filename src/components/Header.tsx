'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { SiteSettings } from '@/content/types'
import { getPathnameBasePath } from '@/lib/i18n'

interface HeaderProps {
  siteSettings: SiteSettings
}

export function Header({ siteSettings }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const basePath = getPathnameBasePath(pathname)
  const homepagePath = basePath || '/'
  const navigation = siteSettings.navigation

  const navLinks = [
    { href: `${homepagePath}#work`, label: navigation.work },
    { href: `${homepagePath}#approach`, label: navigation.approach },
    { href: `${homepagePath}#now`, label: navigation.now },
    { href: `${homepagePath}#about`, label: navigation.about },
    { href: `${basePath}/resume`, label: navigation.resume, featured: true },
    { href: `${homepagePath}#contact`, label: navigation.contact },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-ink text-paper">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link href={homepagePath} className="group flex shrink-0 items-center gap-3">
            <span
              aria-hidden="true"
              className="font-label grid h-9 w-12 place-items-center bg-signal text-xs font-bold tracking-tight text-ink transition-transform group-hover:-rotate-2"
            >
              AM/W
            </span>
            <span className="hidden text-sm font-semibold tracking-wide text-paper sm:inline">
              {siteSettings.name}
            </span>
          </Link>

          <div className="hidden items-center gap-5 md:flex lg:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-label text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition-colors ${
                  link.featured
                    ? 'border border-signal px-3 py-2 text-signal hover:bg-signal hover:text-ink'
                    : 'text-paper-muted hover:text-paper'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="grid h-11 w-11 place-items-center border border-rule text-paper-muted hover:border-paper-muted hover:text-paper md:hidden"
            aria-label={navigation.menuLabel}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div id="mobile-navigation" className="border-t border-rule pb-5 pt-3 md:hidden">
            <div className="grid grid-cols-2 gap-px bg-rule">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-label bg-ink px-4 py-4 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-ink-raised ${
                    link.featured ? 'text-signal' : 'text-paper-muted hover:text-paper'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
