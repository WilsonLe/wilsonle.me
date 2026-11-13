import { readFile } from 'node:fs/promises'
import { expect, test } from '@playwright/test'
import { projectChoices, selectProject } from './helpers/work'

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
    await expect(page.locator('#work article')).toHaveCount(6)
    await expect(page.locator('#work figure')).toHaveCount(18)
    await expect(page.locator('#work article h3')).toHaveText([
      'Kalibr',
      'Pangea Chat',
      'CYOBot',
      'Vulcan Augmetics',
      'LocalCut',
      'LocalDesign',
    ])
    await expect(page.getByRole('link', { name: 'Open Kalibr' })).toHaveAttribute(
      'href',
      'https://usekalibr.com',
    )
    await expect(page.locator('#pangea-chat h4')).toHaveText([
      'Sentence builder',
      'Pangea Bot',
      'Message interpreter',
      'World-map group chats',
    ])
    await expect(page.locator('#work').getByText('My part', { exact: true })).toHaveCount(4)
    await expect(page.locator('#work').getByText('Features', { exact: true })).toHaveCount(2)
    await expect(
      page.locator('#work').getByText('Frontend + AI services', { exact: true }),
    ).toHaveCount(0)
    await expect(page.locator('#contact').getByText('Contact', { exact: true })).toHaveCount(0)
    await selectProject(page, 'pangea-chat')
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
    await selectProject(page, 'vulcan-augmetics')
    await expect(page.getByRole('heading', { name: 'Vulcan Augmetics', exact: true })).toBeVisible()
    await selectProject(page, 'localcut')
    await expect(page.getByRole('link', { name: 'Open LocalCut' })).toHaveAttribute(
      'href',
      'https://wilsonle.github.io/LocalCut/',
    )
    await selectProject(page, 'localdesign')
    await expect(page.getByRole('link', { name: 'Open LocalDesign' })).toHaveAttribute(
      'href',
      'https://wilsonle.github.io/LocalDesign/',
    )
    for (const project of ['localcut', 'localdesign']) {
      await selectProject(page, project)
      const figure = page.locator(`#${project}-webmcp`)
      await figure.scrollIntoViewIfNeeded()
      await expect(figure.getByRole('heading')).toHaveText(
        project === 'localcut' ? 'Edit with an external agent.' : 'Design with an external agent.',
      )
      await expect(figure.getByRole('link')).toHaveAttribute(
        'href',
        `/work/screenshots/${project}-webmcp.webp`,
      )
      await expect(figure.getByRole('img')).toHaveJSProperty('naturalWidth', 1844)
      await expect(figure.getByRole('img')).toHaveJSProperty('naturalHeight', 934)
    }
    await expect(page.getByRole('heading', { name: 'Experience', exact: true })).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Education', exact: true })).toHaveCount(0)
  })

  test('explains contribution ownership and the observed playtest workflow', async ({ page }) => {
    await page.goto('/#pangea-chat')
    const pangea = page.locator('#pangea-chat')
    await expect(pangea.getByRole('listitem')).toHaveCount(4)
    await expect(pangea).toContainText('Spearheaded agentic software development across the team')
    await expect(pangea).toContainText('15-minute user playtests')
    await expect(pangea).toContainText('feedback-to-spec-to-feature pipeline')
    await expect(pangea).toContainText('I signed off on implementation, testing and deployment')
    await expect(pangea).toContainText('most changes shipped the same day')
    for (const project of ['cyobot', 'vulcan-augmetics']) {
      await expect(page.locator(`#${project}`)).toContainText('Founding software engineer.')
    }
    await expect(page.locator('#cyobot')).toContainText(
      'instructor dashboard and student dashboard',
    )
    await expect(page.locator('#cyobot')).toContainText('internal operational processes')
    await expect(page.locator('#vulcan-augmetics')).toContainText('on-call support system')
    await expect(page.locator('#localcut-asset-index')).toContainText('context and transcripts')
    await expect(page.locator('#localdesign-pages-layers-frames')).toContainText('layer tree')
    for (const project of ['localcut', 'localdesign']) {
      await expect(page.locator(`#${project}`)).toContainText('Fully open source.')
      await expect(page.locator(`#${project}`)).toContainText('entirely in your browser')
    }
    await expect(page.locator('#kalibr-admin-panels')).toContainText('synthetic demo data')
  })

  test('keeps every image static and introduces every selected Work image and text block consistently', async ({
    page,
  }) => {
    async function expectEntrance(root: ReturnType<typeof page.locator>, parts: string[]) {
      await expect(root).toHaveAttribute('data-entered', /^(true|done)$/)
      const states = await root.evaluate(
        (element, selectors) =>
          selectors.map((selector) => {
            const target = selector ? element.querySelector(selector)! : element
            const style = getComputedStyle(target)
            return element.getAttribute('data-entered') === 'done'
              ? style.animationName === 'none' && style.opacity === '1'
              : style.animationName === 'work-enter' && style.animationDuration === '0.65s'
          }),
        parts,
      )
      expect(states).toEqual(parts.map(() => true))
    }
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/')
    await expect(
      page.locator('#work').getByRole('button', { name: /zoom|fit image/i }),
    ).toHaveCount(0)
    await expect(page.locator('#kalibr-analytics-pipeline, #work img[src$=".svg"]')).toHaveCount(0)
    const heading = page.locator('.work-heading')
    await heading.scrollIntoViewIfNeeded()
    await expectEntrance(heading, [''])
    let firstAnimationStarts: string[] = []
    for (const project of projectChoices) {
      await selectProject(page, project.id)
      const article = page.locator(`#${project.id}`)
      const intro = article.locator('.work-intro')
      await intro.scrollIntoViewIfNeeded()
      await expectEntrance(intro, ['header', 'dl'])
      for (const figure of await article.locator('figure').all()) {
        await figure.scrollIntoViewIfNeeded()
        await expectEntrance(figure, ['.work-image-mat', '.work-callout'])
        await figure.hover()
        await figure.getByRole('link').focus()
        const image = figure.getByRole('img')
        await expect(image).toHaveCSS('transform', 'none')
        const geometry = await image.evaluate((element) => ({
          image: element.getBoundingClientRect().width,
          frame: element.closest('.work-shot-view')!.clientWidth,
        }))
        expect(geometry.image).toBeCloseTo(geometry.frame, 0)
      }
      if (project.id === 'kalibr') {
        const mat = article.locator('#kalibr-game-library .work-image-mat')
        await mat.scrollIntoViewIfNeeded()
        await expect(mat).toHaveCSS('opacity', '1')
        await page.evaluate(
          () =>
            new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
        )
        firstAnimationStarts = await mat.evaluate((element) =>
          element.getAnimations().map((animation) => String(animation.startTime)),
        )
      }
    }
    await selectProject(page, 'kalibr')
    await page.evaluate(
      () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
    )
    expect(
      await page
        .locator('#kalibr-game-library .work-image-mat')
        .evaluate((element) =>
          element.getAnimations().map((animation) => String(animation.startTime)),
        ),
    ).toEqual(firstAnimationStarts)
    for (const image of await page.locator('#pangea-chat img').all()) {
      await expect(image).toHaveJSProperty('naturalWidth', 1707)
      await expect(image).toHaveJSProperty('naturalHeight', 960)
    }
    await page.emulateMedia({ reducedMotion: 'reduce' })
    for (const part of ['.work-image-mat', '.work-callout']) {
      await expect(page.locator('#localdesign-webmcp').locator(part)).toHaveCSS(
        'animation-name',
        'none',
      )
    }
    await page.setViewportSize({ width: 375, height: 812 })
    await selectProject(page, 'kalibr')
    await page.locator('#kalibr-admin-panels a').focus()
    await expect(page.locator('#kalibr-admin-panels .work-shot-view')).toHaveCSS(
      'transform',
      'none',
    )
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
    ).toBeLessThanOrEqual(0)
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

  test('keeps keyboard focus visible against its surrounding surfaces', async ({ page }) => {
    await page.goto('/#pangea-chat')
    await page.keyboard.press('Tab')

    const toHex = (rgb: string) =>
      `#${rgb
        .match(/\d+/g)!
        .slice(0, 3)
        .map((value) => Number(value).toString(16).padStart(2, '0'))
        .join('')}`
    const links = [
      page.getByRole('link', { name: 'View work', exact: true }),
      page.getByRole('link', { name: 'Open full screenshot: Sentence builder', exact: true }),
      page.locator('#contact').getByRole('link', { name: /^Email / }),
      page.getByRole('contentinfo').getByRole('link', { name: 'Download résumé', exact: true }),
    ]

    for (const link of links) {
      await link.focus()
      const focus = await link.evaluate((element) => {
        const style = getComputedStyle(element)
        let parent = element.parentElement
        while (parent && getComputedStyle(parent).backgroundColor === 'rgba(0, 0, 0, 0)') {
          parent = parent.parentElement
        }
        return {
          visible: element.matches(':focus-visible'),
          color: style.outlineColor,
          width: Number.parseFloat(style.outlineWidth),
          style: style.outlineStyle,
          backdrop: getComputedStyle(parent || document.body).backgroundColor,
        }
      })
      expect(focus.visible).toBe(true)
      expect(focus.style).toBe('solid')
      expect(focus.width).toBeGreaterThanOrEqual(2)
      if (await link.locator('img').count()) {
        // The image sits inside an overflow clip: its focus cue must be outside that clip.
        const frame = page.locator('.work-shot-view').filter({ has: link })
        await expect(frame).toHaveCSS('outline-style', 'solid')
        await expect
          .poll(() =>
            frame.evaluate((element) => Number.parseFloat(getComputedStyle(element).outlineWidth)),
          )
          .toBeGreaterThanOrEqual(2)
      }
      await expect
        .poll(async () => {
          const outline = await link.evaluate((element) => getComputedStyle(element).outlineColor)
          return contrastRatio(toHex(outline), toHex(focus.backdrop))
        })
        .toBeGreaterThanOrEqual(3)
    }
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
          for (const project of projectChoices) {
            await selectProject(page, project.id)
            for (const image of await page.locator(`#${project.id} img`).all()) {
              await image.scrollIntoViewIfNeeded()
              await expect
                .poll(() =>
                  image.evaluate(
                    (element) => element instanceof HTMLImageElement && element.naturalWidth,
                  ),
                )
                .toBeGreaterThan(0)
            }
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
