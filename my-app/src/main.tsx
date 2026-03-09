import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TeamViewer from './Components/TeamViewer/TeamViewer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <body>
      <TeamViewer/>
    </body>
  </StrictMode>,
)
