/**
 * Moteur de progression — explicable, sans boîte noire.
 *
 * Les règles ci-dessous sont des choix pédagogiques assumés, pas un diagnostic
 * scientifique du niveau. Elles sont écrites pour pouvoir être expliquées à
 * l'utilisatrice en une phrase chacune, et testées.
 *
 *  1. Deux échecs de suite sur une compétence → on repart d'une explication et
 *     d'un exercice plus accessible.
 *  2. Une réussite obtenue avec un indice ou après « Explique-moi autrement »
 *     compte comme « à consolider », jamais comme « consolidée ».
 *  3. Il faut réussir seule sur au moins deux structures de problème
 *     différentes ET sur au moins deux jours différents pour « consolidée ».
 *  4. Révisions espacées : J+1, J+3, J+7, J+14. Un échec ramène à J+1.
 *  5. Après une absence, on ne réclame pas toute la dette de révision d'un coup.
 */

import { emptySkillProgress, type Attempt, type MasteryState, type SkillProgress } from '@/store/schema'

export const REVIEW_STEPS_DAYS = [1, 3, 7, 14] as const

export function today(d = new Date()): string {
  return toDay(d)
}

export function toDay(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function addDays(day: string, n: number): string {
  const [y, m, d] = day.split('-').map(Number)
  const date = new Date(y!, (m ?? 1) - 1, d ?? 1)
  date.setDate(date.getDate() + n)
  return toDay(date)
}

export function daysBetween(from: string, to: string): number {
  const a = new Date(from + 'T00:00:00')
  const b = new Date(to + 'T00:00:00')
  return Math.round((b.getTime() - a.getTime()) / 86400000)
}

/** Nombre de structures différentes à réussir seule avant de parler de consolidation. */
export const STRUCTURES_FOR_MASTERY = 2
export const DAYS_FOR_MASTERY = 2

export type AttemptOutcome = Pick<
  Attempt,
  'correct' | 'hintsUsed' | 'usedAlternative' | 'structure'
>

/** Applique une tentative à la progression d'une compétence. */
export function applyAttempt(
  previous: SkillProgress | undefined,
  outcome: AttemptOutcome,
  day: string,
): SkillProgress {
  const p: SkillProgress = { ...(previous ?? emptySkillProgress()) }
  p.structuresPassed = [...p.structuresPassed]
  p.daysWithUnaidedSuccess = [...p.daysWithUnaidedSuccess]
  p.lastSeen = day
  p.seenCounter += 1

  const aided = outcome.hintsUsed > 0 || outcome.usedAlternative

  if (!outcome.correct) {
    p.failures += 1
    p.consecutiveFailures += 1
    // Règle 1 : deux échecs de suite ramènent la compétence à « à reprendre ».
    if (p.consecutiveFailures >= 2) p.state = 'fragile'
    else if (p.state === 'consolidee') p.state = 'a-consolider'
    else if (p.state === 'non-evaluee') p.state = 'a-consolider'
    // Règle 4 : un échec ramène la révision à J+1.
    p.reviewStep = 0
    p.nextReview = addDays(day, REVIEW_STEPS_DAYS[0])
    return p
  }

  p.consecutiveFailures = 0
  if (aided) {
    p.successesAided += 1
    // Règle 2 : réussite aidée = à consolider.
    if (p.state !== 'consolidee') p.state = 'a-consolider'
  } else {
    p.successesUnaided += 1
    if (!p.structuresPassed.includes(outcome.structure)) p.structuresPassed.push(outcome.structure)
    if (!p.daysWithUnaidedSuccess.includes(day)) p.daysWithUnaidedSuccess.push(day)
    // Règle 3 : variété des structures et répétition dans le temps.
    p.state =
      p.structuresPassed.length >= STRUCTURES_FOR_MASTERY &&
      p.daysWithUnaidedSuccess.length >= DAYS_FOR_MASTERY
        ? 'consolidee'
        : 'a-consolider'
  }

  // Règle 4 : la première réussite renvoie à J+1, puis l'écart s'allonge.
  // L'espacement n'augmente qu'après une réussite obtenue sans aide.
  p.nextReview = addDays(day, REVIEW_STEPS_DAYS[p.reviewStep]!)
  if (!aided) p.reviewStep = Math.min(p.reviewStep + 1, REVIEW_STEPS_DAYS.length - 1)
  return p
}

/** Phrase courte expliquant l'état, affichée telle quelle dans l'interface. */
export function explainState(p: SkillProgress | undefined): string {
  if (!p || p.state === 'non-evaluee') return 'Pas encore travaillée.'
  switch (p.state) {
    case 'fragile':
      return `Les ${p.consecutiveFailures} derniers essais n’ont pas abouti. On reprend plus simplement.`
    case 'a-consolider': {
      const missingStructures = Math.max(0, STRUCTURES_FOR_MASTERY - p.structuresPassed.length)
      const missingDays = Math.max(0, DAYS_FOR_MASTERY - p.daysWithUnaidedSuccess.length)
      if (p.successesUnaided === 0) return 'Réussi avec de l’aide. À refaire seule pour confirmer.'
      if (missingStructures > 0)
        return `Réussi seule. Il manque ${missingStructures} type d’exercice différent pour confirmer.`
      if (missingDays > 0) return 'Réussi seule aujourd’hui. À refaire un autre jour pour confirmer.'
      return 'Presque consolidée.'
    }
    case 'consolidee':
      return `Réussi seule sur ${p.structuresPassed.length} types d’exercices, sur ${p.daysWithUnaidedSuccess.length} jours.`
    default:
      return ''
  }
}

/**
 * Révisions en retard après une absence.
 * Règle 5 : au lieu de tout réclamer, on étale. `maxPerSession` limite ce qui
 * revient aujourd'hui, et le reste est repoussé d'un jour à la fois.
 */
export function softenBacklog(
  skills: Record<string, SkillProgress>,
  day: string,
  maxDue: number,
): Record<string, SkillProgress> {
  const due = Object.entries(skills)
    .filter(([, p]) => p.nextReview && p.nextReview <= day)
    .sort((a, b) => (a[1].nextReview! < b[1].nextReview! ? -1 : 1))
  if (due.length <= maxDue) return skills
  const out = { ...skills }
  // Les plus anciennes restent dues aujourd'hui, les autres sont réparties.
  due.slice(maxDue).forEach(([id, p], i) => {
    out[id] = { ...p, nextReview: addDays(day, 1 + Math.floor(i / maxDue)) }
  })
  return out
}

export function isDue(p: SkillProgress | undefined, day: string): boolean {
  return !!p?.nextReview && p.nextReview <= day
}

export function stateRank(s: MasteryState): number {
  return { 'non-evaluee': 0, fragile: 1, 'a-consolider': 2, consolidee: 3 }[s]
}
