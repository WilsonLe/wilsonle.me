'use client'

import { useEffect } from 'react'

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
const portfolioHosts = new Set(['wilsonle.me', 'www.wilsonle.me'])

export function PortfolioAnalytics() {
  useEffect(() => {
    if (!projectToken?.startsWith('phc_') || !portfolioHosts.has(window.location.hostname)) {
      return
    }

    let mounted = true
    void import('posthog-js/dist/module.no-external')
      .then(({ default: posthog }) => {
        if (!mounted) return

        posthog.init(projectToken, {
          api_host: 'https://us.i.posthog.com',
          advanced_disable_flags: true,
          autocapture: false,
          capture_pageview: 'history_change',
          capture_pageleave: false,
          disable_session_recording: true,
          persistence: 'memory',
          person_profiles: 'never',
          respect_dnt: true,
          save_campaign_params: false,
          before_send: (event) => {
            if (event?.event !== '$pageview' || !event.properties) return null

            const { origin, hostname, pathname } = window.location
            const referrer = document.referrer ? new URL(document.referrer) : null
            const {
              token,
              distinct_id,
              $session_id,
              $window_id,
              $lib,
              $lib_version,
              $browser,
              $os,
              $device_type,
            } = event.properties

            // Keep the SDK's routing and session fields alongside basic pageview data.
            return {
              ...event,
              properties: {
                token,
                distinct_id,
                $session_id,
                $window_id,
                $lib,
                $lib_version,
                $browser,
                $os,
                $device_type,
                $current_url: origin + pathname,
                $host: hostname,
                $pathname: pathname,
                $referrer: referrer?.origin ?? '$direct',
                $referring_domain: referrer?.hostname ?? '$direct',
                $process_person_profile: false,
              },
            }
          },
        })
      })
      .catch(() => {
        // Analytics must never interrupt the portfolio.
      })

    return () => {
      mounted = false
    }
  }, [])

  return null
}
