/**
 * Construction d'une séance.
 *
 * Règles, toutes explicables en une phrase à l'utilisatrice :
 *  1. On commence par un rappel de ce qui est dû à la révision, au plus deux
 *     par séance, même si le retard est plus important.
 *  2. On travaille ensuite une difficulté : la compétence la plus fragile dont
 *     les prérequis sont tenus.
 *  3. On termine par une notion nouvelle, choisie dans l'ordre des prérequis.
 *  4. Une compétence jamais vue commence par sa leçon, pas par un exercice.
 *  5. Le niveau suit l'état : « Je découvre » si c'est fragile, « Je m'entraîne »
 *     si c'est à consolider, « Je me prépare à l'épreuve » si c'est consolidé.
 *  6. Rien n'est proposé si le contenu n'est pas publié.
 *  7. Les exercices d'une séance sont tirés sans remise : un même type de
 *     problème ne revient qu'une fois le vivier épuisé, et l'ordre change
 *     d'une séance à l'autre.
 *  8. Un niveau qui compte trop peu de types de problèmes est complété par les
 *     niveaux voisins. Mieux vaut un exercice un peu plus difficile qu'un
 *     énoncé déjà vu trois fois : révisé par cœur, il ne prouve plus rien.
 */

import {
  frenchFor,
  lessonFor,
  oralFor,
  seedFor,
  sheetById,
  templatesFor,
  writtenFor,
} from '@/content/registry'
import { getSkill, orderedSkills, SKILLS } from '@/content/skills'
import type { ExerciseTemplate, Level, Subject } from '@/content/types'
import type { AppState, SessionItem, SkillProgress } from '@/store/schema'
import { isDue, stateRank, today } from './mastery'
import { createRng } from './rng'

const MAX_REVIEWS_PER_SESSION = 2

export type SessionOptions = {
  minutes: number
  /** Matière imposée, sinon l'application alterne. */
  subject?: Subject
  /** Compétence imposée (« travailler autre chose »). */
  skillId?: string
  /**
   * Bilan court : on saute les leçons et on propose quelques exercices de
   * niveau « Je découvre » répartis sur les matières, pour situer un point de
   * départ. Il reste facultatif et interruptible à tout moment.
   */
  diagnostic?: boolean
  day?: string
  /**
   * Numéro d'ordre de la séance. Il entre dans le calcul des graines, si bien
   * qu'ouvrir une nouvelle séance sans avoir répondu ne redonne pas le même
   * énoncé. La graine retenue est enregistrée dans la séance : un rechargement
   * de page retrouve donc exactement l'exercice en cours.
   */
  nonce?: number
}

/**
 * Nombre minimal de types de problèmes qu'un niveau doit proposer. En dessous,
 * on complète avec les niveaux voisins : certaines compétences n'ont qu'un
 * seul gabarit en « Je découvre », ce qui faisait revenir le même énoncé à
 * chaque séance.
 */
const MIN_POOL = 3

const LEVEL_ORDER: readonly Level[] = ['decouverte', 'entrainement', 'epreuve']

/** Gabarits du niveau demandé, complétés par les niveaux voisins si besoin. */
export function poolFor(skillId: string, level: Level): ExerciseTemplate[] {
  const out = [...templatesFor(skillId, level)]
  if (out.length >= MIN_POOL) return out
  const i = LEVEL_ORDER.indexOf(level)
  // On élargit vers les niveaux les plus proches d'abord, puis les plus
  // éloignés : certaines compétences n'ont aucun gabarit au niveau demandé.
  const others = LEVEL_ORDER.filter((l) => l !== level).sort(
    (a, b) => Math.abs(LEVEL_ORDER.indexOf(a) - i) - Math.abs(LEVEL_ORDER.indexOf(b) - i),
  )
  for (const other of others) {
    for (const t of templatesFor(skillId, other)) {
      if (!out.some((x) => x.id === t.id)) out.push(t)
      if (out.length >= MIN_POOL) return out
    }
  }
  return out.length ? out : [...templatesFor(skillId)]
}

/**
 * Tirage sans remise, déterministe : on mélange le vivier, on le distribue,
 * puis on le remélange une fois épuisé. Deux séances successives ne proposent
 * donc ni la même suite ni deux fois le même type de problème d'affilée.
 */
function drawer<T>(items: readonly T[], seed: number): () => T {
  let bag: T[] = []
  let round = 0
  let last: T | undefined
  return () => {
    if (!bag.length) {
      bag = createRng((seed + round * 0x9e3779b9) >>> 0).shuffle(items)
      round++
      // Jointure entre deux mélanges : sans cela, le dernier tiré pouvait
      // ressortir aussitôt en tête du mélange suivant.
      if (bag.length > 1 && bag[0] === last) {
        const tmp = bag[0]!
        bag[0] = bag[1]!
        bag[1] = tmp
      }
    }
    last = bag.shift()!
    return last
  }
}

const levelFor = (p: SkillProgress | undefined): Level => {
  if (!p || p.state === 'non-evaluee' || p.state === 'fragile') return 'decouverte'
  if (p.state === 'a-consolider') return 'entrainement'
  return 'epreuve'
}

/** Les prérequis sont-ils suffisamment tenus pour aborder cette compétence ? */
function prerequisitesReady(skillId: string, skills: Record<string, SkillProgress>): boolean {
  const skill = getSkill(skillId)
  if (!skill) return false
  return skill.prerequisites.every((p) => {
    const st = skills[p]?.state
    // Un prérequis jamais évalué n'interdit pas : on ne bloque personne sur un
    // diagnostic qu'elle n'a pas passé. Un prérequis en échec, si.
    return st !== 'fragile'
  })
}

type Candidate = {
  skillId: string
  subject: Subject
  reason: SessionItem['reason']
  score: number
}

function candidates(state: AppState, day: string, only?: Subject): Candidate[] {
  const out: Candidate[] = []
  for (const skill of SKILLS) {
    if (only && skill.subject !== only) continue
    const p = state.skills[skill.id]
    if (!hasPublishedContent(skill.id, skill.subject)) continue

    if (isDue(p, day)) {
      out.push({ skillId: skill.id, subject: skill.subject, reason: 'revision', score: 100 })
      continue
    }
    if (p?.state === 'fragile') {
      out.push({ skillId: skill.id, subject: skill.subject, reason: 'difficulte', score: 80 })
      continue
    }
    if (!p || p.state === 'non-evaluee') {
      if (!prerequisitesReady(skill.id, state.skills)) continue
      // Les priorités P1 passent avant les compléments.
      const priorityBonus = skill.priority === 'P1' ? 30 : skill.priority === 'P2' ? 15 : 0
      out.push({ skillId: skill.id, subject: skill.subject, reason: 'nouveau', score: 40 + priorityBonus })
      continue
    }
    if (p.state === 'a-consolider') {
      out.push({ skillId: skill.id, subject: skill.subject, reason: 'rappel', score: 55 })
      continue
    }
    out.push({ skillId: skill.id, subject: skill.subject, reason: 'transfert', score: 20 })
  }
  return out
}

function hasPublishedContent(skillId: string, subject: Subject): boolean {
  switch (subject) {
    case 'calculs':
      return templatesFor(skillId).length > 0
    case 'francais':
      return frenchFor(skillId).length > 0 || writtenFor(skillId).length > 0
    case 'sante':
      return !!sheetById(skillId)
    case 'oral':
      return oralFor(skillId).length > 0
  }
}

/** Ordre d'introduction des nouveautés, prérequis d'abord. */
const ORDERED: Record<Subject, string[]> = {
  calculs: orderedSkills('calculs').map((s) => s.id),
  francais: orderedSkills('francais').map((s) => s.id),
  sante: orderedSkills('sante').map((s) => s.id),
  oral: orderedSkills('oral').map((s) => s.id),
}

function orderIndex(skillId: string, subject: Subject): number {
  const i = ORDERED[subject].indexOf(skillId)
  return i < 0 ? 999 : i
}

/** Construit les items d'une compétence, en respectant la leçon avant l'exercice. */
function itemsForSkill(
  state: AppState,
  skillId: string,
  subject: Subject,
  reason: SessionItem['reason'],
  budget: number,
  diagnostic = false,
  nonce = 0,
): SessionItem[] {
  const p = state.skills[skillId]
  const level = levelFor(p)
  const items: SessionItem[] = []
  let used = 0

  const lesson = lessonFor(skillId)
  // En bilan, on n'impose aucune leçon : on cherche seulement un point de départ.
  const needLesson =
    !diagnostic && subject !== 'sante' && !!lesson && !p?.lessonRead && reason !== 'revision'
  if (needLesson) {
    items.push({
      id: `${skillId}-lecon`,
      kind: 'lecon',
      subject,
      skillId,
      ref: skillId,
      level,
      reason,
      seconds: 150,
    })
    used += 150
  }

  // Le numéro de séance entre dans le compteur : abandonner une séance sans
  // répondre, puis en rouvrir une, ne redonne pas le même énoncé. Sans lui, le
  // compteur n'avançait qu'à la validation d'une réponse.
  const counter = (p?.seenCounter ?? 0) + items.length + nonce * 101

  if (subject === 'calculs') {
    const pool = poolFor(skillId, level)
    const draw = drawer(pool, seedFor(`${skillId}:gabarits`, counter))
    let i = 0
    while (used < budget && pool.length) {
      const t = draw()
      items.push({
        id: `${t.id}-${counter + i}`,
        kind: 'exercice',
        subject,
        skillId,
        ref: t.id,
        seed: seedFor(t.id, counter + i),
        level: t.level,
        reason,
        seconds: t.seconds,
      })
      used += t.seconds
      i++
      if (i >= pool.length * 2) break
    }
  } else if (subject === 'francais') {
    // Les micro-exercices de français sont des énoncés fixes, pas des gabarits
    // : la variété tient entièrement à l'ordre de passage, d'où le tirage sans
    // remise sur l'ensemble de la compétence quand le niveau en compte peu.
    let pool = frenchFor(skillId, level)
    if (pool.length < MIN_POOL) {
      const all = frenchFor(skillId)
      pool = [...pool, ...all.filter((e) => !pool.some((x) => x.id === e.id))]
    }
    const draw = drawer(pool, seedFor(`${skillId}:francais`, counter))
    let i = 0
    while (used < budget && pool.length) {
      const e = draw()
      items.push({
        id: `${e.id}-${counter + i}`,
        kind: 'francais',
        subject,
        skillId,
        ref: e.id,
        level: e.level,
        reason,
        seconds: e.seconds,
      })
      used += e.seconds
      i++
      if (i >= pool.length * 2) break
    }
  } else if (subject === 'sante') {
    const sheet = sheetById(skillId)
    if (sheet) {
      items.push({
        id: `${skillId}-fiche-${counter}`,
        kind: 'fiche',
        subject,
        skillId,
        ref: skillId,
        level,
        reason,
        seconds: 300,
      })
      used += 300
    }
  } else {
    const pool = oralFor(skillId)
    if (pool.length) {
      const q = drawer(pool, seedFor(`${skillId}:oral`, counter))()
      items.push({
        id: `${q.id}-${counter}`,
        kind: 'oral',
        subject,
        skillId,
        ref: q.id,
        level: q.level,
        reason,
        seconds: Math.min(q.seconds, 420),
      })
      used += Math.min(q.seconds, 420)
    }
  }

  return items
}

/**
 * Construit une séance de `minutes` minutes.
 * Le résultat est déterministe pour un état donné : deux appels successifs
 * produisent la même séance, ce qui permet de la reprendre après fermeture.
 */
export function buildSession(state: AppState, opts: SessionOptions): SessionItem[] {
  const day = opts.day ?? today()
  const budget = opts.minutes * 60
  const items: SessionItem[] = []
  let used = 0

  // Compétence imposée : on ne construit que sur elle.
  if (opts.skillId) {
    const skill = getSkill(opts.skillId)
    if (!skill) return []
    return itemsForSkill(state, skill.id, skill.subject, 'nouveau', budget, opts.diagnostic, opts.nonce)
  }

  const all = candidates(state, day, opts.subject)
  if (!all.length) return []

  const byReason = (r: SessionItem['reason']) =>
    all
      .filter((c) => c.reason === r)
      .sort((a, b) => {
        const sa = state.skills[a.skillId]
        const sb = state.skills[b.skillId]
        const rankDiff = stateRank(sa?.state ?? 'non-evaluee') - stateRank(sb?.state ?? 'non-evaluee')
        if (rankDiff !== 0) return rankDiff
        return orderIndex(a.skillId, a.subject) - orderIndex(b.skillId, b.subject)
      })

  // Règle 1 : au plus deux rappels de révision, même en cas de retard.
  const plan: Candidate[] = opts.diagnostic
    ? // Bilan : on alterne les matières, une compétence prioritaire par matière.
      (['calculs', 'francais', 'sante', 'oral'] as Subject[]).flatMap((sub) =>
        all
          .filter((c) => c.subject === sub && getSkill(c.skillId)?.priority === 'P1')
          .sort((a, b) => orderIndex(a.skillId, a.subject) - orderIndex(b.skillId, b.subject))
          .slice(0, 2),
      )
    : [
        ...byReason('revision').slice(0, MAX_REVIEWS_PER_SESSION),
        ...byReason('difficulte').slice(0, 1),
        ...byReason('nouveau').slice(0, 2),
        ...byReason('rappel').slice(0, 2),
        ...byReason('transfert').slice(0, 1),
      ]

  const usedSkills = new Set<string>()
  let reviewsPlaced = 0
  for (const c of plan) {
    if (used >= budget) break
    if (usedSkills.has(c.skillId)) continue
    usedSkills.add(c.skillId)
    if (c.reason === 'revision') reviewsPlaced += 1
    const remaining = budget - used
    // En bilan, la part est égale entre les compétences retenues : c'est ce qui
    // permet de couvrir réellement les quatre matières. Le tiers de séance
    // suffisait à en épuiser le budget dès la troisième compétence.
    const share = opts.diagnostic
      ? Math.max(120, Math.min(remaining, Math.floor(budget / Math.max(1, plan.length))))
      : Math.max(120, Math.min(remaining, Math.round(budget / 3)))
    const produced = itemsForSkill(state, c.skillId, c.subject, c.reason, share, opts.diagnostic, opts.nonce)
    for (const it of produced) {
      if (used >= budget) break
      items.push(it)
      used += it.seconds
    }
  }

  // Si la séance est trop courte, on complète avec la suite du plan — sans
  // jamais dépasser le plafond de rappels de révision (règle 1).
  if (!opts.diagnostic && used < budget * 0.6) {
    for (const c of all.sort((a, b) => b.score - a.score)) {
      if (used >= budget) break
      if (usedSkills.has(c.skillId)) continue
      if (c.reason === 'revision' && reviewsPlaced >= MAX_REVIEWS_PER_SESSION) continue
      usedSkills.add(c.skillId)
      if (c.reason === 'revision') reviewsPlaced += 1
      const produced = itemsForSkill(state, c.skillId, c.subject, c.reason, budget - used, opts.diagnostic, opts.nonce)
      for (const it of produced) {
        if (used >= budget) break
        items.push(it)
        used += it.seconds
      }
    }
  }

  return items
}

export type Priority = {
  skillId: string
  subject: Subject
  reason: SessionItem['reason']
  /** Phrase affichée telle quelle sur l'écran d'accueil. */
  sentence: string
}

/** La seule priorité affichée sur « Aujourd'hui ». */
export function pickPriority(state: AppState, day = today()): Priority | null {
  const all = candidates(state, day)
  if (!all.length) return null
  const best = all.sort((a, b) => b.score - a.score)[0]!
  const skill = getSkill(best.skillId)!
  const sentence =
    best.reason === 'revision'
      ? `Revoir « ${skill.title} » : c’est le bon moment pour que cela tienne dans la durée.`
      : best.reason === 'difficulte'
        ? `Reprendre « ${skill.title} » plus simplement : les derniers essais n’ont pas abouti.`
        : best.reason === 'nouveau'
          ? `Découvrir « ${skill.title} ».`
          : best.reason === 'rappel'
            ? `Confirmer « ${skill.title} » en le refaisant seule.`
            : `Appliquer « ${skill.title} » à une situation nouvelle.`
  return { skillId: best.skillId, subject: best.subject, reason: best.reason, sentence }
}

/** Phrase expliquant ce que la séance va apporter. */
export function describeSession(items: SessionItem[]): string {
  if (!items.length) return 'Aucun contenu disponible pour le moment.'
  const subjects = [...new Set(items.map((i) => i.subject))]
  const labels: Record<Subject, string> = {
    calculs: 'des calculs',
    francais: 'du français',
    sante: 'de la culture sanitaire et sociale',
    oral: 'de l’oral',
  }
  const parts = subjects.map((s) => labels[s])
  const list =
    parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(', ')} et ${parts[parts.length - 1]}`
  const hasReview = items.some((i) => i.reason === 'revision')
  const hasNew = items.some((i) => i.reason === 'nouveau')
  if (hasReview && hasNew) return `Cette séance mêle un rappel et une notion nouvelle, sur ${list}.`
  if (hasReview) return `Cette séance consolide ce que vous avez déjà travaillé, sur ${list}.`
  if (hasNew) return `Cette séance introduit une notion nouvelle, sur ${list}.`
  return `Cette séance reprend ${list} pour confirmer ce qui est en cours d’acquisition.`
}
