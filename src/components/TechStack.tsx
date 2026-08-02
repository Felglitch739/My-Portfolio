import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Terminal, Layers, Database, Code2, Sparkles, CheckCircle2 } from 'lucide-react'

interface TechStackProps {
  lang?: 'es' | 'en'
}

interface Skill {
  name: string
  category: 'languages' | 'frontend' | 'systems'
  desc: string
  level: string
  appliedIn: string
  color: string
  icon: React.ReactNode
}

export default function TechStack({ lang = 'es' }: TechStackProps) {
  const [selectedTech, setSelectedTech] = useState<Skill | null>(null)

  const skills: Skill[] = [
    {
      name: 'C++',
      category: 'systems',
      desc: 'Programación de sistemas de bajo nivel, rendimiento optimizado y lógica de microcontroladores.',
      level: 'Avanzado / Core',
      appliedIn: 'IEEEXtreme, IEEE Mining Mayhem Robotics & Embebed Systems',
      color: 'var(--violet)',
      icon: <Cpu size={22} />,
    },
    {
      name: 'Python',
      category: 'languages',
      desc: 'Automatización, backend, consumo de APIs meteorológicas y herramientas de IA.',
      level: 'Avanzado',
      appliedIn: 'Family Weather Alert Bot, Scripting & Algoritmos',
      color: 'var(--cyan)',
      icon: <Terminal size={22} />,
    },
    {
      name: 'React',
      category: 'frontend',
      desc: 'Construcción de interfaces interactivas, aplicaciones SPA y arquitectura de componentes.',
      level: 'Avanzado',
      appliedIn: 'KronoBook SaaS, Gazpacho\'s SPA & Portfolio',
      color: 'var(--cyan)',
      icon: <Code2 size={22} />,
    },
    {
      name: 'Vite',
      category: 'frontend',
      desc: 'Empaquetador y entorno de desarrollo frontend ultrarrápido con HMR.',
      level: 'Avanzado',
      appliedIn: 'KronoBook, Gazpacho\'s & Modern SPAs',
      color: 'var(--amber)',
      icon: <Sparkles size={22} />,
    },
    {
      name: 'Tailwind CSS',
      category: 'frontend',
      desc: 'Diseño responsive de alta velocidad, sistemas de tokens de diseño y UI moderna.',
      level: 'Avanzado',
      appliedIn: 'KronoBook SaaS, DualFX & Layouts',
      color: 'var(--pink)',
      icon: <Layers size={22} />,
    },
    {
      name: 'TypeScript',
      category: 'languages',
      desc: 'Desarrollo fuertemente tipado para prevenir errores en runtime y escalar proyectos.',
      level: 'Avanzado',
      appliedIn: 'AuraFit React Native Mobile App & Web SPAs',
      color: 'var(--violet)',
      icon: <Code2 size={22} />,
    },
    {
      name: 'SQL',
      category: 'systems',
      desc: 'Diseño de bases de datos relacionales, consultas complejas e integración con Supabase.',
      level: 'Intermedio-Avanzado',
      appliedIn: 'KronoBook SaaS Multi-Tenant Database Schema',
      color: 'var(--emerald)',
      icon: <Database size={22} />,
    },
  ]

  const t = {
    es: {
      tag: "TECH VAULT",
      title: "Stack Tecnológico Principal",
      subtitle: "Herramientas y lenguajes que utilizo para construir soluciones desde el hardware hasta la nube.",
      clickPrompt: "Haz clic en cualquier tecnología para inspeccionar su aplicación real en mis proyectos.",
      appliedLabel: "Aplicado en:",
    },
    en: {
      tag: "TECH VAULT",
      title: "Core Technical Stack",
      subtitle: "Tools and languages I use to build solutions from bare-metal hardware to the cloud.",
      clickPrompt: "Click on any technology to inspect its real-world application in my projects.",
      appliedLabel: "Applied in:",
    },
  }[lang]

  return (
    <section id="skills" className="section" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="tag tag-violet mono" style={{ marginBottom: '0.8rem' }}>
            <Cpu size={14} /> &nbsp; {t.tag}
          </span>
          <h2 className="section-title gradient-text">{t.title}</h2>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        {/* Tech Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1080px',
            margin: '0 auto 2.5rem',
          }}
        >
          {skills.map((skill, index) => {
            const isSelected = selectedTech?.name === skill.name
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                onClick={() => setSelectedTech(isSelected ? null : skill)}
                className="glass-card"
                style={{
                  padding: '1.6rem',
                  cursor: 'pointer',
                  borderColor: isSelected ? skill.color : undefined,
                  boxShadow: isSelected ? `0 0 25px ${skill.color}` : undefined,
                  transform: isSelected ? 'translateY(-4px)' : undefined,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: skill.color,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {skill.icon}
                  </div>
                  <span
                    className="mono"
                    style={{
                      fontSize: '0.72rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '100px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#94a3b8',
                    }}
                  >
                    {skill.level}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.4rem' }}>
                  {skill.name}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  {skill.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Selected Tech Detailed Card */}
        {selectedTech && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card"
            style={{
              padding: '2rem',
              maxWidth: '800px',
              margin: '0 auto',
              borderColor: selectedTech.color,
              background: 'rgba(8, 13, 26, 0.95)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: selectedTech.color }}>{selectedTech.icon}</div>
              <div>
                <h4 style={{ color: '#f8fafc', fontSize: '1.2rem', fontWeight: 700 }}>
                  {selectedTech.name} — Inspector de Aplicación
                </h4>
                <span style={{ fontSize: '0.82rem', color: selectedTech.color, fontFamily: 'monospace' }}>
                  {t.appliedLabel} {selectedTech.appliedIn}
                </span>
              </div>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {selectedTech.desc}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
