/**
 * Entretien professionnel.
 *
 * Deux principes tenus ici :
 *  - l'application ne rédige jamais une expérience à la place de
 *    l'utilisatrice : les trames sont des cases vides avec une aide ;
 *  - tout fonctionne sans micro. L'enregistrement local est facultatif, avec
 *    accord explicite, réécoute et suppression.
 */

import { useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useStore } from '@/app/store'
import { ORAL_QUESTIONS, oralById } from '@/content/registry'
import { getSkill, orderedSkills } from '@/content/skills'
import { LEVEL_LABELS, type OralQuestion } from '@/content/types'
import { IconArrowLeft, IconClock, IconMic } from '@/ui/Icons'
import { selfScore } from './Sheets'

export function OralIndex() {
  const [params] = useSearchParams()
  const axis = params.get('axe')
  const { state } = useStore()
  const skills = orderedSkills('oral')

  return (
    <div className="wrap stack">
      <Link to="/entrainement" className="btn btn--ghost">
        <IconArrowLeft />
        M’entraîner
      </Link>
      <header className="page-head">
        <p className="page-head__eyebrow">Entretien professionnel</p>
        <h1>Préparer l’oral</h1>
        <p>
          L’épreuve dure 20 minutes et vaut 20 points. Ici, vous préparez vos réponses avec une trame, puis vous vous
          entraînez à les dire. Aucun micro n’est nécessaire.
        </p>
      </header>

      {skills.map((sk) => {
        const qs = ORAL_QUESTIONS.filter((q) => q.skillId === sk.id)
        if (!qs.length) return null
        const open = !axis || axis === sk.id
        return (
          <details key={sk.id} className="details" open={open}>
            <summary>
              {sk.id} — {sk.title} ({qs.length} questions)
            </summary>
            <p className="small muted">{sk.purpose}</p>
            <p className="small">
              <Link to={`/apprendre/oral/${sk.id}`}>Lire la méthode de cet axe</Link>
            </p>
            <ul className="list-reset stack-sm">
              {qs.map((q) => {
                const prep = state.oral[q.id]
                return (
                  <li key={q.id}>
                    <Link to={`/entrainement/oral/${q.id}`} className="card link-card">
                      <p className="card__meta">
                        <span className="tag">{LEVEL_LABELS[q.level]}</span>{' '}
                        <span className="tag">
                          <IconClock /> {Math.round(q.seconds / 60)} min
                        </span>
                        {prep?.timesPracticed ? (
                          <span className="tag tag--ok">Travaillée {prep.timesPracticed} fois</span>
                        ) : null}
                      </p>
                      <p className="strong">{q.question}</p>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </details>
        )
      })}
    </div>
  )
}

export function OralQuestionScreen() {
  const { questionId } = useParams<{ questionId: string }>()
  const q = questionId ? oralById(questionId) : undefined
  if (!q) return <p>Question inconnue.</p>
  return (
    <div className="wrap stack">
      <Link to="/entrainement/oral" className="btn btn--ghost">
        <IconArrowLeft />
        Toutes les questions
      </Link>
      <OralPractice question={q} />
    </div>
  )
}

export function OralPractice({ question: q, onDone }: { question: OralQuestion; onDone?: () => void }) {
  const { state, saveOral, setSettings } = useStore()
  const prep = state.oral[q.id]
  const skill = getSkill(q.skillId)
  const [tab, setTab] = useState<'preparer' | 'dire' | 'evaluer'>('preparer')
  const frame = prep?.frame ?? {}
  const criteria = prep?.criteria ?? {}

  return (
    <article className="card stack">
      <header>
        <p className="page-head__eyebrow">{skill?.title}</p>
        <h1 className="oral__question">{q.question}</h1>
        <p className="small muted">
          Temps conseillé : {Math.round(q.seconds / 60)} minute{q.seconds >= 120 ? 's' : ''}.
        </p>
      </header>

      <div className="segmented no-print" role="tablist" aria-label="Étapes de préparation">
        {(
          [
            ['preparer', '1. Préparer'],
            ['dire', '2. Dire'],
            ['evaluer', '3. M’évaluer'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            className="segmented__btn"
            aria-selected={tab === id}
            aria-pressed={tab === id}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'preparer' && (
        <div className="stack">
          <div className="note note--accent">
            <p className="note__title">Ce que le jury cherche</p>
            <ul>
              {q.looksFor.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </div>
          <div className="note note--warn">
            <p className="note__title">À éviter</p>
            <ul>
              {q.avoid.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </div>

          <h2 className="lesson__h">Votre trame</h2>
          <p className="small muted">
            Ces cases sont à remplir par vous. L’application n’écrit jamais votre expérience à votre place, et
            n’invente aucune situation.
          </p>
          {q.frame.map((f) => (
            <label key={f.id} className="field">
              <span className="field__label">{f.label}</span>
              <textarea
                className="textarea"
                style={{ minHeight: '5rem' }}
                value={frame[f.id] ?? ''}
                onChange={(e) => saveOral(q.id, { frame: { ...frame, [f.id]: e.target.value } })}
                placeholder={f.help}
              />
              <span className="field__help">{f.help}</span>
            </label>
          ))}
        </div>
      )}

      {tab === 'dire' && (
        <div className="stack">
          <Timer seconds={q.seconds} />
          <div className="note">
            <p className="note__title">Vos notes, sous les yeux</p>
            {q.frame.some((f) => (frame[f.id] ?? '').trim()) ? (
              <ul>
                {q.frame
                  .filter((f) => (frame[f.id] ?? '').trim())
                  .map((f) => (
                    <li key={f.id}>
                      <span className="strong">{f.label} :</span> {frame[f.id]}
                    </li>
                  ))}
              </ul>
            ) : (
              <p>Vous n’avez pas encore rempli la trame. Vous pouvez tout de même vous entraîner à répondre.</p>
            )}
          </div>

          {q.followUps.length > 0 && (
            <div className="stack-sm">
              <h2 className="lesson__h">Relances possibles</h2>
              <ul>
                {q.followUps.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          <Recorder
            consent={state.settings.audioConsent}
            onConsent={(v) => setSettings({ audioConsent: v })}
          />
        </div>
      )}

      {tab === 'evaluer' && (
        <div className="stack">
          <p className="small muted">
            Cochez ce que votre réponse contenait réellement. Cette note vient de vous : elle est indicative et ne
            préjuge d’aucune évaluation par un jury.
          </p>
          {q.criteria.map((c) => (
            <label key={c.id} className={`choice${criteria[c.id] ? ' choice--on' : ''}`}>
              <input
                type="checkbox"
                checked={!!criteria[c.id]}
                onChange={(e) => saveOral(q.id, { criteria: { ...criteria, [c.id]: e.target.checked } })}
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
            Autoévaluation : {selfScore(q.criteria, criteria)} /{' '}
            {q.criteria.reduce((n, c) => n + c.points, 0)} — indicatif.
          </p>
          <label className="field">
            <span className="field__label">Ce que je veux améliorer la prochaine fois</span>
            <textarea
              className="textarea"
              style={{ minHeight: '4.5rem' }}
              value={prep?.notes ?? ''}
              onChange={(e) => saveOral(q.id, { notes: e.target.value })}
              placeholder="Une seule chose à la fois."
            />
          </label>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => {
              saveOral(q.id, { timesPracticed: (prep?.timesPracticed ?? 0) + 1 })
              onDone?.()
            }}
          >
            Enregistrer cet entraînement
          </button>
          <p className="tiny muted">
            Aucune note d’oral n’est transmise à un jury ni comparée à un barème officiel. Le barème utilisé ici
            (parcours 4, motivation 4, métier et formation 4, analyse 4, organisation 4) est un choix pédagogique de
            cette application.
          </p>
        </div>
      )}
    </article>
  )
}

function Timer({ seconds }: { seconds: number }) {
  const [left, setLeft] = useState(seconds)
  const [running, setRunning] = useState(false)
  const ref = useRef<number>()

  useEffect(() => {
    if (!running) return
    ref.current = window.setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000)
    return () => window.clearInterval(ref.current)
  }, [running])

  const m = Math.floor(left / 60)
  const s = left % 60

  return (
    <div className="timer">
      <p className="timer__value" aria-live="off">
        {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
      </p>
      <div className="btn-row">
        <button type="button" className="btn btn--secondary" onClick={() => setRunning((r) => !r)}>
          {running ? 'Pause' : 'Démarrer le minuteur'}
        </button>
        <button
          type="button"
          className="btn btn--quiet"
          onClick={() => {
            setRunning(false)
            setLeft(seconds)
          }}
        >
          Remettre à zéro
        </button>
      </div>
      {left === 0 && <p className="note note--warn">Temps écoulé. Notez où vous en étiez.</p>}
    </div>
  )
}

/**
 * Enregistrement audio local et facultatif.
 * Rien n'est enregistré sans accord explicite, rien ne quitte l'appareil, et
 * l'enregistrement est effacé à la fermeture de la page : il n'est pas conservé
 * entre deux sessions, ce que l'interface annonce clairement.
 */
function Recorder({ consent, onConsent }: { consent: boolean; onConsent: (v: boolean) => void }) {
  const [status, setStatus] = useState<'idle' | 'recording' | 'done' | 'error'>('idle')
  const [url, setUrl] = useState<string | null>(null)
  const [error, setError] = useState('')
  const recorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<BlobPart[]>([])

  const supported = typeof window !== 'undefined' && !!navigator.mediaDevices && typeof MediaRecorder !== 'undefined'

  const start = async () => {
    setError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const rec = new MediaRecorder(stream)
      chunks.current = []
      rec.ondataavailable = (e) => chunks.current.push(e.data)
      rec.onstop = () => {
        const blob = new Blob(chunks.current, { type: rec.mimeType || 'audio/webm' })
        setUrl(URL.createObjectURL(blob))
        setStatus('done')
        stream.getTracks().forEach((t) => t.stop())
      }
      recorder.current = rec
      rec.start()
      setStatus('recording')
    } catch (e) {
      setStatus('error')
      setError(
        e instanceof Error && e.name === 'NotAllowedError'
          ? 'Le micro a été refusé. L’entraînement fonctionne sans micro : utilisez le minuteur et vos notes.'
          : 'Le micro n’est pas disponible sur cet appareil ou dans ce navigateur. L’entraînement fonctionne sans micro.',
      )
    }
  }

  if (!consent) {
    return (
      <div className="note">
        <p className="note__title">
          <IconMic /> Enregistrement audio — facultatif
        </p>
        <p>
          Vous pouvez vous enregistrer pour vous réécouter. L’enregistrement reste dans cet onglet, n’est envoyé
          nulle part, et disparaît si vous fermez la page. Tout fonctionne sans micro.
        </p>
        <button type="button" className="btn btn--secondary" onClick={() => onConsent(true)} disabled={!supported}>
          {supported ? 'Activer l’enregistrement' : 'Enregistrement indisponible sur cet appareil'}
        </button>
      </div>
    )
  }

  return (
    <div className="note">
      <p className="note__title">
        <IconMic /> Enregistrement audio
      </p>
      {status === 'error' && <p className="note note--warn">{error}</p>}
      <div className="btn-row">
        {status !== 'recording' ? (
          <button type="button" className="btn btn--secondary" onClick={start}>
            Démarrer l’enregistrement
          </button>
        ) : (
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => recorder.current?.stop()}
          >
            Arrêter
          </button>
        )}
        {url && (
          <button
            type="button"
            className="btn btn--danger"
            onClick={() => {
              URL.revokeObjectURL(url)
              setUrl(null)
              setStatus('idle')
            }}
          >
            Supprimer
          </button>
        )}
        <button type="button" className="btn btn--quiet" onClick={() => onConsent(false)}>
          Désactiver le micro
        </button>
      </div>
      {url && (
        <>
          <audio controls src={url} style={{ width: '100%', marginTop: 12 }} />
          <p className="tiny muted">
            Cet enregistrement n’est pas conservé après la fermeture de la page, et n’est jamais envoyé ailleurs.
          </p>
        </>
      )}
      {status === 'recording' && <p role="status">Enregistrement en cours…</p>}
    </div>
  )
}
