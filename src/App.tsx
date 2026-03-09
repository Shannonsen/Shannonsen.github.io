import { NameCarousel } from './components/NameCarousel'
import { Div, Heading, Text } from '@hopper-ui/components'
import './App.css'

function App() {
  return (
    <Div className="app-container">
      <header className="app-header">
        <Heading size="2xl" className="welcome-title">
          Welcome to my Portfolio
        </Heading>
        <Text className="subtitle">
          Desarrollador apasionado por crear experiencias digitales excepcionales
        </Text>
      </header>

      <main className="main-content">
        <NameCarousel />
        
        <Div className="info-section">
          <Heading size="lg">About Me</Heading>
          <Text>
            Soy Shannon Sen Perdomo, un desarrollador enfocado en crear
            soluciones tecnológicas innovadoras y de alta calidad.
          </Text>
        </Div>
      </main>

      <footer className="app-footer">
        <Text size="sm">
          © 2026 Shannon Sen Perdomo. Built with React, TypeScript & Hopper.
        </Text>
      </footer>
    </Div>
  )
}

export default App
