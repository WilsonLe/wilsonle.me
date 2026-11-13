import { expect, test } from '@playwright/test'
import { projectChoices, selectProject } from './helpers/work'

async function leadingSkill(page: import('@playwright/test').Page) {
  return page.locator('.tech-viewport').evaluate((viewport) => {
    const left = viewport.getBoundingClientRect().left
    return [...viewport.querySelectorAll('li')]
      .find((item) => Math.abs(item.getBoundingClientRect().left - left) < 1)
      ?.textContent?.trim()
  })
}

test('streams skill icons and names to the right with hover and focus pausing', async ({
  page,
}) => {
  await page.clock.install()
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
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
  const before = await html.evaluate((element) => element.getBoundingClientRect().x)
  await page.clock.runFor(2000)
  expect(await html.evaluate((element) => element.getBoundingClientRect().x)).toBeGreaterThan(
    before + 20,
  )
  const height = await carousel.evaluate((element) => element.getBoundingClientRect().height)
  await carousel.hover()
  await expect(carousel).toHaveAttribute('data-rotating', 'false')
  const paused = await html.evaluate((element) => element.getBoundingClientRect().x)
  await page.clock.runFor(5000)
  expect(await html.evaluate((element) => element.getBoundingClientRect().x)).toBeCloseTo(paused, 1)
  await page.mouse.move(0, 0)
  await expect(carousel).toHaveAttribute('data-rotating', 'true')
  await page.clock.runFor(1000)
  expect(await html.evaluate((element) => element.getBoundingClientRect().x)).toBeGreaterThan(
    paused + 10,
  )
  await carousel.getByRole('button', { name: 'Next skill' }).focus()
  await expect(carousel).toHaveAttribute('data-rotating', 'false')
  const focused = await html.evaluate((element) => element.getBoundingClientRect().x)
  await page.mouse.move(0, 0)
  await page.clock.runFor(5000)
  expect(await html.evaluate((element) => element.getBoundingClientRect().x)).toBeCloseTo(
    focused,
    1,
  )
  expect(await carousel.evaluate((element) => element.getBoundingClientRect().height)).toBeCloseTo(
    height,
    0,
  )
})

test('skips individual skills and whole sections with accessible controls and reduced motion', async ({
  page,
}) => {
  await page.clock.install()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
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
  await expect.poll(() => leadingSkill(page)).toBe('Apache Kafka')
  await expect(tabs.getByRole('tab', { name: 'Tools & messaging', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  for (const [section, skill] of [
    ['Frontend', 'HTML'],
    ['Backend', 'Express.js'],
    ['Data & AI', 'Redis'],
    ['Cloud & ops', 'AWS'],
    ['Languages', 'Java'],
    ['Tools & messaging', 'Claude Code'],
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
  await page.goto('/')
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
  await mobile.goto('/')
  const viewport = mobile.locator('.tech-viewport')
  const mobileNext = mobile.getByRole('button', { name: 'Next skill' })
  await expect(mobileNext).toHaveCSS('opacity', '0')
  await viewport.tap()
  await expect(mobileNext).toHaveCSS('opacity', '1')
  await mobileNext.tap()
  await expect.poll(() => leadingSkill(mobile)).toBe('CSS')
  await context.close()
})

test('keeps the top work tabs sticky and preserves bottom selection position', async ({ page }) => {
  test.setTimeout(60000)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const viewport of [
    { width: 1440, height: 812 },
    { width: 375, height: 812 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('/')
    const top = page.getByRole('tablist', { name: 'Choose a project', exact: true })
    const bottom = page.getByRole('tablist', { name: 'Choose another project', exact: true })
    for (const project of projectChoices) {
      await selectProject(page, project.id)
      await expect(page.locator('#work').getByRole('tabpanel')).toHaveCount(1)
      await expect(bottom.getByRole('tab', { name: project.name, exact: true })).toHaveAttribute(
        'aria-selected',
        'true',
      )
    }
    await selectProject(page, 'kalibr')
    await page.locator('#kalibr-admin-panels').scrollIntoViewIfNeeded()
    await expect
      .poll(() =>
        top.evaluate((element) => {
          const rect = element.getBoundingClientRect(),
            header = document.querySelector('body > header')!.getBoundingClientRect()
          return rect.top >= header.bottom && rect.top < header.bottom + 20
        }),
      )
      .toBe(true)
    await bottom.scrollIntoViewIfNeeded()
    const before = await bottom.evaluate((element) => element.getBoundingClientRect().top)
    const selected = bottom.getByRole('tab', { name: 'Pangea Chat', exact: true })
    await selected.click()
    await expect(selected).toBeFocused()
    await expect(selected).toHaveAttribute('aria-selected', 'true')
    await expect
      .poll(() => bottom.evaluate((element) => element.getBoundingClientRect().top))
      .toBeCloseTo(before, 0)
    await expect(page).toHaveURL(/#pangea-chat$/)
    await expect(page.getByRole('contentinfo')).not.toContainText('Brisbane')
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
    ).toBeLessThanOrEqual(0)
  }
  await page.setViewportSize({ width: 375, height: 420 })
  await page.goto('/')
  await page.addStyleTag({ content: 'html {font-size:200%}' })
  await selectProject(page, 'localdesign')
  const top = page.getByRole('tablist', { name: 'Choose a project', exact: true })
  const selected = top.getByRole('tab', { name: 'LocalDesign', exact: true })
  await selected.focus()
  for (const key of ['ArrowLeft', 'Home', 'End']) {
    await page.keyboard.press(key)
    await expect
      .poll(() =>
        page.evaluate(() => {
          const rect = document.activeElement!.getBoundingClientRect(),
            header = document.querySelector('body > header')!.getBoundingClientRect()
          return (
            rect.top >= header.bottom + 4 &&
            rect.bottom <= innerHeight - 4 &&
            rect.left >= 0 &&
            rect.right <= innerWidth
          )
        }),
      )
      .toBe(true)
  }
})

test('preserves project and feature deep links, locale URLs and browser history', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const [route, id, target] of [
    ['/#pangea-chat', 'pangea-chat', 'pangea-chat'],
    ['/en#localcut-webmcp', 'localcut', 'localcut-webmcp'],
    ['/vi#vulcan-augmetics-access-control', 'vulcan-augmetics', 'vulcan-augmetics-access-control'],
  ]) {
    await page.goto(route)
    await expect(page.locator(`#work-panel-${id}`)).toBeVisible()
    await expect
      .poll(() =>
        page.locator(`#${target}`).evaluate((element) => element.getBoundingClientRect().top),
      )
      .toBeGreaterThanOrEqual(79)
  }
  await page.goto('/en?source=preview')
  await selectProject(page, 'pangea-chat')
  await page.goBack()
  await expect(page).toHaveURL('/en?source=preview')
  await expect(page.locator('#work-panel-kalibr')).toBeVisible()
  await page.goForward()
  await expect(page.locator('#work-panel-pangea-chat')).toBeVisible()
  await selectProject(page, 'localcut')
  await expect(page).toHaveURL('/en?source=preview#localcut')
  await page.goBack()
  await expect(page.locator('#work-panel-pangea-chat')).toBeVisible()
  await expect(page).toHaveURL('/en?source=preview#pangea-chat')
  await page.goForward()
  await expect(page.locator('#work-panel-localcut')).toBeVisible()
  await expect(page).toHaveURL('/en?source=preview#localcut')
  await page.goto('/en')
  await page.evaluate(() => {
    document.documentElement.dataset.historyDocument = 'same'
  })
  await selectProject(page, 'localcut')
  await page.getByRole('contentinfo').getByRole('link', { name: 'Contact', exact: true }).click()
  await expect(page).toHaveURL('/en#contact')
  await selectProject(page, 'cyobot')
  await page.goBack()
  await expect(page).toHaveURL('/en#contact')
  await expect(page.locator('#work-panel-localcut')).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('data-history-document', 'same')
  await page.goForward()
  await expect(page.locator('#work-panel-cyobot')).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('data-history-document', 'same')
  await page.goto('/#%broken')
  await expect(page.locator('#work-panel-kalibr')).toBeVisible()
})

test('keeps all work and resume-derived technologies available without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  })
  const page = await context.newPage()
  await page.goto('/')
  for (const project of projectChoices) await expect(page.locator(`#${project.id}`)).toBeVisible()
  const carousel = page.locator('.tech-carousel')
  for (const section of await carousel.locator('noscript section').all())
    await expect(section).toBeVisible()
  const visibleTechnologies = (await carousel.locator('noscript p').allTextContents()).flatMap(
    (text) => text.split(' · '),
  )
  expect(new Set(visibleTechnologies).size).toBe(36)
  await page.locator('#work-tab-top-pangea-chat').click()
  await expect(page).toHaveURL(/#pangea-chat$/)
  await expect
    .poll(() =>
      page.locator('#pangea-chat').evaluate((element) => element.getBoundingClientRect().top),
    )
    .toBeGreaterThanOrEqual(79)
  await context.close()
})
