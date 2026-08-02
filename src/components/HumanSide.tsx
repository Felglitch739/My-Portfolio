import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dumbbell, Music, Gamepad2, CircleDot } from 'lucide-react'

interface HumanSideProps {
  lang?: 'es' | 'en'
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

/* ── Billiards physics mini-game ── */
function BilliardsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = (canvas.width  = canvas.offsetWidth)
    const H = (canvas.height = canvas.offsetHeight)
    const R = 11
    const balls = [
      { x: W * 0.28, y: H * 0.5,  vx: 0, vy: 0, col: '#f5f5f5', num: 0 },
      { x: W * 0.64, y: H * 0.5,  vx: 0, vy: 0, col: '#f5f5f5', num: 1 },
      { x: W * 0.69, y: H * 0.44, vx: 0, vy: 0, col: '#888888', num: 2 },
      { x: W * 0.69, y: H * 0.56, vx: 0, vy: 0, col: '#555555', num: 3 },
      { x: W * 0.74, y: H * 0.38, vx: 0, vy: 0, col: '#aaaaaa', num: 4 },
      { x: W * 0.74, y: H * 0.5,  vx: 0, vy: 0, col: '#ff2d20', num: 8 }, // 8-ball = red
      { x: W * 0.74, y: H * 0.62, vx: 0, vy: 0, col: '#3a3a3a', num: 6 },
    ]

    const shoot = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const cx = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
      const cy = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY
      const mx = cx - rect.left, my = cy - rect.top
      const cue = balls[0]
      const dx = mx - cue.x, dy = my - cue.y
      const d  = Math.hypot(dx, dy)
      const power = 15
      cue.vx = (dx / d) * power
      cue.vy = (dy / d) * power
    }

    canvas.addEventListener('click', shoot)

    let raf: number
    const loop = () => {
      ctx.clearRect(0, 0, W, H)

      // Felt
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, W, H)

      // Rail
      ctx.strokeStyle = 'rgba(255,255,255,0.07)'
      ctx.lineWidth = 1
      ctx.strokeRect(18, 18, W - 36, H - 36)

      // Pockets
      const pockets = [
        { x: 18, y: 18 }, { x: W / 2, y: 15 }, { x: W - 18, y: 18 },
        { x: 18, y: H - 18 }, { x: W / 2, y: H - 15 }, { x: W - 18, y: H - 18 },
      ]
      pockets.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 14, 0, Math.PI * 2)
        ctx.fillStyle = '#000000'
        ctx.fill()
      })

      // Update + draw balls
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i]
        b.x += b.vx; b.y += b.vy
        b.vx *= 0.984; b.vy *= 0.984
        if (Math.abs(b.vx) < 0.04) b.vx = 0
        if (Math.abs(b.vy) < 0.04) b.vy = 0

        const mx = 22, Mx = W - 22, my2 = 22, My = H - 22
        if (b.x - R < mx) { b.x = mx + R; b.vx *= -0.88 }
        if (b.x + R > Mx) { b.x = Mx - R; b.vx *= -0.88 }
        if (b.y - R < my2) { b.y = my2 + R; b.vy *= -0.88 }
        if (b.y + R > My) { b.y = My - R; b.vy *= -0.88 }

        for (let j = i + 1; j < balls.length; j++) {
          const b2 = balls[j]
          const dx = b2.x - b.x, dy = b2.y - b.y, dist = Math.hypot(dx, dy)
          if (dist < R * 2) {
            const ang = Math.atan2(dy, dx), s = Math.sin(ang), c = Math.cos(ang)
            const ov = R * 2 - dist
            b.x -= c * (ov / 2); b.y -= s * (ov / 2)
            b2.x += c * (ov / 2); b2.y += s * (ov / 2)
            const v1x = b.vx * c + b.vy * s, v1y = b.vy * c - b.vx * s
            const v2x = b2.vx * c + b2.vy * s, v2y = b2.vy * c - b2.vx * s
            b.vx = v2x * c - v1y * s; b.vy = v1y * c + v2x * s
            b2.vx = v1x * c - v2y * s; b2.vy = v2y * c + v1x * s
          }
        }

        ctx.beginPath()
        ctx.arc(b.x, b.y, R, 0, Math.PI * 2)
        ctx.fillStyle = b.col
        ctx.fill()
        if (b.num !== 0) {
          ctx.fillStyle = b.num === 8 ? '#000' : 'rgba(255,255,255,0.5)'
          ctx.font = `bold 7px monospace`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(String(b.num), b.x, b.y)
        }
      }

      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(raf); canvas.removeEventListener('click', shoot) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '300px', display: 'block', cursor: 'crosshair' }}
    />
  )
}

export default function HumanSide({ lang = 'es' }: HumanSideProps) {
  const [tab, setTab] = useState<'fitness' | 'music' | 'gaming' | 'pool'>('fitness')

  const T = {
    es: {
      label: '06 — El Lado Humano',
      heading: 'No solo\ncódigo.',
      sub: 'La disciplina, la creatividad y la buena compañía también construyen ingenieros.',
      tabs: { fitness: 'Pesas & PPL', music: 'Guitarra & IA', gaming: 'Gaming', pool: 'Billar' },
    },
    en: {
      label: '06 — The Human Side',
      heading: 'Not just\ncode.',
      sub: 'Discipline, creativity, and good company also build engineers.',
      tabs: { fitness: 'Lifting & PPL', music: 'Guitar & AI', gaming: 'Gaming', pool: 'Billiards' },
    },
  }[lang]

  const tabDefs: { id: 'fitness' | 'music' | 'gaming' | 'pool'; icon: React.ReactNode; label: string }[] = [
    { id: 'fitness', icon: <Dumbbell size={14} />, label: T.tabs.fitness },
    { id: 'music',   icon: <Music size={14} />,    label: T.tabs.music   },
    { id: 'gaming',  icon: <Gamepad2 size={14} />, label: T.tabs.gaming  },
    { id: 'pool',    icon: <CircleDot size={14} />,label: T.tabs.pool    },
  ]

  const content = {
    fitness: {
      title: lang === 'es' ? 'Pesas & Rutina PPL' : 'Lifting & PPL Routine',
      body:   lang === 'es'
        ? 'Entrenamiento de pesas consistente siguiendo división Push-Pull-Legs y Upper-Lower. La misma disciplina que aplico al código: progresión planificada, sin días que se salten.'
        : 'Consistent weightlifting following Push-Pull-Legs and Upper-Lower splits. Same discipline I apply to code: planned progression, no missed days.',
      rows: [
        { day: lang === 'es' ? 'Día 1 & 4 — Push'  : 'Day 1 & 4 — Push',  sub: lang === 'es' ? 'Pecho, Hombro, Tríceps' : 'Chest, Shoulder, Triceps' },
        { day: lang === 'es' ? 'Día 2 & 5 — Pull'  : 'Day 2 & 5 — Pull',  sub: lang === 'es' ? 'Espalda, Bíceps, Trapecios' : 'Back, Biceps, Traps' },
        { day: lang === 'es' ? 'Día 3 & 6 — Legs'  : 'Day 3 & 6 — Legs',  sub: lang === 'es' ? 'Cuádriceps, Femorales, Gemelos' : 'Quads, Hamstrings, Calves' },
      ],
    },
    music: {
      title: lang === 'es' ? 'Guitarra & Generación Musical IA' : 'Guitar & AI Music Generation',
      body:   lang === 'es'
        ? 'Toco guitarra acústica y escribo progresiones armónicas de letras. Experimento fusionando composición tradicional con herramientas de IA para generar y producir audio nuevo.'
        : 'I play acoustic guitar and write harmonic chord progressions and lyrics. I experiment fusing traditional composition with AI tools for audio generation and music production.',
    },
    gaming: {
      title: lang === 'es' ? 'Gaming & Modding Técnico' : 'Technical Gaming & Modding',
      body:   lang === 'es'
        ? 'Mi interés en los videojuegos es técnico: optimización de motores, tuning de servidores Java/C++, modding y tácticas en Rust y Minecraft. Los juegos son sistemas complejos — me gusta entender qué hay detrás.'
        : "My gaming interest is technical: engine optimization, Java/C++ server tuning, modding, and tactics in Rust and Minecraft. Games are complex systems — I enjoy understanding what's underneath.",
    },
    pool: {
      title: lang === 'es' ? 'Billar con Eduardo, Wicho & Orlando' : 'Billiards with Eduardo, Wicho & Orlando',
      body:   lang === 'es'
        ? 'En el tiempo libre me gusta ir a jugar billar a salas locales con mi círculo de amigos. Aquí hay un simulador de física interactivo — haz clic en la mesa para disparar la bola blanca.'
        : 'In free time I enjoy playing 8-ball pool at local halls with my friend group. Here is an interactive physics simulator — click the table to aim and shoot the cue ball.',
    },
  }

  const c = content[tab]

  return (
    <section id="human-side" className="section">
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
            {/* Left — heading + tabs */}
            <motion.div variants={fadeUp}>
              <h2 className="display-lg" style={{ whiteSpace: 'pre-line', marginBottom: '1.5rem' }}>{T.heading}</h2>
              <p className="text-body" style={{ marginBottom: '3rem' }}>{T.sub}</p>

              {/* Tab selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {tabDefs.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    style={{
                      background: tab === t.id ? 'var(--gray-950)' : 'transparent',
                      border: 'none',
                      borderTop: i === 0 ? 'var(--border)' : 'none',
                      borderBottom: 'var(--border)',
                      borderLeft: tab === t.id ? '2px solid var(--red)' : '2px solid transparent',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.7rem',
                      cursor: 'pointer',
                      color: tab === t.id ? 'var(--white)' : 'var(--gray-600)',
                      fontFamily: 'var(--font-dot)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      textAlign: 'left',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span style={{ color: tab === t.id ? 'var(--red)' : 'var(--gray-700)' }}>{t.icon}</span>
                    {t.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right — content panel */}
            <motion.div variants={fadeUp}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="display-md" style={{ marginBottom: '1.5rem' }}>{c.title}</h3>
                  <p className="text-body" style={{ marginBottom: '2rem' }}>{c.body}</p>

                  {/* Fitness rows */}
                  {tab === 'fitness' && 'rows' in c && c.rows && (
                    <div>
                      {c.rows.map((row, i) => (
                        <div key={i} style={{
                          borderTop: i === 0 ? 'var(--border)' : 'none',
                          borderBottom: 'var(--border)',
                          padding: '0.85rem 0',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                          <span style={{ fontFamily: 'var(--font-dot)', fontSize: '0.72rem', color: 'var(--white)', letterSpacing: '0.05em' }}>{row.day}</span>
                          <span className="text-sm" style={{ textAlign: 'right' }}>{row.sub}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pool canvas */}
                  {tab === 'pool' && (
                    <div style={{ border: 'var(--border)', overflow: 'hidden' }}>
                      <div style={{
                        padding: '0.5rem 0.8rem',
                        borderBottom: 'var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: 'var(--font-dot)',
                        fontSize: '0.62rem',
                        letterSpacing: '0.12em',
                        color: 'var(--gray-600)',
                      }}>
                        <span className="rdot" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--red)' }} />
                        8-BALL PHYSICS — Click to aim & shoot
                      </div>
                      <BilliardsCanvas />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
