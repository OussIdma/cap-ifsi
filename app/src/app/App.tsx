import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useStore } from './store'
import { IconLearn, IconProgress, IconToday, IconTrain } from '@/ui/Icons'
import { Today } from '@/screens/Today'
import { Onboarding } from '@/screens/Onboarding'
import { LearnIndex, LearnSkill, LearnSubject } from '@/screens/Learn'
import { TrainIndex } from '@/screens/Train'
import { FreePractice } from '@/screens/FreePractice'
import { Progress } from '@/screens/Progress'
import { Settings } from '@/screens/Settings'
import { Candidature } from '@/screens/Candidature'
import { SessionRunner } from '@/screens/Session'
import { ExamIndex, ExamRunner } from '@/screens/Exams'
import { OralIndex, OralQuestionScreen } from '@/screens/Oral'
import { WrittenIndex, WrittenTaskScreen } from '@/screens/Written'
import { SheetScreen, SheetsIndex } from '@/screens/Sheets'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function App() {
  const { state } = useStore()
  const location = useLocation()

  if (!state.profile.onboarded && location.pathname !== '/bienvenue') {
    return <Navigate to="/bienvenue" replace />
  }

  // Ni pendant l'accueil ni pendant une epreuve : un seul chemin a suivre.
  const hideNav =
    location.pathname === '/bienvenue' || location.pathname.startsWith('/entrainement/examens/')

  return (
    <div className="app">
      <ScrollToTop />
      <a className="skip" href="#contenu">
        Aller au contenu
      </a>
      {!hideNav && <Nav />}
      <main className="app__main" id="contenu">
        <Routes>
          <Route path="/bienvenue" element={<Onboarding />} />
          <Route path="/" element={<Today />} />
          <Route path="/seance" element={<SessionRunner />} />
          <Route path="/apprendre" element={<LearnIndex />} />
          <Route path="/apprendre/:subject" element={<LearnSubject />} />
          <Route path="/apprendre/:subject/:skillId" element={<LearnSkill />} />
          <Route path="/fiches" element={<SheetsIndex />} />
          <Route path="/fiches/:sheetId" element={<SheetScreen />} />
          <Route path="/entrainement" element={<TrainIndex />} />
          <Route path="/entrainement/matiere/:subject" element={<FreePractice />} />
          <Route path="/entrainement/examens" element={<ExamIndex />} />
          <Route path="/entrainement/examens/:runId" element={<ExamRunner />} />
          <Route path="/entrainement/oral" element={<OralIndex />} />
          <Route path="/entrainement/oral/:questionId" element={<OralQuestionScreen />} />
          <Route path="/entrainement/redaction" element={<WrittenIndex />} />
          <Route path="/entrainement/redaction/:taskId" element={<WrittenTaskScreen />} />
          <Route path="/progres" element={<Progress />} />
          <Route path="/reglages" element={<Settings />} />
          <Route path="/candidature" element={<Candidature />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function Nav() {
  return (
    <nav className="nav no-print" aria-label="Navigation principale">
      <ul className="nav__list">
        <li>
          <NavLink to="/" className="nav__link" end>
            <IconToday />
            <span>Aujourd’hui</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/apprendre" className="nav__link">
            <IconLearn />
            <span>Apprendre</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/entrainement" className="nav__link">
            <IconTrain />
            <span>M’entraîner</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/progres" className="nav__link">
            <IconProgress />
            <span>Mes progrès</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
