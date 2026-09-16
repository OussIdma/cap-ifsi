/** Réglages : lisibilité, sauvegarde, export, import, effacement. */

import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '@/app/store'
import { downloadExport, type ImportReport } from '@/store/storage'
import { inventory } from '@/content/registry'
import { REVIEW_LABELS } from '@/content/types'
import { IconArrowLeft, IconDownload, IconUpload } from '@/ui/Icons'

export function Settings() {
  const { state, setSettings, setProfile, importState, applyImport, resetAll, storageOk, loadStatus, loadMessage } =
    useStore()
  const fileRef = useRef<HTMLInputElement>(null)
  const [report, setReport] = useState<ImportReport | null>(null)
  const [pendingImport, setPendingImport] = useState<ReturnType<typeof importState> | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)
  const inv = inventory()

  const onFile = async (file: File) => {
    const text = await file.text()
    const r = importState(text)
    setReport(r)
    setPendingImport(r.ok ? r : null)
  }

  return (
    <div className="wrap stack-lg">
      <Link to="/" className="btn btn--ghost">
        <IconArrowLeft />
        Aujourd’hui
      </Link>
      <header className="page-head">
        <p className="page-head__eyebrow">Réglages</p>
        <h1>Confort et sauvegarde</h1>
      </header>

      <section className="card stack">
        <h2 className="card__title">Lisibilité</h2>
        <div>
          <p className="field__label" id="taille">
            Taille du texte
          </p>
          <div className="segmented" role="group" aria-labelledby="taille">
            {[
              [0.9, 'Petit'],
              [1, 'Normal'],
              [1.15, 'Grand'],
              [1.3, 'Très grand'],
            ].map(([v, label]) => (
              <button
                key={String(v)}
                type="button"
                className="segmented__btn"
                aria-pressed={state.settings.textScale === v}
                onClick={() => setSettings({ textScale: v as number })}
              >
                {label as string}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="field__label" id="contraste">
            Contraste
          </p>
          <div className="segmented" role="group" aria-labelledby="contraste">
            <button
              type="button"
              className="segmented__btn"
              aria-pressed={state.settings.contrast === 'normal'}
              onClick={() => setSettings({ contrast: 'normal' })}
            >
              Normal
            </button>
            <button
              type="button"
              className="segmented__btn"
              aria-pressed={state.settings.contrast === 'fort'}
              onClick={() => setSettings({ contrast: 'fort' })}
            >
              Renforcé
            </button>
          </div>
        </div>
        <label className="field">
          <span className="field__label">Prénom affiché</span>
          <input
            className="input"
            value={state.profile.firstName}
            maxLength={40}
            onChange={(e) => setProfile({ firstName: e.target.value })}
            placeholder="Facultatif"
          />
        </label>
      </section>

      <section className="card stack">
        <h2 className="card__title">Où sont mes données</h2>
        <div className="note note--warn">
          <p className="note__title">À lire une fois</p>
          <p>
            Tout est enregistré dans ce navigateur, sur cet appareil. Il n’y a <span className="strong">aucune
            synchronisation</span> entre votre ordinateur et votre téléphone : la progression faite sur l’un
            n’apparaît pas sur l’autre.
          </p>
          <p>
            Cela reste vrai même si les deux appareils ouvrent la{' '}
            <span className="strong">même adresse</span>, par exemple via Tailscale : l’adresse est partagée, les
            données ne le sont pas. Elles restent dans le navigateur de chaque appareil.
          </p>
          <p>
            Changer d’adresse — passer de <span className="strong">http://…:4180</span> à{' '}
            <span className="strong">https://…</span>, par exemple — présente une application vide sans rien
            effacer : le navigateur considère qu’il s’agit d’un autre site. Exportez avant de changer, puis
            importez sur la nouvelle adresse.
          </p>
          <p>
            Ces données peuvent être effacées par le navigateur, par exemple si vous videz l’historique, si vous
            utilisez la navigation privée, ou si l’espace disponible devient insuffisant.
            <span className="strong"> Exportez votre progression régulièrement.</span>
          </p>
        </div>

        {!storageOk && (
          <p className="note note--alert">
            L’enregistrement local est indisponible dans ce navigateur. L’application reste utilisable, mais votre
            progression sera perdue en fermant l’onglet.
          </p>
        )}
        {loadStatus === 'illisible' && (
          <p className="note note--alert">
            Une sauvegarde existante n’a pas pu être relue ({loadMessage}). Elle a été conservée de côté et n’a pas
            été écrasée. Vous pouvez repartir de zéro ou importer un export.
          </p>
        )}
        {loadStatus === 'migre' && (
          <p className="note">Votre sauvegarde a été convertie vers la version actuelle des données.</p>
        )}

        <div className="btn-row">
          <button type="button" className="btn btn--primary" onClick={() => downloadExport(state)}>
            <IconDownload />
            Exporter ma progression
          </button>
          <button type="button" className="btn btn--secondary" onClick={() => fileRef.current?.click()}>
            <IconUpload />
            Importer un fichier
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) void onFile(f)
              e.target.value = ''
            }}
          />
        </div>
        <p className="tiny muted">
          L’export est un fichier JSON lisible. Pour passer d’un appareil à l’autre, exportez ici puis importez
          là-bas.
        </p>

        {report && (
          <div className={`note ${report.ok ? 'note--ok' : 'note--alert'}`} role="status">
            <p className="note__title">{report.ok ? 'Fichier valide' : 'Import refusé'}</p>
            <p>{report.message}</p>
            {report.details.length > 0 && (
              <ul className="small">
                {report.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            )}
            {report.ok && pendingImport?.state && (
              <>
                <p className="strong">
                  Importer remplacera la progression actuelle de cet appareil. Exportez-la d’abord si vous souhaitez
                  la garder.
                </p>
                <div className="btn-row">
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => {
                      applyImport(pendingImport.state!)
                      setReport(null)
                      setPendingImport(null)
                    }}
                  >
                    Remplacer et importer
                  </button>
                  <button
                    type="button"
                    className="btn btn--quiet"
                    onClick={() => {
                      setReport(null)
                      setPendingImport(null)
                    }}
                  >
                    Annuler
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </section>

      <section className="card stack-sm">
        <h2 className="card__title">Ce que contient l’application</h2>
        <ul className="small">
          <li>{inv.lessons} leçons publiées</li>
          <li>{inv.mathStructures} types d’exercices de calculs, produisant chacun de nombreuses variantes</li>
          <li>{inv.frenchExercises} micro-exercices de français</li>
          <li>{inv.writtenTasks} sujets rédigés commentés</li>
          <li>{inv.healthSheets} fiches sanitaires et sociales, {inv.healthQuestions} questions de compréhension</li>
          <li>{inv.oralQuestions} questions d’oral, {inv.oralFollowUps} relances</li>
          <li>{inv.examPapers} examens blancs écrits</li>
        </ul>
        <p className="tiny muted">
          États de contrôle utilisés : {Object.values(REVIEW_LABELS).join(' · ')}. Aucun contenu n’est marqué
          « validé par une personne » : cela demanderait une relecture humaine, qui n’a pas eu lieu.
        </p>
      </section>

      <section className="card stack-sm">
        <h2 className="card__title">Vie privée</h2>
        <ul className="small">
          <li>Aucun compte, aucun mot de passe.</li>
          <li>Aucune donnée envoyée à un service extérieur. L’application fonctionne sans connexion après chargement.</li>
          <li>Aucune mesure d’audience, aucun traceur.</li>
          <li>
            L’enregistrement audio est facultatif, demandé explicitement, reste dans l’onglet et disparaît à la
            fermeture de la page.
          </li>
          <li>Les textes importés sont affichés comme du texte : aucun code ni HTML n’est exécuté.</li>
        </ul>
      </section>

      <section className="card stack-sm">
        <h2 className="card__title">Effacer</h2>
        {!confirmReset ? (
          <button type="button" className="btn btn--danger" onClick={() => setConfirmReset(true)}>
            Effacer toute ma progression
          </button>
        ) : (
          <div className="note note--alert stack-sm">
            <p className="note__title">Cette action est définitive</p>
            <p>
              Toute la progression, les brouillons, les préparations d’oral et les examens blancs de cet appareil
              seront supprimés. Exportez d’abord si vous voulez en garder une copie.
            </p>
            <div className="btn-row">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => downloadExport(state)}
              >
                Exporter d’abord
              </button>
              <button
                type="button"
                className="btn btn--danger"
                onClick={() => {
                  resetAll()
                  setConfirmReset(false)
                }}
              >
                Oui, tout effacer
              </button>
              <button type="button" className="btn btn--quiet" onClick={() => setConfirmReset(false)}>
                Annuler
              </button>
            </div>
          </div>
        )}
      </section>

      <p className="center">
        <Link to="/candidature" className="btn btn--quiet">
          Ma candidature
        </Link>
      </p>
    </div>
  )
}
