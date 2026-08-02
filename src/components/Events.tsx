import { motion } from 'framer-motion'
import { Trophy, Users, Cpu, Award, Zap, Calendar, MapPin, Sparkles } from 'lucide-react'

interface EventsProps {
  lang?: 'es' | 'en'
}

export default function Events({ lang = 'es' }: EventsProps) {
  const events = [
    {
      id: 'build-pal-norte',
      title: "Build Pa'l Norte",
      role: "Cofundador & CMO (Chief Marketing Officer)",
      location: "Matamoros, Tamaulipas",
      desc: "Comunidad tecnológica creada para impulsar el talento local en Matamoros. Nuestro evento insignia es un Hackathon de 24 horas continuas para desarrolladores y creativos.",
      badge: "Comunidad & Hackathon 24h",
      icon: <Users size={24} />,
      color: "var(--cyan)",
    },
    {
      id: 'ieee-chapter',
      title: "Comunidad Estudiantil IEEE",
      role: "Miembro Activo del Capítulo Estudiantil",
      location: "UTRGV (University of Texas Rio Grande Valley)",
      desc: "Participación continua en eventos, talleres técnicos y redes de colaboración con ingenieros del capítulo IEEE.",
      badge: "IEEE Chapter",
      icon: <Zap size={24} />,
      color: "var(--violet)",
    },
    {
      id: 'ieeextreme',
      title: "IEEEXtreme Programming Competition",
      role: "Competidor de Programación",
      location: "Competencia Global IEEE",
      desc: "Resolución intensiva de problemas de algoritmos y optimización en tiempo real durante 24 horas continuas.",
      badge: "Competitive Programming",
      icon: <Trophy size={24} />,
      color: "var(--amber)",
    },
    {
      id: 'mining-mayhem',
      title: "IEEE Mining Mayhem Robotics",
      role: "Competidor de Robótica & Hardware",
      location: "IEEE Robotics Challenge",
      desc: "Diseño, prototipado e integración de hardware y sistemas robóticos para minería autónoma y remota.",
      badge: "Hardware & Robotics",
      icon: <Cpu size={24} />,
      color: "var(--emerald)",
    },
  ]

  const t = {
    es: {
      tag: "COMUNIDAD & LOGROS",
      title: "Liderazgo, Hackathons & Competencias",
      subtitle: "Construyendo comunidad tecnológica local y compitiendo a nivel internacional.",
    },
    en: {
      tag: "COMMUNITY & ACHIEVEMENTS",
      title: "Leadership, Hackathons & Competitions",
      subtitle: "Fostering local tech ecosystem and competing internationally.",
    },
  }[lang]

  return (
    <section id="events" className="section" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="tag tag-pink mono" style={{ marginBottom: '0.8rem' }}>
            <Trophy size={14} /> &nbsp; {t.tag}
          </span>
          <h2 className="section-title gradient-text">{t.title}</h2>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        {/* Events Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.8rem',
            maxWidth: '1080px',
            margin: '0 auto',
          }}
        >
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: event.color,
                  border: `1px solid ${event.color}`,
                  marginBottom: '1.2rem',
                  boxShadow: `0 0 20px rgba(0,0,0,0.3)`,
                }}
              >
                {event.icon}
              </div>

              <span
                className="mono"
                style={{
                  alignSelf: 'flex-start',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '100px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: event.color,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  marginBottom: '0.8rem',
                }}
              >
                {event.badge}
              </span>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.3rem' }}>
                {event.title}
              </h3>
              <h4 style={{ fontSize: '0.88rem', color: 'var(--cyan)', marginBottom: '0.6rem', fontWeight: 600 }}>
                {event.role}
              </h4>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.8rem',
                  color: '#64748b',
                  marginBottom: '1.2rem',
                }}
              >
                <MapPin size={13} />
                <span>{event.location}</span>
              </div>

              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
                {event.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
