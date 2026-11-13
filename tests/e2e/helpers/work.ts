import { expect, type Page } from '@playwright/test'

export const projectChoices = [
  { id: 'kalibr', name: 'Kalibr' },
  { id: 'pangea-chat', name: 'Pangea Chat' },
  { id: 'cyobot', name: 'CYOBot' },
  { id: 'vulcan-augmetics', name: 'Vulcan Augmetics' },
  { id: 'localcut', name: 'LocalCut' },
  { id: 'localdesign', name: 'LocalDesign' },
]

export async function selectProject(page: Page, id: string) {
  const project = projectChoices.find((item) => item.id === id)!
  const tab = page
    .getByRole('tablist', { name: 'Choose a project', exact: true })
    .getByRole('tab', { name: project.name, exact: true })
  await tab.click()
  await expect(tab).toHaveAttribute('aria-selected', 'true')
  await expect(page.locator(`#work-panel-${id}`)).toBeVisible()
}
