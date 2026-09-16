/**
 * Première ouverture : trois questions au maximum, toutes facultatives, puis
 * accès immédiat à une vraie séance. Aucun bilan obligatoire.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/app/store'
import { SUBJECT_LABELS, type Subject } from '@/content/types'

const CHOICES: { id: Subject | 'bilan'; label: string; help: string }[] = [
  { id: 'calculs', label: 'Les calculs', help: 'Nombres, opérations, conversions, durées, pourcentages.' },
  { id: 'francais', label: 'Le français et la rédaction', help: 'Comprendre une consigne, reformuler, argumenter, écrire en 30 minutes.' },
  { id: 'sante', label: 'La culture sanitaire et sociale', help: '24 fiches : prévention, vieillissement, droits, santé mentale…' },
  { id: 'oral', label: 'L’entretien professionnel', help: 'Se présenter, parler de son projet, raconter une expérience.' },
  {
    id: 'bilan',
    label: 'Faire un petit bilan d’abord',
    help: 'Quelques exercices répartis sur les quatre matières, sans leçon préalable, pour situer un point de départ. Vous pouvez l’arrêter à tout moment, et une compétence non testée restera « non évaluée ».',
  },
]

export function Onboarding() {
  const { setProfile, startSession } = useStore()
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [minutes, setMinutes] = useState(20)
  const [start, setStart] = useState<Subject | 'bilan' | null>(null)

  const begin = () => {
    setProfile({ firstName: firstName.trim(), dailyMinutes: minutes, startPreference: start, onboarded: true })
    startSession({
      minutes,
      subject: start && start !== 'bilan' ? start : undefined,
      diagnostic: start === 'bilan',
    })
    navigate('/seance')
  }

  const skip = () => {
    setProfile({ onboarded: true })
    navigate('/')
  }

  return (
    <div className="wrap stack-lg">
      <header className="page-head">
        <p className="page-head__eyebrow">Prépa IFSI</p>
        <h1>Mon parcours vers infirmière</h1>
        <p>
          Préparation aux épreuves d’entrée en IFSI par la formation professionnelle continue. Trois questions,
          toutes facultatives, puis vous commencez.
        </p>
      </header>

      <section className="card stack">
        <div>
          <h2 className="card__title">1. Comment souhaitez-vous être appelée ?</h2>
          <p className="small muted">Facultatif. Vous pouvez laisser vide.</p>
        </div>
        <label className="field">
          <span className="field__label">Prénom</span>
          <input
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Votre prénom"
            autoComplete="given-name"
            maxLength={40}
          />
        </label>
      </section>

      <section className="card stack">
        <div>
          <h2 className="card__title">2. Combien de temps par séance ?</h2>
          <p className="small muted">Modifiable chaque jour. Une séance courte faite régulièrement vaut mieux qu’une longue séance rare.</p>
        </div>
        <div className="segmented" role="group" aria-label="Durée d’une séance">
          {[10, 20, 30].map((m) => (
            <button
              key={m}
              type="button"
              className="segmented__btn"
              aria-pressed={minutes === m}
              onClick={() => setMinutes(m)}
            >
              {m} minutes
            </button>
          ))}
        </div>
      </section>

      <section className="card stack">
        <div>
          <h2 className="card__title">3. Par quoi voulez-vous commencer ?</h2>
          <p className="small muted">Facultatif également. Vous pourrez changer de matière quand vous voulez.</p>
        </div>
        <div>
          {CHOICES.map((c) => (
            <label key={c.id} className={`choice${start === c.id ? ' choice--on' : ''}`}>
              <input
                type="radio"
                name="start"
                checked={start === c.id}
                onChange={() => setStart(c.id)}
              />
              <span>
                <span className="strong">{c.label}</span>
                <br />
                <span className="small muted">{c.help}</span>
              </span>
            </label>
          ))}
        </div>
      </section>

      <div className="note">
        <p className="note__title">Ce que l’application ne fait pas</p>
        <p>
          Elle n’attribue aucun niveau tant que vous n’avez pas fait d’exercice : une compétence non testée reste
          « non évaluée ». Elle n’annonce jamais de probabilité de réussite, et n’affiche aucune date d’épreuve qui
          ne serait pas confirmée par une source officielle.
        </p>
      </div>

      <div className="btn-row">
        <button type="button" className="btn btn--primary btn--big" onClick={begin}>
          Commencer ma première séance
        </button>
      </div>
      <p className="center">
        <button type="button" className="btn btn--ghost" onClick={skip}>
          Explorer l’application sans commencer
        </button>
      </p>
      <p className="tiny muted center">
        Vos réponses restent sur cet appareil. Aucun compte, aucun envoi vers un service extérieur.
      </p>
      <p className="tiny muted center">Matières couvertes : {Object.values(SUBJECT_LABELS).join(' · ')}.</p>
    </div>
  )
}
