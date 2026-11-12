'use client'

import { type ReactNode, useEffect, useRef } from 'react'

export function ScrollEntrance({
  as: Tag = 'div',
  children,
  className,
  id,
  labelledBy,
}: {
  as?: 'div' | 'figure'
  children: ReactNode
  className?: string
  id?: string
  labelledBy?: string
}) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.entered = 'true'
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={(element) => {
        ref.current = element
      }}
      className={className}
      id={id}
      aria-labelledby={labelledBy}
    >
      {children}
    </Tag>
  )
}
