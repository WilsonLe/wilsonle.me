'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { SectionTabs, type TabChoice } from '@/components/SectionTabs'

export function TabbedWork({
  choices,
  labels,
  children,
}: {
  choices: TabChoice[]
  labels: { top: string; bottom: string }
  children: ReactNode[]
}) {
  const [activeId, setActiveId] = useState(choices[0].id)
  const current = useRef(choices[0].id)
  const historyState = useRef<Record<string, unknown> | null>(null)
  const [enhanced, setEnhanced] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const pending = useRef<{ target?: string; origin?: 'top' | 'bottom'; bottomTop?: number } | null>(
    null,
  )
  const [navigation, setNavigation] = useState(0)

  useEffect(() => {
    function readHash() {
      let hash = ''
      try {
        hash = decodeURIComponent(window.location.hash.slice(1))
      } catch {
        /* An invalid fragment still has a default/saved selection. */
      }
      const target = document.getElementById(hash)
      const projectId =
        choices.find((choice) => choice.id === hash)?.id ?? target?.closest('article')?.id
      const saved = window.history.state?.portfolioProject
      const id = choices.some((choice) => choice.id === projectId)
        ? projectId!
        : choices.some((choice) => choice.id === saved)
          ? saved
          : current.current
      // Native fragment navigation can create a null state. Retain the previous router fields
      // so restoring this entry does not make Next treat it as an external document.
      if (saved !== id)
        window.history.replaceState(
          { ...(window.history.state ?? historyState.current), portfolioProject: id },
          '',
        )
      historyState.current = window.history.state
      if (projectId === id) pending.current = { target: hash }
      current.current = id
      setActiveId(id)
      setNavigation((value) => value + 1)
    }
    readHash()
    setEnhanced(true)
    window.addEventListener('hashchange', readHash)
    window.addEventListener('popstate', readHash)
    return () => {
      window.removeEventListener('hashchange', readHash)
      window.removeEventListener('popstate', readHash)
    }
  }, [choices])

  useEffect(() => {
    if (!enhanced || !pending.current) return
    const request = pending.current
    pending.current = null
    const frame = requestAnimationFrame(() => {
      if (request.origin === 'bottom') {
        const selected = document.getElementById(`work-tab-bottom-${activeId}`)
        selected?.focus({ preventScroll: true })
        const top = bottomRef.current?.getBoundingClientRect().top
        if (top !== undefined && request.bottomTop !== undefined)
          window.scrollBy({ top: top - request.bottomTop, behavior: 'instant' })
      } else if (request.target) {
        document.getElementById(request.target)?.scrollIntoView({
          block: 'start',
          behavior:
            request.origin === 'top' &&
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches
              ? 'smooth'
              : 'instant',
        })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [activeId, enhanced, navigation])

  function activate(id: string, origin: 'top' | 'bottom') {
    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(
        { ...window.history.state, portfolioProject: current.current },
        '',
      )
      window.history.pushState({ portfolioProject: id }, '', `#${id}`)
      historyState.current = window.history.state
    }
    pending.current = {
      origin,
      target: origin === 'top' ? id : undefined,
      bottomTop: origin === 'bottom' ? bottomRef.current?.getBoundingClientRect().top : undefined,
    }
    current.current = id
    setActiveId(id)
    setNavigation((value) => value + 1)
  }

  return (
    <div className="mt-10 [overflow-anchor:none]">
      <div className="work-top-tabs sticky top-[calc(5rem+1px)] z-40 bg-paper pt-2">
        <SectionTabs
          choices={choices}
          activeId={activeId}
          label={labels.top}
          idPrefix="work-tab-top"
          onActivate={(id) => activate(id, 'top')}
          enhanced={enhanced}
          scrollable
        />
      </div>
      <ol>
        {choices.map((choice, index) => (
          <li
            key={choice.id}
            className="border-b border-ink"
            id={choice.panelId}
            hidden={enhanced && activeId !== choice.id}
            role={enhanced ? 'tabpanel' : undefined}
            aria-labelledby={enhanced ? `work-tab-top-${choice.id}` : undefined}
            tabIndex={enhanced && activeId === choice.id ? 0 : undefined}
          >
            {children[index]}
          </li>
        ))}
      </ol>
      <div ref={bottomRef}>
        <SectionTabs
          choices={choices}
          activeId={activeId}
          label={labels.bottom}
          idPrefix="work-tab-bottom"
          onActivate={(id) => activate(id, 'bottom')}
          enhanced={enhanced}
        />
      </div>
    </div>
  )
}
