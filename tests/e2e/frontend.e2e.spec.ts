import { expect, test } from '@playwright/test'

test.describe('Frontend', () => {
  test('renders the default English homepage', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Anh Minh \| Software Engineer/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Hi, I'm Anh Minh")
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/#about')
    await expect(page.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/#projects')
    await expect(page.getByRole('link', { name: 'Résumé' })).toHaveAttribute('href', '/resume')
    await expect(page.getByRole('heading', { name: 'Selected Projects' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Open Pangea Chat' })).toHaveAttribute(
      'href',
      'https://app.pangea.chat/',
    )
    await expect(page.getByText('Owned frontend work for app.pangea.chat')).toBeVisible()
    await expect(page.getByText('1,000+ requests per second')).toHaveCount(0)
    await expect(page.getByText('Vulcan internal platform')).toBeVisible()
    await expect(
      page.getByText("I don't publish its URL, screenshots, or operational data."),
    ).toBeVisible()
  })

  test('renders the explicit English locale route', async ({ page }) => {
    await page.goto('/en')

    await expect(page.getByRole('heading', { level: 1 })).toContainText("Hi, I'm Anh Minh")
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/en#about')
    await expect(page.getByRole('link', { name: 'Résumé' })).toHaveAttribute('href', '/en/resume')
  })

  test('renders the Vietnamese locale route with current fallback content', async ({ page }) => {
    await page.goto('/vi')

    await expect(page.getByRole('heading', { level: 1 })).toContainText("Hi, I'm Anh Minh")
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/vi#about')
    await expect(page.getByRole('link', { name: 'Résumé' })).toHaveAttribute('href', '/vi/resume')
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
    await expect(page.locator('#education').getByText('Denison University', { exact: true })).toBeVisible()
    await expect(page.locator('#education').getByText('3.52/4.00')).toBeVisible()
    await expect(page.getByText('LangGraph', { exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/#about')
    await expect(page.getByRole('link', { name: 'Résumé' })).toHaveAttribute('href', '/resume')
  })

  test('renders explicit localized résumé routes', async ({ page }) => {
    await page.goto('/en/resume')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://wilsonle.me/resume',
    )
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/en#about')
    await expect(page.getByRole('link', { name: 'Résumé' })).toHaveAttribute('href', '/en/resume')

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
    await expect(page.getByRole('link', { name: 'Résumé' })).toHaveAttribute('href', '/vi/resume')
  })

  test('lists localized résumé routes in the sitemap', async ({ request }) => {
    const response = await request.get('/sitemap.xml')

    expect(response.ok()).toBeTruthy()
    const sitemap = await response.text()
    expect(sitemap).toContain('<loc>https://wilsonle.me/resume</loc>')
    expect(sitemap).toContain('<loc>https://wilsonle.me/en/resume</loc>')
    expect(sitemap).toContain('<loc>https://wilsonle.me/vi/resume</loc>')
  })
})
