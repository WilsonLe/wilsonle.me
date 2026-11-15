'use client'

import { useEffect, useState } from 'react'
import { hasAnalyticsOptOut } from '@/analytics/portfolio-events'
import {
  hasReplayPermission,
  replayPreferenceKey,
  saveReplayPermission,
} from '@/analytics/replay-preference'
import type { ReplayChoiceCopy } from '@/content/privacy'

export function ReplayPreference({ copy }: { copy: ReplayChoiceCopy }) {
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const [blocked, setBlocked] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const sync = () => {
      setBlocked(hasAnalyticsOptOut(navigator))
      setAllowed(hasReplayPermission())
    }
    const onStorage = (event: StorageEvent) => {
      if (!event.key || event.key === replayPreferenceKey) sync()
    }
    sync()
    window.addEventListener('storage', onStorage)
    window.addEventListener('pageshow', sync)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('pageshow', sync)
    }
  }, [])

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border border-rule bg-ink-raised px-4 py-4 sm:px-5">
      <p id="replay-status" role="status" className="text-sm leading-relaxed text-paper">
        {failed ? copy.unavailable : blocked ? copy.blocked : allowed ? copy.enabled : copy.initial}
      </p>
      <button
        type="button"
        disabled={allowed === null || (blocked && !allowed)}
        aria-describedby="replay-status"
        className="border border-signal px-3 py-2 text-sm font-medium text-signal hover:bg-signal hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal disabled:opacity-40"
        onClick={() => {
          if (!saveReplayPermission(!allowed)) {
            setFailed(true)
            return
          }
          setFailed(false)
          setAllowed(!allowed)
        }}
      >
        {allowed ? copy.turnOff : copy.turnOn}
      </button>
    </div>
  )
}
