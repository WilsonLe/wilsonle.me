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
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [focusedId, setFocusedId] = useState(activeId)
  const [indicator, setIndicator] = useState<{ left: number; top: number; width: number } | null>(
    null,
  )
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
      ref={ref}
      role={enhanced ? 'tablist' : undefined}
      aria-label={label}
      className={`section-tabs relative flex gap-x-2 gap-y-1 border-b ${scrollable ? 'flex-nowrap overflow-x-auto overscroll-x-contain px-1' : 'flex-wrap'}`}
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
  )
}
