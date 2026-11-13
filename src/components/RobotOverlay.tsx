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
            className="absolute inset-0 block size-full cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
          >
            {!playing && (
              <span
                aria-hidden="true"
                className="font-label absolute inset-0 grid place-items-center rounded-sm bg-ink/55 text-[8px] font-medium leading-none text-white sm:text-xs"
              >
                {robotAnimationLabels.paused}
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
