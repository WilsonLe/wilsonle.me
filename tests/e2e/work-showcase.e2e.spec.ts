import { expect, test } from '@playwright/test'

test('opens the showcase from selected work and preserves the product destination', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('link', { name: /View the work/ }).click()
  await expect(page).toHaveURL(/\/work\/pangea-chat$/)
  await expect(page.locator('main h1')).toHaveCount(1)
  await expect(page).toHaveTitle(/Pangea Chat.*Wilson Le/)
  await expect(page.getByRole('heading', { name: /From the interface/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /Explore Pangea Chat/ }).first()).toHaveAttribute(
    'href',
    'https://app.pangea.chat/',
  )
  await page.getByRole('link', { name: 'All work' }).click()
  await expect(page).toHaveURL(/\/#work$/)
})

test('keeps each locale destination, canonical metadata and sitemap consistent', async ({
  page,
  request,
}) => {
  for (const base of ['', '/en', '/vi']) {
    await page.goto(`${base}/work/pangea-chat`)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://wilsonle.me${base === '/en' ? '' : base}/work/pangea-chat`,
    )
    await expect(page.getByRole('link', { name: 'All work' })).toHaveAttribute(
      'href',
      `${base || '/'}#work`,
    )
    await expect(page.locator('link[hreflang="vi"]')).toHaveAttribute(
      'href',
      'https://wilsonle.me/vi/work/pangea-chat',
    )
    await page.goto(base || '/')
    await expect(page.getByRole('link', { name: /View the work/ })).toHaveAttribute(
      'href',
      `${base}/work/pangea-chat`,
    )
  }
  const sitemap = await (await request.get('/sitemap.xml')).text()
  for (const base of ['', '/en', '/vi'])
    expect(sitemap).toContain(`<loc>https://wilsonle.me${base}/work/pangea-chat</loc>`)
  expect((await request.get('/work/unknown-project')).status()).toBe(404)
  expect((await request.get('/fr/work/pangea-chat')).status()).toBe(404)
})

test('loads real product images without horizontal overflow on mobile and desktop', async ({
  page,
}) => {
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/work/pangea-chat')
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
  }
})

test('keeps the story readable with reduced motion and without JavaScript', async ({
  browser,
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/work/pangea-chat')
  await page.getByRole('heading', { name: /More ways to use/ }).scrollIntoViewIfNeeded()
  expect(
    await page
      .locator('.work-product-image')
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none')
  const context = await browser.newContext({ javaScriptEnabled: false })
  const staticPage = await context.newPage()
  await staticPage.goto('/work/pangea-chat')
  await expect(
    staticPage.getByRole('heading', { name: /Keep the conversation going/ }),
  ).toBeVisible()
  await expect(staticPage.getByRole('heading', { name: /More ways to use/ })).toBeVisible()
  const image = staticPage.getByAltText(/A shopping roleplay activity/)
  await image.scrollIntoViewIfNeeded()
  await expect
    .poll(() => image.evaluate((el) => el instanceof HTMLImageElement && el.naturalWidth))
    .toBeGreaterThan(0)
  await context.close()
})
