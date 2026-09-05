import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Terminal, Layers, Database, Code2, Sparkles, Activity, Wrench, Radio, Box, Palette } from 'lucide-react'

interface TechStackProps {
  lang?: 'es' | 'en'
}

type CategoryKey = 'ALL' | 'FRONTEND_MOBILE' | 'BACKEND_DB' | 'HARDWARE_IOT' | 'CAD_MCP' | 'DEVOPS_TOOLS' | 'CREATIVE_CRAFT'

interface Skill {
  name: string
  category: CategoryKey
  catLabel: string
  level: number
  descEs: string
  descEn: string
  appliedIn: string
  icon: React.ReactNode
}

export default function TechStack({ lang = 'es' }: TechStackProps) {
  const [selected, setSelected] = useState<Skill | null>(null)
  const [activeTab, setActiveTab] = useState<CategoryKey>('ALL')

  const skills: Skill[] = [
    // Frontend & Mobile
    {
      name: 'React Native & Expo',
      category: 'FRONTEND_MOBILE',
      catLabel: 'MOBILE ARCHITECTURE',
      level: 92,
      descEs: 'Desarrollo de aplicaciones móviles multiplataforma nativas para iOS y Android, gestión de estado reactivo y conectividad BLE.',
      descEn: 'Cross-platform native mobile application engineering for iOS & Android, reactive state management, and real-time BLE connectivity.',
      appliedIn: 'AuraFit (AI Fitness App) & TPH Monitor (Industrial IoT App)',
      icon: <Terminal size={18} color="var(--red)" />,
    },
    {
      name: 'React & Vite',
      category: 'FRONTEND_MOBILE',
      catLabel: 'FRONTEND ARCHITECTURE',
      level: 94,
      descEs: 'Construcción de SPAs modernas de alto rendimiento, modularidad por componentes, renderizado óptimo y bundling ultrarrápido.',
      descEn: 'High-performance modern SPA architecture, modular component systems, optimized rendering, and blazing-fast tooling.',
      appliedIn: 'KronoBook SaaS Platform, Gazpacho\'s Web & Portfolio',
      icon: <Code2 size={18} color="var(--white)" />,
    },
    {
      name: 'TypeScript & JavaScript',
      category: 'FRONTEND_MOBILE',
      catLabel: 'TYPE SAFETY & CORE',
      level: 90,
      descEs: 'Tipado estricto, interfaces complejas, genéricos y programación asíncrona para eliminar fallos en tiempo de ejecución.',
      descEn: 'Strict type safety, complex interfaces, generics, and asynchronous logic to eliminate runtime failure points.',
      appliedIn: 'KronoBook, AuraFit, TPH Monitor & Full-Stack Codebases',
      icon: <Code2 size={18} color="var(--red)" />,
    },
    {
      name: 'Tailwind CSS & Modern UI',
      category: 'FRONTEND_MOBILE',
      catLabel: 'DESIGN SYSTEMS',
      level: 92,
      descEs: 'Sistemas de tokens utilitarios, interfaces responsivas, paletas Nothing OS, glassmorphism y micro-interacciones.',
      descEn: 'Utility token systems, responsive interfaces, sleek dark palettes, glassmorphism, and dynamic micro-interactions.',
      appliedIn: 'KronoBook SaaS, Gazpacho\'s Restaurant & Portfolio UI',
      icon: <Layers size={18} color="var(--white)" />,
    },

    // Backend & Databases
    {
      name: 'Supabase & PostgreSQL',
      category: 'BACKEND_DB',
      catLabel: 'DATABASE & MULTI-TENANT',
      level: 90,
      descEs: 'Arquitectura multi-tenant, políticas de seguridad a nivel de fila (RLS), triggers, funciones PL/pgSQL y esquemas relacionales optimizados.',
      descEn: 'Multi-tenant architecture, Row-Level Security (RLS) policies, triggers, PL/pgSQL routines, and high-performance relational schemas.',
      appliedIn: 'KronoBook Multi-Tenant SaaS (Business isolation & Auth)',
      icon: <Database size={18} color="var(--red)" />,
    },
    {
      name: 'Python & Flask',
      category: 'BACKEND_DB',
      catLabel: 'BACKEND & AUTOMATION',
      level: 88,
      descEs: 'Construcción de microservicios, consumo de APIs meteorológicas, automatización de cron jobs y procesamiento para modelos de IA.',
      descEn: 'Microservice creation, weather APIs orchestration, automated cron pipelines, and data preprocessing for AI models.',
      appliedIn: 'Family Weather Alert Bot, AuraFit AI Backend & Data Scripts',
      icon: <Terminal size={18} color="var(--white)" />,
    },
    {
      name: 'Node.js',
      category: 'BACKEND_DB',
      catLabel: 'BACKEND RUNTIME',
      level: 85,
      descEs: 'Servicios REST, gestión de paquetes, pipelines de build y autenticación en servidores backend.',
      descEn: 'REST services, package orchestration, build pipelines, and server runtime management.',
      appliedIn: 'Full-stack tooling, API middleware & microservices',
      icon: <Code2 size={18} color="var(--white)" />,
    },
    {
      name: 'C++ & C#',
      category: 'BACKEND_DB',
      catLabel: 'SYSTEMS & DESKTOP',
      level: 82,
      descEs: 'Programación estructurada y orientada a objetos para software de alto rendimiento, microcontroladores y plugins de escritorio.',
      descEn: 'Structured and object-oriented programming for high-performance computing, microcontrollers, and desktop extensions.',
      appliedIn: 'Autodesk Revit Custom Extensions & Microcontroller firmware',
      icon: <Cpu size={18} color="var(--red)" />,
    },

    // Hardware & IoT
    {
      name: 'ESP32 & Arduino Mega 2560',
      category: 'HARDWARE_IOT',
      catLabel: 'EMBEDDED HARDWARE',
      level: 90,
      descEs: 'Microcontroladores con comunicación serial, I2C, SPI, GPIOs de precisión y control de sensores/actuadores físicos.',
      descEn: 'Microcontrollers with serial communication, I2C, SPI, high-precision GPIOs, and physical sensor/actuator orchestration.',
      appliedIn: 'TPH Monitor (Water Quality Station) & Hardware Prototyping',
      icon: <Cpu size={18} color="var(--red)" />,
    },
    {
      name: 'Bluetooth Low Energy (BLE)',
      category: 'HARDWARE_IOT',
      catLabel: 'WIRELESS PROTOCOL',
      level: 87,
      descEs: 'Conectividad inalámbrica de bajo consumo para streaming en tiempo real entre microcontroladores ESP32 y dispositivos móviles.',
      descEn: 'Low-power wireless telemetry for real-time data streaming between ESP32 microcontrollers and mobile applications.',
      appliedIn: 'TPH Monitor Mobile-to-Hardware Live Telemetry',
      icon: <Radio size={18} color="var(--white)" />,
    },
    {
      name: 'Sensores Industriales, RFID & LCD',
      category: 'HARDWARE_IOT',
      catLabel: 'SENSORS & PERIPHERALS',
      level: 88,
      descEs: 'Integración de sensores de calidad de agua, ultrasónicos, módulos RFID RC522, y pantallas LCD 1602 para interfaces físicas.',
      descEn: 'Integration of water quality probes, ultrasonic sensors, RC522 RFID readers, and 1602 LCD displays for physical interfaces.',
      appliedIn: 'TPH Monitor, Embedded Hardware Systems & Automation',
      icon: <Wrench size={18} color="var(--red)" />,
    },
    {
      name: 'Raspberry Pi & Linux SBC',
      category: 'HARDWARE_IOT',
      catLabel: 'SBC & EDGE COMPUTING',
      level: 84,
      descEs: 'Sistemas monoplaca Linux, servidores headless, interfaces de hardware y ejecución de tareas edge automatizadas.',
      descEn: 'Single-board Linux computing, headless servers, hardware interfacing, and automated edge task execution.',
      appliedIn: 'Edge computing nodes, server hosting & embedded prototyping',
      icon: <Box size={18} color="var(--white)" />,
    },

    // Specialized CAD & MCP
    {
      name: 'Autodesk Revit API & C#',
      category: 'CAD_MCP',
      catLabel: 'CAD EXTENSION',
      level: 86,
      descEs: 'Desarrollo de plugins y extensiones de escritorio en C# / .NET para automatización de flujos y lectura de modelos BIM.',
      descEn: 'Desktop plugin development in C# / .NET for workflow automation and parametric BIM model querying in Revit.',
      appliedIn: 'Autodesk Revit Conversational Assistant & BIM Automation Plugin',
      icon: <Sparkles size={18} color="var(--red)" />,
    },
    {
      name: 'Model Context Protocol (MCP) & IA',
      category: 'CAD_MCP',
      catLabel: 'AI AGENTIC PROTOCOL',
      level: 88,
      descEs: 'Conexión de modelos CAD/BIM e información estructural compleja a modelos de lenguaje (LLMs) mediante el protocolo estándar MCP.',
      descEn: 'Interfacing complex CAD/BIM architectural schemas to AI models using the Model Context Protocol (MCP) standard.',
      appliedIn: 'Revit AI Chatbot & Conversational Context Ingestion',
      icon: <Sparkles size={18} color="var(--white)" />,
    },

    // Tools & DevOps
    {
      name: 'Git, GitHub & Vercel',
      category: 'DEVOPS_TOOLS',
      catLabel: 'CI/CD & VERSIONING',
      level: 92,
      descEs: 'Control de versiones exhaustivo, flujos de ramas, integración continua y despliegue automatizado en entornos edge.',
      descEn: 'Comprehensive version control, git workflows, CI/CD pipelines, and automated edge cloud deployments.',
      appliedIn: 'KronoBook, Gazpacho\'s, AuraFit & All Repositories',
      icon: <Terminal size={18} color="var(--red)" />,
    },
    {
      name: 'Linux (Bash/Shell) & Windows',
      category: 'DEVOPS_TOOLS',
      catLabel: 'ENVIRONMENTS',
      level: 88,
      descEs: 'Entornos de desarrollo duales, administración de sistemas Unix/Linux, scripting en Bash y configuración de tooling en Windows.',
      descEn: 'Dual OS engineering, Unix/Linux systems administration, Bash scripting, and Windows desktop tooling.',
      appliedIn: 'Server deployment, firmware flashing & build tooling',
      icon: <Wrench size={18} color="var(--white)" />,
    },

    // Creative & Complementary
    {
      name: 'Diseño de Marca & Identidad',
      category: 'CREATIVE_CRAFT',
      catLabel: 'BRAND IDENTITY',
      level: 90,
      descEs: 'Creación de sistemas visuales, logotipos, activos vectoriales y materiales gráficos para comunidades y negocios.',
      descEn: 'Creation of visual systems, logos, vector assets, and marketing collateral for tech communities and commercial ventures.',
      appliedIn: 'Build Pa\'l Norte Hackathon Vol. 1 & DualFX Auto Detailing',
      icon: <Palette size={18} color="var(--red)" />,
    },
    {
      name: 'Impresión DTF, Sublimación & Vinil',
      category: 'CREATIVE_CRAFT',
      catLabel: 'FABRICATION & MERCH',
      level: 85,
      descEs: 'Producción física de mercancía personalizada, indumentaria técnica, corte de vinil y señalética de marca.',
      descEn: 'Physical fabrication of custom tech merchandise, apparel, vinyl plotting, and brand event assets.',
      appliedIn: 'Build Pa\'l Norte Merchandising & DualFX Commercial Assets',
      icon: <Palette size={18} color="var(--white)" />,
    },
  ]

  const tabs: { key: CategoryKey; labelEs: string; labelEn: string }[] = [
    { key: 'ALL', labelEs: 'TODOS', labelEn: 'ALL' },
    { key: 'FRONTEND_MOBILE', labelEs: 'FRONTEND & MÓVIL', labelEn: 'FRONTEND & MOBILE' },
    { key: 'BACKEND_DB', labelEs: 'BACKEND & BD', labelEn: 'BACKEND & DB' },
    { key: 'HARDWARE_IOT', labelEs: 'HARDWARE & IOT', labelEn: 'HARDWARE & IOT' },
    { key: 'CAD_MCP', labelEs: 'CAD & MCP (IA)', labelEn: 'CAD & MCP (AI)' },
    { key: 'DEVOPS_TOOLS', labelEs: 'TOOLS & CLOUD', labelEn: 'TOOLS & CLOUD' },
    { key: 'CREATIVE_CRAFT', labelEs: 'DISEÑO & CRAFT', labelEn: 'DESIGN & CRAFT' },
  ]

  const filteredSkills = activeTab === 'ALL' ? skills : skills.filter((s) => s.category === activeTab)

  const t = {
    es: {
      label: "04 // ARSENAL TECNOLÓGICO",
      title: "STACK TÉCNICO & HABILIDADES",
      sub: "Haz clic en cualquier módulo para inspeccionar su implementación en mis sistemas y proyectos.",
      appliedLabel: "APLICADO DIRECTAMENTE EN:",
      closeInspector: "[ CERRAR INSPECTOR ]",
    },
    en: {
      label: "04 // TECHNICAL ARSENAL",
      title: "TECH STACK & CAPABILITIES",
      sub: "Click on any module to inspect its real-world implementation across my systems and projects.",
      appliedLabel: "DIRECTLY APPLIED IN:",
      closeInspector: "[ CLOSE INSPECTOR ]",
    },
  }[lang]

  return (
    <section id="skills" className="section">
      <div className="container">
        <span className="section-label">{t.label}</span>
        <h2 className="display-title" style={{ fontSize: '2.5rem', marginBottom: '0.4rem' }}>
          {t.title}
        </h2>
        <p className="body-text" style={{ marginBottom: '1.8rem' }}>
          {t.sub}
        </p>

        {/* Category Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key)
                  setSelected(null)
                }}
                className={`mono-tag ${isActive ? 'mono-tag-red' : ''}`}
                style={{
                  cursor: 'pointer',
                  padding: '0.45rem 0.9rem',
                  fontSize: '0.72rem',
                  background: isActive ? 'var(--red-dim)' : 'rgba(255, 255, 255, 0.04)',
                  borderColor: isActive ? 'var(--red-border)' : 'rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.2s ease',
                }}
              >
                {lang === 'es' ? tab.labelEs : tab.labelEn}
              </button>
            )
          })}
        </div>

        {/* Skill Modules Bento Grid */}
        <motion.div layout className="bento-grid">
          <AnimatePresence>
            {filteredSkills.map((sk) => {
              const isSel = selected?.name === sk.name
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={sk.name}
                  onClick={() => setSelected(isSel ? null : sk)}
                  className={`bento-card col-span-4 ${isSel ? 'bento-card-active' : ''}`}
                  style={{
                    cursor: 'pointer',
                    justifyContent: 'space-between',
                    minHeight: '175px',
                    borderColor: isSel ? 'var(--red)' : undefined,
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                      <span className="mono-tag" style={{ fontSize: '0.62rem' }}>{sk.catLabel}</span>
                      <div>{sk.icon}</div>
                    </div>
                    <h3 className="card-title" style={{ fontSize: '1.15rem' }}>{sk.name}</h3>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--gray-400)', marginBottom: '0.3rem' }} className="ndot">
                      <span>DOMINIO_CORE</span>
                      <span style={{ color: isSel ? 'var(--red)' : 'var(--white)' }}>{sk.level}%</span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${sk.level}%`, background: isSel ? 'var(--red)' : 'var(--white)', transition: 'background 0.2s ease' }} />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Selected Module Detail Inspector */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="bento-card col-span-12 bento-card-active"
              style={{ marginTop: '1.5rem', padding: '2rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.6rem' }}>
                <div className="ndot" style={{ fontSize: '1.1rem', color: 'var(--white)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Activity size={18} color="var(--red)" />
                  MÓDULO SELECCIONADO: {selected.name}
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="mono-tag"
                  style={{ cursor: 'pointer', background: 'transparent' }}
                >
                  {t.closeInspector}
                </button>
              </div>

              <p className="body-text" style={{ color: 'var(--white)', marginBottom: '1.2rem', fontSize: '1rem' }}>
                {lang === 'es' ? selected.descEs : selected.descEn}
              </p>

              <div style={{ borderTop: '1px solid rgba(255, 0, 0, 0.25)', paddingTop: '0.9rem' }}>
                <span className="ndot" style={{ fontSize: '0.72rem', color: 'var(--red)', letterSpacing: '0.1em' }}>
                  {t.appliedLabel}
                </span>
                <div className="ndot" style={{ fontSize: '0.9rem', color: 'var(--gray-200)', marginTop: '0.3rem' }}>
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
