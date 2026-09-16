/**
 * Déroulement d'une séance.
 *
 * La séance est entièrement reprise depuis l'état enregistré : on peut fermer
 * l'onglet au milieu d'une réponse et la retrouver telle quelle.
 */

import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '@/app/store'
import {
  frenchById,
  generate,
  lessonFor,
  oralById,
  sheetById,
} from '@/content/registry'
import { getSkill } from '@/content/skills'
import { LEVEL_LABELS, SUBJECT_SHORT, type GeneratedExercise } from '@/content/types'
import { ERROR_LABELS } from '@/engine/answer'
import { explainState } from '@/engine/mastery'
import { MASTERY_LABELS } from '@/store/schema'
import { Blocks } from '@/ui/Blocks'
import { ExerciseView } from '@/ui/ExerciseView'
import { IconArrowLeft, IconArrowRight, IconCheck } from '@/ui/Icons'
import { LessonBody } from './Learn'
import { OralPractice } from './Oral'

const REASONS: Record<string, string> = {
  revision: 'Révision prévue',
  difficulte: 'On reprend plus simplement',
  nouveau: 'Notion nouvelle',
  rappel: 'À confirmer seule',
  transfert: 'Application différente',
}

export function SessionRunner() {
  const store = useStore()
  const { state } = store
  const navigate = useNavigate()
  const session = state.session

  if (!session) {
    return (
      <div className="wrap stack">
        <h1>Aucune séance en cours</h1>
        <p>Revenez à l’accueil pour en démarrer une.</p>
        <Link className="btn btn--primary" to="/">
          Retour à Aujourd’hui
        </Link>
      </div>
    )
  }

  if (session.finishedAt || session.index >= session.items.length) {
    return <SessionReport />
  }

  const item = session.items[session.index]!
  const skill = getSkill(item.skillId)
  const doneCount = session.items.slice(0, session.index).length

  const header = (
    <div className="session-head no-print">
      <div className="session-head__row">
        <Link to="/" className="btn btn--ghost" aria-label="Quitter la séance et revenir à l’accueil">
          <IconArrowLeft />
          Quitter
        </Link>
        <span className="session-head__count">
          {session.index + 1} / {session.items.length}
        </span>
      </div>
      <div className="bar" aria-hidden="true">
        <div className="bar__fill" style={{ width: `${(doneCount / session.items.length) * 100}%` }} />
      </div>
      <p className="session-head__meta">
        <span className="tag tag--accent">{SUBJECT_SHORT[item.subject]}</span>
        <span className="tag">{REASONS[item.reason] ?? item.reason}</span>
        <span className="tag">{LEVEL_LABELS[item.level]}</span>
        <span className="muted small">{skill?.title}</span>
      </p>
    </div>
  )

  return (
    <div className="wrap stack">
      {header}
      {item.kind === 'lecon' && (
        <LessonStep
          skillId={item.skillId}
          onDone={() => {
            store.markLessonRead(item.skillId)
            store.nextItem()
          }}
        />
      )}

      {item.kind === 'exercice' && <MathStep itemId={item.id} ref_={item.ref} seed={item.seed!} skillId={item.skillId} />}

      {item.kind === 'francais' && <FrenchStep itemId={item.id} ref_={item.ref} skillId={item.skillId} />}

      {item.kind === 'fiche' && <SheetStep itemId={item.id} sheetId={item.ref} />}

      {item.kind === 'oral' && (
        <OralStep questionId={item.ref} onDone={() => store.nextItem()} />
      )}

      <div className="btn-row no-print">
        <button type="button" className="btn btn--quiet" onClick={() => store.skipItem()}>
          Passer, je connais déjà
        </button>
        <button
          type="button"
          className="btn btn--quiet"
          onClick={() => {
            store.finishSession()
            navigate('/seance')
          }}
        >
          Terminer la séance maintenant
        </button>
      </div>
    </div>
  )
}

function LessonStep({ skillId, onDone }: { skillId: string; onDone: () => void }) {
  const lesson = lessonFor(skillId)
  const skill = getSkill(skillId)
  if (!lesson || !skill) return null
  return (
    <div className="card stack">
      <div>
        <p className="page-head__eyebrow">Leçon</p>
        <h1>{skill.title}</h1>
        <p className="lead">{skill.purpose}</p>
      </div>
      <LessonBody lesson={lesson} />
      <button type="button" className="btn btn--primary btn--big" onClick={onDone}>
        J’ai lu, passons à l’exercice
        <IconArrowRight />
      </button>
    </div>
  )
}

function MathStep({
  itemId,
  ref_,
  seed,
  skillId,
}: {
  itemId: string
  ref_: string
  seed: number
  skillId: string
}) {
  const store = useStore()
  const session = store.state.session!
  const answer = session.answers[itemId]!
  const exercise = useMemo(() => generate(ref_, seed), [ref_, seed])
  if (!exercise) return <p>Contenu indisponible.</p>
  return (
    <div className="card">
      <ExerciseView
        exercise={exercise}
        resetKey={itemId}
        skillId={skillId}
        state={answer}
        onDraft={(v) => store.setDraft(itemId, v)}
        onPicked={(v) => store.setPicked(itemId, v)}
        onHint={() => store.useHint(itemId)}
        onAlternative={() => store.useAlternative(itemId)}
        onSubmit={(v) =>
          store.submitItem(itemId, {
            correct: v.correct,
            tag: v.tag,
            message: v.message,
            given: answer.draft || answer.picked.join(', '),
          })
        }
        onRetry={() => {
          store.addRetry(itemId)
          store.nextItem()
        }}
        onNext={() => store.nextItem()}
      />
    </div>
  )
}

function FrenchStep({ itemId, ref_, skillId }: { itemId: string; ref_: string; skillId: string }) {
  const store = useStore()
  const session = store.state.session!
  const answer = session.answers[itemId]!
  const e = frenchById(ref_)
  // L'objet est mémoïsé : un nouvel objet à chaque rendu provoquerait une
  // réinitialisation permanente de la correction affichée.
  const exercise = useMemo<GeneratedExercise | null>(
    () =>
      e
        ? {
            prompt: e.prompt,
            question: e.question,
            answer: e.answer,
            hints: e.hints,
            alternative: e.alternative,
            solution: e.solution,
            placeholder: e.placeholder,
            keyboard: 'text',
          }
        : null,
    [e],
  )
  if (!e || !exercise) return <p>Contenu indisponible.</p>
  return (
    <div className="card">
      <ExerciseView
        exercise={exercise}
        resetKey={itemId}
        skillId={skillId}
        state={answer}
        onDraft={(v) => store.setDraft(itemId, v)}
        onPicked={(v) => store.setPicked(itemId, v)}
        onHint={() => store.useHint(itemId)}
        onAlternative={() => store.useAlternative(itemId)}
        onSubmit={(v) =>
          store.submitItem(itemId, {
            correct: v.correct,
            tag: v.tag,
            message: v.message,
            given: answer.draft || answer.picked.join(', '),
          })
        }
        onNext={() => store.nextItem()}
      />
    </div>
  )
}

function SheetStep({ itemId, sheetId }: { itemId: string; sheetId: string }) {
  const store = useStore()
  const session = store.state.session!
  const answer = session.answers[itemId]!
  const sheet = sheetById(sheetId)
  const q = sheet
    ? sheet.comprehension[(store.state.skills[sheetId]?.seenCounter ?? 0) % sheet.comprehension.length]!
    : undefined
  // Les hooks sont appelés avant toute sortie anticipée.
  const exercise = useMemo<GeneratedExercise | null>(
    () =>
      sheet && q
        ? {
            prompt: [],
            question: q.question,
            answer: q.answer,
            hints: [
              'Relisez la définition et les enjeux de la fiche : la réponse s’y trouve.',
              'Éliminez d’abord les réponses qui contredisent la fiche, puis comparez les deux restantes.',
            ],
            alternative: sheet.stakes,
            solution: [{ text: q.explain }],
          }
        : null,
    [q, sheet],
  )
  if (!sheet || !exercise) return <p>Fiche indisponible.</p>
  return (
    <div className="card stack">
      <div>
        <p className="page-head__eyebrow">Fiche {sheet.id}</p>
        <h1>{sheet.title}</h1>
        <p className="lead">{sheet.purpose}</p>
      </div>
      <Blocks blocks={sheet.definition} reading />
      <details className="details">
        <summary>Vocabulaire à connaître</summary>
        <dl className="vocab">
          {sheet.vocabulary.map((v) => (
            <div key={v.term} className="vocab__row">
              <dt>{v.term}</dt>
              <dd>{v.def}</dd>
            </div>
          ))}
        </dl>
      </details>
      <hr className="divider" />
      <ExerciseView
        exercise={exercise}
        resetKey={itemId}
        skillId={sheetId}
        state={answer}
        onDraft={(v) => store.setDraft(itemId, v)}
        onPicked={(v) => store.setPicked(itemId, v)}
        onHint={() => store.useHint(itemId)}
        onAlternative={() => store.useAlternative(itemId)}
        onSubmit={(v) => {
          store.markSheetRead(sheetId)
          store.submitItem(itemId, {
            correct: v.correct,
            tag: v.tag,
            message: v.message,
            given: answer.picked.join(', '),
          })
        }}
        onNext={() => store.nextItem()}
      />
      <Link className="btn btn--quiet" to={`/fiches/${sheet.id}`}>
        Lire la fiche complète
      </Link>
    </div>
  )
}

function OralStep({ questionId, onDone }: { questionId: string; onDone: () => void }) {
  const q = oralById(questionId)
  if (!q) return <p>Question indisponible.</p>
  return <OralPractice question={q} onDone={onDone} />
}

/** Bilan de fin de séance : ce qui a été travaillé, ce qui reste fragile, quoi faire ensuite. */
function SessionReport() {
  const { state, abandonSession } = useStore()
  const navigate = useNavigate()
  const session = state.session!

  const answered = session.items.filter((i) => session.answers[i.id]?.submitted)
  const right = answered.filter((i) => session.answers[i.id]?.correct)
  const wrong = answered.filter((i) => !session.answers[i.id]?.correct)
  const aided = answered.filter(
    (i) => session.answers[i.id]?.correct && (session.answers[i.id]!.hintsUsed > 0 || session.answers[i.id]!.usedAlternative),
  )
  const skillsTouched = [...new Set(session.items.map((i) => i.skillId))]
  const fragile = skillsTouched.filter((id) => state.skills[id]?.state === 'fragile')
  const toConfirm = skillsTouched.filter((id) => state.skills[id]?.state === 'a-consolider')
  const lessonsRead = session.items.filter((i) => i.kind === 'lecon').length

  return (
    <div className="wrap stack-lg">
      <header className="page-head">
        <p className="page-head__eyebrow">Séance terminée</p>
        <h1>Ce que vous venez de faire</h1>
      </header>

      <section className="card stack-sm">
        <h2 className="card__title">Travaillé</h2>
        {answered.length === 0 && lessonsRead === 0 ? (
          <p>Aucun exercice validé pendant cette séance. Rien n’a été enregistré comme acquis.</p>
        ) : (
          <ul>
            {lessonsRead > 0 && <li>{lessonsRead} leçon{lessonsRead > 1 ? 's' : ''} lue{lessonsRead > 1 ? 's' : ''}.</li>}
            {answered.length > 0 && (
              <li>
                {answered.length} exercice{answered.length > 1 ? 's' : ''} validé{answered.length > 1 ? 's' : ''}, dont{' '}
                {right.length} réussi{right.length > 1 ? 's' : ''}.
              </li>
            )}
            {aided.length > 0 && (
              <li>
                {aided.length} réussite{aided.length > 1 ? 's' : ''} obtenue{aided.length > 1 ? 's' : ''} avec une aide :
                comptée{aided.length > 1 ? 's' : ''} « à consolider », pas « consolidée ».
              </li>
            )}
          </ul>
        )}
      </section>

      {wrong.length > 0 && (
        <section className="card stack-sm">
          <h2 className="card__title">Ce qui reste fragile</h2>
          <ul>
            {wrong.map((i) => {
              const a = session.answers[i.id]!
              return (
                <li key={i.id}>
                  <span className="strong">{getSkill(i.skillId)?.title}</span>
                  {a.tag && <> — cause repérée : {ERROR_LABELS[a.tag].toLowerCase()}</>}
                </li>
              )
            })}
          </ul>
        </section>
      )}

      <section className="card stack-sm">
        <h2 className="card__title">État des compétences travaillées</h2>
        <ul className="list-reset stack-sm">
          {skillsTouched.map((id) => {
            const p = state.skills[id]
            return (
              <li key={id}>
                <span className="strong">{getSkill(id)?.title}</span>{' '}
                <span className="tag">{MASTERY_LABELS[p?.state ?? 'non-evaluee']}</span>
                <br />
                <span className="small muted">{explainState(p)}</span>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="card card--accent stack-sm">
        <h2 className="card__title">Prochaine action</h2>
        {fragile.length > 0 ? (
          <p>
            Reprendre « {getSkill(fragile[0]!)?.title} » à partir de la leçon : c’est la seule chose à faire avant
            d’aller plus loin.
          </p>
        ) : toConfirm.length > 0 ? (
          <p>
            Refaire « {getSkill(toConfirm[0]!)?.title} » seule lors d’une prochaine séance pour confirmer. La
            révision est déjà programmée.
          </p>
        ) : (
          <p>Rien de fragile aujourd’hui. La prochaine séance proposera une notion nouvelle.</p>
        )}
        <div className="btn-row">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => {
              abandonSession()
              navigate('/')
            }}
          >
            <IconCheck />
            Revenir à Aujourd’hui
          </button>
          <Link className="btn btn--secondary" to="/progres">
            Voir mes progrès
          </Link>
        </div>
      </section>
    </div>
  )
}
