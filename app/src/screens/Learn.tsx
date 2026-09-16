/**
 * « Apprendre » : matières, compétences, leçons.
 *
 * Chaque compétence suit le même parcours : à quoi cela sert, explication,
 * exemple entièrement résolu, exercice accompagné, exercices autonomes,
 * application différente, révision ultérieure.
 */

import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '@/app/store'
import { lessonFor, oralFor, sheetById, templatesFor, frenchFor, writtenFor } from '@/content/registry'
import { getSkill, orderedSkills } from '@/content/skills'
import {
  LEVEL_LABELS,
  STATUS_LABELS,
  SUBJECT_LABELS,
  type Lesson,
  type Subject,
} from '@/content/types'
import { explainState } from '@/engine/mastery'
import { MASTERY_HELP, MASTERY_LABELS } from '@/store/schema'
import { Blocks } from '@/ui/Blocks'
import { Visual } from '@/ui/Visual'
import { IconArrowLeft, IconArrowRight } from '@/ui/Icons'

const SUBJECTS: Subject[] = ['calculs', 'francais', 'sante', 'oral']

const SUBJECT_INTRO: Record<Subject, string> = {
  calculs:
    'Vingt chapitres, des nombres aux problèmes à plusieurs étapes. Chaque exercice est corrigé par un calcul exact, jamais par une approximation.',
  francais:
    'Douze compétences, de la lecture de consigne à la rédaction en trente minutes, avec des copies comparées pour voir ce qui fait la différence.',
  sante:
    'Vingt-quatre fiches : définition simple, vocabulaire, enjeux, exemple fictif, rôle des professionnels, questions et argumentation.',
  oral: 'Douze axes d’entretien, soixante questions avec relances, et des trames que vous remplissez vous-même.',
}

export function LearnIndex() {
  const { state } = useStore()
  return (
    <div className="wrap stack-lg">
      <header className="page-head">
        <p className="page-head__eyebrow">Apprendre</p>
        <h1>Les quatre matières</h1>
        <p>Vous pouvez lire n’importe quelle leçon, dans l’ordre que vous voulez, sans passer de test au préalable.</p>
      </header>

      {SUBJECTS.map((s) => {
        const skills = orderedSkills(s)
        const done = skills.filter((k) => state.skills[k.id]?.state === 'consolidee').length
        return (
          <Link key={s} to={`/apprendre/${s}`} className="card link-card">
            <h2 className="card__title">{SUBJECT_LABELS[s]}</h2>
            <p>{SUBJECT_INTRO[s]}</p>
            <p className="card__meta">
              {skills.length} compétences · {done} consolidée{done > 1 ? 's' : ''}
            </p>
            <span className="link-card__arrow" aria-hidden="true">
              <IconArrowRight />
            </span>
          </Link>
        )
      })}

      <Link to="/fiches" className="btn btn--secondary">
        Voir les 24 fiches sanitaires et sociales
      </Link>
    </div>
  )
}

export function LearnSubject() {
  const { subject } = useParams<{ subject: Subject }>()
  const { state } = useStore()
  if (!subject || !SUBJECTS.includes(subject)) return <p>Matière inconnue.</p>
  const skills = orderedSkills(subject)

  return (
    <div className="wrap stack">
      <Link to="/apprendre" className="btn btn--ghost">
        <IconArrowLeft />
        Toutes les matières
      </Link>
      <header className="page-head">
        <p className="page-head__eyebrow">Apprendre</p>
        <h1>{SUBJECT_LABELS[subject]}</h1>
        <p>{SUBJECT_INTRO[subject]}</p>
      </header>

      <ul className="list-reset stack-sm">
        {skills.map((sk) => {
          const p = state.skills[sk.id]
          const target = subject === 'sante' ? `/fiches/${sk.id}` : `/apprendre/${subject}/${sk.id}`
          return (
            <li key={sk.id}>
              <Link to={target} className="card link-card">
                <p className="card__meta">{sk.id}</p>
                <h2 className="card__title">{sk.title}</h2>
                <p className="small">{sk.purpose}</p>
                <p>
                  <span className={`tag ${tagClass(p?.state)}`}>{MASTERY_LABELS[p?.state ?? 'non-evaluee']}</span>
                </p>
                <span className="link-card__arrow" aria-hidden="true">
                  <IconArrowRight />
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function tagClass(s?: string): string {
  if (s === 'consolidee') return 'tag--ok'
  if (s === 'fragile') return 'tag--alert'
  if (s === 'a-consolider') return 'tag--warn'
  return ''
}

export function LearnSkill() {
  const { subject, skillId } = useParams<{ subject: Subject; skillId: string }>()
  const { state, markLessonRead, startSession } = useStore()
  const navigate = useNavigate()
  const skill = skillId ? getSkill(skillId) : undefined
  const lesson = skillId ? lessonFor(skillId) : undefined

  if (!skill) return <p>Compétence inconnue.</p>
  if (skill.subject === 'sante') return <p>Cette compétence est présentée sous forme de fiche.</p>

  const p = state.skills[skill.id]
  const templates = templatesFor(skill.id)
  const french = frenchFor(skill.id)
  const written = writtenFor(skill.id)
  const oral = oralFor(skill.id)
  const counts = { templates: templates.length, french: french.length, written: written.length, oral: oral.length }

  return (
    <div className="wrap stack">
      <Link to={`/apprendre/${subject}`} className="btn btn--ghost">
        <IconArrowLeft />
        {SUBJECT_LABELS[skill.subject]}
      </Link>

      <header className="page-head">
        <p className="page-head__eyebrow">{skill.id}</p>
        <h1>{skill.title}</h1>
        <p className="lead">{skill.purpose}</p>
        <p>
          <span className={`tag ${tagClass(p?.state)}`}>{MASTERY_LABELS[p?.state ?? 'non-evaluee']}</span>{' '}
          <span className="small muted">{explainState(p)}</span>
        </p>
      </header>

      {lesson ? (
        <>
          <article className="card">
            <LessonBody lesson={lesson} />
          </article>

          <section className="card stack-sm">
            <h2 className="card__title">Objectifs</h2>
            <ul>
              {skill.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            {skill.prerequisites.length > 0 && (
              <p className="small">
                Prérequis :{' '}
                {skill.prerequisites.map((pr, i) => (
                  <span key={pr}>
                    {i > 0 && ' · '}
                    <Link to={`/apprendre/${getSkill(pr)?.subject}/${pr}`}>{getSkill(pr)?.title ?? pr}</Link>
                  </span>
                ))}
              </p>
            )}
            <p className="tiny muted">
              Statut : {STATUS_LABELS[skill.status]}. Priorité {skill.priority}.
            </p>
          </section>

          <section className="card card--accent stack-sm">
            <h2 className="card__title">S’entraîner sur cette compétence</h2>
            <p className="small">
              {counts.templates > 0 && `${counts.templates} types d’exercices`}
              {counts.french > 0 && `${counts.french} micro-exercices`}
              {counts.written > 0 && ` · ${counts.written} sujet${counts.written > 1 ? 's' : ''} rédigé${counts.written > 1 ? 's' : ''}`}
              {counts.oral > 0 && ` · ${counts.oral} question${counts.oral > 1 ? 's' : ''} d’oral`}
              {' — trois niveaux : '}
              {Object.values(LEVEL_LABELS).join(', ')}.
            </p>
            <div className="btn-row">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => {
                  markLessonRead(skill.id)
                  startSession({ minutes: state.profile.dailyMinutes, skillId: skill.id })
                  navigate('/seance')
                }}
              >
                Commencer les exercices
                <IconArrowRight />
              </button>
              <button type="button" className="btn btn--quiet" onClick={() => markLessonRead(skill.id)}>
                J’ai lu cette leçon
              </button>
            </div>
          </section>

          <p className="tiny muted">
            {MASTERY_HELP[p?.state ?? 'non-evaluee']} Une compétence n’est marquée « consolidée » qu’après des
            réussites sans aide, sur plusieurs types d’exercices et plusieurs jours.
          </p>
        </>
      ) : (
        <p className="note note--warn">
          La leçon de cette compétence n’est pas encore rédigée. Elle n’alimente donc aucune séance et n’affiche
          aucune maîtrise.
        </p>
      )}
    </div>
  )
}

/** Corps d'une leçon, réutilisé dans les séances. */
export function LessonBody({ lesson }: { lesson: Lesson }) {
  return (
    <div className="lesson stack">
      <section>
        <h2 className="lesson__h">Comprendre</h2>
        <Blocks blocks={lesson.explanation} reading />
      </section>

      {lesson.workedExamples.map((w, i) => (
        <section key={i} className="worked">
          <h2 className="lesson__h">Un exemple entièrement résolu</h2>
          <p className="worked__statement">{w.statement}</p>
          {w.visual && <Visual visual={w.visual} />}
          <ol className="worked__steps">
            {w.steps.map((s, j) => (
              <li key={j}>
                <p className="worked__do">{s.do}</p>
                {s.calc && <code className="worked__calc">{s.calc}</code>}
                <p className="worked__why">Pourquoi : {s.why}</p>
              </li>
            ))}
          </ol>
          <p className="worked__conclusion">{w.conclusion}</p>
        </section>
      ))}

      <details className="details">
        <summary>Explique-moi autrement</summary>
        <Blocks blocks={lesson.alternative} reading />
      </details>

      <section>
        <h2 className="lesson__h">Erreurs fréquentes</h2>
        <ul className="list-reset stack-sm">
          {lesson.commonMistakes.map((m, i) => (
            <li key={i} className="mistake">
              <p className="mistake__what">
                <span aria-hidden="true">✗</span> {m.mistake}
              </p>
              <p className="mistake__fix">
                <span aria-hidden="true">→</span> {m.fix}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {lesson.sources && lesson.sources.length > 0 && (
        <section>
          <h2 className="lesson__h">Sources</h2>
          <ul className="small">
            {lesson.sources.map((s, i) => (
              <li key={i}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noreferrer noopener">
                    {s.label}
                  </a>
                ) : (
                  s.label
                )}
                {s.checkedOn ? ` — consultée le ${s.checkedOn}` : ' — à vérifier à la source'}
                {s.note && <> · {s.note}</>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export function sheetOf(id: string) {
  return sheetById(id)
}
