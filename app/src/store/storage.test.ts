import { describe, expect, it } from 'vitest'
import { buildExport, migrate, parseImport } from './storage'
import { initialState, SCHEMA_VERSION, type AppState } from './schema'

function filled(): AppState {
  const s = initialState(new Date('2026-09-16T10:00:00Z'))
  s.profile.firstName = 'Camille'
  s.skills['M01'] = {
    state: 'a-consolider',
    successesUnaided: 2,
    successesAided: 1,
    failures: 1,
    consecutiveFailures: 0,
    structuresPassed: ['comparer-deux-decimaux'],
    daysWithUnaidedSuccess: ['2026-09-16'],
    reviewStep: 1,
    seenCounter: 4,
    lessonRead: true,
    nextReview: '2026-09-17',
    lastSeen: '2026-09-16',
  }
  s.attempts.push({
    id: 'a1',
    at: '2026-09-16T10:05:00Z',
    skillId: 'M01',
    subject: 'calculs',
    itemKind: 'maths',
    templateId: 'M01-comparer',
    seed: 42,
    version: 1,
    level: 'decouverte',
    structure: 'comparer-deux-decimaux',
    correct: true,
    hintsUsed: 1,
    usedAlternative: false,
    seconds: 30,
    mode: 'seance',
    given: '8,7',
  })
  s.drafts['W01'] = { text: 'Un brouillon en cours.', updatedAt: '2026-09-16T10:10:00Z' }
  return s
}

describe('export et import', () => {
  it('fait un aller-retour fidèle', () => {
    const before = filled()
    const file = buildExport(before)
    const report = parseImport(JSON.stringify(file))
    expect(report.ok).toBe(true)
    const after = report.state!
    expect(after.profile.firstName).toBe('Camille')
    expect(after.skills.M01).toEqual(before.skills.M01)
    expect(after.attempts).toEqual(before.attempts)
    expect(after.drafts.W01.text).toBe('Un brouillon en cours.')
  })

  it('conserve les aides et les versions dans les tentatives', () => {
    const report = parseImport(JSON.stringify(buildExport(filled())))
    const a = report.state!.attempts[0]!
    expect(a.hintsUsed).toBe(1)
    expect(a.usedAlternative).toBe(false)
    expect(a.version).toBe(1)
    expect(a.seed).toBe(42)
    expect(a.structure).toBe('comparer-deux-decimaux')
  })

  it('refuse un fichier qui ne vient pas de l’application', () => {
    const r = parseImport(JSON.stringify({ format: 'autre-appli', state: {} }))
    expect(r.ok).toBe(false)
    expect(r.message).toMatch(/ne vient pas de cette application/)
  })

  it('refuse un JSON invalide sans rien casser', () => {
    const r = parseImport('{ ceci n’est pas du json')
    expect(r.ok).toBe(false)
    expect(r.state).toBeUndefined()
  })

  it('refuse un fichier sans progression', () => {
    const r = parseImport(JSON.stringify({ format: 'prepa-ifsi-2027' }))
    expect(r.ok).toBe(false)
  })

  it('décrit ce que contient le fichier avant de l’appliquer', () => {
    const r = parseImport(JSON.stringify(buildExport(filled())))
    expect(r.details.join(' ')).toMatch(/1 compétences? suivies?/)
    expect(r.details.join(' ')).toMatch(/1 exercices? enregistrés?/)
  })

  it('n’exécute aucun HTML contenu dans un import', () => {
    const s = filled()
    s.profile.firstName = '<img src=x onerror=alert(1)>'
    const r = parseImport(JSON.stringify(buildExport(s)))
    expect(r.ok).toBe(true)
    // La valeur est conservée telle quelle : c'est l'affichage React qui
    // l'échappe, jamais une interprétation HTML.
    expect(r.state!.profile.firstName).toBe('<img src=x onerror=alert(1)>')
  })
})

describe('migrations', () => {
  it('relit une sauvegarde de version 1 sans perdre la progression', () => {
    const v1 = {
      version: 1,
      profile: { firstName: 'Camille', dailyMinutes: 20, onboarded: true },
      settings: { textScale: 1 },
      skills: { M01: { state: 'a-consolider', reviewStep: 0, seenCounter: 1 } },
      attempts: [{ id: 'x', skillId: 'M01', correct: true, hintsUsed: 0 }],
      drafts: { W01: { text: 'texte', updatedAt: '2026-01-01' } },
    }
    const { state, from } = migrate(v1)
    expect(from).toBe(1)
    expect(state.version).toBe(SCHEMA_VERSION)
    expect(state.profile.firstName).toBe('Camille')
    expect(state.skills.M01).toBeDefined()
    expect(state.drafts.W01.text).toBe('texte')
    // Les champs ajoutés depuis sont créés avec une valeur neutre.
    expect(state.writtenSelf).toEqual({})
    expect(state.sheetsRead).toEqual([])
    expect(state.attempts[0]!.usedAlternative).toBe(false)
    expect(state.attempts[0]!.structure).toBe('inconnue')
  })

  it('complète les champs manquants sans écraser ce qui existe', () => {
    const { state } = migrate({ version: 3, profile: { firstName: 'A' } })
    expect(state.profile.firstName).toBe('A')
    expect(state.profile.dailyMinutes).toBe(20)
    expect(state.candidature.items).toEqual({})
    expect(Array.isArray(state.candidature.confirmedDates)).toBe(true)
  })

  it('v3 → v4 : le compteur de séances repart du nombre de jours actifs', () => {
    // Sans lui, la première séance après mise à jour reproposerait ce qui vient
    // d'être vu. On ne repart donc pas de zéro.
    const { state } = migrate({ version: 3, activeDays: ['2026-09-10', '2026-09-11'] })
    expect(state.sessionsStarted).toBe(2)
  })

  it('une sauvegarde v4 conserve son compteur de séances', () => {
    const { state } = migrate({ version: 4, sessionsStarted: 37 })
    expect(state.sessionsStarted).toBe(37)
  })

  it('refuse une entrée qui n’est pas un objet', () => {
    expect(() => migrate(null)).toThrow()
    expect(() => migrate('texte')).toThrow()
  })

  it('ne remplace jamais des données réelles par des données de démonstration', () => {
    const { state } = migrate({ version: 3, skills: {}, attempts: [] })
    expect(state.attempts).toEqual([])
    expect(state.skills).toEqual({})
    expect(state.activeDays).toEqual([])
  })
})
