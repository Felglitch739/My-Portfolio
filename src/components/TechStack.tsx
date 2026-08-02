import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Skill {
  id: string
  name: string
  cat: string
  level: number   // 0-100
  note: string
  usedIn: string
}

interface TechStackProps {
  lang?: 'es' | 'en'
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function TechStack({ lang = 'es' }: TechStackProps) {
  const [selected, setSelected] = useState<Skill | null>(null)

  const skills: Skill[] = [
    { id: 'cpp',    name: 'C++',          cat: 'SYSTEMS',  level: 88, note: 'Programación de bajo nivel, algoritmos y lógica embebida para microcontroladores.',     usedIn: 'IEEEXtreme · Mining Mayhem Robotics · Embedded' },
    { id: 'py',     name: 'Python',       cat: 'BACKEND',  level: 86, note: 'Automatización, consumo de APIs y herramientas de scripting desplegadas en producción.', usedIn: 'Family Weather Bot · PythonAnywhere · AI Tools' },
    { id: 'react',  name: 'React',        cat: 'FRONTEND', level: 90, note: 'SPAs, arquitectura de componentes y flujos de estado a escala de SaaS multi-tenant.',   usedIn: 'KronoBook SaaS · Gazpacho\'s SPA · Portfolio' },
    { id: 'vite',   name: 'Vite',         cat: 'TOOLING',  level: 84, note: 'Bundler ultrarrápido con HMR. Mi estándar para proyectos React modernos.',              usedIn: 'KronoBook · Gazpacho\'s · Portfolio' },
    { id: 'tw',     name: 'Tailwind',     cat: 'FRONTEND', level: 88, note: 'Utility-first CSS para interfaces responsivas con diseño token-based.',                  usedIn: 'KronoBook SaaS · DualFX · Layouts' },
    { id: 'ts',     name: 'TypeScript',   cat: 'LANGUAGE', level: 82, note: 'Tipado estático para evitar errores en runtime y escalar proyectos sin deuda técnica.',  usedIn: 'AuraFit React Native · All Web SPAs' },
    { id: 'sql',    name: 'SQL',          cat: 'DATA',     level: 78, note: 'Diseño de esquemas relacionales multi-tenant con Supabase para KronoBook.',              usedIn: 'KronoBook Multi-Tenant DB Schema' },
  ]

  const T = {
    es: { label: '03 — Stack', heading: 'Tech\nVault.', sub: 'Herramientas que uso. Sin más, sin menos.', click: 'Click para inspeccionar aplicación real →' },
    en: { label: '03 — Stack', heading: 'Tech\nVault.', sub: 'Tools I use. No more, no less.', click: 'Click to inspect real-world usage →' },
  }[lang]

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
            <span className="sys-label">{T.label}</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--gray-800)' }} />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
            {/* Left: heading */}
            <motion.div variants={fadeUp}>
              <h2 className="display-lg" style={{ whiteSpace: 'pre-line', marginBottom: '1.5rem' }}>{T.heading}</h2>
              <p className="text-body" style={{ marginBottom: '1rem' }}>{T.sub}</p>
              <p className="text-sm" style={{ color: 'var(--gray-600)' }}>{T.click}</p>
            </motion.div>

            {/* Right: skill rows */}
            <motion.div variants={fadeUp}>
              {skills.map((sk, i) => (
                <motion.div
                  key={sk.id}
                  onClick={() => setSelected(selected?.id === sk.id ? null : sk)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '90px 1fr 48px',
                    alignItems: 'center',
                    gap: '1.2rem',
                    padding: '1rem 0',
                    borderBottom: 'var(--border)',
                    cursor: 'pointer',
                    borderLeft: selected?.id === sk.id ? '2px solid var(--red)' : '2px solid transparent',
                    paddingLeft: '0.8rem',
                    transition: 'border-color 0.15s',
                  }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.15 }}
                >
                  <div>
                    <span className="idx">{sk.cat}</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--white)', fontSize: '1.05rem', marginBottom: '0.3rem' }}>{sk.name}</div>
                    <div style={{ height: '2px', background: 'var(--gray-800)', borderRadius: '1px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${sk.level}%`,
                        height: '100%',
                        background: selected?.id === sk.id ? 'var(--red)' : 'var(--gray-600)',
                        transition: 'width 0.5s ease, background 0.15s',
                      }} />
                    </div>
                  </div>
                  <div className="idx" style={{ textAlign: 'right' }}>{sk.level}%</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Expansion panel */}
          <AnimatePresence>
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  border: '1px solid var(--red-border)',
                  background: 'var(--red-dim)',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '2rem',
                  alignItems: 'center',
                }}>
                  <div>
                    <div className="sys-label" style={{ marginBottom: '0.6rem' }}>{selected.name} — Aplicación Real</div>
                    <p className="text-body" style={{ marginBottom: '0.8rem' }}>{selected.note}</p>
                    <span className="tag tag-active">{selected.usedIn}</span>
                  </div>
                  <button onClick={() => setSelected(null)} style={{ background: 'transparent', border: 'none', color: 'var(--gray-500)', cursor: 'pointer', fontFamily: 'var(--font-dot)', fontSize: '0.7rem', letterSpacing: '0.15em' }}>
                    [ ESC ]
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
