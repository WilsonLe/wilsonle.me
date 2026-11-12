import { expect, test } from '@playwright/test'

test('opens the showcase from selected work and preserves the product destination', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('link', { name: /View the work/ }).click()
  await expect(page).toHaveURL(/\/work\/cyobot$/)
  await expect(page.locator('main h1')).toHaveCount(1)
  await expect(page).toHaveTitle(/CYOBot.*Wilson Le/)
  await expect(page.getByRole('heading', { name: /Two workspaces/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Open student dashboard/ }).first()).toHaveAttribute(
    'href',
    'https://dashboard.cyobot.com',
  )
  await page.getByRole('link', { name: 'All work' }).click()
  await expect(page).toHaveURL(/\/#work$/)
})

test('keeps each locale destination, canonical metadata and sitemap consistent', async ({
  page,
  request,
}) => {
  for (const base of ['', '/en', '/vi']) {
    await page.goto(`${base}/work/cyobot`)
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
      'content',
      'Wilson Le',
    )
    await expect(page.locator('meta[name="twitter:image:alt"]')).toHaveAttribute(
      'content',
      /CYOBot/,
    )
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://wilsonle.me${base === '/en' ? '' : base}/work/cyobot`,
    )
    await expect(page.getByRole('link', { name: 'All work' })).toHaveAttribute(
      'href',
      `${base || '/'}#work`,
    )
    await expect(page.locator('link[hreflang="vi"]')).toHaveAttribute(
      'href',
      'https://wilsonle.me/vi/work/cyobot',
    )
    await page.goto(base || '/')
    await expect(page.getByRole('link', { name: /View the work/ })).toHaveAttribute(
      'href',
      `${base}/work/cyobot`,
    )
  }
  const sitemap = await (await request.get('/sitemap.xml')).text()
  for (const base of ['', '/en', '/vi'])
    expect(sitemap).toContain(`<loc>https://wilsonle.me${base}/work/cyobot</loc>`)
  expect((await request.get('/work/unknown-project')).status()).toBe(404)
  expect((await request.get('/fr/work/cyobot')).status()).toBe(404)
})

test('loads real product images without horizontal overflow on mobile and desktop', async ({
  page,
}) => {
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/work/cyobot')
    const images = page.locator('main img:visible')
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded()
      await expect
        .poll(() => image.evaluate((el) => el instanceof HTMLImageElement && el.naturalWidth))
        .toBeGreaterThan(0)
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
    ).toBeTruthy()
    await page.getByRole('link', { name: 'All work' }).focus()
    await expect(page.getByRole('link', { name: 'All work' })).toBeFocused()
    await page.goto('/')
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
    ).toBeTruthy()
  }
})

test('keeps the story readable with reduced motion and without JavaScript', async ({
  browser,
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/work/cyobot')
  await page.getByRole('heading', { name: /Connect wirelessly/ }).scrollIntoViewIfNeeded()
  expect(
    await page
      .locator('.work-product-image')
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none')
  const context = await browser.newContext({ javaScriptEnabled: false })
  const staticPage = await context.newPage()
  await staticPage.goto('/work/cyobot')
  await expect(staticPage.getByRole('heading', { name: /Create content/ })).toBeVisible()
  await expect(staticPage.getByRole('heading', { name: /Connect wirelessly/ })).toBeVisible()
  const image = staticPage.locator('#instructor').getByRole('img')
  await image.scrollIntoViewIfNeeded()
  await expect
    .poll(() => image.evaluate((el) => el instanceof HTMLImageElement && el.naturalWidth))
    .toBeGreaterThan(0)
  await expect(staticPage.locator('video[controls]')).toHaveCount(1)
  expect(
    await staticPage
      .locator('video')
      .evaluateAll((els) =>
        els.every((el) => el instanceof HTMLVideoElement && el.paused && !el.autoplay),
      ),
  ).toBe(true)
  await context.close()
})

test('keeps the showcase scoped to Wilson’s verified CYOBot contribution', async ({ page }) => {
  await page.goto('/work/cyobot')
  for (const title of ['Student coding portal', 'Instructor admin']) {
    await expect(page.getByRole('heading', { level: 3, name: title, exact: true })).toBeVisible()
  }
  await expect(page.locator('main')).not.toContainText('Pangea')
  await expect(page.locator('main')).not.toContainText('Correction services')
  await expect(page.locator('main')).not.toContainText('Bot services')
  await expect(page.locator('main')).not.toContainText('DevOps')
  await expect(page.getByRole('heading', { name: 'Shared sign-in', exact: true })).toHaveCount(0)
  await expect(page.locator('#student')).toContainText(
    'The coding portal lives in the student dashboard',
  )
  await expect(page.locator('#student').getByRole('listitem')).toHaveCount(3)
  await expect(page.locator('#instructor')).toContainText('workspace chatbot')
  await expect(
    page.getByRole('link', { name: 'Explore the instructor app', exact: true }),
  ).toHaveAttribute('href', 'https://cyobot.com/dashboard/instructor')
})

test('leads contributions with real images and provides playable robot loops', async ({
  page,
  request,
}) => {
  await page.goto('/work/cyobot')
  const contribution = page.getByRole('region', { name: /Two workspaces/ })
  await expect(contribution.getByRole('img')).toHaveCount(2)
  const videos = page.locator('main video')
  await expect(videos).toHaveCount(1)
  for (const video of await videos.all()) {
    await video.scrollIntoViewIfNeeded()
    await expect(video).toHaveAttribute('controls', '')
    await expect(video).toHaveAttribute('loop', '')
    expect(await video.evaluate((el) => (el as HTMLVideoElement).paused)).toBe(true)
    const poster = await video.getAttribute('poster')
    expect((await request.get(poster!)).ok()).toBeTruthy()
    await video.focus()
    await page.keyboard.press('Space')
    await expect
      .poll(() => video.evaluate((el) => (el as HTMLVideoElement).currentTime))
      .toBeGreaterThan(0)
    await page.keyboard.press('Space')
    await expect.poll(() => video.evaluate((el) => (el as HTMLVideoElement).paused)).toBe(true)
  }
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.reload()
  expect(
    await page
      .locator('video')
      .evaluateAll((els) =>
        els.every((el) => el instanceof HTMLVideoElement && el.paused && !el.autoplay),
      ),
  ).toBe(true)
})
