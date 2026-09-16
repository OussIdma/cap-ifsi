import { expect, test, type Page } from '@playwright/test'

/**
 * Régression : les séances successives proposaient les mêmes exercices.
 *
 * Ces tests passent par l'interface réelle, et non par le moteur seul, parce
 * que la correction repose aussi sur le compteur de séances tenu par le
 * magasin d'état — qu'un test de moteur ne peut pas vérifier.
 */

async function onboard(page: Page) {
  await page.goto('/')
  await page.getByLabel('Prénom').fill('Camille')
  await page.getByRole('button', { name: '10 minutes' }).click()
  await page.getByRole('button', { name: 'Commencer ma première séance' }).click()
  await expect(page).toHaveURL(/#\/seance/)
}

/** Texte de la première étape d'exercice de la séance en cours. */
async function premierExercice(page: Page): Promise<string> {
  for (let i = 0; i < 12; i++) {
    const lesson = page.getByRole('button', { name: /J’ai lu, passons à l’exercice/ })
    if (await lesson.isVisible().catch(() => false)) {
      await lesson.click()
      continue
    }
    const enonce = page.locator('.exercise, main').first()
    if (await page.getByLabel('Votre réponse').isVisible().catch(() => false)) {
      return (await enonce.innerText()).replace(/\s+/g, ' ').trim()
    }
    const skip = page.getByRole('button', { name: 'Passer, je connais déjà' })
    if (await skip.isVisible().catch(() => false)) {
      await skip.click()
      continue
    }
    break
  }
  return ''
}

test.describe('variété des exercices', () => {
  test('quitter une séance sans répondre, puis en rouvrir une, change l’exercice', async ({ page }) => {
    await onboard(page)
    const vus: string[] = []

    for (let n = 0; n < 4; n++) {
      const texte = await premierExercice(page)
      expect(texte, 'aucun énoncé lisible').not.toBe('')
      vus.push(texte)

      // Abandon sans avoir validé la moindre réponse, puis nouvelle séance :
      // c'est exactement le cas qui redonnait l'énoncé identique.
      await page.goto('/#/')
      await page.getByRole('button', { name: 'Abandonner cette séance et repartir de zéro' }).click()
      await page.getByRole('button', { name: 'Commencer ma séance' }).click()
      await expect(page).toHaveURL(/#\/seance/)
    }

    const distincts = new Set(vus).size
    expect(
      distincts,
      `${distincts} énoncés distincts sur ${vus.length} ouvertures :\n${vus.map((v) => '  · ' + v.slice(0, 90)).join('\n')}`,
    ).toBe(vus.length)
  })
})
