import { defineConfig, devices } from '@playwright/test'

/**
 * Tests de parcours dans un vrai navigateur, sur ordinateur et sur téléphone.
 *
 * Par défaut, la configuration construit l'application et sert `dist` en local.
 * En posant `E2E_BASE_URL`, les mêmes tests s'exécutent contre une adresse déjà
 * en ligne — une mise en production, par exemple — sans serveur local :
 *
 *   E2E_BASE_URL=https://exemple.vercel.app npm run test:e2e
 */
const remote = process.env.E2E_BASE_URL

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: remote ?? 'http://localhost:4173',
    trace: 'off',
  },
  projects: [
    {
      name: 'ordinateur',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } },
    },
    {
      name: 'telephone',
      // 360 px de large : le plus petit écran courant.
      use: { ...devices['Pixel 5'], viewport: { width: 360, height: 780 }, isMobile: true, hasTouch: true },
    },
  ],
  // Aucun serveur local à démarrer lorsqu'on teste une adresse déjà en ligne.
  webServer: remote
    ? undefined
    : {
        command: 'npm run build && npm run preview -- --port 4173 --strictPort',
        port: 4173,
        reuseExistingServer: false,
        timeout: 180_000,
      },
})
