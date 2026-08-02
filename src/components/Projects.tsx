import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, Globe, Smartphone, Users, CloudSun, ArrowUpRight } from 'lucide-react'

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
  </svg>
)

interface Project {
  id: string
  num: string
  title: string
  subtitle: string
  desc: string
  detail: string
  image?: string
  tags: string[]
  link?: string
  github?: string
  badge?: string
  badgeRed?: boolean
}

interface ProjectsProps {
  lang?: 'es' | 'en'
}

export default function Projects({ lang = 'es' }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: 'kronobook',
      num: '01',
      title: 'KronoBook & DualFX',
      subtitle: 'PLATA FORMA SAAS MULTI-TENANT & DUALFX',
      desc: 'Plataforma SaaS para agendamiento de citas y gestión de clientes con Supabase. Integra en vivo la página operativa de DualFX (autolavado y detallado automotriz local).',
      detail: 'KronoBook fue diseñado con arquitectura multi-tenant en Supabase (RLS) para aislamiento de datos. DualFX se integró como el primer caso de éxito operativo real, gestionando reservas y notificaciones móbiles.',
      image: '/KronoBook_Preview.png',
      tags: ['SAAS MULTI-TENANT', 'SUPABASE', 'REACT', 'TAILWIND CSS'],
      link: 'https://kronobook.vercel.app',
      github: 'https://github.com/Felglitch739/KronoBook',
      badge: 'PRODUCTION SaaS',
      badgeRed: true,
    },
    {
      id: 'aurafit',
      num: '02',
      title: 'AuraFit Mobile App',
      subtitle: 'APP DE FITNESS CON IA — FRONTERA DEVS WINNER',
      desc: 'App móvil impulsada por IA para análisis corporal y entrenamiento personalizado. Ganadora en Frontera Devs Edinburg, actualmente en reescritura desde cero con React Native.',
      detail: 'Nacida en Frontera Devs Edinburg, AuraFit se está migrando a React Native y TypeScript para lanzamiento nativo en iOS y Android con sugerencias adaptativas por IA.',
      image: '/aurafit.png',
      tags: ['REACT NATIVE', 'AI/ML', 'TYPESCRIPT', 'IOS & ANDROID'],
      link: 'https://aurafit.lrz.app',
      github: 'https://github.com/Felglitch739/AuraFit',
      badge: 'HACKATHON WINNER',
      badgeRed: true,
    },
    {
      id: 'build-pal-norte',
      num: '03',
      title: "Build Pa'l Norte",
      subtitle: 'COMUNIDAD TECH & HACKATHON 24H',
      desc: 'Cofundador y CMO de esta comunidad tecnológica en Matamoros, Tamaulipas. Impulsamos el talento local con eventos colaborativos y nuestro hackathon de 24 horas.',
      detail: "Build Pa'l Norte es un esfuerzo 100% colaborativo enfocado en empoderar desarrolladores del norte de México con eventos técnicos y competencias intensivas de programación.",
      tags: ['COMUNIDAD TECH', 'HACKATHON 24H', 'MATAMOROS'],
      github: 'https://github.com/BuildPalNorte',
      badge: 'CO-FOUNDER & CMO',
      badgeRed: false,
    },
    {
      id: 'gazpachos',
      num: '04',
      title: "Gazpacho's SPA",
      subtitle: 'REDIS EÑO WEB BAR & RESTAURANTE',
      desc: 'Single Page Application (SPA) para restaurante y bar local con interfaz moderna, menú interactivo y navegación fluida.',
      detail: 'Construida con React y Framer Motion, la aplicación ofrece una experiencia visual envolvente optimizada para clientes locales.',
      image: "/Gazpacho's.png",
      tags: ['REACT', 'FRAMER MOTION', 'GLASSMORPHISM'],
      link: 'https://gazpachos-lp.vercel.app',
      github: 'https://github.com/Felglitch739/gazpachos-lp',
      badge: 'WEB SPA',
      badgeRed: false,
    },
    {
      id: 'familyweather',
      num: '05',
      title: 'Family Weather Alert Bot',
      subtitle: 'AUTOMATIZACIÓN PYTHON & APIS',
      desc: 'Sistema automatizado de alertas meteorológicas construido en Python, integrado con APIs de clima y mensajería en PythonAnywhere.',
      detail: 'Ejecución automatizada mediante cron jobs en PythonAnywhere que monitorean APIs de clima y envían notificaciones en tiempo real.',
      image: '/familyweather.png',
      tags: ['PYTHON', 'PYTHONANYWHERE', 'APIS'],
      github: 'https://github.com/Felglitch739/Family_Weather',
      badge: 'AUTOMATION',
      badgeRed: false,
    },
  ]

  const t = {
    es: {
      label: "05 // ARCHITECTURE & CASE STUDIES",
      title: "PROYECTOS DESTACADOS",
      viewBtn: "Ver Arquitectura",
    },
    en: {
      label: "05 // ARCHITECTURE & CASE STUDIES",
      title: "FEATURED PROJECTS",
      viewBtn: "View Architecture",
    },
  }[lang]

  return (
    <section id="projects" className="section">
      <div className="container">
        <span className="section-label">{t.label}</span>
        <h2 className="display-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
          {t.title}
        </h2>

        {/* Bento Projects Grid */}
        <div className="bento-grid">
          {projects.map((p, i) => {
            const isLarge = i < 2
            return (
              <div
                key={p.id}
                className={`bento-card ${isLarge ? 'col-span-6' : 'col-span-4'}`}
                style={{ justifyContent: 'space-between', minHeight: '340px' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span className="ndot" style={{ fontSize: '1.2rem', color: 'var(--red)' }}>
                      PROJ_{p.num}
                    </span>
                    {p.badge && (
                      <span className={`mono-tag ${p.badgeRed ? 'mono-tag-red' : ''}`}>
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="card-title" style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>
                    {p.title}
                  </h3>
                  <div className="ndot" style={{ fontSize: '0.72rem', color: 'var(--gray-400)', marginBottom: '1rem' }}>
                    {p.subtitle}
                  </div>

                  <p className="body-text" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    {p.desc}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
                    {p.tags.map((t) => (
                      <span key={t} className="mono-tag" style={{ fontSize: '0.62rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.8rem' }}>
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noreferrer" className="ndot" style={{ fontSize: '0.75rem', color: 'var(--white)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <ExternalLink size={13} color="var(--red)" /> LIVE
                        </a>
                      )}
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noreferrer" className="ndot" style={{ fontSize: '0.75rem', color: 'var(--gray-400)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <GithubIcon size={13} /> GITHUB
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProject(p)}
                      className="ndot"
                      style={{ background: 'transparent', border: 'none', color: 'var(--red)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                    >
                      {t.viewBtn} <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Modal for Deep Technical Architecture */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 400,
                background: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
              }}
            >
              <div
                className="bento-card bento-card-active"
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: '640px', width: '100%', padding: '2.2rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="ndot" style={{ color: 'var(--red)', fontSize: '1.2rem' }}>
                    PROJ_{selectedProject.num} // ARCHITECTURE
                  </span>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="mono-tag"
                    style={{ cursor: 'pointer', background: 'transparent' }}
                  >
                    [ CLOSE ]
                  </button>
                </div>

                <h3 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>
                  {selectedProject.title}
                </h3>
                <div className="ndot" style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginBottom: '1.2rem' }}>
                  {selectedProject.subtitle}
                </div>

                <p className="body-text" style={{ color: 'var(--white)', marginBottom: '1.5rem' }}>
                  {selectedProject.detail}
                </p>

                <div style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="btn-bento btn-bento-primary"
                  >
                    CLOSE INSPECTOR
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
