import { Trophy, Users, Zap, Briefcase, Award, HeartHandshake, ExternalLink, MapPin } from 'lucide-react'
import Bento3DTilt from './Bento3DTilt'

interface EventsProps {
  lang?: 'es' | 'en'
}

export default function Events({ lang = 'es' }: EventsProps) {
  const leadership = [
    {
      num: '01',
      title: "Build Pa'l Norte",
      roleEs: "Co-fundador & CMO (Chief Marketing Officer)",
      roleEn: "Co-founder & CMO (Chief Marketing Officer)",
      loc: "Matamoros, Tamaulipas",
      descEs: "Iniciativa comunitaria líder de tecnología en Matamoros. Co-organización del Build Pa'l Norte Hackathon Vol. 1 (evento presencial de 24 horas en Plaza 11-11, julio 2026). Dirección del sistema de diseño de marca, propuestas comerciales de patrocinio, operaciones técnicas y logística.",
      descEn: "Leading grassroots tech initiative in Matamoros. Co-organization of Build Pa'l Norte Hackathon Vol. 1 (24-hour on-site hackathon at Plaza 11-11, July 2026). Spearheading brand system design, sponsorship proposals, technical operations, and event logistics.",
      badge: "COMUNIDAD & HACKATHON",
      badgeEn: "COMMUNITY & HACKATHON",
      icon: <Users size={20} color="var(--red)" />,
      link: "https://linktr.ee/buildpalnorte",
      highlight: true,
    },
    {
      num: '02',
      title: "DualFX Mobile Detailing",
      roleEs: "Co-fundador & Lead Operativo",
      roleEn: "Co-founder & Operations Lead",
      loc: "Matamoros, Tamps.",
      descEs: "Negocio de auto detailing móvil en Matamoros. Implementación de operaciones en campo e integración integral de reservas en vivo y despacho digital mediante la plataforma SaaS KronoBook.",
      descEn: "Mobile auto detailing business in Matamoros. Field operations execution and end-to-end integration of digital booking dispatching powered by the KronoBook SaaS platform.",
      badge: "VENTURE & SAAS CASE STUDY",
      badgeEn: "VENTURE & SAAS CASE STUDY",
      icon: <Briefcase size={20} color="var(--white)" />,
      highlight: false,
    },
  ]

  const academic = [
    {
      num: '01',
      title: "IEEEXtreme Programming (18.0 & 19.0)",
      roleEs: "Competidor Global de Algoritmia (2024 & 2025)",
      roleEn: "Global Algorithmic Competitor (2024 & 2025)",
      loc: "Competencia Global IEEE",
      descEs: "Participación en las ediciones consecutivas 18.0 (2024) y 19.0 (2025). Reto ininterrumpido de 24 horas resolviendo algoritmos complejos, estructuras de datos avanzadas y optimización matemática.",
      descEn: "Consecutive participation in 18.0 (2024) and 19.0 (2025) editions. Uninterrupted 24-hour contest solving complex algorithmic challenges, advanced data structures, and mathematical optimization.",
      badge: "COMPETITIVE PROGRAMMING",
      badgeEn: "COMPETITIVE PROGRAMMING",
      icon: <Trophy size={20} color="var(--red)" />,
    },
    {
      num: '02',
      title: "FronteraHacks (24H Hackathon)",
      roleEs: "Hackathon Competitor & Creator",
      roleEn: "Hackathon Competitor & Creator",
      loc: "Edinburg, Texas",
      descEs: "Hackathon presencial intensivo de 24 horas continuas en Edinburg, Texas. Desarrollo y concepción original de la aplicación móvil con IA AuraFit.",
      descEn: "Intensive 24-hour on-site hackathon in Edinburg, Texas. Conception and prototype development of the AI-powered mobile app AuraFit.",
      badge: "HACKATHON",
      badgeEn: "HACKATHON",
      icon: <Award size={20} color="var(--white)" />,
    },
    {
      num: '03',
      title: "IEEE Student Branch",
      roleEs: "Miembro Activo del Capítulo Estudiantil",
      roleEn: "Active Student Chapter Member",
      loc: "UTRGV (University of Texas RGV)",
      descEs: "Participación continua en talleres técnicos de hardware, retos de algoritmia y robótica aplicada.",
      descEn: "Continuous involvement in technical hardware workshops, algorithm sprints, and applied robotics challenges.",
      badge: "IEEE CHAPTER",
      badgeEn: "IEEE CHAPTER",
      icon: <Zap size={20} color="var(--white)" />,
    },
    {
      num: '04',
      title: "ENIEP (Ediciones 2023 & 2024)",
      roleEs: "Representación Académica & Deportiva",
      roleEn: "Academic & Athletic Representation",
      loc: "Preparatoria RFM / Matamoros",
      descEs: "Representación académica institucional en el área de Biología y participación en la selección competitiva de voleibol a nivel preparatoria.",
      descEn: "Institutional academic representation in Biology science challenges and competitive volleyball team at high school level (RFM).",
      badge: "ACADEMICS & SPORTS",
      badgeEn: "ACADEMICS & SPORTS",
      icon: <Award size={20} color="var(--red)" />,
    },
    {
      num: '05',
      title: "Voluntariado Sombrero Fest 2025",
      roleEs: "Staff de Eventos & Logística",
      roleEn: "Event Staff & Logistics Volunteer",
      loc: "Brownsville, TX",
      descEs: "Apoyo logístico, gestión de flujo de personas y asistencia en operaciones durante el festival cultural binacional Sombrero Fest 2025.",
      descEn: "Logistical coordination, attendee flow management, and event operations assistance during the binational Sombrero Fest 2025.",
      badge: "VOLUNTEERING",
      badgeEn: "VOLUNTEERING",
      icon: <HeartHandshake size={20} color="var(--white)" />,
    },
  ]

  const t = {
    es: {
      label: "06 // IMPACTO, LIDERAZGO & COMPETENCIAS",
      title: "LIDERAZGO & TRAYECTORIA",
      sec1Title: "LIDERAZGO COMUNITARIO & EMPRENDIMIENTO",
      sec2Title: "COMPETENCIAS & PARTICIPACIÓN ACADÉMICA",
      liveSite: "SITIO OFICIAL ↗",
    },
    en: {
      label: "06 // IMPACT, LEADERSHIP & COMPETITIONS",
      title: "LEADERSHIP & TRACK RECORD",
      sec1Title: "COMMUNITY LEADERSHIP & VENTURES",
      sec2Title: "COMPETITIVE PROGRAMMING & ACADEMICS",
      liveSite: "OFFICIAL LINK ↗",
    },
  }[lang]

  return (
    <section id="events" className="section">
      <div className="container">
        <span className="section-label">{t.label}</span>
        <h2 className="display-title" style={{ fontSize: '2.5rem', marginBottom: '2.5rem' }}>
          {t.title}
        </h2>

        {/* Section 1: Community Leadership & Ventures */}
        <div style={{ marginBottom: '3rem' }}>
          <div className="ndot" style={{ fontSize: '0.85rem', color: 'var(--red)', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--red)' }} />
            {t.sec1Title}
          </div>

          <div className="bento-grid">
            {leadership.map((item) => (
              <Bento3DTilt
                key={item.num}
                className="col-span-6"
                style={{
                  justifyContent: 'space-between',
                  border: item.highlight ? '1px solid var(--red-border)' : undefined,
                  background: item.highlight ? 'rgba(255, 0, 0, 0.04)' : undefined,
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span className="ndot" style={{ fontSize: '1rem', color: 'var(--red)' }}>
                      LEAD_{item.num}
                    </span>
                    <span className={`mono-tag ${item.highlight ? 'mono-tag-red' : ''}`} style={{ fontSize: '0.62rem' }}>
                      {lang === 'es' ? item.badge : item.badgeEn}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    {item.icon}
                    <h3 className="card-title" style={{ fontSize: '1.3rem' }}>{item.title}</h3>
                  </div>

                  <div className="ndot" style={{ fontSize: '0.76rem', color: 'var(--red)', marginBottom: '0.4rem' }}>
                    {lang === 'es' ? item.roleEs : item.roleEn}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--gray-500)', marginBottom: '1rem' }}>
                    <MapPin size={13} /> {item.loc}
                  </div>

                  <p className="body-text" style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>
                    {lang === 'es' ? item.descEs : item.descEn}
                  </p>
                </div>

                {item.link && (
                  <div style={{ marginTop: '1.5rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mono-tag mono-tag-red"
                      style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
                    >
                      {t.liveSite}
                    </a>
                  </div>
                )}
              </Bento3DTilt>
            ))}
          </div>
        </div>

        {/* Section 2: Competitive Programming & Academic Involvement */}
        <div>
          <div className="ndot" style={{ fontSize: '0.85rem', color: 'var(--gray-300)', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--white)' }} />
            {t.sec2Title}
          </div>

          <div className="bento-grid">
            {academic.map((ac, idx) => {
              const isFirst = idx === 0
              return (
                <Bento3DTilt
                  key={ac.num}
                  className={isFirst ? 'col-span-12' : 'col-span-6'}
                  style={{ justifyContent: 'space-between' }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                      <span className="ndot" style={{ fontSize: '0.95rem', color: 'var(--red)' }}>
                        ACAD_{ac.num}
                      </span>
                      <span className="mono-tag" style={{ fontSize: '0.62rem' }}>
                        {lang === 'es' ? ac.badge : ac.badgeEn}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                      {ac.icon}
                      <h3 className="card-title" style={{ fontSize: isFirst ? '1.35rem' : '1.15rem' }}>
                        {ac.title}
                      </h3>
                    </div>

                    <div className="ndot" style={{ fontSize: '0.74rem', color: 'var(--red)', marginBottom: '0.4rem' }}>
                      {lang === 'es' ? ac.roleEs : ac.roleEn}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: 'var(--gray-500)', marginBottom: '0.8rem' }}>
                      <MapPin size={13} /> {ac.loc}
                    </div>

                    <p className="body-text" style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>
                      {lang === 'es' ? ac.descEs : ac.descEn}
                    </p>
                  </div>
                </Bento3DTilt>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
