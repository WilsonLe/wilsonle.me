'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { robotAnimationLabels, type WorkScreen } from '@/content/work'

export function RobotOverlay({ robot }: { robot: NonNullable<WorkScreen['robot']> }) {
  const [playing, setPlaying] = useState<boolean | null>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setPlaying(!reducedMotion.matches)
    syncMotion()
    reducedMotion.addEventListener('change', syncMotion)
    return () => reducedMotion.removeEventListener('change', syncMotion)
  }, [])

  return (
    <div className="work-robot-overlay">
      <div className="relative">
        <Image
          src={playing ? robot.src : robot.poster}
          alt={robot.alt}
          width={robot.width}
          height={robot.height}
          unoptimized
          className="h-auto w-full rounded-sm"
        />
        {playing !== null && (
          <button
            type="button"
            onClick={() => setPlaying(!playing)}
            aria-label={playing ? robotAnimationLabels.pause : robotAnimationLabels.play}
            className="absolute right-1 bottom-1 flex size-7 items-center justify-center rounded-full bg-ink/85 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal sm:size-8"
          >
            <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
              {playing ? <path d="M6 4h4v16H6zM14 4h4v16h-4z" /> : <path d="m7 4 14 8-14 8z" />}
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
