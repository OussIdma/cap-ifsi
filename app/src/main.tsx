import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { StoreProvider } from './app/store'
import { App } from './app/App'
import './design/tokens.css'
import './design/base.css'
import './design/app.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Routage par ancre : l'application fonctionne aussi ouverte depuis un fichier. */}
    <HashRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </HashRouter>
  </StrictMode>,
)
