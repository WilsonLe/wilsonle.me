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
import { replayRecordingOptions } from '@/analytics/replay-config'
import { hasReplayPermission, replayPreferenceKey } from '@/analytics/replay-preference'

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
    let stopReplay: (() => void) | undefined
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
      stopReplay?.()
    }

    const allowsReplay = () =>
      hasReplayPermission() &&
      isPortfolioPath(window.location.pathname) &&
      !hasAnalyticsOptOut(navigator)

    void Promise.all([
      import('posthog-js/dist/module.no-external'),
      import('posthog-js/dist/web-vitals').catch(() => undefined),
      allowsReplay()
        ? import('posthog-js/dist/posthog-recorder').catch(() => undefined)
        : undefined,
    ])
      .then(([{ default: posthog }, webVitals, recorder]) => {
        if (!mounted) return
        const pointer = window.matchMedia('(pointer: coarse)')
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
        const replayEnabled = Boolean(recorder) && allowsReplay()
        posthog.init(projectToken, {
          api_host: 'https://us.i.posthog.com',
          advanced_disable_flags: !replayEnabled,
          advanced_disable_feature_flags: true,
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
          disable_capture_url_hashes: true,
          disable_external_dependency_loading: true,
          disable_session_recording: !replayEnabled,
          enable_recording_console_log: false,
          session_recording: replayRecordingOptions,
          persistence: 'memory',
          person_profiles: 'never',
          respect_dnt: true,
          save_campaign_params: false,
          before_send: (event) => {
            if (!event?.properties || hasAnalyticsOptOut(navigator)) return null
            if (event.event === '$snapshot') return replayEnabled && allowsReplay() ? event : null
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
        if (replayEnabled) {
          const stopWhenDisallowed = () => {
            if (!allowsReplay()) posthog.stopSessionRecording()
          }
          const onStorage = (event: StorageEvent) => {
            if (!event.key || event.key === replayPreferenceKey) stopWhenDisallowed()
          }
          window.addEventListener('storage', onStorage)
          window.addEventListener('pageshow', stopWhenDisallowed)
          window.addEventListener('popstate', stopWhenDisallowed)
          stopReplay = () => {
            window.removeEventListener('storage', onStorage)
            window.removeEventListener('pageshow', stopWhenDisallowed)
            window.removeEventListener('popstate', stopWhenDisallowed)
            posthog.stopSessionRecording()
          }
        }
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
