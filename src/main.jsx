import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Checker from './pages/Checker'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Checker />
  </StrictMode>,
)
