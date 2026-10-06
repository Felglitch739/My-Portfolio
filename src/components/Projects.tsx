import { useState } from 'react'
import { ExternalLink, X, Smartphone, Globe, Cpu, Bot, CloudSun, ArrowUpRight } from 'lucide-react'
import AccessibleDialog from './AccessibleDialog'

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
      descEs: 'Reservas y gestión de citas para negocios de servicios. Un proyecto para trabajar flujos de onboarding, disponibilidad y separación de datos entre negocios.',
      descEn: 'Bookings and appointment management for service businesses. A project exploring onboarding, availability, and data separation between businesses.',
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
      badge: 'WEB / SAAS',
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
      descEs: 'Una app de fitness que nació en FronteraHacks. Combina seguimiento de entrenamiento con recomendaciones asistidas por IA en React Native y Expo.',
      descEn: 'A fitness app that started at FronteraHacks, combining workout tracking and AI-assisted recommendations with React Native and Expo.',
      detailEs: 'AuraFit combina rutinas de hipertrofia y fuerza con algoritmos adaptativos asistidos por IA para optimizar la sobrecarga progresiva y el volumen semanal. Nació como prototipo en el hackathon FronteraHacks (24h continuas de programación en Edinburg) y ha evolucionado hacia una suite nativa multiplataforma con React Native y Expo.',
      detailEn: 'AuraFit pairs strength training routines with adaptive AI recommendation engines to calculate progressive overload and weekly muscle volume. Born as a prototype at the 24-hour FronteraHacks hackathon in Edinburg, it was scaled into a full cross-platform native codebase with React Native and Expo.',
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
        'Publicación del sitio en Vercel',
      ],
      keyPointsEn: [
        'Complete visual overhaul with modern responsive styling',
        'Interactive digital menu optimized for mobile ordering',
        'Website deployment on Vercel',
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

  const es = lang === 'es'
  const featuredIds = ['kronobook', 'aurafit', 'gazpachos']
  const featured = featuredIds.map(id => projects.find(project => project.id === id)!)
  const otherProjects = projects.filter(project => !featuredIds.includes(project.id))
  const previewLabel = (project: Project) => ['aurafit', 'familyweather'].includes(project.id)
    ? (es ? 'CONCEPTO VISUAL' : 'VISUAL CONCEPT')
    : (es ? 'CAPTURA DEL SITIO' : 'SITE SCREENSHOT')
  const renderProject = (project: Project, index: number) => (
    <article className="project-card" key={project.id}>
      {project.image ? <div className="project-preview"><img src={project.image} alt={`${project.title} — ${previewLabel(project).toLowerCase()}`} loading="lazy" decoding="async" width={800} height={550} /><span className="preview-label">{previewLabel(project)}</span></div>
        : <div className="project-fallback" aria-hidden="true">{project.icon}</div>}
      <div className="project-content">
        <div className="project-kicker"><span>PROJECT / {String(index + 1).padStart(2, '0')}</span><span>{project.badge}</span></div>
        <h3>{project.title}</h3>
        <p className="body-text">{es ? project.descEs : project.descEn}</p>
        <div className="project-tags">{project.tags.slice(0, 4).map(tag => <span className="mono-tag" key={tag}>{tag}</span>)}</div>
        <div className="project-actions">
          {project.link && <a href={project.link} target="_blank" rel="noreferrer" aria-label={`${es ? 'Abrir demo de' : 'Open demo of'} ${project.title}`}><ExternalLink size={13} />Demo</a>}
          {project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${es ? 'Ver código de' : 'View code for'} ${project.title}`}><GithubIcon size={13} />{es ? 'Código' : 'Code'}</a>}
          <button onClick={() => setSelectedProject(project)} aria-label={`${es ? 'Ver caso de' : 'View case study for'} ${project.title}`}>{es ? 'Ver caso' : 'Case study'} <ArrowUpRight size={14} /></button>
        </div>
      </div>
    </article>
  )

  return <section id="projects" className="section">
    <div className="container">
      <span className="section-label">02 // {es ? 'PROYECTOS SELECCIONADOS' : 'SELECTED WORK'}</span>
      <div className="section-heading"><h2 className="display-title">{es ? 'Ideas que llevé al código.' : 'Ideas I brought to code.'}</h2><p className="body-text">{es ? 'Aplicaciones web, móvil y herramientas que conectan ambos mundos. Explora el contexto y las decisiones detrás de cada proyecto.' : 'Web apps, mobile apps, and tools that connect both worlds. Explore the context and decisions behind each project.'}</p></div>
      <div className="projects-grid">{featured.map(renderProject)}</div>
      <details className="more-projects"><summary>{es ? 'Más exploraciones: hardware, CAD y automatización' : 'More explorations: hardware, CAD, and automation'} (3)</summary><div className="projects-grid">{otherProjects.map((project, index) => renderProject(project, index + 3))}</div></details>
    </div>
    <AccessibleDialog open={selectedProject !== null} onClose={() => setSelectedProject(null)} labelledBy="project-dialog-title">
      {selectedProject && <div className="project-dialog-body">
        <div className="dialog-heading"><div><span className="section-label">{es ? 'CASO DE PROYECTO' : 'PROJECT CASE STUDY'}</span><h2 id="project-dialog-title">{selectedProject.title}</h2></div><button className="icon-button" onClick={() => setSelectedProject(null)} aria-label={es ? 'Cerrar caso de proyecto' : 'Close case study'} autoFocus><X size={20} /></button></div>
        {selectedProject.image && <><img className="project-dialog-image" src={selectedProject.image} alt={`${selectedProject.title} — ${previewLabel(selectedProject).toLowerCase()}`} /><p className="project-focus">{previewLabel(selectedProject)}</p></>}
        <h3>{es ? 'CONTEXTO Y ENFOQUE' : 'CONTEXT & APPROACH'}</h3>
        <p className="body-text">{es ? selectedProject.detailEs : selectedProject.detailEn}</p>
        <h3>{es ? 'DECISIONES Y DESARROLLO' : 'DECISIONS & DEVELOPMENT'}</h3>
        <ul>{(es ? selectedProject.keyPointsEs : selectedProject.keyPointsEn).map(point => <li key={point}>{point}</li>)}</ul>
        <div className="project-tags">{selectedProject.tags.map(tag => <span className="mono-tag" key={tag}>{tag}</span>)}</div>
        <div className="project-actions">{selectedProject.link && <a className="text-link" href={selectedProject.link} target="_blank" rel="noreferrer">{es ? 'Abrir demo' : 'Open demo'} ↗</a>}{selectedProject.github && <a className="text-link" href={selectedProject.github} target="_blank" rel="noreferrer">{es ? 'Ver repositorio' : 'View repository'} ↗</a>}<button onClick={() => setSelectedProject(null)}>{es ? 'Cerrar' : 'Close'}</button></div>
      </div>}
    </AccessibleDialog>
  </section>
}
