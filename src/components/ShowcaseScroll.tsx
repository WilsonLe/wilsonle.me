'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export function ShowcaseScroll({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = root.current
    if (
      !element ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const targets = element.querySelectorAll<HTMLElement>('[data-showcase-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            entry.target.dataset.revealed = 'true'
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' },
    )

    for (const target of targets) {
      if (target.getBoundingClientRect().top < window.innerHeight - 32) {
        target.dataset.revealed = 'true'
      } else {
        observer.observe(target)
      }
    }
    element.dataset.motionReady = 'true'

    // Keyboard focus must never land inside an unrevealed section.
    const revealFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return
      const target = event.target.closest<HTMLElement>('[data-showcase-reveal]')
      if (target) target.dataset.revealed = 'true'
    }
    element.addEventListener('focusin', revealFocused)

    return () => {
      observer.disconnect()
      element.removeEventListener('focusin', revealFocused)
      delete element.dataset.motionReady
    }
  }, [])

  return (
    <div ref={root} className="work-showcase bg-paper text-ink">
      {children}
    </div>
  )
}
