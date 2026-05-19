import { motion } from 'framer-motion'
import { Zap, ArrowRight, Sparkles, Trophy, Cpu, Code2, Rocket } from 'lucide-react'

interface TimelineItem {
  id: string
  year: string
  title: string
  description?: string
  items?: { name: string; desc?: string }[]
  status?: string
  color: string
  icon: any
}

const timelineData: TimelineItem[] = [
  {
    id: '2018',
    year: '2018',
    title: 'State Robotics Champion & National Finalist',
    description: '1st Place at Punto México Conectado (Matamoros) and 5th Place Nationally. Developed competitive robotics solutions using Lego Mindstorms EV3.',
    color: 'var(--cyan)',
    icon: Trophy
  },
  {
    id: '2020',
    year: '2020',
    title: 'Embedded Development Course',
    description: 'Completed intensive certification on Arduino architecture and microcontroller programming.',
    color: 'var(--violet)',
    icon: Cpu
  },
  {
    id: '2024',
    year: '2024',
    title: 'IEEEXtreme 18.0',
    description: 'Participated in the IEEE 24-hour global programming competition.',
    color: 'var(--emerald)',
    icon: Code2
  },
  {
    id: '2025',
    year: '2025',
    title: 'IEEEXtreme 19.0',
    description: 'Participation and representation in the annual IEEE global competition.',
    color: 'var(--pink)',
    icon: Code2
  },
  {
    id: '2026',
    year: '2026',
    title: 'Key Projects & Competitions',
    items: [
      { name: 'RobotMayhem (IEEE)', desc: 'Robotics systems design and competition' },
      { name: 'Gazpachos Landing Page', desc: 'The base project we are currently using' },
      { name: 'AuraFit App', desc: 'FronteraHacks project' }
    ],
    color: 'var(--cyan)',
    icon: Rocket
  },
  {
    id: 'upcoming',
    year: 'Upcoming',
    title: "Build Pa'l Norte Hackathon",
    description: 'Cross-border hackathon focused on bilingual and binational tech solutions.',
    status: 'In Development / Upcoming',
    color: 'var(--amber)',
    icon: Rocket
  }
]

export default function Events() {
  return (
    <section id="events" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: 860 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '5rem', paddingLeft: '2rem' }}
        >
          <span className="tag mono" style={{ marginBottom: '1.5rem', display: 'inline-flex', background: 'transparent', border: 'none', color: 'var(--text-secondary)', padding: 0 }}>
            <Zap size={14} style={{ color: 'var(--cyan)', marginRight: 8 }} /> Timeline
          </span>
          <h2 className="section-title gradient-text" style={{ textAlign: 'left', margin: 0 }}>Experience & Achievements</h2>
        </motion.div>

        {/* Timeline Container */}
        <div style={{ position: 'relative', paddingLeft: '2.5rem', marginLeft: '1rem' }}>
          {/* Main vertical line */}
          <div
            style={{
              position: 'absolute',
              top: '8px',
              bottom: 0,
              left: '5px',
              width: '1px',
              background: 'linear-gradient(to bottom, var(--cyan), var(--violet), transparent)',
              opacity: 0.4,
            }}
          />

          {timelineData.map((item, i) => {
            const isUpcoming = item.id === 'upcoming'
            return (
              <motion.div
                key={item.id}
                initial="rest"
                whileHover="hover"
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                style={{
                  position: 'relative',
                  marginBottom: i === timelineData.length - 1 ? 0 : '4.5rem',
                  opacity: 0,
                  x: -30,
                  transformOrigin: 'left',
                }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              >
                {/* Node Dot */}
                <motion.div
                  variants={{
                    rest: { scale: 1, opacity: 0.8 },
                    hover: { scale: 1.15, opacity: 1 }
                  }}
                  style={{
                    position: 'absolute',
                    left: '-2.5rem',
                    top: '0rem',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--bg-deep)',
                    border: `1px solid ${item.color}50`,
                    boxShadow: isUpcoming ? 'none' : `0 0 15px ${item.color}40`,
                    zIndex: 2,
                    marginLeft: '5px',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                   {isUpcoming && (
                     <div style={{
                       position: 'absolute', inset: -4, borderRadius: '50%', border: `1px dashed ${item.color}`, animation: 'spin 4s linear infinite'
                     }} />
                   )}
                   <item.icon size={14} style={{ color: item.color }} />
                </motion.div>

                {/* Content Container */}
                <motion.div
                  variants={{
                    rest: { x: 0 },
                    hover: { x: 10 }
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ paddingRight: '1rem', cursor: 'default' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.6rem' }}>
                    <span
                      className="mono"
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: item.color,
                        letterSpacing: '0.05em'
                      }}
                    >
                      {item.year}
                    </span>
                    {item.status && (
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '100px',
                          background: `${item.color}15`,
                          color: item.color,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          border: `1px solid ${item.color}30`
                        }}
                      >
                        <Sparkles size={11} /> {item.status}
                      </span>
                    )}
                  </div>

                  <motion.h3
                    variants={{
                      rest: { color: 'var(--text-primary)' },
                      hover: { color: item.color }
                    }}
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      marginBottom: '0.75rem',
                      letterSpacing: '-0.02em',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {item.title}
                  </motion.h3>

                  {item.description && (
                    <p style={{
                      color: isUpcoming ? 'var(--text-muted)' : 'var(--text-secondary)',
                      fontSize: '0.95rem',
                      lineHeight: 1.65,
                      maxWidth: '680px',
                      opacity: isUpcoming ? 0.8 : 1
                    }}>
                      {item.description}
                    </p>
                  )}

                  {item.items && (
                    <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {item.items.map((sub, idx) => (
                        <motion.div 
                          key={idx} 
                          variants={{
                            rest: { x: 0, opacity: 0.85 },
                            hover: { x: 6, opacity: 1 }
                          }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}
                        >
                          <ArrowRight size={15} style={{ color: item.color, marginTop: '3px', opacity: 0.8 }} />
                          <div>
                            <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem', display: 'block' }}>
                              {sub.name}
                            </span>
                            {sub.desc && (
                              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginTop: '0.2rem' }}>
                                {sub.desc}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>

              </motion.div>
            )
          })}
        </div>
      </div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </section>
  )
}
