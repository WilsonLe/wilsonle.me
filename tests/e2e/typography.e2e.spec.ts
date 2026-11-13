import { expect, test, type Page } from '@playwright/test'
import { projectChoices, selectProject } from './helpers/work'

async function auditText(page: Page) {
  // A viewport resize must paint before measuring viewport-relative type sizes.
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(resolve)))
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
      if (!parent || parent.closest('script, style, svg') || !node.textContent?.trim()) continue
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
        if (rect.left < -1 || rect.right > document.documentElement.clientWidth + 1) {
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
  test(`text lines stay separate across responsive layouts on ${route}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(route)
    for (const width of [320, 375, 640, 768, 867, 960, 1023, 1024, 1210, 1440, 1920]) {
      await test.step(`${width}px`, async () => {
        await page.setViewportSize({ width, height: 900 })
        for (const project of projectChoices) {
          await selectProject(page, project.id)
          const audit = await auditText(page)
          // One project is displayed at a time; measure every selected state.
          expect(audit.measured).toBeGreaterThan(60)
          expect(audit.collisions).toEqual([])
          expect(audit.clippedText).toEqual([])
          expect(audit.overflow).toBeLessThanOrEqual(0)
        }
      })
    }
  })
}

test('text stays readable with serif fallbacks and enlarged text', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  for (const family of ['Georgia, serif', 'serif']) {
    const override = await page.addStyleTag({
      content: `.font-display { font-family: ${family}; }`,
    })
    for (const width of [375, 1210, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      for (const project of projectChoices) {
        await selectProject(page, project.id)
        const audit = await auditText(page)
        expect(audit.collisions, `${project.id} with ${family} at ${width}px`).toEqual([])
        expect(audit.clippedText).toEqual([])
        expect(audit.overflow).toBeLessThanOrEqual(0)
      }
    }
    await override.evaluate((element) => element.parentNode?.removeChild(element))
  }
  await page.addStyleTag({ content: 'html { font-size: 200%; }' })
  for (const width of [320, 375, 768, 1210]) {
    await page.setViewportSize({ width, height: 900 })
    for (const project of projectChoices) {
      await selectProject(page, project.id)
      const audit = await auditText(page)
      expect(audit.collisions, `${project.id} at ${width}px with 200% text`).toEqual([])
      expect(audit.clippedText).toEqual([])
      expect(audit.overflow).toBeLessThanOrEqual(0)
    }
    for (const tab of await page
      .getByRole('tablist', { name: 'Tech stack sections' })
      .getByRole('tab')
      .all()) {
      await tab.click()
      const stackAudit = await auditText(page)
      expect(stackAudit.collisions).toEqual([])
      expect(stackAudit.clippedText).toEqual([])
      expect(stackAudit.overflow).toBeLessThanOrEqual(0)
    }
    if (width < 1024) {
      await page.getByRole('button', { name: 'Toggle navigation' }).click()
      const expanded = await auditText(page)
      expect(expanded.collisions).toEqual([])
      expect(expanded.clippedText, `expanded navigation at ${width}px with 200% text`).toEqual([])
      expect(expanded.overflow).toBeLessThanOrEqual(0)
      await page.getByRole('button', { name: 'Toggle navigation' }).click()
    }
  }
})

test('every navigation link remains reachable on short screens with enlarged text', async ({
  page,
}) => {
  for (const viewport of [
    { width: 375, height: 420 },
    { width: 667, height: 320 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('/')
    await page.addStyleTag({ content: 'html { font-size: 200%; }' })
    const toggle = page.getByRole('button', { name: 'Toggle navigation' })
    await toggle.focus()
    await page.keyboard.press('Enter')
    const menu = page.locator('#mobile-navigation')
    for (const name of ['Work', 'Download résumé', 'Contact']) {
      await page.keyboard.press('Tab')
      const link = menu.getByRole('link', { name, exact: true })
      await expect(link).toBeFocused()
      const bounds = await link.evaluate((element) => ({
        top: element.getBoundingClientRect().top,
        bottom: element.getBoundingClientRect().bottom,
        menuTop: document.querySelector('#mobile-navigation')!.getBoundingClientRect().top,
        viewportHeight: innerHeight,
      }))
      expect(bounds.top, `${name} at ${viewport.width}×${viewport.height}`).toBeGreaterThanOrEqual(
        bounds.menuTop,
      )
      expect(bounds.bottom, `${name} at ${viewport.width}×${viewport.height}`).toBeLessThanOrEqual(
        bounds.viewportHeight,
      )
    }
    expect(await menu.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/#contact$/)
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  }
})
