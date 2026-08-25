import { expect, test } from '@playwright/test'

test.describe('Frontend', () => {
  test('renders the default English homepage', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Anh Minh \| Software Engineer/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Hi, I'm Anh Minh")
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/#about')
    await expect(page.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/#projects')
    await expect(page.getByRole('heading', { name: 'Selected Projects' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Open Pangea Chat' })).toHaveAttribute(
      'href',
      'https://app.pangea.chat/',
    )
    await expect(page.getByText('Vulcan internal platform')).toBeVisible()
    await expect(
      page.getByText("I don't publish its URL, screenshots, or operational data."),
    ).toBeVisible()
  })

  test('renders the explicit English locale route', async ({ page }) => {
    await page.goto('/en')

    await expect(page.getByRole('heading', { level: 1 })).toContainText("Hi, I'm Anh Minh")
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/en#about')
  })

  test('renders the Vietnamese locale route with current fallback content', async ({ page }) => {
    await page.goto('/vi')

    await expect(page.getByRole('heading', { level: 1 })).toContainText("Hi, I'm Anh Minh")
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/vi#about')
  })
})
