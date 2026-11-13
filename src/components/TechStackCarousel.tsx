'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { TechStack } from '@/content/types'
import { SectionTabs } from '@/components/SectionTabs'

export function TechStackCarousel({ stack }: { stack: TechStack }) {
  const ref = useRef<HTMLDivElement>(null)
  const strip = useRef<HTMLDivElement>(null)
  const progress = useRef(0)
  const stride = useRef(0)
  const current = useRef(0)
  const [active, setActive] = useState(0)
  const [enhanced, setEnhanced] = useState(false)
  const [interacted, setInteracted] = useState(false)
  const [reduced, setReduced] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [browse, setBrowse] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const skills = useMemo(
    () =>
      stack.groups.flatMap((group) =>
        group.technologies.map((technology) => ({ ...technology, groupId: group.id })),
      ),
    [stack.groups],
  )
  const group = stack.groups.find((group) => group.id === skills[active].groupId)!

  const paint = useCallback(() => {
    if (!strip.current || !stride.current) return
    const count = skills.length
    progress.current %= count
    // Three identical runs keep left-to-right motion seamless across the loop boundary.
    const x = -(count + progress.current) * stride.current
    strip.current.style.transform = `translateX(${x}px)`
    const index = ((Math.ceil(progress.current) % count) + count) % count
    if (current.current !== index) {
      current.current = index
      setActive(index)
    }
  }, [skills.length])

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const changeMotion = () => {
      setReduced(motion.matches)
      if (motion.matches) setInteracted(true)
    }
    setReduced(motion.matches)
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
    const measure = () => {
      const runs = strip.current?.children
      if (!runs || runs.length < 2) return
      stride.current =
        ((runs[1] as HTMLElement).offsetLeft - (runs[0] as HTMLElement).offsetLeft) / skills.length
      paint()
      setEnhanced(true)
    }
    measure()
    const resize = new ResizeObserver(measure)
    if (element) resize.observe(element)
    return () => {
      motion.removeEventListener('change', changeMotion)
      document.removeEventListener('visibilitychange', changeVisibility)
      observer?.disconnect()
      resize.disconnect()
    }
  }, [paint, skills.length])

  const rotating = enhanced && !interacted && !reduced && !hovered && visible && pageVisible
  useEffect(() => {
    if (!rotating) return
    let frame = 0
    let previous: number | undefined
    const tick = (time: number) => {
      if (previous !== undefined && stride.current) {
        progress.current -= (Math.min(time - previous, 100) * 0.024) / stride.current
        paint()
      }
      previous = time
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [rotating, paint])

  useEffect(() => {
    if (!browse) return
    const timer = window.setTimeout(() => setBrowse(false), 4000)
    return () => window.clearTimeout(timer)
  }, [browse])

  function select(index: number) {
    setInteracted(true)
    progress.current = (index + skills.length) % skills.length
    paint()
  }

  return (
    <div
      ref={ref}
      className="tech-carousel flex min-w-0 flex-col"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby="tech-stack-heading"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setInteracted(true)}
      data-rotating={rotating ? 'true' : 'false'}
      data-browse={browse ? 'true' : undefined}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2
          id="tech-stack-heading"
          className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-signal"
        >
          {stack.heading}
        </h2>
      </div>
      <div className="order-last mt-5">
        <SectionTabs
          choices={stack.groups.map((group) => ({
            id: group.id,
            label: group.label,
            panelId: 'skills-panel',
            href: `#skills-fallback-${group.id}`,
          }))}
          activeId={group.id}
          label={stack.categoriesLabel}
          idPrefix="tech-tab"
          enhanced={enhanced}
          tone="dark"
          onActivate={(id) => select(skills.findIndex((skill) => skill.groupId === id))}
        />
      </div>
      <div
        id="skills-panel"
        role={enhanced ? 'tabpanel' : undefined}
        aria-labelledby={`tech-tab-${group.id}`}
        tabIndex={enhanced ? 0 : undefined}
      >
        <div
          className="tech-viewport relative overflow-hidden py-2"
          onPointerDown={(event) => {
            if (event.pointerType !== 'mouse') {
              setBrowse(true)
              setInteracted(true)
            }
          }}
        >
          {enhanced && (
            <>
              <button
                type="button"
                aria-label={stack.previousLabel}
                aria-controls="skills-panel"
                onClick={() => select(current.current - 1)}
                className="tech-browse absolute inset-y-2 left-0 z-10 flex w-11 items-center justify-start bg-gradient-to-r from-ink-soft/95 to-transparent pl-1 text-paper"
              >
                <svg
                  aria-hidden="true"
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="m14 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                aria-label={stack.nextLabel}
                aria-controls="skills-panel"
                onClick={() => select(current.current + 1)}
                className="tech-browse absolute inset-y-2 right-0 z-10 flex w-11 items-center justify-end bg-gradient-to-l from-ink-soft/95 to-transparent pr-1 text-paper"
              >
                <svg
                  aria-hidden="true"
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="m10 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
          <div
            ref={strip}
            className={`tech-strip relative flex w-max gap-3 ${enhanced ? '' : 'invisible'}`}
          >
            {[0, 1, 2].map((copy) => (
              <ul
                key={copy}
                data-carousel-copy={copy}
                aria-hidden={copy !== 1}
                inert={copy !== 1}
                className="flex shrink-0 gap-3"
              >
                {skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex min-h-40 w-36 shrink-0 flex-col items-center justify-center gap-5 border border-rule bg-ink-raised px-3 py-5 text-center text-sm leading-6 text-paper [overflow-wrap:anywhere]"
                  >
                    {/* The adjacent name supplies the accessible label; logos are decorative. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={skill.icon}
                      width={44}
                      height={44}
                      alt=""
                      className="h-11 w-11 object-contain brightness-0 invert"
                    />
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <span className="sr-only" aria-live="polite">
          {interacted ? skills[active].name : ''}
        </span>
      </div>
      <noscript>
        <div className="mt-8 space-y-6">
          {stack.groups.map((group) => (
            <section key={group.id} id={`skills-fallback-${group.id}`}>
              <h3 className="font-display text-2xl text-paper">{group.label}</h3>
              <p className="mt-2 text-sm leading-7 text-paper-muted">
                {group.technologies.map((technology) => technology.name).join(' · ')}
              </p>
            </section>
          ))}
        </div>
      </noscript>
    </div>
  )
}
