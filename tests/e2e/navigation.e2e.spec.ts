import { expect, test } from '@playwright/test'
import { projectChoices } from './helpers/work'

async function installPausedClock(page: import('@playwright/test').Page) {
  await page.clock.install({ time: new Date('2026-11-13T00:00:00Z') })
  // Pause before navigation so a running clock tick cannot race the carousel's rAF loop.
  await page.clock.pauseAt(new Date('2026-11-13T00:00:01Z'))
}

async function leadingSkill(page: import('@playwright/test').Page) {
  return page.locator('.tech-viewport').evaluate((viewport) => {
    const left = viewport.getBoundingClientRect().left
    return [...viewport.querySelectorAll('li')]
      .find((item) => Math.abs(item.getBoundingClientRect().left - left) < 1)
      ?.textContent?.trim()
  })
}

test('streams skills left at a faster steady pace, including while hovered', async ({ page }) => {
  await page.clock.install()
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/#skills')
  const carousel = page.getByRole('region', { name: 'Skills', exact: true })
  await carousel.scrollIntoViewIfNeeded()
  await page.mouse.move(0, 0)
  await expect(carousel).toHaveAttribute('data-rotating', 'true')
  await expect(carousel.getByRole('button')).toHaveCount(2)
  await expect(carousel.getByRole('button', { name: /pause|play/i })).toHaveCount(0)
  const icons = carousel.locator('[data-carousel-copy="1"] img')
  await expect(icons).toHaveCount(36)
  await expect
    .poll(() =>
      icons.evaluateAll((images) =>
        images.every(
          (image) =>
            (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0,
        ),
      ),
    )
    .toBe(true)
  const html = carousel.locator('[data-carousel-copy="1"]').getByText('HTML', { exact: true })
  const position = () => html.evaluate((element) => element.getBoundingClientRect().x)
  let before = await position()
  await page.clock.runFor(2000)
  expect(before - (await position())).toBeGreaterThan(100)
  expect(before - (await position())).toBeLessThan(150)
  const height = await carousel.evaluate((element) => element.getBoundingClientRect().height)
  await carousel.hover()
  await expect(carousel).toHaveAttribute('data-rotating', 'true')
  before = await position()
  await page.clock.runFor(2000)
  expect(before - (await position())).toBeGreaterThan(100)
  expect(before - (await position())).toBeLessThan(150)
  await page.keyboard.press('Tab')
  await carousel.getByRole('button', { name: 'Next skill' }).focus()
  await expect(carousel).toHaveAttribute('data-rotating', 'false')
  before = await position()
  await page.clock.runFor(2000)
  expect(await position()).toBeCloseTo(before, 1)
  expect(await carousel.evaluate((element) => element.getBoundingClientRect().height)).toBeCloseTo(
    height,
    0,
  )
})

test('category tabs scroll quickly, hold for one second and restart the hold on selection', async ({
  page,
}) => {
  await installPausedClock(page)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 885, height: 763 })
  await page.goto('/#skills')
  const carousel = page.getByRole('region', { name: 'Skills', exact: true })
  await carousel.hover()
  await expect(carousel).toHaveAttribute('data-rotating', 'true')
  await page.clock.runFor(200)
  const position = () =>
    carousel.locator('.tech-strip').evaluate((element) => element.getBoundingClientRect().x)
  const before = await position()
  await carousel.getByRole('tab', { name: 'Backend', exact: true }).click()
  expect(await position()).toBeCloseTo(before, 1)
  await page.clock.runFor(100)
  const during = await position()
  expect(during).toBeLessThan(before - 50)
  await page.clock.runFor(200)
  await expect.poll(() => leadingSkill(page)).toBe('Express.js')
  const settled = await position()
  expect(settled).toBeLessThan(during - 10)
  await expect(carousel).toHaveAttribute('data-rotating', 'false')
  await page.clock.runFor(950)
  expect(await position()).toBeCloseTo(settled, 1)
  // Selecting the current category also starts a fresh hold.
  await carousel.getByRole('tab', { name: 'Backend', exact: true }).click()
  await page.clock.runFor(950)
  expect(await position()).toBeCloseTo(settled, 1)
  await page.clock.runFor(400)
  await expect(carousel).toHaveAttribute('data-rotating', 'true')
  const resumed = await position()
  await page.clock.runFor(1000)
  expect(resumed - (await position())).toBeGreaterThan(50)
  expect(resumed - (await position())).toBeLessThan(75)
})

test('chevrons scroll one skill in either direction and hold without stacking animation loops', async ({
  page,
}) => {
  await installPausedClock(page)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/#skills')
  const carousel = page.getByRole('region', { name: 'Skills', exact: true })
  await carousel.hover()
  await expect(carousel).toHaveAttribute('data-rotating', 'true')
  await carousel.getByRole('tab', { name: 'Frontend', exact: true }).click()
  await page.clock.runFor(300)
  const next = carousel.getByRole('button', { name: 'Next skill' })
  const previous = carousel.getByRole('button', { name: 'Previous skill' })
  const position = () =>
    carousel
      .locator('.tech-strip')
      .evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m41)
  let before = await position()
  await next.click()
  expect(await position()).toBeCloseTo(before, 1)
  await page.clock.runFor(100)
  expect(before - (await position())).toBeGreaterThan(30)
  expect(before - (await position())).toBeLessThan(150)
  await page.clock.runFor(200)
  await expect.poll(() => leadingSkill(page)).toBe('CSS')
  const settled = await position()
  await page.clock.runFor(950)
  expect(await position()).toBeCloseTo(settled, 1)
  await expect(carousel).toHaveAttribute('data-rotating', 'false')
  before = await position()
  await previous.click()
  await page.clock.runFor(100)
  expect((await position()) - before).toBeGreaterThan(30)
  await page.clock.runFor(200)
  await expect.poll(() => leadingSkill(page)).toBe('HTML')
  await previous.click()
  await page.clock.runFor(300)
  await expect.poll(() => leadingSkill(page)).toBe('VSCode Copilot Chat')
  await next.click()
  await page.clock.runFor(300)
  await expect.poll(() => leadingSkill(page)).toBe('HTML')
  before = await position()
  for (let click = 0; click < 3; click++) {
    await next.click()
    await page.clock.runFor(50)
  }
  await page.clock.runFor(300)
  await expect.poll(() => leadingSkill(page)).toBe('React Native')
  expect(before - (await position())).toBeCloseTo(3 * 156, 0)
  const repeated = await position()
  await page.clock.runFor(900)
  expect(await position()).toBeCloseTo(repeated, 1)
  await page.clock.runFor(200)
  await expect(carousel).toHaveAttribute('data-rotating', 'true')
  before = await position()
  await page.clock.runFor(1000)
  expect(before - (await position())).toBeGreaterThan(50)
  expect(before - (await position())).toBeLessThan(75)
  await expect(carousel.locator('[aria-live]')).toHaveText('React Native')
})

test('interrupts category browsing and preserves manual selection across resize and motion changes', async ({
  page,
}) => {
  await installPausedClock(page)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/#skills')
  const carousel = page.getByRole('region', { name: 'Skills', exact: true })
  await carousel.hover()
  await expect(carousel).toHaveAttribute('data-rotating', 'true')
  await carousel.getByRole('tab', { name: 'Backend', exact: true }).click()
  await page.clock.runFor(100)
  await carousel.getByRole('tab', { name: 'Data & AI', exact: true }).click()
  await page.setViewportSize({ width: 375, height: 812 })
  await carousel.scrollIntoViewIfNeeded()
  await page.clock.runFor(300)
  await expect.poll(() => leadingSkill(page)).toBe('Redis')
  const strip = carousel.locator('.tech-strip')
  const settled = await strip.evaluate((element) => element.getBoundingClientRect().x)
  await page.clock.runFor(950)
  expect(await strip.evaluate((element) => element.getBoundingClientRect().x)).toBeCloseTo(
    settled,
    1,
  )
  await carousel.getByRole('tab', { name: 'Cloud & ops', exact: true }).click()
  await page.clock.runFor(100)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect.poll(() => leadingSkill(page)).toBe('AWS')
  const reduced = await strip.evaluate((element) => element.getBoundingClientRect().x)
  await page.clock.runFor(2000)
  expect(await strip.evaluate((element) => element.getBoundingClientRect().x)).toBeCloseTo(
    reduced,
    1,
  )
  await expect(carousel).toHaveAttribute('data-rotating', 'false')
})

for (const key of ['Space', 'Enter']) {
  test(`keeps autoplay suspended for keyboard browsing with ${key}`, async ({ page }) => {
    await installPausedClock(page)
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/#skills')
    const carousel = page.getByRole('region', { name: 'Skills', exact: true })
    await carousel.hover()
    await expect(carousel).toHaveAttribute('data-rotating', 'true')
    await carousel.getByRole('tab', { name: 'Frontend', exact: true }).click()
    await page.clock.runFor(300)
    const next = carousel.getByRole('button', { name: 'Next skill', exact: true })
    await next.click()
    await expect(carousel).toHaveAttribute('data-rotating', 'false')
    await page.clock.runFor(100)
    await next.press(key)
    await page.clock.runFor(300)
    await expect(carousel).toHaveAttribute('data-rotating', 'false')
    await expect.poll(() => leadingSkill(page)).toBe('React')
    const strip = carousel.locator('.tech-strip')
    const before = await strip.evaluate((element) => element.getBoundingClientRect().x)
    await page.clock.runFor(2000)
    expect(await strip.evaluate((element) => element.getBoundingClientRect().x)).toBeCloseTo(
      before,
      1,
    )
    // A later pointer action switches back even though the button still has focus.
    await next.click()
    await expect(carousel).toHaveAttribute('data-rotating', 'false')
    await page.clock.runFor(200)
    expect(await strip.evaluate((element) => element.getBoundingClientRect().x)).toBeLessThan(
      before - 30,
    )
    await page.clock.runFor(1200)
    await expect(carousel).toHaveAttribute('data-rotating', 'true')
  })
}

test('animates the active section during streaming, wraps the loop and follows resized labels', async ({
  page,
}) => {
  await page.clock.install()
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 885, height: 763 })
  await page.goto('/#skills')
  const carousel = page.getByRole('region', { name: 'Skills', exact: true })
  const tabs = carousel.getByRole('tablist', { name: 'Skill sections' })
  const frontend = tabs.getByRole('tab', { name: 'Frontend', exact: true })
  const backend = tabs.getByRole('tab', { name: 'Backend', exact: true })
  const indicator = tabs.locator('.section-tab-indicator')
  await frontend.click()
  await page.clock.runFor(1400)
  await page.clock.runFor(15000)
  await expect(frontend).toHaveAttribute('aria-selected', 'true')
  const start = await indicator.boundingBox()
  for (
    let frame = 0;
    frame < 60 && (await backend.getAttribute('aria-selected')) !== 'true';
    frame++
  ) {
    await page.clock.runFor(16)
  }
  await expect(backend).toHaveAttribute('aria-selected', 'true')
  const target = await backend.boundingBox()
  await expect
    .poll(async () => (await indicator.boundingBox())!.x, { intervals: [20] })
    .toBeGreaterThan(start!.x + 1)
  expect((await indicator.boundingBox())!.x).toBeLessThan(target!.x - 1)
  await expect.poll(async () => (await indicator.boundingBox())!.x).toBeCloseTo(target!.x, 0)
  await expect(carousel.locator('[aria-live]')).toHaveText('HTML')

  const tools = tabs.getByRole('tab', { name: 'AI tools', exact: true })
  await tools.click()
  await page.clock.runFor(1400)
  await page.clock.runFor(11000)
  await expect(frontend).toHaveAttribute('aria-selected', 'true')
  expect(
    await carousel.locator('.tech-viewport').evaluate((viewport) => {
      const bounds = viewport.getBoundingClientRect()
      const cards = [...viewport.querySelectorAll('li')]
        .map((item) => item.getBoundingClientRect())
        .filter((rect) => rect.right > bounds.left && rect.left < bounds.right)
      return (
        cards[0].left <= bounds.left + 12 &&
        cards.at(-1)!.right >= bounds.right - 12 &&
        cards.every((rect, index) => index === 0 || rect.left - cards[index - 1].right <= 13)
      )
    }),
  ).toBe(true)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [375, 885, 1440]) {
    await page.setViewportSize({ width, height: 812 })
    await tools.click()
    const selected = await tools.boundingBox()
    await expect.poll(async () => (await indicator.boundingBox())!.x).toBeCloseTo(selected!.x, 0)
    await expect
      .poll(async () => (await indicator.boundingBox())!.y)
      .toBeCloseTo(selected!.y + selected!.height - 2, 0)
    await expect
      .poll(async () => (await indicator.boundingBox())!.width)
      .toBeCloseTo(selected!.width, 0)
    expect(
      await indicator.evaluate((element) =>
        parseFloat(getComputedStyle(element).transitionDuration),
      ),
    ).toBeLessThan(0.001)
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
    ).toBeLessThanOrEqual(0)
  }
})

test('suspends motion offscreen and while the document is hidden, then resumes without a jump', async ({
  page,
}) => {
  await page.clock.install()
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/#skills')
  const carousel = page.getByRole('region', { name: 'Skills', exact: true })
  const position = () =>
    carousel
      .locator('.tech-strip')
      .evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m41)
  await carousel.scrollIntoViewIfNeeded()
  await expect(carousel).toHaveAttribute('data-rotating', 'true')
  await page.getByRole('heading', { level: 1 }).scrollIntoViewIfNeeded()
  await expect(carousel).toHaveAttribute('data-rotating', 'false')
  let before = await position()
  await page.clock.runFor(2000)
  expect(await position()).toBeCloseTo(before, 1)
  await carousel.scrollIntoViewIfNeeded()
  await expect(carousel).toHaveAttribute('data-rotating', 'true')
  // Drive the browser visibility event deterministically; OS tab switching is not simulated.
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect(carousel).toHaveAttribute('data-rotating', 'false')
  before = await position()
  await page.clock.runFor(2000)
  expect(await position()).toBeCloseTo(before, 1)
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: false })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect(carousel).toHaveAttribute('data-rotating', 'true')
  await page.clock.runFor(1000)
  expect(before - (await position())).toBeGreaterThan(50)
  expect(before - (await position())).toBeLessThan(75)
})

test('skips individual skills and whole sections with accessible controls and reduced motion', async ({
  page,
}) => {
  await page.clock.install()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#skills')
  const carousel = page.getByRole('region', { name: 'Skills', exact: true })
  const tabs = carousel.getByRole('tablist', { name: 'Skill sections' })
  await carousel.hover()
  await expect.poll(() => leadingSkill(page)).toBe('HTML')
  await page.clock.fastForward(18000)
  await expect(carousel).toHaveAttribute('data-rotating', 'false')
  await expect.poll(() => leadingSkill(page)).toBe('HTML')
  await carousel.getByRole('button', { name: 'Next skill' }).click()
  await expect.poll(() => leadingSkill(page)).toBe('CSS')
  await carousel.getByRole('button', { name: 'Previous skill' }).click()
  await expect.poll(() => leadingSkill(page)).toBe('HTML')
  await carousel.getByRole('button', { name: 'Previous skill' }).click()
  await expect.poll(() => leadingSkill(page)).toBe('VSCode Copilot Chat')
  await expect(tabs.getByRole('tab', { name: 'AI tools', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  for (const [section, skill] of [
    ['Frontend', 'HTML'],
    ['Backend', 'Express.js'],
    ['Data & AI', 'Redis'],
    ['Cloud & ops', 'AWS'],
    ['Languages', 'Java'],
    ['AI tools', 'Claude Code'],
  ]) {
    await tabs.getByRole('tab', { name: section, exact: true }).click()
    await expect.poll(() => leadingSkill(page)).toBe(skill)
  }
  await tabs.getByRole('tab', { name: 'Frontend', exact: true }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(tabs.getByRole('tab', { name: 'Backend', exact: true })).toBeFocused()
  await page.keyboard.press('Space')
  await expect.poll(() => leadingSkill(page)).toBe('Express.js')
  await page.keyboard.press('End')
  await page.keyboard.press('Enter')
  await expect.poll(() => leadingSkill(page)).toBe('Claude Code')
  await page.keyboard.press('Home')
  await page.keyboard.press('Enter')
  await expect.poll(() => leadingSkill(page)).toBe('HTML')
  await page.clock.fastForward(18000)
  await expect.poll(() => leadingSkill(page)).toBe('HTML')
})

test('reveals shaded edge chevrons on hover, keyboard focus or a touch tap', async ({
  page,
  browser,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#skills')
  const carousel = page.getByRole('region', { name: 'Skills', exact: true })
  const previous = carousel.getByRole('button', { name: 'Previous skill' })
  const next = carousel.getByRole('button', { name: 'Next skill' })
  await carousel.scrollIntoViewIfNeeded()
  await page.mouse.move(0, 0)
  await expect(previous).toHaveCSS('opacity', '0')
  await carousel.hover()
  await expect(previous).toHaveCSS('opacity', '1')
  await expect(next).toHaveCSS('opacity', '1')
  const bounds = await carousel.locator('.tech-viewport').boundingBox()
  const left = await previous.boundingBox(),
    right = await next.boundingBox()
  expect(left!.x).toBeCloseTo(bounds!.x, 0)
  expect(right!.x + right!.width).toBeCloseTo(bounds!.x + bounds!.width, 0)
  expect(left!.width).toBeGreaterThanOrEqual(44)
  await page.mouse.move(0, 0)
  await expect(previous).toHaveCSS('opacity', '0')
  await page.keyboard.press('Tab')
  await previous.focus()
  await expect(previous).toHaveCSS('opacity', '1')
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 375, height: 812 },
    reducedMotion: 'reduce',
  })
  const mobile = await context.newPage()
  await mobile.goto('/#skills')
  const viewport = mobile.locator('.tech-viewport')
  const mobileNext = mobile.getByRole('button', { name: 'Next skill' })
  await expect(mobileNext).toHaveCSS('opacity', '0')
  await viewport.tap()
  await expect(mobileNext).toHaveCSS('opacity', '1')
  await mobileNext.tap()
  await expect.poll(() => leadingSkill(mobile)).toBe('CSS')
  await mobile.clock.install()
  await mobile.emulateMedia({ reducedMotion: 'no-preference' })
  const mobileCarousel = mobile.getByRole('region', { name: 'Skills', exact: true })
  await expect(mobileCarousel).toHaveAttribute('data-rotating', 'true')
  await viewport.tap()
  await expect(mobileCarousel).toHaveAttribute('data-rotating', 'true')
  const before = await viewport
    .locator('.tech-strip')
    .evaluate((element) => element.getBoundingClientRect().x)
  await mobileNext.tap()
  await mobile.clock.runFor(300)
  expect(
    before -
      (await viewport
        .locator('.tech-strip')
        .evaluate((element) => element.getBoundingClientRect().x)),
  ).toBeGreaterThan(90)
  const settled = await viewport
    .locator('.tech-strip')
    .evaluate((element) => element.getBoundingClientRect().x)
  await mobile.clock.runFor(900)
  expect(
    await viewport.locator('.tech-strip').evaluate((element) => element.getBoundingClientRect().x),
  ).toBeCloseTo(settled, 1)
  await expect(mobileCarousel).toHaveAttribute('data-rotating', 'false')
  await mobile.clock.runFor(200)
  await expect(mobileCarousel).toHaveAttribute('data-rotating', 'true')
  await context.close()
})

test('animates navigation and lands beside the selected section', async ({ page }) => {
  await page.goto('/')
  const city = page.locator('.descent-page')
  const scroller = page.getByRole('region', { name: /^Interactive portfolio/ })
  await expect(city).toHaveAttribute('data-ready', 'true')
  await expect(city).toHaveAttribute('data-zone', 'skyline')
  const initialY = await city.getAttribute('data-player-y')
  const samples = scroller.evaluate(
    (element) =>
      new Promise<number[]>((resolve) => {
        const scrolls: number[] = []
        const start = performance.now()
        function frame(now: number) {
          scrolls.push(element.scrollTop)
          if (now - start > 1050) resolve(scrolls)
          else requestAnimationFrame(frame)
        }
        requestAnimationFrame(frame)
      }),
  )
  await page.getByRole('link', { name: 'View work', exact: true }).click()
  const scrolls = [...new Set(await samples)]
  expect(scrolls.at(0)).toBe(0)
  expect(scrolls.at(-1)).toBeGreaterThan(200)
  expect(scrolls.length).toBeGreaterThan(7)
  expect(scrolls).toEqual([...scrolls].sort((a, b) => a - b))
  await expect(page.getByRole('heading', { name: 'Work', exact: true })).toBeFocused()
  await expect(city).toHaveAttribute('data-nearby', 'kalibr')
  await expect(city).not.toHaveAttribute('data-player-y', initialY!)
  await page.getByRole('banner').getByRole('link', { name: 'Contact', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Contact', exact: true })).toBeFocused()
  await expect(city).toHaveAttribute('data-zone', 'reactor')
  await page.getByRole('link', { name: 'Back to top', exact: true }).click()
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
  await expect.poll(() => scroller.evaluate((element) => element.scrollTop)).toBe(0)
  await expect(city).toHaveAttribute('data-player-y', initialY!)
})

test('E opens a nearby billboard only and restores focus after Escape', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const controls = page.getByLabel('City controls')
  await expect(controls.getByText('View project')).toHaveCount(0)
  await page.keyboard.press('e')
  await expect(page.getByRole('dialog')).toBeHidden()
  await page.getByRole('link', { name: 'View work', exact: true }).click()
  const prompt = page.getByRole('link', { name: 'View project: Kalibr (E)', exact: true })
  await expect(prompt).toBeVisible()
  await page.keyboard.press('e')
  await expect(page.getByRole('dialog', { name: 'Kalibr', exact: true })).toBeVisible()
  await expect(page).toHaveURL(/#kalibr$/)
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(page).toHaveURL(/#work$/)
  await expect(prompt).toBeFocused()
})

test('uses the keyboard to jump and activate the jetpack', async ({ page }) => {
  await page.goto('/')
  const city = page.locator('.descent-page')
  await expect(city).toHaveAttribute('data-ready', 'true')
  const initialY = Number(await city.getAttribute('data-player-y'))
  await page.keyboard.press('w')
  await page.keyboard.down('w')
  await expect(city).toHaveAttribute('data-jetpack', 'true')
  await expect
    .poll(async () => Number(await city.getAttribute('data-player-y')))
    .toBeLessThan(initialY - 75)
  await page.keyboard.up('w')
  await expect(city).toHaveAttribute('data-jetpack', 'false')
})

test('keeps keyboard scrolling available from focused portfolio links', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#contact')
  await expect(page.getByRole('heading', { name: 'Contact', exact: true })).toBeFocused()
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  const booking = page.getByRole('link', { name: 'Book a 30-minute call' })
  await expect(booking).toBeFocused()
  const city = page.locator('.descent-page')
  const playerY = await city.getAttribute('data-player-y')
  const scroller = page.getByRole('region', { name: /^Interactive portfolio/ })
  const initialScroll = await scroller.evaluate((element) => element.scrollTop)
  await page.keyboard.press('ArrowUp')
  await expect
    .poll(() => scroller.evaluate((element) => element.scrollTop))
    .toBeLessThan(initialScroll)
  await expect(city).toHaveAttribute('data-player-y', playerY!)
  await expect(booking).toBeFocused()
})

test('supports touch movement, a held jetpack and a tap-to-open billboard', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: 'reduce',
  })
  try {
    const page = await context.newPage()
    await page.goto('/')
    const city = page.locator('.descent-page')
    const guide = page.getByLabel('City controls')
    await expect(city).toHaveAttribute('data-ready', 'true')
    const x = Number(await city.getAttribute('data-player-x'))
    await guide.getByRole('button', { name: 'Move left', exact: true }).tap()
    await expect
      .poll(async () => Number(await city.getAttribute('data-player-x')))
      .toBeLessThan(x - 9)
    const up = guide.getByRole('button', { name: 'Jump or activate jetpack', exact: true })
    await up.tap()
    const bounds = (await up.boundingBox())!
    const cdp = await context.newCDPSession(page)
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 }],
    })
    await expect(city).toHaveAttribute('data-jetpack', 'true')
    const y = Number(await city.getAttribute('data-player-y'))
    await expect
      .poll(async () => Number(await city.getAttribute('data-player-y')))
      .toBeLessThan(y - 75)
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    await expect(city).toHaveAttribute('data-jetpack', 'false')
    await page.getByRole('banner').getByRole('link', { name: 'Work', exact: true }).tap()
    const prompt = page.getByRole('link', { name: 'View project: Kalibr (E)', exact: true })
    await expect(prompt).toBeVisible()
    await expect(prompt.getByText('E', { exact: true })).toBeHidden()
    await prompt.tap()
    const dialog = page.getByRole('dialog', { name: 'Kalibr', exact: true })
    await expect(dialog).toBeVisible()
    await dialog.getByRole('button', { name: 'Close project' }).tap()
    await expect(dialog).toBeHidden()
    const billboard = page
      .getByRole('region', { name: 'Work', exact: true })
      .getByRole('link', { name: 'View project: Kalibr', exact: true })
    await billboard.tap()
    await expect(dialog).toBeVisible()
  } finally {
    await context.close()
  }
})

test('preserves project and feature deep links, locale URLs and browser history', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const [route, name, target] of [
    ['/#pangea-chat', 'Pangea Chat', ''],
    ['/en#localcut-webmcp', 'LocalCut', 'localcut-webmcp'],
    ['/vi#vulcan-augmetics-access-control', 'Vulcan Augmetics', 'vulcan-augmetics-access-control'],
  ]) {
    await page.goto(route)
    const dialog = page.getByRole('dialog', { name, exact: true })
    await expect(dialog).toBeVisible()
    if (target) {
      await expect
        .poll(() =>
          dialog.locator('#descent-' + target).evaluate((element) => {
            const top = element.getBoundingClientRect().top
            const box = element.closest('dialog')!.getBoundingClientRect()
            return top >= box.top && top < box.bottom
          }),
        )
        .toBe(true)
    }
  }
  await page.goto('/en?source=preview')
  const project = page.getByRole('link', { name: 'View project: Pangea Chat', exact: true })
  const dialog = page.getByRole('dialog', { name: 'Pangea Chat', exact: true })
  await project.click()
  await expect(page).toHaveURL('/en?source=preview#pangea-chat')
  await page.goBack()
  await expect(page).toHaveURL('/en?source=preview')
  await expect(dialog).toBeHidden()
  await page.goForward()
  await expect(dialog).toBeVisible()
  await expect(page).toHaveURL('/en?source=preview#pangea-chat')
  await page.goto('/#%broken')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('dialog')).toBeHidden()
})

test('keeps the mobile dialog close control visible on a deep-linked screenshot', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/en?source=portfolio#localcut-webmcp')
  const dialog = page.getByRole('dialog', { name: 'LocalCut', exact: true })
  await expect(
    dialog.getByRole('heading', { name: 'Edit with an external agent.' }),
  ).toBeInViewport()
  const close = dialog.getByRole('button', { name: 'Close project' })
  await expect(close).toBeInViewport({ ratio: 1 })
  await expect(close).toBeFocused()
  await close.click()
  await expect(dialog).toBeHidden()
  await expect(page).toHaveURL('/en?source=portfolio#work')
})

test('keeps work, technologies and contact available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  })
  try {
    const page = await context.newPage()
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    await expect(page.locator('.descent-page')).toBeHidden()
    for (const project of projectChoices) await expect(page.locator('#' + project.id)).toBeVisible()
    const technologies = (
      await page.locator('[id^="skills-fallback-"] p').allTextContents()
    ).flatMap((text) => text.split(' · '))
    expect(new Set(technologies).size).toBe(36)
    const work = page.getByRole('region', { name: 'Work', exact: true })
    await work.getByRole('link', { name: 'Pangea Chat', exact: true }).click()
    await expect(page).toHaveURL(/#pangea-chat$/)
    await expect(page.locator('#pangea-chat')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Download résumé' }).first()).toHaveAttribute(
      'href',
      '/wilson-le-resume.pdf',
    )
    await expect(
      page.getByRole('region', { name: 'Get In Touch' }).getByRole('link', { name: /^Email/ }),
    ).toHaveAttribute('href', /^mailto:/)
  } finally {
    await context.close()
  }
})
