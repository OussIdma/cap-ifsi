/**
 * « Ma candidature ».
 *
 * Checklist légère. Le soutien de l'employeur est distingué du financement
 * confirmé. Aucune décision automatique d'éligibilité. Aucune date d'épreuve
 * n'est affichée tant qu'elle n'a pas été confirmée par une source officielle
 * de la bonne session, saisie par l'utilisatrice.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '@/app/store'
import { IconArrowLeft, IconPrint } from '@/ui/Icons'

type Group = { title: string; note?: string; items: { id: string; label: string; help?: string }[] }

const GROUPS: Group[] = [
  {
    title: 'Dossier de candidature',
    note: 'Pièces prévues par le dossier national de la voie formation professionnelle continue. La notice locale peut en demander d’autres.',
    items: [
      { id: 'identite', label: 'Pièce d’identité' },
      { id: 'diplomes', label: 'Diplômes, certificats ou titres' },
      { id: 'cv', label: 'Curriculum vitæ à jour' },
      { id: 'attestations', label: 'Attestations de travail et de formation' },
      { id: 'lettre', label: 'Lettre exposant le projet professionnel' },
      { id: 'notice', label: 'Notice locale obtenue auprès de l’institut', help: 'C’est elle qui fait foi pour les pièces exactes et le calendrier.' },
    ],
  },
  {
    title: 'Dispense du baccalauréat',
    note: 'L’arrêté prévoit le baccalauréat, une équivalence ou une dispense. La dispense repose sur une demande de validation des études, expériences professionnelles et acquis personnels. La décision appartient au président de l’université, sur proposition de la commission d’admission : ce n’est ni automatique, ni une admission.',
    items: [
      { id: 'disp-formulaire', label: 'Formulaire de demande de dispense demandé à l’institut' },
      { id: 'disp-service', label: 'Service universitaire compétent identifié' },
      { id: 'disp-justif', label: 'Justificatifs rassemblés' },
      { id: 'disp-depose', label: 'Demande de dispense déposée' },
      { id: 'disp-accordee', label: 'Dispense accordée', help: 'À ne cocher qu’à réception d’une décision écrite.' },
      {
        id: 'disp-calendrier',
        label: 'Articulation du calendrier de dispense avec celui de la sélection vérifiée',
        help: 'Une dispense obtenue après la clôture des inscriptions ne sert à rien pour cette session.',
      },
    ],
  },
  {
    title: 'Employeur et financement',
    note: 'Un soutien n’est pas un financement. Ces états sont volontairement séparés : l’un peut exister sans l’autre.',
    items: [
      { id: 'soutien-oral', label: 'Soutien oral de l’employeur' },
      { id: 'demande-financement', label: 'Demande de financement déposée' },
      { id: 'accord-ecrit', label: 'Accord écrit de financement des frais pédagogiques' },
      { id: 'remuneration', label: 'Rémunération pendant la formation précisée par écrit' },
      { id: 'absence', label: 'Autorisation d’absence formalisée' },
      { id: 'frais-annexes', label: 'Frais annexes (transport, repas, matériel) évoqués' },
      { id: 'engagement', label: 'Éventuelle condition d’engagement connue et acceptée' },
    ],
  },
  {
    title: 'Parcours AS expérimentés',
    note: 'L’article 20 prévoit un parcours spécifique pour les aides-soignants expérimentés, avec des conditions d’ancienneté, une sélection par la voie FPC, une formation spécifique et l’avis de la commission. Votre éligibilité ne se déduit pas de l’intitulé de votre poste : elle doit être vérifiée auprès de l’institut.',
    items: [
      { id: 'as-anciennete', label: 'Ancienneté exacte et quotité de travail calculées' },
      { id: 'as-employeur', label: 'Position de l’employeur sur ce parcours connue' },
      { id: 'as-institut', label: 'Conditions vérifiées auprès de l’institut' },
    ],
  },
  {
    title: 'Sélection',
    items: [
      { id: 'sel-depose', label: 'Dossier de sélection déposé' },
      { id: 'sel-convoquee', label: 'Convocation reçue' },
      { id: 'sel-materiel', label: 'Matériel autorisé vérifié sur la convocation', help: 'Calculatrice notamment : la règle varie selon les instituts et les sessions.' },
      { id: 'sel-resultats', label: 'Résultats reçus' },
      { id: 'sel-place', label: 'Place confirmée' },
    ],
  },
]

const QUESTIONS_MODELE = `Bonjour,

Je suis aide-soignante salariée, sans baccalauréat, et mon employeur soutient mon projet d’entrée en formation infirmière.

Pourriez-vous me transmettre :
— le calendrier de sélection par la voie de la formation professionnelle continue pour la rentrée visée ;
— les modalités de demande de dispense du baccalauréat prévues par l’article 11 de l’arrêté du 20 février 2026, et le service universitaire compétent ;
— les conditions et les dates du parcours spécifique destiné aux aides-soignants expérimentés ;
— les règles de choix d’institut au sein du groupement ;
— les consignes relatives au matériel autorisé, notamment la calculatrice, et les modalités de l’entretien.

Je vous remercie par avance.`

export function Candidature() {
  const { state, setCandidature, addConfirmedDate, removeConfirmedDate, setContact } = useStore()
  const [newDate, setNewDate] = useState({ label: '', date: '', source: '', verifiedOn: '' })
  const [copied, setCopied] = useState(false)

  return (
    <div className="wrap stack-lg">
      <Link to="/" className="btn btn--ghost no-print">
        <IconArrowLeft />
        Aujourd’hui
      </Link>
      <header className="page-head">
        <p className="page-head__eyebrow">Ma candidature</p>
        <h1>Les démarches, sans mauvaise surprise</h1>
        <p>
          Cette page ne décide rien à votre place et ne calcule aucune éligibilité. Elle sépare ce qui est confirmé
          de ce qui ne l’est pas.
        </p>
      </header>

      <section className="card stack-sm">
        <h2 className="card__title">Dates d’épreuves</h2>
        {state.candidature.confirmedDates.length === 0 ? (
          <div className="note note--warn">
            <p className="note__title">Aucune date confirmée</p>
            <p>
              Aucune date de sélection pour la session visée n’est affichée, parce qu’aucune n’a été confirmée par
              une source officielle de cette session. L’application n’affiche pas de compte à rebours tant qu’une
              date n’est pas saisie ici avec sa source.
            </p>
            <p className="small">
              Les dates publiées par un autre institut, ou pour une autre année, ne valent pas pour votre
              candidature : ne les recopiez pas.
            </p>
          </div>
        ) : (
          <ul className="list-reset stack-sm">
            {state.candidature.confirmedDates.map((d) => (
              <li key={d.id} className="note">
                <p className="strong">
                  {d.label} : {d.date}
                </p>
                <p className="small">
                  Source : {d.source} · vérifiée le {d.verifiedOn}
                </p>
                <button type="button" className="btn btn--quiet no-print" onClick={() => removeConfirmedDate(d.id)}>
                  Retirer
                </button>
              </li>
            ))}
          </ul>
        )}

        <details className="details no-print">
          <summary>Ajouter une date confirmée</summary>
          <div className="stack-sm">
            <label className="field">
              <span className="field__label">Ce que la date concerne</span>
              <input
                className="input"
                value={newDate.label}
                placeholder="Clôture des inscriptions, écrit, oral…"
                onChange={(e) => setNewDate({ ...newDate, label: e.target.value })}
              />
            </label>
            <label className="field">
              <span className="field__label">Date</span>
              <input
                className="input"
                type="date"
                value={newDate.date}
                onChange={(e) => setNewDate({ ...newDate, date: e.target.value })}
              />
            </label>
            <label className="field">
              <span className="field__label">Source officielle</span>
              <input
                className="input"
                value={newDate.source}
                placeholder="Notice de l’institut, courriel du secrétariat…"
                onChange={(e) => setNewDate({ ...newDate, source: e.target.value })}
              />
            </label>
            <label className="field">
              <span className="field__label">Date de vérification</span>
              <input
                className="input"
                type="date"
                value={newDate.verifiedOn}
                onChange={(e) => setNewDate({ ...newDate, verifiedOn: e.target.value })}
              />
            </label>
            <button
              type="button"
              className="btn btn--primary"
              disabled={!newDate.label || !newDate.date || !newDate.source || !newDate.verifiedOn}
              onClick={() => {
                addConfirmedDate({ id: `d-${Date.now()}`, ...newDate })
                setNewDate({ label: '', date: '', source: '', verifiedOn: '' })
              }}
            >
              Enregistrer cette date
            </button>
            <p className="tiny muted">
              La source et la date de vérification sont obligatoires : c’est ce qui distingue une date confirmée
              d’une date entendue quelque part.
            </p>
          </div>
        </details>
      </section>

      {GROUPS.map((g) => (
        <section key={g.title} className="card stack-sm">
          <h2 className="card__title">{g.title}</h2>
          {g.note && <p className="small muted">{g.note}</p>}
          {g.items.map((item) => {
            const st = state.candidature.items[item.id]
            return (
              <div key={item.id}>
                <label className={`choice${st?.done ? ' choice--on' : ''}`}>
                  <input
                    type="checkbox"
                    checked={!!st?.done}
                    onChange={(e) => setCandidature(item.id, { done: e.target.checked })}
                  />
                  <span>
                    <span className="strong">{item.label}</span>
                    {item.help && (
                      <>
                        <br />
                        <span className="small muted">{item.help}</span>
                      </>
                    )}
                  </span>
                </label>
                <input
                  className="input note-input no-print"
                  placeholder="Note personnelle (facultatif)"
                  value={st?.note ?? ''}
                  aria-label={`Note pour : ${item.label}`}
                  onChange={(e) => setCandidature(item.id, { note: e.target.value })}
                />
              </div>
            )
          })}
        </section>
      ))}

      <section className="card stack-sm">
        <h2 className="card__title">Questions à envoyer aux instituts</h2>
        <p className="small muted">
          Ce message est un modèle : relisez-le et adaptez-le à votre situation avant de l’envoyer. Les faits qu’il
          contient doivent être les vôtres.
        </p>
        <pre className="model-text">{QUESTIONS_MODELE}</pre>
        <button
          type="button"
          className="btn btn--secondary no-print"
          onClick={() => {
            void navigator.clipboard?.writeText(QUESTIONS_MODELE).then(
              () => {
                setCopied(true)
                window.setTimeout(() => setCopied(false), 2500)
              },
              () => setCopied(false),
            )
          }}
        >
          Copier le texte
        </button>
        {copied && <p role="status" className="small">Texte copié.</p>}

        <h3>Suivi des demandes</h3>
        {['institut-1', 'institut-2'].map((id, i) => {
          const c = state.candidature.contacts.find((x) => x.id === id)
          return (
            <div key={id} className="stack-sm">
              <label className="field">
                <span className="field__label">Institut {i + 1}</span>
                <input
                  className="input"
                  value={c?.institute ?? ''}
                  placeholder="Nom de l’institut"
                  onChange={(e) => setContact(id, { institute: e.target.value })}
                />
              </label>
              <div className="row">
                <label className="field" style={{ flex: 1 }}>
                  <span className="field__label">Envoyé le</span>
                  <input
                    className="input"
                    type="date"
                    value={c?.sentOn ?? ''}
                    onChange={(e) => setContact(id, { sentOn: e.target.value })}
                  />
                </label>
                <label className="field" style={{ flex: 1 }}>
                  <span className="field__label">Réponse reçue le</span>
                  <input
                    className="input"
                    type="date"
                    value={c?.answeredOn ?? ''}
                    onChange={(e) => setContact(id, { answeredOn: e.target.value })}
                  />
                </label>
              </div>
              <label className="field">
                <span className="field__label">Ce qui a été répondu</span>
                <textarea
                  className="textarea"
                  style={{ minHeight: '5rem' }}
                  value={c?.answer ?? ''}
                  onChange={(e) => setContact(id, { answer: e.target.value })}
                  placeholder="Notez la réponse reçue, avec sa date : c’est elle qui fait foi."
                />
              </label>
              <hr className="divider" />
            </div>
          )
        })}
      </section>

      <section className="card stack-sm">
        <h2 className="card__title">Ce que cette page ne fait pas</h2>
        <ul className="small">
          <li>Elle ne conclut jamais à votre éligibilité ni à votre inéligibilité.</li>
          <li>Elle n’affiche aucune date qui n’a pas été confirmée et sourcée par vous.</li>
          <li>Elle ne surveille aucun site et n’envoie aucun rappel : ce mécanisme n’existe pas ici.</li>
          <li>Elle ne transforme jamais un soutien de l’employeur en financement acquis.</li>
        </ul>
        <button type="button" className="btn btn--quiet no-print" onClick={() => window.print()}>
          <IconPrint />
          Imprimer cette checklist
        </button>
      </section>
    </div>
  )
}
