import { getLocaleFromPathname, isSupportedLocale } from '@/lib/i18n'

const actions = [
  'section_seen',
  'project_billboard_seen',
  'project_opened',
  'project_closed',
  'project_link_clicked',
  'screenshot_seen',
  'screenshot_clicked',
  'robot_animation_played',
  'robot_animation_paused',
  'navigation_clicked',
  'menu_toggled',
  'resume_clicked',
  'contact_clicked',
  'skill_selected',
  'city_ready',
  'city_started',
  'district_reached',
  'city_move',
  'sound_changed',
  'scroll_depth',
  'browser_error',
] as const

export type PortfolioAction = (typeof actions)[number]

type Dimensions = {
  target?: string
  surface?: string
  project_id?: string
  input?: 'keyboard' | 'touch' | 'pointer'
  percent?: number
  duration_ms?: number
}

export type PortfolioInteraction = Dimensions & { action: PortfolioAction }

let captureInteraction: ((event: PortfolioInteraction) => void) | undefined

export function capturePortfolioInteractions(capture: (event: PortfolioInteraction) => void) {
  captureInteraction = capture
  return () => {
    if (captureInteraction === capture) captureInteraction = undefined
  }
}

export function trackPortfolio(action: PortfolioAction, dimensions?: Dimensions) {
  try {
    captureInteraction?.({ action, ...dimensions })
  } catch {
    // Analytics must not interrupt the interaction that produced the event.
  }
}

export function isPortfolioPath(pathname: string) {
  return pathname === '/' || isSupportedLocale(pathname.replace(/^\//, '').replace(/\/$/, ''))
}

export function hasAnalyticsOptOut(browser: Navigator) {
  return (
    browser.doNotTrack === '1' ||
    browser.doNotTrack === 'yes' ||
    ('globalPrivacyControl' in browser && browser.globalPrivacyControl === true)
  )
}

const actionNames = new Set<string>(actions)
const portfolioHosts = new Set(['wilsonle.me', 'www.wilsonle.me'])
const sources = new Set([
  'bing',
  'discord',
  'email',
  'facebook',
  'github',
  'google',
  'instagram',
  'linkedin',
  'reddit',
  'slack',
  'threads',
  'tiktok',
  'twitter',
  'x',
  'youtube',
  'zalo',
])
const mediums = new Set(['email', 'organic', 'referral', 'social', 'cpc', 'paid_social', 'qr'])
const vitals = ['LCP', 'INP', 'CLS', 'FCP', 'TTFB'] as const
const ratings = new Set(['good', 'needs-improvement', 'poor'])

type Environment = {
  url: URL
  referrer: string
  viewportWidth: number
  coarsePointer: boolean
  reducedMotion: boolean
}

export function isPortfolioHost(hostname: string) {
  return portfolioHosts.has(hostname)
}

function knownTag(search: URLSearchParams, property: string, allowed: Set<string>) {
  const value = search.get(property)?.toLowerCase()
  return value ? (allowed.has(value) ? value : 'other') : undefined
}

function stableTag(value: unknown) {
  return typeof value === 'string' && /^[a-z0-9_-]{1,64}$/.test(value) ? value : undefined
}

function measure(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : undefined
}

function browserUrl(value: unknown) {
  if (typeof value !== 'string' || !value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url : null
  } catch {
    return null
  }
}

export function portfolioEventProperties(
  event: string,
  properties: Record<string, unknown>,
  { url, referrer, viewportWidth, coarsePointer, reducedMotion }: Environment,
): Record<string, unknown> | null {
  if (!isPortfolioHost(url.hostname) || !isPortfolioPath(url.pathname)) return null

  let details: Record<string, unknown> = {}
  if (event === 'portfolio_interaction') {
    if (typeof properties.action !== 'string' || !actionNames.has(properties.action)) return null
    details = {
      action: properties.action,
      target: stableTag(properties.target),
      project_id: stableTag(properties.project_id),
      surface: stableTag(properties.surface),
      input: stableTag(properties.input),
      percent: measure(properties.percent),
      duration_ms: measure(properties.duration_ms),
    }
  } else if (event === '$pageview' || event === '$pageleave') {
    const { searchParams } = url
    const previousPath = properties.$prev_pageview_pathname
    details = {
      $prev_pageview_pathname:
        typeof previousPath === 'string' && isPortfolioPath(previousPath)
          ? previousPath
          : undefined,
      $prev_pageview_duration: measure(properties.$prev_pageview_duration),
      utm_source: knownTag(searchParams, 'utm_source', sources),
      utm_medium: knownTag(searchParams, 'utm_medium', mediums),
      campaign_tagged: ['utm_source', 'utm_medium', 'utm_campaign'].some((tag) =>
        searchParams.has(tag),
      ),
    }
  } else if (event === '$web_vitals') {
    for (const vital of vitals) {
      const key = `$web_vitals_${vital}`
      const value = measure(properties[`${key}_value`])
      if (value === undefined) continue
      const context = properties[`${key}_event`] as { rating?: unknown; delta?: unknown } | null
      const rating = context?.rating
      details[`${key}_value`] = value
      details[`${key}_event`] = {
        name: vital,
        value,
        rating: typeof rating === 'string' && ratings.has(rating) ? rating : undefined,
        delta: measure(context?.delta),
      }
    }
    if (!Object.keys(details).length) return null
  } else return null

  const referrerUrl = browserUrl(referrer)
  const measurementUrl = event === '$web_vitals' ? browserUrl(properties.$current_url) : null
  const eventUrl =
    measurementUrl?.origin === url.origin && isPortfolioPath(measurementUrl.pathname)
      ? measurementUrl
      : url
  const browserVersion = measure(properties.$browser_version)
  return {
    ...details,
    // The event batch uses token to select the project.
    token: properties.token,
    distinct_id: properties.distinct_id,
    $session_id: properties.$session_id,
    $window_id: properties.$window_id,
    $lib: properties.$lib,
    $lib_version: properties.$lib_version,
    $browser: properties.$browser,
    $browser_version: browserVersion === undefined ? undefined : Math.floor(browserVersion),
    $os: properties.$os,
    $device_type: properties.$device_type,
    $current_url: eventUrl.origin + eventUrl.pathname,
    $host: eventUrl.hostname,
    $pathname: eventUrl.pathname,
    $referrer: referrerUrl?.origin ?? '$direct',
    $referring_domain: referrerUrl?.hostname ?? '$direct',
    $process_person_profile: false,
    locale: getLocaleFromPathname(eventUrl.pathname),
    viewport: viewportWidth < 700 ? 'compact' : viewportWidth < 1024 ? 'medium' : 'wide',
    coarse_pointer: coarsePointer,
    reduced_motion: reducedMotion,
  }
}
