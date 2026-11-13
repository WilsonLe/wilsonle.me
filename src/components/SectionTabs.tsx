'use client'

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'

export interface TabChoice {
  id: string
  label: string
  panelId: string
  href: string
}

export function SectionTabs({
  choices,
  activeId,
  label,
  idPrefix,
  onActivate,
  enhanced,
  tone = 'light',
  scrollable = false,
  animatedIndicator = false,
  scrollLabels,
}: {
  choices: TabChoice[]
  activeId: string
  label: string
  idPrefix: string
  onActivate: (id: string) => void
  enhanced: boolean
  tone?: 'light' | 'dark'
  scrollable?: boolean
  animatedIndicator?: boolean
  scrollLabels?: { previous: string; next: string }
}) {
  const shell = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [focusedId, setFocusedId] = useState(activeId)
  const [indicator, setIndicator] = useState<{ left: number; top: number; width: number } | null>(
    null,
  )
  const [overflow, setOverflow] = useState({ present: false, previous: false, next: false })
  useEffect(() => setFocusedId(activeId), [activeId])

  useLayoutEffect(() => {
    if (!animatedIndicator || !enhanced || !ref.current) return
    const element = ref.current
    const measure = () => {
      const selected = element.querySelector<HTMLAnchorElement>('[data-selected="true"]')
      if (!selected) return
      const bounds = element.getBoundingClientRect()
      const tab = selected.getBoundingClientRect()
      setIndicator({
        left: tab.left - bounds.left + element.scrollLeft,
        top: tab.bottom - bounds.top + element.scrollTop - 2,
        width: tab.width,
      })
    }
    measure()
    const resize = new ResizeObserver(measure)
    resize.observe(element)
    element.querySelectorAll('a').forEach((anchor) => resize.observe(anchor))
    return () => resize.disconnect()
  }, [activeId, animatedIndicator, enhanced])

  useEffect(() => {
    const element = ref.current
    const container = shell.current
    if (!scrollable || !enhanced || !element || !container) return
    const measure = () => {
      const next = {
        present: element.scrollWidth > container.clientWidth + 1,
        previous: element.scrollLeft > 1,
        next: element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
      }
      setOverflow((current) =>
        current.present === next.present &&
        current.previous === next.previous &&
        current.next === next.next
          ? current
          : next,
      )
    }
    const resize = new ResizeObserver(measure)
    resize.observe(container)
    resize.observe(element)
    for (const link of element.children) resize.observe(link)
    element.addEventListener('scroll', measure, { passive: true })
    measure()
    return () => {
      resize.disconnect()
      element.removeEventListener('scroll', measure)
    }
  }, [choices, enhanced, scrollable])

  useEffect(() => {
    const element = ref.current
    if (!scrollable || !enhanced || !element) return
    const selected = element.querySelector<HTMLElement>('[aria-selected="true"]')
    if (!selected) return
    const left = selected.offsetLeft
    if (left < element.scrollLeft) element.scrollTo({ left, behavior: 'instant' })
    else if (left + selected.offsetWidth > element.scrollLeft + element.clientWidth)
      element.scrollTo({
        left: left + selected.offsetWidth - element.clientWidth,
        behavior: 'instant',
      })
  }, [activeId, enhanced, overflow.present, scrollable])

  function scrollTabs(direction: number) {
    const element = ref.current
    if (!element) return
    element.scrollBy({
      left: direction * element.clientWidth * 0.75,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    })
  }

  function handleKey(event: KeyboardEvent<HTMLAnchorElement>, index: number) {
    if (!enhanced) return
    if (event.key === ' ') {
      event.preventDefault()
      onActivate(choices[index].id)
      return
    }
    const next =
      event.key === 'ArrowRight'
        ? (index + 1) % choices.length
        : event.key === 'ArrowLeft'
          ? (index - 1 + choices.length) % choices.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? choices.length - 1
              : null
    if (next === null) return
    event.preventDefault()
    setFocusedId(choices[next].id)
    const target = ref.current?.querySelectorAll<HTMLAnchorElement>('a')[next]
    target?.focus({ preventScroll: true })
    target?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
  }

  return (
    <div
      ref={shell}
      className={`section-tabs-shell relative min-w-0 ${scrollable ? 'border-b' : ''}`}
      data-tone={tone}
    >
      <div
        ref={ref}
        id={`${idPrefix}-list`}
        role={enhanced ? 'tablist' : undefined}
        aria-label={label}
        className={`section-tabs relative flex gap-x-2 gap-y-1 ${scrollable ? 'flex-nowrap overflow-x-auto overscroll-x-contain px-1' : 'flex-wrap border-b'} ${overflow.present ? 'mx-10' : ''}`}
        data-scroll={scrollable ? 'true' : undefined}
        data-tone={tone}
        data-animated={animatedIndicator && enhanced ? 'true' : undefined}
      >
        {animatedIndicator && enhanced && indicator && (
          <span
            aria-hidden="true"
            className="section-tab-indicator pointer-events-none absolute left-0 top-0 h-0.5 bg-current transition-[transform,width] duration-300 ease-out motion-reduce:transition-none"
            style={{
              transform: `translate(${indicator.left}px, ${indicator.top}px)`,
              width: indicator.width,
            }}
          />
        )}
        {choices.map((choice, index) => (
          <a
            key={choice.id}
            id={`${idPrefix}-${choice.id}`}
            href={choice.href}
            role={enhanced ? 'tab' : undefined}
            aria-selected={enhanced ? activeId === choice.id : undefined}
            aria-controls={enhanced ? choice.panelId : undefined}
            data-selected={activeId === choice.id ? 'true' : undefined}
            tabIndex={enhanced ? (focusedId === choice.id ? 0 : -1) : undefined}
            className={`font-label flex min-h-11 min-w-0 scroll-mb-2 scroll-mt-24 items-center border-b-2 border-transparent px-3 py-2 text-xs leading-5 [overflow-wrap:anywhere] transition-colors ${animatedIndicator ? 'duration-300 motion-reduce:transition-none' : ''} ${scrollable ? 'shrink-0 whitespace-nowrap' : 'max-w-full'}`}
            onKeyDown={(event) => handleKey(event, index)}
            onClick={(event) => {
              if (!enhanced || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
                return
              event.preventDefault()
              setFocusedId(choice.id)
              onActivate(choice.id)
            }}
          >
            {choice.label}
          </a>
        ))}
      </div>
      {overflow.present &&
        scrollLabels &&
        ([-1, 1] as const).map((direction) => (
          <button
            key={direction}
            type="button"
            aria-label={direction === -1 ? scrollLabels.previous : scrollLabels.next}
            aria-controls={`${idPrefix}-list`}
            disabled={direction === -1 ? !overflow.previous : !overflow.next}
            onClick={() => scrollTabs(direction)}
            className={`absolute inset-y-0 flex w-10 items-center justify-center from-ink/15 to-transparent text-ink disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-signal-deep ${direction === -1 ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l'}`}
          >
            <svg
              aria-hidden="true"
              className="size-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d={direction === -1 ? 'm14 6-6 6 6 6' : 'm10 6 6 6-6 6'}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
    </div>
  )
}
