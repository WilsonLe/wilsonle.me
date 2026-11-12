import { expect, test } from '@playwright/test'

test.describe('Pangea work showcase', () => {
  test('opens the showcase from selected work and preserves locale and app links', async ({
    page,
  }) => {
    for (const basePath of ['', '/en', '/vi']) {
      await page.goto(basePath || '/')
      const project = page.locator('#work article').filter({ hasText: 'Pangea Chat' })
      await expect(project.getByRole('link', { name: 'Open Pangea Chat' })).toHaveAttribute(
        'href',
        'https://app.pangea.chat/',
      )
      await project.getByRole('link', { name: 'View showcase' }).focus()
      await page.keyboard.press('Enter')
      await expect(page).toHaveURL(new RegExp(`${basePath}/work/pangea-chat$`))
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pangea Chat')
      await expect(
        page.getByRole('link', { name: 'Selected work', exact: true }).first(),
      ).toHaveAttribute('href', `${basePath || '/'}#work`)
      await expect(page.getByRole('link', { name: 'Explore the app' })).toHaveAttribute(
        'href',
        'https://app.pangea.chat/',
      )
    }
  })

  test('reveals the story on scroll and loads the real app images without horizontal overflow', async ({
    page,
  }) => {
    for (const width of [375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/work/pangea-chat')
      const impact = page.getByRole('region', {
        name: 'A complete path from conversation to production.',
      })
      await expect(impact).toHaveCSS('opacity', '0')
      for (const image of await page.locator('main img').all()) {
        await image.scrollIntoViewIfNeeded()
        await expect
          .poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth))
          .toBeGreaterThan(0)
      }
      await impact.scrollIntoViewIfNeeded()
      await expect(impact).toHaveCSS('opacity', '1')
      const geometry = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }))
      expect(geometry.content).toBeLessThanOrEqual(geometry.viewport)
    }
  })

  test('keeps the story visible when motion is reduced or JavaScript is unavailable', async ({
    browser,
    baseURL,
  }) => {
    for (const options of [{ reducedMotion: 'reduce' as const }, { javaScriptEnabled: false }]) {
      const context = await browser.newContext(options)
      const page = await context.newPage()
      await page.goto(new URL('/work/pangea-chat', baseURL).toString())
      for (const section of await page.locator('[data-showcase-reveal]').all()) {
        await expect(section).toHaveCSS('opacity', '1')
      }
      await expect(page.getByRole('heading', { name: 'Pangea Chat', exact: true })).toBeVisible()
      await context.close()
    }
  })

  test('publishes localized metadata and sitemap entries and rejects unknown locales', async ({
    page,
    request,
  }) => {
    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.ok()).toBeTruthy()
    for (const path of ['/work/pangea-chat', '/en/work/pangea-chat', '/vi/work/pangea-chat']) {
      expect(await sitemap.text()).toContain(`https://wilsonle.me${path}`)
      await page.goto(path)
      const canonical = path.startsWith('/vi/') ? '/vi/work/pangea-chat' : '/work/pangea-chat'
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://wilsonle.me${canonical}`,
      )
      await expect(page.locator('link[hreflang="vi"]')).toHaveCount(1)
      await expect(page.locator('link[hreflang="vi"]')).toHaveAttribute(
        'href',
        'https://wilsonle.me/vi/work/pangea-chat',
      )
    }
    expect((await request.get('/fr/work/pangea-chat')).status()).toBe(404)
  })
})
