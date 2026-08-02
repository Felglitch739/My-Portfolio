import { motion } from 'framer-motion'
import { Cpu, Code2, Users } from 'lucide-react'

interface AboutMeProps {
  lang?: 'es' | 'en'
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function AboutMe({ lang = 'es' }: AboutMeProps) {
  const T = {
    es: {
      sysLabel:  '02 — Perfil',
      heading:   'Construyo\nsistemas,\nno líneas.',
      p1: 'Félix E. Martinez Flores. Estudiante de Computer Science en UTRGV, trabajando en la frontera entre software y hardware — desde aplicaciones web con IA hasta sistemas embebidos autónomos.',
      p2: 'Para mí, programar es el arte de resolver rompecabezas lógicos complejos. Me gusta construir arquitecturas que duren, no solo código que funcione.',
      pillars: [
        { icon: <Code2 size={18} />, title: 'Full-Stack', sub: 'React · Vite · Supabase · TS' },
        { icon: <Cpu size={18} />,   title: 'Hardware',   sub: 'C++ · Embedded · Robótica' },
        { icon: <Users size={18} />, title: "Pa'l Norte",  sub: 'Co-Fundador · CMO · Hackathon 24h' },
      ],
      imageAlt: 'Félix E. Martinez Flores',
    },
    en: {
      sysLabel:  '02 — Profile',
      heading:   'I build\nsystems,\nnot lines.',
      p1: 'Félix E. Martinez Flores. Computer Science student at UTRGV, operating at the boundary of software and hardware — from AI-powered web apps to autonomous embedded systems.',
      p2: 'For me, programming is the art of solving complex logical puzzles. I like to build architectures that last, not just code that works.',
      pillars: [
        { icon: <Code2 size={18} />, title: 'Full-Stack', sub: 'React · Vite · Supabase · TS' },
        { icon: <Cpu size={18} />,   title: 'Hardware',   sub: 'C++ · Embedded · Robotics' },
        { icon: <Users size={18} />, title: "Pa'l Norte",  sub: 'Co-Founder · CMO · 24h Hackathon' },
      ],
      imageAlt: 'Félix E. Martinez Flores',
    },
  }[lang]

  return (
    <section id="about-me" className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          {/* Row: label + divider */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
            <span className="sys-label">{T.sysLabel}</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--gray-800)' }} />
          </motion.div>

          {/* Main two-col layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '5rem',
            alignItems: 'start',
          }}>
            {/* Left: photo + pillars */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Photo */}
              <div style={{
                width: '220px',
                aspectRatio: '1',
                overflow: 'hidden',
                border: 'var(--border-strong)',
                position: 'relative',
              }}>
                <img
                  src="/imagenmia.jpeg"
                  alt={T.imageAlt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(100%) contrast(1.08)' }}
                />
                {/* Red corner accent */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, right: 0,
                  width: '28px', height: '28px',
                  background: 'var(--red)',
                }} />
              </div>

              {/* Pillars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {T.pillars.map((p, i) => (
                  <div key={i} style={{
                    padding: '1rem 1.2rem',
                    borderTop: i === 0 ? 'var(--border)' : 'none',
                    border: 'var(--border)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.8rem',
                  }}>
                    <span style={{ color: 'var(--red)', marginTop: '2px', flexShrink: 0 }}>{p.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--white)', marginBottom: '0.15rem' }}>{p.title}</div>
                      <div style={{ fontFamily: 'var(--font-dot)', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--gray-500)' }}>{p.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: headline + text */}
            <motion.div variants={fadeUp}>
              <h2 className="display-lg" style={{ whiteSpace: 'pre-line', marginBottom: '2.5rem' }}>
                {T.heading}
              </h2>
              <p className="text-body" style={{ marginBottom: '1.5rem' }}>{T.p1}</p>
              <p className="text-body">{T.p2}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
