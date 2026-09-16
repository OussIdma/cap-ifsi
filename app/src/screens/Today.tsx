/**
 * Écran « Aujourd'hui ».
 *
 * Une action principale, une durée, une phrase d'explication, une seule
 * priorité visible. Le reste est accessible mais discret.
 */

import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '@/app/store'
import { buildSession, describeSession, pickPriority } from '@/engine/session'
import { today } from '@/engine/mastery'
import { SUBJECT_SHORT, type Subject } from '@/content/types'
import { getSkill } from '@/content/skills'
import { IconArrowRight, IconClock, IconFolder, IconSettings } from '@/ui/Icons'

export function Today() {
  const { state, startSession, setProfile, abandonSession } = useStore()
  const navigate = useNavigate()
  const [minutes, setMinutes] = useState(state.profile.dailyMinutes)
  const day = today()

  const running = state.session && !state.session.finishedAt ? state.session : null
  const doneToday = running ? running.index : 0

  const preview = useMemo(
    () => buildSession(state, { minutes, day }),
    [state, minutes, day],
  )
  const priority = useMemo(() => pickPriority(state, day), [state, day])
  const sentence = running
    ? `Séance en cours : ${doneToday} étape${doneToday > 1 ? 's' : ''} sur ${running.items.length} déjà faite${doneToday > 1 ? 's' : ''}.`
    : describeSession(preview)

  const start = () => {
    setProfile({ dailyMinutes: minutes })
    startSession({ minutes })
    navigate('/seance')
  }

  const hello = state.profile.firstName ? `Bonjour ${state.profile.firstName}` : 'Bonjour'

  return (
    <div className="wrap stack-lg">
      <header className="page-head">
        <p className="page-head__eyebrow">{formatDay(day)}</p>
        <h1>{hello}</h1>
      </header>

      <section className="card card--accent stack">
        <p className="lead" style={{ marginBottom: 0 }}>
          {sentence}
        </p>

        {!running && (
          <div>
            <p className="field__label" id="duree-label">
              Durée de la séance
            </p>
            <div className="segmented" role="group" aria-labelledby="duree-label">
              {[10, 20, 30].map((m) => (
                <button
                  key={m}
                  type="button"
                  className="segmented__btn"
                  aria-pressed={minutes === m}
                  onClick={() => setMinutes(m)}
                >
                  {m} min
                </button>
              ))}
            </div>
          </div>
        )}

        {running ? (
          <div className="stack-sm">
            <Link to="/seance" className="btn btn--primary btn--big">
              Reprendre ma séance
              <IconArrowRight />
            </Link>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                abandonSession()
              }}
            >
              Abandonner cette séance et repartir de zéro
            </button>
          </div>
        ) : preview.length ? (
          <button type="button" className="btn btn--primary btn--big" onClick={start}>
            Commencer ma séance
            <IconArrowRight />
          </button>
        ) : (
          <p>
            Tout ce qui était prévu est à jour. Vous pouvez choisir librement une matière ci-dessous, ou revenir
            demain.
          </p>
        )}
      </section>

      {priority && (
        <section className="card stack-sm">
          <h2 className="card__title">Une priorité aujourd’hui</h2>
          <p>{priority.sentence}</p>
          <div className="btn-row">
            <Link
              className="btn btn--secondary"
              to={`/apprendre/${priority.subject}/${priority.skillId}`}
            >
              Voir la leçon
            </Link>
            <button
              type="button"
              className="btn btn--quiet"
              onClick={() => {
                startSession({ minutes, skillId: priority.skillId })
                navigate('/seance')
              }}
            >
              M’entraîner dessus
            </button>
          </div>
        </section>
      )}

      <section className="stack-sm">
        <h2>Choisir une autre matière</h2>
        <div className="subject-grid">
          {(['calculs', 'francais', 'sante', 'oral'] as Subject[]).map((s) => (
            <button
              key={s}
              type="button"
              className="subject-card"
              onClick={() => {
                startSession({ minutes, subject: s })
                navigate('/seance')
              }}
            >
              <span className="subject-card__name">{SUBJECT_SHORT[s]}</span>
              <span className="subject-card__meta">{countFor(state, s)}</span>
            </button>
          ))}
        </div>
      </section>

      <nav className="quiet-links no-print" aria-label="Accès secondaires">
        <Link to="/entrainement/examens" className="quiet-links__item">
          <IconClock />
          <span>Examens blancs</span>
        </Link>
        <Link to="/candidature" className="quiet-links__item">
          <IconFolder />
          <span>Ma candidature</span>
        </Link>
        <Link to="/reglages" className="quiet-links__item">
          <IconSettings />
          <span>Réglages</span>
        </Link>
      </nav>
    </div>
  )
}

function countFor(state: ReturnType<typeof useStore>['state'], subject: Subject): string {
  const ids = Object.keys(state.skills).filter((id) => getSkill(id)?.subject === subject)
  const consolidated = ids.filter((id) => state.skills[id]?.state === 'consolidee').length
  if (!ids.length) return 'Non évaluée'
  return `${consolidated} consolidée${consolidated > 1 ? 's' : ''}`
}

function formatDay(day: string): string {
  const [y, m, d] = day.split('-').map(Number)
  const date = new Date(y!, (m ?? 1) - 1, d ?? 1)
  return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
}
