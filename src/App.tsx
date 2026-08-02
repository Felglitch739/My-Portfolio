import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import AboutMe     from './components/AboutMe'
import TechStack   from './components/TechStack'
import Projects    from './components/Projects'
import Events      from './components/Events'
import HumanSide   from './components/HumanSide'
import Contact     from './components/Contact'
import Footer      from './components/Footer'
import CyberTerminal from './components/CyberTerminal'

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [lang, setLang] = useState<'es' | 'en'>('es')

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <>
      {/* Scroll indicator — 2px white line, no glow */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: '2px',
          background: 'var(--white)',
          transformOrigin: '0%',
          scaleX,
          zIndex: 9999,
        }}
      />

      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        lang={lang}
        setLang={setLang}
      />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero       onOpenTerminal={() => setTerminalOpen(true)} lang={lang} />
        <AboutMe    lang={lang} />
        <TechStack  lang={lang} />
        <Projects   lang={lang} />
        <Events     lang={lang} />
        <HumanSide  lang={lang} />
        <Contact    lang={lang} />
      </main>

      <Footer lang={lang} />

      <CyberTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        lang={lang}
      />
    </>
  )
}
