import { motion } from 'framer-motion'
import { UserCircle } from 'lucide-react'

export default function AboutMe() {
  const lang = new URLSearchParams(window.location.search).get('lang') || 'en'

  const t = {
    en: {
      title: "My Journey \n & Vision",
      p1: <>
        <strong style={{ color: 'var(--text-primary)' }}>Hi! I'm Félix,</strong> a Computer Science student at UTRGV. I thrive at the intersection of software and hardware, building everything from AI-powered web apps to autonomous embedded systems.
      </>,
      p2: <>
        For me, programming is the art of solving complex logical puzzles. I am highly collaborative, deeply curious, and currently exploring how programming shapes game development. I am actively looking for internships or development roles where I can bring immediate value and keep growing.
      </>
    },
    es: {
      title: "Mi Camino \n y Visión",
      p1: <>
        <strong style={{ color: 'var(--text-primary)' }}>¡Hola! Soy Félix,</strong> estudiante de Ciencias de la Computación en UTRGV. Destaco en la intersección del software y el hardware, construyendo de todo, desde aplicaciones web impulsadas por IA hasta sistemas integrados autónomos.
      </>,
      p2: <>
        Para mí, programar es el arte de resolver complejos acertijos lógicos. Soy altamente colaborativo, profundamente curioso y actualmente estoy explorando cómo la programación da forma al desarrollo de videojuegos. Busco activamente pasantías o roles de desarrollo donde pueda aportar valor inmediato y seguir creciendo.
      </>
    }
  }[lang] as any

  return (
    <section id="about-me" className="section" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            padding: 'clamp(2rem, 5vw, 4rem)',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1.5rem',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }}>
            {/* Title Column */}
            <div className="sticky-desktop" style={{ flex: '1 1 300px' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  padding: '4px',
                  background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
                  display: 'inline-block'
                }}>
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: '50%', 
                    overflow: 'hidden',
                    background: 'var(--bg-dark)'
                  }}>
                    <img src="/profile.jpg" alt="Félix" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
              <span className="tag mono" style={{ marginBottom: '1.2rem', display: 'inline-flex' }}>
                <UserCircle size={14} /> &nbsp; About Me
              </span>
              <h2 
                className="gradient-text" 
                style={{ 
                  textAlign: 'left', 
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  marginBottom: '1rem',
                  whiteSpace: 'pre-line'
                }}
              >
                {t.title}
              </h2>
              <div style={{ 
                width: '60px', 
                height: '3px', 
                background: 'linear-gradient(90deg, var(--cyan), var(--violet))', 
                borderRadius: '2px',
                marginBottom: '1.5rem'
              }} />
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '280px' }}>
                {lang === 'en' ? "A brief look into my motivations, background, and what drives me forward as a developer." : "Un breve vistazo a mis motivaciones, mi historial y lo que me impulsa como desarrollador."}
              </p>
            </div>

            {/* Content Column */}
            <div style={{ flex: '2 1 400px', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem' }}>
                {t.p1}
              </p>
              <p>
                {t.p2}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
