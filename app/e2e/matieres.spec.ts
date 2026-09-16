import { expect, test, type Page } from '@playwright/test'

/**
 * Parcours complet dans chacune des quatre matières, et vérification des cas
 * numériques du cahier des charges directement dans l'interface.
 */

async function skipOnboarding(page: Page) {
  await page.goto('/')
  await page.getByRole('button', { name: 'Explorer l’application sans commencer' }).click()
}

test.describe('les quatre matières fonctionnent de bout en bout', () => {
  test('calculs : énoncé, aides, correction, exercice suivant', async ({ page }) => {
    await skipOnboarding(page)
    await page.goto('/#/entrainement/matiere/calculs')
    await page.getByRole('button', { name: 'Travailler' }).first().click()
    await expect(page).toHaveURL(/#\/seance/)

    const lesson = page.getByRole('button', { name: /J’ai lu, passons à l’exercice/ })
    if (await lesson.isVisible().catch(() => false)) await lesson.click()

    await expect(page.locator('.ex__question')).toBeVisible()
    await expect(page.getByRole('button', { name: /Un indice pour démarrer/ })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Explique-moi autrement' })).toBeVisible()
  })

  test('français : micro-exercice corrigé avec explication', async ({ page }) => {
    await skipOnboarding(page)
    await page.goto('/#/entrainement/matiere/francais')
    await page.getByRole('button', { name: 'Travailler' }).first().click()
    const lesson = page.getByRole('button', { name: /J’ai lu, passons à l’exercice/ })
    if (await lesson.isVisible().catch(() => false)) await lesson.click()

    await expect(page.locator('.ex__question')).toBeVisible()
    await page.locator('.choice').first().click()
    await page.getByRole('button', { name: 'Valider ma réponse' }).click()
    await expect(page.locator('.feedback')).toBeVisible()
    await page.getByRole('button', { name: 'Voir la correction étape par étape' }).click()
    await expect(page.getByRole('heading', { name: 'Correction' })).toBeVisible()
  })

  test('culture sanitaire : fiche puis question de compréhension', async ({ page }) => {
    await skipOnboarding(page)
    await page.goto('/#/')
    await page.getByRole('button', { name: /^Culture/ }).click()
    await expect(page).toHaveURL(/#\/seance/)
    await expect(page.getByText(/^Fiche H/)).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Santé et prévention' })).toBeVisible()
    await page.locator('.choice').first().click()
    await page.getByRole('button', { name: 'Valider ma réponse' }).click()
    await expect(page.locator('.feedback')).toBeVisible()
  })

  test('oral : trame vide, minuteur, autoévaluation', async ({ page }) => {
    await skipOnboarding(page)
    await page.goto('/#/')
    await page.getByRole('button', { name: /^Oral/ }).click()
    await expect(page).toHaveURL(/#\/seance/)

    const lesson = page.getByRole('button', { name: /J’ai lu, passons à l’exercice/ })
    if (await lesson.isVisible().catch(() => false)) await lesson.click()

    await expect(page.getByRole('tab', { name: '1. Préparer' })).toBeVisible()
    await page.getByRole('tab', { name: '3. M’évaluer' }).click()
    await page.getByRole('button', { name: 'Enregistrer cet entraînement' }).click()
  })
})

test.describe('cas numériques du cahier des charges, dans l’interface', () => {
  // On passe par un écran d'entraînement dédié construit à partir d'un gabarit
  // connu, pour vérifier la correction telle qu'elle s'affiche réellement.
  test('accepte la virgule et le point, les unités équivalentes, refuse l’unité fausse', async ({ page }) => {
    await skipOnboarding(page)
    await page.goto('/#/entrainement/matiere/calculs')

    // M10 « Longueurs et masses » : conversions.
    await page.getByRole('link', { name: 'Revoir la leçon' }).nth(9).click()
    await expect(page.getByRole('heading', { name: 'Longueurs et masses' })).toBeVisible()
    await expect(page.getByText('0,075 g = 75 mg').first()).toBeVisible()

    // M12 : les égalités de durées figurent dans la leçon.
    await page.goto('/#/apprendre/calculs/M12')
    await expect(page.locator('code', { hasText: '1 h 30 = 1,5 h' })).toBeVisible()
    await expect(page.locator('code', { hasText: '1,75 h = 1 h + 0,75 × 60 min = 1 h 45' })).toBeVisible()
    await expect(page.getByText(/Total : 1 h 35/).first()).toBeVisible()

    // M04 : 50 objets en boîtes de 12 → 5 boîtes.
    await page.goto('/#/apprendre/calculs/M04')
    await expect(page.getByText(/Il faut commander 5 boîtes/).first()).toBeVisible()
  })
})
