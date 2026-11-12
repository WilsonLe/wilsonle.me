import { readFile } from 'node:fs/promises'
import { expect, test } from '@playwright/test'

function relativeLuminance(hexColor: string): number {
  const channels = hexColor
    .replace('#', '')
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16) / 255)

  if (!channels || channels.length !== 3) {
    throw new Error(`Expected a six-digit hex color, received ${hexColor}`)
  }

  const [red, green, blue] = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  )

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

function contrastRatio(firstColor: string, secondColor: string): number {
  const luminances = [relativeLuminance(firstColor), relativeLuminance(secondColor)].sort(
    (first, second) => second - first,
  )

  return (luminances[0] + 0.05) / (luminances[1] + 0.05)
}

test.describe('Frontend', () => {
  test('renders the work-led landing page with annotated product screenshots', async ({ page }) => {
    await page.goto('/')
    const header = page.getByRole('banner')
    await expect(page).toHaveTitle('Wilson Le | Forward Deployed Engineer at Lyra')
    await expect(header.getByRole('link', { name: 'Wilson Le' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Forward Deployed Engineer at Lyra',
    )
    await expect(header.getByRole('link', { name: 'Work', exact: true })).toHaveAttribute(
      'href',
      '/#work',
    )
    await expect(
      header.getByRole('link', { name: 'Download résumé', exact: true }),
    ).toHaveAttribute('href', '/wilson-le-resume.pdf')
    await expect(page.getByRole('link', { name: 'View work', exact: true })).toHaveAttribute(
      'href',
      '/#work',
    )
    await expect(page.getByRole('heading', { name: 'Work', exact: true })).toBeVisible()
    await expect(page.locator('#work article')).toHaveCount(5)
    await expect(page.locator('#work figure')).toHaveCount(14)
    await expect(page.locator('#pangea-chat h4')).toHaveText([
      'Sentence builder',
      'Pangea Bot',
      'Message interpreter',
      'World-map group chats',
    ])
    await expect(page.locator('#work').getByText('My part', { exact: true })).toHaveCount(3)
    await expect(page.locator('#work').getByText('Features', { exact: true })).toHaveCount(2)
    await expect(
      page.locator('#work').getByText('Frontend + AI services', { exact: true }),
    ).toHaveCount(0)
    await expect(page.locator('#contact').getByText('Contact', { exact: true })).toHaveCount(0)
    await expect(
      page.getByText('Built the frontend and AI assistant.', { exact: true }),
    ).toBeVisible()
    await expect(
      page.getByText('One other engineer and I shared ownership', { exact: false }),
    ).toHaveCount(0)
    await expect(page.locator('#approach, #now, #about')).toHaveCount(0)
    await expect(
      page.locator('a[href*="#approach"], a[href*="#now"], a[href*="#about"]'),
    ).toHaveCount(0)
    await expect(
      page.locator(
        'a[href$="/work/pangea-chat"], a[href$="/work/cyobot"], a[href$="/work/vulcan-augmetics"]',
      ),
    ).toHaveCount(0)
    await expect(page.getByRole('link', { name: 'Open Pangea Chat' })).toHaveAttribute(
      'href',
      'https://app.pangea.chat/',
    )
    await expect(page.getByRole('heading', { name: 'Vulcan Augmetics', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Open LocalCut' })).toHaveAttribute(
      'href',
      'https://wilsonle.github.io/LocalCut/',
    )
    await expect(page.getByRole('link', { name: 'Open LocalDesign' })).toHaveAttribute(
      'href',
      'https://wilsonle.github.io/LocalDesign/',
    )
    await expect(page.getByRole('heading', { name: 'Experience', exact: true })).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Education', exact: true })).toHaveCount(0)
  })

  test('renders the explicit English locale route', async ({ page }) => {
    await page.goto('/en')

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Forward Deployed Engineer at Lyra',
    )
    await expect(
      page.getByRole('banner').getByRole('link', { name: 'Work', exact: true }),
    ).toHaveAttribute('href', '/en#work')
    await expect(
      page.getByRole('banner').getByRole('link', { name: 'Download résumé', exact: true }),
    ).toHaveAttribute('href', '/wilson-le-resume.pdf')
    await expect(
      page.getByRole('main').getByRole('link', { name: 'Download résumé' }),
    ).toHaveAttribute('href', '/wilson-le-resume.pdf')
  })

  test('renders the Vietnamese locale route with current fallback content', async ({ page }) => {
    await page.goto('/vi')

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Forward Deployed Engineer at Lyra',
    )
    await expect(
      page.getByRole('banner').getByRole('link', { name: 'Work', exact: true }),
    ).toHaveAttribute('href', '/vi#work')
    await expect(
      page.getByRole('banner').getByRole('link', { name: 'Download résumé', exact: true }),
    ).toHaveAttribute('href', '/wilson-le-resume.pdf')
  })

  test('omits website templates from navigation across locales and viewports', async ({ page }) => {
    for (const width of [1440, 375]) {
      await page.setViewportSize({ width, height: 812 })
      for (const route of ['/', '/en', '/vi']) {
        await page.goto(route)
        await expect(page.getByRole('link', { name: /website templates/i })).toHaveCount(0)
        await expect(
          page.locator('a[href*="website-templates"], a[href*="template-previews"]'),
        ).toHaveCount(0)
        await expect(
          page.locator('footer').getByRole('link', { name: 'Download résumé' }),
        ).toBeVisible()
        if (width === 375) {
          await page.getByRole('button', { name: 'Toggle navigation' }).click()
          await expect(page.locator('#mobile-navigation')).toBeVisible()
          await expect(page.getByRole('link', { name: /website templates/i })).toHaveCount(0)
          await expect(page.locator('#mobile-navigation a[href*="template"]')).toHaveCount(0)
        }
      }
    }
  })

  test('returns 404 for removed template pages and preview images', async ({ request }) => {
    for (const route of [
      '/website-templates',
      '/en/website-templates',
      '/vi/website-templates',
      '/template-previews/en/agency',
      '/template-previews/en/restaurant',
      '/template-previews/vi/agency',
      '/template-previews/vi/restaurant',
      ...['baguette', 'dessert', 'noodles', 'rolls', 'salad', 'table'].map(
        (image) => `/templates/restaurant/${image}.webp`,
      ),
    ]) {
      const response = await request.get(route)
      expect(response.status(), route).toBe(404)
    }
  })

  test('uses Wilson Le in Person structured data', async ({ page }) => {
    await page.goto('/')

    const jsonText = await page.locator('script[type="application/ld+json"]').textContent()
    expect(jsonText).toBeTruthy()

    const person = JSON.parse(jsonText!) as Record<string, unknown>
    expect(person['@type']).toBe('Person')
    expect(person.name).toBe('Wilson Le')
    expect(person.alternateName).toBeUndefined()
  })

  test('keeps the responsive layouts within the viewport and anchor targets below the header', async ({
    page,
  }) => {
    for (const width of [375, 768, 1440]) {
      for (const route of ['/', '/en', '/vi']) {
        await test.step(`${route} at ${width}px`, async () => {
          await page.setViewportSize({ width, height: 900 })
          await page.goto(route)
          await expect(page.locator('main h1')).toHaveCount(1)

          const geometry = await page.evaluate(() => ({
            clientWidth: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
          }))

          expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth)

          await page.getByRole('link', { name: 'View work' }).click()
          await expect(page).toHaveURL(/#work$/)
          await page.waitForFunction(() => {
            const work = document.querySelector('#work')
            return work instanceof HTMLElement && work.getBoundingClientRect().top >= 79
          })
          const workTop = await page
            .locator('#work')
            .evaluate((element) => Math.round(element.getBoundingClientRect().top))
          expect(workTop).toBeGreaterThanOrEqual(79)
        })
      }
    }
  })

  test('opens and closes the mobile navigation from the keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const menuButton = page.getByRole('button', { name: 'Toggle navigation' })
    await menuButton.focus()
    await expect(menuButton).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('#mobile-navigation')).toBeVisible()

    await page.keyboard.press('Tab')
    await expect(
      page.locator('#mobile-navigation').getByRole('link', { name: 'Work' }),
    ).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(menuButton).toBeFocused()
    await page.keyboard.press('Space')
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('#mobile-navigation')).toHaveCount(0)
  })

  test('uses WCAG AA palette pairs and disables smooth scrolling for reduced motion', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    const palette = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement)
      const value = (name: string) => styles.getPropertyValue(name).trim()

      return {
        ink: value('--color-ink'),
        paper: value('--color-paper'),
        paperMuted: value('--color-paper-muted'),
        signal: value('--color-signal'),
        signalDeep: value('--color-signal-deep'),
        blueprint: value('--color-blueprint'),
        blueprintDeep: value('--color-blueprint-deep'),
      }
    })

    const normalTextPairs = [
      [palette.paper, palette.ink],
      [palette.paperMuted, palette.ink],
      [palette.signal, palette.ink],
      [palette.blueprint, palette.ink],
      [palette.signalDeep, palette.paper],
      [palette.blueprintDeep, palette.paper],
      [palette.ink, palette.blueprint],
      [palette.ink, palette.signal],
    ]

    for (const [foreground, background] of normalTextPairs) {
      expect(
        contrastRatio(foreground, background),
        `${foreground} on ${background} should meet WCAG AA`,
      ).toBeGreaterThanOrEqual(4.5)
    }

    const scrollBehavior = await page
      .locator('html')
      .evaluate((element) => getComputedStyle(element).getPropertyValue('scroll-behavior'))
    expect(scrollBehavior).toBe('auto')
  })

  // Isolate visitor sessions: Chromium throttles bursts of more than ten downloads.
  for (const route of ['/', '/en', '/vi']) {
    test(`downloads the resume PDF from every entry point on ${route}`, async ({
      page,
      request,
    }) => {
      const response = await request.get('/wilson-le-resume.pdf')
      expect(response.ok()).toBeTruthy()
      expect(response.headers()['content-type']).toContain('application/pdf')
      expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-')

      await page.goto(route)
      await expect(page.locator('a[href$="/resume"]')).toHaveCount(0)
      for (const role of ['banner', 'main', 'contentinfo'] as const) {
        const link = page
          .getByRole(role)
          .getByRole('link', { name: 'Download résumé', exact: true })
        await expect(link).toHaveAttribute('download', '')
        const downloadPromise = page.waitForEvent('download')
        await link.click()
        const download = await downloadPromise
        expect(download.suggestedFilename()).toBe('wilson-le-resume.pdf')
        expect((await readFile((await download.path())!)).subarray(0, 5).toString()).toBe('%PDF-')
        await expect(page).toHaveURL(new RegExp(`${route}$`))
      }

      await page.setViewportSize({ width: 375, height: 812 })
      await page.getByRole('button', { name: 'Toggle navigation' }).click()
      const downloadPromise = page.waitForEvent('download')
      await page
        .locator('#mobile-navigation')
        .getByRole('link', { name: 'Download résumé' })
        .click()
      expect((await downloadPromise).suggestedFilename()).toBe('wilson-le-resume.pdf')
      await expect(page.getByRole('button', { name: 'Toggle navigation' })).toHaveAttribute(
        'aria-expanded',
        'false',
      )
      await page.setViewportSize({ width: 1440, height: 900 })
    })
  }

  test('returns 404 for every removed resume page', async ({ request }) => {
    for (const route of ['/resume', '/en/resume', '/vi/resume']) {
      expect((await request.get(route)).status(), route).toBe(404)
    }
  })

  test('lists only home routes in the sitemap', async ({ request }) => {
    const response = await request.get('/sitemap.xml')

    expect(response.ok()).toBeTruthy()
    const sitemap = await response.text()
    const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
    expect(urls.sort()).toEqual(
      ['', '/en', '/vi'].map((route) => `https://wilsonle.me${route}`).sort(),
    )
    expect(sitemap).not.toContain('website-templates')
    expect(sitemap).not.toContain('template-previews')
  })

  test('uses the inspected social card across home metadata', async ({ page, request }) => {
    for (const route of ['/', '/en', '/vi']) {
      await test.step(route, async () => {
        await page.goto(route)
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
          'content',
          'https://wilsonle.me/og.png',
        )
        await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
          'content',
          'https://wilsonle.me/og.png',
        )
      })
    }

    const response = await request.get('/og.png')
    expect(response.ok()).toBeTruthy()
    expect(response.headers()['content-type']).toContain('image/png')

    const image = await response.body()
    expect(image.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a')
    expect(image.readUInt32BE(16)).toBe(1200)
    expect(image.readUInt32BE(20)).toBe(630)
  })

  test('captures rendered visual evidence for the approved layouts', async ({ page }, testInfo) => {
    for (const viewport of [
      { name: 'desktop', width: 1440, height: 1000 },
      { name: 'mobile', width: 375, height: 812 },
    ]) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })

      for (const route of [{ name: 'home', path: '/' }]) {
        await page.goto(route.path)

        if (route.name === 'home') {
          const screenshots = page.locator('#work img')
          for (const image of await screenshots.all()) {
            await image.scrollIntoViewIfNeeded()
            await expect
              .poll(() =>
                image.evaluate(
                  (element) => element instanceof HTMLImageElement && element.naturalWidth,
                ),
              )
              .toBeGreaterThan(0)
          }
          await page.evaluate(() => {
            document.documentElement.style.scrollBehavior = 'auto'
            window.scrollTo(0, 0)
          })
          await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
        }

        await testInfo.attach(`${route.name}-${viewport.name}`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: 'image/png',
        })
      }
    }
  })
})
