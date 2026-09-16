/**
 * État de l'application et actions.
 *
 * Un seul objet d'état, sauvegardé localement à chaque changement. Les
 * composants n'écrivent jamais dans le stockage directement : ils appellent une
 * action nommée, ce qui garde la logique réunie et testable.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { ErrorTag } from '@/engine/answer'
import { applyAttempt, softenBacklog, today } from '@/engine/mastery'
import { buildSession, type SessionOptions } from '@/engine/session'
import { flush, load, parseImport, save, saveDebounced, storageAvailable, type LoadResult } from '@/store/storage'
import {
  initialState,
  type ActiveSession,
  type AppState,
  type ExamRun,
  type ItemAnswer,
  type Profile,
  type SessionItem,
  type Settings,
} from '@/store/schema'
import { getSkill } from '@/content/skills'

type Ctx = {
  state: AppState
  loadStatus: LoadResult['status']
  loadMessage?: string
  storageOk: boolean
  /** Modification générique, réservée aux cas simples. */
  update: (fn: (s: AppState) => AppState) => void
  setProfile: (p: Partial<Profile>) => void
  setSettings: (s: Partial<Settings>) => void
  startSession: (opts: SessionOptions) => void
  resumeOrStart: (opts: SessionOptions) => void
  setDraft: (itemId: string, draft: string) => void
  setPicked: (itemId: string, picked: string[]) => void
  useHint: (itemId: string) => void
  useAlternative: (itemId: string) => void
  submitItem: (itemId: string, result: { correct: boolean; tag?: ErrorTag; message: string; given: string }) => void
  addRetry: (itemId: string) => void
  goToItem: (index: number) => void
  nextItem: () => void
  skipItem: () => void
  finishSession: () => void
  abandonSession: () => void
  markLessonRead: (skillId: string) => void
  markSheetRead: (sheetId: string) => void
  saveWrittenDraft: (taskId: string, text: string) => void
  setWrittenCriteria: (taskId: string, criteria: Record<string, boolean>) => void
  saveOral: (questionId: string, patch: Partial<AppState['oral'][string]>) => void
  startExam: (paperId: string, mode: ExamRun['mode']) => string
  updateExam: (id: string, patch: Partial<ExamRun>) => void
  setCandidature: (id: string, patch: { done?: boolean; note?: string }) => void
  addConfirmedDate: (d: AppState['candidature']['confirmedDates'][number]) => void
  removeConfirmedDate: (id: string) => void
  setContact: (id: string, patch: Partial<AppState['candidature']['contacts'][number]>) => void
  importState: (text: string) => ReturnType<typeof parseImport>
  applyImport: (s: AppState) => void
  resetAll: () => void
}

const StoreContext = createContext<Ctx | null>(null)

const emptyAnswer = (): ItemAnswer => ({
  draft: '',
  picked: [],
  hintsUsed: 0,
  usedAlternative: false,
  submitted: false,
  seconds: 0,
})

export function StoreProvider({ children }: { children: ReactNode }) {
  const first = useRef<LoadResult>()
  if (!first.current) first.current = load()
  const [state, setState] = useState<AppState>(first.current.state)
  const [loadStatus] = useState<LoadResult['status']>(first.current.status)
  const loadMessage = first.current.status === 'illisible' ? first.current.message : undefined
  const storageOk = useMemo(() => storageAvailable(), [])

  // Sauvegarde différée à chaque changement, immédiate avant fermeture.
  useEffect(() => {
    saveDebounced(state)
  }, [state])
  useEffect(() => {
    const onHide = () => flush(state)
    window.addEventListener('pagehide', onHide)
    window.addEventListener('beforeunload', onHide)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flush(state)
    })
    return () => {
      window.removeEventListener('pagehide', onHide)
      window.removeEventListener('beforeunload', onHide)
    }
  }, [state])

  // Réglages d'affichage appliqués au document.
  useEffect(() => {
    document.documentElement.style.setProperty('--scale', String(state.settings.textScale))
    document.documentElement.dataset.contrast = state.settings.contrast
  }, [state.settings.textScale, state.settings.contrast])

  const update = useCallback((fn: (s: AppState) => AppState) => setState((s) => fn(s)), [])

  const setProfile = useCallback(
    (p: Partial<Profile>) => update((s) => ({ ...s, profile: { ...s.profile, ...p } })),
    [update],
  )
  const setSettings = useCallback(
    (p: Partial<Settings>) => update((s) => ({ ...s, settings: { ...s.settings, ...p } })),
    [update],
  )

  const startSession = useCallback(
    (opts: SessionOptions) =>
      update((s) => {
        const day = today()
        // Recalcul doux : après une absence, on n'impose pas toute la dette.
        const skills = softenBacklog(s.skills, day, 2)
        const base = { ...s, skills }
        const items = buildSession(base, { ...opts, day })
        const session: ActiveSession = {
          id: `${day}-${Date.now()}`,
          startedAt: new Date().toISOString(),
          minutes: opts.minutes,
          items,
          index: 0,
          answers: Object.fromEntries(items.map((i) => [i.id, emptyAnswer()])),
        }
        return { ...base, session }
      }),
    [update],
  )

  const resumeOrStart = useCallback(
    (opts: SessionOptions) =>
      update((s) => {
        if (s.session && !s.session.finishedAt) return s
        const day = today()
        const skills = softenBacklog(s.skills, day, 2)
        const base = { ...s, skills }
        const items = buildSession(base, { ...opts, day })
        return {
          ...base,
          session: {
            id: `${day}-${Date.now()}`,
            startedAt: new Date().toISOString(),
            minutes: opts.minutes,
            items,
            index: 0,
            answers: Object.fromEntries(items.map((i) => [i.id, emptyAnswer()])),
          },
        }
      }),
    [update],
  )

  const patchAnswer = useCallback(
    (itemId: string, patch: Partial<ItemAnswer>) =>
      update((s) => {
        if (!s.session) return s
        const prev = s.session.answers[itemId] ?? emptyAnswer()
        return {
          ...s,
          session: {
            ...s.session,
            answers: { ...s.session.answers, [itemId]: { ...prev, ...patch } },
          },
        }
      }),
    [update],
  )

  const setDraft = useCallback((itemId: string, draft: string) => patchAnswer(itemId, { draft }), [patchAnswer])
  const setPicked = useCallback((itemId: string, picked: string[]) => patchAnswer(itemId, { picked }), [patchAnswer])
  const useHint = useCallback(
    (itemId: string) =>
      update((s) => {
        if (!s.session) return s
        const prev = s.session.answers[itemId] ?? emptyAnswer()
        return {
          ...s,
          session: {
            ...s.session,
            answers: { ...s.session.answers, [itemId]: { ...prev, hintsUsed: Math.min(2, prev.hintsUsed + 1) } },
          },
        }
      }),
    [update],
  )
  const useAlternative = useCallback((itemId: string) => patchAnswer(itemId, { usedAlternative: true }), [patchAnswer])

  const submitItem = useCallback<Ctx['submitItem']>(
    (itemId, result) =>
      update((s) => {
        if (!s.session) return s
        const item = s.session.items.find((i) => i.id === itemId)
        if (!item) return s
        const prev = s.session.answers[itemId] ?? emptyAnswer()
        const day = today()
        const skill = getSkill(item.skillId)

        const structure = item.ref
        const skills = {
          ...s.skills,
          [item.skillId]: applyAttempt(
            s.skills[item.skillId],
            {
              correct: result.correct,
              hintsUsed: prev.hintsUsed,
              usedAlternative: prev.usedAlternative,
              structure,
            },
            day,
          ),
        }

        const attempts = [
          ...s.attempts,
          {
            id: `${itemId}-${Date.now()}`,
            at: new Date().toISOString(),
            skillId: item.skillId,
            subject: skill?.subject ?? 'calculs',
            itemKind:
              item.kind === 'exercice'
                ? ('maths' as const)
                : item.kind === 'francais'
                  ? ('francais' as const)
                  : item.kind === 'fiche'
                    ? ('sante' as const)
                    : item.kind === 'oral'
                      ? ('oral' as const)
                      : ('redaction' as const),
            templateId: item.ref,
            seed: item.seed,
            version: 1,
            level: item.level,
            structure,
            correct: result.correct,
            hintsUsed: prev.hintsUsed,
            usedAlternative: prev.usedAlternative,
            tag: result.tag,
            seconds: prev.seconds,
            mode: 'seance' as const,
            given: result.given,
          },
        ]

        const activeDays = s.activeDays.includes(day) ? s.activeDays : [...s.activeDays, day]

        return {
          ...s,
          skills,
          attempts,
          activeDays,
          session: {
            ...s.session,
            answers: {
              ...s.session.answers,
              [itemId]: { ...prev, submitted: true, correct: result.correct, tag: result.tag, message: result.message },
            },
          },
        }
      }),
    [update],
  )

  /** Ajoute un exercice supplémentaire de la même compétence, non identique. */
  const addRetry = useCallback(
    (itemId: string) =>
      update((s) => {
        if (!s.session) return s
        const idx = s.session.items.findIndex((i) => i.id === itemId)
        if (idx < 0) return s
        const item = s.session.items[idx]!
        const counter = (s.skills[item.skillId]?.seenCounter ?? 0) + s.session.items.length + 1
        const extra: SessionItem = {
          ...item,
          id: `${item.ref}-retry-${counter}`,
          seed: item.seed !== undefined ? item.seed + 1013904223 : undefined,
          reason: 'transfert',
        }
        const items = [...s.session.items]
        items.splice(idx + 1, 0, extra)
        return {
          ...s,
          session: {
            ...s.session,
            items,
            answers: { ...s.session.answers, [extra.id]: emptyAnswer() },
          },
        }
      }),
    [update],
  )

  const goToItem = useCallback(
    (index: number) =>
      update((s) =>
        s.session ? { ...s, session: { ...s.session, index: Math.max(0, Math.min(index, s.session.items.length - 1)) } } : s,
      ),
    [update],
  )
  const nextItem = useCallback(
    () => update((s) => (s.session ? { ...s, session: { ...s.session, index: s.session.index + 1 } } : s)),
    [update],
  )
  const skipItem = nextItem

  const finishSession = useCallback(
    () =>
      update((s) =>
        s.session ? { ...s, session: { ...s.session, finishedAt: new Date().toISOString() } } : s,
      ),
    [update],
  )
  const abandonSession = useCallback(() => update((s) => ({ ...s, session: null })), [update])

  const markLessonRead = useCallback(
    (skillId: string) =>
      update((s) => {
        const prev = s.skills[skillId]
        if (prev?.lessonRead) return s
        return {
          ...s,
          skills: {
            ...s.skills,
            [skillId]: { ...(prev ?? emptyProgress()), lessonRead: true },
          },
        }
      }),
    [update],
  )

  const markSheetRead = useCallback(
    (sheetId: string) =>
      update((s) =>
        s.sheetsRead.includes(sheetId) ? s : { ...s, sheetsRead: [...s.sheetsRead, sheetId] },
      ),
    [update],
  )

  const saveWrittenDraft = useCallback(
    (taskId: string, text: string) =>
      update((s) => ({
        ...s,
        drafts: { ...s.drafts, [taskId]: { text, updatedAt: new Date().toISOString() } },
      })),
    [update],
  )

  const setWrittenCriteria = useCallback(
    (taskId: string, criteria: Record<string, boolean>) =>
      update((s) => ({
        ...s,
        writtenSelf: { ...s.writtenSelf, [taskId]: { criteria, updatedAt: new Date().toISOString() } },
      })),
    [update],
  )

  const saveOral = useCallback<Ctx['saveOral']>(
    (questionId, patch) =>
      update((s) => {
        const prev = s.oral[questionId] ?? {
          questionId,
          frame: {},
          notes: '',
          criteria: {},
          updatedAt: new Date().toISOString(),
          timesPracticed: 0,
          recordings: [],
        }
        return {
          ...s,
          oral: { ...s.oral, [questionId]: { ...prev, ...patch, updatedAt: new Date().toISOString() } },
        }
      }),
    [update],
  )

  const startExam = useCallback<Ctx['startExam']>(
    (paperId, mode) => {
      const id = `${paperId}-${Date.now()}`
      update((s) => ({
        ...s,
        exams: [
          ...s.exams,
          {
            id,
            paperId,
            startedAt: new Date().toISOString(),
            mode,
            phase: 'redaction',
            phaseEndsAt: Date.now() + 30 * 60 * 1000,
            writing: {},
            maths: {},
            writingCriteria: {},
          },
        ],
      }))
      return id
    },
    [update],
  )

  const updateExam = useCallback<Ctx['updateExam']>(
    (id, patch) =>
      update((s) => ({
        ...s,
        exams: s.exams.map((e) => (e.id === id ? { ...e, ...patch } : e)),
      })),
    [update],
  )

  const setCandidature = useCallback<Ctx['setCandidature']>(
    (id, patch) =>
      update((s) => {
        const prev = s.candidature.items[id] ?? { id, done: false, note: '' }
        return {
          ...s,
          candidature: {
            ...s.candidature,
            items: {
              ...s.candidature.items,
              [id]: { ...prev, ...patch, updatedAt: new Date().toISOString() },
            },
          },
        }
      }),
    [update],
  )

  const addConfirmedDate = useCallback<Ctx['addConfirmedDate']>(
    (d) =>
      update((s) => ({
        ...s,
        candidature: { ...s.candidature, confirmedDates: [...s.candidature.confirmedDates, d] },
      })),
    [update],
  )
  const removeConfirmedDate = useCallback(
    (id: string) =>
      update((s) => ({
        ...s,
        candidature: {
          ...s.candidature,
          confirmedDates: s.candidature.confirmedDates.filter((d) => d.id !== id),
        },
      })),
    [update],
  )
  const setContact = useCallback<Ctx['setContact']>(
    (id, patch) =>
      update((s) => {
        const list = s.candidature.contacts
        const exists = list.some((c) => c.id === id)
        return {
          ...s,
          candidature: {
            ...s.candidature,
            contacts: exists
              ? list.map((c) => (c.id === id ? { ...c, ...patch } : c))
              : [...list, { id, institute: '', answer: '', ...patch }],
          },
        }
      }),
    [update],
  )

  const importState = useCallback((text: string) => parseImport(text), [])
  const applyImport = useCallback(
    (s: AppState) => {
      setState(s)
      save(s)
    },
    [],
  )
  const resetAll = useCallback(() => {
    const fresh = initialState()
    setState(fresh)
    save(fresh)
  }, [])

  const value: Ctx = {
    state,
    loadStatus,
    loadMessage,
    storageOk,
    update,
    setProfile,
    setSettings,
    startSession,
    resumeOrStart,
    setDraft,
    setPicked,
    useHint,
    useAlternative,
    submitItem,
    addRetry,
    goToItem,
    nextItem,
    skipItem,
    finishSession,
    abandonSession,
    markLessonRead,
    markSheetRead,
    saveWrittenDraft,
    setWrittenCriteria,
    saveOral,
    startExam,
    updateExam,
    setCandidature,
    addConfirmedDate,
    removeConfirmedDate,
    setContact,
    importState,
    applyImport,
    resetAll,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

function emptyProgress() {
  return {
    state: 'non-evaluee' as const,
    successesUnaided: 0,
    successesAided: 0,
    failures: 0,
    consecutiveFailures: 0,
    structuresPassed: [],
    daysWithUnaidedSuccess: [],
    reviewStep: 0,
    seenCounter: 0,
    lessonRead: false,
  }
}

export function useStore(): Ctx {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore doit être utilisé dans un StoreProvider')
  return ctx
}
