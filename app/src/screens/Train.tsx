/** « M’entraîner » : point d'entrée unique vers exercices, oral, rédaction, examens. */

import { Link } from 'react-router-dom'
import { inventory } from '@/content/registry'
import { SUBJECT_LABELS, type Subject } from '@/content/types'
import { IconArrowRight, IconClock, IconMic } from '@/ui/Icons'

const SUBJECTS: Subject[] = ['calculs', 'francais', 'sante', 'oral']

export function TrainIndex() {
  const inv = inventory()
  return (
    <div className="wrap stack-lg">
      <header className="page-head">
        <p className="page-head__eyebrow">M’entraîner</p>
        <h1>Choisir ce que je travaille</h1>
        <p>
          Les exercices s’adaptent à votre niveau sur chaque compétence. Vous pouvez aussi passer un examen blanc
          complet ou préparer l’entretien.
        </p>
      </header>

      <section className="stack-sm">
        <h2>Par matière</h2>
        {SUBJECTS.map((s) => (
          <Link key={s} to={`/entrainement/matiere/${s}`} className="card link-card">
            <h3 className="card__title">{SUBJECT_LABELS[s]}</h3>
            <p className="card__meta">{describe(s, inv)}</p>
            <span className="link-card__arrow" aria-hidden="true">
              <IconArrowRight />
            </span>
          </Link>
        ))}
      </section>

      <section className="stack-sm">
        <h2>Épreuves complètes</h2>

        <Link to="/entrainement/examens" className="card link-card">
          <h3 className="card__title">
            <IconClock /> Examens blancs écrits
          </h3>
          <p>
            {inv.examPapers} sujets. Rédaction 30 minutes sur 10, calculs 30 minutes sur 10. Chronomètre qui résiste
            au rechargement, aucun indice pendant l’épreuve.
          </p>
          <span className="link-card__arrow" aria-hidden="true">
            <IconArrowRight />
          </span>
        </Link>

        <Link to="/entrainement/oral" className="card link-card">
          <h3 className="card__title">
            <IconMic /> Entretien professionnel
          </h3>
          <p>
            {inv.oralQuestions} questions et {inv.oralFollowUps} relances, avec grilles d’autoévaluation. Aucun micro
            n’est nécessaire.
          </p>
          <span className="link-card__arrow" aria-hidden="true">
            <IconArrowRight />
          </span>
        </Link>

        <Link to="/entrainement/redaction" className="card link-card">
          <h3 className="card__title">Sujets de rédaction</h3>
          <p>
            {inv.writtenTasks} sujets commentés, avec corrigé de référence, autres réponses recevables et comparaison
            entre une copie faible et une copie solide.
          </p>
          <span className="link-card__arrow" aria-hidden="true">
            <IconArrowRight />
          </span>
        </Link>
      </section>
    </div>
  )
}

function describe(s: Subject, inv: ReturnType<typeof inventory>): string {
  switch (s) {
    case 'calculs':
      return `${inv.mathStructures} types d’exercices, chacun produisant de nombreuses variantes`
    case 'francais':
      return `${inv.frenchExercises} micro-exercices et ${inv.writtenTasks} sujets rédigés`
    case 'sante':
      return `${inv.healthSheets} fiches et ${inv.healthQuestions} questions de compréhension`
    case 'oral':
      return `${inv.oralQuestions} questions d’entretien avec relances`
  }
}
