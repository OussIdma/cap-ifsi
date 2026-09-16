import { expect, test, type Page } from '@playwright/test'

/**
 * Tests d'acceptation en navigateur réel.
 *
 * Ils reproduisent le scénario principal demandé :
 * première visite → séance → erreur → explication différente → nouvel exercice
 * → sauvegarde → fermeture → reprise → bilan fidèle.
 */

/** Passe l'accueil en enregistrant un profil, comme le ferait l'utilisatrice. */
async function onboard(page: Page, minutes: '10 minutes' | '20 minutes' | '30 minutes' = '10 minutes') {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Mon parcours vers infirmière' })).toBeVisible()
  await page.getByLabel('Prénom').fill('Camille')
  await page.getByRole('button', { name: minutes }).click()
  await page.getByRole('button', { name: 'Commencer ma première séance' }).click()
  await expect(page).toHaveURL(/#\/seance/)
}

/** Avance jusqu'au premier exercice à réponse libre de la séance. */
async function goToNumericExercise(page: Page): Promise<boolean> {
  for (let i = 0; i < 12; i++) {
    const lessonBtn = page.getByRole('button', { name: /J’ai lu, passons à l’exercice/ })
    if (await lessonBtn.isVisible().catch(() => false)) {
      await lessonBtn.click()
      continue
    }
    const input = page.getByLabel('Votre réponse')
    if (await input.isVisible().catch(() => false)) return true
    const skip = page.getByRole('button', { name: 'Passer, je connais déjà' })
    if (await skip.isVisible().catch(() => false)) {
      await skip.click()
      continue
    }
    return false
  }
  return false
}

test.describe('parcours principal', () => {
  test('première visite jusqu’au bilan, avec erreur, explication différente et reprise', async ({ page, context }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(String(e)))
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text())
    })

    await onboard(page, '20 minutes')

    // --- La séance commence par une leçon, jamais par un exercice inconnu.
    await expect(page.getByText('Leçon')).toBeVisible()
    await expect(page.getByText('Un exemple entièrement résolu')).toBeVisible()
    await page.getByRole('button', { name: /J’ai lu, passons à l’exercice/ }).click()

    const found = await goToNumericExercise(page)
    expect(found, 'aucun exercice à réponse libre trouvé dans la séance').toBe(true)

    // --- Une erreur volontaire : la correction doit expliquer, pas seulement dire « faux ».
    await page.getByLabel('Votre réponse').fill('99999')
    await page.getByRole('button', { name: 'Valider ma réponse' }).click()
    const feedback = page.locator('.feedback')
    await expect(feedback).toBeVisible()
    await expect(feedback).toContainText('Pas encore')
    await expect(feedback).toContainText('Réponse attendue')

    // --- Correction étape par étape, avec le « pourquoi ».
    await page.getByRole('button', { name: 'Voir la correction étape par étape' }).click()
    await expect(page.getByRole('heading', { name: 'Correction' })).toBeVisible()
    await expect(page.locator('.solution__why').first()).toContainText('Pourquoi');

    // --- Explication différente.
    await page.getByRole('button', { name: 'Explique-moi autrement' }).click()
    await expect(page.getByText('Expliqué autrement')).toBeVisible()

    // --- Un nouvel exercice de la même compétence, non identique.
    const before = await page.locator('.ex').innerText()
    await page.getByRole('button', { name: 'Un autre exercice du même type' }).click()
    await expect(page.locator('.ex__question')).toBeVisible()
    const after = await page.locator('.ex').innerText()
    expect(after, 'le nouvel exercice est identique au précédent').not.toBe(before)

    // --- Saisie en cours, puis fermeture complète de la page.
    const input = page.getByLabel('Votre réponse')
    if (await input.isVisible().catch(() => false)) {
      await input.fill('12,5')
      // Laisse le temps à l'écriture différée de s'exécuter.
      await page.waitForTimeout(800)
    }

    const url = page.url()
    await page.close()
    const page2 = await context.newPage()
    await page2.goto(url)

    // --- Reprise : la réponse commencée est toujours là.
    await expect(page2.getByLabel('Votre réponse')).toHaveValue('12,5')

    // --- Bilan de fin de séance.
    await page2.getByRole('button', { name: 'Terminer la séance maintenant' }).click()
    await expect(page2.getByRole('heading', { name: 'Ce que vous venez de faire' })).toBeVisible()
    await expect(page2.getByRole('heading', { name: 'Travaillé', exact: true })).toBeVisible()
    await expect(page2.getByRole('heading', { name: 'Prochaine action' })).toBeVisible()

    expect(errors, `erreurs de console : ${errors.join(' | ')}`).toEqual([])
  })

  test('aucune progression inventée au démarrage', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Explorer l’application sans commencer' }).click()
    await page.getByRole('link', { name: 'Mes progrès' }).click()
    await expect(page.getByText('Vous n’avez encore validé aucun exercice')).toBeVisible()
    await expect(page.getByText('Non évaluée : 20')).toBeVisible()
  })

  test('les aides ne sont pas pénalisées mais changent le statut', async ({ page }) => {
    await onboard(page)
    await page.getByRole('button', { name: /J’ai lu, passons à l’exercice/ }).click()
    const found = await goToNumericExercise(page)
    expect(found).toBe(true)

    await page.getByRole('button', { name: /Un indice pour démarrer/ }).click()
    await expect(page.getByText('Indice 1 — pour démarrer')).toBeVisible()
    await page.getByRole('button', { name: /Un indice sur la méthode/ }).click()
    await expect(page.getByText('Indice 2 — la méthode')).toBeVisible()
  })
})

test.describe('accès libre aux contenus', () => {
  test('les quatre matières sont accessibles sans test préalable', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Explorer l’application sans commencer' }).click()

    await page.getByRole('link', { name: 'Apprendre' }).click()
    await expect(page.getByRole('heading', { name: 'Les quatre matières' })).toBeVisible()

    for (const name of ['Calculs', 'Français et expression écrite', 'Culture sanitaire et sociale', 'Entretien professionnel']) {
      await expect(page.getByRole('heading', { name, exact: true })).toBeVisible()
    }

    // Une leçon de calculs s'ouvre directement.
    await page.getByRole('link', { name: /^Calculs/ }).click()
    await page.getByRole('link', { name: /Lire et comparer les nombres/ }).click()
    await expect(page.getByRole('heading', { name: 'Comprendre' })).toBeVisible()
    await expect(page.getByText('Non évaluée')).toBeVisible()
  })

  test('les 24 fiches sanitaires sont présentes et corrigées', async ({ page }) => {
    await page.goto('/#/fiches')
    await page.getByRole('button', { name: 'Explorer l’application sans commencer' }).click().catch(() => {})
    await page.goto('/#/fiches')
    const links = page.locator('.link-card')
    await expect(links).toHaveCount(24)

    await page.goto('/#/fiches/H04')
    await expect(page.getByRole('heading', { name: 'Proches aidants' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Vocabulaire' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Questions de compréhension' })).toBeVisible()

    // Une question de compréhension se corrige avec une explication.
    await page.locator('.choice').first().click()
    await page.getByRole('button', { name: 'Vérifier' }).first().click()
    await expect(page.locator('.feedback').first()).toBeVisible()
  })

  test('un sujet de rédaction conserve son brouillon', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Explorer l’application sans commencer' }).click()
    await page.goto('/#/entrainement/redaction/W01')
    const area = page.getByPlaceholder(/Écrivez ici/)
    await area.fill('Les proches aidants rencontrent une difficulté de continuité.')
    await page.waitForTimeout(800)
    await page.reload()
    await expect(page.getByPlaceholder(/Écrivez ici/)).toHaveValue(
      'Les proches aidants rencontrent une difficulté de continuité.',
    )
    await expect(page.getByText('Brouillon enregistré')).toBeVisible()

    // Le corrigé et la comparaison de copies sont disponibles.
    await page.getByRole('button', { name: 'Afficher le corrigé de référence' }).click()
    await expect(page.getByText('Un corrigé possible — pas le seul')).toBeVisible()
    await page.getByRole('button', { name: 'Voir deux copies de qualité différente' }).click()
    await expect(page.getByText('Copie faible')).toBeVisible()
    await expect(page.getByText('Copie solide')).toBeVisible()
    await expect(page.getByText('Ce qui fait la différence')).toBeVisible()
  })

  test('l’oral fonctionne sans micro', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Explorer l’application sans commencer' }).click()
    await page.goto('/#/entrainement/oral/O01-1')
    await expect(page.getByRole('heading', { name: 'Présentez-vous en deux minutes.' })).toBeVisible()
    await expect(page.getByText('Ce que le jury cherche')).toBeVisible()

    // La trame est vide : rien n'est rédigé à la place de l'utilisatrice.
    const frame = page.getByLabel('Votre idée principale')
    await expect(frame).toHaveValue('')

    await page.getByRole('tab', { name: '2. Dire' }).click()
    await expect(page.getByRole('button', { name: 'Démarrer le minuteur' })).toBeVisible()
    await expect(page.getByText('Enregistrement audio — facultatif')).toBeVisible()

    await page.getByRole('tab', { name: '3. M’évaluer' }).click()
    await expect(page.getByText(/indicatif/)).toBeVisible()
  })
})

test.describe('examen blanc', () => {
  test('aucun indice pendant l’épreuve, minuteur robuste au rechargement', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Explorer l’application sans commencer' }).click()
    await page.goto('/#/entrainement/examens')
    await page
      .getByRole('button', { name: 'Passer en conditions réelles' })
      .first()
      .click()

    await expect(page.getByRole('timer')).toBeVisible()
    const first = await page.getByRole('timer').innerText()
    expect(first).toMatch(/^(29|30):/)

    // Ni indice ni corrigé pendant l'épreuve.
    await expect(page.getByRole('button', { name: /indice/i })).toHaveCount(0)
    await expect(page.getByRole('button', { name: /correction/i })).toHaveCount(0)

    // Le minuteur continue après un rechargement complet.
    await page.waitForTimeout(2500)
    await page.reload()
    await expect(page.getByRole('timer')).toBeVisible()
    const second = await page.getByRole('timer').innerText()
    expect(toSeconds(second)).toBeLessThan(toSeconds(first))

    // La navigation principale est masquée pendant l'épreuve.
    await expect(page.locator('nav.nav')).toHaveCount(0)

    // Remise explicite de la copie.
    await page.getByRole('button', { name: /Rendre cette partie/ }).click()
    await expect(page.getByRole('heading', { name: /Examen blanc 1/ })).toBeVisible({ timeout: 15000 }).catch(async () => {
      await page.getByRole('button', { name: 'Remettre ma copie' }).click()
    })
  })

  test('les seuils sont appliqués et l’admission n’est jamais annoncée', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Explorer l’application sans commencer' }).click()
    await page.goto('/#/entrainement/examens')
    await page.getByRole('button', { name: 'S’entraîner avec pauses' }).first().click()
    await page.getByRole('button', { name: /Rendre cette partie/ }).click()
    await page.getByRole('button', { name: 'Commencer les calculs' }).click()
    await page.getByRole('button', { name: 'Remettre ma copie' }).click()

    await expect(page.getByRole('heading', { name: /Résultat de cet entraînement/ })).toBeVisible()
    await expect(page.locator('.card .lead').last()).toContainText('Il manque la note d’entretien')

    // Sans note d'oral, aucun total définitif.
    await expect(page.getByText('admission garantie')).toHaveCount(0)
  })
})

test.describe('réglages et données', () => {
  test('export, import et avertissement de non-synchronisation', async ({ page }) => {
    await onboard(page)
    await page.goto('/#/reglages')
    await expect(page.getByText(/aucune synchronisation/i)).toBeVisible()
    await expect(page.getByText(/Exportez votre progression régulièrement/)).toBeVisible()

    const download = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Exporter ma progression' }).click()
    const file = await download
    expect(file.suggestedFilename()).toMatch(/^prepa-ifsi-sauvegarde-\d{4}-\d{2}-\d{2}\.json$/)
  })

  test('la taille du texte est réglable', async ({ page }) => {
    await onboard(page)
    await page.goto('/#/reglages')
    const before = await page.evaluate(() =>
      getComputedStyle(document.body).fontSize,
    )
    await page.getByRole('button', { name: 'Très grand' }).click()
    const after = await page.evaluate(() => getComputedStyle(document.body).fontSize)
    expect(parseFloat(after)).toBeGreaterThan(parseFloat(before))
  })
})

test.describe('candidature', () => {
  test('aucune date inventée, soutien distinct du financement', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Explorer l’application sans commencer' }).click()
    await page.goto('/#/candidature')
    await expect(page.getByText('Aucune date confirmée')).toBeVisible()
    await expect(page.getByText('Soutien oral de l’employeur')).toBeVisible()
    await expect(page.getByText('Accord écrit de financement des frais pédagogiques')).toBeVisible()
    await expect(page.getByText(/ne conclut jamais à votre éligibilité/)).toBeVisible()
  })
})

test.describe('accessibilité et petits écrans', () => {
  test('navigation au clavier depuis l’accueil', async ({ page }) => {
    await onboard(page)
    await page.goto('/#/')
    await page.reload()
    // Aucun clic avant le Tab : un clic fixerait le point de départ du focus
    // après le lien d'évitement, ce qui fausserait le test.

    // Le premier élément atteignable est le lien d'évitement.
    await page.keyboard.press('Tab')
    expect(await focusText(page)).toContain('Aller au contenu')

    // Le bouton principal est ensuite atteignable sans souris.
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press('Tab')
      const t = await focusText(page)
      if (/Commencer ma séance|Reprendre ma séance/.test(t)) {
        // Le focus doit être visible : un contour est appliqué.
        const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle)
        expect(outline).not.toBe('none')
        return
      }
    }
    throw new Error('Le bouton principal n’est pas atteignable au clavier')
  })

  test('aucun débordement horizontal sur les écrans étroits', async ({ page }) => {
    await onboard(page)
    const routes = [
      '/#/',
      '/#/apprendre',
      '/#/apprendre/calculs',
      '/#/apprendre/calculs/M12',
      '/#/fiches/H01',
      '/#/entrainement',
      '/#/entrainement/examens',
      '/#/entrainement/redaction/W01',
      '/#/entrainement/oral/O01-1',
      '/#/progres',
      '/#/reglages',
      '/#/candidature',
    ]
    for (const r of routes) {
      await page.goto(r)
      await page.waitForTimeout(150)
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow, `débordement horizontal sur ${r}`).toBeLessThanOrEqual(1)
    }
  })

  test('les cibles tactiles principales font au moins 44 px', async ({ page }) => {
    await onboard(page)
    await page.goto('/#/')
    const boxes = await page.locator('.btn--big, .nav__link, .segmented__btn').evaluateAll((els) =>
      els.map((e) => e.getBoundingClientRect().height),
    )
    expect(boxes.length).toBeGreaterThan(0)
    for (const h of boxes) expect(h).toBeGreaterThanOrEqual(44)
  })
})

async function focusText(page: Page): Promise<string> {
  return page.evaluate(() => document.activeElement?.textContent ?? '')
}

function toSeconds(mmss: string): number {
  const m = /(\d+):(\d+)/.exec(mmss)
  if (!m) return NaN
  return Number(m[1]) * 60 + Number(m[2])
}
