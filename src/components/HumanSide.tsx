import { Dumbbell, Music, Gamepad2, Sparkles } from 'lucide-react'
import Bento3DTilt from './Bento3DTilt'
import PoolGame from './PoolGame'

interface HumanSideProps { lang?: 'es' | 'en' }

export default function HumanSide({ lang = 'es' }: HumanSideProps) {
  const t = {
    es: {
      label: "07 // DISCIPLINA & LABORATORIO",
      title: "FUERA DE LA PANTALLA & FÍSICA INTERACTIVA",
      intro: "La ingeniería no termina en el backend: se refleja en la disciplina física, la música y la pasión por construir modelos interactivos tangibles.",
      card1Title: "DISCIPLINA DE ENTRENAMIENTO",
      card1Desc: "Entrenamiento constante de fuerza enfocado en progresiones Push-Pull-Legs (PPL). Es una forma de mantenerme constante y de desconectarme un rato de la pantalla.",
      card2Title: "MÚSICA & GUITARRA ACÚSTICA",
      card2Desc: "Exploración de progresiones armónicas y composición en guitarra acústica. El balance creativo ideal entre lógica matemática y expresión sonora.",
      card3Title: "GAMING & TUNING DE SERVIDORES",
      card3Desc: "Optimización de servidores C++ y Java en Rust y Minecraft, configuración de redes locales y tácticas de juego colaborativas.",
      labTitle: "LABORATORIO DE FÍSICA 2D // SIMULADOR 8-BALL",
      labDesc: "Motor interactivo de física en tiempo real desarrollado con HTML5 Canvas y TypeScript. Modela vectores de colisión elástica, fricción continua, amortiguación contra bandas y detección de troneras.",
    },
    en: {
      label: "07 // DISCIPLINE & LAB",
      title: "BEYOND THE SCREEN & INTERACTIVE PHYSICS",
      intro: "Engineering extends beyond server backends: it manifests in physical discipline, music, and the drive to build tangible interactive simulations.",
      card1Title: "WEIGHTLIFTING DISCIPLINE",
      card1Desc: "Consistent strength training rooted in Push-Pull-Legs (PPL) splits. A way to stay consistent and take a break from the screen.",
      card2Title: "MUSIC & ACOUSTIC GUITAR",
      card2Desc: "Harmonic progressions and songwriting on acoustic guitar. The ideal creative balance connecting mathematical cadence and sonic expression.",
      card3Title: "GAMING & SERVER TUNING",
      card3Desc: "Optimization of C++ and JVM servers in Rust and Minecraft, local network tuning, and tactical team coordination.",
      labTitle: "2D PHYSICS LAB // 8-BALL SIMULATOR",
      labDesc: "Real-time interactive physics engine written in HTML5 Canvas and TypeScript. Models elastic collision vectors, continuous friction decay, rail dampening, and pocket capture mechanics.",
    },
  }[lang]

  return (
    <section id="human-side" className="section">
      <div className="container">
        <span className="section-label">{t.label}</span>
        <h2 className="display-title" style={{ fontSize: '2.5rem', marginBottom: '0.6rem' }}>
          {t.title}
        </h2>
        <p className="body-text" style={{ marginBottom: '2.5rem', maxWidth: '750px' }}>
          {t.intro}
        </p>

        <div className="bento-grid">
          {/* Card 1: Gym / PPL */}
          <Bento3DTilt className="col-span-4" style={{ justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="mono-tag mono-tag-red">DISCIPLINA // PPL</span>
                <Dumbbell size={18} color="var(--red)" />
              </div>
              <h3 className="card-title" style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>
                {t.card1Title}
              </h3>
              <p className="body-text" style={{ fontSize: '0.88rem' }}>
                {t.card1Desc}
              </p>
            </div>
          </Bento3DTilt>

          {/* Card 2: Acoustic Guitar */}
          <Bento3DTilt className="col-span-4" style={{ justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="mono-tag">CREATIVIDAD // SONIDO</span>
                <Music size={18} color="var(--white)" />
              </div>
              <h3 className="card-title" style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>
                {t.card2Title}
              </h3>
              <p className="body-text" style={{ fontSize: '0.88rem' }}>
                {t.card2Desc}
              </p>
            </div>
          </Bento3DTilt>

          {/* Card 3: Gaming & Modding */}
          <Bento3DTilt className="col-span-4" style={{ justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="mono-tag">TÁCTICA // JVM & C++</span>
                <Gamepad2 size={18} color="var(--white)" />
              </div>
              <h3 className="card-title" style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>
                {t.card3Title}
              </h3>
              <p className="body-text" style={{ fontSize: '0.88rem' }}>
                {t.card3Desc}
              </p>
            </div>
          </Bento3DTilt>

          {/* Card 4: Upgraded 8-Ball Physics Simulator Lab (col-span-12) */}
          <div
            className="bento-card col-span-12"
            style={{
              padding: '2rem',
              background: 'rgba(10, 10, 12, 0.85)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(255, 255, 255, 0.15)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.6rem' }}>
              <div>
                <div className="ndot" style={{ fontSize: '0.72rem', color: 'var(--red)', marginBottom: '0.2rem' }}>
                  EXPERIMENTO // SIMULACIÓN DE FÍSICA VECTORIAL
                </div>
                <h3 className="card-title" style={{ fontSize: '1.25rem' }}>
                  {t.labTitle}
                </h3>
              </div>
              <span className="mono-tag mono-tag-red">
                <Sparkles size={12} /> HTML5 CANVAS + TYPESCRIPT
              </span>
            </div>

            <p className="body-text" style={{ fontSize: '0.88rem', marginBottom: '1.5rem', color: 'var(--gray-300)' }}>
              {t.labDesc}
            </p>

            {/* Polished Simulator Canvas */}
            <PoolGame lang={lang} />
          </div>
        </div>
      </div>
    </section>
  )
}
