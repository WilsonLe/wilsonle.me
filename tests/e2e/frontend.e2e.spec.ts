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
  test('shows six project billboards with complete project dialogs', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle('Wilson Le | Forward Deployed Engineer at Lyra')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Forward Deployed Engineer at Lyra',
    )
    await expect(
      page.getByRole('banner').getByRole('link', { name: 'Work', exact: true }),
    ).toHaveAttribute('href', '#work')
    await expect(page.getByRole('link', { name: 'View work', exact: true })).toHaveAttribute(
      'href',
      '#work',
    )
    const work = page.getByRole('region', { name: 'Work', exact: true })
    await expect(work.getByRole('article')).toHaveCount(6)
    await expect(work.getByRole('img')).toHaveCount(6)
    const figures = [2, 4, 3, 3, 3, 3]
    for (const [index, project] of projectChoices.entries()) {
      const dialog = await selectProject(page, project.id)
      await expect(dialog.locator('figure')).toHaveCount(figures[index])
      await expect(
        dialog.getByRole('heading', { name: index >= 4 ? 'Features' : 'My part', exact: true }),
      ).toBeVisible()
      for (const screenshot of await dialog
        .getByRole('link', { name: /Open full screenshot/ })
        .all()) {
        await screenshot.scrollIntoViewIfNeeded()
        await expect(screenshot).toHaveAttribute('href', /^\/work\/screenshots\//)
        const image = screenshot.getByRole('img')
        await expect
          .poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth))
          .toBeGreaterThan(0)
        await expect(image).toHaveCSS('transform', 'none')
      }
    }
    await expect(
      page.getByRole('dialog').getByRole('link', { name: 'Open LocalDesign' }),
    ).toHaveAttribute('href', 'https://wilsonle.github.io/LocalApps/LocalDesign/')
    await expect(
      page.getByRole('dialog').getByRole('heading', { name: 'Design with an external agent.' }),
    ).toBeVisible()
    await expect(page.locator('#about, #experience, #education, #approach, #now')).toHaveCount(0)
  })

  test('preserves project ownership, public links and full screenshots', async ({ page }) => {
    await page.goto('/')
    const pangea = await selectProject(page, 'pangea-chat')
    await expect(pangea.getByRole('listitem')).toHaveCount(4)
    await expect(pangea).toContainText('Built the frontend and AI assistant.')
    await expect(pangea).toContainText('15-minute user playtests')
    await expect(pangea).toContainText('feedback-to-spec-to-feature pipeline')
    await expect(pangea).toContainText('I signed off on implementation, testing and deployment')
    await expect(pangea.locator('figcaption h3')).toHaveText([
      'Sentence builder',
      'Pangea Bot',
      'Message interpreter',
      'World-map group chats',
    ])
    await expect(pangea.getByRole('link', { name: 'Open Pangea Chat' })).toHaveAttribute(
      'href',
      'https://app.pangea.chat/',
    )
    const cyobot = await selectProject(page, 'cyobot')
    await expect(cyobot).toContainText('Founding software engineer.')
    await expect(cyobot).toContainText('instructor dashboard and student dashboard')
    const vulcan = await selectProject(page, 'vulcan-augmetics')
    await expect(vulcan).toContainText('on-call support system')
    const kalibr = await selectProject(page, 'kalibr')
    await expect(kalibr).toContainText('synthetic demo data')
    await expect(kalibr.getByRole('link', { name: 'Open Kalibr' })).toHaveAttribute(
      'href',
      'https://usekalibr.com',
    )
    const localcut = await selectProject(page, 'localcut')
    await expect(localcut).toContainText('Fully open source.')
    await expect(localcut.getByRole('link', { name: 'Open LocalCut' })).toHaveAttribute(
      'href',
      'https://wilsonle.github.io/LocalApps/LocalCut/',
    )
    const fullImage = localcut.getByRole('link', {
      name: 'Open full screenshot: Edit with an external agent.',
    })
    await fullImage.scrollIntoViewIfNeeded()
    await expect(fullImage).toHaveAttribute('href', '/work/screenshots/localcut-webmcp.webp')
    await expect(fullImage.getByRole('img')).toHaveJSProperty('naturalWidth', 1844)
    await expect(fullImage.getByRole('img')).toHaveJSProperty('naturalHeight', 934)
  })

  test('pauses CYOBot demos and honors reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/#cyobot')
    const dialog = page.getByRole('dialog', { name: 'CYOBot' })
    await expect(dialog).toBeVisible()
    for (const figure of await dialog.locator('figure').all()) {
      const robot = figure.getByRole('img', { name: /^A real CYOBot/ })
      await robot.scrollIntoViewIfNeeded()
      await expect(robot).toHaveAttribute('src', /\.gif$/)
      await figure.getByRole('button', { name: 'Pause robot animation' }).click()
      await expect(robot).toHaveAttribute('src', /\.webp$/)
      await expect(figure.getByText('Paused', { exact: true })).toBeVisible()
      await figure.getByRole('button', { name: 'Play robot animation' }).press('Space')
      await expect(robot).toHaveAttribute('src', /\.gif$/)
    }
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(dialog.getByText('Paused', { exact: true })).toHaveCount(3)
  })

  for (const [route, language] of [
    ['/', 'en'],
    ['/en', 'en'],
    ['/vi', 'vi'],
  ]) {
    test(`serves the portfolio and résumé at ${route}`, async ({ page, request }) => {
      await page.goto(route)
      await expect(page.locator('html')).toHaveAttribute('lang', language)
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
      await expect(page.getByRole('link', { name: /website templates/i })).toHaveCount(0)
      const response = await request.get('/wilson-le-resume.pdf')
      expect(response.ok()).toBe(true)
      expect(response.headers()['content-type']).toContain('application/pdf')
      const link = page.getByRole('link', { name: 'Download résumé', exact: true })
      await expect(link).toHaveAttribute('download', '')
      const download = page.waitForEvent('download')
      await link.click()
      const pdf = await download
      expect(pdf.suggestedFilename()).toBe('wilson-le-resume.pdf')
      expect((await readFile((await pdf.path())!)).subarray(0, 5).toString()).toBe('%PDF-')
      await expect(page).toHaveURL(new RegExp(`${route}$`))
    })
  }

  test('keeps visible keyboard focus throughout the portfolio', async ({ page }) => {
    await page.goto('/?focus-check')
    await page.keyboard.press('Tab')
    const assertFocus = async (link: ReturnType<typeof page.getByRole>) => {
      await link.focus()
      await expect(link).toBeFocused()
      expect(
        await link.evaluate((element) => {
          const style = getComputedStyle(element)
          return (
            element.matches(':focus-visible') &&
            style.outlineStyle === 'solid' &&
            parseFloat(style.outlineWidth) >= 2
          )
        }),
      ).toBe(true)
    }
    await assertFocus(page.getByRole('link', { name: 'View work', exact: true }))
    await assertFocus(page.getByRole('link', { name: 'Download résumé', exact: true }))
    const dialog = await selectProject(page, 'pangea-chat')
    await dialog.getByRole('button', { name: 'Close project' }).press('Tab')
    await assertFocus(dialog.getByRole('link', { name: 'Open full screenshot: Sentence builder' }))
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
})
