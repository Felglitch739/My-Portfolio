import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Terminal, Layers, Database, Code2, Sparkles, Activity } from 'lucide-react'

interface TechStackProps {
  lang?: 'es' | 'en'
}

interface Skill {
  name: string
  cat: string
  level: number
  desc: string
  appliedIn: string
  icon: React.ReactNode
}

export default function TechStack({ lang = 'es' }: TechStackProps) {
  const [selected, setSelected] = useState<Skill | null>(null)

  const skills: Skill[] = [
    {
      name: 'React Native',
      cat: 'MOBILE ARCHITECTURE',
      level: 90,
      desc: 'Desarrollo de aplicaciones móviles multiplataforma nativas con TypeScript e integración de APIs complejas.',
      appliedIn: 'AuraFit AI Fitness App & Mobile Solutions',
      icon: <Terminal size={20} color="var(--red)" />,
    },
    {
      name: 'Python',
      cat: 'BACKEND / AUTOMATION',
      level: 88,
      desc: 'Scripting, consumo de APIs meteorológicas, automatizaciones y herramientas de IA.',
      appliedIn: 'Family Weather Alert Bot, PythonAnywhere, Data Pipelines',
      icon: <Terminal size={20} />,
    },
    {
      name: 'React',
      cat: 'FRONTEND ARCHITECTURE',
      level: 92,
      desc: 'Interfaces SPAs, gestión de estado compleja y diseño modular de componentes.',
      appliedIn: 'KronoBook SaaS, Gazpacho\'s SPA & Portfolio',
      icon: <Code2 size={20} />,
    },
    {
      name: 'Vite',
      cat: 'BUILD TOOLING',
      level: 85,
      desc: 'Empaquetador frontend ultrarrápido con HMR y pipeline de producción optimizado.',
      appliedIn: 'KronoBook, Gazpacho\'s & Modern SPAs',
      icon: <Sparkles size={20} />,
    },
    {
      name: 'Tailwind CSS',
      cat: 'UI SYSTEMS',
      level: 90,
      desc: 'Sistemas de tokens de diseño utility-first, layouts responsivos e interfaces de alta velocidad.',
      appliedIn: 'KronoBook SaaS, DualFX & Custom Design Systems',
      icon: <Layers size={20} />,
    },
    {
      name: 'TypeScript',
      cat: 'TYPE SAFETY',
      level: 86,
      desc: 'Desarrollo fuertemente tipado para evitar errores en runtime y escalar proyectos sin deuda técnica.',
      appliedIn: 'AuraFit React Native Mobile App & Full-Stack Web SPAs',
      icon: <Code2 size={20} />,
    },
    {
      name: 'SQL',
      cat: 'DATABASE / SUPABASE',
      level: 80,
      desc: 'Esquemas relacionales multi-tenant, políticas RLS y consultas optimizadas.',
      appliedIn: 'KronoBook Multi-Tenant Database Schema in Supabase',
      icon: <Database size={20} />,
    },
  ]

  const t = {
    es: {
      label: "04 // SOFTWARE MODULES",
      title: "TECH VAULT",
      sub: "Haz clic en cualquier módulo para inspeccionar su implementación en mis proyectos.",
    },
    en: {
      label: "04 // SOFTWARE MODULES",
      title: "TECH VAULT",
      sub: "Click on any module to inspect its real-world usage in my projects.",
    },
  }[lang]

  return (
    <section id="skills" className="section">
      <div className="container">
        <span className="section-label">{t.label}</span>
        <h2 className="display-title" style={{ fontSize: '2.5rem', marginBottom: '0.4rem' }}>
          {t.title}
        </h2>
        <p className="body-text" style={{ marginBottom: '2rem' }}>
          {t.sub}
        </p>

        {/* Skill Modules Bento Grid */}
        <div className="bento-grid">
          {skills.map((sk) => {
            const isSel = selected?.name === sk.name
            return (
              <div
                key={sk.name}
                onClick={() => setSelected(isSel ? null : sk)}
                className={`bento-card col-span-4 ${isSel ? 'bento-card-active' : ''}`}
                style={{ cursor: 'pointer', justifyContent: 'space-between', minHeight: '170px' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                    <span className="mono-tag">{sk.cat}</span>
                    <div>{sk.icon}</div>
                  </div>
                  <h3 className="card-title" style={{ fontSize: '1.2rem' }}>{sk.name}</h3>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--gray-400)', marginBottom: '0.3rem' }} className="ndot">
                    <span>PWR_OUTPUT</span>
                    <span>{sk.level}%</span>
                  </div>
                  <div style={{ height: '3px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${sk.level}%`, background: isSel ? 'var(--red)' : 'var(--white)' }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected Module Detail Widget */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="bento-card col-span-12 bento-card-active"
              style={{ marginTop: '1.25rem', padding: '2rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div className="ndot" style={{ fontSize: '1.1rem', color: 'var(--white)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Activity size={18} color="var(--red)" />
                  MÓDULO: {selected.name}
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="mono-tag"
                  style={{ cursor: 'pointer', background: 'transparent' }}
                >
                  [ CLOSE_INSPECTOR ]
                </button>
              </div>

              <p className="body-text" style={{ color: 'var(--white)', marginBottom: '1rem' }}>
                {selected.desc}
              </p>

              <div style={{ borderTop: '1px solid rgba(255, 0, 0, 0.2)', paddingTop: '0.8rem' }}>
                <span className="ndot" style={{ fontSize: '0.72rem', color: 'var(--red)' }}>
                  APLICADO EN PROYECTOS:
                </span>
                <div className="ndot" style={{ fontSize: '0.85rem', color: 'var(--gray-200)', marginTop: '0.2rem' }}>
                  {selected.appliedIn}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
