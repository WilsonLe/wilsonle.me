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
  test('renders the default English homepage', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle('Wilson Le | Forward Deployed Engineer at Lyra')
    await expect(page.locator('header').getByRole('link', { name: 'Wilson Le' })).toBeVisible()
    await expect(page.locator('main').getByText('Wilson Le', { exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Forward Deployed Engineer at Lyra',
    )
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/#about')
    await expect(page.getByRole('link', { name: 'Work', exact: true })).toHaveAttribute(
      'href',
      '/#work',
    )
    await expect(page.getByRole('link', { name: 'Approach' })).toHaveAttribute('href', '/#approach')
    await expect(page.getByRole('link', { name: 'Now', exact: true })).toHaveAttribute(
      'href',
      '/#now',
    )
    await expect(page.getByRole('link', { name: 'Résumé', exact: true })).toHaveAttribute(
      'href',
      '/resume',
    )
    await expect(page.getByRole('link', { name: 'Explore selected work' })).toHaveAttribute(
      'href',
      '/#work',
    )
    await expect(page.getByRole('link', { name: 'View résumé' })).toHaveAttribute('href', '/resume')
    await expect(page.getByRole('heading', { name: 'Selected work' })).toBeVisible()
    await expect(page.locator('#work article')).toHaveCount(3)
    await expect(page.locator('#work').getByText('The product', { exact: true })).toHaveCount(3)
    await expect(page.locator('#work').getByText('My part', { exact: true })).toHaveCount(3)
    await expect(page.locator('#work').getByText('Across the stack', { exact: true })).toHaveCount(
      0,
    )
    await expect(
      page.getByRole('heading', { name: 'The principles behind the build.' }),
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Currently in Brisbane.' })).toBeVisible()
    await expect(page.getByText('Updated September 2026', { exact: true })).toBeVisible()
    await expect(page.getByText('Follow the whole path', { exact: true })).toBeVisible()
    await expect(page.getByText('Build it to run', { exact: true })).toBeVisible()
    await expect(page.getByText('Leave a map', { exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Open Pangea Chat' })).toHaveAttribute(
      'href',
      'https://app.pangea.chat/',
    )
    await expect(
      page.getByText('I built the frontend, AI services, and delivery systems behind the product.'),
    ).toBeVisible()
    await expect(page.getByText('1,000+ requests per second')).toHaveCount(0)
    await expect(page.getByText('Vulcan internal platform')).toBeVisible()
    const privateProject = page
      .locator('#work article')
      .filter({ hasText: 'Vulcan internal platform' })
    await expect(privateProject.getByRole('link')).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Experience', exact: true })).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Tech Stack', exact: true })).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Education', exact: true })).toHaveCount(0)
  })

  test('renders the explicit English locale route', async ({ page }) => {
    await page.goto('/en')

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Forward Deployed Engineer at Lyra',
    )
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/en#about')
    await expect(page.getByRole('link', { name: 'Résumé', exact: true })).toHaveAttribute(
      'href',
      '/en/resume',
    )
    await expect(page.getByRole('link', { name: 'View résumé' })).toHaveAttribute(
      'href',
      '/en/resume',
    )
  })

  test('renders the Vietnamese locale route with current fallback content', async ({ page }) => {
    await page.goto('/vi')

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Forward Deployed Engineer at Lyra',
    )
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/vi#about')
    await expect(page.getByRole('link', { name: 'Résumé', exact: true })).toHaveAttribute(
      'href',
      '/vi/resume',
    )
  })

  test('keeps website templates in footer navigation across locales', async ({ page }) => {
    for (const [homePath, templatesPath] of [
      ['/', '/website-templates'],
      ['/en', '/en/website-templates'],
      ['/vi', '/vi/website-templates'],
    ]) {
      await page.goto(homePath)

      await expect(
        page.locator('header').getByRole('link', { name: 'Website templates' }),
      ).toHaveCount(0)

      const templatesLink = page
        .locator('footer')
        .getByRole('navigation', { name: 'Navigation' })
        .getByRole('link', { name: 'Website templates' })
      await expect(templatesLink).toHaveAttribute('href', templatesPath)
      await templatesLink.click()
      await expect(page).toHaveURL(new RegExp(`${templatesPath}$`))
      await expect(page.getByRole('heading', { level: 1, name: 'Website templates' })).toBeVisible()
    }

    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await page.getByRole('button', { name: 'Toggle navigation' }).click()
    await expect(
      page.locator('#mobile-navigation').getByRole('link', { name: 'Website templates' }),
    ).toHaveCount(0)
    await expect(
      page.locator('footer').getByRole('link', { name: 'Website templates' }),
    ).toBeVisible()
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
      for (const route of ['/', '/resume']) {
        await test.step(`${route} at ${width}px`, async () => {
          await page.setViewportSize({ width, height: 900 })
          await page.goto(route)
          await expect(page.locator('main h1')).toHaveCount(1)

          const geometry = await page.evaluate(() => ({
            clientWidth: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
          }))

          expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth)

          if (route === '/') {
            await page.getByRole('link', { name: 'Explore selected work' }).click()
            await expect(page).toHaveURL(/#work$/)
            await page.waitForFunction(() => {
              const work = document.querySelector('#work')
              return work instanceof HTMLElement && work.getBoundingClientRect().top >= 79
            })
            const workTop = await page
              .locator('#work')
              .evaluate((element) => Math.round(element.getBoundingClientRect().top))
            expect(workTop).toBeGreaterThanOrEqual(79)
          }
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

  test('loads the portrait without blocking the personal introduction', async ({ page }) => {
    await page.goto('/')

    const portrait = page.getByAltText('Portrait of Wilson Le')
    await portrait.scrollIntoViewIfNeeded()
    await expect(portrait).toBeVisible()
    await expect
      .poll(() =>
        portrait.evaluate((image) => image instanceof HTMLImageElement && image.naturalWidth),
      )
      .toBeGreaterThan(0)
    await expect(
      page
        .locator('#about')
        .getByText("I'm Wilson Le, a forward deployed engineer based in Brisbane, Queensland."),
    ).toBeVisible()
  })

  test('renders the compact default English résumé route', async ({ page }) => {
    await page.goto('/resume')

    await expect(page).toHaveTitle('Résumé | Wilson Le')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://wilsonle.me/resume',
    )
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Experience')
    await expect(page.locator('#experience article')).toHaveCount(4)
    await expect(page.locator('#experience article').first()).toContainText(
      'Forward Deployed Engineer',
    )
    await expect(page.locator('#experience article').first()).toContainText('Lyra · Full-time')
    await expect(page.locator('#experience article').first()).toContainText(
      'Sep 2026 – Present · 1 mo',
    )
    await expect(page.locator('#experience article').nth(1)).toContainText(
      'Pangea Chat · Full-time',
    )
    await expect(page.getByText('AI-powered language learning via chat with friends')).toBeVisible()
    await expect(page.getByText('Robotics learning platform')).toBeVisible()
    await expect(page.getByText('Cloud application engineering team')).toBeVisible()
    await expect(page.getByText('DeerX', { exact: true })).toHaveCount(0)
    await expect(page.locator('#education')).toHaveCount(0)
    await expect(page.locator('#skills')).toHaveCount(0)
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/#about')
    await expect(page.getByRole('link', { name: 'Résumé', exact: true })).toHaveAttribute(
      'href',
      '/resume',
    )
  })

  test('renders explicit localized résumé routes', async ({ page }) => {
    await page.goto('/en/resume')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://wilsonle.me/resume',
    )
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/en#about')
    await expect(page.getByRole('link', { name: 'Résumé', exact: true })).toHaveAttribute(
      'href',
      '/en/resume',
    )

    await page.goto('/vi/resume')
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://wilsonle.me/vi/resume',
    )
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Experience')
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/vi#about')
    await expect(page.getByRole('link', { name: 'Résumé', exact: true })).toHaveAttribute(
      'href',
      '/vi/resume',
    )
  })

  test('lists localized résumé routes in the sitemap', async ({ request }) => {
    const response = await request.get('/sitemap.xml')

    expect(response.ok()).toBeTruthy()
    const sitemap = await response.text()
    expect(sitemap).toContain('<loc>https://wilsonle.me/resume</loc>')
    expect(sitemap).toContain('<loc>https://wilsonle.me/en/resume</loc>')
    expect(sitemap).toContain('<loc>https://wilsonle.me/vi/resume</loc>')
  })

  test('uses the inspected social card across home and résumé metadata', async ({
    page,
    request,
  }) => {
    for (const route of ['/', '/en', '/vi', '/resume', '/en/resume', '/vi/resume']) {
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

      for (const route of [
        { name: 'home', path: '/' },
        { name: 'resume', path: '/resume' },
      ]) {
        await page.goto(route.path)

        if (route.name === 'home') {
          const portrait = page.getByAltText('Portrait of Wilson Le')
          await portrait.scrollIntoViewIfNeeded()
          await expect
            .poll(() =>
              portrait.evaluate((image) => image instanceof HTMLImageElement && image.naturalWidth),
            )
            .toBeGreaterThan(0)
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
