import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Terminal, Download } from 'lucide-react'

interface HeroProps {
  onOpenTerminal: () => void
  lang?: 'es' | 'en'
}

function useTypewriter(words: string[], speed = 65, pause = 2200) {
  const el = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let wi = 0, ci = 0, deleting = false, timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const word = words[wi]
      if (el.current) el.current.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++)
      let delay = deleting ? speed / 2 : speed
      if (!deleting && ci > word.length) { delay = pause; deleting = true }
      else if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0 }
      timer = setTimeout(tick, delay)
    }
    tick()
    return () => clearTimeout(timer)
  }, [])
  return el
}

export default function Hero({ onOpenTerminal, lang = 'es' }: HeroProps) {
  const T = {
    es: {
      available:   'Disponible para oportunidades',
      roles:       ['Software Engineer', 'Hardware Hacker', 'Embedded Systems', 'CS @ UTRGV', "Co-Fundador Pa'l Norte"],
      line1:       'Ingeniería',
      line2:       'de Software',
      line3:       '& Hardware.',
      sub:         'Construyendo soluciones de alto impacto donde el software se funde con el silicio.',
      cta1:        'Ver Proyectos',
      cta2:        'Abrir Terminal',
      cv:          'Descargar CV',
      status:      '01 — EN VIVO',
      tagline:     'Computer Science · UTRGV · Matamoros, Tamps.',
    },
    en: {
      available:   'Open to opportunities',
      roles:       ['Software Engineer', 'Hardware Hacker', 'Embedded Systems', 'CS @ UTRGV', "Co-Founder Pa'l Norte"],
      line1:       'Engineering',
      line2:       'Software',
      line3:       '& Hardware.',
      sub:         'Building high-impact solutions where software meets silicon.',
      cta1:        'See Projects',
      cta2:        'Open Terminal',
      cv:          'Download CV',
      status:      '01 — LIVE',
      tagline:     'Computer Science · UTRGV · Matamoros, Tamps.',
    },
  }[lang]

  const typedRef = useTypewriter(T.roles)

  const tickerItems = [
    'C++', 'Python', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'SQL', 'Supabase',
    'Embedded Systems', 'React Native', 'Build Pa\'l Norte', 'IEEE Member',
  ]

  return (
    <>
      <section
        id="hero"
        style={{
          minHeight: '100vh',
          paddingTop: 'var(--nav-height)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          borderBottom: 'var(--border)',
        }}
      >
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          {/* Top status row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <span className="sys-label">{T.status}</span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'var(--font-dot)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gray-600)',
            }}>
              {/* Live status pulse */}
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: 'var(--red)',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              {T.available}
            </div>
          </div>

          {/* Main layout: two columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '2rem',
            alignItems: 'flex-end',
          }}>
            {/* Left — headline */}
            <div>
              <motion.h1
                className="display-xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {T.line1}<br />
                {T.line2}<br />
                <span style={{ color: 'var(--gray-600)' }}>{T.line3}</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{
                  marginTop: '2rem',
                  fontFamily: 'var(--font-dot)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                  color: 'var(--gray-600)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ color: 'var(--red)' }}>&gt;</span>
                <span ref={typedRef} style={{ borderRight: '1px solid var(--gray-500)', paddingRight: '3px' }} />
              </motion.div>
            </div>

            {/* Right — vertical info column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="hide-mobile"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                alignItems: 'flex-end',
                paddingBottom: '0.5rem',
              }}
            >
              <div style={{ textAlign: 'right' }}>
                <div className="idx" style={{ marginBottom: '0.3rem' }}>IDENTIDAD</div>
                <div style={{ fontFamily: 'var(--font-dot)', fontSize: '0.78rem', color: 'var(--gray-300)', lineHeight: 1.6 }}>
                  Félix E. Martinez Flores<br />
                  <span style={{ color: 'var(--gray-600)' }}>Matamoros / RGV, MX-TX</span>
                </div>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'var(--gray-800)' }} />
              <div style={{ textAlign: 'right' }}>
                <div className="idx" style={{ marginBottom: '0.3rem' }}>EDUCACIÓN</div>
                <div style={{ fontFamily: 'var(--font-dot)', fontSize: '0.78rem', color: 'var(--gray-300)', lineHeight: 1.6 }}>
                  CS @ UTRGV<br />
                  <span style={{ color: 'var(--gray-600)' }}>Universidad de Texas RGV</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Description + CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              marginTop: '3.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              paddingTop: '2rem',
              borderTop: 'var(--border)',
            }}
          >
            <p style={{ maxWidth: '480px', color: 'var(--gray-400)', fontSize: '1.05rem', lineHeight: 1.65 }}>
              {T.sub}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a href="#projects" className="btn btn-primary">{T.cta1}</a>
              <button onClick={onOpenTerminal} className="btn btn-outline">
                <Terminal size={14} /> {T.cta2}
              </button>
              <a href="/Felix_Martinez_Resume.pdf" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ color: 'var(--gray-500)' }}>
                <Download size={14} /> {T.cv}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--gray-700)',
        }}>
          <ArrowDown size={16} />
          <span className="idx">scroll</span>
        </div>
      </section>

      {/* ── Ticker beneath hero ── */}
      <div className="ticker-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="ticker-inner">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="ticker-item">
              <span className="rdot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
      `}</style>
    </>
  )
}
