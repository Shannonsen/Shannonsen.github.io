import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HopperProvider } from '@hopper-ui/components'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HopperProvider colorScheme="light">
      <App />
    </HopperProvider>
  </StrictMode>,
)
