#!/usr/bin/env node
/**
 * Publie l'application sur le tailnet (Tailscale), et uniquement sur lui.
 *
 * Deux modes, choisis automatiquement selon ce qui est disponible :
 *
 *  1. `tailscale serve` — si la fonctionnalité Serve est activée sur le
 *     tailnet. L'application est alors servie en HTTPS sur le nom de machine,
 *     sans numéro de port, et reste accessible sans qu'aucun terminal ne
 *     reste ouvert. C'est le mode à privilégier : l'enregistrement audio
 *     facultatif de l'oral n'est possible qu'en HTTPS, les navigateurs
 *     refusant le micro sur une origine non sécurisée.
 *
 *  2. Serveur statique local lié à la seule adresse Tailscale — toujours
 *     disponible, sans configuration préalable. L'application est servie en
 *     HTTP sur http://<machine>.<tailnet>.ts.net:4180.
 *
 * Dans les deux cas, rien n'est exposé sur Internet ni sur le réseau Wi-Fi
 * local : l'écoute se limite à l'interface Tailscale. Une exposition publique
 * demanderait `tailscale funnel`, que ce script ne fait jamais.
 *
 * Options :
 *   --build   reconstruire avant de publier
 *   --http    forcer le mode 2, sans tenter `tailscale serve`
 */

import { execFileSync, spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = resolve(ROOT, 'dist')
// Volontairement différent du port des tests (4173) : on peut publier
// l'application et lancer `npm run test:e2e` en même temps.
const PORT = Number(process.env.PORT ?? 4180)

const TAILSCALE_PATHS = [
  '/usr/local/bin/tailscale',
  '/opt/homebrew/bin/tailscale',
  '/Applications/Tailscale.app/Contents/MacOS/Tailscale',
  'tailscale',
]

const bold = (s) => `[1m${s}[0m`
const dim = (s) => `[2m${s}[0m`

function findTailscale() {
  for (const p of TAILSCALE_PATHS) {
    try {
      execFileSync(p, ['version'], { stdio: 'ignore' })
      return p
    } catch {
      /* binaire suivant */
    }
  }
  return null
}

const ts = findTailscale()
if (!ts) {
  console.error(
    'Tailscale est introuvable sur cette machine.\n' +
      'Installez-le depuis https://tailscale.com/download, puis relancez cette commande.',
  )
  process.exit(1)
}

let status
try {
  status = JSON.parse(execFileSync(ts, ['status', '--json'], { encoding: 'utf8' }))
} catch {
  console.error('Impossible de lire l’état de Tailscale. Le service est-il démarré ?')
  process.exit(1)
}

if (status.BackendState !== 'Running') {
  console.error(
    `Tailscale n’est pas connecté (état : ${status.BackendState}).\n` +
      'Ouvrez l’application Tailscale, connectez-vous, puis relancez cette commande.',
  )
  process.exit(1)
}

const self = status.Self ?? {}
const dnsName = String(self.DNSName ?? '').replace(/\.$/, '')
const ipv4 = (self.TailscaleIPs ?? []).find((a) => !a.includes(':'))

if (!dnsName || !ipv4) {
  console.error('Impossible de déterminer le nom ou l’adresse Tailscale de cette machine.')
  process.exit(1)
}

// --- Construction si nécessaire -------------------------------------------

if (process.argv.includes('--build') || !existsSync(resolve(DIST, 'index.html'))) {
  console.log(dim('Construction de l’application…'))
  execFileSync('npm', ['run', 'build'], { cwd: ROOT, stdio: 'inherit' })
}

// --- Mode 1 : tailscale serve ---------------------------------------------

/**
 * Tente `tailscale serve`. Renvoie `{ ok }` ou `{ ok: false, reason }`.
 *
 * On ne se fie pas à `tailscale serve status` : cette sous-commande sort en
 * code 0 même lorsque la fonctionnalité est désactivée sur le tailnet. On
 * lance donc la publication et on lit la sortie, en s'arrêtant dès que le
 * message d'erreur connu apparaît plutôt que d'attendre un délai complet.
 */
function tryServe() {
  return new Promise((done) => {
    const child = spawn(ts, ['serve', '--bg', DIST], { stdio: ['ignore', 'pipe', 'pipe'] })
    let out = ''
    let settled = false

    const finish = (result) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      try {
        child.kill()
      } catch {
        /* déjà terminé */
      }
      done(result)
    }

    const onData = (chunk) => {
      out += String(chunk)
      if (/not enabled|n’est pas activ|not available|disabled/i.test(out)) {
        finish({ ok: false, reason: 'disabled', out: out.trim() })
      }
    }
    child.stdout.on('data', onData)
    child.stderr.on('data', onData)

    child.on('error', (e) => finish({ ok: false, reason: 'error', out: e.message }))
    child.on('exit', (code) =>
      finish(code === 0 ? { ok: true } : { ok: false, reason: 'exit', out: out.trim() }),
    )

    // Garde-fou : la provision d'un certificat peut prendre un moment.
    const timer = setTimeout(() => finish({ ok: false, reason: 'timeout', out: out.trim() }), 45_000)
  })
}

const wantServe = !process.argv.includes('--http')

if (wantServe) {
  console.log(dim('Tentative de publication en HTTPS via tailscale serve…'))
  const r = await tryServe()
  if (r.ok) {
    console.log(`
${bold('L’application est publiée sur votre tailnet, en HTTPS.')}

  ${bold(`https://${dnsName}/`)}

Ouvrez cette adresse depuis n’importe quel appareil connecté au même tailnet.
Elle répond tant que ce Mac est allumé et connecté à Tailscale : aucun
terminal n’a besoin de rester ouvert.

${dim('Arrêter la publication :        npm run tailscale:stop')}
${dim('Après modification du contenu : npm run tailscale -- --build')}
`)
    process.exit(0)
  }

  if (r.reason === 'disabled') {
    console.log(`
${bold('« Serve » n’est pas activé sur votre tailnet.')}

Pour obtenir une adresse HTTPS sans numéro de port — et pour que
l’enregistrement audio facultatif de l’oral fonctionne, les navigateurs
bloquant le micro hors HTTPS — activez-le une fois ici :

  ${bold('https://login.tailscale.com/admin/settings/features')}

puis relancez ${bold('npm run tailscale')}.

En attendant, l’application est servie en HTTP ci-dessous. Tout fonctionne,
sauf le micro de l’oral ; l’entraînement oral reste entièrement utilisable
sans micro, avec minuteur, trame et autoévaluation.
`)
  } else {
    console.log(dim(`\ntailscale serve indisponible (${r.reason}). ${r.out ?? ''}`))
    console.log(dim('Bascule sur le serveur HTTP limité à l’interface Tailscale.\n'))
  }
}

// --- Mode 2 : serveur statique lié à la seule adresse Tailscale ------------

console.log(dim(`Démarrage du serveur sur l’interface Tailscale uniquement (${ipv4})…`))

const child = spawn(
  'npx',
  ['vite', 'preview', '--host', ipv4, '--port', String(PORT), '--strictPort'],
  { cwd: ROOT, stdio: ['ignore', 'pipe', 'inherit'] },
)

let announced = false
child.stdout.on('data', (chunk) => {
  const text = String(chunk)
  process.stdout.write(dim(text))
  if (!announced && /Local:|Network:|ready in/i.test(text)) {
    announced = true
    console.log(`
${bold('L’application est accessible sur votre tailnet.')}

  ${bold(`http://${dnsName}:${PORT}/`)}
  ${dim(`ou http://${ipv4}:${PORT}/`)}

Ouvrez cette adresse depuis n’importe quel appareil connecté au même tailnet.
Ce terminal doit rester ouvert tant que vous voulez que l’adresse réponde.

${dim('Rien n’est exposé sur Internet ni sur le Wi-Fi local :')}
${dim('le serveur n’écoute que sur l’interface Tailscale.')}
${dim('Pour arrêter : Ctrl+C.')}
`)
  }
})

const stop = () => {
  try {
    child.kill('SIGTERM')
  } catch {
    /* déjà arrêté */
  }
  process.exit(0)
}
process.on('SIGINT', stop)
process.on('SIGTERM', stop)
child.on('exit', (code) => process.exit(code ?? 0))
