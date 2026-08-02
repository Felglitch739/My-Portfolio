import { motion } from 'framer-motion'
import { UserCircle, Cpu, Code2, Users, Sparkles, BookOpen } from 'lucide-react'

interface AboutMeProps {
  lang?: 'es' | 'en'
}

export default function AboutMe({ lang = 'es' }: AboutMeProps) {
  const t = {
    es: {
      tag: "PERFIL & FILOSOFÍA",
      title: "Construyendo Sistemas, \n No Solo Código",
      p1: (
        <>
          <strong style={{ color: '#f8fafc' }}>¡Hola! Soy Félix E. Martinez Flores,</strong> estudiante de Ciencias de la Computación (Computer Science) en <strong style={{ color: 'var(--cyan)' }}>UTRGV (University of Texas Rio Grande Valley)</strong>. Destaco en la intersección entre el software y el hardware, creando soluciones desde aplicaciones web impulsadas por Inteligencia Artificial hasta sistemas integrados autónomos (embedded systems).
        </>
      ),
      p2: (
        <>
          Para mí, <strong style={{ color: 'var(--violet)' }}>la programación es el arte de resolver rompecabezas lógicos complejos</strong>. No se trata solo de escribir sintaxis, sino de diseñar sistemas robustos y colaborativos. Trabajo constantemente en proyectos de alto impacto junto a mi círculo de desarrolladores y amigos.
        </>
      ),
      pillars: [
        {
          icon: <Code2 size={24} />,
          title: "Full-Stack Software",
          desc: "Desarrollo web y móvil con React, Vite, TypeScript, Tailwind CSS y Supabase.",
          color: "var(--cyan)",
        },
        {
          icon: <Cpu size={24} />,
          title: "Hardware Hacker",
          desc: "Sistemas embebidos y lógica de bajo nivel con C++, microcontroladores y robótica.",
          color: "var(--violet)",
        },
        {
          icon: <Users size={24} />,
          title: "Comunidad & Liderazgo",
          desc: "Cofundador y CMO de Build Pa'l Norte en Matamoros. Eventos y Hackathons de 24 horas.",
          color: "var(--emerald)",
        },
      ],
    },
    en: {
      tag: "PROFILE & PHILOSOPHY",
      title: "Building Systems, \n Not Just Code",
      p1: (
        <>
          <strong style={{ color: '#f8fafc' }}>Hi! I'm Félix E. Martinez Flores,</strong> a Computer Science student at <strong style={{ color: 'var(--cyan)' }}>UTRGV (University of Texas Rio Grande Valley)</strong>. I thrive at the intersection of software and hardware, building everything from AI-powered web applications to autonomous embedded systems.
        </>
      ),
      p2: (
        <>
          For me, <strong style={{ color: 'var(--violet)' }}>programming is the art of solving complex logical puzzles</strong>. It is not just writing syntax, but crafting robust, long-lasting systems. I constantly collaborate on high-impact projects alongside great friends and developers.
        </>
      ),
      pillars: [
        {
          icon: <Code2 size={24} />,
          title: "Full-Stack Software",
          desc: "Web & mobile engineering with React, Vite, TypeScript, Tailwind CSS, and Supabase.",
          color: "var(--cyan)",
        },
        {
          icon: <Cpu size={24} />,
          title: "Hardware Hacker",
          desc: "Embedded systems and low-level logic with C++, microcontrollers, and robotics.",
          color: "var(--violet)",
        },
        {
          icon: <Users size={24} />,
          title: "Community & Leadership",
          desc: "Co-founder & CMO of Build Pa'l Norte in Matamoros. Organizers of 24h Hackathons.",
          color: "var(--emerald)",
        },
      ],
    },
  }[lang]

  return (
    <section id="about-me" className="section" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card"
          style={{
            padding: 'clamp(2rem, 5vw, 4rem)',
            maxWidth: '1080px',
            margin: '0 auto',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }}>
            {/* Left Photo & Profile Summary Column */}
            <div className="sticky-desktop" style={{ flex: '1 1 300px' }}>
              <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <div
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    padding: '4px',
                    background: 'linear-gradient(135deg, var(--cyan), var(--violet), var(--pink))',
                    display: 'inline-block',
                    boxShadow: '0 0 35px var(--cyan-glow)',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      background: 'var(--bg-dark)',
                    }}
                  >
                    <img
                      src="/imagenmia.jpeg"
                      alt="Félix E. Martinez Flores"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '5px',
                      right: '5px',
                      background: '#10b981',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: '3px solid #080d1a',
                    }}
                    title="Active CS @ UTRGV"
                  />
                </div>
              </div>

              <span className="tag mono" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
                <UserCircle size={14} /> &nbsp; {t.tag}
              </span>

              <h2
                className="gradient-text"
                style={{
                  textAlign: 'left',
                  fontSize: 'clamp(2.2rem, 4.5vw, 3rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '1rem',
                  whiteSpace: 'pre-line',
                }}
              >
                {t.title}
              </h2>

              <div className="divider" style={{ margin: '0 0 1.2rem' }} />

              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
                UTRGV Computer Science Student • Matamoros / RGV Tech Advocate
              </p>
            </div>

            {/* Right Narrative & Pillars Column */}
            <div style={{ flex: '2 1 420px' }}>
              <div style={{ color: '#cbd5e1', fontSize: '1.08rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                <p style={{ marginBottom: '1.5rem' }}>{t.p1}</p>
                <p>{t.p2}</p>
              </div>

              {/* 3 Pillar Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
                {t.pillars.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '1rem',
                      padding: '1.4rem',
                      transition: 'transform 0.3s ease, border-color 0.3s ease',
                    }}
                  >
                    <div style={{ color: p.color, marginBottom: '0.8rem' }}>{p.icon}</div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                      {p.title}
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.5 }}>
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
