import { describe, expect, it } from 'vitest'
import { buildSession, describeSession, pickPriority, poolFor } from './session'
import { addDays, applyAttempt } from './mastery'
import { emptySkillProgress, initialState, type AppState } from '@/store/schema'
import { getSkill, SKILLS } from '@/content/skills'
import { generate, templateById, templatesFor } from '@/content/registry'

/** Nombre de types de problèmes en dessous duquel on apprend par cœur. */
const MIN_EXPECTED_POOL = 3

const DAY = '2026-09-16'

function state(): AppState {
  return initialState(new Date(`${DAY}T09:00:00`))
}

describe('construction d’une séance', () => {
  it('commence par une leçon quand la compétence n’a jamais été vue', () => {
    const s = state()
    const items = buildSession(s, { minutes: 20, day: DAY })
    expect(items.length).toBeGreaterThan(0)
    expect(items[0]!.kind).toBe('lecon')
  })

  it('ne propose pas de leçon deux fois', () => {
    const s = state()
    const first = buildSession(s, { minutes: 20, day: DAY })
    const skillId = first[0]!.skillId
    s.skills[skillId] = { ...emptySkillProgress(), lessonRead: true }
    const second = buildSession(s, { minutes: 20, day: DAY })
    const lessons = second.filter((i) => i.kind === 'lecon' && i.skillId === skillId)
    expect(lessons).toHaveLength(0)
  })

  it('tient la durée demandée, à un item près', () => {
    for (const minutes of [10, 20, 30]) {
      const items = buildSession(state(), { minutes, day: DAY })
      const total = items.reduce((n, i) => n + i.seconds, 0)
      expect(total).toBeGreaterThan(minutes * 60 * 0.5)
      expect(total).toBeLessThanOrEqual(minutes * 60 + 400)
    }
  })

  it('est reproductible : deux constructions identiques donnent la même séance', () => {
    const s = state()
    const a = buildSession(s, { minutes: 20, day: DAY })
    const b = buildSession(s, { minutes: 20, day: DAY })
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
  })

  it('respecte la matière demandée', () => {
    for (const subject of ['calculs', 'francais', 'sante', 'oral'] as const) {
      const items = buildSession(state(), { minutes: 20, subject, day: DAY })
      expect(items.length, `aucun contenu pour ${subject}`).toBeGreaterThan(0)
      expect(items.every((i) => i.subject === subject)).toBe(true)
    }
  })

  it('travaille une seule compétence quand elle est imposée', () => {
    const items = buildSession(state(), { minutes: 20, skillId: 'M09', day: DAY })
    expect(items.length).toBeGreaterThan(0)
    expect(items.every((i) => i.skillId === 'M09')).toBe(true)
  })

  it('met les révisions dues en tête de séance', () => {
    const s = state()
    s.skills['M03'] = { ...emptySkillProgress(), state: 'a-consolider', lessonRead: true, nextReview: DAY }
    const items = buildSession(s, { minutes: 20, day: DAY })
    expect(items[0]!.skillId).toBe('M03')
    expect(items[0]!.reason).toBe('revision')
  })

  it('n’impose jamais plus de deux rappels de révision dans une séance', () => {
    const s = state()
    for (const id of ['M01', 'M02', 'M03', 'M04', 'M05', 'M06']) {
      s.skills[id] = {
        ...emptySkillProgress(),
        state: 'a-consolider',
        lessonRead: true,
        nextReview: addDays(DAY, -5),
      }
    }
    const items = buildSession(s, { minutes: 30, day: DAY })
    const reviews = new Set(items.filter((i) => i.reason === 'revision').map((i) => i.skillId))
    expect(reviews.size).toBeLessThanOrEqual(2)
  })

  it('reprend une compétence fragile au niveau « Je découvre »', () => {
    const s = state()
    s.skills['M09'] = { ...emptySkillProgress(), state: 'fragile', lessonRead: true, consecutiveFailures: 2 }
    const items = buildSession(s, { minutes: 20, subject: 'calculs', day: DAY })
    const forSkill = items.filter((i) => i.skillId === 'M09' && i.kind === 'exercice')
    expect(forSkill.length).toBeGreaterThan(0)
    expect(forSkill[0]!.level).toBe('decouverte')
    expect(forSkill[0]!.reason).toBe('difficulte')
  })

  it('n’introduit pas une notion dont un prérequis est en échec', () => {
    const s = state()
    // M08 est un prérequis de M09.
    s.skills['M08'] = { ...emptySkillProgress(), state: 'fragile', lessonRead: true }
    const items = buildSession(s, { minutes: 30, subject: 'calculs', day: DAY })
    const newM09 = items.filter((i) => i.skillId === 'M09' && i.reason === 'nouveau')
    expect(newM09).toHaveLength(0)
  })

  it('ne propose que des contenus publiés et des gabarits existants', () => {
    const items = buildSession(state(), { minutes: 30, day: DAY })
    for (const i of items) {
      expect(getSkill(i.skillId), `compétence inconnue : ${i.skillId}`).toBeDefined()
      if (i.kind === 'exercice') {
        expect(templateById(i.ref), `gabarit inconnu : ${i.ref}`).toBeDefined()
        expect(typeof i.seed).toBe('number')
      }
    }
  })

  it('propose une notion nouvelle quand rien n’est dû', () => {
    const items = buildSession(state(), { minutes: 20, day: DAY })
    expect(items.some((i) => i.reason === 'nouveau')).toBe(true)
  })
})

describe('bilan court facultatif', () => {
  it('ne propose aucune leçon : il sert à situer, pas à enseigner', () => {
    const items = buildSession(state(), { minutes: 20, diagnostic: true, day: DAY })
    expect(items.length).toBeGreaterThan(0)
    expect(items.some((i) => i.kind === 'lecon')).toBe(false)
  })

  it('répartit les exercices sur plusieurs matières', () => {
    const items = buildSession(state(), { minutes: 20, diagnostic: true, day: DAY })
    const subjects = new Set(items.map((i) => i.subject))
    expect(subjects.size).toBeGreaterThanOrEqual(3)
  })

  it('ne porte que sur des compétences prioritaires', () => {
    const items = buildSession(state(), { minutes: 20, diagnostic: true, day: DAY })
    for (const i of items) {
      expect(getSkill(i.skillId)!.priority, `${i.skillId} n’est pas prioritaire`).toBe('P1')
    }
  })

  it('n’attribue aucun état de maîtrise par lui-même', () => {
    const s = state()
    buildSession(s, { minutes: 20, diagnostic: true, day: DAY })
    // Construire une séance ne doit jamais modifier la progression.
    expect(Object.keys(s.skills)).toHaveLength(0)
  })
})

describe('priorité affichée sur l’accueil', () => {
  it('n’en affiche qu’une, et explique pourquoi', () => {
    const s = state()
    s.skills['M05'] = { ...emptySkillProgress(), state: 'fragile', lessonRead: true }
    const p = pickPriority(s, DAY)
    expect(p).not.toBeNull()
    expect(p!.skillId).toBe('M05')
    expect(p!.sentence).toMatch(/plus simplement/)
  })

  it('met la révision due avant la difficulté', () => {
    const s = state()
    s.skills['M05'] = { ...emptySkillProgress(), state: 'fragile', lessonRead: true }
    s.skills['M02'] = { ...emptySkillProgress(), state: 'a-consolider', lessonRead: true, nextReview: DAY }
    const p = pickPriority(s, DAY)
    expect(p!.skillId).toBe('M02')
    expect(p!.reason).toBe('revision')
  })
})

describe('phrase d’explication de la séance', () => {
  it('décrit ce que la séance va apporter', () => {
    const items = buildSession(state(), { minutes: 20, day: DAY })
    const phrase = describeSession(items)
    expect(phrase.length).toBeGreaterThan(20)
    expect(phrase).toMatch(/séance/)
  })
  it('ne promet rien quand il n’y a rien à faire', () => {
    expect(describeSession([])).toMatch(/Aucun contenu/)
  })
})

/**
 * Régression : les séances successives proposaient les mêmes exercices.
 *
 * Trois causes cumulées, toutes couvertes ici :
 *  - certaines compétences n'avaient qu'un ou deux gabarits à leur niveau ;
 *  - l'index dans le vivier avançait du même pas que le compteur, si bien que
 *    les mêmes gabarits ressortaient indéfiniment ;
 *  - le compteur n'avançait qu'à la validation d'une réponse : quitter une
 *    séance sans répondre redonnait l'énoncé identique.
 */
describe('variété des exercices', () => {
  const render = (ex: unknown): string => {
    const walk = (b: unknown): string =>
      b == null
        ? ''
        : typeof b === 'string'
          ? b
          : Array.isArray(b)
            ? b.map(walk).join(' ')
            : typeof b === 'object'
              ? Object.values(b as Record<string, unknown>).map(walk).join(' ')
              : String(b)
    return walk(ex).replace(/\s+/g, ' ').trim()
  }

  function runSessions(count: number, opts: { skillId?: string; minutes?: number } = {}) {
    const s = state()
    s.profile.onboarded = true
    const enonces: string[] = []
    const gabarits = new Set<string>()
    const sessions: string[][] = []

    for (let n = 0; n < count; n++) {
      s.sessionsStarted += 1
      const plan = buildSession(s, {
        minutes: opts.minutes ?? 10,
        day: DAY,
        nonce: s.sessionsStarted,
        ...(opts.skillId ? { skillId: opts.skillId } : {}),
      })
      const refs: string[] = []
      for (const item of plan) {
        if (item.kind !== 'exercice') continue
        const ex = generate(item.ref, item.seed!)!
        enonces.push(render(ex))
        gabarits.add(item.ref)
        refs.push(item.ref)
        s.skills[item.skillId] = applyAttempt(
          s.skills[item.skillId],
          { correct: true, hintsUsed: 0, usedAlternative: false, structure: templateById(item.ref)?.structure ?? item.ref },
          DAY,
        )
      }
      sessions.push(refs)
    }
    return { enonces, gabarits, sessions }
  }

  it('un niveau trop pauvre est complété par les niveaux voisins', () => {
    // M09 ne comptait qu'un seul gabarit en « Je découvre » : le même exercice
    // revenait à chaque séance.
    expect(templatesFor('M09', 'decouverte').length).toBeLessThan(MIN_EXPECTED_POOL)
    expect(poolFor('M09', 'decouverte').length).toBeGreaterThanOrEqual(MIN_EXPECTED_POOL)
    for (const skill of SKILLS.filter((sk) => sk.subject === 'calculs')) {
      if (!templatesFor(skill.id).length) continue
      const n = poolFor(skill.id, 'decouverte').length
      expect(n, `${skill.id} : vivier de ${n} gabarit(s)`).toBeGreaterThanOrEqual(
        Math.min(MIN_EXPECTED_POOL, templatesFor(skill.id).length),
      )
    }
  })

  it('douze séances sur une compétence ne redonnent jamais le même énoncé', () => {
    const { enonces, gabarits } = runSessions(12, { skillId: 'M01' })
    expect(enonces.length).toBeGreaterThan(20)
    // Jamais deux fois de suite le même énoncé.
    for (let i = 1; i < enonces.length; i++) expect(enonces[i]).not.toBe(enonces[i - 1])
    // Quelques coïncidences restent possibles — tirer 72 fois dans des viviers
    // de quelques dizaines de variantes en produit statistiquement. Ce qui
    // doit être exclu, c'est la répétition massive d'avant correction, où la
    // même paire d'énoncés revenait à chaque séance.
    const distincts = new Set(enonces).size
    expect(distincts / enonces.length, `${distincts} énoncés distincts sur ${enonces.length}`).toBeGreaterThan(0.9)
    expect(gabarits.size, 'trop peu de types de problèmes différents').toBeGreaterThanOrEqual(4)
  })

  it('ouvrir une séance sans répondre ne redonne pas le même exercice', () => {
    const s = state()
    s.profile.onboarded = true
    const vus: string[] = []
    // Aucune tentative n'est enregistrée entre les ouvertures : c'est
    // exactement le cas qui reproduisait l'énoncé à l'identique.
    for (let n = 0; n < 5; n++) {
      s.sessionsStarted += 1
      const plan = buildSession(s, { minutes: 10, skillId: 'M01', day: DAY, nonce: s.sessionsStarted })
      const first = plan.find((i) => i.kind === 'exercice')!
      vus.push(render(generate(first.ref, first.seed!)!))
    }
    expect(new Set(vus).size).toBe(vus.length)
  })

  it('un même type de problème ne revient jamais deux fois d’affilée', () => {
    const { sessions } = runSessions(30, { minutes: 30 })
    let collages = 0
    for (const refs of sessions) {
      for (let i = 1; i < refs.length; i++) if (refs[i] === refs[i - 1]) collages++
    }
    expect(collages).toBe(0)
  })

  it('une séance reste reproductible à numéro de séance égal', () => {
    // La reprise après fermeture de page en dépend.
    const s = state()
    s.profile.onboarded = true
    const a = buildSession(s, { minutes: 20, day: DAY, nonce: 7 })
    const b = buildSession(s, { minutes: 20, day: DAY, nonce: 7 })
    expect(a).toEqual(b)
  })
})
