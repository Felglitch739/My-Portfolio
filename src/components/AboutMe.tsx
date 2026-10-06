import { Code2, Cpu, Bot } from 'lucide-react'
import Bento3DTilt from './Bento3DTilt'

interface AboutMeProps {
  lang?: 'es' | 'en'
}

export default function AboutMe({ lang = 'es' }: AboutMeProps) {
  const t = {
    es: {
      label: "03 // PERFIL & BIOGRAFÍA",
      title: "INGENIERÍA FULL-STACK, HARDWARE & CAD AUTOMATION",
      p1: (
        <>
          <strong style={{ color: 'var(--white)' }}>Soy Félix E. Martínez Flores,</strong> estudiante de Ciencias de la Computación (Computer Science) en <strong style={{ color: 'var(--red)' }}>UTRGV (University of Texas Rio Grande Valley)</strong> con raíces formativas en la <strong style={{ color: 'var(--white)' }}>Preparatoria RFM (Matamoros)</strong>. Me especializo en el desarrollo de software full-stack (web y móvil), arquitectura multi-tenant y la integración con hardware y sistemas embebidos.
        </>
      ),
      p2: (
        <>
          Mi experiencia técnica combina <strong style={{ color: 'var(--white)' }}>plataformas SaaS escalables en la nube</strong> (Supabase, PostgreSQL, RLS), <strong style={{ color: 'var(--white)' }}>aplicaciones móviles reactivas</strong> (React Native, Expo) comunicándose con microcontroladores y sensores vía Bluetooth LE, y <strong style={{ color: 'var(--white)' }}>extensiones de escritorio para Autodesk Revit</strong> integrando modelos CAD/BIM mediante Model Context Protocol (MCP) e inteligencia artificial.
        </>
      ),
      p3: (
        <>
          Fuera de la terminal, mantengo una disciplina constante: entrenamiento de fuerza (<strong style={{ color: 'var(--white)' }}>rutinas PPL</strong>), música y composición en <strong style={{ color: 'var(--white)' }}>guitarra acústica</strong>, y una dedicación constante al ecosistema tecnológico como founder y CPO, impulsando producto y comunidad en <strong style={{ color: 'var(--red)' }}>Build Pa'l Norte</strong>.
        </>
      ),
      pillars: [
        {
          icon: <Code2 size={20} color="var(--red)" />,
          title: "FULL-STACK & MULTI-TENANT",
          desc: "Sistemas web y arquitecturas multi-tenant con React, TypeScript, Tailwind CSS, Supabase y PostgreSQL con políticas RLS.",
        },
        {
          icon: <Cpu size={20} color="var(--white)" />,
          title: "MOBILE & HARDWARE IOT",
          desc: "Apps nativas con React Native y Expo conectadas a microcontroladores ESP32/Arduino, sensores industriales y conectividad BLE en tiempo real.",
        },
        {
          icon: <Bot size={20} color="var(--red)" />,
          title: "CAD EXTENSIONS & MCP",
          desc: "Desarrollo de plugins en C# / .NET para Autodesk Revit y orquestación de modelos CAD/BIM con IA mediante Model Context Protocol.",
        },
      ],
    },
    en: {
      label: "03 // PROFILE & BIOGRAPHY",
      title: "FULL-STACK ENGINEERING, HARDWARE & CAD AUTOMATION",
      p1: (
        <>
          <strong style={{ color: 'var(--white)' }}>I'm Félix E. Martínez Flores,</strong> a Computer Science student at <strong style={{ color: 'var(--red)' }}>UTRGV (University of Texas Rio Grande Valley)</strong> with educational roots at <strong style={{ color: 'var(--white)' }}>Preparatoria RFM (Matamoros)</strong>. I specialize in full-stack software engineering (web and mobile), multi-tenant cloud architecture, and hardware/embedded systems integration.
        </>
      ),
      p2: (
        <>
          My technical footprint encompasses <strong style={{ color: 'var(--white)' }}>scalable multi-tenant SaaS platforms</strong> (Supabase, PostgreSQL, RLS), <strong style={{ color: 'var(--white)' }}>reactive mobile applications</strong> (React Native, Expo) communicating with microcontrollers and sensors via Bluetooth LE, and <strong style={{ color: 'var(--white)' }}>desktop plugins for Autodesk Revit</strong> integrating CAD/BIM models with AI using the Model Context Protocol (MCP).
        </>
      ),
      p3: (
        <>
          Beyond the screen, I maintain continuous discipline: weight training (<strong style={{ color: 'var(--white)' }}>Push-Pull-Legs</strong>), acoustic <strong style={{ color: 'var(--white)' }}>guitar playing</strong>, and relentless commitment to the regional tech ecosystem as founder and CPO, building products and community at <strong style={{ color: 'var(--red)' }}>Build Pa'l Norte</strong>.
        </>
      ),
      pillars: [
        {
          icon: <Code2 size={20} color="var(--red)" />,
          title: "FULL-STACK & MULTI-TENANT",
          desc: "Web systems and multi-tenant architectures using React, TypeScript, Tailwind CSS, Supabase, and PostgreSQL with robust RLS.",
        },
        {
          icon: <Cpu size={20} color="var(--white)" />,
          title: "MOBILE & HARDWARE IOT",
          desc: "Native apps with React Native & Expo connected to ESP32/Arduino microcontrollers, industrial sensors, and real-time BLE connectivity.",
        },
        {
          icon: <Bot size={20} color="var(--red)" />,
          title: "CAD EXTENSIONS & MCP",
          desc: "Custom C# / .NET plugins for Autodesk Revit and AI-powered CAD/BIM orchestration using the Model Context Protocol (MCP).",
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
          <Bento3DTilt className="col-span-4" style={{ alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
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
              FÉLIX E. MARTÍNEZ FLORES
            </span>
            <span className="mono-tag mono-tag-red" style={{ marginTop: '0.4rem' }}>
              {lang === 'es' ? 'UTRGV CS // PREP RFM' : 'UTRGV CS // PREP RFM'}
            </span>
          </Bento3DTilt>

          {/* Narrative Widget (col-span-8) */}
          <Bento3DTilt className="col-span-8" style={{ justifyContent: 'center' }}>
            <h2 className="card-title" style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--white)' }}>
              {t.title}
            </h2>
            <p className="body-text" style={{ marginBottom: '1rem' }}>
              {t.p1}
            </p>
            <p className="body-text" style={{ marginBottom: '1rem' }}>
              {t.p2}
            </p>
            <p className="body-text">
              {t.p3}
            </p>
          </Bento3DTilt>

          {/* 3 Pillar Bento Widgets (col-span-4 each) */}
          {t.pillars.map((p, i) => (
            <Bento3DTilt key={i} className="col-span-4">
              <div style={{ marginBottom: '1rem' }}>{p.icon}</div>
              <h3 className="card-title" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                {p.title}
              </h3>
              <p className="body-text" style={{ fontSize: '0.88rem' }}>
                {p.desc}
              </p>
            </Bento3DTilt>
          ))}
        </div>
      </div>
    </section>
  )
}
