import { expect, test } from '@playwright/test'

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
    await expect(page.getByRole('heading', { name: 'Selected Projects' })).toBeVisible()
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
    await expect(page.getByRole('heading', { name: 'Experience', exact: true })).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Tech Stack', exact: true })).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Education', exact: true })).toHaveCount(0)
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

  test('lists localized résumé routes in the sitemap', async ({ request }) => {
    const response = await request.get('/sitemap.xml')

    expect(response.ok()).toBeTruthy()
    const sitemap = await response.text()
    expect(sitemap).toContain('<loc>https://wilsonle.me/resume</loc>')
    expect(sitemap).toContain('<loc>https://wilsonle.me/en/resume</loc>')
    expect(sitemap).toContain('<loc>https://wilsonle.me/vi/resume</loc>')
  })
})
