/**
 * Notation des examens blancs et application des seuils.
 *
 * Référence : article 12 de l'arrêté du 20 février 2026 tel que cité par le
 * cahier des charges. Écrit sur 20 (rédaction 10 + calculs 10), oral sur 20.
 * Une note strictement inférieure à 8/20 à l'écrit OU à l'oral est
 * éliminatoire. Le total doit atteindre 20/40. Il n'existe pas de seuil
 * éliminatoire indépendant de 4/10 par sous-épreuve.
 *
 * Aucune de ces fonctions ne prononce une admission : le classement et le
 * nombre de places ne sont pas connus de l'application.
 */

export const EXAM_RULES = {
  writingMax: 10,
  mathsMax: 10,
  writtenMax: 20,
  oralMax: 20,
  totalMax: 40,
  /** Strictement inférieur à ce seuil : éliminatoire. */
  eliminatory: 8,
  minimumTotal: 20,
  source:
    'Article 12 de l’arrêté du 20 février 2026, cité par le cahier des charges. À vérifier sur le texte en vigueur avant toute décision.',
} as const

export type Marks = {
  /** Rédaction / questions sanitaires et sociales, sur 10. */
  writing?: number
  /** Calculs, sur 10. */
  maths?: number
  /** Entretien, sur 20. */
  oral?: number
}

export type ExamOutcome = {
  /** Total écrit sur 20, si les deux sous-notes sont connues. */
  written?: number
  total?: number
  /** Une note manque : aucun total définitif n'est calculé. */
  incomplete: boolean
  missing: string[]
  writtenEliminatory?: boolean
  oralEliminatory?: boolean
  totalReached?: boolean
  /** Statut affichable, toujours prudent. */
  status:
    | 'incomplet'
    | 'ecrit-eliminatoire'
    | 'oral-eliminatoire'
    | 'total-insuffisant'
    | 'seuils-atteints'
  /** Phrase affichée telle quelle. */
  message: string
  /** Détail des vérifications, pour que l'utilisatrice voie le raisonnement. */
  checks: { label: string; value: string; ok: boolean | null }[]
}

const fmt = (n: number) => n.toString().replace('.', ',')

export function evaluateExam(marks: Marks): ExamOutcome {
  const missing: string[] = []
  if (marks.writing === undefined) missing.push('la note de rédaction')
  if (marks.maths === undefined) missing.push('la note de calculs')
  if (marks.oral === undefined) missing.push('la note d’entretien')

  const written =
    marks.writing !== undefined && marks.maths !== undefined ? marks.writing + marks.maths : undefined
  const total = written !== undefined && marks.oral !== undefined ? written + marks.oral : undefined

  const checks: { label: string; value: string; ok: boolean | null }[] = [
    {
      label: 'Rédaction et questions (sur 10)',
      value: marks.writing === undefined ? 'non renseignée' : `${fmt(marks.writing)}/10`,
      ok: marks.writing === undefined ? null : true,
    },
    {
      label: 'Calculs (sur 10)',
      value: marks.maths === undefined ? 'non renseignée' : `${fmt(marks.maths)}/10`,
      ok: marks.maths === undefined ? null : true,
    },
    {
      label: 'Total écrit (sur 20)',
      value: written === undefined ? 'non calculable' : `${fmt(written)}/20`,
      ok: written === undefined ? null : written >= EXAM_RULES.eliminatory,
    },
    {
      label: 'Entretien (sur 20)',
      value: marks.oral === undefined ? 'non renseignée' : `${fmt(marks.oral)}/20`,
      ok: marks.oral === undefined ? null : marks.oral >= EXAM_RULES.eliminatory,
    },
    {
      label: 'Total général (sur 40)',
      value: total === undefined ? 'non calculable' : `${fmt(total)}/40`,
      ok: total === undefined ? null : total >= EXAM_RULES.minimumTotal,
    },
  ]

  if (missing.length) {
    return {
      written,
      total: undefined,
      incomplete: true,
      missing,
      status: 'incomplet',
      message: `Il manque ${missing.join(', ')} : aucun total n’est calculé tant qu’une note manque.`,
      checks,
    }
  }

  const writtenEliminatory = written! < EXAM_RULES.eliminatory
  const oralEliminatory = marks.oral! < EXAM_RULES.eliminatory
  const totalReached = total! >= EXAM_RULES.minimumTotal

  if (writtenEliminatory) {
    return {
      written,
      total,
      incomplete: false,
      missing: [],
      writtenEliminatory,
      oralEliminatory,
      totalReached,
      status: 'ecrit-eliminatoire',
      message: `Total écrit ${fmt(written!)}/20 : en dessous de 8/20, l’écrit est éliminatoire, quel que soit le total général (${fmt(total!)}/40).`,
      checks,
    }
  }
  if (oralEliminatory) {
    return {
      written,
      total,
      incomplete: false,
      missing: [],
      writtenEliminatory,
      oralEliminatory,
      totalReached,
      status: 'oral-eliminatoire',
      message: `Entretien ${fmt(marks.oral!)}/20 : en dessous de 8/20, l’oral est éliminatoire, quel que soit le total général (${fmt(total!)}/40).`,
      checks,
    }
  }
  if (!totalReached) {
    return {
      written,
      total,
      incomplete: false,
      missing: [],
      writtenEliminatory,
      oralEliminatory,
      totalReached,
      status: 'total-insuffisant',
      message: `Aucun seuil éliminatoire n’est franchi, mais le total de ${fmt(total!)}/40 n’atteint pas le minimum de 20/40.`,
      checks,
    }
  }
  return {
    written,
    total,
    incomplete: false,
    missing: [],
    writtenEliminatory,
    oralEliminatory,
    totalReached,
    status: 'seuils-atteints',
    message: `Seuils atteints à cet entraînement : écrit ${fmt(written!)}/20, oral ${fmt(marks.oral!)}/20, total ${fmt(total!)}/40. L’admission dépend ensuite du classement et du nombre de places : elle n’est pas garantie.`,
    checks,
  }
}

/** Minuteur d'examen, robuste au rechargement : on ne stocke qu'une échéance. */
export function remainingMs(phaseEndsAt: number | undefined, now = Date.now()): number {
  if (!phaseEndsAt) return 0
  return Math.max(0, phaseEndsAt - now)
}

export function formatCountdown(ms: number): string {
  const total = Math.ceil(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
