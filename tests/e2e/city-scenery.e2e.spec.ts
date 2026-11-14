import { expect, test } from '@playwright/test'

test('the city animates at rest and freezes its current scenery with reduced motion', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const now = Date.now()
  await page.clock.install({ time: now })
  await page.clock.pauseAt(now + 1000)
  await page.goto('/')

  const city = page.locator('.descent-page')
  await expect(city).toHaveAttribute('data-ready', 'true')
  const canvas = page.locator('.descent-canvas:not(.descent-foreground)')
  const scenery = () =>
    canvas.evaluate((element: HTMLCanvasElement) => {
      // Fingerprint the painted pixels without comparing a screenshot to a platform-specific baseline.
      const { data } = element.getContext('2d')!.getImageData(0, 0, element.width, element.height)
      let hash = 0
      for (let i = 0; i < data.length; i += 4) {
        hash = Math.imul(hash, 31) + ((data[i] << 16) | (data[i + 1] << 8) | data[i + 2])
      }
      return hash | 0
    })
  await page.evaluate(() => document.fonts.ready)
  await page.clock.runFor(500)
  const start = await scenery()
  await page.clock.runFor(1100)
  expect(await scenery()).toBe(start)

  const scroller = page.getByRole('region', { name: /^Interactive portfolio/ })
  const player = await city.getAttribute('data-player-y')
  const scroll = await scroller.evaluate((element) => element.scrollTop)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.clock.runFor(1100)
  const active = await scenery()
  expect(active).not.toBe(start)
  expect(await scroller.evaluate((element) => element.scrollTop)).toBe(scroll)
  await expect(city).toHaveAttribute('data-player-y', player!)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.clock.runFor(1100)
  expect(await scenery()).toBe(active)

  // A scroll should still repaint the scene without advancing the scenery's pose.
  await scroller.evaluate((element) => (element.scrollTop = element.scrollHeight))
  await page.clock.runFor(250)
  const underground = await scenery()
  expect(underground).not.toBe(active)
  await page.clock.runFor(1100)
  expect(await scenery()).toBe(underground)
})
