/**
 * « Mes progrès ».
 *
 * Aucun classement, aucune série punitive, aucune célébration disproportionnée.
 * Une compétence non testée reste « non évaluée » : rien n'est inventé au
 * démarrage.
 */

import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '@/app/store'
import { coverageBySubject, inventory } from '@/content/registry'
import { getSkill, skillsOf } from '@/content/skills'
import { SUBJECT_LABELS, SUBJECT_SHORT, type Subject } from '@/content/types'
import { ERROR_LABELS, type ErrorTag } from '@/engine/answer'
import { explainState, today } from '@/engine/mastery'
import { MASTERY_HELP, MASTERY_LABELS, type MasteryState } from '@/store/schema'

const SUBJECTS: Subject[] = ['calculs', 'francais', 'sante', 'oral']
const STATES: MasteryState[] = ['consolidee', 'a-consolider', 'fragile', 'non-evaluee']

export function Progress() {
  const { state } = useStore()
  const day = today()
  const inv = inventory()

  const counts = useMemo(() => {
    const out: Record<Subject, Record<MasteryState, number>> = {
      calculs: blank(),
      francais: blank(),
      sante: blank(),
      oral: blank(),
    }
    for (const s of SUBJECTS) {
      for (const sk of skillsOf(s)) {
        const st = state.skills[sk.id]?.state ?? 'non-evaluee'
        out[s][st] += 1
      }
    }
    return out
  }, [state.skills])

  const errors = useMemo(() => {
    const tally = new Map<ErrorTag, number>()
    for (const a of state.attempts) {
      if (a.correct || !a.tag) continue
      tally.set(a.tag, (tally.get(a.tag) ?? 0) + 1)
    }
    return [...tally.entries()].sort((a, b) => b[1] - a[1])
  }, [state.attempts])

  const dueSoon = useMemo(
    () =>
      Object.entries(state.skills)
        .filter(([, p]) => p.nextReview)
        .sort((a, b) => (a[1].nextReview! < b[1].nextReview! ? -1 : 1))
        .slice(0, 6),
    [state.skills],
  )

  const totalAttempts = state.attempts.length
  const unaided = state.attempts.filter((a) => a.correct && a.hintsUsed === 0 && !a.usedAlternative).length
  const aided = state.attempts.filter((a) => a.correct && (a.hintsUsed > 0 || a.usedAlternative)).length

  return (
    <div className="wrap stack-lg">
      <header className="page-head">
        <p className="page-head__eyebrow">Mes progrès</p>
        <h1>Où j’en suis</h1>
        {totalAttempts === 0 && (
          <p className="note">
            Vous n’avez encore validé aucun exercice. Toutes les compétences sont donc « non évaluées » : aucune
            progression n’est affichée tant que rien n’a été fait.
          </p>
        )}
      </header>

      {totalAttempts > 0 && (
        <section className="card stack-sm">
          <h2 className="card__title">Exercices faits</h2>
          <ul>
            <li>{totalAttempts} exercices validés au total.</li>
            <li>{unaided} réussis sans aucune aide.</li>
            <li>{aided} réussis avec un indice ou une explication différente — comptés « à consolider ».</li>
            <li>{state.activeDays.length} jours d’activité enregistrés.</li>
          </ul>
          <p className="tiny muted">
            Utiliser un indice n’est pas pénalisé : cela change seulement la façon dont la réussite est comptée.
          </p>
        </section>
      )}

      <section className="stack-sm">
        <h2>Par matière</h2>
        {SUBJECTS.map((s) => {
          const c = counts[s]
          const total = STATES.reduce((n, st) => n + c[st], 0)
          const evaluated = total - c['non-evaluee']
          return (
            <div key={s} className="card stack-sm">
              <div className="row row--between">
                <h3 className="card__title" style={{ marginBottom: 0 }}>
                  {SUBJECT_LABELS[s]}
                </h3>
                <span className="small muted">
                  {evaluated} / {total} évaluées
                </span>
              </div>
              <div className="stack" aria-hidden="true">
                <div className="mastery-bar">
                  {STATES.map((st) =>
                    c[st] > 0 ? (
                      <span
                        key={st}
                        className={`mastery-bar__seg mastery-bar__seg--${st}`}
                        style={{ flexGrow: c[st] }}
                      />
                    ) : null,
                  )}
                </div>
              </div>
              <ul className="legend">
                {STATES.map((st) => (
                  <li key={st} className="legend__item">
                    <span className={`legend__dot legend__dot--${st}`} aria-hidden="true" />
                    {MASTERY_LABELS[st]} : {c[st]}
                  </li>
                ))}
              </ul>
              <Link className="btn btn--quiet" to={`/entrainement/matiere/${s}`}>
                Travailler {SUBJECT_SHORT[s]}
              </Link>
            </div>
          )
        })}
      </section>

      {errors.length > 0 && (
        <section className="card stack-sm">
          <h2 className="card__title">Carnet d’erreurs</h2>
          <p className="small muted">
            Causes repérées automatiquement lors des corrections. Quand la cause n’est pas identifiable, elle est
            classée « à identifier » plutôt que devinée.
          </p>
          <ul>
            {errors.map(([tag, n]) => (
              <li key={tag}>
                {ERROR_LABELS[tag]} : {n} fois
              </li>
            ))}
          </ul>
        </section>
      )}

      {dueSoon.length > 0 && (
        <section className="card stack-sm">
          <h2 className="card__title">Prochaines révisions</h2>
          <ul>
            {dueSoon.map(([id, p]) => (
              <li key={id}>
                <span className="strong">{getSkill(id)?.title ?? id}</span> —{' '}
                {p.nextReview! <= day ? 'à revoir maintenant' : `prévu le ${formatDate(p.nextReview!)}`}
                <br />
                <span className="small muted">{explainState(p)}</span>
              </li>
            ))}
          </ul>
          <p className="tiny muted">
            Espacement utilisé : J+1, puis J+3, J+7 et J+14 après des réussites sans aide. Après une absence, les
            révisions en retard sont étalées plutôt qu’imposées d’un coup.
          </p>
        </section>
      )}

      <section className="card stack-sm">
        <h2 className="card__title">Ce que veulent dire les états</h2>
        <dl className="vocab">
          {STATES.map((st) => (
            <div key={st} className="vocab__row">
              <dt>{MASTERY_LABELS[st]}</dt>
              <dd>{MASTERY_HELP[st]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="card stack-sm">
        <h2 className="card__title">Couverture réelle des contenus</h2>
        <p className="small muted">
          Calculée à partir des contenus présents dans l’application, pas d’un objectif annoncé. Une compétence n’est
          comptée comme couverte que si elle possède une leçon, une explication alternative, un exemple résolu, un
          exercice accompagné, un exercice autonome et une application différente.
        </p>
        <div className="tbl-scroll">
          <table className="tbl">
            <thead>
              <tr>
                <th>Matière</th>
                <th>Compétences couvertes</th>
                <th>Structures de contenu</th>
              </tr>
            </thead>
            <tbody>
              {SUBJECTS.map((s) => {
                const rows = coverageBySubject(s)
                const covered = rows.filter((r) => r.covered).length
                const structures = rows.reduce((n, r) => n + r.structures, 0)
                return (
                  <tr key={s}>
                    <td>{SUBJECT_LABELS[s]}</td>
                    <td>
                      {covered} / {rows.length}
                    </td>
                    <td>{structures}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <details className="details">
          <summary>Voir le détail compétence par compétence</summary>
          {SUBJECTS.map((s) => (
            <div key={s} className="stack-sm">
              <h3>{SUBJECT_LABELS[s]}</h3>
              <ul className="small">
                {coverageBySubject(s).map((r) => (
                  <li key={r.skill.id}>
                    {r.skill.id} — {r.skill.title} :{' '}
                    {r.covered ? (
                      <span className="tag tag--ok">couverte</span>
                    ) : (
                      <span className="tag tag--warn">
                        incomplète ({missingParts(r).join(', ')})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </details>
        <p className="tiny muted">
          Inventaire : {inv.mathStructures} types d’exercices de calculs, {inv.frenchExercises} micro-exercices de
          français, {inv.writtenTasks} sujets rédigés, {inv.healthSheets} fiches, {inv.oralQuestions} questions
          d’oral, {inv.examPapers} examens blancs.
        </p>
      </section>
    </div>
  )
}

function missingParts(r: ReturnType<typeof coverageBySubject>[number]): string[] {
  const out: string[] = []
  if (!r.lesson) out.push('leçon')
  if (!r.alternative) out.push('explication alternative')
  if (!r.workedExample) out.push('exemple résolu')
  if (!r.guided) out.push('niveau « Je découvre »')
  if (!r.autonomous) out.push('niveau « Je m’entraîne »')
  if (!r.transfer) out.push('application différente')
  return out.length ? out : ['—']
}

function blank(): Record<MasteryState, number> {
  return { consolidee: 0, 'a-consolider': 0, fragile: 0, 'non-evaluee': 0 }
}

function formatDate(day: string): string {
  const [y, m, d] = day.split('-').map(Number)
  return new Date(y!, (m ?? 1) - 1, d ?? 1).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
}
