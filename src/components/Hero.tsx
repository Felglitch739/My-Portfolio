import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Download, ArrowRight, Cpu, Code2, Sparkles, Activity } from 'lucide-react'

interface HeroProps {
  onOpenTerminal: () => void
  lang?: 'es' | 'en'
}

function useTypewriter(words: string[], speed = 70, pause = 2000) {
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
      status: "SISTEMA ACTIVO // UTRGV CS",
      roles: [
        'FULL-STACK SOFTWARE ENGINEER',
        'MOBILE & WEB APP DEVELOPER',
        'COMPUTER SCIENCE @ UTRGV',
        'CO-FOUNDER @ BUILD PA\'L NORTE',
      ],
      titleLine1: "FULL-STACK SOFTWARE",
      titleLine2: "ENGINEERING",
      desc: "Construyendo soluciones de alto impacto: desde aplicaciones web escalables con IA hasta arquitecturas móviles modernas y robustas.",
      projectsBtn: "Explorar Obras",
      terminalBtn: "Abrir Terminal",
      cvBtn: "Descargar CV",
      location: "Brownsville, TX / Matamoros, Tamps.",
      stats: [
        { val: "05+", label: "Sistemas Clave" },
        { val: "24H", label: "Hackathon Host" },
        { val: "IEEE", label: "Miembro Activo" },
      ],
    },
    en: {
      status: "SYSTEM ACTIVE // UTRGV CS",
      roles: [
        'FULL-STACK SOFTWARE ENGINEER',
        'MOBILE & WEB APP DEVELOPER',
        'COMPUTER SCIENCE @ UTRGV',
        'CO-FOUNDER @ BUILD PA\'L NORTE',
      ],
      titleLine1: "FULL-STACK SOFTWARE",
      titleLine2: "ENGINEERING",
      desc: "Building high-impact solutions: from scalable AI-powered web applications to robust modern mobile architectures.",
      projectsBtn: "Explore Work",
      terminalBtn: "Open Terminal",
      cvBtn: "Download Resume",
      location: "Brownsville, TX / Matamoros, Tamps.",
      stats: [
        { val: "05+", label: "Core Systems" },
        { val: "24H", label: "Hackathon Host" },
        { val: "IEEE", label: "Active Member" },
      ],
    }
  }[lang]

  const typedRef = useTypewriter(t.roles)

  return (
    <section id="hero" className="section" style={{ paddingTop: 'calc(var(--nav-height) + 2.5rem)' }}>
      <div className="container">
        {/* Bento Grid Layout */}
        <div className="bento-grid">

          {/* Widget 1: Main Banner Hero Card (col-span-8) */}
          <div className="bento-card col-span-8" style={{ justifyContent: 'space-between', minHeight: '380px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                <span className="section-label" style={{ margin: 0 }}>01 // HERO_SYS</span>
                <span className="mono-tag mono-tag-red">FÉLIX E. MARTINEZ FLORES</span>
              </div>

              {/* Typewriter role */}
              <div
                style={{
                  fontFamily: 'var(--font-ndot)',
                  fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
                  color: 'var(--red)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginBottom: '1rem',
                }}
              >
                <span>&gt;</span>
                <span ref={typedRef} style={{ borderRight: '2px solid var(--red)', paddingRight: '4px' }} />
              </div>

              <h1 className="display-title" style={{ marginBottom: '1.2rem' }}>
                {t.titleLine1} <br />
                <span style={{ color: 'var(--gray-400)' }}>{t.titleLine2}</span>
              </h1>

              <p className="body-text" style={{ maxWidth: '580px', marginBottom: '2rem' }}>
                {t.desc}
              </p>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center' }}>
              <a href="#projects" className="btn-bento btn-bento-primary">
                {t.projectsBtn} <ArrowRight size={14} />
              </a>
              <button onClick={onOpenTerminal} className="btn-bento btn-bento-outline">
                <Terminal size={14} /> {t.terminalBtn}
              </button>
              <a href="/Felix_Martinez_Resume.pdf" target="_blank" rel="noreferrer" className="btn-bento btn-bento-outline" style={{ color: 'var(--gray-400)' }}>
                <Download size={14} /> {t.cvBtn}
              </a>
            </div>
          </div>

          {/* Widget 2: Live Hardware Status (col-span-4) */}
          <div className="bento-card col-span-4" style={{ justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                <span className="section-label" style={{ margin: 0 }}>STATUS // LIVE</span>
                <Activity size={16} color="var(--red)" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 10px var(--red)' }} />
                <span className="ndot" style={{ fontSize: '1rem', color: 'var(--white)' }}>UTRGV CS STUDENT</span>
              </div>

              <p className="body-text" style={{ fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                Construyendo la arquitectura de <strong style={{ color: 'var(--white)' }}>AuraFit</strong> & <strong style={{ color: 'var(--white)' }}>KronoBook</strong>.
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem' }}>
              <span className="ndot" style={{ fontSize: '0.7rem', color: 'var(--gray-500)' }}>UBICACIÓN:</span>
              <div className="ndot" style={{ fontSize: '0.82rem', color: 'var(--gray-200)', marginTop: '0.2rem' }}>
                {t.location}
              </div>
            </div>
          </div>

          {/* Widget 3: Quick Stats (col-span-4) */}
          <div className="bento-card col-span-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', alignItems: 'center', textAlign: 'center' }}>
            {t.stats.map((st, i) => (
              <div key={i}>
                <div className="ndot" style={{ fontSize: '1.8rem', color: i === 0 ? 'var(--red)' : 'var(--white)' }}>
                  {st.val}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--gray-400)', marginTop: '0.3rem' }}>
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          {/* Widget 4: Stack Modules Pill Grid (col-span-8) */}
          <div className="bento-card col-span-8" style={{ justifyContent: 'center' }}>
            <div className="section-label" style={{ marginBottom: '1rem' }}>02 // HARDWARE & SOFTWARE MODULES</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['TYPESCRIPT', 'REACT NATIVE', 'PYTHON', 'SQL', 'TAILWIND CSS', 'VITE', 'SUPABASE', 'REACT', 'NODE.JS', 'NEXT.JS'].map((tech) => (
                <span key={tech} className="mono-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
