/**
 * Forme des données enregistrées sur l'appareil.
 *
 * Tout tient dans un seul objet JSON, versionné. Les migrations sont explicites
 * et ne suppriment jamais de données qu'elles ne savent pas relire : un champ
 * inconnu est conservé tel quel dans `unknownFields`.
 */

import type { ErrorTag } from '@/engine/answer'
import type { Level, Subject } from '@/content/types'

export const SCHEMA_VERSION = 4
export const STORAGE_KEY = 'prepa-ifsi-2027:v1'

export type MasteryState = 'non-evaluee' | 'fragile' | 'a-consolider' | 'consolidee'

export const MASTERY_LABELS: Record<MasteryState, string> = {
  'non-evaluee': 'Non évaluée',
  fragile: 'À reprendre',
  'a-consolider': 'À consolider',
  consolidee: 'Consolidée',
}

export const MASTERY_HELP: Record<MasteryState, string> = {
  'non-evaluee': 'Vous n’avez pas encore fait d’exercice sur cette compétence.',
  fragile: 'Les derniers essais n’ont pas abouti. On repart d’une explication plus simple.',
  'a-consolider': 'Vous y arrivez, souvent avec une aide. Il faut le refaire seule pour confirmer.',
  consolidee: 'Réussi seule, sur plusieurs types d’exercices et sur plusieurs jours.',
}

export type SkillProgress = {
  state: MasteryState
  /** Réussites sans aucun indice. */
  successesUnaided: number
  /** Réussites avec au moins un indice ou après une correction. */
  successesAided: number
  failures: number
  consecutiveFailures: number
  /** Structures de problème réussies sans aide — la variété compte. */
  structuresPassed: string[]
  /** Dates (AAAA-MM-JJ) de séances avec au moins une réussite autonome. */
  daysWithUnaidedSuccess: string[]
  lastSeen?: string
  /** Prochaine révision prévue (AAAA-MM-JJ). */
  nextReview?: string
  /** Position dans la suite J+1, J+3, J+7, J+14. */
  reviewStep: number
  /** Compteur servant à produire des graines différentes à chaque rencontre. */
  seenCounter: number
  /** Leçon lue au moins une fois. */
  lessonRead: boolean
}

export function emptySkillProgress(): SkillProgress {
  return {
    state: 'non-evaluee',
    successesUnaided: 0,
    successesAided: 0,
    failures: 0,
    consecutiveFailures: 0,
    structuresPassed: [],
    daysWithUnaidedSuccess: [],
    reviewStep: 0,
    seenCounter: 0,
    lessonRead: false,
  }
}

export type Attempt = {
  id: string
  at: string
  skillId: string
  subject: Subject
  itemKind: 'maths' | 'francais' | 'sante' | 'oral' | 'redaction'
  templateId: string
  /** Graine ou identifiant d'item fixe, pour retrouver l'énoncé exact. */
  seed?: number
  version: number
  level: Level
  structure: string
  correct: boolean
  hintsUsed: number
  usedAlternative: boolean
  tag?: ErrorTag
  seconds: number
  mode: 'seance' | 'libre' | 'examen'
  /** Réponse saisie, conservée pour le carnet d'erreurs. */
  given?: string
}

export type SessionItemKind = 'lecon' | 'exercice' | 'francais' | 'fiche' | 'oral' | 'redaction'

export type SessionItem = {
  id: string
  kind: SessionItemKind
  subject: Subject
  skillId: string
  /** Gabarit d'exercice ou identifiant du contenu fixe. */
  ref: string
  seed?: number
  level: Level
  /** Pourquoi cet item est là — affiché à l'utilisatrice. */
  reason: 'rappel' | 'difficulte' | 'nouveau' | 'revision' | 'transfert'
  seconds: number
}

export type ItemAnswer = {
  /** Réponse en cours de saisie, sauvegardée même si la séance est interrompue. */
  draft: string
  /** Choix cochés, pour les QCM. */
  picked: string[]
  hintsUsed: number
  usedAlternative: boolean
  submitted: boolean
  correct?: boolean
  tag?: ErrorTag
  message?: string
  /** Secondes passées, cumulées. */
  seconds: number
  /** Exercice supplémentaire demandé après une erreur. */
  retrySeed?: number
}

export type ActiveSession = {
  id: string
  startedAt: string
  /** Durée choisie : 10, 20 ou 30 minutes. */
  minutes: number
  items: SessionItem[]
  index: number
  answers: Record<string, ItemAnswer>
  /** Items ajoutés en cours de route (nouvel exercice après une erreur). */
  finishedAt?: string
}

export type ExamRun = {
  id: string
  paperId: string
  startedAt: string
  /** `epreuve` = conditions strictes ; `entrainement` = pauses autorisées. */
  mode: 'epreuve' | 'entrainement'
  /** Étape courante. */
  phase: 'redaction' | 'pause' | 'calculs' | 'rendu' | 'corrige'
  /** Horodatage de fin de la phase en cours (ms epoch) — survit au rechargement. */
  phaseEndsAt?: number
  /** Temps restant figé pendant une pause d'entraînement (ms). */
  pausedRemaining?: number
  writing: Record<string, string>
  maths: Record<string, string>
  submittedAt?: string
  /** Notes : la rédaction est auto-évaluée, donc indicative. */
  scores?: {
    maths: number
    mathsMax: number
    writing?: number
    writingMax: number
    writingSelfAssessed: boolean
    oral?: number
    oralMax: number
    oralSelfAssessed: boolean
  }
  /** Critères cochés lors de l'autoévaluation de la rédaction. */
  writingCriteria: Record<string, boolean>
}

export type OralPrep = {
  questionId: string
  /** Réponses de la trame, écrites par l'utilisatrice uniquement. */
  frame: Record<string, string>
  notes: string
  /** Critères cochés en autoévaluation. */
  criteria: Record<string, boolean>
  updatedAt: string
  timesPracticed: number
  /** Enregistrements audio locaux (clé IndexedDB), jamais envoyés ailleurs. */
  recordings: { id: string; createdAt: string; seconds: number }[]
}

export type ChecklistItemState = {
  id: string
  done: boolean
  note: string
  updatedAt?: string
}

export type CandidatureState = {
  items: Record<string, ChecklistItemState>
  /** Dates confirmées par une source officielle, saisies par l'utilisatrice. */
  confirmedDates: {
    id: string
    label: string
    date: string
    source: string
    verifiedOn: string
  }[]
  /** Questions envoyées aux instituts, avec la date d'envoi. */
  contacts: { id: string; institute: string; sentOn?: string; answeredOn?: string; answer: string }[]
}

export type Settings = {
  textScale: number
  contrast: 'normal' | 'fort'
  /** Rappel de révision affiché dans l'application (aucune notification système). */
  reminder: boolean
  /** L'utilisatrice a-t-elle accepté l'enregistrement audio local ? */
  audioConsent: boolean
}

export type Profile = {
  firstName: string
  dailyMinutes: number
  startPreference: Subject | 'bilan' | null
  createdAt: string
  onboarded: boolean
}

export type AppState = {
  version: number
  profile: Profile
  settings: Settings
  skills: Record<string, SkillProgress>
  attempts: Attempt[]
  session: ActiveSession | null
  /** Brouillons de rédaction, hors examen. */
  drafts: Record<string, { text: string; updatedAt: string }>
  /** Autoévaluations de rédaction hors examen. */
  writtenSelf: Record<string, { criteria: Record<string, boolean>; updatedAt: string }>
  exams: ExamRun[]
  oral: Record<string, OralPrep>
  candidature: CandidatureState
  /** Journal des jours où au moins une séance a été faite. */
  activeDays: string[]
  /** Fiches lues. */
  sheetsRead: string[]
  /**
   * Nombre de séances ouvertes depuis le début. Sert uniquement à varier les
   * énoncés : sans lui, rouvrir une séance sans avoir répondu redonnait
   * exactement le même exercice.
   */
  sessionsStarted: number
}

export function initialState(now = new Date()): AppState {
  return {
    version: SCHEMA_VERSION,
    profile: {
      firstName: '',
      dailyMinutes: 20,
      startPreference: null,
      createdAt: now.toISOString(),
      onboarded: false,
    },
    settings: { textScale: 1, contrast: 'normal', reminder: true, audioConsent: false },
    skills: {},
    attempts: [],
    session: null,
    drafts: {},
    writtenSelf: {},
    exams: [],
    oral: {},
    candidature: { items: {}, confirmedDates: [], contacts: [] },
    activeDays: [],
    sheetsRead: [],
    sessionsStarted: 0,
  }
}
