import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Cpu, Globe, Trophy, Smartphone, CloudSun, Users, ArrowUpRight, Sparkles, Code2 } from 'lucide-react'

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
  </svg>
)

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  detailedCaseStudy?: string
  image?: string
  tags: { label: string; color: string }[]
  link?: string
  linkLabel?: string
  github?: string
  badge?: string
  badgeColor?: string
  icon: React.ReactNode
  accent: string
  category: 'saas' | 'mobile' | 'community' | 'web' | 'automation'
}

interface ProjectsProps {
  lang?: 'es' | 'en'
}

export default function Projects({ lang = 'es' }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: 'kronobook',
      title: 'KronoBook & DualFX',
      subtitle: 'Plataforma SaaS Multi-Tenant & Caso de Éxito DualFX',
      description:
        'SaaS completo para agendamiento de citas y gestión de clientes con Supabase. Integra como caso de éxito la página operativa real de "DualFX" (autolavado y detallado automotriz local).',
      detailedCaseStudy:
        'KronoBook fue diseñado con arquitectura multi-tenant en Supabase para permitir a negocios locales gestionar reservas y clientes. DualFX se integró como el primer caso de éxito operativo en vivo, optimizando el flujo de trabajo de citas y notificaciones moviles.',
      image: '/KronoBook_Preview.png',
      tags: [
        { label: 'SaaS Multi-Tenant', color: 'var(--cyan)' },
        { label: 'Supabase', color: 'var(--emerald)' },
        { label: 'React / Vite', color: 'var(--violet)' },
        { label: 'Tailwind CSS', color: 'var(--pink)' },
      ],
      link: 'https://kronobook.vercel.app',
      linkLabel: 'Sitio KronoBook',
      github: 'https://github.com/Felglitch739/KronoBook',
      badge: '🚀 SaaS & Case Study',
      badgeColor: 'var(--emerald)',
      icon: <Globe size={20} />,
      accent: 'var(--emerald)',
      category: 'saas',
    },
    {
      id: 'aurafit',
      title: 'AuraFit Mobile App',
      subtitle: 'App de Fitness con IA — Frontera Devs Winner',
      description:
        'Aplicación móvil de fitness impulsada por IA para análisis corporal y rutinas personalizadas. Nacida en el Hackathon de Frontera Devs, actualmente en migración completa a React Native para iOS y Android.',
      detailedCaseStudy:
        'Tras ganar reconocimiento en Frontera Devs Edinburg, AuraFit se está reescribiendo desde cero usando React Native y TypeScript. Permite a los usuarios realizar seguimiento inteligente de entrenamientos con algoritmos de sugerencia personalizada.',
      image: '/aurafit.png',
      tags: [
        { label: 'React Native', color: 'var(--cyan)' },
        { label: 'AI/ML Fitness', color: 'var(--amber)' },
        { label: 'iOS & Android', color: 'var(--violet)' },
      ],
      link: 'https://aurafit.lrz.app',
      linkLabel: 'App AuraFit',
      github: 'https://github.com/Felglitch739/AuraFit',
      badge: '🏆 Frontera Devs Winner',
      badgeColor: 'var(--amber)',
      icon: <Smartphone size={20} />,
      accent: 'var(--cyan)',
      category: 'mobile',
    },
    {
      id: 'build-pal-norte',
      title: "Build Pa'l Norte",
      subtitle: 'Comunidad Tech & Hackathon de 24h en Matamoros',
      description:
        'Cofundador y CMO de esta comunidad tecnológica en Matamoros, Tamaulipas. Impulsamos la innovación local con eventos colaborativos, talleres y nuestro hackathon de 24 horas.',
      detailedCaseStudy:
        'Build Pa\'l Norte es un esfuerzo 100% colaborativo enfocado en empoderar a estudiantes y desarrolladores del norte de México. Organizado por jóvenes locales para fortalecer el ecosistema de tecnología y programación.',
      tags: [
        { label: 'Comunidad Tech', color: 'var(--emerald)' },
        { label: '24h Hackathon', color: 'var(--amber)' },
        { label: 'Matamoros, Tamps', color: 'var(--cyan)' },
      ],
      badge: '⚡ Co-Founder & CMO',
      badgeColor: 'var(--cyan)',
      icon: <Users size={20} />,
      accent: 'var(--violet)',
      category: 'community',
    },
    {
      id: 'gazpachos',
      title: "Gazpacho's SPA",
      subtitle: 'Prototipo Web Moderno & Glassmorphism',
      description:
        'Single Page Application (SPA) para restaurante y bar local con estética glassmorphism, menú interactivo y experiencia visual moderna.',
      image: "/Gazpacho's.png",
      tags: [
        { label: 'React', color: 'var(--cyan)' },
        { label: 'Glassmorphism UI', color: 'var(--pink)' },
        { label: 'Framer Motion', color: 'var(--violet)' },
      ],
      link: 'https://gazpachos-lp.vercel.app',
      linkLabel: 'Sitio En Vivo',
      github: 'https://github.com/Felglitch739/gazpachos-lp',
      icon: <Globe size={20} />,
      accent: 'var(--pink)',
      category: 'web',
    },
    {
      id: 'familyweather',
      title: 'Family Weather Alert Bot',
      subtitle: 'Automatización con Python & Messaging APIs',
      description:
        'Sistema de notificaciones meteorológicas automatizadas construido en Python, integrado con APIs de clima y mensajería, desplegado en PythonAnywhere.',
      image: '/familyweather.png',
      tags: [
        { label: 'Python', color: 'var(--cyan)' },
        { label: 'PythonAnywhere', color: 'var(--emerald)' },
        { label: 'Messaging APIs', color: 'var(--amber)' },
      ],
      icon: <CloudSun size={20} />,
      accent: 'var(--amber)',
      category: 'automation',
    },
  ]

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  const t = {
    es: {
      tag: "PROYECTOS DESTACADOS",
      title: "Soluciones & Casos de Éxito",
      subtitle: "Proyectos reales construidos con rigor técnico, enfoque en el usuario y alto impacto.",
      filters: {
        all: "Todos",
        saas: "SaaS & Cloud",
        mobile: "AI & Mobile",
        community: "Comunidad",
        web: "Web SPA",
        automation: "Automatización",
      },
      viewDetails: "Ver Arquitectura",
    },
    en: {
      tag: "FEATURED PROJECTS",
      title: "Solutions & Case Studies",
      subtitle: "Real-world projects built with engineering rigor and user-centered focus.",
      filters: {
        all: "All",
        saas: "SaaS & Cloud",
        mobile: "AI & Mobile",
        community: "Community",
        web: "Web SPA",
        automation: "Automation",
      },
      viewDetails: "View Architecture",
    },
  }[lang]

  return (
    <section id="projects" className="section" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="tag tag-emerald mono" style={{ marginBottom: '0.8rem' }}>
            <Code2 size={14} /> &nbsp; {t.tag}
          </span>
          <h2 className="section-title gradient-text">{t.title}</h2>
          <p className="section-subtitle">{t.subtitle}</p>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.5rem',
              background: 'rgba(15, 23, 42, 0.8)',
              padding: '0.4rem',
              borderRadius: '100px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {Object.entries(t.filters).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                style={{
                  padding: '0.5rem 1.2rem',
                  borderRadius: '100px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  background: activeFilter === key ? 'linear-gradient(135deg, var(--cyan-dim), var(--violet-dim))' : 'transparent',
                  color: activeFilter === key ? '#ffffff' : '#94a3b8',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Image Banner */}
              {project.image ? (
                <div style={{ width: '100%', height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, var(--bg-deep) 0%, transparent 80%)',
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '160px',
                    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(129, 140, 248, 0.1))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: project.accent,
                  }}
                >
                  <Users size={48} opacity={0.6} />
                </div>
              )}

              {/* Card Body */}
              <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {project.badge && (
                  <span
                    className="mono"
                    style={{
                      alignSelf: 'flex-start',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '0.25rem 0.7rem',
                      borderRadius: '100px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      color: project.badgeColor || 'var(--cyan)',
                      border: `1px solid ${project.badgeColor || 'var(--cyan)'}`,
                      marginBottom: '0.8rem',
                    }}
                  >
                    {project.badge}
                  </span>
                )}

                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.3rem' }}>
                  {project.title}
                </h3>
                <h4 style={{ fontSize: '0.88rem', color: project.accent, marginBottom: '1rem', fontWeight: 600 }}>
                  {project.subtitle}
                </h4>
                <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {project.tags.map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'monospace',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: t.color,
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      {t.label}
                    </span>
                  ))}
                </div>

                {/* Action Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ display: 'flex', gap: '0.8rem' }}>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#f8fafc',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        <ExternalLink size={15} color="var(--cyan)" />
                        {project.linkLabel || 'Live'}
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#94a3b8',
                          fontSize: '0.85rem',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        <GithubIcon size={15} />
                        GitHub
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--cyan)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                    }}
                  >
                    {t.viewDetails} <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for Deep Case Study */}
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
                zIndex: 1000,
                background: 'rgba(2, 8, 23, 0.85)',
                backdropFilter: 'blur(16px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card"
                style={{
                  maxWidth: '700px',
                  width: '100%',
                  padding: '2.5rem',
                  background: '#080d1a',
                  borderColor: selectedProject.accent,
                }}
              >
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.5rem' }}>
                  {selectedProject.title}
                </h3>
                <h4 style={{ fontSize: '0.95rem', color: selectedProject.accent, marginBottom: '1.5rem', fontWeight: 600 }}>
                  {selectedProject.subtitle}
                </h4>
                <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {selectedProject.detailedCaseStudy || selectedProject.description}
                </p>
                <div style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="btn-ghost"
                    style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem' }}
                  >
                    Cerrar / Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
