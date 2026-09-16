/**
 * Petit constructeur pour écrire les micro-exercices de français sous forme de
 * données compactes. Aucune logique pédagogique ici : uniquement de la mise en
 * forme vers le type `FrenchExercise`.
 */

import type { Block, FrenchExercise, Level, SolutionStep } from '../types'
import { p } from '../blocks'

export type MiniChoice = { label: string; ok?: boolean; why?: string }

export type Mini = {
  id: string
  skill: string
  level?: Level
  structure: string
  /** Texte support, affiché en style lecture. */
  text?: string
  /** Blocs supplémentaires avant la question. */
  before?: Block[]
  q: string
  choices?: MiniChoice[]
  /** Plusieurs bonnes réponses à cocher. */
  multiple?: boolean
  /** Réponse libre courte : écritures acceptées. */
  accept?: string[]
  /** Remise en ordre : les items sont donnés dans le bon ordre. */
  order?: { id: string; label: string }[]
  h: [string, string]
  alt: string[]
  sol: (string | SolutionStep)[]
  sec?: number
  transfer?: boolean
  placeholder?: string
}

function toStep(s: string | SolutionStep): SolutionStep {
  return typeof s === 'string' ? { text: s } : s
}

export function mini(m: Mini): FrenchExercise {
  const prompt: Block[] = [
    ...(m.text ? [p(m.text)] : []),
    ...(m.before ?? []),
  ]

  let answer: FrenchExercise['answer']
  if (m.choices) {
    const options = m.choices.map((c, i) => ({
      id: `c${i}`,
      label: c.label,
      feedback: c.ok ? '' : (c.why ?? 'Cette réponse ne correspond pas à la consigne.'),
      tag: 'consigne' as const,
    }))
    answer = {
      kind: 'choice',
      options,
      correct: m.choices.map((c, i) => (c.ok ? `c${i}` : null)).filter((x): x is string => x !== null),
      multiple: m.multiple,
    }
  } else if (m.order) {
    answer = {
      kind: 'order',
      items: m.order,
      correct: m.order.map((o) => o.id),
    }
  } else {
    answer = { kind: 'text', accept: m.accept ?? [] }
  }

  return {
    id: m.id,
    skillId: m.skill,
    level: m.level ?? 'entrainement',
    structure: m.structure,
    version: 1,
    review: 'teste-automatiquement',
    prompt,
    question: m.q,
    answer,
    hints: m.h,
    alternative: m.alt.map((t) => p(t)),
    solution: m.sol.map(toStep),
    transfer: m.transfer,
    seconds: m.sec ?? 50,
    placeholder: m.placeholder,
  }
}
