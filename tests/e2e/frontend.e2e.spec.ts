import { expect, test } from '@playwright/test'

test.describe('Frontend', () => {
  test('renders the default English homepage', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Anh Minh \| Software Engineer/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Hi, I'm Anh Minh")
    await expect(page.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/#about')
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
