'use client'

import { useId, useState } from 'react'
import type { Principles } from '@/content/types'

interface SdlcCycleChartProps {
  principles: Principles
}

const stagePositions = [
  'left-1/2 top-[15%]',
  'left-[80%] top-[32.5%]',
  'left-[80%] top-[67.5%]',
  'left-1/2 top-[85%]',
  'left-[20%] top-[67.5%]',
  'left-[20%] top-[32.5%]',
]

const stageAngles = [-90, -30, 30, 90, 150, 210]

function pointAt(angle: number) {
  const radians = (angle * Math.PI) / 180
  return {
    x: 200 + 140 * Math.cos(radians),
    y: 200 + 140 * Math.sin(radians),
  }
}

function arcToNextStage(index: number) {
  const start = pointAt(stageAngles[index] + 15)
  const end = pointAt(stageAngles[index] + 45)
  return `M ${start.x} ${start.y} A 140 140 0 0 1 ${end.x} ${end.y}`
}

export function SdlcCycleChart({ principles }: SdlcCycleChartProps) {
  const [selected, setSelected] = useState(0)
  const [iteration, setIteration] = useState(1)
  const markerPrefix = useId().replace(/:/g, '')
  const stage = principles.stages[selected]

  function advance() {
    if (selected === principles.stages.length - 1) {
      setSelected(0)
      setIteration((current) => current + 1)
      return
    }
    setSelected(selected + 1)
  }

  function restartWithFeedback() {
    setSelected(0)
    setIteration((current) => current + 1)
  }

  return (
    <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
      <div className="field-grid border border-rule bg-ink-raised p-2 sm:p-6">
        <div
          role="group"
          aria-label={principles.chartLabel}
          className="relative mx-auto aspect-square w-full max-w-[34rem]"
        >
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <marker
                id={`${markerPrefix}-arrow`}
                markerWidth="9"
                markerHeight="9"
                refX="7"
                refY="4.5"
                orient="auto"
              >
                <path d="M1 1 L7 4.5 L1 8" fill="none" stroke="#a8caff" strokeWidth="1.5" />
              </marker>
              <marker
                id={`${markerPrefix}-active-arrow`}
                markerWidth="9"
                markerHeight="9"
                refX="7"
                refY="4.5"
                orient="auto"
              >
                <path d="M1 1 L7 4.5 L1 8" fill="none" stroke="#ff8052" strokeWidth="1.5" />
              </marker>
            </defs>
            <circle cx="200" cy="200" r="140" fill="none" stroke="#465043" strokeWidth="1" />
            <circle
              cx="200"
              cy="200"
              r="80"
              fill="none"
              stroke="#465043"
              strokeWidth="1"
              strokeDasharray="3 8"
            />
            {principles.stages.map((item, index) => {
              const active = index === selected
              return (
                <path
                  key={item.id}
                  d={arcToNextStage(index)}
                  fill="none"
                  stroke={active ? '#ff8052' : '#a8caff'}
                  strokeWidth={active ? 3 : 1.5}
                  strokeLinecap="round"
                  markerEnd={`url(#${markerPrefix}-${active ? 'active-arrow' : 'arrow'})`}
                  className="transition-all duration-200"
                />
              )
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-signal bg-ink text-center shadow-[0_0_40px_rgba(255,128,82,0.15)] sm:h-36 sm:w-36">
            <span className="font-label text-[0.65rem] font-bold uppercase tracking-[0.12em] text-signal sm:text-xs">
              {principles.agentLabel}
            </span>
            <span className="mt-2 max-w-24 text-xs leading-4 text-paper-muted sm:max-w-28 sm:text-sm sm:leading-5">
              {principles.agentDetail}
            </span>
          </div>

          <ol className="absolute inset-0 m-0 list-none p-0">
            {principles.stages.map((item, index) => (
              <li
                key={item.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 ${stagePositions[index]}`}
              >
                <button
                  type="button"
                  aria-pressed={index === selected}
                  onClick={() => setSelected(index)}
                  className={`flex h-16 w-[5.25rem] flex-col items-center justify-center gap-1 border px-1 text-center transition-colors sm:h-20 sm:w-28 ${
                    index === selected
                      ? 'border-signal bg-signal text-ink'
                      : 'border-blueprint/60 bg-ink-raised text-paper hover:border-blueprint hover:bg-ink-soft'
                  }`}
                >
                  <span className="font-label text-[0.6rem] font-bold tracking-[0.1em] sm:text-xs">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-semibold leading-tight sm:text-sm">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="flex min-h-80 flex-col justify-between border border-rule bg-ink-raised p-6 sm:p-8">
        <div aria-live="polite" aria-atomic="true">
          <p className="font-label text-xs font-bold uppercase tracking-[0.12em] text-blueprint">
            {principles.iterationLabel} {String(iteration).padStart(2, '0')}
          </p>
          <p className="font-label mt-12 text-sm text-signal">
            {String(selected + 1).padStart(2, '0')} /{' '}
            {String(principles.stages.length).padStart(2, '0')}
          </p>
          <h3 className="font-display mt-4 text-4xl text-paper sm:text-5xl">{stage.label}</h3>
          <p className="mt-5 max-w-sm text-base leading-7 text-paper-muted">{stage.detail}</p>
        </div>
        <div className="mt-10 grid gap-3">
          <button
            type="button"
            onClick={advance}
            className="flex items-center justify-between border border-signal bg-signal px-5 py-3 text-left text-sm font-bold text-ink transition-colors hover:bg-paper"
          >
            {principles.nextLabel}
            <span aria-hidden="true">↗</span>
          </button>
          <button
            type="button"
            onClick={restartWithFeedback}
            className="flex items-center justify-between border border-blueprint/60 px-5 py-3 text-left text-sm font-bold text-blueprint transition-colors hover:border-blueprint hover:bg-ink-soft"
          >
            {principles.feedbackLabel}
            <span aria-hidden="true">↺</span>
          </button>
        </div>
      </div>
    </div>
  )
}
