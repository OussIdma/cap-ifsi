/** Entraînement libre : choisir une compétence précise dans une matière. */

import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '@/app/store'
import { frenchFor, oralFor, sheetById, templatesFor, writtenFor } from '@/content/registry'
import { orderedSkills } from '@/content/skills'
import { LEVEL_LABELS, SUBJECT_LABELS, type Level, type Subject } from '@/content/types'
import { explainState } from '@/engine/mastery'
import { MASTERY_LABELS } from '@/store/schema'
import { IconArrowLeft, IconArrowRight } from '@/ui/Icons'

const SUBJECTS: Subject[] = ['calculs', 'francais', 'sante', 'oral']

export function FreePractice() {
  const { subject } = useParams<{ subject: Subject }>()
  const { state, startSession } = useStore()
  const navigate = useNavigate()
  if (!subject || !SUBJECTS.includes(subject)) return <p>Matière inconnue.</p>
  const skills = orderedSkills(subject)

  return (
    <div className="wrap stack">
      <Link to="/entrainement" className="btn btn--ghost">
        <IconArrowLeft />
        M’entraîner
      </Link>
      <header className="page-head">
        <p className="page-head__eyebrow">M’entraîner</p>
        <h1>{SUBJECT_LABELS[subject]}</h1>
        <p>
          Choisissez librement une compétence. Le niveau proposé suit votre progression, mais vous pouvez travailler
          n’importe quoi à tout moment.
        </p>
      </header>

      <ul className="list-reset stack-sm">
        {skills.map((sk) => {
          const p = state.skills[sk.id]
          const levels = availableLevels(sk.id, subject)
          const count = contentCount(sk.id, subject)
          const target =
            subject === 'oral'
              ? `/entrainement/oral?axe=${sk.id}`
              : subject === 'sante'
                ? `/fiches/${sk.id}`
                : null
          return (
            <li key={sk.id} className="card stack-sm">
              <div>
                <p className="card__meta">{sk.id}</p>
                <h2 className="card__title">{sk.title}</h2>
                <p className="small">{sk.purpose}</p>
              </div>
              <p>
                <span className="tag">{MASTERY_LABELS[p?.state ?? 'non-evaluee']}</span>{' '}
                <span className="small muted">{explainState(p)}</span>
              </p>
              {count === 0 ? (
                <p className="note note--warn">
                  Aucun contenu publié pour cette compétence : elle n’alimente aucune séance.
                </p>
              ) : (
                <>
                  <p className="tiny muted">
                    {count} contenu{count > 1 ? 's' : ''} ·{' '}
                    {levels.length ? levels.map((l) => LEVEL_LABELS[l]).join(' · ') : 'niveau unique'}
                  </p>
                  <div className="btn-row">
                    {target ? (
                      <Link className="btn btn--primary" to={target}>
                        Travailler
                        <IconArrowRight />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="btn btn--primary"
                        onClick={() => {
                          startSession({ minutes: state.profile.dailyMinutes, skillId: sk.id })
                          navigate('/seance')
                        }}
                      >
                        Travailler
                        <IconArrowRight />
                      </button>
                    )}
                    <Link className="btn btn--quiet" to={`/apprendre/${subject}/${sk.id}`}>
                      Revoir la leçon
                    </Link>
                  </div>
                </>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function availableLevels(skillId: string, subject: Subject): Level[] {
  const all: Level[] = ['decouverte', 'entrainement', 'epreuve']
  if (subject === 'calculs') return all.filter((l) => templatesFor(skillId, l).length > 0)
  if (subject === 'francais') return all.filter((l) => frenchFor(skillId, l).length > 0)
  return []
}

function contentCount(skillId: string, subject: Subject): number {
  switch (subject) {
    case 'calculs':
      return templatesFor(skillId).length
    case 'francais':
      return frenchFor(skillId).length + writtenFor(skillId).length
    case 'sante':
      return sheetById(skillId) ? 1 : 0
    case 'oral':
      return oralFor(skillId).length
  }
}
