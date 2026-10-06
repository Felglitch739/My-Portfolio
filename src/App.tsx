import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'
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

import Scroll3DWorld from './components/Scroll3DWorld'
import Floating3DElements from './components/Floating3DElements'

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [lang, setLang] = useState<'es' | 'en'>('es')
  const mouseX = useMotionValue(-500)
  const mouseY = useMotionValue(-500)
  const springX = useSpring(mouseX, { stiffness: 350, damping: 28 })
  const springY = useSpring(mouseY, { stiffness: 350, damping: 28 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => { document.documentElement.lang = lang }, [lang])

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
        style={{ x: springX, y: springY }}
      />

      {/* Heavy Frosted Glass Overlay */}
      <div className="glass-overlay" aria-hidden />

      {/* Floating 3D Parallax Elements */}
      <Floating3DElements />

      {/* Navigation */}
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} lang={lang} setLang={setLang} />

      {/* Main Bento Content with 3D Camera Scroll World */}
      <Scroll3DWorld>
        <main style={{ position: 'relative', zIndex: 1 }}>
          <Hero onOpenTerminal={() => setIsTerminalOpen(true)} lang={lang} />
          <AboutMe lang={lang} />
          <TechStack lang={lang} />
          <Projects lang={lang} />
          <Events lang={lang} />
          <HumanSide lang={lang} />
          <Contact lang={lang} />
        </main>
      </Scroll3DWorld>

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
