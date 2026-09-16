/**
 * Constructeur des fiches sanitaires, médico-sociales et sociales.
 *
 * Sur les sources : aucune fiche ne porte de date de consultation. Les
 * références listées indiquent où vérifier, et chaque fiche affiche
 * explicitement que les chiffres et les règles de droit doivent être contrôlés
 * à la source avant d'être utilisés comme des certitudes.
 */

import type { ArgumentTask, Block, ComprehensionQuestion, HealthSheet, SourceRef } from '../types'
import { p } from '../blocks'

export type SheetSpec = {
  id: string
  title: string
  purpose: string
  /** Définition simple, en français courant. */
  def: string[]
  vocab: { term: string; def: string }[]
  /** Enjeux : ce que cela change concrètement, et pour qui. */
  stakes: string[]
  /** Exemple entièrement fictif. */
  example: string[]
  /** Place des professionnels, dont l'infirmière. */
  pros: string[]
  /** Questions de compréhension à choix. */
  questions: {
    q: string
    choices: { label: string; ok?: boolean; why?: string }[]
    explain: string
  }[]
  /** Petite argumentation guidée. */
  argument: {
    prompt: string
    guidance: string[]
    reference: string[]
    minWords?: number
  }
  sources: SourceRef[]
}

const CRITERIA = [
  {
    id: 'consigne',
    label: 'La consigne est respectée',
    points: 2,
    evidence: ['Le nombre d’éléments demandés est présent', 'Le sujet traité est bien celui de la question'],
  },
  {
    id: 'connaissances',
    label: 'Les notions employées sont justes',
    points: 2,
    evidence: ['Le vocabulaire de la fiche est employé correctement', 'Aucune affirmation inventée ou non vérifiable'],
  },
  {
    id: 'analyse',
    label: 'Le raisonnement est construit',
    points: 3,
    evidence: ['Au moins une cause ou une conséquence est explicitée', 'Un exemple concret soutient le propos', 'Une limite ou une nuance apparaît'],
  },
  {
    id: 'structure',
    label: 'La réponse est organisée',
    points: 1,
    evidence: ['Les idées se suivent dans un ordre lisible', 'Une phrase de conclusion répond à la question'],
  },
  {
    id: 'langue',
    label: 'La langue est claire',
    points: 2,
    evidence: ['Phrases complètes et lisibles', 'Aucun jugement porté sur les personnes', 'Orthographe des accords courants'],
  },
]

export function sheet(spec: SheetSpec): HealthSheet {
  const questions: ComprehensionQuestion[] = spec.questions.map((q, i) => ({
    id: `${spec.id}-q${i + 1}`,
    question: q.q,
    answer: {
      kind: 'choice',
      options: q.choices.map((c, j) => ({
        id: `o${j}`,
        label: c.label,
        feedback: c.ok ? '' : (c.why ?? 'Cette réponse ne correspond pas à ce que dit la fiche.'),
        tag: 'raisonnement' as const,
      })),
      correct: q.choices.map((c, j) => (c.ok ? `o${j}` : null)).filter((x): x is string => x !== null),
    },
    explain: q.explain,
  }))

  const argument: ArgumentTask = {
    id: `${spec.id}-arg`,
    prompt: spec.argument.prompt,
    guidance: spec.argument.guidance,
    reference: spec.argument.reference.map((t) => p(t)),
    criteria: CRITERIA,
    minWords: spec.argument.minWords ?? 80,
  }

  const blocks = (xs: string[]): Block[] => xs.map((t) => p(t))

  return {
    id: spec.id,
    title: spec.title,
    purpose: spec.purpose,
    definition: blocks(spec.def),
    vocabulary: spec.vocab,
    stakes: blocks(spec.stakes),
    example: blocks(spec.example),
    professionals: blocks(spec.pros),
    comprehension: questions,
    argument,
    sources: spec.sources,
    review: 'relu-par-le-modele',
  }
}

/** Références institutionnelles, sans date de consultation inventée. */
export const REF = {
  spf: {
    label: 'Santé publique France',
    url: 'https://www.santepubliquefrance.fr',
    note: 'À consulter pour les données épidémiologiques et les campagnes de prévention. Non consultée depuis l’application.',
  },
  has: {
    label: 'Haute Autorité de santé',
    url: 'https://www.has-sante.fr',
    note: 'Recommandations de bonne pratique. À vérifier avant toute affirmation normative.',
  },
  drees: {
    label: 'DREES — statistiques santé et social',
    url: 'https://drees.solidarites-sante.gouv.fr',
    note: 'Chiffrages nationaux. Toute donnée chiffrée doit être reprise avec sa date.',
  },
  insee: {
    label: 'INSEE',
    url: 'https://www.insee.fr',
    note: 'Données démographiques et sociales. Vérifier le millésime.',
  },
  legifrance: {
    label: 'Légifrance',
    url: 'https://www.legifrance.gouv.fr',
    note: 'Texte de référence pour toute règle de droit citée. La version en vigueur doit être vérifiée.',
  },
  ameli: {
    label: 'Assurance maladie (ameli.fr)',
    url: 'https://www.ameli.fr',
    note: 'Droits, remboursements, dispositifs. Vérifier la date de mise à jour de la page.',
  },
  ministere: {
    label: 'Ministère chargé de la santé et des solidarités',
    url: 'https://sante.gouv.fr',
    note: 'Plans, dispositifs nationaux, définitions officielles.',
  },
  cnsa: {
    label: 'CNSA — Caisse nationale de solidarité pour l’autonomie',
    url: 'https://www.cnsa.fr',
    note: 'Autonomie, handicap, aidants.',
  },
} satisfies Record<string, SourceRef>
