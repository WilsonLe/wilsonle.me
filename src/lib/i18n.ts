export const DEFAULT_LOCALE = 'en'

export const SUPPORTED_LOCALES = ['en', 'vi'] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]

export function isSupportedLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale)
}

export function getLocaleBasePath(locale: Locale) {
  return locale === DEFAULT_LOCALE ? '' : `/${locale}`
}

export function getLocaleFromPathname(pathname: string | null): Locale {
  if (!pathname) {
    return DEFAULT_LOCALE
  }

  const segments = pathname.split('/').filter(Boolean)
  const candidate = segments[0]

  return candidate && isSupportedLocale(candidate) ? candidate : DEFAULT_LOCALE
}

export function getLocalizedHref(locale: Locale, hash = '') {
  const basePath = getLocaleBasePath(locale)

  if (!hash) {
    return basePath || '/'
  }

  return `${basePath || '/'}${hash}`
}

export function getPathnameBasePath(pathname: string | null) {
  if (!pathname) {
    return ''
  }

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return '/en'
  }

  if (pathname === '/vi' || pathname.startsWith('/vi/')) {
    return '/vi'
  }

  return ''
}
