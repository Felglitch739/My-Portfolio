import { motion, type Variants } from 'framer-motion'
import { Terminal, ChevronDown, Mail, Download, Sparkles, Cpu, Code2, ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface HeroProps {
  onOpenTerminal: () => void
  lang?: 'es' | 'en'
}

function useTypewriter(words: string[], speed = 70, pause = 1800) {
  const el = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let wi = 0, ci = 0, deleting = false, timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const word = words[wi]
      if (el.current) {
        el.current.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++)
      }
      let delay = deleting ? speed / 2 : speed
      if (!deleting && ci > word.length) {
        delay = pause; deleting = true
      } else if (deleting && ci < 0) {
        deleting = false; wi = (wi + 1) % words.length; ci = 0
      }
      timer = setTimeout(tick, delay)
    }
    tick()
    return () => clearTimeout(timer)
  }, [words])
  return el
}

export default function Hero({ onOpenTerminal, lang = 'es' }: HeroProps) {
  const t = {
    es: {
      status: "🟢 Estudiante CS @ UTRGV | Construyendo AuraFit & KronoBook",
      roles: [
        'Full-Stack Software Engineer',
        'Hardware Hacker & Embedded Builder',
        'Computer Science @ UTRGV',
        'Co-Fundador @ Build Pa\'l Norte',
      ],
      titlePrefix: "Ingeniería de",
      software: "Software",
      and: "y",
      hardware: "Hardware",
      desc: "Construyendo soluciones de alto impacto en la intersección del software y el hardware: desde aplicaciones web impulsadas por IA hasta sistemas integrados autónomos.",
      projectsBtn: "Explorar Proyectos",
      terminalBtn: "Terminal Interactiva",
      cvBtn: "Descargar CV",
      stats: [
        { label: "Proyectos Clave", val: "5+" },
        { label: "Universidad", val: "UTRGV CS" },
        { label: "Hackathon Host", val: "24h Event" },
        { label: "Comunidad", val: "IEEE & Pa'l Norte" },
      ]
    },
    en: {
      status: "🟢 CS Student @ UTRGV | Building AuraFit & KronoBook",
      roles: [
        'Full-Stack Software Engineer',
        'Hardware Hacker & Embedded Builder',
        'Computer Science @ UTRGV',
        'Co-Founder @ Build Pa\'l Norte',
      ],
      titlePrefix: "Engineering at the Edge of",
      software: "Software",
      and: "&",
      hardware: "Hardware",
      desc: "Crafting high-impact solutions at the intersection of software and hardware: from AI-powered web applications to autonomous embedded systems.",
      projectsBtn: "Explore Projects",
      terminalBtn: "Interactive Terminal",
      cvBtn: "Download Resume",
      stats: [
        { label: "Key Projects", val: "5+" },
        { label: "University", val: "UTRGV CS" },
        { label: "Hackathon Host", val: "24h Event" },
        { label: "Community", val: "IEEE & Pa'l Norte" },
      ]
    }
  }[lang]

  const typedRef = useTypewriter(t.roles)

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  }
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 1.5rem',
        paddingTop: 'calc(var(--nav-height) + 2rem)',
        paddingBottom: '4rem',
      }}
    >
      {/* Background Ambient Orbs */}
      <div className="orb orb-cyan" style={{ width: 600, height: 600, top: '-10%', left: '-15%' }} />
      <div className="orb orb-violet" style={{ width: 500, height: 500, top: '20%', right: '-20%' }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{
          maxWidth: 900,
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Status Pill */}
        <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
          <span
            className="mono"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.45rem 1.1rem',
              borderRadius: '100px',
              fontSize: '0.82rem',
              fontWeight: 600,
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34d399',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.15)',
            }}
          >
            {t.status}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h2
          variants={itemVariants}
          className="mono"
          style={{
            color: 'var(--cyan)',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            fontWeight: 700,
          }}
        >
          FÉLIX E. MARTINEZ FLORES
        </motion.h2>

        {/* Dynamic Role Typewriter */}
        <motion.div
          variants={itemVariants}
          style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)',
            fontWeight: 700,
            color: '#f8fafc',
            height: '2.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <span style={{ color: 'var(--cyan)' }}>&gt;</span>
          <span ref={typedRef} style={{ borderRight: '2px solid var(--cyan)', paddingRight: '4px' }} />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: '#f8fafc',
            marginBottom: '1.5rem',
          }}
        >
          {t.titlePrefix}{' '}
          <span className="gradient-text">{t.software}</span> {t.and}{' '}
          <span style={{ color: 'var(--cyan)', textShadow: '0 0 30px var(--cyan-glow)' }}>{t.hardware}</span>.
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#94a3b8',
            maxWidth: '720px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
          }}
        >
          {t.desc}
        </motion.p>

        {/* Stack Quick Badges */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.6rem',
            marginBottom: '2.5rem',
          }}
        >
          {['C++', 'Python', 'React', 'Vite', 'Tailwind CSS', 'TypeScript', 'SQL', 'Embedded Systems'].map((tech) => (
            <span key={tech} className="tag mono">
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '4rem',
          }}
        >
          <a href="#projects" className="btn-primary">
            <span>{t.projectsBtn}</span>
            <ArrowRight size={18} />
          </a>

          <button onClick={onOpenTerminal} className="btn-ghost" style={{ background: 'rgba(56, 189, 248, 0.08)' }}>
            <Terminal size={18} />
            <span>{t.terminalBtn}</span>
          </button>

          <a
            href="/Felix_Martinez_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{ borderColor: 'rgba(255, 255, 255, 0.2)', color: '#f8fafc' }}
          >
            <Download size={18} />
            <span>{t.cvBtn}</span>
          </a>
        </motion.div>

        {/* Stats Grid Pill */}
        <motion.div
          variants={itemVariants}
          className="glass-card"
          style={{
            padding: '1.2rem 2rem',
            maxWidth: '800px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center',
          }}
        >
          {t.stats.map((st, i) => (
            <div key={i}>
              <div
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: i === 0 ? 'var(--cyan)' : i === 1 ? 'var(--violet)' : i === 2 ? 'var(--pink)' : 'var(--emerald)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {st.val}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>{st.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Down Scroll Indicator */}
      <a
        href="#about-me"
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#64748b',
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
          fontSize: '0.75rem',
          zIndex: 1,
        }}
      >
        <ChevronDown size={20} className="animate-bounce" />
      </a>
    </section>
  )
}
