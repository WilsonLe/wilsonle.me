import { expect, test } from '@playwright/test'
import { projectChoices, selectProject } from './helpers/work'

test('rotates tech-stack sections with explicit pause, hover pause and keyboard-safe manual selection', async ({
  page,
}) => {
  await page.clock.install()
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const carousel = page.getByRole('region', { name: 'Tech stack', exact: true })
  await carousel.scrollIntoViewIfNeeded()
  await page.mouse.move(0, 0)
  const tabs = carousel.getByRole('tablist', { name: 'Tech stack sections' })
  await expect(carousel).toHaveAttribute('data-rotating', 'true')
  await expect(tabs.getByRole('tab', { name: 'Frontend', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  const height = await carousel.evaluate((element) => element.getBoundingClientRect().height)
  await page.clock.fastForward(6100)
  expect(await carousel.evaluate((element) => element.getBoundingClientRect().height)).toBeCloseTo(
    height,
    0,
  )
  await expect(tabs.getByRole('tab', { name: 'Backend', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await carousel.getByRole('button', { name: 'Pause automatic tech stack rotation' }).click()
  await page.mouse.move(0, 0)
  await page.clock.fastForward(12000)
  await expect(tabs.getByRole('tab', { name: 'Backend', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await carousel.getByRole('button', { name: 'Start automatic tech stack rotation' }).click()
  await page.mouse.move(0, 0)
  await expect(carousel).toHaveAttribute('data-rotating', 'true')
  await carousel.hover()
  await expect(carousel).toHaveAttribute('data-rotating', 'false')
  await page.clock.fastForward(12000)
  await expect(tabs.getByRole('tab', { name: 'Backend', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await page.mouse.move(0, 0)
  await expect(carousel).toHaveAttribute('data-rotating', 'true')
  await page.clock.fastForward(6100)
  await expect(tabs.getByRole('tab', { name: 'Data & AI', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await tabs.getByRole('tab', { name: 'Languages', exact: true }).focus()
  await page.getByRole('link', { name: 'View work', exact: true }).focus()
  await page.clock.fastForward(12000)
  await expect(tabs.getByRole('tab', { name: 'Data & AI', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await expect(carousel).toHaveAttribute('data-rotating', 'false')
  for (const [category, technology] of [
    ['Frontend', 'React Native'],
    ['Backend', 'FastAPI'],
    ['Data & AI', 'PostgreSQL'],
    ['Cloud & ops', 'AWS'],
    ['Languages', 'TypeScript'],
    ['Tools & messaging', 'Claude Code'],
  ]) {
    await tabs.getByRole('tab', { name: category, exact: true }).click()
    await expect(carousel.getByRole('tabpanel')).toContainText(technology)
    await expect(carousel.getByRole('tabpanel')).toHaveCount(1)
  }
})

test('keeps reduced-motion tech sections still and supports arrow, Home, End and Space selection', async ({
  page,
}) => {
  await page.clock.install()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const carousel = page.getByRole('region', { name: 'Tech stack', exact: true })
  const tabs = carousel.getByRole('tablist')
  const frontend = tabs.getByRole('tab', { name: 'Frontend', exact: true })
  await page.clock.fastForward(18000)
  await expect(frontend).toHaveAttribute('aria-selected', 'true')
  await expect(carousel).toHaveAttribute('data-rotating', 'false')
  await frontend.focus()
  await page.keyboard.press('ArrowRight')
  await expect(tabs.getByRole('tab', { name: 'Backend', exact: true })).toBeFocused()
  await expect(frontend).toHaveAttribute('aria-selected', 'true')
  await page.keyboard.press('Space')
  await expect(tabs.getByRole('tab', { name: 'Backend', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await page.keyboard.press('End')
  await expect(tabs.getByRole('tab', { name: 'Tools & messaging', exact: true })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(carousel.getByRole('tabpanel')).toContainText('Claude Code')
  await expect(carousel.getByRole('tabpanel')).toHaveCSS('animation-name', 'none')
  await page.keyboard.press('Home')
  await page.keyboard.press('Enter')
  await expect(frontend).toHaveAttribute('aria-selected', 'true')
  await page.clock.fastForward(18000)
  await expect(frontend).toHaveAttribute('aria-selected', 'true')
})

test('synchronizes both project selectors and brings new work into view from the bottom', async ({
  page,
}) => {
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
    await expect(top.getByRole('tab')).toHaveCount(6)
    await expect(bottom.getByRole('tab')).toHaveCount(6)
    for (const project of projectChoices) {
      await selectProject(page, project.id)
      await expect(page.locator('#work').getByRole('tabpanel')).toHaveCount(1)
      await expect(bottom.getByRole('tab', { name: project.name, exact: true })).toHaveAttribute(
        'aria-selected',
        'true',
      )
      await expect(page).toHaveURL(new RegExp(`#${project.id}$`))
    }
    // Kalibr's tall admin panel recreates the previous off-screen interaction boundary.
    await selectProject(page, 'kalibr')
    await bottom.getByRole('tab', { name: 'Pangea Chat', exact: true }).click()
    const selected = top.getByRole('tab', { name: 'Pangea Chat', exact: true })
    await expect(selected).toBeFocused()
    await expect(selected).toHaveAttribute('aria-selected', 'true')
    await expect
      .poll(() =>
        top.evaluate((element) => {
          const rect = element.getBoundingClientRect()
          const header = document.querySelector('body > header')!.getBoundingClientRect()
          return rect.top >= header.bottom && rect.bottom <= innerHeight
        }),
      )
      .toBe(true)
    await expect(page.getByRole('contentinfo')).not.toContainText('Brisbane')
    await expect(page.locator('#pangea-chat')).toContainText(
      'Spearheaded agentic software development',
    )
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
    ).toBeLessThanOrEqual(0)
  }
  await page.setViewportSize({ width: 375, height: 420 })
  await page.goto('/')
  await page.addStyleTag({ content: 'html { font-size: 200%; }' })
  await page
    .getByRole('tablist', { name: 'Choose another project', exact: true })
    .getByRole('tab', { name: 'LocalDesign', exact: true })
    .click()
  const selected = page
    .getByRole('tablist', { name: 'Choose a project', exact: true })
    .getByRole('tab', { name: 'LocalDesign', exact: true })
  await expect(selected).toBeFocused()
  async function expectVisibleFocus() {
    await expect
      .poll(() =>
        page.evaluate(() => {
          const rect = document.activeElement!.getBoundingClientRect()
          const header = document.querySelector('body > header')!.getBoundingClientRect()
          return rect.top >= header.bottom + 4 && rect.bottom <= innerHeight - 4
        }),
      )
      .toBe(true)
  }
  await expectVisibleFocus()
  for (const key of ['ArrowLeft', 'Home', 'End']) {
    await page.keyboard.press(key)
    await expectVisibleFocus()
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
  await selectProject(page, 'localcut')
  await expect(page).toHaveURL('/en?source=preview#localcut')
  await page.goBack()
  await expect(page.locator('#work-panel-pangea-chat')).toBeVisible()
  await expect(page).toHaveURL('/en?source=preview#pangea-chat')
  await page.goForward()
  await expect(page.locator('#work-panel-localcut')).toBeVisible()
  await expect(page).toHaveURL('/en?source=preview#localcut')
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
  const visibleTechnologies = (
    await carousel.locator('li:visible, noscript p').allTextContents()
  ).flatMap((text) => text.split(' · '))
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
