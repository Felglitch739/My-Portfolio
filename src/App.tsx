import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutMe from './components/AboutMe'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Events from './components/Events'
import HumanSide from './components/HumanSide'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CyberTerminal from './components/CyberTerminal'

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [lang, setLang] = useState<'es' | 'en'>('es')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      {/* Strict Red Scroll Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'var(--red)',
          transformOrigin: '0%',
          scaleX,
          zIndex: 9999,
          boxShadow: '0 0 8px var(--red)',
        }}
      />

      {/* Premium Background Layers */}
      <div className="mesh-gradient-bg" aria-hidden />
      
      {/* Cursor Flashlight */}
      <motion.div
        className="cursor-flashlight"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
      
      {/* Heavy Frosted Glass Overlay */}
      <div className="glass-overlay" aria-hidden />

      {/* Navigation */}
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} lang={lang} setLang={setLang} />

      {/* Main Bento Content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} lang={lang} />
        <AboutMe lang={lang} />
        <TechStack lang={lang} />
        <Projects lang={lang} />
        <Events lang={lang} />
        <HumanSide lang={lang} />
        <Contact lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Draggable Nothing Hardware Terminal Screen */}
      <CyberTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        lang={lang}
      />
    </>
  )
}
