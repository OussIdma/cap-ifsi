/**
 * Lecture, écriture, migration, export et import des données locales.
 *
 * Règles tenues ici :
 *  - on ne remplace jamais des données réelles par des données de démonstration ;
 *  - une sauvegarde illisible est conservée de côté au lieu d'être écrasée ;
 *  - un import est validé champ par champ avant d'être appliqué.
 */

import { initialState, SCHEMA_VERSION, STORAGE_KEY, type AppState } from './schema'

export type LoadResult =
  | { status: 'vide'; state: AppState }
  | { status: 'ok'; state: AppState }
  | { status: 'migre'; state: AppState; from: number }
  | { status: 'illisible'; state: AppState; message: string; backupKey: string }

const BACKUP_PREFIX = `${STORAGE_KEY}:sauvegarde-illisible:`

function safeLocalStorage(): Storage | null {
  try {
    const t = '__prepa_test__'
    window.localStorage.setItem(t, '1')
    window.localStorage.removeItem(t)
    return window.localStorage
  } catch {
    return null
  }
}

export function storageAvailable(): boolean {
  return safeLocalStorage() !== null
}

/** Applique les migrations successives. Chaque étape est indépendante et testable. */
export function migrate(raw: unknown): { state: AppState; from: number } {
  const base = initialState()
  if (typeof raw !== 'object' || raw === null) throw new Error('Sauvegarde vide ou non lisible.')
  const data = raw as Record<string, unknown>
  const from = typeof data.version === 'number' ? data.version : 0

  // Fusion prudente : on part de l'état initial et on recopie ce qu'on sait relire.
  const state: AppState = {
    ...base,
    profile: { ...base.profile, ...(asObject(data.profile) as object) },
    settings: { ...base.settings, ...(asObject(data.settings) as object) },
    skills: asRecord(data.skills),
    attempts: asArray(data.attempts),
    session: (data.session as AppState['session']) ?? null,
    drafts: asRecord(data.drafts),
    writtenSelf: asRecord(data.writtenSelf),
    exams: asArray(data.exams),
    oral: asRecord(data.oral),
    candidature: {
      ...base.candidature,
      ...(asObject(data.candidature) as object),
    },
    activeDays: asArray(data.activeDays),
    sheetsRead: asArray(data.sheetsRead),
    sessionsStarted: typeof data.sessionsStarted === 'number' ? data.sessionsStarted : 0,
    version: SCHEMA_VERSION,
  }

  // v1 → v2 : `writtenSelf` et `sheetsRead` n'existaient pas.
  if (from < 2) {
    state.writtenSelf = state.writtenSelf ?? {}
    state.sheetsRead = state.sheetsRead ?? []
  }
  // v2 → v3 : les tentatives ont gagné `usedAlternative` et `structure`.
  if (from < 3) {
    state.attempts = state.attempts.map((a) => ({
      ...a,
      usedAlternative: a.usedAlternative ?? false,
      structure: a.structure ?? 'inconnue',
    }))
  }

  // v3 → v4 : compteur de séances, pour varier les énoncés d'une séance à
  // l'autre. On repart du nombre de séances déjà faites plutôt que de zéro,
  // afin de ne pas reproposer ce qui vient d'être vu.
  if (from < 4) {
    state.sessionsStarted = state.sessionsStarted || state.activeDays.length
  }

  // Champs obligatoires reconstruits si absents.
  if (!state.candidature.items) state.candidature.items = {}
  if (!Array.isArray(state.candidature.confirmedDates)) state.candidature.confirmedDates = []
  if (!Array.isArray(state.candidature.contacts)) state.candidature.contacts = []

  return { state, from }
}

function asObject(v: unknown): Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v) ? (v as Record<string, unknown>) : {}
}
function asRecord<T>(v: unknown): Record<string, T> {
  return (typeof v === 'object' && v !== null && !Array.isArray(v) ? v : {}) as Record<string, T>
}
function asArray<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : []
}

export function load(): LoadResult {
  const ls = safeLocalStorage()
  if (!ls) return { status: 'vide', state: initialState() }
  const raw = ls.getItem(STORAGE_KEY)
  if (!raw) return { status: 'vide', state: initialState() }
  try {
    const parsed = JSON.parse(raw)
    const { state, from } = migrate(parsed)
    return from === SCHEMA_VERSION ? { status: 'ok', state } : { status: 'migre', state, from }
  } catch (e) {
    // On ne détruit rien : la sauvegarde illisible est mise de côté sous une autre clé.
    const backupKey = BACKUP_PREFIX + new Date().toISOString()
    try {
      ls.setItem(backupKey, raw)
    } catch {
      /* espace saturé : on laisse la clé d'origine intacte */
    }
    return {
      status: 'illisible',
      state: initialState(),
      message: e instanceof Error ? e.message : 'Erreur inconnue',
      backupKey,
    }
  }
}

let writeTimer: number | undefined

export function save(state: AppState): void {
  const ls = safeLocalStorage()
  if (!ls) return
  try {
    ls.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* quota dépassé : l'application continue de fonctionner en mémoire */
  }
}

/** Écriture différée : évite d'écrire à chaque frappe au clavier. */
export function saveDebounced(state: AppState, delay = 400): void {
  if (typeof window === 'undefined') return
  if (writeTimer) window.clearTimeout(writeTimer)
  writeTimer = window.setTimeout(() => save(state), delay)
}

/** Écriture immédiate — appelée avant de fermer l'onglet. */
export function flush(state: AppState): void {
  if (typeof window !== 'undefined' && writeTimer) window.clearTimeout(writeTimer)
  save(state)
}

// ---------------------------------------------------------------------------
// Export / import
// ---------------------------------------------------------------------------

export type ExportFile = {
  format: 'prepa-ifsi-2027'
  exportedAt: string
  schemaVersion: number
  state: AppState
}

export function buildExport(state: AppState): ExportFile {
  return {
    format: 'prepa-ifsi-2027',
    exportedAt: new Date().toISOString(),
    schemaVersion: SCHEMA_VERSION,
    state,
  }
}

export type ImportReport = {
  ok: boolean
  message: string
  details: string[]
  state?: AppState
}

/** Valide un fichier importé avant d'y toucher. Aucun HTML n'est exécuté. */
export function parseImport(text: string): ImportReport {
  const details: string[] = []
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return { ok: false, message: 'Ce fichier n’est pas un fichier de sauvegarde lisible (JSON invalide).', details }
  }
  if (typeof parsed !== 'object' || parsed === null) {
    return { ok: false, message: 'Le fichier ne contient pas de sauvegarde.', details }
  }
  const file = parsed as Record<string, unknown>
  if (file.format !== 'prepa-ifsi-2027') {
    return {
      ok: false,
      message: 'Ce fichier ne vient pas de cette application.',
      details: ['Le champ « format » attendu est « prepa-ifsi-2027 ».'],
    }
  }
  const inner = file.state
  if (typeof inner !== 'object' || inner === null) {
    return { ok: false, message: 'La sauvegarde ne contient pas de progression.', details }
  }
  let state: AppState
  try {
    const r = migrate(inner)
    state = r.state
    if (r.from !== SCHEMA_VERSION) {
      details.push(`Sauvegarde en version ${r.from}, convertie en version ${SCHEMA_VERSION}.`)
    }
  } catch (e) {
    return {
      ok: false,
      message: 'La sauvegarde est présente mais illisible.',
      details: [e instanceof Error ? e.message : String(e)],
    }
  }

  details.push(`${Object.keys(state.skills).length} compétences suivies.`)
  details.push(`${state.attempts.length} exercices enregistrés.`)
  details.push(`${Object.keys(state.drafts).length} brouillons de rédaction.`)
  details.push(`${state.exams.length} examens blancs.`)
  if (state.session) details.push('Une séance en cours sera reprise.')
  return { ok: true, message: 'Fichier valide.', details, state }
}

export function downloadExport(state: AppState): void {
  const blob = new Blob([JSON.stringify(buildExport(state), null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const stamp = new Date().toISOString().slice(0, 10)
  a.href = url
  a.download = `prepa-ifsi-sauvegarde-${stamp}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
