import type { PostHogConfig } from 'posthog-js'
import { isPortfolioPath } from '@/analytics/portfolio-events'

const layoutAttributes = [
  'class',
  'role',
  'type',
  'open',
  'tabindex',
  'aria-hidden',
  'width',
  'height',
  'viewbox',
  'd',
  'fill',
  'stroke',
  'stroke-width',
  'data-ready',
  'data-visible',
]
const layoutAttributeNames = new Set(layoutAttributes)

export const replayRecordingOptions: PostHogConfig['session_recording'] = {
  maskAllInputs: true,
  maskTextSelector: '*',
  blockSelector:
    '[data-replay-private], form, input, textarea, select, [contenteditable], iframe, canvas, video, audio, script',
  maskAttributeFn: (name, value) => (layoutAttributeNames.has(name.toLowerCase()) ? value : ''),
  attributeFilter: layoutAttributes,
  captureCanvas: { recordCanvas: false },
  recordCrossOriginIframes: false,
  captureJsonLd: false,
  recordHeaders: false,
  recordBody: false,
  maskCapturedNetworkRequestFn: (data) => {
    // PostHog uses this hook for both replay page URLs and recorded network requests.
    // Its page URL input has only a name. Drop network timing and payload entries.
    if (Object.keys(data).some((key) => key !== 'name')) return null
    const origin = window.location.origin
    try {
      const url = new URL(data.name, origin)
      if (url.origin !== origin || !isPortfolioPath(url.pathname)) return null
      return { ...data, name: url.origin + url.pathname }
    } catch {
      return null
    }
  },
}
