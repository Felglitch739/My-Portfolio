import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Smartphone, Globe, Cpu, Bot, CloudSun, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import AccessibleDialog from './AccessibleDialog'
import Bento3DTilt from './Bento3DTilt'

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
  </svg>
)

interface Project {
  id: string
  num: string
  title: string
  subtitleEs: string
  subtitleEn: string
  descEs: string
  descEn: string
  detailEs: string
  detailEn: string
  keyPointsEs: string[]
  keyPointsEn: string[]
  image?: string
  tags: string[]
  link?: string
  github?: string
  badge: string
  badgeRed?: boolean
  icon: React.ReactNode
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
      title: 'KronoBook',
      subtitleEs: 'PLATAFORMA SAAS MULTI-TENANT DE CITAS & SERVICIOS',
      subtitleEn: 'MULTI-TENANT SAAS APPOINTMENT PLATFORM',
      descEs: 'Plataforma SaaS multi-inquilino de gestión de citas y reservas diseñada para negocios de servicios (barberías, auto detailing, etc.), con onboarding self-service y control de acceso seguro.',
      descEn: 'Multi-tenant SaaS booking platform engineered for service businesses (barbershops, auto detailing), featuring self-service business onboarding and granular access control.',
      detailEs: 'KronoBook resuelve la complejidad de múltiples negocios compartiendo la misma infraestructura mediante un esquema multi-tenant seguro en PostgreSQL con políticas Row-Level Security (RLS) en Supabase. Cuenta con enrutamiento dinámico por inquilino, aislamiento total de datos, panel administrativo en tiempo real e integración operativa directa con el negocio móvil DualFX.',
      detailEn: 'KronoBook tackles multi-client isolation through PostgreSQL Row-Level Security (RLS) on Supabase. It features dynamic tenant subrouting, zero-leak data boundaries, real-time analytics dashboard, and direct operational deployment powering DualFX mobile detailing.',
      keyPointsEs: [
        'Onboarding self-service para negocios independientes',
        'Enrutamiento dinámico y aislamiento estricto por inquilino (RLS)',
        'Control de acceso basado en roles y gestión de disponibilidad horaria',
        'Integración operativa en vivo con clientes comerciales (DualFX)',
      ],
      keyPointsEn: [
        'Self-service onboarding flow for independent businesses',
        'Dynamic tenant routing with strict Row-Level Security (RLS)',
        'Role-based access control and live appointment dispatching',
        'Production integration powering commercial operations (DualFX)',
      ],
      image: '/KronoBook_Preview.png',
      tags: ['REACT', 'TYPESCRIPT', 'SUPABASE', 'POSTGRESQL', 'TAILWIND CSS'],
      link: 'https://kronobook.vercel.app',
      github: 'https://github.com/Felglitch739/KronoBook',
      badge: 'PRODUCTION SAAS',
      badgeRed: true,
      icon: <Globe size={18} color="var(--red)" />,
    },
    {
      id: 'tph-monitor',
      num: '02',
      title: 'TPH Monitor',
      subtitleEs: 'MONITOREO INDUSTRIAL DE CALIDAD DE AGUA VÍA BLE',
      subtitleEn: 'INDUSTRIAL WATER QUALITY MONITORING VIA BLE',
      descEs: 'Aplicación móvil para el monitoreo industrial de calidad y parámetros de agua en tiempo real conectado vía Bluetooth Low Energy (BLE) a microcontroladores y sensores embebidos.',
      descEn: 'Industrial mobile monitoring app providing real-time telemetry of water quality metrics connected via Bluetooth Low Energy (BLE) to embedded hardware and probes.',
      detailEs: 'Diseñada para entornos de medición física, TPH Monitor establece una conexión BLE de baja latencia con estaciones microcontroladas (ESP32). Procesa flujos de datos continuos de sensores de pH, temperatura y turbidez, renderizando gráficos analíticos interactivos y disparando alertas cuando los parámetros superan umbrales críticos.',
      detailEn: 'Engineered for physical telemetry, TPH Monitor establishes low-latency BLE streaming with ESP32 sensor rigs. It processes continuous streams of pH, temperature, and turbidity data, rendering interactive telemetry graphs and firing instant threshold alarms.',
      keyPointsEs: [
        'Conexión continua de baja energía vía Bluetooth LE (BLE)',
        'Sincronización bidireccional de datos con microcontroladores ESP32',
        'Gestión de estado reactivo y visualización analítica en tiempo real',
        'Detección y alertas preventivas de anomalías en parámetros industriales',
      ],
      keyPointsEn: [
        'Continuous low-power Bluetooth Low Energy (BLE) telemetry',
        'Bidirectional data synchronization with ESP32 microcontrollers',
        'Reactive real-time state and high-speed telemetry charts',
        'Threshold detection and proactive alert triggers for industrial probes',
      ],
      tags: ['REACT NATIVE', 'BLE PROTOCOL', 'ESP32 / IOT', 'SENSORS', 'TYPESCRIPT'],
      badge: 'HARDWARE & MOBILE',
      badgeRed: true,
      icon: <Cpu size={18} color="var(--red)" />,
    },
    {
      id: 'aurafit',
      num: '03',
      title: 'AuraFit Mobile App',
      subtitleEs: 'APP MÓVIL DE FITNESS & SEGUIMIENTO ASISTIDA POR IA',
      subtitleEn: 'AI-POWERED FITNESS & WORKOUT TRACKING APP',
      descEs: 'Aplicación móvil de fitness y seguimiento de entrenamiento asistida por IA. Originada durante el hackathon FronteraHacks (24h) en Edinburg y escalada a una app móvil completa.',
      descEn: 'AI-assisted mobile fitness and training tracking application. Born during the 24h FronteraHacks hackathon in Edinburg and subsequently scaled into a full native app.',
      detailEs: 'AuraFit combina rutinas de hipertrofia y fuerza con algoritmos adaptativos asistidos por IA para optimizar la sobrecarga progresiva y el volumen semanal. Nació como prototipo en el hackathon FronteraHacks (24h continuas de programación en Edinburg) y ha evolucionado hacia una suite nativa multiplataforma con React Native y Expo.',
      detailEn: 'AuraFit pairs strength training routines with adaptive AI recommendation engines to calculate progressive overload and weekly muscle volume. Born as a concept at the 24-hour FronteraHacks hackathon in Edinburg, it was scaled into a full cross-platform native codebase with React Native and Expo.',
      keyPointsEs: [
        'Originada en el hackathon FronteraHacks de 24 horas continuas en Edinburg',
        'Motor de recomendaciones adaptativas de entrenamiento impulsado por IA',
        'Arquitectura nativa con React Native, Expo y TypeScript',
        'Monitoreo analítico de sobrecarga progresiva y métricas corporales',
      ],
      keyPointsEn: [
        'Born during the intensive 24-hour FronteraHacks hackathon in Edinburg',
        'Adaptive AI training recommendations based on workout performance',
        'Engineered on React Native, Expo, and TypeScript for iOS & Android',
        'Progressive overload analytics and volume monitoring dashboards',
      ],
      image: '/aurafit.png',
      tags: ['REACT NATIVE', 'EXPO', 'PYTHON / AI', 'TYPESCRIPT', 'IOS & ANDROID'],
      link: 'https://aurafit.lrz.app',
      github: 'https://github.com/Felglitch739/AuraFit',
      badge: 'FRONTERAHACKS',
      badgeRed: true,
      icon: <Smartphone size={18} color="var(--red)" />,
    },
    {
      id: 'revit-mcp',
      num: '04',
      title: 'Extensión Revit CAD / BIM',
      subtitleEs: 'PLUGIN C# Y ASISTENTE CONVERSACIONAL VÍA MCP',
      subtitleEn: 'C# REVIT EXTENSION & MCP CONVERSATIONAL BIM BOT',
      descEs: 'Plugin personalizado de escritorio en C# para Autodesk Revit que integra un asistente conversacional inteligente dentro del entorno BIM mediante Model Context Protocol (MCP).',
      descEn: 'Custom C# desktop extension for Autodesk Revit integrating a conversational AI assistant directly inside the BIM modeling workflow via Model Context Protocol (MCP).',
      detailEs: 'Este desarrollo conecta la API nativa de Autodesk Revit con modelos de lenguaje modernos utilizando el protocolo estándar Model Context Protocol (MCP). Permite a arquitectos e ingenieros consultar volumetrías, parámetros de familias y metadatos estructurales en lenguaje natural, agilizando tareas repetitivas de modelado y auditoría BIM.',
      detailEn: 'This project bridges the native Autodesk Revit API with modern LLMs using the standardized Model Context Protocol (MCP). It enables architects and engineers to query dimensional volumes, family parameters, and structural BIM elements in natural language, automating repetitive modeling and audit tasks.',
      keyPointsEs: [
        'Desarrollo de extensión nativa en C# y .NET para Autodesk Revit API',
        'Integración del Model Context Protocol (MCP) para ingesta de contexto BIM',
        'Asistente conversacional con IA para consulta y automatización de modelos',
        'Inspección y auditoría de parámetros estructurales en tiempo real',
      ],
      keyPointsEn: [
        'Native desktop plugin built with C# and .NET for the Autodesk Revit API',
        'Integration of the Model Context Protocol (MCP) for structured BIM queries',
        'Conversational AI assistant for model data interrogation and automation',
        'Real-time structural element inspection and parameter audits',
      ],
      tags: ['C#', '.NET', 'AUTODESK REVIT API', 'MCP', 'AI INTEGRATION'],
      badge: 'CAD & AI PROTOCOL',
      badgeRed: false,
      icon: <Bot size={18} color="var(--white)" />,
    },
    {
      id: 'gazpachos',
      num: '05',
      title: "Gazpacho's Restaurant - Bar",
      subtitleEs: 'REDISEÑO WEB & DESPLIEGUE COMERCIAL',
      subtitleEn: 'COMMERCIAL WEB REDESIGN & DEPLOYMENT',
      descEs: 'Rediseño y despliegue del portal web comercial para el restaurante y bar local Gazpacho\'s con frontend moderno, navegación fluida y arquitectura visual envolvente.',
      descEn: 'Complete redesign and production deployment of the commercial web portal for Gazpacho\'s restaurant and bar, featuring modern UI and high-speed edge delivery.',
      detailEs: 'Diseñado para potenciar la identidad digital del negocio gastronómico. Desarrollado con React, animaciones fluidas y optimización de rendimiento en Vercel, proporcionando a los comensales acceso ágil al menú interactivo, horarios y reservas de mesa con una estética cuidada.',
      detailEn: 'Created to elevate the restaurant\'s brand identity and customer acquisition. Developed in React with fluid interactions and deployed on Vercel\'s edge network, giving diners fast access to interactive menus, schedules, and table inquiries.',
      keyPointsEs: [
        'Rediseño visual completo con estética moderna y responsive',
        'Menú interactivo optimizado para alta retención móvil',
        'Despliegue optimizado en Vercel con entrega optimizada de recursos',
      ],
      keyPointsEn: [
        'Complete visual overhaul with modern responsive styling',
        'Interactive digital menu optimized for mobile ordering',
        'Vercel edge deployment with optimized asset delivery',
      ],
      image: "/Gazpacho's.png",
      tags: ['REACT', 'VITE', 'VERCEL', 'UI/UX', 'FRAMER MOTION'],
      link: 'https://gazpachos-lp.vercel.app',
      github: 'https://github.com/Felglitch739/gazpachos-lp',
      badge: 'COMMERCIAL WEB',
      badgeRed: false,
      icon: <Globe size={18} color="var(--white)" />,
    },
    {
      id: 'familyweather',
      num: '06',
      title: 'Family Weather Alert Bot',
      subtitleEs: 'BOT AUTOMATIZADO DE ALERTAS METEOROLÓGICAS',
      subtitleEn: 'AUTOMATED LOCAL WEATHER FORECAST & ALERT BOT',
      descEs: 'Bot automatizado de pronósticos y alertas meteorológicas locales construido con Python, consumo de la API OpenWeather y webhooks para mensajería instantánea.',
      descEn: 'Automated weather forecast and local alert bot engineered with Python, consuming the OpenWeather API and dispatching real-time notifications via webhooks.',
      detailEs: 'Sistema de monitoreo meteorológico desatendido ejecutado mediante tareas programadas (cron jobs). Analiza condiciones de precipitación, viento y temperaturas extremas, formateando reportes automáticos y despachando alertas instantáneas a través de webhooks para mantener a usuarios prevenidos ante cambios drásticos de clima.',
      detailEn: 'Unattended weather daemon triggered via scheduled cron jobs. It evaluates precipitation thresholds, wind velocity, and extreme temperature shifts, formatting concise summaries and broadcasting instant alerts through webhooks.',
      keyPointsEs: [
        'Scripting en Python con consumo de OpenWeather API',
        'Ejecución programada automatizada 24/7 mediante cron jobs',
        'Despacho de alertas climáticas críticas vía webhooks instantáneos',
      ],
      keyPointsEn: [
        'Python engine parsing real-time OpenWeather API payloads',
        '24/7 automated scheduled execution via robust cron pipelines',
        'Instant broadcast of extreme weather alerts via secure webhooks',
      ],
      image: '/familyweather.png',
      tags: ['PYTHON', 'OPENWEATHER API', 'WEBHOOKS', 'AUTOMATION', 'CRON'],
      github: 'https://github.com/Felglitch739/Family_Weather',
      badge: 'PYTHON AUTOMATION',
      badgeRed: false,
      icon: <CloudSun size={18} color="var(--white)" />,
    },
  ]

  const t = {
    es: {
      label: "05 // INGENIERÍA & CASOS DE ESTUDIO",
      title: "PROYECTOS DESTACADOS",
      viewBtn: "Ver Arquitectura",
      pointsTitle: "PUNTOS CLAVE DE ARQUITECTURA:",
      techTitle: "TECNOLOGÍAS EMPLEADAS:",
      closeModal: "CERRAR INSPECTOR",
    },
    en: {
      label: "05 // ENGINEERING & CASE STUDIES",
      title: "FEATURED PROJECTS",
      viewBtn: "View Architecture",
      pointsTitle: "ARCHITECTURAL HIGHLIGHTS:",
      techTitle: "TECHNOLOGIES EMPLOYED:",
      closeModal: "CLOSE INSPECTOR",
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
              <Bento3DTilt
                key={p.id}
                className={isLarge ? 'col-span-6' : 'col-span-4'}
                style={{ justifyContent: 'space-between', minHeight: '360px' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="ndot" style={{ fontSize: '1.1rem', color: 'var(--red)' }}>
                        PROJ_{p.num}
                      </span>
                      {p.icon}
                    </div>
                    {p.badge && (
                      <span className={`mono-tag ${p.badgeRed ? 'mono-tag-red' : ''}`} style={{ fontSize: '0.62rem' }}>
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="card-title" style={{ fontSize: '1.35rem', marginBottom: '0.3rem' }}>
                    {p.title}
                  </h3>
                  <div className="ndot" style={{ fontSize: '0.68rem', color: 'var(--gray-400)', marginBottom: '0.9rem' }}>
                    {lang === 'es' ? p.subtitleEs : p.subtitleEn}
                  </div>

                  <p className="body-text" style={{ fontSize: '0.88rem', marginBottom: '1.2rem', lineHeight: 1.6 }}>
                    {lang === 'es' ? p.descEs : p.descEn}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.2rem' }}>
                    {p.tags.map((tag) => (
                      <span key={tag} className="mono-tag" style={{ fontSize: '0.6rem', padding: '0.25rem 0.5rem' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.8rem' }}>
                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="ndot"
                          style={{ fontSize: '0.72rem', color: 'var(--white)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                        >
                          <ExternalLink size={12} color="var(--red)" /> LIVE
                        </a>
                      )}
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="ndot"
                          style={{ fontSize: '0.72rem', color: 'var(--gray-400)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                        >
                          <GithubIcon size={12} /> GITHUB
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
              </Bento3DTilt>
            )
          })}
        </div>

        {/* Modal for Deep Technical Architecture */}
        <>
          {selectedProject && (
            <AccessibleDialog open onClose={() => setSelectedProject(null)} labelledBy="project-title">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 500,
                background: 'rgba(0, 0, 0, 0.88)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
              }}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bento-card bento-card-active"
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: '680px', width: '100%', maxHeight: 'calc(100dvh - 2rem)', overflowY: 'auto', padding: '2.2rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="ndot" style={{ color: 'var(--red)', fontSize: '1.1rem' }}>
                    PROJ_{selectedProject.num} // ARCHITECTURE_INSPECTOR
                  </span>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="mono-tag"
                    style={{ cursor: 'pointer', background: 'transparent' }}
                    aria-label="Cerrar inspector de proyecto"
                  >
                    [ CLOSE ]
                  </button>
                </div>

                <h3 id="project-title" className="card-title" style={{ fontSize: '1.6rem', marginBottom: '0.3rem' }}>
                  {selectedProject.title}
                </h3>
                <div className="ndot" style={{ fontSize: '0.72rem', color: 'var(--gray-400)', marginBottom: '1.2rem' }}>
                  {lang === 'es' ? selectedProject.subtitleEs : selectedProject.subtitleEn}
                </div>

                <p className="body-text" style={{ color: 'var(--white)', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  {lang === 'es' ? selectedProject.detailEs : selectedProject.detailEn}
                </p>

                {/* Architectural Highlights */}
                <div style={{ marginBottom: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.2rem' }}>
                  <div className="ndot" style={{ fontSize: '0.75rem', color: 'var(--red)', marginBottom: '0.8rem' }}>
                    {t.pointsTitle}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {(lang === 'es' ? selectedProject.keyPointsEs : selectedProject.keyPointsEn).map((point, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <CheckCircle2 size={15} color="var(--red)" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span className="body-text" style={{ fontSize: '0.85rem', color: 'var(--gray-200)' }}>
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pills */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div className="ndot" style={{ fontSize: '0.72rem', color: 'var(--gray-500)', marginBottom: '0.5rem' }}>
                    {t.techTitle}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="mono-tag mono-tag-red" style={{ fontSize: '0.65rem' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.2rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-bento btn-bento-primary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                      >
                        <ExternalLink size={13} /> LIVE DEMO
                      </a>
                    )}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-bento btn-bento-outline"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                      >
                        <GithubIcon size={13} /> REPOSITORY
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="btn-bento btn-bento-outline"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                  >
                    {t.closeModal}
                  </button>
                </div>
              </motion.div>
            </motion.div>
            </AccessibleDialog>
          )}
        </>
      </div>
    </section>
  )
}
