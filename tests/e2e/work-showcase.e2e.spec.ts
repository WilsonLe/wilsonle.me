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
        name: 'Keep learning inside the conversation.',
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
      for (const stroke of await page.locator('.feature-draw').all()) {
        await expect(stroke).toHaveCSS('stroke-dashoffset', '0px')
      }
      for (const detail of await page.locator('.feature-appear').all()) {
        await expect(detail).toHaveCSS('opacity', '1')
      }
      await expect(page.getByRole('heading', { name: 'Pangea Chat', exact: true })).toBeVisible()
      await context.close()
    }
  })

  test('draws the SVG callouts on entry and reveals complete artwork when reduced motion is enabled', async ({
    page,
  }) => {
    await page.goto('/work/pangea-chat')
    const artworks = page.locator('.feature-artwork')
    await expect(artworks).toHaveCount(2)
    for (const artwork of await artworks.all()) {
      const stroke = artwork.locator('.feature-draw').first()
      await expect(stroke).toHaveCSS('stroke-dashoffset', '1px')
      await artwork.scrollIntoViewIfNeeded()
      await expect(stroke).toHaveCSS('stroke-dashoffset', '0px')
      await expect(artwork.locator('.feature-appear').last()).toHaveCSS('opacity', '1')
    }
    const source = page.getByRole('link', {
      name: 'A real Pangea activity offers a choice to play with Pangea Bot or with other learners.',
      exact: true,
    })
    await source.focus()
    await expect(source).toBeFocused()
    await expect(source).toHaveAttribute('href', '/images/work/pangea-chat/roleplay.webp')

    await page.goto('/')
    await page.goto('/work/pangea-chat')
    await expect(artworks.first().locator('.feature-draw').first()).toHaveCSS(
      'stroke-dashoffset',
      '1px',
    )
    await page.emulateMedia({ reducedMotion: 'reduce' })
    for (const panel of await page.locator('figure').filter({ has: artworks }).all()) {
      await expect(panel).toHaveCSS('opacity', '1')
    }
    for (const artwork of await artworks.all()) {
      await expect(artwork.locator('.feature-draw').first()).toHaveCSS('stroke-dashoffset', '0px')
      await expect(artwork.locator('.feature-appear').last()).toHaveCSS('opacity', '1')
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
