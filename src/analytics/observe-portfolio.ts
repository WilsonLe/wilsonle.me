import { trackPortfolio, type PortfolioAction } from '@/analytics/portfolio-events'

const linkActions = new Set([
  'navigation_clicked',
  'resume_clicked',
  'contact_clicked',
  'project_link_clicked',
  'screenshot_clicked',
])
const scrollThresholds = [100, 90, 75, 50, 25]
const viewSelector = '[data-portfolio-view], article[data-project-id]'
const watchedResourceTags = new Set(['IMG', 'SCRIPT', 'LINK', 'SOURCE', 'AUDIO', 'VIDEO'])

export function observePortfolio() {
  const onLink = (event: MouseEvent) => {
    if (event.type === 'auxclick' && event.button !== 1) return
    if (!(event.target instanceof Element)) return
    const link = event.target.closest<HTMLAnchorElement>('a[data-portfolio-action]')
    const action = link?.dataset.portfolioAction
    if (!link || !action || !linkActions.has(action)) return
    const pointerType = 'pointerType' in event ? event.pointerType : undefined
    trackPortfolio(action as PortfolioAction, {
      target: link.dataset.portfolioTarget,
      project_id: link.dataset.portfolioProject,
      surface: link.closest<HTMLElement>('[data-portfolio-surface]')?.dataset.portfolioSurface,
      input: pointerType === 'touch' ? 'touch' : event.detail === 0 ? 'keyboard' : 'pointer',
    })
  }

  const highWaterMark = new WeakMap<HTMLElement, number>()
  const onScroll = (event: Event) => {
    const target = event.target
    if (!(target instanceof HTMLElement) || !target.hasAttribute('data-portfolio-scroll')) return
    if (document.hidden) return
    const scrollRange = target.scrollHeight - target.clientHeight
    if (scrollRange <= 0) return
    const percentage = Math.round((target.scrollTop / scrollRange) * 100)
    const reached = scrollThresholds.find((threshold) => percentage >= threshold) ?? 0
    if (reached > (highWaterMark.get(target) ?? 0)) {
      highWaterMark.set(target, reached)
      trackPortfolio('scroll_depth', { percent: reached })
    }
  }

  const seen = new Set<string>()
  const observed = new WeakSet<Element>()
  const views =
    typeof IntersectionObserver === 'function'
      ? new IntersectionObserver(
          (entries) => {
            if (document.hidden) return
            for (const { target, intersectionRatio } of entries) {
              if (intersectionRatio < 0.25 || !(target instanceof HTMLElement)) continue
              const { projectId, portfolioProject, portfolioView, portfolioTarget } = target.dataset
              const action = projectId
                ? 'project_billboard_seen'
                : portfolioView === 'screenshot'
                  ? 'screenshot_seen'
                  : 'section_seen'
              const id = projectId ?? portfolioTarget ?? portfolioView
              if (!id) continue
              const key = [window.location.pathname, action, portfolioProject, id].join(':')
              views?.unobserve(target)
              if (seen.has(key)) continue
              seen.add(key)
              trackPortfolio(action, { target: id, project_id: portfolioProject })
            }
          },
          { threshold: 0.25 },
        )
      : null
  const watch = (element: Element) => {
    if (observed.has(element)) return
    observed.add(element)
    views?.observe(element)
  }
  const watchSubtree = (element: Element) => {
    if (element.matches(viewSelector)) watch(element)
    element.querySelectorAll(viewSelector).forEach(watch)
  }
  const main = document.querySelector('main')
  const changes =
    views && main && typeof MutationObserver === 'function'
      ? new MutationObserver((records) => {
          for (const record of records) {
            record.addedNodes.forEach((node) => {
              if (node instanceof Element) watchSubtree(node)
            })
          }
        })
      : null
  if (main) {
    watchSubtree(main)
    changes?.observe(main, { childList: true, subtree: true })
  }
  const onVisibility = () => {
    if (!document.hidden)
      main?.querySelectorAll(viewSelector).forEach((element) => {
        views?.unobserve(element)
        views?.observe(element)
      })
  }

  // Count broad failures once. Error messages, paths, and rejections can contain private data.
  const failures = new Set<string>()
  const failure = (kind: string) => {
    if (failures.has(kind)) return
    failures.add(kind)
    trackPortfolio('browser_error', { target: kind })
  }
  const onError = (event: Event) => {
    if (event instanceof ErrorEvent) failure('javascript')
    else if (event.target instanceof HTMLElement && watchedResourceTags.has(event.target.tagName))
      failure(`resource_${event.target.tagName.toLowerCase()}`)
  }
  const onRejection = () => failure('promise')

  document.addEventListener('click', onLink, true)
  document.addEventListener('auxclick', onLink, true)
  document.addEventListener('scroll', onScroll, { capture: true, passive: true })
  document.addEventListener('visibilitychange', onVisibility)
  window.addEventListener('error', onError, true)
  window.addEventListener('unhandledrejection', onRejection)
  return () => {
    views?.disconnect()
    changes?.disconnect()
    document.removeEventListener('click', onLink, true)
    document.removeEventListener('auxclick', onLink, true)
    document.removeEventListener('scroll', onScroll, true)
    document.removeEventListener('visibilitychange', onVisibility)
    window.removeEventListener('error', onError, true)
    window.removeEventListener('unhandledrejection', onRejection)
  }
}
