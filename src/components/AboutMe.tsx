import { motion } from 'framer-motion'
import { UserCircle } from 'lucide-react'

export default function AboutMe() {
  const lang = new URLSearchParams(window.location.search).get('lang') || 'en'

  const t = {
    en: {
      title: "My Journey \n & Vision",
      p1: <>
        <strong style={{ color: 'var(--text-primary)' }}>Hi! I'm Félix Martínez.</strong> To me, programming isn’t just about writing lines of code; it’s an art form. I am deeply driven by solving complex logical puzzles and building things that people can interact with and appreciate. I thrive in team environments, valuing collaborative decision-making where everyone's input shapes the best possible outcome for the whole group.
      </>,
      p2: <>
        My path in technology is fueled by genuine curiosity and resilience. Navigating the financial challenges of university life is a demanding journey—one that I face with the immense support of my parents and an unwavering determination. These obstacles have shaped my discipline and fueled my hunger to grow. Looking ahead, I am incredibly excited to expand my horizons and explore how programming shapes the world of video game development, blending my love for logic and interactive design. I am actively looking for internships, freelance projects, or development roles where I can bring immediate value while continuing my academic and professional journey.
      </>
    },
    es: {
      title: "Mi Camino \n y Visión",
      p1: <>
        <strong style={{ color: 'var(--text-primary)' }}>¡Hola! Soy Félix Martínez.</strong> Para mí, programar no es solo escribir líneas de código; es una forma de arte. Me motiva profundamente resolver acertijos lógicos complejos y construir cosas con las que la gente pueda interactuar y apreciar. Destaco en entornos de equipo, valorando la toma de decisiones colaborativa donde la aportación de todos da forma al mejor resultado posible para el grupo en general.
      </>,
      p2: <>
        Mi camino en la tecnología está impulsado por una curiosidad genuina y resiliencia. Navegar los desafíos financieros de la vida universitaria es un viaje exigente, uno que enfrento con el inmenso apoyo de mis padres y una determinación inquebrantable. Estos obstáculos han moldeado mi disciplina y alimentado mi hambre por crecer. Mirando hacia el futuro, estoy increíblemente emocionado de expandir mis horizontes y explorar cómo la programación da forma al mundo del desarrollo de videojuegos, combinando mi amor por la lógica y el diseño interactivo. Busco activamente pasantías, proyectos independientes o roles de desarrollo donde pueda aportar valor inmediato mientras continúo mi viaje académico y profesional.
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
            <div style={{ flex: '1 1 300px', position: 'sticky', top: '120px' }}>
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
