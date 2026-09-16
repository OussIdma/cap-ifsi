/**
 * Sujets de rédaction.
 *
 * Mode sans IA : corrigé de référence, autres réponses recevables, critères, et
 * autoévaluation guidée. Aucune correction personnalisée n'est simulée à partir
 * de quelques mots-clés.
 */

import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '@/app/store'
import { WRITTEN_TASKS, writtenById } from '@/content/registry'
import { getSkill } from '@/content/skills'
import { LEVEL_LABELS } from '@/content/types'
import { Blocks } from '@/ui/Blocks'
import { IconArrowLeft, IconClock, IconPrint } from '@/ui/Icons'
import { countWords, selfScore } from './Sheets'

export function WrittenIndex() {
  const { state } = useStore()
  return (
    <div className="wrap stack">
      <Link to="/entrainement" className="btn btn--ghost">
        <IconArrowLeft />
        M’entraîner
      </Link>
      <header className="page-head">
        <p className="page-head__eyebrow">Rédaction</p>
        <h1>Sujets commentés</h1>
        <p>
          Chaque sujet propose un corrigé de référence, d’autres réponses recevables, et la comparaison entre une
          copie faible et une copie solide.
        </p>
      </header>
      <ul className="list-reset stack-sm">
        {WRITTEN_TASKS.map((w) => {
          const draft = state.drafts[w.id]
          return (
            <li key={w.id}>
              <Link to={`/entrainement/redaction/${w.id}`} className="card link-card">
                <p className="card__meta">
                  <span className="tag">{LEVEL_LABELS[w.level]}</span>{' '}
                  <span className="tag">
                    <IconClock /> {w.minutes} min
                  </span>
                  {draft && <span className="tag tag--ok">Brouillon enregistré</span>}
                </p>
                <h2 className="card__title">{w.title}</h2>
                <p className="small">{w.instruction}</p>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function WrittenTaskScreen() {
  const { taskId } = useParams<{ taskId: string }>()
  const { state, saveWrittenDraft, setWrittenCriteria } = useStore()
  const task = taskId ? writtenById(taskId) : undefined
  const [showRef, setShowRef] = useState(false)
  const [showCompare, setShowCompare] = useState(false)

  if (!task) return <p>Sujet inconnu.</p>
  const draft = state.drafts[task.id]?.text ?? ''
  const checked = state.writtenSelf[task.id]?.criteria ?? {}
  const words = countWords(draft)

  return (
    <div className="wrap stack">
      <Link to="/entrainement/redaction" className="btn btn--ghost no-print">
        <IconArrowLeft />
        Tous les sujets
      </Link>

      <header className="page-head">
        <p className="page-head__eyebrow">Sujet {task.id}</p>
        <h1>{task.title}</h1>
        <p className="small muted">
          {task.minutes} minutes · noté sur 10 · {LEVEL_LABELS[task.level]}
        </p>
      </header>

      {task.support && (
        <section className="card">
          <h2 className="card__title">Texte support</h2>
          <Blocks blocks={task.support} reading />
        </section>
      )}

      <section className="card stack-sm">
        <h2 className="card__title">Consigne</h2>
        <p className="lead">{task.instruction}</p>
        <details className="details no-print">
          <summary>Comment s’y prendre</summary>
          <ul>
            {task.guidance.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </details>
      </section>

      <section className="card stack-sm no-print">
        <h2 className="card__title">Votre réponse</h2>
        <label className="field">
          <span className="sr-only">Votre rédaction</span>
          <textarea
            className="textarea"
            style={{ minHeight: '16rem' }}
            value={draft}
            onChange={(e) => saveWrittenDraft(task.id, e.target.value)}
            placeholder="Écrivez ici. Votre brouillon est enregistré au fur et à mesure, sur cet appareil."
          />
          <span className="field__help">
            {words} mots — attendu : environ {task.minWords}
            {task.maxWords ? ` à ${task.maxWords}` : ''} mots.
            {state.drafts[task.id] && ' Brouillon enregistré.'}
          </span>
        </label>
      </section>

      <section className="card stack no-print">
        <h2 className="card__title">Se corriger</h2>
        <p className="small muted">
          Cette application ne corrige pas automatiquement un texte rédigé : une correction fondée sur des mots-clés
          donnerait une note fausse. Vous comparez avec un corrigé de référence, puis vous cochez ce que votre copie
          contient réellement.
        </p>

        {!showRef ? (
          <button type="button" className="btn btn--primary" onClick={() => setShowRef(true)}>
            Afficher le corrigé de référence
          </button>
        ) : (
          <>
            <div className="note note--accent">
              <p className="note__title">Un corrigé possible — pas le seul</p>
              <Blocks blocks={task.reference} reading />
            </div>

            <details className="details">
              <summary>Autres réponses recevables</summary>
              <ul>
                {task.otherAcceptable.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </details>

            {task.comparison && (
              <>
                {!showCompare ? (
                  <button type="button" className="btn btn--secondary" onClick={() => setShowCompare(true)}>
                    Voir deux copies de qualité différente
                  </button>
                ) : (
                  <div className="compare">
                    <div className="compare__col">
                      <p className="tag tag--warn">Copie faible</p>
                      <p className="compare__text">{task.comparison.weak.text}</p>
                      <p className="small muted">{task.comparison.weak.comment}</p>
                    </div>
                    <div className="compare__col">
                      <p className="tag tag--ok">Copie solide</p>
                      <p className="compare__text">{task.comparison.strong.text}</p>
                      <p className="small muted">{task.comparison.strong.comment}</p>
                    </div>
                    <div className="compare__diff note note--accent">
                      <p className="note__title">Ce qui fait la différence</p>
                      <p>{task.comparison.difference}</p>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="stack-sm">
              <h3>Autoévaluation</h3>
              {task.criteria.map((c) => (
                <label key={c.id} className={`choice${checked[c.id] ? ' choice--on' : ''}`}>
                  <input
                    type="checkbox"
                    checked={!!checked[c.id]}
                    onChange={(e) => setWrittenCriteria(task.id, { ...checked, [c.id]: e.target.checked })}
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
              <p className="strong">Autoévaluation : {selfScore(task.criteria, checked)} / 10</p>
              <p className="tiny muted">
                Cette note est indicative et ne vaut pas la note d’un correcteur. Elle sert à repérer ce qui manque,
                pas à prédire un résultat.
              </p>
            </div>
          </>
        )}
      </section>

      <section className="card stack-sm">
        <h2 className="card__title">Origine du sujet</h2>
        <p className="small">{task.origin}</p>
        <p className="tiny muted">
          Compétences travaillées :{' '}
          {task.skillIds.map((s) => getSkill(s)?.title ?? s).join(' · ')}.
        </p>
        <button type="button" className="btn btn--quiet no-print" onClick={() => window.print()}>
          <IconPrint />
          Imprimer le sujet
        </button>
      </section>
    </div>
  )
}
