import { expect, test, type Page } from '@playwright/test'
import { selectProject } from './helpers/work'

async function auditText(page: Page) {
  // Wait for the responsive layout and its size observers to settle.
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  )
  return page.evaluate(async () => {
    await document.fonts.ready
    const context = document.createElement('canvas').getContext('2d')!
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    const collisions: string[] = []
    const clippedText = new Set<string>()
    let measured = 0
    let node: Node | null
    while ((node = walker.nextNode())) {
      const parent = node.parentElement
      if (
        !parent ||
        parent.closest('script, style, svg, [aria-hidden="true"], .sr-only') ||
        !node.textContent?.trim()
      )
        continue
      if (!parent.getClientRects().length || getComputedStyle(parent).visibility === 'hidden')
        continue
      const style = getComputedStyle(parent)
      if (style.display !== 'inline' && parent.scrollWidth > parent.clientWidth + 1) {
        clippedText.add(`${parent.id || parent.tagName}: ${node.textContent.trim()}`)
      }
      context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
      const lines: { top: number; text: string }[] = []
      for (let index = 0; index < node.textContent.length; index++) {
        const range = document.createRange()
        range.setStart(node, index)
        range.setEnd(node, index + 1)
        const rect = range.getBoundingClientRect()
        if (!rect.width || !rect.height) continue
        // Skill loops and the sticky tab rail deliberately scroll horizontally; each label still passes intrinsic/ink checks.
        if (
          !parent.closest('.tech-strip, .section-tabs[data-scroll="true"], noscript') &&
          (rect.left < -1 || rect.right > document.documentElement.clientWidth + 1)
        ) {
          clippedText.add(`${parent.id || parent.tagName}: ${node.textContent.trim()}`)
        }
        let line = lines.find((entry) => Math.abs(entry.top - rect.top) < 1)
        if (!line) {
          line = { top: rect.top, text: '' }
          lines.push(line)
        }
        line.text += node.textContent[index]
      }
      const rows = lines.map((line) => {
        const text = style.textTransform === 'uppercase' ? line.text.toUpperCase() : line.text
        const metrics = context.measureText(text)
        return {
          ...line,
          ascent: metrics.actualBoundingBoxAscent,
          descent: metrics.actualBoundingBoxDescent,
        }
      })
      measured++
      for (let index = 1; index < rows.length; index++) {
        const previous = rows[index - 1]
        const current = rows[index]
        const gap = current.top - previous.top - previous.descent - current.ascent
        if (gap < 1) {
          collisions.push(
            `${parent.id || parent.tagName}: "${previous.text}" / "${current.text}" (${gap.toFixed(2)}px gap)`,
          )
        }
      }
    }
    return {
      collisions,
      clippedText: [...clippedText],
      measured,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }
  })
}

for (const route of ['/', '/en', '/vi']) {
  test(`the city portfolio and project dialogs fit their viewport on ${route}`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(route)
    for (const width of [320, 375, 640, 768, 1024, 1440]) {
      await test.step(`${width}px`, async () => {
        await page.setViewportSize({ width, height: 900 })
        const first = await auditText(page)
        expect(first.measured).toBeGreaterThanOrEqual(18)
        expect(first.collisions).toEqual([])
        expect(first.clippedText).toEqual([])
        expect(first.overflow).toBeLessThanOrEqual(0)
        const dialog = await selectProject(page, 'pangea-chat')
        const bounds = (await dialog.boundingBox())!
        expect(bounds.x).toBeGreaterThanOrEqual(0)
        expect(bounds.x + bounds.width).toBeLessThanOrEqual(width)
        const inside = await auditText(page)
        expect(inside.collisions).toEqual([])
        expect(inside.clippedText).toEqual([])
        expect(inside.overflow).toBeLessThanOrEqual(0)
        await page.keyboard.press('Escape')
        await expect(dialog).toBeHidden()
        await expect(page).not.toHaveURL(/#pangea-chat$/)
      })
    }
  })
}

test('keeps mobile navigation usable with enlarged text on short screens', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 375, height: 420 },
    { width: 667, height: 320 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('/')
    await page.addStyleTag({ content: 'html { font-size: 200%; }' })
    const header = page.getByRole('banner')
    for (const name of ['Work', 'Contact']) {
      const link = header.getByRole('link', { name, exact: true })
      await link.focus()
      await expect(link).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(page.getByRole('heading', { name, exact: true })).toBeFocused()
      await expect(page).toHaveURL('#' + name.toLowerCase())
    }
    const audit = await auditText(page)
    expect(audit.collisions).toEqual([])
    expect(audit.clippedText).toEqual([])
    expect(audit.overflow).toBeLessThanOrEqual(0)
  }
})
