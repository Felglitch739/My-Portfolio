import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dumbbell, Music, Gamepad2, CircleDot, Volume2, Sparkles, Activity } from 'lucide-react'

interface HumanSideProps {
  lang?: 'es' | 'en'
}

/* ── Interactive Dot-Matrix Billiards Physics Canvas (Red & White Hardware LED display) ── */
function BilliardsHardwareCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const W = (canvas.width = canvas.offsetWidth || 600)
    const H = (canvas.height = 320)
    const R = 11

    const balls = [
      { id: 0, x: W * 0.25, y: H * 0.5, vx: 0, vy: 0, color: '#ffffff', num: 0 }, // Cue ball
      { id: 1, x: W * 0.65, y: H * 0.5, vx: 0, vy: 0, color: '#ffffff', num: 1 },
      { id: 2, x: W * 0.71, y: H * 0.43, vx: 0, vy: 0, color: '#888888', num: 2 },
      { id: 3, x: W * 0.71, y: H * 0.57, vx: 0, vy: 0, color: '#ffffff', num: 3 },
      { id: 4, x: W * 0.77, y: H * 0.36, vx: 0, vy: 0, color: '#888888', num: 4 },
      { id: 5, x: W * 0.77, y: H * 0.5, vx: 0, vy: 0, color: '#FF0000', num: 8 }, // Pure Red 8-ball
      { id: 6, x: W * 0.77, y: H * 0.64, vx: 0, vy: 0, color: '#888888', num: 6 },
    ]

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top
      const cueBall = balls[0]
      const dx = clickX - cueBall.x
      const dy = clickY - cueBall.y
      const angle = Math.atan2(dy, dx)
      const power = 15
      cueBall.vx = Math.cos(angle) * power
      cueBall.vy = Math.sin(angle) * power
    }

    canvas.addEventListener('click', handleCanvasClick)

    const render = () => {
      ctx.clearRect(0, 0, W, H)

      // Solid Deep Black Felt
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, W, H)

      // Engineering Dot Grid on Felt
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)'
      for (let x = 16; x < W; x += 16) {
        for (let y = 16; y < H; y += 16) {
          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Hardware Rail Border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.lineWidth = 2
      ctx.strokeRect(10, 10, W - 20, H - 20)

      // Hardware Pockets
      const pockets = [
        { x: 14, y: 14 }, { x: W / 2, y: 10 }, { x: W - 14, y: 14 },
        { x: 14, y: H - 14 }, { x: W / 2, y: H - 10 }, { x: W - 14, y: H - 14 },
      ]
      pockets.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 14, 0, Math.PI * 2)
        ctx.fillStyle = '#000000'
        ctx.fill()
        ctx.strokeStyle = '#FF0000'
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Ball Physics & Collisions
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i]
        b.x += b.vx
        b.y += b.vy
        b.vx *= 0.984
        b.vy *= 0.984

        if (Math.abs(b.vx) < 0.04) b.vx = 0
        if (Math.abs(b.vy) < 0.04) b.vy = 0

        const minX = 22, maxX = W - 22, minY = 22, maxY = H - 22
        if (b.x - R < minX) { b.x = minX + R; b.vx *= -0.88 }
        if (b.x + R > maxX) { b.x = maxX - R; b.vx *= -0.88 }
        if (b.y - R < minY) { b.y = minY + R; b.vy *= -0.88 }
        if (b.y + R > maxY) { b.y = maxY - R; b.vy *= -0.88 }

        for (let j = i + 1; j < balls.length; j++) {
          const b2 = balls[j]
          const dx = b2.x - b.x
          const dy = b2.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < R * 2) {
            const angle = Math.atan2(dy, dx)
            const sin = Math.sin(angle)
            const cos = Math.cos(angle)
            const overlap = R * 2 - dist
            b.x -= cos * (overlap / 2)
            b.y -= sin * (overlap / 2)
            b2.x += cos * (overlap / 2)
            b2.y += sin * (overlap / 2)
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

        // Draw LED Ball
        ctx.beginPath()
        ctx.arc(b.x, b.y, R, 0, Math.PI * 2)
        ctx.fillStyle = b.color
        ctx.fill()

        if (b.num) {
          ctx.fillStyle = b.num === 8 ? '#ffffff' : '#000000'
          ctx.font = 'bold 8px monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(b.num.toString(), b.x, b.y)
        }
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      canvas.removeEventListener('click', handleCanvasClick)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '300px', display: 'block', borderRadius: '12px' }}
    />
  )
}

/* ── NEW: Interactive Acoustic Fretboard Mod Widget ── */
function AcousticFretboardMod() {
  const [activeFret, setActiveFret] = useState<number | null>(null)
  const [activeChordIndex, setActiveChordIndex] = useState(0)

  const chords = [
    { name: 'Am7 (A minor 7th)', progression: 'Am7 → D9 → Fmaj7 → E7alt', lyric: 'Acoustic harmonics in D minor...' },
    { name: 'Cmaj7 (C major 7th)', progression: 'Cmaj7 → G/B → Am7 → Fadd9', lyric: 'Matamoros sunset acoustic progression' },
    { name: 'Em9 (E minor 9th)', progression: 'Em9 → Cmaj9 → B7b13 → Em', lyric: 'Acoustic AI instrumentation experiment' },
  ]

  const currentChord = chords[activeChordIndex]

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
        <div>
          <span className="ndot" style={{ fontSize: '1.1rem', color: 'var(--red)' }}>
            CHORD: {currentChord.name}
          </span>
          <div className="ndot" style={{ fontSize: '0.72rem', color: 'var(--gray-400)', marginTop: '0.2rem' }}>
            PROGRESIÓN: {currentChord.progression}
          </div>
        </div>

        <button
          onClick={() => setActiveChordIndex((activeChordIndex + 1) % chords.length)}
          className="mono-tag mono-tag-red"
          style={{ cursor: 'pointer' }}
        >
          [ CAMBIAR ACORDE ]
        </button>
      </div>

      {/* Fretboard Graphic Component */}
      <div
        style={{
          background: '#050505',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '12px',
          padding: '1.5rem',
          position: 'relative',
        }}
      >
        <div className="ndot" style={{ fontSize: '0.68rem', color: 'var(--gray-500)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <span>STRING_1 (E)</span>
          <span>STRING_2 (B)</span>
          <span>STRING_3 (G)</span>
          <span>STRING_4 (D)</span>
          <span>STRING_5 (A)</span>
          <span>STRING_6 (E)</span>
        </div>

        {/* 6 Interactive Strings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>
          {[1, 2, 3, 4, 5, 6].map((strNum) => {
            const isHovered = activeFret === strNum
            return (
              <div
                key={strNum}
                onMouseEnter={() => setActiveFret(strNum)}
                onMouseLeave={() => setActiveFret(null)}
                style={{
                  height: `${strNum * 0.8 + 1}px`,
                  background: isHovered ? 'var(--red)' : 'rgba(255, 255, 255, 0.35)',
                  boxShadow: isHovered ? '0 0 10px var(--red)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                }}
                className={isHovered ? 'vibrating-string' : ''}
              >
                {/* Fret Dots */}
                <div style={{ position: 'absolute', right: '10px', top: '-10px', fontFamily: 'monospace', fontSize: '10px', color: isHovered ? 'var(--red)' : 'var(--gray-600)' }}>
                  FRET_{strNum * 2}
                </div>
              </div>
            )
          })}
        </div>

        {/* Lyric Progression Display */}
        <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem' }}>
          <span className="ndot" style={{ fontSize: '0.72rem', color: 'var(--gray-400)' }}>LYRIC / HARMONIC CONCEPT:</span>
          <p className="body-text" style={{ color: 'var(--white)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            "{currentChord.lyric}"
          </p>
        </div>
      </div>
    </div>
  )
}

export default function HumanSide({ lang = 'es' }: HumanSideProps) {
  const [activeTab, setActiveTab] = useState<'fitness' | 'music' | 'gaming' | 'pool'>('music')

  const t = {
    es: {
      label: "07 // THE HUMAN ELEMENT",
      title: "HÁBITOS, MÚSICA & PERSONALIDAD",
      tabs: {
        music: "🎸 GUITARRA & IA",
        fitness: "🏋️‍♂️ PESAS & PPL",
        gaming: "🎮 GAMING & MODS",
        pool: "🎱 BILLAR DOT-MATRIX",
      },
    },
    en: {
      label: "07 // THE HUMAN ELEMENT",
      title: "HABITS, MUSIC & PERSONALITY",
      tabs: {
        music: "🎸 GUITAR & AI",
        fitness: "🏋️‍♂️ LIFTING & PPL",
        gaming: "🎮 GAMING & MODS",
        pool: "🎱 BILLAR DOT-MATRIX",
      },
    },
  }[lang]

  return (
    <section id="human-side" className="section">
      <div className="container">
        <span className="section-label">{t.label}</span>
        <h2 className="display-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
          {t.title}
        </h2>

        {/* Bento Tab Buttons Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {Object.entries(t.tabs).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`mono-tag ${activeTab === key ? 'mono-tag-red' : ''}`}
              style={{ cursor: 'pointer', padding: '0.5rem 1rem', fontSize: '0.78rem' }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Bento Display Widget */}
        <div className="bento-grid">
          <div className="bento-card col-span-12" style={{ padding: '2rem' }}>
            {activeTab === 'music' && <AcousticFretboardMod />}

            {activeTab === 'fitness' && (
              <div>
                <h3 className="card-title" style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>
                  ENTRENAMIENTO & PESAS (PPL / UPPER-LOWER)
                </h3>
                <p className="body-text" style={{ marginBottom: '1.5rem' }}>
                  Rutina de pesas constante. La misma disciplina mental requerida para resolver algoritmos complejos la aplico diariamente en el gimnasio.
                </p>
                <div className="bento-grid">
                  <div className="bento-card col-span-4" style={{ background: '#050505' }}>
                    <span className="ndot" style={{ color: 'var(--red)', fontSize: '0.8rem' }}>DÍA 1 & 4</span>
                    <h4 className="card-title" style={{ fontSize: '1rem', marginTop: '0.4rem' }}>PUSH</h4>
                    <p className="body-text" style={{ fontSize: '0.85rem' }}>Pecho, Hombro y Tríceps.</p>
                  </div>
                  <div className="bento-card col-span-4" style={{ background: '#050505' }}>
                    <span className="ndot" style={{ color: 'var(--white)', fontSize: '0.8rem' }}>DÍA 2 & 5</span>
                    <h4 className="card-title" style={{ fontSize: '1rem', marginTop: '0.4rem' }}>PULL</h4>
                    <p className="body-text" style={{ fontSize: '0.85rem' }}>Espalda, Bíceps y Trapecios.</p>
                  </div>
                  <div className="bento-card col-span-4" style={{ background: '#050505' }}>
                    <span className="ndot" style={{ color: 'var(--white)', fontSize: '0.8rem' }}>DÍA 3 & 6</span>
                    <h4 className="card-title" style={{ fontSize: '1rem', marginTop: '0.4rem' }}>LEGS</h4>
                    <p className="body-text" style={{ fontSize: '0.85rem' }}>Cuádriceps, Femorales y Pantorrillas.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gaming' && (
              <div>
                <h3 className="card-title" style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>
                  GAMING & MODDING TÉCNICO
                </h3>
                <p className="body-text" style={{ marginBottom: '1.2rem' }}>
                  Interés técnico en optimización de rendimiento de motores de videojuegos, tuning de servidores Java JVM y C++, y modding en títulos como Rust y Minecraft.
                </p>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <span className="mono-tag mono-tag-red">RUST SERVER TUNING</span>
                  <span className="mono-tag">MINECRAFT JVM MODDING</span>
                  <span className="mono-tag">PERFORMANCE BENCHMARKING</span>
                </div>
              </div>
            )}

            {activeTab === 'pool' && (
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <h3 className="card-title" style={{ fontSize: '1.3rem' }}>
                    SIMULADOR DE BILLAR / 8-BALL DOT-MATRIX (EDUARDO, WICHO, ORLANDO & FÉLIX)
                  </h3>
                  <p className="body-text" style={{ fontSize: '0.88rem' }}>
                    Haz clic en el área del tapete negro para apuntar y disparar la bola blanca.
                  </p>
                </div>
                <BilliardsHardwareCanvas />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
