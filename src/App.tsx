import { useState } from 'react'
import { FluidCarousel } from './components/FluidCarousel'
import { IntroWindow } from './components/IntroWindow'
import { profile } from './data/profile'
import { Div, Heading, Text } from '@hopper-ui/components'
import './App.css'

function App() {
  const [isIntroOpen, setIsIntroOpen] = useState(true)

  return (
    <>
      {isIntroOpen && <IntroWindow onDismiss={() => setIsIntroOpen(false)} />}

      <Div
        className={`app-container${isIntroOpen ? ' is-behind-intro' : ''}`}
        aria-hidden={isIntroOpen || undefined}
      >
        <header className="app-header">
          <Heading size="2xl" className="welcome-title">
            Welcome to my Portfolio
          </Heading>
          <Text className="subtitle">
            Software engineer passionate about building exceptional digital experiences
          </Text>
        </header>

        <main className="main-content">
          <FluidCarousel />
        </main>

        <footer className="app-footer">
          <Text size="sm">
            © 2026 {profile.name}. Built with React, TypeScript &amp; Hopper.
          </Text>
        </footer>
      </Div>
    </>
  )
}

export default App
