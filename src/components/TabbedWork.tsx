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
  const [enhanced, setEnhanced] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)
  const pending = useRef<{ target?: string; selection?: boolean } | null>(null)
  const [navigation, setNavigation] = useState(0)

  useEffect(() => {
    function readHash() {
      let hash: string
      try {
        hash = decodeURIComponent(window.location.hash.slice(1))
      } catch {
        return
      }
      const target = document.getElementById(hash)
      const projectId =
        choices.find((choice) => choice.id === hash)?.id ?? target?.closest('article')?.id
      if (!projectId || !choices.some((choice) => choice.id === projectId)) return
      pending.current = { target: hash }
      setActiveId(projectId)
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
      if (request.selection) {
        const selected = document.getElementById(`work-tab-top-${activeId}`)
        selected?.focus({ preventScroll: true })
        topRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
        selected?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
      } else if (request.target) {
        document
          .getElementById(request.target)
          ?.scrollIntoView({ block: 'start', behavior: 'instant' })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [activeId, enhanced, navigation])

  function activate(id: string) {
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`)
    pending.current = { selection: true }
    setActiveId(id)
    setNavigation((value) => value + 1)
  }

  return (
    <div className="mt-10">
      <div ref={topRef} className="scroll-mt-24">
        <SectionTabs
          choices={choices}
          activeId={activeId}
          label={labels.top}
          idPrefix="work-tab-top"
          onActivate={activate}
          enhanced={enhanced}
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
      <SectionTabs
        choices={choices}
        activeId={activeId}
        label={labels.bottom}
        idPrefix="work-tab-bottom"
        onActivate={activate}
        enhanced={enhanced}
      />
    </div>
  )
}
