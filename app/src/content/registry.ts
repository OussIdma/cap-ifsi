/**
 * Registre des contenus.
 *
 * Point d'entrée unique pour l'interface : aucun composant n'importe un fichier
 * de contenu directement. Ajouter une leçon ou un exercice se fait en modifiant
 * `src/content/**`, jamais un composant.
 *
 * Seuls les contenus dont l'état de contrôle est publiable alimentent les
 * séances. Un brouillon reste visible dans la matrice de couverture, mais il
 * n'est jamais proposé comme exercice et ne produit aucune maîtrise.
 */

import { createRng, seedFrom } from '@/engine/rng'
import { LESSONS_CALCULS, TEMPLATES_CALCULS } from './calculs'
import { FRENCH_EXERCISES, LESSONS_FRANCAIS } from './francais'
import { WRITTEN_TASKS as WRITTEN_1 } from './francais/sujets'
import { WRITTEN_TASKS_2 } from './francais/sujets-2'
import { HEALTH_SHEETS } from './sante'
import { LESSONS_ORAL } from './oral/lecons'
import { ORAL_QUESTIONS } from './oral/questions'
import { EXAM_PAPERS } from './exams/papers'
import { prunePitfalls, safeExercise } from './safety'
import { getSkill, SKILLS } from './skills'
import {
  PUBLISHABLE,
  type ExamPaper,
  type ExerciseTemplate,
  type FrenchExercise,
  type GeneratedExercise,
  type HealthSheet,
  type Lesson,
  type Level,
  type OralQuestion,
  type Skill,
  type Subject,
  type WrittenTask,
} from './types'

export { SKILLS, getSkill }
export const WRITTEN_TASKS: WrittenTask[] = [...WRITTEN_1, ...WRITTEN_TASKS_2]

export { EXAM_PAPERS, HEALTH_SHEETS, ORAL_QUESTIONS, FRENCH_EXERCISES }

export const LESSONS: Lesson[] = [...LESSONS_CALCULS, ...LESSONS_FRANCAIS, ...LESSONS_ORAL]

export const EXERCISE_TEMPLATES: ExerciseTemplate[] = [...TEMPLATES_CALCULS]

const LESSON_BY_SKILL = new Map(LESSONS.map((l) => [l.skillId, l]))
const TEMPLATE_BY_ID = new Map(EXERCISE_TEMPLATES.map((t) => [t.id, t]))
const FRENCH_BY_ID = new Map(FRENCH_EXERCISES.map((e) => [e.id, e]))
const SHEET_BY_ID = new Map(HEALTH_SHEETS.map((s) => [s.id, s]))
const ORAL_BY_ID = new Map(ORAL_QUESTIONS.map((q) => [q.id, q]))
const WRITTEN_BY_ID = new Map(WRITTEN_TASKS.map((w) => [w.id, w]))
const PAPER_BY_ID = new Map(EXAM_PAPERS.map((p) => [p.id, p]))

export const lessonFor = (skillId: string): Lesson | undefined => LESSON_BY_SKILL.get(skillId)
export const templateById = (id: string): ExerciseTemplate | undefined => TEMPLATE_BY_ID.get(id)
export const frenchById = (id: string): FrenchExercise | undefined => FRENCH_BY_ID.get(id)
export const sheetById = (id: string): HealthSheet | undefined => SHEET_BY_ID.get(id)
export const oralById = (id: string): OralQuestion | undefined => ORAL_BY_ID.get(id)
export const writtenById = (id: string): WrittenTask | undefined => WRITTEN_BY_ID.get(id)
export const paperById = (id: string): ExamPaper | undefined => PAPER_BY_ID.get(id)

const publishable = (state: string) => PUBLISHABLE.includes(state as never)

/** Gabarits d'exercices publiés pour une compétence, éventuellement filtrés par niveau. */
export function templatesFor(skillId: string, level?: Level): ExerciseTemplate[] {
  return EXERCISE_TEMPLATES.filter(
    (t) => t.skillId === skillId && publishable(t.review) && (!level || t.level === level),
  )
}

/** Micro-exercices de français publiés pour une compétence. */
export function frenchFor(skillId: string, level?: Level): FrenchExercise[] {
  return FRENCH_EXERCISES.filter(
    (e) => e.skillId === skillId && publishable(e.review) && (!level || e.level === level),
  )
}

export function oralFor(skillId: string): OralQuestion[] {
  return ORAL_QUESTIONS.filter((q) => q.skillId === skillId && publishable(q.review))
}

export function writtenFor(skillId: string): WrittenTask[] {
  return WRITTEN_TASKS.filter((w) => w.skillIds.includes(skillId) && publishable(w.review))
}

/** Produit un exercice reproductible à partir d'un gabarit et d'une graine. */
export function generate(templateId: string, seed: number): GeneratedExercise | undefined {
  const t = TEMPLATE_BY_ID.get(templateId)
  if (!t) return undefined
  return safeExercise(t.generate(createRng(seed)))
}

/** Micro-exercice de français, passé par les mêmes garde-fous. */
export function frenchExercise(id: string): FrenchExercise | undefined {
  const e = FRENCH_BY_ID.get(id)
  if (!e) return undefined
  const answer = prunePitfalls(e.answer)
  return answer === e.answer ? e : { ...e, answer }
}

/** Graine stable pour la n-ième rencontre d'un gabarit. */
export function seedFor(templateId: string, counter: number): number {
  return seedFrom(templateId, counter)
}

// ---------------------------------------------------------------------------
// Matrice de couverture — calculée à partir des contenus réellement présents
// ---------------------------------------------------------------------------

export type CoverageRow = {
  skill: Skill
  /** Une leçon publiée existe. */
  lesson: boolean
  /** Une explication alternative existe. */
  alternative: boolean
  /** Un exemple entièrement résolu existe. */
  workedExample: boolean
  /** Au moins un exercice de niveau « Je découvre ». */
  guided: boolean
  /** Au moins un exercice de niveau « Je m’entraîne ». */
  autonomous: boolean
  /** Au moins un exercice de transfert ou de niveau « épreuve ». */
  transfer: boolean
  /** Nombre de structures d'exercices distinctes. */
  structures: number
  /** La compétence est considérée comme couverte. */
  covered: boolean
}

function coverageForSkill(skill: Skill): CoverageRow {
  const lesson = lessonFor(skill.id)
  const lessonOk = !!lesson && publishable(lesson.review)

  let guided = false
  let autonomous = false
  let transfer = false
  let structures = 0

  if (skill.subject === 'calculs') {
    const ts = templatesFor(skill.id)
    structures = new Set(ts.map((t) => t.structure)).size
    guided = ts.some((t) => t.level === 'decouverte')
    autonomous = ts.some((t) => t.level === 'entrainement')
    transfer = ts.some((t) => t.transfer || t.level === 'epreuve')
  } else if (skill.subject === 'francais') {
    const es = frenchFor(skill.id)
    const ws = writtenFor(skill.id)
    structures = new Set(es.map((e) => e.structure)).size + ws.length
    guided = es.some((e) => e.level === 'decouverte')
    autonomous = es.some((e) => e.level === 'entrainement')
    transfer = es.some((e) => e.transfer || e.level === 'epreuve') || ws.length > 0
  } else if (skill.subject === 'sante') {
    const s = sheetById(skill.id)
    const ok = !!s && publishable(s.review)
    structures = ok ? s!.comprehension.length + 1 : 0
    guided = ok
    autonomous = ok && s!.comprehension.length >= 2
    transfer = ok
  } else {
    const qs = oralFor(skill.id)
    structures = qs.length
    guided = qs.some((q) => q.level === 'decouverte') || qs.length > 0
    autonomous = qs.length >= 2
    transfer = qs.some((q) => q.level === 'epreuve')
  }

  // Pour les fiches sanitaires, la « leçon » est la fiche elle-même.
  const hasTeaching = skill.subject === 'sante' ? guided : lessonOk
  const hasAlternative =
    skill.subject === 'sante' ? guided : !!lesson && lesson.alternative.length > 0
  const hasWorked =
    skill.subject === 'sante'
      ? guided
      : skill.subject === 'oral'
        ? structures > 0
        : !!lesson && lesson.workedExamples.length > 0

  return {
    skill,
    lesson: hasTeaching,
    alternative: hasAlternative,
    workedExample: hasWorked,
    guided,
    autonomous,
    transfer,
    structures,
    covered: hasTeaching && hasAlternative && hasWorked && guided && autonomous && transfer,
  }
}

export function coverage(): CoverageRow[] {
  return SKILLS.map(coverageForSkill)
}

export function coverageBySubject(subject: Subject): CoverageRow[] {
  return coverage().filter((r) => r.skill.subject === subject)
}

export type CoverageSummary = {
  subject: Subject
  total: number
  covered: number
  structures: number
}

export function coverageSummary(): CoverageSummary[] {
  const subjects: Subject[] = ['calculs', 'francais', 'sante', 'oral']
  return subjects.map((subject) => {
    const rows = coverageBySubject(subject)
    return {
      subject,
      total: rows.length,
      covered: rows.filter((r) => r.covered).length,
      structures: rows.reduce((n, r) => n + r.structures, 0),
    }
  })
}

/** Inventaire réel, affiché dans les réglages et utilisé par le bilan de livraison. */
export function inventory() {
  const publishedTemplates = EXERCISE_TEMPLATES.filter((t) => publishable(t.review))
  const publishedFrench = FRENCH_EXERCISES.filter((e) => publishable(e.review))
  return {
    skills: SKILLS.length,
    lessons: LESSONS.filter((l) => publishable(l.review)).length,
    mathStructures: publishedTemplates.length,
    mathDrafts: EXERCISE_TEMPLATES.length - publishedTemplates.length,
    frenchExercises: publishedFrench.length,
    writtenTasks: WRITTEN_TASKS.filter((w) => publishable(w.review)).length,
    healthSheets: HEALTH_SHEETS.filter((s) => publishable(s.review)).length,
    oralQuestions: ORAL_QUESTIONS.filter((q) => publishable(q.review)).length,
    oralFollowUps: ORAL_QUESTIONS.reduce((n, q) => n + q.followUps.length, 0),
    examPapers: EXAM_PAPERS.filter((e) => publishable(e.review)).length,
    healthQuestions: HEALTH_SHEETS.reduce((n, s) => n + s.comprehension.length, 0),
  }
}
