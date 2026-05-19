import { motion, type Variants } from 'framer-motion'
import { Terminal, ChevronDown, Mail, Download } from 'lucide-react'
import { useEffect, useRef } from 'react'

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
  </svg>
)

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

const skills = [
  { label: 'Python',         color: 'var(--cyan)'    },
  { label: 'C++',            color: 'var(--violet)'  },
  { label: 'PHP',            color: 'var(--pink)'    },
  { label: 'Laravel',        color: 'var(--emerald)' },
  { label: 'Robotics',       color: 'var(--amber)'   },
  { label: 'Embedded Sys.',  color: 'var(--cyan)'    },
]

// Typewriter hook
function useTypewriter(words: string[], speed = 80, pause = 1800) {
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
  }, [])
  return el
}

export default function Hero() {
  const lang = new URLSearchParams(window.location.search).get('lang') || 'en'
  const t = {
    en: {
      available: "Available for opportunities",
      roles: ['Software Engineer', 'Hardware Enthusiast', 'Python Developer', 'Robotics Builder', 'CS @ UTRGV'],
      student: "Computer Science student at",
      building: "building things at the intersection of",
      software: "software",
      and: "and",
      hardware: "hardware",
      seeWork: "See my work",
      getTouch: "Get in touch",
      download: "Download Resume"
    },
    es: {
      available: "Disponible para oportunidades",
      roles: ['Ingeniero de Software', 'Entusiasta de Hardware', 'Desarrollador Python', 'Robótica', 'CS @ UTRGV'],
      student: "Estudiante de Ciencias de la Computación en",
      building: "construyendo en la intersección de",
      software: "software",
      and: "y",
      hardware: "hardware",
      seeWork: "Ver mi trabajo",
      getTouch: "Contactar",
      download: "Descargar CV"
    }
  }[lang] as any

  const typedRef = useTypewriter(t.roles)

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  }
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 1.5rem',
        paddingTop: 'var(--nav-height)',
        paddingBottom: '8rem',
      }}
    >
      {/* Orbs */}
      <div className="orb orb-cyan"  style={{ width: 600, height: 600, top: '-10%',  left: '-15%'  }} />
      <div className="orb orb-violet"style={{ width: 500, height: 500, top: '20%',   right: '-20%' }} />
      <div className="orb orb-pink"  style={{ width: 400, height: 400, bottom: '0',  left: '30%'   }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{
          maxWidth: 820,
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <motion.div variants={itemVariants} style={{ marginBottom: '0.5rem' }}>
          <span
            className="tag mono"
            style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}
          >
            <Terminal size={13} />
            {'  '}&gt; hello world —{' '}
            <span style={{ color: 'var(--cyan)' }}>{t.available}</span>
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: 'clamp(3rem, 9vw, 6.5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            marginBottom: '1rem',
          }}
        >
          <span style={{ display: 'block', color: 'var(--text-primary)' }}>
            Félix
          </span>
          <span className="gradient-text" style={{ display: 'block' }}>
            Martínez
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          variants={itemVariants}
          style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
            color: 'var(--text-secondary)',
            marginBottom: '0.5rem',
            minHeight: '2rem',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <span ref={typedRef} style={{ color: 'var(--cyan)' }} />
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1.2em',
              background: 'var(--cyan)',
              marginLeft: '2px',
              verticalAlign: 'text-bottom',
              animation: 'blink 0.9s step-end infinite',
            }}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            maxWidth: 580,
            margin: '0 auto 1.5rem',
            lineHeight: 1.75,
          }}
        >
          {t.student}{' '}
          <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>UTRGV</span>{' '}
          {t.building}{' '}
          <span style={{ color: 'var(--violet)', fontWeight: 600 }}>
            {t.software}
          </span>{' '}
          {t.and}{' '}
          <span style={{ color: 'var(--emerald)', fontWeight: 600 }}>
            {t.hardware}
          </span>
          .
        </motion.p>

        {/* Skill tags */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            justifyContent: 'center',
            marginBottom: '1.5rem',
          }}
        >
          {skills.map((s) => (
            <motion.span
              key={s.label}
              whileHover={{ scale: 1.08, y: -2 }}
              style={{
                padding: '0.35rem 0.9rem',
                borderRadius: '100px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: s.color,
                background: `${s.color}15`,
                border: `1px solid ${s.color}40`,
                cursor: 'default',
              }}
            >
              {s.label}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.a
            href="#projects"
            className="btn-primary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.seeWork}
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-ghost"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {t.getTouch}
          </motion.a>
          <motion.a
            href="/felix_resume_base.html"
            download="Felix_Martinez_Resume.html"
            className="btn-ghost"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={16} style={{ marginRight: '0.4rem' }} /> {t.download}
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            gap: '1.25rem',
            justifyContent: 'center',
            marginTop: '1.5rem',
            flexWrap: 'wrap'
          }}
        >
          {[
            { icon: <GithubIcon size={20} />,   href: 'https://github.com/Felglitch739',   label: 'GitHub'   },
            { icon: <LinkedinIcon size={20} />, href: 'https://www.linkedin.com/in/felix-martinez-fls/', label: 'LinkedIn' },
            { icon: <Mail size={20} />,     href: 'mailto:felixmrtzflrs04@gmail.com', label: 'Email'    },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              aria-label={s.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: '12px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s, border-color 0.2s',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.color = 'var(--cyan)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-glow)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-glass)'
              }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={20} />
        </motion.div>
        scroll
      </motion.div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  )
}
