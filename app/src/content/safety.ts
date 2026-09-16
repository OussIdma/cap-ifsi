/**
 * Garde-fous appliqués à tout exercice avant affichage.
 *
 * Un « piège » déclaré par l'auteur désigne une réponse fausse fréquente. Pour
 * certaines valeurs tirées au sort, cette réponse fausse peut coïncider avec la
 * bonne réponse : la correction se contredirait alors elle-même. On retire ces
 * pièges avant affichage, en plus des conditions posées dans les gabarits.
 */

import { grade, type AnswerSpec } from '@/engine/answer'
import type { GeneratedExercise } from './types'

export function prunePitfalls<T extends AnswerSpec>(spec: T): T {
  if (!('pitfalls' in spec) || !spec.pitfalls?.length) return spec
  const kept = spec.pitfalls.filter((p) => !grade(spec, p.answer).correct)
  return kept.length === spec.pitfalls.length ? spec : ({ ...spec, pitfalls: kept } as T)
}

export function safeExercise(ex: GeneratedExercise): GeneratedExercise {
  const answer = prunePitfalls(ex.answer)
  return answer === ex.answer ? ex : { ...ex, answer }
}
