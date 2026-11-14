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
  const open = page.getByRole('dialog')
  if (await open.isVisible()) {
    await open.getByRole('button', { name: 'Close project' }).click()
    await expect(open).toBeHidden()
    await expect(page).not.toHaveURL(/#[^#]*(localcut|localdesign|cyobot|vulcan|pangea|kalibr)/)
  }
  await page
    .getByRole('region', { name: 'Work', exact: true })
    .getByRole('link', { name: `View project: ${project.name}`, exact: true })
    .click()
  const dialog = page.getByRole('dialog', { name: project.name, exact: true })
  await expect(dialog).toBeVisible()
  return dialog
}
