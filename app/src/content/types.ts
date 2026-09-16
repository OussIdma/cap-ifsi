/**
 * Modèle de contenu.
 *
 * Les contenus vivent dans `src/content/**` sous forme de données typées.
 * Les composants d'interface ne connaissent que ces types : ajouter une leçon
 * ou un exercice ne demande jamais de modifier un composant.
 */

import type { AnswerSpec, ErrorTag } from '@/engine/answer'
import type { Rng } from '@/engine/rng'

export type Subject = 'calculs' | 'francais' | 'sante' | 'oral'

export const SUBJECT_LABELS: Record<Subject, string> = {
  calculs: 'Calculs',
  francais: 'Français et expression écrite',
  sante: 'Culture sanitaire et sociale',
  oral: 'Entretien professionnel',
}

export const SUBJECT_SHORT: Record<Subject, string> = {
  calculs: 'Calculs',
  francais: 'Français',
  sante: 'Culture',
  oral: 'Oral',
}

/** Les trois niveaux affichés à l'utilisatrice. */
export type Level = 'decouverte' | 'entrainement' | 'epreuve'

export const LEVEL_LABELS: Record<Level, string> = {
  decouverte: 'Je découvre',
  entrainement: 'Je m’entraîne',
  epreuve: 'Je me prépare à l’épreuve',
}

export const LEVELS: Level[] = ['decouverte', 'entrainement', 'epreuve']

/** Statut de la compétence par rapport au texte réglementaire. */
export type SkillStatus = 'socle-national' | 'preparation-pedagogique' | 'complement'

export const STATUS_LABELS: Record<SkillStatus, string> = {
  'socle-national': 'Socle explicitement cité par l’arrêté',
  'preparation-pedagogique': 'Préparation pédagogique (choix de conception)',
  complement: 'Complément, hors socle de sélection',
}

/** Où en est le contrôle qualité d'un contenu. Jamais « validé humainement » sans acte humain. */
export type ReviewState =
  /** Rédigé, non couvert par des tests automatiques. */
  | 'brouillon'
  /** Couvert par des tests automatiques réussis (calculs, cohérence). */
  | 'teste-automatiquement'
  /** Relu ligne à ligne par le modèle qui l'a écrit, en plus des tests. */
  | 'relu-par-le-modele'
  /** Validé par une personne. Ne doit être posé que par une action humaine. */
  | 'valide-humainement'

export const REVIEW_LABELS: Record<ReviewState, string> = {
  brouillon: 'Brouillon — non publié dans les séances',
  'teste-automatiquement': 'Tests automatiques réussis',
  'relu-par-le-modele': 'Tests automatiques + relecture éditoriale par le modèle',
  'valide-humainement': 'Validé par une personne',
}

/** Un contenu n'alimente les séances qu'à partir de ce niveau de contrôle. */
export const PUBLISHABLE: ReviewState[] = ['teste-automatiquement', 'relu-par-le-modele', 'valide-humainement']

// ---------------------------------------------------------------------------
// Blocs de contenu affichables
// ---------------------------------------------------------------------------

export type Visual =
  /** Barre de fraction : `parts` parts égales, `filled` colorées. */
  | { type: 'fraction'; parts: number; filled: number; caption?: string; label?: string }
  /** Plusieurs barres de fraction à comparer. */
  | { type: 'fraction-compare'; bars: { parts: number; filled: number; label: string }[]; caption?: string }
  /** Tableau de conversion d'unités avec une valeur placée. */
  | {
      type: 'conversion'
      units: string[]
      /** Chiffres placés colonne par colonne, indexés comme `units`. */
      digits: (string | null)[]
      /** Position de la virgule : après la colonne d'indice `commaAfter`. */
      commaAfter: number
      caption?: string
    }
  /** Ligne de temps pour les durées et horaires. */
  | {
      type: 'timeline'
      from: number
      to: number
      marks: { at: number; label: string; strong?: boolean }[]
      spans: { from: number; to: number; label: string }[]
      caption?: string
    }
  /** Tableau simple. */
  | { type: 'table'; headers: string[]; rows: string[][]; caption?: string; align?: ('left' | 'right')[] }
  /** Tableau de proportionnalité à deux lignes, avec flèches multiplicatives. */
  | {
      type: 'proportion'
      topLabel: string
      bottomLabel: string
      columns: { top: string; bottom: string; highlight?: boolean }[]
      operator?: string
      caption?: string
    }
  /** Suite d'étapes de calcul alignées. */
  | { type: 'calc-steps'; steps: { calc: string; why?: string }[]; caption?: string }
  /** Droite graduée. */
  | { type: 'numberline'; from: number; to: number; step: number; marks: { at: number; label: string }[]; caption?: string }
  /** Diagramme en barres simple pour la lecture de données. */
  | { type: 'bars'; label: string; items: { name: string; value: number }[]; unit?: string; caption?: string }

export type Block =
  | { type: 'p'; text: string }
  | { type: 'lead'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'key'; title?: string; text: string }
  | { type: 'warn'; title?: string; text: string }
  | { type: 'vocab'; items: { term: string; def: string }[] }
  | { type: 'visual'; visual: Visual }
  | { type: 'quote'; text: string; source?: string }
  | { type: 'heading'; text: string }

// ---------------------------------------------------------------------------
// Compétences
// ---------------------------------------------------------------------------

export type Skill = {
  readonly id: string
  readonly subject: Subject
  readonly title: string
  /** À quoi cela sert, en une phrase. */
  readonly purpose: string
  readonly objectives: readonly string[]
  readonly prerequisites: readonly string[]
  readonly priority: 'P1' | 'P2' | 'P3'
  readonly status: SkillStatus
}

// ---------------------------------------------------------------------------
// Leçons
// ---------------------------------------------------------------------------

export type WorkedStep = {
  /** Ce qu'on fait. */
  readonly do: string
  /** Pourquoi on le fait — c'est la partie qui manque dans la plupart des corrigés. */
  readonly why: string
  readonly calc?: string
}

export type WorkedExample = {
  readonly statement: string
  readonly steps: readonly WorkedStep[]
  readonly conclusion: string
  readonly visual?: Visual
}

export type Lesson = {
  readonly skillId: string
  /** Explication courte, en français simple. */
  readonly explanation: readonly Block[]
  /** Une autre façon de dire la même chose, pour « Explique-moi autrement ». */
  readonly alternative: readonly Block[]
  readonly workedExamples: readonly WorkedExample[]
  readonly commonMistakes: readonly { mistake: string; fix: string; tag: ErrorTag }[]
  readonly review: ReviewState
  /** Sources, quand le contenu affirme un fait vérifiable. */
  readonly sources?: readonly SourceRef[]
}

export type SourceRef = {
  readonly label: string
  readonly url?: string
  /** Date de consultation réelle. Absente si non consultée dans cette session. */
  readonly checkedOn?: string
  readonly note?: string
}

// ---------------------------------------------------------------------------
// Exercices
// ---------------------------------------------------------------------------

export type SolutionStep = {
  readonly text: string
  readonly calc?: string
  readonly why?: string
  readonly visual?: Visual
}

export type GeneratedExercise = {
  /** Énoncé. */
  readonly prompt: readonly Block[]
  /** La question posée, courte. */
  readonly question: string
  readonly answer: AnswerSpec
  /** Indice 1 : aide à démarrer. Indice 2 : donne la méthode. Aucun ne donne la réponse. */
  readonly hints: readonly [string, string]
  /** Explication autrement, propre à cet exercice. */
  readonly alternative: readonly Block[]
  readonly solution: readonly SolutionStep[]
  /** Aide de saisie affichée dans le champ. */
  readonly placeholder?: string
  /** Type de clavier mobile à ouvrir. */
  readonly keyboard?: 'decimal' | 'text' | 'time'
  /** Unité affichée à droite du champ quand elle est imposée. */
  readonly suffix?: string
  /** Phrase de conclusion attendue, affichée dans la correction. */
  readonly conclusion?: string
}

export type ExerciseTemplate = {
  readonly id: string
  readonly skillId: string
  readonly level: Level
  /** Nom de la structure de problème — sert à la matrice de couverture. */
  readonly structure: string
  /** Version du gabarit : change quand l'énoncé ou le corrigé change. */
  readonly version: number
  readonly review: ReviewState
  /** Marque un exercice de transfert (application différente). */
  readonly transfer?: boolean
  /** Compétence de repli quand l'exercice est raté plusieurs fois. */
  readonly fallbackSkillId?: string
  readonly generate: (rng: Rng) => GeneratedExercise
  /** Durée indicative en secondes, pour construire une séance. */
  readonly seconds: number
}

// ---------------------------------------------------------------------------
// Fiches sanitaires et sociales
// ---------------------------------------------------------------------------

export type HealthSheet = {
  readonly id: string
  readonly title: string
  readonly purpose: string
  readonly definition: readonly Block[]
  readonly vocabulary: readonly { term: string; def: string }[]
  readonly stakes: readonly Block[]
  readonly example: readonly Block[]
  readonly professionals: readonly Block[]
  readonly comprehension: readonly ComprehensionQuestion[]
  readonly argument: ArgumentTask
  readonly sources: readonly SourceRef[]
  readonly review: ReviewState
}

export type ComprehensionQuestion = {
  readonly id: string
  readonly question: string
  readonly answer: AnswerSpec
  readonly explain: string
}

export type ArgumentTask = {
  readonly id: string
  readonly prompt: string
  readonly guidance: readonly string[]
  /** Corrigé de référence, présenté comme une réponse recevable parmi d'autres. */
  readonly reference: readonly Block[]
  readonly criteria: readonly Criterion[]
  readonly minWords: number
}

// ---------------------------------------------------------------------------
// Rédaction
// ---------------------------------------------------------------------------

export type Criterion = {
  readonly id: string
  readonly label: string
  readonly points: number
  /** Ce qu'il faut voir dans la copie pour cocher ce critère. */
  readonly evidence: readonly string[]
}

export type WrittenTask = {
  readonly id: string
  readonly skillIds: readonly string[]
  readonly title: string
  readonly level: Level
  /** Texte support original, ou absence de texte. */
  readonly support?: readonly Block[]
  readonly instruction: string
  readonly minutes: number
  readonly minWords: number
  readonly maxWords?: number
  readonly guidance: readonly string[]
  readonly criteria: readonly Criterion[]
  /** Corrigé de référence complet. */
  readonly reference: readonly Block[]
  /** Deux réponses de qualité différente, avec ce qui les sépare. */
  readonly comparison?: {
    readonly weak: { text: string; comment: string }
    readonly strong: { text: string; comment: string }
    readonly difference: string
  }
  readonly otherAcceptable: readonly string[]
  readonly origin: string
  readonly review: ReviewState
}

/** Micro-exercice de français : court, corrigé automatiquement. */
export type FrenchExercise = {
  readonly id: string
  readonly skillId: string
  readonly level: Level
  readonly structure: string
  readonly version: number
  readonly review: ReviewState
  readonly prompt: readonly Block[]
  readonly question: string
  readonly answer: AnswerSpec
  readonly hints: readonly [string, string]
  readonly alternative: readonly Block[]
  readonly solution: readonly SolutionStep[]
  readonly transfer?: boolean
  readonly seconds: number
  readonly placeholder?: string
}

// ---------------------------------------------------------------------------
// Oral
// ---------------------------------------------------------------------------

export type OralQuestion = {
  readonly id: string
  readonly skillId: string
  readonly axis: string
  readonly question: string
  readonly level: Level
  /** Relances possibles du jury. */
  readonly followUps: readonly string[]
  /** Ce que le jury cherche à entendre. */
  readonly looksFor: readonly string[]
  /** Pièges à éviter. */
  readonly avoid: readonly string[]
  /** Trame de préparation : les cases à remplir par l'utilisatrice, jamais par l'application. */
  readonly frame: readonly { id: string; label: string; help: string }[]
  readonly criteria: readonly Criterion[]
  readonly seconds: number
  readonly review: ReviewState
}

// ---------------------------------------------------------------------------
// Examens blancs
// ---------------------------------------------------------------------------

export type ExamPaper = {
  readonly id: string
  readonly title: string
  readonly number: number
  readonly origin: string
  readonly review: ReviewState
  /** Sous-épreuve écrite de culture / rédaction, 30 minutes, sur 10. */
  readonly writing: {
    readonly support?: readonly Block[]
    readonly questions: readonly {
      id: string
      instruction: string
      points: number
      minWords: number
      criteria: readonly Criterion[]
      reference: readonly Block[]
    }[]
  }
  /** Sous-épreuve de calculs, 30 minutes, sur 10. */
  readonly maths: readonly {
    readonly id: string
    readonly points: number
    /** Gabarit utilisé et graine fixée : l'énoncé est reproductible. */
    readonly templateId: string
    readonly seed: number
  }[]
}
