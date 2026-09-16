/** Les 24 fiches sanitaires, médico-sociales et sociales. */

import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '@/app/store'
import { HEALTH_SHEETS, sheetById } from '@/content/registry'
import { grade, type Verdict } from '@/engine/answer'
import { Blocks } from '@/ui/Blocks'
import { IconArrowLeft, IconCheck, IconPrint } from '@/ui/Icons'
import { REVIEW_LABELS } from '@/content/types'

export function SheetsIndex() {
  const { state } = useStore()
  return (
    <div className="wrap stack">
      <Link to="/apprendre" className="btn btn--ghost">
        <IconArrowLeft />
        Apprendre
      </Link>
      <header className="page-head">
        <p className="page-head__eyebrow">Culture sanitaire, médico-sociale et sociale</p>
        <h1>Les 24 fiches</h1>
        <p>
          Chaque fiche contient une définition simple, le vocabulaire, les enjeux, un exemple fictif, la place des
          professionnels, des questions de compréhension et une courte argumentation.
        </p>
      </header>
      <div className="note note--warn">
        <p className="note__title">
          <span aria-hidden="true">▲</span> Contenus non relus par un professionnel
        </p>
        <p>
          Ces fiches ont été écrites et relues par un modèle de langage, puis vérifiées par des tests automatiques de
          forme. Aucune n’a été relue par un professionnel de santé, un formateur ou un juriste. Elles servent à
          s’entraîner, pas à trancher une question de droit, de santé ou d’accompagnement : vérifiez à la source avant
          de citer quoi que ce soit comme certain.
        </p>
      </div>
      <ul className="list-reset stack-sm">
        {HEALTH_SHEETS.map((s) => (
          <li key={s.id}>
            <Link to={`/fiches/${s.id}`} className="card link-card">
              <p className="card__meta">{s.id}</p>
              <h2 className="card__title">{s.title}</h2>
              <p className="small">{s.purpose}</p>
              {state.sheetsRead.includes(s.id) && (
                <p>
                  <span className="tag tag--ok">
                    <IconCheck /> Déjà travaillée
                  </span>
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SheetScreen() {
  const { sheetId } = useParams<{ sheetId: string }>()
  const { markSheetRead, state, setWrittenCriteria } = useStore()
  const sheet = sheetId ? sheetById(sheetId) : undefined
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [verdicts, setVerdicts] = useState<Record<string, Verdict>>({})
  const [showRef, setShowRef] = useState(false)
  const [draft, setDraft] = useState('')

  if (!sheet) return <p>Fiche inconnue.</p>
  const selfKey = `${sheet.id}-arg`
  const checked = state.writtenSelf[selfKey]?.criteria ?? {}

  return (
    <div className="wrap stack">
      <Link to="/fiches" className="btn btn--ghost no-print">
        <IconArrowLeft />
        Toutes les fiches
      </Link>

      <header className="page-head">
        <p className="page-head__eyebrow">Fiche {sheet.id}</p>
        <h1>{sheet.title}</h1>
        <p className="lead">{sheet.purpose}</p>
      </header>

      <div className="note note--warn">
        <p className="note__title">
          <span aria-hidden="true">▲</span> Contenus non relus par un professionnel
        </p>
        <p>
          Ces fiches ont été écrites et relues par un modèle de langage, puis vérifiées par des tests automatiques de
          forme. Aucune n’a été relue par un professionnel de santé, un formateur ou un juriste. Elles servent à
          s’entraîner, pas à trancher une question de droit, de santé ou d’accompagnement : vérifiez à la source avant
          de citer quoi que ce soit comme certain.
        </p>
      </div>
      <article className="card stack">
        <section>
          <h2 className="lesson__h">Définition</h2>
          <Blocks blocks={sheet.definition} reading />
        </section>

        <section>
          <h2 className="lesson__h">Vocabulaire</h2>
          <dl className="vocab">
            {sheet.vocabulary.map((v) => (
              <div key={v.term} className="vocab__row">
                <dt>{v.term}</dt>
                <dd>{v.def}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="lesson__h">Enjeux</h2>
          <Blocks blocks={sheet.stakes} reading />
        </section>

        <section>
          <h2 className="lesson__h">Exemple</h2>
          <div className="note">
            <Blocks blocks={sheet.example} reading />
          </div>
        </section>

        <section>
          <h2 className="lesson__h">Place des professionnels</h2>
          <Blocks blocks={sheet.professionals} reading />
        </section>
      </article>

      <section className="card stack no-print">
        <h2 className="card__title">Questions de compréhension</h2>
        {sheet.comprehension.map((q) => {
          const v = verdicts[q.id]
          const picked = answers[q.id] ?? []
          const spec = q.answer
          if (spec.kind !== 'choice') return null
          return (
            <div key={q.id} className="stack-sm">
              <p className="strong">{q.question}</p>
              {spec.options.map((o) => {
                const isRight = spec.correct.includes(o.id)
                const chosen = picked.includes(o.id)
                const cls = v ? (isRight ? ' choice--right' : chosen ? ' choice--wrong' : '') : chosen ? ' choice--on' : ''
                return (
                  <label key={o.id} className={`choice${cls}`}>
                    <input
                      type="radio"
                      name={q.id}
                      checked={chosen}
                      disabled={!!v}
                      onChange={() => setAnswers((a) => ({ ...a, [q.id]: [o.id] }))}
                    />
                    <span>
                      {v && <span className="choice__mark">{isRight ? '✓ ' : chosen ? '✗ ' : ''}</span>}
                      {o.label}
                      {v && chosen && !isRight && o.feedback && (
                        <>
                          <br />
                          <span className="small">{o.feedback}</span>
                        </>
                      )}
                    </span>
                  </label>
                )
              })}
              {!v ? (
                <button
                  type="button"
                  className="btn btn--secondary"
                  disabled={!picked.length}
                  onClick={() => {
                    const res = grade(spec, picked)
                    setVerdicts((x) => ({ ...x, [q.id]: res }))
                    markSheetRead(sheet.id)
                  }}
                >
                  Vérifier
                </button>
              ) : (
                <div className={`feedback ${v.correct ? 'feedback--ok' : 'feedback--ko'}`} role="status">
                  <p className="feedback__head">{v.correct ? 'Juste' : 'Pas encore'}</p>
                  <p>{q.explain}</p>
                </div>
              )}
              <hr className="divider" />
            </div>
          )
        })}
      </section>

      <section className="card stack no-print">
        <h2 className="card__title">Petite argumentation</h2>
        <p>{sheet.argument.prompt}</p>
        <ul className="small">
          {sheet.argument.guidance.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
        <label className="field">
          <span className="field__label">Votre réponse ({sheet.argument.minWords} mots environ)</span>
          <textarea
            className="textarea"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Écrivez ici. Votre texte reste sur cet appareil."
          />
          <span className="field__help">{countWords(draft)} mots écrits.</span>
        </label>

        {!showRef ? (
          <button type="button" className="btn btn--primary" onClick={() => setShowRef(true)}>
            Comparer avec un corrigé de référence
          </button>
        ) : (
          <>
            <div className="note note--accent">
              <p className="note__title">Un corrigé possible — pas le seul</p>
              <Blocks blocks={sheet.argument.reference} reading />
            </div>
            <div className="stack-sm">
              <h3>Autoévaluation</h3>
              <p className="small muted">
                Cochez ce que votre réponse contient réellement. Cette note est indicative : elle vient de vous, pas
                d’une correction automatique.
              </p>
              {sheet.argument.criteria.map((c) => (
                <label key={c.id} className={`choice${checked[c.id] ? ' choice--on' : ''}`}>
                  <input
                    type="checkbox"
                    checked={!!checked[c.id]}
                    onChange={(e) =>
                      setWrittenCriteria(selfKey, { ...checked, [c.id]: e.target.checked })
                    }
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
              <p className="strong">
                Autoévaluation : {selfScore(sheet.argument.criteria, checked)} / 10 — indicatif.
              </p>
            </div>
          </>
        )}
      </section>

      <section className="card stack-sm">
        <h2 className="card__title">Sources</h2>
        <ul className="small">
          {sheet.sources.map((s, i) => (
            <li key={i}>
              {s.url ? (
                <a href={s.url} target="_blank" rel="noreferrer noopener">
                  {s.label}
                </a>
              ) : (
                s.label
              )}
              {s.note && <> — {s.note}</>}
            </li>
          ))}
        </ul>
        <p className="tiny muted">
          Aucune de ces sources n’a été consultée depuis l’application. Les chiffres, règles de droit et
          recommandations doivent être vérifiés à la source avant d’être cités comme certains. État de contrôle de
          cette fiche : {REVIEW_LABELS[sheet.review]}.
        </p>
        <button type="button" className="btn btn--quiet no-print" onClick={() => window.print()}>
          <IconPrint />
          Version imprimable
        </button>
      </section>
    </div>
  )
}

export function countWords(t: string): number {
  return t.trim() ? t.trim().split(/\s+/).length : 0
}

export function selfScore(
  criteria: readonly { id: string; points: number }[],
  checked: Record<string, boolean>,
): number {
  return criteria.reduce((n, c) => n + (checked[c.id] ? c.points : 0), 0)
}
