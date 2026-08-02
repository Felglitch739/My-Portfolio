import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dumbbell, Music, Gamepad2, CircleDot, Play, Pause, Sparkles, RefreshCw, Trophy, Users } from 'lucide-react'

interface HumanSideProps {
  lang?: 'es' | 'en'
}

export default function HumanSide({ lang = 'es' }: HumanSideProps) {
  const [activeTab, setActiveTab] = useState<'fitness' | 'music' | 'gaming' | 'pool'>('fitness')

  // Music Player simulation state
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  const [activeSong, setActiveSong] = useState(0)

  const songs = [
    { title: 'Acoustic Progression #4 in Dm', duration: '2:45', tag: 'Guitar & Audio AI' },
    { title: 'Cyber-Billiards Ambient Lofi', duration: '3:12', tag: 'Acoustic + Synth' },
    { title: 'Matamoros Sunset Riff', duration: '1:58', tag: 'Acoustic Solo' },
  ]

  // Billiards interactive canvas ref & state
  const poolCanvasRef = useRef<HTMLCanvasElement>(null)
  const [cueAngle, setCueAngle] = useState(0)

  useEffect(() => {
    if (activeTab !== 'pool') return
    const canvas = poolCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const width = (canvas.width = Math.min(650, window.innerWidth - 60))
    const height = (canvas.height = 360)

    // Table parameters
    const pocketRadius = 18
    const pockets = [
      { x: 25, y: 25 },
      { x: width / 2, y: 20 },
      { x: width - 25, y: 25 },
      { x: 25, y: height - 25 },
      { x: width / 2, y: height - 20 },
      { x: width - 25, y: height - 25 },
    ]

    // Balls definition
    const balls = [
      { id: 0, x: width * 0.28, y: height * 0.5, vx: 0, vy: 0, color: '#ffffff', isCue: true }, // Cue ball
      { id: 1, x: width * 0.65, y: height * 0.5, vx: 0, vy: 0, color: '#fbbf24', num: 1 },
      { id: 2, x: width * 0.70, y: height * 0.44, vx: 0, vy: 0, color: '#38bdf8', num: 2 },
      { id: 3, x: width * 0.70, y: height * 0.56, vx: 0, vy: 0, color: '#f472b6', num: 3 },
      { id: 4, x: width * 0.75, y: height * 0.38, vx: 0, vy: 0, color: '#10b981', num: 4 },
      { id: 5, x: width * 0.75, y: height * 0.5, vx: 0, vy: 0, color: '#09090b', num: 8 }, // 8 ball
      { id: 6, x: width * 0.75, y: height * 0.62, vx: 0, vy: 0, color: '#a855f7', num: 6 },
    ]

    const radius = 12
    let isAiming = true

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      const cueBall = balls[0]
      const dx = clickX - cueBall.x
      const dy = clickY - cueBall.y
      const angle = Math.atan2(dy, dx)

      // Shoot cue ball!
      const power = 14
      cueBall.vx = Math.cos(angle) * power
      cueBall.vy = Math.sin(angle) * power
      isAiming = false
    }

    canvas.addEventListener('click', handleCanvasClick)

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw Pool Table Felt & Rails
      ctx.fillStyle = '#064e3b' // Emerald felt
      ctx.fillRect(0, 0, width, height)

      // Table Border Rail
      ctx.strokeStyle = '#78350f' // Wood border
      ctx.lineWidth = 14
      ctx.strokeRect(7, 7, width - 14, height - 14)

      ctx.strokeStyle = '#fbbf24'
      ctx.lineWidth = 2
      ctx.strokeRect(14, 14, width - 28, height - 28)

      // Pockets
      pockets.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, pocketRadius, 0, Math.PI * 2)
        ctx.fillStyle = '#09090b'
        ctx.fill()
        ctx.strokeStyle = '#451a03'
        ctx.lineWidth = 2
        ctx.stroke()
      })

      // Physics update
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i]
        b.x += b.vx
        b.y += b.vy

        // Friction
        b.vx *= 0.985
        b.vy *= 0.985

        if (Math.abs(b.vx) < 0.05) b.vx = 0
        if (Math.abs(b.vy) < 0.05) b.vy = 0

        // Rail Collisions
        const minX = 22, maxX = width - 22
        const minY = 22, maxY = height - 22

        if (b.x - radius < minX) { b.x = minX + radius; b.vx *= -0.9 }
        if (b.x + radius > maxX) { b.x = maxX - radius; b.vx *= -0.9 }
        if (b.y - radius < minY) { b.y = minY + radius; b.vy *= -0.9 }
        if (b.y + radius > maxY) { b.y = maxY - radius; b.vy *= -0.9 }

        // Ball vs Ball Collisions
        for (let j = i + 1; j < balls.length; j++) {
          const b2 = balls[j]
          const dx = b2.x - b.x
          const dy = b2.y - b.y
          const dist = Math.hypot(dx, dy)

          if (dist < radius * 2) {
            const angle = Math.atan2(dy, dx)
            const sin = Math.sin(angle)
            const cos = Math.cos(angle)

            // Overlap resolution
            const overlap = radius * 2 - dist
            b.x -= cos * (overlap / 2)
            b.y -= sin * (overlap / 2)
            b2.x += cos * (overlap / 2)
            b2.y += sin * (overlap / 2)

            // Velocity exchange
            const vx1 = b.vx * cos + b.vy * sin
            const vy1 = b.vy * cos - b.vx * sin
            const vx2 = b2.vx * cos + b2.vy * sin
            const vy2 = b2.vy * cos - b2.vx * sin

            b.vx = vx2 * cos - vy1 * sin
            b.vy = vy1 * cos + vx2 * sin
            b2.vx = vx1 * cos - vy2 * sin
            b2.vy = vy2 * cos + vx1 * sin
          }
        }
      }

      // Draw Aim Line if cue ball stopped
      const cueBall = balls[0]
      if (cueBall.vx === 0 && cueBall.vy === 0) {
        isAiming = true
        ctx.beginPath()
        ctx.arc(cueBall.x, cueBall.y, radius + 4, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw Balls
      balls.forEach((b) => {
        ctx.beginPath()
        ctx.arc(b.x, b.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = b.color
        ctx.fill()
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)'
        ctx.lineWidth = 1.5
        ctx.stroke()

        if (b.num) {
          ctx.fillStyle = b.num === 8 ? '#ffffff' : '#09090b'
          ctx.font = 'bold 9px monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(b.num.toString(), b.x, b.y)
        }
      })

      animationId = requestAnimationFrame(updateAndDraw)
    }

    updateAndDraw()

    return () => {
      canvas.removeEventListener('click', handleCanvasClick)
      cancelAnimationFrame(animationId)
    }
  }, [activeTab])

  const t = {
    es: {
      tag: "EL TOQUE HUMANO",
      title: "Filosofía, Hábitos & Personalidad",
      subtitle: "Construir sistemas requiere disciplina, equilibrio creativo y buena compañía. Aquí está mi lado más humano.",
      tabs: {
        fitness: "Fitness & Pesas",
        music: "Música & Audio AI",
        gaming: "Gaming & Modding",
        pool: "Billar con Amigos",
      },
      philosophyTitle: "La Programación como Arte Lógico",
      philosophyDesc: "Veo la programación como el arte de resolver rompecabezas lógicos complejos. No se trata solo de picar código, sino de diseñar arquitecturas elegantes que perduren.",
    },
    en: {
      tag: "THE HUMAN SIDE",
      title: "Philosophy, Habits & Personality",
      subtitle: "Building great systems requires discipline, creative balance, and awesome friends. Here is my personal side.",
      tabs: {
        fitness: "Fitness & Lifting",
        music: "Music & AI Audio",
        gaming: "Gaming & Modding",
        pool: "8-Ball Billiards",
      },
      philosophyTitle: "Programming as Logical Art",
      philosophyDesc: "I view programming as the art of solving complex logical puzzles. It is not just writing lines of code, but crafting elegant systems that last.",
    }
  }[lang]

  return (
    <section id="human-side" className="section" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="tag tag-pink mono" style={{ marginBottom: '0.8rem' }}>
            <Sparkles size={14} /> &nbsp; {t.tag}
          </span>
          <h2 className="section-title gradient-text">{t.title}</h2>
          <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto 1.5rem' }}>
            {t.subtitle}
          </p>

          {/* Philosophy Banner */}
          <div
            style={{
              maxWidth: '850px',
              margin: '0 auto 2.5rem',
              padding: '1.2rem 1.8rem',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.06), rgba(129, 140, 248, 0.06))',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '1rem',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '1.2rem',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(56, 189, 248, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--cyan)',
                flexShrink: 0,
              }}
            >
              <Sparkles size={24} />
            </div>
            <div>
              <h4 style={{ color: '#f8fafc', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                {t.philosophyTitle}
              </h4>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.5 }}>
                "{t.philosophyDesc}"
              </p>
            </div>
          </div>

          {/* Tabs Selector */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.5rem',
              background: 'rgba(15, 23, 42, 0.8)',
              padding: '0.4rem',
              borderRadius: '100px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {[
              { id: 'fitness', label: t.tabs.fitness, icon: <Dumbbell size={16} /> },
              { id: 'music', label: t.tabs.music, icon: <Music size={16} /> },
              { id: 'gaming', label: t.tabs.gaming, icon: <Gamepad2 size={16} /> },
              { id: 'pool', label: t.tabs.pool, icon: <CircleDot size={16} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.4rem',
                  borderRadius: '100px',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: activeTab === tab.id ? 'linear-gradient(135deg, var(--cyan-dim), var(--violet-dim))' : 'transparent',
                  color: activeTab === tab.id ? '#ffffff' : '#94a3b8',
                  boxShadow: activeTab === tab.id ? '0 4px 20px var(--cyan-glow)' : 'none',
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'fitness' && (
            <motion.div
              key="fitness"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card"
              style={{ padding: '2.5rem', maxWidth: '900px', margin: '0 auto' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                    <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: 'var(--cyan)' }}>
                      <Dumbbell size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Entrenamiento & Pesas</h3>
                  </div>
                  <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                    Mantengo una disciplina rigurosa de gimnasio con división de rutinas calculadas. El esfuerzo físico constante complementa perfectamente el enfoque mental que exige la ingeniería de software.
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="tag">Push-Pull-Legs (PPL)</span>
                    <span className="tag tag-violet">Upper-Lower Split</span>
                    <span className="tag tag-emerald">Constancia Diaria</span>
                  </div>
                </div>

                {/* Workout Routine Visualizer Card */}
                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <h4 style={{ color: '#f8fafc', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
                    <span>Estructura de Rutina</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--cyan)', fontFamily: 'monospace' }}>5-6 Días/Semana</span>
                  </h4>

                  {[
                    { day: 'Día 1 & 4', split: 'Push (Pecho, Hombro, Tríceps)', pct: 95, color: 'var(--cyan)' },
                    { day: 'Día 2 & 5', split: 'Pull (Espalda, Bíceps, Trapecios)', pct: 90, color: 'var(--violet)' },
                    { day: 'Día 3 & 6', split: 'Legs / Lower (Cuádriceps, Femorales)', pct: 88, color: 'var(--emerald)' },
                  ].map((item, idx) => (
                    <div key={idx} style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem', color: '#cbd5e1' }}>
                        <span>{item.day}: <strong>{item.split}</strong></span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: '3px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'music' && (
            <motion.div
              key="music"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card"
              style={{ padding: '2.5rem', maxWidth: '900px', margin: '0 auto' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                    <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(244, 114, 182, 0.15)', color: 'var(--pink)' }}>
                      <Music size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Guitarra & Generación Musical IA</h3>
                  </div>
                  <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                    Toco la guitarra y disfruto componer progresiones armónicas de letras e instrumentación acústica. Además, experimento fusionando composición tradicional con modelos de IA para generación y producción de audio.
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="tag tag-pink">Guitarra Acústica</span>
                    <span className="tag tag-violet">Progresiones de Letras</span>
                    <span className="tag tag-emerald">IA Musical</span>
                  </div>
                </div>

                {/* Audio Player Simulated Widget */}
                <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(244, 114, 182, 0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                    <button
                      onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--pink), var(--violet))',
                        border: 'none',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 0 20px rgba(244, 114, 182, 0.4)',
                      }}
                    >
                      {isPlayingMusic ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
                    </button>
                    <div>
                      <h4 style={{ color: '#f8fafc', fontSize: '0.95rem', fontWeight: 600 }}>
                        {songs[activeSong].title}
                      </h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--pink)', fontFamily: 'monospace' }}>
                        {songs[activeSong].tag} • {songs[activeSong].duration}
                      </span>
                    </div>
                  </div>

                  {/* Equalizer Visualizer simulation */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '32px', padding: '0 0.5rem' }}>
                    {[40, 75, 30, 90, 60, 100, 45, 80, 65, 35, 95, 50, 70, 40].map((h, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: isPlayingMusic ? `${(h * Math.random() + 20)}%` : '20%',
                          background: 'linear-gradient(to top, var(--violet), var(--pink))',
                          borderRadius: '2px',
                          transition: 'height 0.15s ease',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'gaming' && (
            <motion.div
              key="gaming"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card"
              style={{ padding: '2.5rem', maxWidth: '900px', margin: '0 auto' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                    <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--emerald)' }}>
                      <Gamepad2 size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Gaming & Modding Técnico</h3>
                  </div>
                  <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                    Mi interés en los videojuegos va más allá de jugar: me apasiona la optimización de rendimiento de motores, modding de servidores y tácticas en tiempo real en títulos como Rust y Minecraft.
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="tag tag-emerald">Rust Performance</span>
                    <span className="tag tag-violet">Minecraft Modding</span>
                    <span className="tag">Server Optimization</span>
                  </div>
                </div>

                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <h4 style={{ color: '#f8fafc', fontSize: '0.95rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={16} color="var(--emerald)" /> Enfoque en Optimización & Mods
                  </h4>
                  <ul style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7, paddingLeft: '1.2rem' }}>
                    <li>Configuración de Servidores Dedicados y Tuning de Java JVM / C++ engine limits.</li>
                    <li>Modding de mecánicas de juego y scripts de automatización.</li>
                    <li>Estrategias tácticas avanzadas de recursos y supervivencia en equipo.</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'pool' && (
            <motion.div
              key="pool"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card"
              style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(251, 191, 36, 0.15)', color: 'var(--amber)', padding: '0.3rem 0.8rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  <Users size={14} /> Eduardo, Wicho, Orlando & Félix
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f8fafc' }}>
                  Simulador de Billar / 8-Ball Physics
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', maxWidth: '550px', margin: '0.2rem auto 0' }}>
                  En mi tiempo libre me encanta ir a jugar billar a salas locales con mi grupo de amigos. ¡Haz clic en la mesa para apuntar y tirar la bola blanca!
                </p>
              </div>

              {/* Billiards Canvas Container */}
              <div style={{ display: 'flex', justifyContent: 'center', overflowX: 'auto', padding: '0.5rem 0' }}>
                <canvas
                  ref={poolCanvasRef}
                  style={{
                    borderRadius: '1rem',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                    cursor: 'crosshair',
                    maxWidth: '100%',
                  }}
                />
              </div>

              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
                💡 Tip: Haz clic en cualquier parte de la mesa para disparar la bola blanca en esa dirección.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
