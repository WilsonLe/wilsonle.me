'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export function WorkScroll({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    )
      return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('work-revealed')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    root.current
      ?.querySelectorAll('[data-work-reveal]')
      .forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return <div ref={root}>{children}</div>
}
