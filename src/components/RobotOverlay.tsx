'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { trackPortfolio } from '@/analytics/portfolio-events'
import { robotAnimationLabels, type WorkScreen } from '@/content/work'

export function RobotOverlay({
  robot,
  projectId,
  screenId,
}: {
  robot: NonNullable<WorkScreen['robot']>
  projectId: string
  screenId: string
}) {
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
            onClick={() => {
              trackPortfolio(playing ? 'robot_animation_paused' : 'robot_animation_played', {
                project_id: projectId,
                target: screenId,
              })
              setPlaying(!playing)
            }}
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
