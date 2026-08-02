import { motion } from 'framer-motion'

interface EventsProps {
  lang?: 'es' | 'en'
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function Events({ lang = 'es' }: EventsProps) {
  const T = {
    es: {
      label:   '05 — Logros & Comunidad',
      heading: 'Fuera del\neditor.',
    },
    en: {
      label:   '05 — Achievements & Community',
      heading: 'Beyond the\neditor.',
    },
  }[lang]

  const items = [
    {
      id: 'build-pal-norte',
      num: 'A.01',
      title: "Build Pa'l Norte",
      role:  lang === 'es' ? 'Cofundador & CMO' : 'Co-Founder & CMO',
      loc:   'Matamoros, Tamaulipas',
      desc:  lang === 'es'
        ? "Comunidad tech construida para empoderar desarrolladores locales en el norte de México. Evento insignia: Hackathon de 24 horas continuas. Rol: estrategia, identidad y operación del evento."
        : "Tech community built to empower local developers in northern Mexico. Signature event: 24-hour continuous Hackathon. Role: strategy, identity, and event operations.",
      badge: 'COMMUNITY / EVENT',
    },
    {
      id: 'ieee-chapter',
      num: 'A.02',
      title: 'IEEE Student Chapter',
      role:  lang === 'es' ? 'Miembro Activo' : 'Active Member',
      loc:   'UTRGV',
      desc:  lang === 'es'
        ? 'Participación continua en el capítulo estudiantil IEEE de UTRGV. Talleres técnicos, redes de colaboración y representación universitaria en competencias de ingeniería.'
        : 'Active participation in the UTRGV IEEE Student Chapter. Technical workshops, collaboration networks, and university representation in engineering competitions.',
      badge: 'IEEE',
    },
    {
      id: 'ieeextreme',
      num: 'A.03',
      title: 'IEEEXtreme',
      role:  lang === 'es' ? 'Competidor de Programación' : 'Competitive Programmer',
      loc:   lang === 'es' ? 'Competencia Global' : 'Global Competition',
      desc:  lang === 'es'
        ? '24 horas de resolución intensiva de problemas de algoritmos y optimización. Competencia internacional organizada por IEEE.'
        : '24 continuous hours of algorithmic problem-solving and optimization. International competition organized by IEEE.',
      badge: 'COMPETITIVE PROGRAMMING',
    },
    {
      id: 'mining-mayhem',
      num: 'A.04',
      title: 'IEEE Mining Mayhem',
      role:  lang === 'es' ? 'Competidor de Robótica & Hardware' : 'Robotics & Hardware Competitor',
      loc:   lang === 'es' ? 'IEEE Robotics Challenge' : 'IEEE Robotics Challenge',
      desc:  lang === 'es'
        ? 'Diseño, prototipado e integración de hardware para sistemas robóticos de minería autónoma. Competencia de bajo nivel donde C++ y la lógica de circuitos definen el resultado.'
        : 'Design, prototyping, and hardware integration for autonomous mining robotic systems. Low-level competition where C++ and circuit logic define the outcome.',
      badge: 'HARDWARE / ROBOTICS',
    },
  ]

  return (
    <section id="events" className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
            <span className="sys-label">{T.label}</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--gray-800)' }} />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
            <motion.h2 variants={fadeUp} className="display-lg" style={{ whiteSpace: 'pre-line', position: 'sticky', top: 'calc(var(--nav-height) + 2rem)' }}>
              {T.heading}
            </motion.h2>

            <div>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  style={{
                    borderTop: 'var(--border)',
                    padding: '2rem 0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <span className="idx">{item.num}</span>
                    <span className="tag">{item.badge}</span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--white)', marginBottom: '0.2rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-dot)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--red)', marginBottom: '0.3rem' }}>
                    {item.role}
                  </p>
                  <p style={{ fontFamily: 'var(--font-dot)', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--gray-600)', marginBottom: '0.8rem' }}>
                    {item.loc}
                  </p>
                  <p className="text-body" style={{ fontSize: '0.92rem' }}>{item.desc}</p>
                </motion.div>
              ))}
              <div style={{ borderTop: 'var(--border)' }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
