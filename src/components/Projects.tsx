import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'

const GH = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4" />
  </svg>
)

interface Project {
  id: string
  num: string
  title: string
  subtitle: string
  desc: string
  detail: string
  tags: string[]
  href?: string
  hrefLabel?: string
  github?: string
  badge?: string
  cat: 'saas' | 'mobile' | 'community' | 'web' | 'automation'
  image?: string
}

interface ProjectsProps {
  lang?: 'es' | 'en'
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function Projects({ lang = 'es' }: ProjectsProps) {
  const [filter, setFilter] = useState<string>('all')
  const [modal, setModal] = useState<Project | null>(null)

  const T = {
    es: {
      label: '04 — Proyectos',
      heading: 'Lo que\nhe\nconstruido.',
      filters: { all: 'Todos', saas: 'SaaS', mobile: 'Mobile AI', community: 'Comunidad', web: 'Web', automation: 'Automation' },
      details: 'Ver Arquitectura',
      close: 'Cerrar',
    },
    en: {
      label: '04 — Projects',
      heading: 'What I\nhave\nbuilt.',
      filters: { all: 'All', saas: 'SaaS', mobile: 'Mobile AI', community: 'Community', web: 'Web', automation: 'Automation' },
      details: 'View Architecture',
      close: 'Close',
    },
  }[lang]

  const projects: Project[] = [
    {
      id: 'kronobook',
      num: '001',
      title: 'KronoBook & DualFX',
      subtitle: 'SaaS Multi-Tenant · Plataforma de Agendamiento',
      desc: 'Plataforma SaaS completa para gestión de citas y clientes. Arquitectura multi-tenant con Supabase. DualFX es el primer caso de éxito operativo: un negocio de autolavado y detallado automotriz local integrado en vivo.',
      detail: 'KronoBook fue diseñado con row-level security (RLS) en Supabase para aislamiento perfecto entre tenants. DualFX demuestra la plataforma en producción real: clientes reservan citas, reciben notificaciones y el negocio gestiona su calendario desde un panel admin intuitivo optimizado para móvil.',
      tags: ['SaaS', 'Supabase', 'React', 'Vite', 'Tailwind'],
      href: 'https://kronobook.vercel.app',
      hrefLabel: 'kronobook.vercel.app',
      github: 'https://github.com/Felglitch739/KronoBook',
      badge: 'PRODUCTION',
      cat: 'saas',
      image: '/KronoBook_Preview.png',
    },
    {
      id: 'aurafit',
      num: '002',
      title: 'AuraFit',
      subtitle: 'AI Fitness App · React Native',
      desc: 'App de fitness impulsada por IA nacida en el Hackathon de Frontera Devs Edinburg. Actualmente en migración completa a React Native + TypeScript para lanzamiento nativo en iOS y Android.',
      detail: 'Ganadora de reconocimiento en Frontera Devs, AuraFit se está reescribiendo desde cero en React Native. El core de IA analiza datos corporales y genera planes de entrenamiento adaptativos. Arquitectura mobile-first con sincronización en tiempo real.',
      tags: ['React Native', 'TypeScript', 'AI/ML', 'iOS', 'Android'],
      href: 'https://aurafit.lrz.app',
      hrefLabel: 'aurafit.lrz.app',
      github: 'https://github.com/Felglitch739/AuraFit',
      badge: 'HACKATHON WINNER',
      cat: 'mobile',
      image: '/aurafit.png',
    },
    {
      id: 'build-pal-norte',
      num: '003',
      title: "Build Pa'l Norte",
      subtitle: 'Comunidad Tech · Matamoros, Tamps.',
      desc: "Cofundador y CMO de esta comunidad tecnológica en Matamoros. Organizamos el ecosistema local de desarrolladores con talleres, networking y nuestro evento insignia: un Hackathon de 24 horas continuas.",
      detail: "Build Pa'l Norte es 100% colaborativo — nacido del deseo de llevar la cultura de software y hardware al norte de México. Como CMO diseño la estrategia de comunicación, identidad de marca y captación de participantes para cada evento. Evento Hackathon 24h para desarrolladores locales.",
      tags: ['Comunidad', 'Hackathon 24h', 'Marketing', 'Matamoros'],
      badge: 'CO-FOUNDER & CMO',
      cat: 'community',
    },
    {
      id: 'gazpachos',
      num: '004',
      title: "Gazpacho's",
      subtitle: 'Web SPA · Restaurante & Bar',
      desc: 'Prototipo de rediseño web completo para restaurante y bar local. Single Page Application con estética glassmorphism, menú interactivo e integración de redes sociales.',
      detail: 'Diseñado con React y Framer Motion, el sitio prioriza la experiencia visual del cliente con animaciones fluidas y una jerarquía de navegación intuitiva. La estética glassmorphism fue elegida deliberadamente para reflejar la atmósfera del bar.',
      tags: ['React', 'Framer Motion', 'Glassmorphism', 'SPA'],
      href: 'https://gazpachos-lp.vercel.app',
      hrefLabel: 'gazpachos-lp.vercel.app',
      github: 'https://github.com/Felglitch739/gazpachos-lp',
      cat: 'web',
      image: "/Gazpacho's.png",
    },
    {
      id: 'familyweather',
      num: '005',
      title: 'Family Weather',
      subtitle: 'Automatización Python · Notificaciones',
      desc: 'Sistema automatizado de alertas meteorológicas construido en Python. Integra APIs de clima y mensajería, ejecutándose continuamente en PythonAnywhere sin intervención manual.',
      detail: 'Desplegado en PythonAnywhere con cron jobs para ejecución automatizada. Consume APIs meteorológicas y envía notificaciones customizadas al grupo familiar. Primer proyecto Python en producción real.',
      tags: ['Python', 'API', 'PythonAnywhere', 'Automation'],
      cat: 'automation',
      image: '/familyweather.png',
    },
  ]

  const filtered = filter === 'all' ? projects : projects.filter(p => p.cat === filter)

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Label row */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
            <span className="sys-label">{T.label}</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--gray-800)' }} />
          </motion.div>

          {/* Top: heading + filters */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'flex-start', marginBottom: '4rem' }}>
            <motion.h2 variants={fadeUp} className="display-lg" style={{ whiteSpace: 'pre-line' }}>
              {T.heading}
            </motion.h2>

            {/* Filter pills */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end' }}>
              {Object.entries(T.filters).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: '0.2rem 0',
                    fontFamily: 'var(--font-dot)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    color: filter === key ? 'var(--red)' : 'var(--gray-600)',
                    textAlign: 'right',
                    transition: 'color 0.15s',
                  }}
                >
                  {filter === key && '→ '}{label}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Projects list — horizontal rule separated */}
          <div>
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                variants={fadeUp}
                style={{
                  borderTop: 'var(--border)',
                  padding: '2rem 0',
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr auto',
                  gap: '2rem',
                  alignItems: 'center',
                }}
              >
                {/* Number */}
                <div className="idx" style={{ fontSize: '0.8rem' }}>{p.num}</div>

                {/* Title + desc */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--white)' }}>{p.title}</h3>
                    {p.badge && (
                      <span className="tag tag-active">{p.badge}</span>
                    )}
                  </div>
                  <p className="text-sm" style={{ marginBottom: '0.8rem', color: 'var(--gray-500)' }}>{p.subtitle}</p>
                  <p className="text-body" style={{ maxWidth: '600px', fontSize: '0.92rem' }}>{p.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem' }}>
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end', flexShrink: 0 }}>
                  <button
                    onClick={() => setModal(p)}
                    className="btn btn-outline"
                    style={{ fontSize: '0.65rem', padding: '0.5rem 0.9rem' }}
                  >
                    {T.details}
                  </button>
                  {p.href && (
                    <a href={p.href} target="_blank" rel="noreferrer" className="btn-ghost btn" style={{ fontSize: '0.65rem', color: 'var(--gray-600)' }}>
                      <ExternalLink size={12} /> Live
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="btn-ghost btn" style={{ fontSize: '0.65rem', color: 'var(--gray-600)' }}>
                      <GH size={12} /> GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
            <div style={{ borderTop: 'var(--border)' }} />
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(0,0,0,0.88)',
              backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1.5rem',
            }}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--gray-950)',
                border: 'var(--border-strong)',
                maxWidth: '660px',
                width: '100%',
                padding: '2.5rem',
                position: 'relative',
              }}
            >
              <button
                onClick={() => setModal(null)}
                style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'transparent', border: 'none', color: 'var(--gray-600)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-dot)', fontSize: '0.65rem', letterSpacing: '0.15em' }}
              >
                <X size={14} /> {T.close}
              </button>

              <div className="idx" style={{ marginBottom: '0.5rem' }}>{modal.num}</div>
              <h3 className="display-md" style={{ marginBottom: '0.4rem' }}>{modal.title}</h3>
              <p className="text-sm" style={{ marginBottom: '1.5rem' }}>{modal.subtitle}</p>
              <div style={{ height: '1px', background: 'var(--gray-800)', marginBottom: '1.5rem' }} />
              <p className="text-body">{modal.detail}</p>

              {(modal.href || modal.github) && (
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
                  {modal.href && (
                    <a href={modal.href} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ fontSize: '0.7rem' }}>
                      <ExternalLink size={12} /> {modal.hrefLabel}
                    </a>
                  )}
                  {modal.github && (
                    <a href={modal.github} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ fontSize: '0.7rem' }}>
                      <GH size={12} /> GitHub
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
