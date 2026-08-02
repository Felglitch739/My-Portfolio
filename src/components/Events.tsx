import { motion } from 'framer-motion'
import { Trophy, Users, Cpu, Zap, MapPin } from 'lucide-react'

interface EventsProps {
  lang?: 'es' | 'en'
}

export default function Events({ lang = 'es' }: EventsProps) {
  const events = [
    {
      num: '01',
      title: "Build Pa'l Norte",
      role: "Cofundador & CMO (Chief Marketing Officer)",
      loc: "Matamoros, Tamaulipas",
      desc: "Comunidad tecnológica en Matamoros enfocada en empoderar desarrolladores locales. Evento insignia: Hackathon de 24 horas continuas.",
      badge: "COMMUNITY / HACKATHON",
      icon: <Users size={20} color="var(--red)" />,
    },
    {
      num: '02',
      title: "Comunidad Estudiantil IEEE",
      role: "Miembro Activo del Capítulo Estudiantil",
      loc: "UTRGV (University of Texas RGV)",
      desc: "Participación en talleres técnicos, redes de colaboración y representación universitaria en competencias de ingeniería.",
      badge: "IEEE CHAPTER",
      icon: <Zap size={20} color="var(--white)" />,
    },
    {
      num: '03',
      title: "IEEEXtreme Programming",
      role: "Competidor de Programación",
      loc: "Competencia Global IEEE",
      desc: "24 horas continuas de resolución intensiva de problemas de algoritmos, estructuras de datos y optimización.",
      badge: "COMPETITIVE PROG",
      icon: <Trophy size={20} color="var(--white)" />,
    },
    {
      num: '04',
      title: "IEEE Mining Mayhem Robotics",
      role: "Competidor de Robótica & Hardware",
      loc: "IEEE Robotics Challenge",
      desc: "Diseño, prototipado e integración de hardware para sistemas robóticos de minería autónoma.",
      badge: "HARDWARE & ROBOTICS",
      icon: <Cpu size={20} color="var(--red)" />,
    },
  ]

  const t = {
    es: {
      label: "06 // ACHIEVEMENTS & COMMUNITY",
      title: "COMUNIDAD & LOGROS",
    },
    en: {
      label: "06 // ACHIEVEMENTS & COMMUNITY",
      title: "COMMUNITY & ACHIEVEMENTS",
    },
  }[lang]

  return (
    <section id="events" className="section">
      <div className="container">
        <span className="section-label">{t.label}</span>
        <h2 className="display-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
          {t.title}
        </h2>

        <div className="bento-grid">
          {events.map((ev) => (
            <div key={ev.num} className="bento-card col-span-6" style={{ justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="ndot" style={{ fontSize: '1rem', color: 'var(--red)' }}>
                    LOG_{ev.num}
                  </span>
                  <span className="mono-tag">{ev.badge}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  {ev.icon}
                  <h3 className="card-title" style={{ fontSize: '1.25rem' }}>{ev.title}</h3>
                </div>

                <div className="ndot" style={{ fontSize: '0.75rem', color: 'var(--red)', marginBottom: '0.4rem' }}>
                  {ev.role}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--gray-500)', marginBottom: '1rem' }}>
                  <MapPin size={13} /> {ev.loc}
                </div>

                <p className="body-text" style={{ fontSize: '0.9rem' }}>
                  {ev.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
