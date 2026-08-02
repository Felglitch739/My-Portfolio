import { Code2, Users } from 'lucide-react'

interface AboutMeProps {
  lang?: 'es' | 'en'
}

export default function AboutMe({ lang = 'es' }: AboutMeProps) {
  const t = {
    es: {
      label: "03 // PERFIL & ARQUITECTURA",
      title: "CONSTRUYENDO SISTEMAS, NO SOLO CÓDIGO",
      p1: (
        <>
          <strong style={{ color: 'var(--white)' }}>Soy Félix E. Martinez Flores,</strong> estudiante de Ciencias de la Computación (Computer Science) en <strong style={{ color: 'var(--red)' }}>UTRGV (University of Texas Rio Grande Valley)</strong>. Me especializo en el desarrollo de software full-stack, desde aplicaciones web impulsadas por IA hasta arquitecturas móviles modernas.
        </>
      ),
      p2: (
        <>
          Para mí, <strong style={{ color: 'var(--white)' }}>la programación es el arte de resolver rompecabezas lógicos complejos</strong>. Me apasiona diseñar arquitecturas robustas y escalables, colaborando constantemente con un equipo cercano de desarrolladores y amigos.
        </>
      ),
      pillars: [
        {
          icon: <Code2 size={20} color="var(--white)" />,
          title: "FULL-STACK SOFTWARE",
          desc: "Desarrollo web y móvil avanzado con React, Vite, TypeScript, Tailwind CSS y Supabase.",
        },
        {
          icon: <Code2 size={20} color="var(--red)" />,
          title: "MOBILE & WEB APPS",
          desc: "Desarrollo de aplicaciones nativas multiplataforma usando React Native y arquitecturas modernas cloud con Supabase.",
        },
        {
          icon: <Users size={20} color="var(--white)" />,
          title: "BUILD PA'L NORTE",
          desc: "Cofundador y CMO de esta comunidad tecnológica en Matamoros. Hackathons de 24h.",
        },
      ],
    },
    en: {
      label: "03 // PROFILE & ARCHITECTURE",
      title: "BUILDING SYSTEMS, NOT JUST CODE",
      p1: (
        <>
          <strong style={{ color: 'var(--white)' }}>I'm Félix E. Martinez Flores,</strong> a Computer Science student at <strong style={{ color: 'var(--red)' }}>UTRGV (University of Texas Rio Grande Valley)</strong>. I specialize in full-stack software development, from AI-powered web apps to modern mobile architectures.
        </>
      ),
      p2: (
        <>
          For me, <strong style={{ color: 'var(--white)' }}>programming is the art of solving complex logical puzzles</strong>. I am passionate about designing robust, long-lasting system architectures.
        </>
      ),
      pillars: [
        {
          icon: <Code2 size={20} color="var(--white)" />,
          title: "FULL-STACK SOFTWARE",
          desc: "Web & mobile engineering with React, Vite, TypeScript, Tailwind CSS, and Supabase.",
        },
        {
          icon: <Code2 size={20} color="var(--red)" />,
          title: "MOBILE & WEB APPS",
          desc: "Cross-platform native application development using React Native and modern cloud architectures with Supabase.",
        },
        {
          icon: <Users size={20} color="var(--white)" />,
          title: "BUILD PA'L NORTE",
          desc: "Co-founder & CMO of this tech community in Matamoros. Organizers of 24h Hackathons.",
        },
      ],
    },
  }[lang]

  return (
    <section id="about-me" className="section">
      <div className="container">
        <span className="section-label">{t.label}</span>

        <div className="bento-grid">
          {/* Photo Widget (col-span-4) */}
          <div className="bento-card col-span-4" style={{ alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
            <div
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--red)',
                boxShadow: '0 0 25px rgba(255, 0, 0, 0.3), 0 0 50px rgba(255, 0, 0, 0.1)',
                marginBottom: '1.2rem',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <img
                src="/imagenmia.jpeg"
                alt="Félix E. Martinez Flores"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
            <span className="ndot" style={{ fontSize: '1.05rem', color: 'var(--white)' }}>
              FÉLIX E. MARTINEZ
            </span>
            <span className="mono-tag mono-tag-red" style={{ marginTop: '0.4rem' }}>
              CS @ UTRGV
            </span>
          </div>

          {/* Narrative Widget (col-span-8) */}
          <div className="bento-card col-span-8" style={{ justifyContent: 'center' }}>
            <h2 className="card-title" style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--white)' }}>
              {t.title}
            </h2>
            <p className="body-text" style={{ marginBottom: '1rem' }}>
              {t.p1}
            </p>
            <p className="body-text">
              {t.p2}
            </p>
          </div>

          {/* 3 Pillar Bento Widgets (col-span-4 each) */}
          {t.pillars.map((p, i) => (
            <div key={i} className="bento-card col-span-4">
              <div style={{ marginBottom: '1rem' }}>{p.icon}</div>
              <h3 className="card-title" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                {p.title}
              </h3>
              <p className="body-text" style={{ fontSize: '0.88rem' }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
