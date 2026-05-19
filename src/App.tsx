import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import Projects from './components/Projects'
import Events   from './components/Events'
import Contact  from './components/Contact'
import Footer   from './components/Footer'
import TechStack from './components/TechStack'
import AboutMe    from './components/AboutMe'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      {/* Progress bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, var(--cyan), var(--violet), var(--pink))',
          transformOrigin: '0%',
          scaleX,
          zIndex: 999,
          boxShadow: '0 0 10px var(--cyan)',
        }}
      />

      {/* Background elements */}
      <div className="grid-bg" aria-hidden />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <AboutMe />
        <TechStack />
        <Projects />
        <Events />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
