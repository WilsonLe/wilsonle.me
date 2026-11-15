'use client'

import { useEffect } from 'react'
import {
  capturePortfolioInteractions,
  hasAnalyticsOptOut,
  isPortfolioHost,
  isPortfolioPath,
  portfolioEventProperties,
  type PortfolioInteraction,
} from '@/analytics/portfolio-events'
import { observePortfolio } from '@/analytics/observe-portfolio'

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim()

export function PortfolioAnalytics() {
  useEffect(() => {
    const { hostname, pathname } = window.location
    if (
      !projectToken?.startsWith('phc_') ||
      !isPortfolioHost(hostname) ||
      !isPortfolioPath(pathname) ||
      hasAnalyticsOptOut(navigator)
    ) {
      return
    }

    let mounted = true
    let send: ((event: PortfolioInteraction) => void) | undefined
    const pending: PortfolioInteraction[] = []
    const unsubscribe = capturePortfolioInteractions((event) => {
      if (send) send(event)
      else if (pending.length < 64) pending.push(event)
    })
    const stopObserving = observePortfolio()
    const stop = () => {
      mounted = false
      pending.length = 0
      unsubscribe()
      stopObserving()
    }

    void Promise.all([
      import('posthog-js/dist/module.no-external'),
      import('posthog-js/dist/web-vitals').catch(() => undefined),
    ])
      .then(([{ default: posthog }, webVitals]) => {
        if (!mounted) return
        const pointer = window.matchMedia('(pointer: coarse)')
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
        posthog.init(projectToken, {
          api_host: 'https://us.i.posthog.com',
          advanced_disable_flags: true,
          autocapture: false,
          capture_pageview: 'history_change',
          capture_pageleave: true,
          capture_performance: webVitals
            ? {
                network_timing: false,
                web_vitals: true,
                web_vitals_attribution: false,
              }
            : false,
          disable_session_recording: true,
          persistence: 'memory',
          person_profiles: 'never',
          respect_dnt: true,
          save_campaign_params: false,
          before_send: (event) => {
            if (!event?.properties || hasAnalyticsOptOut(navigator)) return null
            const properties = portfolioEventProperties(event.event, event.properties, {
              url: new URL(window.location.href),
              referrer: document.referrer,
              viewportWidth: window.innerWidth,
              coarsePointer: pointer.matches,
              reducedMotion: motion.matches,
            })
            return properties ? { ...event, properties } : null
          },
        })
        send = (interaction) => {
          // These actions can open another app, site, or document immediately.
          const leaving =
            interaction.action === 'contact_clicked' ||
            interaction.action === 'resume_clicked' ||
            interaction.action === 'project_link_clicked' ||
            interaction.action === 'screenshot_clicked'
          posthog.capture(
            'portfolio_interaction',
            interaction,
            leaving ? { send_instantly: true } : undefined,
          )
        }
        pending.forEach(send)
        pending.length = 0
        const navigation = performance.getEntriesByType('navigation')[0]
        if (
          'PerformanceNavigationTiming' in window &&
          navigation instanceof PerformanceNavigationTiming &&
          navigation.responseStart > 0
        ) {
          posthog.capture('$web_vitals', {
            $web_vitals_TTFB_value: navigation.responseStart,
          })
        }
      })
      .catch(stop)

    return stop
  }, [])

  return null
}
