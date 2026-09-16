/**
 * Examens blancs écrits.
 *
 * Conditions tenues :
 *  - aucun indice ni corrigé pendant l'épreuve ;
 *  - le chronomètre ne stocke qu'une échéance, donc il survit à un rechargement
 *    et ne peut pas être remis à zéro en fermant l'onglet ;
 *  - la copie est remise explicitement, ou automatiquement à l'échéance ;
 *  - la correction n'apparaît qu'après la remise.
 */

import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '@/app/store'
import { EXAM_PAPERS, generate, paperById } from '@/content/registry'
import { grade } from '@/engine/answer'
import { EXAM_RULES, evaluateExam, formatCountdown, remainingMs } from '@/engine/exam'
import type { ExamRun } from '@/store/schema'
import { Blocks } from '@/ui/Blocks'
import { IconArrowLeft, IconClock, IconPrint } from '@/ui/Icons'
import { countWords, selfScore } from './Sheets'

const PHASE_MINUTES = { redaction: 30, calculs: 30 } as const

export function ExamIndex() {
  const { state, startExam } = useStore()
  const navigate = useNavigate()
  const running = state.exams.filter((e) => !e.submittedAt)

  return (
    <div className="wrap stack">
      <Link to="/entrainement" className="btn btn--ghost">
        <IconArrowLeft />
        M’entraîner
      </Link>
      <header className="page-head">
        <p className="page-head__eyebrow">Examens blancs</p>
        <h1>Se mettre en conditions</h1>
        <p>
          Format reproduit : rédaction et questions sanitaires et sociales, 30 minutes sur 10 ; calculs simples,
          30 minutes sur 10. L’entretien, noté sur 20, se prépare séparément.
        </p>
      </header>

      <div className="note note--accent">
        <p className="note__title">Les seuils appliqués</p>
        <p>
          Une note strictement inférieure à {EXAM_RULES.eliminatory}/20 à l’écrit ou à l’oral est éliminatoire. Le
          total doit atteindre {EXAM_RULES.minimumTotal}/40. Il n’existe pas de seuil éliminatoire indépendant de
          4/10 par sous-épreuve.
        </p>
        <p className="tiny muted">{EXAM_RULES.source}</p>
      </div>

      {running.length > 0 && (
        <section className="card card--accent stack-sm">
          <h2 className="card__title">Épreuve en cours</h2>
          {running.map((e) => (
            <div key={e.id} className="btn-row">
              <Link className="btn btn--primary" to={`/entrainement/examens/${e.id}`}>
                Reprendre {paperById(e.paperId)?.title ?? e.paperId}
              </Link>
            </div>
          ))}
        </section>
      )}

      <ul className="list-reset stack-sm">
        {EXAM_PAPERS.map((p) => {
          const past = state.exams.filter((e) => e.paperId === p.id && e.submittedAt)
          return (
            <li key={p.id} className="card stack-sm">
              <p className="card__meta">{p.id}</p>
              <h2 className="card__title">{p.title}</h2>
              <p className="small">
                {p.writing.questions.length} questions de rédaction · {p.maths.length} questions de calculs
              </p>
              {past.length > 0 && (
                <p className="small">
                  <span className="tag tag--ok">
                    Déjà passé {past.length} fois
                  </span>
                </p>
              )}
              <div className="btn-row">
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => {
                    const id = startExam(p.id, 'epreuve')
                    navigate(`/entrainement/examens/${id}`)
                  }}
                >
                  <IconClock />
                  Passer en conditions réelles
                </button>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => {
                    const id = startExam(p.id, 'entrainement')
                    navigate(`/entrainement/examens/${id}`)
                  }}
                >
                  S’entraîner avec pauses
                </button>
              </div>
              <p className="tiny muted">{p.origin}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function ExamRunner() {
  const { runId } = useParams<{ runId: string }>()
  const { state, updateExam } = useStore()
  const run = state.exams.find((e) => e.id === runId)
  const paper = run ? paperById(run.paperId) : undefined
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 500)
    return () => window.clearInterval(t)
  }, [])

  const left = run && run.phase !== 'pause' ? remainingMs(run.phaseEndsAt, now) : (run?.pausedRemaining ?? 0)

  // Remise automatique à l'échéance.
  useEffect(() => {
    if (!run || !paper) return
    if (run.phase === 'redaction' && remainingMs(run.phaseEndsAt, now) <= 0) {
      updateExam(run.id, {
        phase: run.mode === 'entrainement' ? 'pause' : 'calculs',
        phaseEndsAt: run.mode === 'entrainement' ? undefined : Date.now() + PHASE_MINUTES.calculs * 60_000,
        pausedRemaining: run.mode === 'entrainement' ? PHASE_MINUTES.calculs * 60_000 : undefined,
      })
    } else if (run.phase === 'calculs' && remainingMs(run.phaseEndsAt, now) <= 0) {
      updateExam(run.id, { phase: 'rendu', phaseEndsAt: undefined, submittedAt: new Date().toISOString() })
    }
  }, [run, paper, now, updateExam])

  if (!run || !paper) return <p>Épreuve introuvable.</p>

  if (run.phase === 'rendu' || run.phase === 'corrige') {
    return <ExamCorrection run={run} />
  }

  return (
    <div className="wrap stack">
      <div className="exam-bar no-print">
        <span className="exam-bar__title">{paper.title}</span>
        <span className={`exam-bar__time${left < 5 * 60_000 ? ' exam-bar__time--low' : ''}`} role="timer">
          <IconClock />
          {formatCountdown(left)}
        </span>
      </div>

      <p className="small muted">
        {run.phase === 'redaction'
          ? 'Sous-épreuve 1 sur 2 — rédaction et questions, 30 minutes, notée sur 10.'
          : run.phase === 'pause'
            ? 'Pause. Le chronomètre des calculs est arrêté.'
            : 'Sous-épreuve 2 sur 2 — calculs, 30 minutes, notée sur 10.'}
        {run.mode === 'epreuve'
          ? ' Conditions réelles : ni indice, ni correction avant la remise.'
          : ' Mode entraînement : les pauses sont autorisées. Ce n’est pas une simulation stricte.'}
      </p>

      {run.phase === 'pause' && (
        <div className="card stack-sm">
          <h2 className="card__title">Pause</h2>
          <p>Reprenez quand vous voulez. Il restera {formatCountdown(run.pausedRemaining ?? 0)} pour les calculs.</p>
          <button
            type="button"
            className="btn btn--primary btn--big"
            onClick={() =>
              updateExam(run.id, {
                phase: 'calculs',
                phaseEndsAt: Date.now() + (run.pausedRemaining ?? PHASE_MINUTES.calculs * 60_000),
                pausedRemaining: undefined,
              })
            }
          >
            Commencer les calculs
          </button>
        </div>
      )}

      {run.phase === 'redaction' && (
        <>
          {paper.writing.support && (
            <section className="card">
              <h2 className="card__title">Texte support</h2>
              <Blocks blocks={paper.writing.support} reading />
            </section>
          )}
          {paper.writing.questions.map((q, i) => (
            <section key={q.id} className="card stack-sm">
              <p className="card__meta">
                Question {i + 1} — {q.points} points
              </p>
              <p className="lead">{q.instruction}</p>
              <label className="field">
                <span className="sr-only">Réponse à la question {i + 1}</span>
                <textarea
                  className="textarea"
                  style={{ minHeight: i === 0 ? '8rem' : '14rem' }}
                  value={run.writing[q.id] ?? ''}
                  onChange={(e) => updateExam(run.id, { writing: { ...run.writing, [q.id]: e.target.value } })}
                />
                <span className="field__help">
                  {countWords(run.writing[q.id] ?? '')} mots — attendu : environ {q.minWords}.
                </span>
              </label>
            </section>
          ))}
          <div className="btn-row">
            <button
              type="button"
              className="btn btn--primary btn--big"
              onClick={() =>
                updateExam(run.id, {
                  phase: run.mode === 'entrainement' ? 'pause' : 'calculs',
                  phaseEndsAt: run.mode === 'entrainement' ? undefined : Date.now() + PHASE_MINUTES.calculs * 60_000,
                  pausedRemaining: run.mode === 'entrainement' ? PHASE_MINUTES.calculs * 60_000 : undefined,
                })
              }
            >
              Rendre cette partie et passer aux calculs
            </button>
          </div>
        </>
      )}

      {run.phase === 'calculs' && (
        <>
          {paper.maths.map((q, i) => {
            const ex = generate(q.templateId, q.seed)
            if (!ex) return null
            const spec = ex.answer
            return (
              <section key={q.id} className="card stack-sm">
                <p className="card__meta">
                  Question {i + 1} — {q.points} point{q.points > 1 ? 's' : ''}
                </p>
                <Blocks blocks={ex.prompt} />
                <p className="strong">{ex.question}</p>
                {spec.kind === 'choice' ? (
                  <div>
                    {spec.options.map((o) => (
                      <label key={o.id} className={`choice${run.maths[q.id] === o.id ? ' choice--on' : ''}`}>
                        <input
                          type="radio"
                          name={q.id}
                          checked={run.maths[q.id] === o.id}
                          onChange={() => updateExam(run.id, { maths: { ...run.maths, [q.id]: o.id } })}
                        />
                        <span>{o.label}</span>
                      </label>
                    ))}
                  </div>
                ) : spec.kind === 'order' ? (
                  <OrderInput
                    items={spec.items}
                    value={run.maths[q.id] ? run.maths[q.id]!.split('|') : spec.items.map((x) => x.id)}
                    onChange={(v) => updateExam(run.id, { maths: { ...run.maths, [q.id]: v.join('|') } })}
                  />
                ) : (
                  <div className="input-unit">
                    <input
                      className="input"
                      inputMode={ex.keyboard === 'text' ? 'text' : 'decimal'}
                      value={run.maths[q.id] ?? ''}
                      placeholder={ex.placeholder}
                      aria-label={`Réponse à la question ${i + 1}`}
                      onChange={(e) => updateExam(run.id, { maths: { ...run.maths, [q.id]: e.target.value } })}
                    />
                    {ex.suffix && <span className="input-unit__suffix">{ex.suffix}</span>}
                  </div>
                )}
              </section>
            )
          })}
          <div className="btn-row">
            <button
              type="button"
              className="btn btn--primary btn--big"
              onClick={() =>
                updateExam(run.id, { phase: 'rendu', phaseEndsAt: undefined, submittedAt: new Date().toISOString() })
              }
            >
              Remettre ma copie
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function OrderInput({
  items,
  value,
  onChange,
}: {
  items: readonly { id: string; label: string }[]
  value: string[]
  onChange: (v: string[]) => void
}) {
  return (
    <ol className="order">
      {value.map((id, i) => {
        const item = items.find((x) => x.id === id)!
        return (
          <li key={id} className="order__item">
            <span className="order__rank">{i + 1}</span>
            <span className="order__label">{item.label}</span>
            <span className="order__btns">
              <button
                type="button"
                className="btn btn--quiet order__move"
                disabled={i === 0}
                aria-label={`Monter « ${item.label} »`}
                onClick={() => {
                  const next = [...value]
                  ;[next[i - 1], next[i]] = [next[i]!, next[i - 1]!]
                  onChange(next)
                }}
              >
                ↑
              </button>
              <button
                type="button"
                className="btn btn--quiet order__move"
                disabled={i === value.length - 1}
                aria-label={`Descendre « ${item.label} »`}
                onClick={() => {
                  const next = [...value]
                  ;[next[i + 1], next[i]] = [next[i]!, next[i + 1]!]
                  onChange(next)
                }}
              >
                ↓
              </button>
            </span>
          </li>
        )
      })}
    </ol>
  )
}

function ExamCorrection({ run }: { run: ExamRun }) {
  const { setWrittenCriteria, state, updateExam } = useStore()
  const paper = paperById(run.paperId)!
  const [oralMark, setOralMark] = useState<string>(run.scores?.oral !== undefined ? String(run.scores.oral) : '')

  const maths = useMemo(() => {
    let score = 0
    const rows = paper.maths.map((q, i) => {
      const ex = generate(q.templateId, q.seed)!
      const given = run.maths[q.id] ?? ''
      const spec = ex.answer
      const response = spec.kind === 'order' ? (given ? given.split('|') : []) : spec.kind === 'choice' ? (given ? [given] : []) : given
      const v = grade(spec, response)
      if (v.correct) score += q.points
      return { i, q, ex, v, given }
    })
    return { rows, score }
  }, [paper, run.maths])

  const writingSelf = paper.writing.questions.map((q) => {
    const key = `${run.id}-${q.id}`
    const checked = state.writtenSelf[key]?.criteria ?? {}
    return { q, key, checked, score: selfScore(q.criteria, checked) }
  })
  const writingScore = writingSelf.reduce((n, w) => n + w.score, 0)

  const outcome = evaluateExam({
    writing: writingScore,
    maths: maths.score,
    oral: oralMark.trim() === '' ? undefined : Number(oralMark.replace(',', '.')),
  })

  return (
    <div className="wrap stack">
      <Link to="/entrainement/examens" className="btn btn--ghost no-print">
        <IconArrowLeft />
        Examens blancs
      </Link>

      <header className="page-head">
        <p className="page-head__eyebrow">Copie remise</p>
        <h1>{paper.title}</h1>
      </header>

      <section className="card stack-sm">
        <h2 className="card__title">Calculs : {maths.score} / 10</h2>
        <p className="small muted">Cette note est calculée par le moteur de correction, elle n’est pas indicative.</p>
        <ol className="stack-sm">
          {maths.rows.map(({ i, q, ex, v, given }) => (
            <li key={q.id} className={v.correct ? 'exam-row exam-row--ok' : 'exam-row exam-row--ko'}>
              <p className="strong">
                Question {i + 1} ({q.points} pt) — {v.correct ? 'juste' : 'faux'}
              </p>
              <p className="small">{ex.question}</p>
              <p className="small">
                Votre réponse : {given || '—'} · Attendu : {v.expected}
              </p>
              {!v.correct && <p className="small">{v.message}</p>}
              {!v.correct && (
                <details className="details">
                  <summary>Correction étape par étape</summary>
                  <ol>
                    {ex.solution.map((s, j) => (
                      <li key={j}>
                        {s.text} {s.calc && <code>{s.calc}</code>}
                        {s.why && <div className="small muted">Pourquoi : {s.why}</div>}
                      </li>
                    ))}
                  </ol>
                </details>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="card stack">
        <h2 className="card__title">Rédaction : {writingScore} / 10 — autoévaluation</h2>
        <p className="small muted">
          La rédaction n’est pas corrigée automatiquement. Comparez avec le corrigé de référence, puis cochez ce que
          votre copie contient réellement. Cette note reste indicative.
        </p>
        {writingSelf.map(({ q, key, checked }) => (
          <div key={q.id} className="stack-sm">
            <p className="strong">{q.instruction}</p>
            <details className="details">
              <summary>Votre copie</summary>
              <p className="compare__text">{run.writing[q.id] || 'Aucune réponse rendue.'}</p>
            </details>
            <details className="details">
              <summary>Corrigé de référence</summary>
              <Blocks blocks={q.reference} reading />
            </details>
            {q.criteria.map((c) => (
              <label key={c.id} className={`choice${checked[c.id] ? ' choice--on' : ''}`}>
                <input
                  type="checkbox"
                  checked={!!checked[c.id]}
                  onChange={(e) => setWrittenCriteria(key, { ...checked, [c.id]: e.target.checked })}
                />
                <span>
                  <span className="strong">
                    {c.label} ({c.points} pt{c.points > 1 ? 's' : ''})
                  </span>
                  <br />
                  <span className="small muted">{c.evidence.join(' · ')}</span>
                </span>
              </label>
            ))}
            <hr className="divider" />
          </div>
        ))}
      </section>

      <section className="card stack-sm">
        <h2 className="card__title">Entretien</h2>
        <p className="small muted">
          L’oral ne se passe pas ici. Si vous avez fait une simulation, reportez votre autoévaluation sur 20 pour
          voir l’effet des seuils. Sans cette note, aucun total n’est calculé.
        </p>
        <label className="field" style={{ maxWidth: '12rem' }}>
          <span className="field__label">Note d’entretien (sur 20)</span>
          <input
            className="input"
            inputMode="decimal"
            value={oralMark}
            placeholder="ex. 12"
            onChange={(e) => setOralMark(e.target.value)}
            onBlur={() =>
              updateExam(run.id, {
                scores: {
                  maths: maths.score,
                  mathsMax: 10,
                  writing: writingScore,
                  writingMax: 10,
                  writingSelfAssessed: true,
                  oral: oralMark.trim() === '' ? undefined : Number(oralMark.replace(',', '.')),
                  oralMax: 20,
                  oralSelfAssessed: true,
                },
              })
            }
          />
        </label>
      </section>

      <section className={`card ${outcome.status === 'seuils-atteints' ? 'card--accent' : ''} stack-sm`}>
        <h2 className="card__title">Résultat de cet entraînement</h2>
        <table className="tbl">
          <tbody>
            {outcome.checks.map((c) => (
              <tr key={c.label}>
                <th scope="row">{c.label}</th>
                <td>{c.value}</td>
                <td>{c.ok === null ? '—' : c.ok ? '✓ atteint' : '✗ non atteint'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="lead">{outcome.message}</p>
        <p className="tiny muted">
          Les notes de rédaction et d’entretien viennent d’une autoévaluation : elles sont indicatives. {EXAM_RULES.source}
        </p>
      </section>

      <div className="btn-row no-print">
        <button type="button" className="btn btn--quiet" onClick={() => window.print()}>
          <IconPrint />
          Imprimer sujet et corrigé
        </button>
        <Link className="btn btn--secondary" to="/entrainement/examens">
          Retour aux examens blancs
        </Link>
      </div>
    </div>
  )
}
