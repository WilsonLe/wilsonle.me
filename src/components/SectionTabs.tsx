'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'

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
}: {
  choices: TabChoice[]
  activeId: string
  label: string
  idPrefix: string
  onActivate: (id: string) => void
  enhanced: boolean
  tone?: 'light' | 'dark'
  scrollable?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [focusedId, setFocusedId] = useState(activeId)
  useEffect(() => setFocusedId(activeId), [activeId])

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
      className={`section-tabs flex gap-x-2 gap-y-1 border-b ${scrollable ? 'flex-nowrap overflow-x-auto overscroll-x-contain px-1' : 'flex-wrap'}`}
      data-scroll={scrollable ? 'true' : undefined}
      data-tone={tone}
    >
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
          className={`font-label flex min-h-11 min-w-0 scroll-mb-2 scroll-mt-24 items-center border-b-2 border-transparent px-3 py-2 text-xs leading-5 [overflow-wrap:anywhere] transition-colors ${scrollable ? 'shrink-0 whitespace-nowrap' : 'max-w-full'}`}
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
