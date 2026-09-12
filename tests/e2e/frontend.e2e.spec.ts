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

    await expect(page).toHaveTitle(/Anh Minh \| Software Engineer/)
    await expect(page.getByText('Anh Minh · Wilson online', { exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'I build the whole path from idea to reliable software.',
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
    await expect(page.getByRole('heading', { name: 'Selected work, with context.' })).toBeVisible()
    await expect(page.locator('#work article')).toHaveCount(3)
    await expect(page.locator('#work').getByText('The product', { exact: true })).toHaveCount(3)
    await expect(page.locator('#work').getByText('My part', { exact: true })).toHaveCount(3)
    await expect(page.locator('#work').getByText('Across the stack', { exact: true })).toHaveCount(
      3,
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
    await expect(page.getByText('I owned frontend work on the product')).toBeVisible()
    await expect(page.getByText('1,000+ requests per second')).toHaveCount(0)
    await expect(page.getByText('Vulcan internal platform')).toBeVisible()
    await expect(
      page.getByText("I don't publish its URL, screenshots, or operational data."),
    ).toBeVisible()
    const privateProject = page
      .locator('#work article')
      .filter({ hasText: 'Vulcan internal platform' })
    await expect(privateProject.getByRole('link')).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Experience', exact: true })).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Tech Stack', exact: true })).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Education', exact: true })).toHaveCount(0)
    await expect(
      page.getByRole('heading', { name: "The work has changed. The throughline hasn't." }),
    ).toBeVisible()
    await expect(page.locator('#about article')).toHaveCount(5)
    await expect(
      page.getByRole('heading', { name: 'From campus networks to cloud applications.' }),
    ).toBeVisible()
    await expect(page.locator('#journey-ohio-foundations')).toContainText(
      'Assistant Network Engineer',
    )
    await expect(page.locator('#journey-ohio-foundations')).toContainText(
      'Cloud Application Engineer at Designer Brands',
    )
    const pangeaJourney = page.locator('#journey-richmond-office')
    await expect(pangeaJourney).toContainText('remote intern before moving to Richmond')
    await expect(pangeaJourney).toContainText('where I worked in the office')
    await expect(pangeaJourney).toContainText(
      'After moving to Brisbane, I continued working with Pangea Chat remotely',
    )
    await expect(pangeaJourney).toContainText('Richmond, Virginia · In office')
    await expect(pangeaJourney).not.toContainText('worked remotely from Richmond')
    await expect(page.locator('#journey-david-jones')).toContainText(
      'Sales Professional at David Jones Indooroopilly',
    )
    await expect(page.locator('#journey-agentic-delivery')).toContainText(
      'clear specifications, isolated implementation, explicit validation, reviewable evidence',
    )
    await expect(page.getByText(/road[ -]?trips?/i)).toHaveCount(0)
  })

  test('renders the explicit English locale route', async ({ page }) => {
    await page.goto('/en')

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'I build the whole path from idea to reliable software.',
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
    await expect(
      page.locator('#journey-david-jones').getByRole('link', { name: 'Read the field note' }),
    ).toHaveAttribute('href', '/en/notes/shop-floor-systems')
  })

  test('renders the Vietnamese locale route with current fallback content', async ({ page }) => {
    await page.goto('/vi')

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'I build the whole path from idea to reliable software.',
    )
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/vi#about')
    await expect(page.getByRole('link', { name: 'Résumé', exact: true })).toHaveAttribute(
      'href',
      '/vi/resume',
    )
    await expect(
      page.locator('#journey-david-jones').getByRole('link', { name: 'Read the field note' }),
    ).toHaveAttribute('href', '/vi/notes/shop-floor-systems')
  })

  test('exposes Wilson as an alternate name in Person structured data', async ({ page }) => {
    await page.goto('/')

    const jsonText = await page.locator('script[type="application/ld+json"]').textContent()
    expect(jsonText).toBeTruthy()

    const person = JSON.parse(jsonText!) as Record<string, unknown>
    expect(person['@type']).toBe('Person')
    expect(person.name).toBe('Anh Minh')
    expect(person.alternateName).toBe('Wilson')
  })

  test('keeps the responsive layouts within the viewport and anchor targets below the header', async ({
    page,
  }) => {
    for (const width of [375, 768, 1440]) {
      for (const route of ['/', '/resume', '/notes/shop-floor-systems']) {
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

    const journeyImage = page.locator('.journey-parallax-image').first()
    await journeyImage.scrollIntoViewIfNeeded()
    const motionStyles = await journeyImage.evaluate((element) => {
      const styles = getComputedStyle(element)

      return {
        animationName: styles.animationName,
        transform: styles.transform,
      }
    })
    expect(motionStyles.animationName).toBe('none')
  })

  test('loads the portrait without blocking the personal introduction', async ({ page }) => {
    await page.goto('/')

    const portrait = page.getByAltText('Portrait of Anh Minh (Wilson)')
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
        .getByText('My professional story has moved across places and ways of working'),
    ).toBeVisible()
  })

  test('navigates the professional journey and tracks its active chapter', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const timeline = page.getByRole('navigation', { name: 'Professional journey' })
    const firstLink = timeline.locator('a[href="#journey-ohio-foundations"]')
    const richmondLink = timeline.locator('a[href="#journey-richmond-office"]')
    const brisbaneLink = timeline.locator('a[href="#journey-brisbane-transition"]')
    const finalLink = timeline.locator('a[href="#journey-agentic-delivery"]')

    await expect(page.locator('.journey-layout')).toHaveAttribute('data-enhanced', 'true')
    await expect(firstLink).toHaveAttribute('aria-current', 'step')

    await timeline.scrollIntoViewIfNeeded()
    await richmondLink.focus()
    await expect(richmondLink).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/#journey-richmond-office$/)
    await expect.poll(() => richmondLink.getAttribute('aria-current')).toBe('step')

    const richmondTop = await page
      .locator('#journey-richmond-office')
      .evaluate((element) => Math.round(element.getBoundingClientRect().top))
    expect(richmondTop).toBeGreaterThanOrEqual(79)

    await page.locator('#journey-brisbane-transition').scrollIntoViewIfNeeded()
    await expect.poll(() => brisbaneLink.getAttribute('aria-current')).toBe('step')

    await finalLink.click()
    await expect(page).toHaveURL(/#journey-agentic-delivery$/)
    await expect.poll(() => finalLink.getAttribute('aria-current')).toBe('step')
  })

  test('progressively animates journey visuals without making motion a content dependency', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const journeyImage = page.locator('.journey-parallax-image').first()
    await journeyImage.scrollIntoViewIfNeeded()

    const supportsScrollTimeline = await page.evaluate(() =>
      CSS.supports('animation-timeline', 'view()'),
    )

    if (supportsScrollTimeline) {
      const initialTransform = await journeyImage.evaluate(
        (element) => getComputedStyle(element).transform,
      )
      await page.evaluate(() => window.scrollBy({ top: 420 }))
      await page.waitForTimeout(100)
      const laterTransform = await journeyImage.evaluate(
        (element) => getComputedStyle(element).transform,
      )

      expect(initialTransform).not.toBe(laterTransform)
    }

    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const mobileImage = page.locator('.journey-parallax-image').first()
    await mobileImage.scrollIntoViewIfNeeded()
    await expect
      .poll(() => mobileImage.evaluate((element) => getComputedStyle(element).animationName))
      .toBe('none')
  })

  test('uses static journey positioning on short desktop viewports', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 650 })
    await page.goto('/')

    const journeyMedia = page.locator('.journey-media').first()
    await journeyMedia.scrollIntoViewIfNeeded()

    await expect
      .poll(() => journeyMedia.evaluate((element) => getComputedStyle(element).position))
      .toBe('relative')
    await expect
      .poll(() =>
        page
          .getByRole('navigation', { name: 'Professional journey' })
          .evaluate((element) => getComputedStyle(element).position),
      )
      .toBe('relative')
  })

  test('keeps the complete professional journey readable without JavaScript', async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()

    await page.goto('/')
    await expect(page.locator('#about article')).toHaveCount(5)
    await expect(
      page.getByRole('heading', { name: 'From campus networks to cloud applications.' }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Making agentic delivery deliberate.' }),
    ).toBeVisible()
    await expect(
      page.locator('#journey-david-jones').getByRole('link', { name: 'Read the field note' }),
    ).toHaveAttribute('href', '/notes/shop-floor-systems')

    await context.close()
  })

  test('uses a local, decodable placeholder for every journey node', async ({ page, request }) => {
    const placeholderPath = '/images/journey/placeholder.svg'
    const response = await request.get(placeholderPath)
    expect(response.ok(), placeholderPath).toBeTruthy()
    expect(response.headers()['content-type']).toContain('image/svg+xml')
    expect((await response.body()).byteLength).toBeGreaterThan(500)

    await page.goto('/')
    const journeyImages = page.locator('#about img[alt^="Placeholder image"]')
    await expect(journeyImages).toHaveCount(5)

    for (const image of await journeyImages.all()) {
      await expect(image).toHaveAttribute('src', /\/images\/journey\/placeholder\.svg/)
      await image.scrollIntoViewIfNeeded()
      await expect
        .poll(() =>
          image.evaluate((element) =>
            element instanceof HTMLImageElement ? element.naturalWidth : 0,
          ),
        )
        .toBeGreaterThan(0)
    }
  })

  test('renders the shop-floor field note across localized routes', async ({ page }) => {
    const routes = [
      {
        path: '/notes/shop-floor-systems',
        language: 'en',
        canonical: 'https://wilsonle.me/notes/shop-floor-systems',
        backHref: '/#about',
      },
      {
        path: '/en/notes/shop-floor-systems',
        language: 'en',
        canonical: 'https://wilsonle.me/notes/shop-floor-systems',
        backHref: '/en#about',
      },
      {
        path: '/vi/notes/shop-floor-systems',
        language: 'vi',
        canonical: 'https://wilsonle.me/vi/notes/shop-floor-systems',
        backHref: '/vi#about',
      },
    ]

    for (const route of routes) {
      await test.step(route.path, async () => {
        await page.goto(route.path)
        await expect(page.locator('html')).toHaveAttribute('lang', route.language)
        await expect(page.locator('main h1')).toHaveText(
          'What the shop floor is teaching me about software',
        )
        await expect(page.locator('article section h2')).toHaveCount(6)
        await expect(
          page.getByText('Sales Professional at David Jones Indooroopilly'),
        ).toBeVisible()
        await expect(page.getByText('Bringing it back to agentic development')).toBeVisible()
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', route.canonical)
        await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article')
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
          'content',
          'https://wilsonle.me/images/journey/placeholder.svg',
        )
        await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
          'content',
          'https://wilsonle.me/images/journey/placeholder.svg',
        )
        await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
          'href',
          'https://wilsonle.me/en/notes/shop-floor-systems',
        )
        await expect(page.locator('link[rel="alternate"][hreflang="vi"]')).toHaveAttribute(
          'href',
          'https://wilsonle.me/vi/notes/shop-floor-systems',
        )
        await expect(
          page.getByRole('link', { name: 'Back to professional journey' }).first(),
        ).toHaveAttribute('href', route.backHref)
      })
    }
  })

  test('emits no console errors on the professional journey or field note', async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text())
      }
    })

    await page.goto('/')
    await page.locator('#journey-agentic-delivery').scrollIntoViewIfNeeded()
    await page.goto('/notes/shop-floor-systems')
    await page.locator('article section').last().scrollIntoViewIfNeeded()

    expect(consoleErrors).toEqual([])
  })

  test('renders the complete default English résumé route', async ({ page }) => {
    await page.goto('/resume')

    await expect(page).toHaveTitle('Résumé | Anh Minh')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://wilsonle.me/resume',
    )
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Experience, skills, and education.',
    )
    await expect(page.locator('#experience h3')).toHaveCount(7)
    await expect(page.getByText('Pangea Chat', { exact: true })).toBeVisible()
    await expect(page.getByText('DeerX', { exact: true })).toBeVisible()
    await expect(page.locator('#education h3')).toHaveCount(2)
    await expect(page.getByText('University of Southern Queensland', { exact: true })).toBeVisible()
    await expect(
      page.locator('#education').getByText('Denison University', { exact: true }),
    ).toBeVisible()
    await expect(page.locator('#education').getByText('3.52/4.00')).toBeVisible()
    await expect(page.getByText('LangGraph', { exact: true })).toBeVisible()
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
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Experience, skills, and education.',
    )
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/vi#about')
    await expect(page.getByRole('link', { name: 'Résumé', exact: true })).toHaveAttribute(
      'href',
      '/vi/resume',
    )
  })

  test('lists localized résumé and field-note routes in the sitemap', async ({ request }) => {
    const response = await request.get('/sitemap.xml')

    expect(response.ok()).toBeTruthy()
    const sitemap = await response.text()
    expect(sitemap).toContain('<loc>https://wilsonle.me/resume</loc>')
    expect(sitemap).toContain('<loc>https://wilsonle.me/en/resume</loc>')
    expect(sitemap).toContain('<loc>https://wilsonle.me/vi/resume</loc>')
    expect(sitemap).toContain('<loc>https://wilsonle.me/notes/shop-floor-systems</loc>')
    expect(sitemap).toContain('<loc>https://wilsonle.me/en/notes/shop-floor-systems</loc>')
    expect(sitemap).toContain('<loc>https://wilsonle.me/vi/notes/shop-floor-systems</loc>')
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
        { name: 'field-note', path: '/notes/shop-floor-systems' },
      ]) {
        await page.goto(route.path)

        if (route.name === 'home') {
          const storyImages = page.locator('#about img')

          for (const storyImage of await storyImages.all()) {
            await storyImage.scrollIntoViewIfNeeded()
            await expect
              .poll(() =>
                storyImage.evaluate((image) =>
                  image instanceof HTMLImageElement ? image.naturalWidth : 0,
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

        if (route.name === 'field-note') {
          const hero = page.getByAltText('Placeholder image for the shop-floor systems field note')
          await expect
            .poll(() =>
              hero.evaluate((image) =>
                image instanceof HTMLImageElement ? image.naturalWidth : 0,
              ),
            )
            .toBeGreaterThan(0)
        }

        await testInfo.attach(`${route.name}-${viewport.name}`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: 'image/png',
        })
      }
    }
  })
})
