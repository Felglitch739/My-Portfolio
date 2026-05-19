import { motion, type Variants } from 'framer-motion'
import { ExternalLink, Cpu, Globe, Bot, Trophy } from 'lucide-react'

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
  </svg>
)

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  tags: { label: string; color: string }[]
  link?: string
  linkLabel?: string
  github?: string
  badge?: string
  badgeColor?: string
  icon: React.ReactNode
  accent: string
}

const projects: Project[] = [
  {
    id: 'aurafit',
    title: 'AuraFit App',
    subtitle: 'Hackathon winner — FronteraHacks Edinburg',
    description:
      'AI-powered fitness tracking application built during FronteraHacks. Features body analysis, personalized workout plans, and real-time progress monitoring with an elegant mobile-first interface. Currently in development alongside Eduardo Lorenzo.',
    image: '/aurafit.png',
    tags: [
      { label: 'Hackathon', color: 'var(--amber)'   },
      { label: 'AI/ML',     color: 'var(--cyan)'    },
      { label: 'Mobile',    color: 'var(--violet)'  },
    ],
    link: 'https://aurafit.lrz.app',
    linkLabel: 'Live App',
    github: 'https://github.com/Felglitch739/AuraFit',
    badge: '🏆 FronteraHacks',
    badgeColor: 'var(--amber)',
    icon: <Cpu size={20} />,
    accent: 'var(--cyan)',
  },
  {
    id: 'gazpachos',
    title: "Gazpachos Landing Page",
    subtitle: 'Full-stack restaurant web app — Live on Vercel',
    description:
      'High-end glassmorphism Single Page Application for Gazpacho\'s restaurant. Features an interactive menu, location details, social media integration, and seamless online ordering experience built with React & Framer Motion.',
    image: "/Gazpacho's.png",
    tags: [
      { label: 'React',          color: 'var(--cyan)'    },
      { label: 'Framer Motion',  color: 'var(--violet)'  },
      { label: 'Glassmorphism',  color: 'var(--pink)'    },
    ],
    link: 'https://gazpachos-lp.vercel.app',
    linkLabel: 'Live Site',
    github: 'https://github.com/Felglitch739/gazpachos-lp',
    icon: <Globe size={20} />,
    accent: 'var(--violet)',
  },
  {
    id: 'familyweather',
    title: 'FamilyWeather Bot',
    subtitle: 'Telegram bot — Python / PythonAnywhere',
    description:
      'Automated Telegram bot that delivers personalized daily weather forecasts to family members. Built with Python and hosted on PythonAnywhere, it fetches real-time meteorological data and sends formatted reports on schedule.',
    image: '/familyweather.png',
    tags: [
      { label: 'Python',          color: 'var(--cyan)'    },
      { label: 'Telegram API',    color: 'var(--violet)'  },
      { label: 'PythonAnywhere',  color: 'var(--emerald)' },
    ],
    link: 'https://github.com/Felglitch739/Family_Weather',
    linkLabel: 'GitHub Repo',
    icon: <Bot size={20} />,
    accent: 'var(--emerald)',
  },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.65, ease: 'easeOut' },
  }),
}

export default function Projects() {
  return (
    <section id="projects" className="section" style={{ position: 'relative' }}>
      {/* Ambient background glow */}
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '400px', height: '400px', background: 'var(--cyan)', filter: 'blur(120px)', opacity: 0.1, pointerEvents: 'none', borderRadius: '50%', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '350px', height: '350px', background: 'var(--violet)', filter: 'blur(120px)', opacity: 0.1, pointerEvents: 'none', borderRadius: '50%', zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="tag mono" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <Trophy size={13} /> &nbsp; Projects
          </span>
          <h2 className="section-title gradient-text">What I've Built</h2>
          <div className="divider" style={{ marginTop: '0.75rem' }} />
          <p className="section-subtitle" style={{ marginTop: '1rem', marginBottom: 0 }}>
            A selection of projects — from hackathons to production apps.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {projects.map((proj, i) => (
            <motion.article
              key={proj.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="glass-card"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Image */}
              <div
                style={{
                  position: 'relative',
                  height: 200,
                  overflow: 'hidden',
                  borderRadius: 'var(--card-radius) var(--card-radius) 0 0',
                }}
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')
                  }
                />
                {/* Gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to top, var(--bg-dark) 0%, transparent 60%)`,
                  }}
                />
                {/* Accent icon */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    background: `${proj.accent}20`,
                    border: `1px solid ${proj.accent}50`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: proj.accent,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {proj.icon}
                </div>
                {/* Badge */}
                {proj.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      padding: '0.25rem 0.7rem',
                      borderRadius: '100px',
                      fontSize: '0.73rem',
                      fontWeight: 700,
                      color: proj.badgeColor,
                      background: `${proj.badgeColor}15`,
                      border: `1px solid ${proj.badgeColor}40`,
                      backdropFilter: 'blur(10px)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {proj.badge}
                  </div>
                )}
              </div>

              {/* Body */}
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.3rem',
                  }}
                >
                  {proj.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: proj.accent,
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '0.85rem',
                  }}
                >
                  {proj.subtitle}
                </p>
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.7,
                    flex: 1,
                    marginBottom: '1.25rem',
                  }}
                >
                  {proj.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {proj.tags.map((t) => (
                    <span
                      key={t.label}
                      style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '100px',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        fontFamily: 'var(--font-mono)',
                        color: t.color,
                        background: `${t.color}12`,
                        border: `1px solid ${t.color}35`,
                      }}
                    >
                      {t.label}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
                  {proj.link && (
                    <motion.a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <ExternalLink size={15} />
                      {proj.linkLabel ?? 'View Project'}
                    </motion.a>
                  )}
                  {proj.github && (
                    <motion.a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <GithubIcon size={15} />
                      Source Code
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
