import { lazy, Suspense, useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutMe from './components/AboutMe'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Events from './components/Events'
import Contact from './components/Contact'
import Footer from './components/Footer'

const CyberTerminal = lazy(() => import('./components/CyberTerminal'))
const HumanSide = lazy(() => import('./components/HumanSide'))

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [labOpen, setLabOpen] = useState(false)
  const [lang, setLang] = useState<'es' | 'en'>('es')

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">{lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}</a>
      <div className="mesh-gradient-bg" aria-hidden="true" />
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} lang={lang} setLang={setLang} />
      <main id="main">
        <Hero lang={lang} />
        <Projects lang={lang} />
        <AboutMe lang={lang} />
        <TechStack lang={lang} />
        <Events lang={lang} />
        <section id="human-side" className="section lab-section">
          <div className="container">
            <details className="lab-disclosure" onToggle={e => setLabOpen(e.currentTarget.open)}>
              <summary>
                <span className="section-label">06 // LAB</span>
                <span>{lang === 'es' ? 'Un poco de mí, fuera del código' : 'A little about me, beyond the code'}</span>
                <span className="body-text">{lang === 'es' ? 'Música, entrenamiento y un experimento de física que puedes jugar.' : 'Music, training, and a physics experiment you can play.'}</span>
              </summary>
              {labOpen && <Suspense fallback={<p role="status">{lang === 'es' ? 'Cargando laboratorio…' : 'Loading lab…'}</p>}><HumanSide lang={lang} /></Suspense>}
            </details>
          </div>
        </section>
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      {isTerminalOpen && <Suspense fallback={<p role="status" className="loading-notice">{lang === 'es' ? 'Cargando terminal…' : 'Loading terminal…'}</p>}>
        <CyberTerminal isOpen onClose={() => setIsTerminalOpen(false)} lang={lang} />
      </Suspense>}
    </MotionConfig>
  )
}
