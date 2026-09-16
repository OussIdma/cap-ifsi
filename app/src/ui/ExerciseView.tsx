/**
 * Affichage et correction d'un exercice.
 *
 * Utilisé dans les séances, l'entraînement libre et les examens blancs.
 * En mode examen, aucun indice ni corrigé n'est accessible.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ERROR_LABELS, grade, type Verdict } from '@/engine/answer'
import type { Block, GeneratedExercise } from '@/content/types'
import { getSkill } from '@/content/skills'
import { Blocks } from './Blocks'
import { IconArrowRight, IconBulb, IconCheck, IconCross, IconRefresh } from './Icons'

export type ExerciseState = {
  draft: string
  picked: string[]
  hintsUsed: number
  usedAlternative: boolean
  submitted: boolean
  message?: string
  correct?: boolean
}

export type ExerciseViewProps = {
  exercise: GeneratedExercise
  /**
   * Identifiant stable de l'exercice affiché. L'état local (correction,
   * explication dépliée) est réinitialisé quand il change — jamais parce que
   * l'objet `exercise` a été reconstruit au rendu.
   */
  resetKey: string
  skillId: string
  state: ExerciseState
  /** Mode examen : ni indice, ni explication alternative, ni corrigé. */
  examMode?: boolean
  onDraft: (v: string) => void
  onPicked: (v: string[]) => void
  onHint: () => void
  onAlternative: () => void
  onSubmit: (v: Verdict) => void
  onRetry?: () => void
  onNext?: () => void
  nextLabel?: string
}

export function ExerciseView({
  exercise,
  resetKey,
  skillId,
  state,
  examMode = false,
  onDraft,
  onPicked,
  onHint,
  onAlternative,
  onSubmit,
  onRetry,
  onNext,
  nextLabel = 'Continuer',
}: ExerciseViewProps) {
  const [verdict, setVerdict] = useState<Verdict | null>(null)
  const [showSolution, setShowSolution] = useState(false)
  const [showAlt, setShowAlt] = useState(state.usedAlternative)
  const inputRef = useRef<HTMLInputElement>(null)
  const feedbackRef = useRef<HTMLDivElement>(null)
  const skill = getSkill(skillId)
  const prerequisite = skill?.prerequisites[0]

  const spec = exercise.answer
  const isChoice = spec.kind === 'choice'
  const isOrder = spec.kind === 'order'

  useEffect(() => {
    setVerdict(null)
    setShowSolution(false)
    setShowAlt(false)
  }, [resetKey])

  const [order, setOrder] = useState<string[]>(() =>
    isOrder ? (state.picked.length ? state.picked : spec.items.map((i) => i.id)) : [],
  )
  useEffect(() => {
    if (isOrder) setOrder(state.picked.length ? state.picked : spec.items.map((i) => i.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey])

  const canSubmit = useMemo(() => {
    if (isChoice) return state.picked.length > 0
    if (isOrder) return order.length > 0
    return state.draft.trim().length > 0
  }, [isChoice, isOrder, state.picked, state.draft, order])

  const submit = () => {
    const response = isChoice ? state.picked : isOrder ? order : state.draft
    const v = grade(spec, response)
    setVerdict(v)
    onSubmit(v)
    window.setTimeout(() => feedbackRef.current?.focus(), 50)
  }

  const done = state.submitted || !!verdict
  const v = verdict

  return (
    <article className="ex">
      <div className="ex__prompt">
        <Blocks blocks={exercise.prompt} />
      </div>

      <h2 className="ex__question">{exercise.question}</h2>

      {/* ------------------------------------------------------- Saisie --- */}
      {isChoice && (
        <div role="group" aria-label="Réponses proposées">
          {spec.options.map((o) => {
            const chosen = state.picked.includes(o.id)
            const isRight = spec.correct.includes(o.id)
            const cls = done
              ? isRight
                ? ' choice--right'
                : chosen
                  ? ' choice--wrong'
                  : ''
              : chosen
                ? ' choice--on'
                : ''
            return (
              <label key={o.id} className={`choice${cls}`}>
                <input
                  type={spec.multiple ? 'checkbox' : 'radio'}
                  name={`q-${skillId}`}
                  checked={chosen}
                  disabled={done}
                  onChange={() => {
                    if (spec.multiple) {
                      onPicked(chosen ? state.picked.filter((x) => x !== o.id) : [...state.picked, o.id])
                    } else {
                      onPicked([o.id])
                    }
                  }}
                />
                <span>
                  {done && (
                    <span className="choice__mark">
                      {isRight ? '✓ Réponse juste — ' : chosen ? '✗ Votre réponse — ' : ''}
                    </span>
                  )}
                  {o.label}
                  {done && !isRight && chosen && o.feedback && (
                    <>
                      <br />
                      <span className="small">{o.feedback}</span>
                    </>
                  )}
                </span>
              </label>
            )
          })}
        </div>
      )}

      {isOrder && (
        <ol className="order">
          {order.map((id, i) => {
            const item = spec.items.find((x) => x.id === id)!
            return (
              <li key={id} className="order__item">
                <span className="order__rank">{i + 1}</span>
                <span className="order__label">{item.label}</span>
                <span className="order__btns">
                  <button
                    type="button"
                    className="btn btn--quiet order__move"
                    disabled={i === 0 || done}
                    aria-label={`Monter « ${item.label} »`}
                    onClick={() => {
                      const next = [...order]
                      ;[next[i - 1], next[i]] = [next[i]!, next[i - 1]!]
                      setOrder(next)
                      onPicked(next)
                    }}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="btn btn--quiet order__move"
                    disabled={i === order.length - 1 || done}
                    aria-label={`Descendre « ${item.label} »`}
                    onClick={() => {
                      const next = [...order]
                      ;[next[i + 1], next[i]] = [next[i]!, next[i + 1]!]
                      setOrder(next)
                      onPicked(next)
                    }}
                  >
                    ↓
                  </button>
                </span>
              </li>
            )
          })}
        </ol>
      )}

      {!isChoice && !isOrder && (
        <label className="field">
          <span className="field__label">Votre réponse</span>
          <div className="input-unit">
            <input
              ref={inputRef}
              className="input"
              value={state.draft}
              disabled={done}
              inputMode={exercise.keyboard === 'text' ? 'text' : 'decimal'}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              placeholder={exercise.placeholder}
              onChange={(e) => onDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && canSubmit && !done) submit()
              }}
            />
            {exercise.suffix && <span className="input-unit__suffix">{exercise.suffix}</span>}
          </div>
          <span className="field__help">
            La virgule et le point sont acceptés. Vous pouvez écrire l’unité, par exemple « 75 mg ».
          </span>
        </label>
      )}

      {/* -------------------------------------------------------- Aides --- */}
      {!done && !examMode && (
        <div className="ex__helpers">
          {state.hintsUsed >= 1 && (
            <div className="note">
              <p className="note__title">
                <IconBulb /> Indice 1 — pour démarrer
              </p>
              <p>{exercise.hints[0]}</p>
            </div>
          )}
          {state.hintsUsed >= 2 && (
            <div className="note">
              <p className="note__title">
                <IconBulb /> Indice 2 — la méthode
              </p>
              <p>{exercise.hints[1]}</p>
            </div>
          )}
          {showAlt && (
            <div className="note note--accent">
              <p className="note__title">Expliqué autrement</p>
              <Blocks blocks={exercise.alternative} />
            </div>
          )}
          <div className="btn-row">
            {state.hintsUsed < 2 && (
              <button type="button" className="btn btn--quiet" onClick={onHint}>
                <IconBulb />
                {state.hintsUsed === 0 ? 'Un indice pour démarrer' : 'Un indice sur la méthode'}
              </button>
            )}
            {!showAlt && (
              <button
                type="button"
                className="btn btn--quiet"
                onClick={() => {
                  setShowAlt(true)
                  onAlternative()
                }}
              >
                Explique-moi autrement
              </button>
            )}
            {prerequisite && (
              <Link className="btn btn--quiet" to={`/apprendre/${skill?.subject}/${prerequisite}`}>
                Reprendre les bases
              </Link>
            )}
          </div>
        </div>
      )}

      {examMode && !done && (
        <p className="small muted">
          Épreuve en conditions réelles : les indices et le corrigé sont désactivés jusqu’à la remise de la copie.
        </p>
      )}

      {/* ------------------------------------------------------ Réponse --- */}
      {!done && (
        <div className="btn-row ex__actions">
          <button type="button" className="btn btn--primary" onClick={submit} disabled={!canSubmit}>
            Valider ma réponse
          </button>
        </div>
      )}

      {/* ---------------------------------------------------- Correction --- */}
      {done && v && !examMode && (
        <div
          className={`feedback ${v.correct ? 'feedback--ok' : 'feedback--ko'}`}
          ref={feedbackRef}
          tabIndex={-1}
          role="status"
        >
          <p className="feedback__head">
            {v.correct ? <IconCheck /> : <IconCross />}
            <span>{v.correct ? 'Juste' : 'Pas encore'}</span>
            {!v.correct && v.tag && <span className="tag">{ERROR_LABELS[v.tag]}</span>}
          </p>
          {!(v.correct && v.message === 'Juste.') && <p>{v.message}</p>}

          {!v.correct && v.checklist && (
            <>
              <p className="strong">À vérifier, dans cet ordre :</p>
              <ol>
                {v.checklist.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ol>
            </>
          )}

          {!v.correct && (
            <p>
              Réponse attendue : <span className="strong">{v.expected}</span>
            </p>
          )}

          {exercise.conclusion && v.correct && <p>{exercise.conclusion}</p>}

          <div className="btn-row">
            {!showSolution && (
              <button type="button" className="btn btn--secondary" onClick={() => setShowSolution(true)}>
                Voir la correction étape par étape
              </button>
            )}
            {!v.correct && onRetry && (
              <button type="button" className="btn btn--quiet" onClick={onRetry}>
                <IconRefresh />
                Un autre exercice du même type
              </button>
            )}
          </div>

          {showSolution && (
            <div className="solution">
              <h3>Correction</h3>
              <ol className="solution__list">
                {exercise.solution.map((s, i) => (
                  <li key={i}>
                    <p className="solution__text">{s.text}</p>
                    {s.calc && <code className="solution__calc">{s.calc}</code>}
                    {s.why && <p className="solution__why">Pourquoi : {s.why}</p>}
                  </li>
                ))}
              </ol>
              {exercise.conclusion && <p className="strong">{exercise.conclusion}</p>}
              {!showAlt && (
                <button
                  type="button"
                  className="btn btn--quiet"
                  onClick={() => {
                    setShowAlt(true)
                    onAlternative()
                  }}
                >
                  Explique-moi autrement
                </button>
              )}
              {showAlt && <AltBlock blocks={exercise.alternative} />}
            </div>
          )}
        </div>
      )}

      {done && examMode && (
        <p className="note note--ok" role="status">
          Réponse enregistrée. La correction sera disponible après la remise de la copie.
        </p>
      )}

      {done && onNext && (
        <div className="btn-row ex__actions">
          <button type="button" className="btn btn--primary" onClick={onNext}>
            {nextLabel}
            <IconArrowRight />
          </button>
        </div>
      )}
    </article>
  )
}

function AltBlock({ blocks }: { blocks: readonly Block[] }) {
  return (
    <div className="note note--accent">
      <p className="note__title">Expliqué autrement</p>
      <Blocks blocks={blocks} />
    </div>
  )
}
