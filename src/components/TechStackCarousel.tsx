'use client'

import { useEffect, useRef, useState } from 'react'
import type { TechStack } from '@/content/types'
import { SectionTabs } from '@/components/SectionTabs'

export function TechStackCarousel({ stack }: { stack: TechStack }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [enhanced, setEnhanced] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [reduced, setReduced] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)

  useEffect(() => {
    setEnhanced(true)
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(motion.matches)
    setPlaying(!motion.matches)
    const changeMotion = () => {
      setReduced(motion.matches)
      if (motion.matches) setPlaying(false)
    }
    const changeVisibility = () => setPageVisible(!document.hidden)
    changeVisibility()
    motion.addEventListener('change', changeMotion)
    document.addEventListener('visibilitychange', changeVisibility)
    const element = ref.current
    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
            threshold: 0.1,
          })
        : null
    if (element && observer) observer.observe(element)
    else setVisible(true)
    return () => {
      motion.removeEventListener('change', changeMotion)
      document.removeEventListener('visibilitychange', changeVisibility)
      observer?.disconnect()
    }
  }, [])

  const rotating = playing && !reduced && !hovered && visible && pageVisible
  useEffect(() => {
    if (!rotating) return
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % stack.groups.length),
      6000,
    )
    return () => window.clearInterval(timer)
  }, [rotating, stack.groups.length])

  const choices = stack.groups.map((group, index) => ({
    id: group.id,
    label: group.label,
    panelId: `tech-panel-${group.id}`,
    href: index === 0 ? `#tech-panel-${group.id}` : `#tech-fallback-${group.id}`,
  }))

  return (
    <div
      ref={ref}
      className="tech-carousel flex min-w-0 flex-col"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby="tech-stack-heading"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setPlaying(false)}
      data-rotating={rotating ? 'true' : 'false'}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2
          id="tech-stack-heading"
          className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-signal"
        >
          {stack.heading}
        </h2>
        {!reduced && (
          <div className="flex gap-1">
            <button
              type="button"
              aria-label={stack.pauseDescription}
              onClick={() => setPlaying(false)}
              className="min-h-11 min-w-11 px-2 text-xs text-paper-muted hover:text-signal"
            >
              {stack.pauseLabel}
            </button>
            <button
              type="button"
              aria-label={stack.playDescription}
              onClick={() => setPlaying(true)}
              className="min-h-11 min-w-11 px-2 text-xs text-paper-muted hover:text-signal"
            >
              {stack.playLabel}
            </button>
          </div>
        )}
      </div>
      <div className="order-last mt-6">
        <SectionTabs
          choices={choices}
          activeId={stack.groups[active].id}
          label={stack.categoriesLabel}
          idPrefix="tech-tab"
          enhanced={enhanced}
          tone="dark"
          onActivate={(id) => {
            setPlaying(false)
            setActive(stack.groups.findIndex((group) => group.id === id))
          }}
        />
      </div>
      <div className="tech-panels grid min-h-64" aria-live={rotating ? 'off' : 'polite'}>
        {stack.groups.map((group, index) => (
          <div
            key={group.id}
            id={`tech-panel-${group.id}`}
            role={enhanced ? 'tabpanel' : undefined}
            aria-labelledby={`tech-tab-${group.id}`}
            aria-hidden={active !== index}
            inert={active !== index}
            tabIndex={active === index ? 0 : -1}
            className={`tech-panel min-w-0 [grid-area:1/1] ${active !== index ? 'invisible' : ''}`}
          >
            <h3 className="font-display mb-5 text-3xl leading-tight text-paper">{group.label}</h3>
            <ul className="grid grid-cols-2 gap-2">
              {group.technologies.map((technology) => (
                <li
                  key={technology}
                  className="min-w-0 border border-rule bg-ink-raised px-3 py-3 text-sm leading-6 text-paper [overflow-wrap:anywhere]"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <noscript>
        <div className="mt-8 space-y-6">
          {stack.groups.slice(1).map((group) => (
            <section key={group.id} id={`tech-fallback-${group.id}`}>
              <h3 className="font-display text-2xl text-paper">{group.label}</h3>
              <p className="mt-2 text-sm leading-7 text-paper-muted">
                {group.technologies.join(' · ')}
              </p>
            </section>
          ))}
        </div>
      </noscript>
    </div>
  )
}
