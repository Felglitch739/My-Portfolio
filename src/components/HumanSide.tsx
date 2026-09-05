import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Activity, Dumbbell, Music, Gamepad2, Sparkles } from 'lucide-react'
import Bento3DTilt from './Bento3DTilt'

interface HumanSideProps {
  lang?: 'es' | 'en'
}

interface Ball {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  num: number
  active: boolean
  isCue?: boolean
  isEight?: boolean
}

/* ── High-Precision 2D Physics Simulator: Cyber 8-Ball Engine ── */
function BilliardsHardwareCanvas({ lang = 'es' }: { lang: 'es' | 'en' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pottedBalls, setPottedBalls] = useState<Ball[]>([])
  const [scratchMessage, setScratchMessage] = useState(false)
  const [powerPercent, setPowerPercent] = useState(0)
  const [engineStatus, setEngineStatus] = useState<string>(lang === 'es' ? 'LISTO // ARRASTRA LA BOLA BLANCA' : 'READY // DRAG CUE BALL TO AIM')

  const ballsRef = useRef<Ball[]>([])
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const dragCurrentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const R = 11 // Ball radius
  const FRICTION = 0.984
  const MIN_VELOCITY = 0.05

  const initRack = (W: number, H: number): Ball[] => {
    const startX = W * 0.65
    const startY = H * 0.5
    const spacing = R * 2 + 1.5

    const rackList: Ball[] = [
      // Cue Ball (0)
      { id: 0, x: W * 0.22, y: H * 0.5, vx: 0, vy: 0, color: '#FFFFFF', num: 0, active: true, isCue: true },
      // Row 1
      { id: 1, x: startX, y: startY, vx: 0, vy: 0, color: '#E4E4E7', num: 1, active: true },
      // Row 2
      { id: 2, x: startX + spacing * 0.86, y: startY - spacing * 0.5, vx: 0, vy: 0, color: '#71717A', num: 2, active: true },
      { id: 3, x: startX + spacing * 0.86, y: startY + spacing * 0.5, vx: 0, vy: 0, color: '#E4E4E7', num: 3, active: true },
      // Row 3
      { id: 4, x: startX + spacing * 1.72, y: startY - spacing, vx: 0, vy: 0, color: '#71717A', num: 4, active: true },
      { id: 8, x: startX + spacing * 1.72, y: startY, vx: 0, vy: 0, color: '#FF0000', num: 8, active: true, isEight: true }, // 8-Ball
      { id: 5, x: startX + spacing * 1.72, y: startY + spacing, vx: 0, vy: 0, color: '#E4E4E7', num: 5, active: true },
      // Row 4
      { id: 6, x: startX + spacing * 2.58, y: startY - spacing * 0.5, vx: 0, vy: 0, color: '#71717A', num: 6, active: true },
      { id: 7, x: startX + spacing * 2.58, y: startY + spacing * 0.5, vx: 0, vy: 0, color: '#E4E4E7', num: 7, active: true },
    ]

    return rackList
  }

  const resetGame = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const W = canvas.offsetWidth || 600
    const H = 260
    ballsRef.current = initRack(W, H)
    setPottedBalls([])
    setScratchMessage(false)
    setPowerPercent(0)
    setEngineStatus(lang === 'es' ? 'MESA REINICIADA // LISTO' : 'TABLE RE-RACKED // READY')
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const W = (canvas.width = canvas.offsetWidth || 600)
    const H = (canvas.height = 260)

    if (ballsRef.current.length === 0) {
      ballsRef.current = initRack(W, H)
    }

    // Pockets layout: 4 corners + 2 side centers
    const pocketR = 20
    const pockets = [
      { x: pocketR + 4, y: pocketR + 4 },
      { x: W * 0.5, y: pocketR + 2 },
      { x: W - pocketR - 4, y: pocketR + 4 },
      { x: pocketR + 4, y: H - pocketR - 4 },
      { x: W * 0.5, y: H - pocketR - 2 },
      { x: W - pocketR - 4, y: H - pocketR - 4 },
    ]

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      }
    }

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const pos = getPos(e)
      const cue = ballsRef.current.find((b) => b.isCue && b.active)
      if (!cue) return

      // Only allow shot if cue ball is settled
      const cueSpeed = Math.hypot(cue.vx, cue.vy)
      if (cueSpeed > 0.25) return

      const dist = Math.hypot(pos.x - cue.x, pos.y - cue.y)
      if (dist < R * 3.5) {
        isDraggingRef.current = true
        dragStartRef.current = { x: cue.x, y: cue.y }
        dragCurrentRef.current = pos
        setEngineStatus(lang === 'es' ? 'APUNTANDO // AJUSTA POTENCIA' : 'AIMING // SET POWER')
      }
    }

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return
      const pos = getPos(e)
      dragCurrentRef.current = pos

      const cue = ballsRef.current.find((b) => b.isCue && b.active)
      if (!cue) return

      const dx = cue.x - pos.x
      const dy = cue.y - pos.y
      const pullDist = Math.hypot(dx, dy)
      const powerRatio = Math.min(pullDist / 120, 1)
      setPowerPercent(Math.round(powerRatio * 100))
    }

    const onPointerUp = () => {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false

      const cue = ballsRef.current.find((b) => b.isCue && b.active)
      if (!cue) return

      const dx = cue.x - dragCurrentRef.current.x
      const dy = cue.y - dragCurrentRef.current.y
      const pullDist = Math.hypot(dx, dy)

      if (pullDist > 8) {
        const powerRatio = Math.min(pullDist / 120, 1)
        const maxVelocity = 18
        const angle = Math.atan2(dy, dx)

        cue.vx = Math.cos(angle) * (powerRatio * maxVelocity)
        cue.vy = Math.sin(angle) * (powerRatio * maxVelocity)
        setEngineStatus(lang === 'es' ? 'BOLA EN TRAYECTORIA...' : 'BALLS IN MOTION...')
      }
      setPowerPercent(0)
    }

    canvas.addEventListener('mousedown', onPointerDown)
    window.addEventListener('mousemove', onPointerMove)
    window.addEventListener('mouseup', onPointerUp)

    canvas.addEventListener('touchstart', onPointerDown, { passive: true })
    window.addEventListener('touchmove', onPointerMove, { passive: true })
    window.addEventListener('touchend', onPointerUp)

    // Main Physics & Render Loop
    const loop = () => {
      ctx.clearRect(0, 0, W, H)

      // 1. Draw Table Cushion Borders
      ctx.fillStyle = '#0a0a0c'
      ctx.fillRect(0, 0, W, H)

      // Subtle Grid / Coordinate Marks
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)'
      ctx.lineWidth = 1
      for (let x = 40; x < W; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
        ctx.stroke()
      }
      for (let y = 40; y < H; y += 40) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.stroke()
      }

      // Playing Field Boundary
      const pad = 12
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
      ctx.lineWidth = 1.5
      ctx.strokeRect(pad, pad, W - pad * 2, H - pad * 2)

      // 2. Draw Pockets
      pockets.forEach((p) => {
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(p.x, p.y, pocketR, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)'
        ctx.lineWidth = 1.5
        ctx.stroke()
      })

      // 3. Physics Updates
      const balls = ballsRef.current
      let movingCount = 0

      for (let i = 0; i < balls.length; i++) {
        const b = balls[i]
        if (!b.active) continue

        b.x += b.vx
        b.y += b.vy
        b.vx *= FRICTION
        b.vy *= FRICTION

        if (Math.hypot(b.vx, b.vy) < MIN_VELOCITY) {
          b.vx = 0
          b.vy = 0
        } else {
          movingCount++
        }

        // Cushion Bounces
        const minX = pad + R
        const maxX = W - pad - R
        const minY = pad + R
        const maxY = H - pad - R

        if (b.x < minX) {
          b.x = minX
          b.vx *= -0.85
        } else if (b.x > maxX) {
          b.x = maxX
          b.vx *= -0.85
        }

        if (b.y < minY) {
          b.y = minY
          b.vy *= -0.85
        } else if (b.y > maxY) {
          b.y = maxY
          b.vy *= -0.85
        }

        // Pocket Detection
        for (const p of pockets) {
          if (Math.hypot(b.x - p.x, b.y - p.y) < pocketR * 0.95) {
            b.active = false
            b.vx = 0
            b.vy = 0

            if (b.isCue) {
              setScratchMessage(true)
              setTimeout(() => {
                b.x = W * 0.22
                b.y = H * 0.5
                b.vx = 0
                b.vy = 0
                b.active = true
                setScratchMessage(false)
              }, 900)
            } else {
              setPottedBalls((prev) => [...prev, b])
            }
            break
          }
        }
      }

      // Ball-to-Ball Elastic Collisions
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const b1 = balls[i]
          const b2 = balls[j]
          if (!b1.active || !b2.active) continue

          const dx = b2.x - b1.x
          const dy = b2.y - b1.y
          const dist = Math.hypot(dx, dy)
          const minDist = R * 2

          if (dist < minDist && dist > 0) {
            const overlap = (minDist - dist) * 0.5
            const nx = dx / dist
            const ny = dy / dist

            b1.x -= nx * overlap
            b1.y -= ny * overlap
            b2.x += nx * overlap
            b2.y += ny * overlap

            // Velocity resolution
            const kx = b1.vx - b2.vx
            const ky = b1.vy - b2.vy
            const p = 2 * (nx * kx + ny * ky) / 2

            b1.vx -= p * nx * 0.96
            b1.vy -= p * ny * 0.96
            b2.vx += p * nx * 0.96
            b2.vy += p * ny * 0.96
          }
        }
      }

      // 4. Laser Aiming Line & Cue Stick Vector
      const cue = balls.find((b) => b.isCue && b.active)
      if (isDraggingRef.current && cue) {
        const pullX = dragCurrentRef.current.x
        const pullY = dragCurrentRef.current.y
        const dirX = cue.x - pullX
        const dirY = cue.y - pullY
        const pullDist = Math.hypot(dirX, dirY)

        if (pullDist > 5) {
          const aimAngle = Math.atan2(dirY, dirX)
          const laserLength = Math.min(pullDist * 4, 300)

          // Laser sight line
          ctx.beginPath()
          ctx.setLineDash([4, 4])
          ctx.strokeStyle = '#FF0000'
          ctx.lineWidth = 1.5
          ctx.moveTo(cue.x, cue.y)
          ctx.lineTo(cue.x + Math.cos(aimAngle) * laserLength, cue.y + Math.sin(aimAngle) * laserLength)
          ctx.stroke()
          ctx.setLineDash([])

          // Cue pull-back indicator
          ctx.beginPath()
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'
          ctx.lineWidth = 3
          ctx.moveTo(cue.x, cue.y)
          ctx.lineTo(pullX, pullY)
          ctx.stroke()
        }
      }

      // 5. Render Balls
      for (const b of balls) {
        if (!b.active) continue

        ctx.save()
        ctx.beginPath()
        ctx.arc(b.x, b.y, R, 0, Math.PI * 2)

        if (b.isCue) {
          ctx.fillStyle = '#FFFFFF'
          ctx.fill()
          ctx.lineWidth = 1.5
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
          ctx.stroke()
        } else if (b.isEight) {
          ctx.fillStyle = '#FF0000'
          ctx.fill()
          ctx.lineWidth = 2
          ctx.strokeStyle = '#FFFFFF'
          ctx.stroke()
        } else {
          ctx.fillStyle = b.color
          ctx.fill()
          ctx.lineWidth = 1
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)'
          ctx.stroke()
        }

        // Ball Number Text
        ctx.fillStyle = b.isCue ? '#000000' : '#FFFFFF'
        ctx.font = 'bold 8px Space Mono, monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        if (!b.isCue) {
          ctx.fillText(b.num.toString(), b.x, b.y)
        }
        ctx.restore()
      }

      if (movingCount === 0 && !isDraggingRef.current) {
        // Ready state
      }

      animationId = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      cancelAnimationFrame(animationId)
      canvas.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('mouseup', onPointerUp)
      canvas.removeEventListener('touchstart', onPointerDown)
      window.removeEventListener('touchmove', onPointerMove)
      window.removeEventListener('touchend', onPointerUp)
    }
  }, [lang])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      {/* Simulator HUD Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.8rem',
          padding: '0.75rem 1rem',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span className="ndot" style={{ fontSize: '0.7rem', color: 'var(--red)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Activity size={13} color="var(--red)" />
            {engineStatus}
          </span>
          {scratchMessage && (
            <span className="ndot" style={{ fontSize: '0.68rem', color: 'var(--red)', animation: 'pulse 1s infinite' }}>
              [ ¡FALTA! BOLA BLANCA REPOSICIONADA ]
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          {/* Power Gauge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="ndot" style={{ fontSize: '0.68rem', color: 'var(--gray-400)' }}>
              {lang === 'es' ? 'POTENCIA:' : 'POWER:'}
            </span>
            <div style={{ width: '80px', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${powerPercent}%`,
                  height: '100%',
                  background: powerPercent > 70 ? 'var(--red)' : '#ffffff',
                  transition: 'width 0.04s linear',
                }}
              />
            </div>
            <span className="ndot" style={{ fontSize: '0.68rem', color: 'var(--white)', minWidth: '32px' }}>
              {powerPercent}%
            </span>
          </div>

          {/* Potted count & Re-rack */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="ndot" style={{ fontSize: '0.68rem', color: 'var(--gray-400)' }}>
              {lang === 'es' ? 'EMBOCADAS:' : 'POCKETED:'} {pottedBalls.length}
            </span>
            <button
              onClick={resetGame}
              className="mono-tag mono-tag-red"
              style={{ cursor: 'pointer', fontSize: '0.65rem', padding: '0.3rem 0.6rem' }}
              title="Reiniciar mesa"
            >
              <RotateCcw size={11} /> RE-RACK
            </button>
          </div>
        </div>
      </div>

      {/* Billiards Canvas */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '260px',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.8)',
          touchAction: 'none',
        }}
      >
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', cursor: 'crosshair' }} />

        <div className="ndot" style={{ position: 'absolute', top: 12, left: 16, fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.6)', pointerEvents: 'none' }}>
          PHYSICS LAB // 2D COLLISION & VECTOR ENGINE
        </div>
        <div className="ndot" style={{ position: 'absolute', bottom: 12, right: 16, fontSize: '0.62rem', color: 'rgba(255, 255, 255, 0.45)', pointerEvents: 'none' }}>
          {lang === 'es' ? '[ ARRASTRA Y SUELTA DESDE LA BOLA BLANCA ]' : '[ DRAG & RELEASE CUE BALL TO STRIKE ]'}
        </div>
      </div>
    </div>
  )
}

export default function HumanSide({ lang = 'es' }: HumanSideProps) {
  const t = {
    es: {
      label: "07 // DISCIPLINA & LABORATORIO",
      title: "FUERA DE LA PANTALLA & FÍSICA INTERACTIVA",
      intro: "La ingeniería no termina en el backend: se refleja en la disciplina física, la música y la pasión por construir modelos interactivos tangibles.",
      card1Title: "DISCIPLINA DE ENTRENAMIENTO",
      card1Desc: "Entrenamiento constante de fuerza enfocado en progresiones Push-Pull-Legs (PPL). La misma disciplina que rige el rendimiento físico aplica a la arquitectura de software sin atajos.",
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
      card1Desc: "Consistent strength training rooted in Push-Pull-Legs (PPL) splits. The same dedication that governs physical output applies to robust, zero-compromise software engineering.",
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
            <BilliardsHardwareCanvas lang={lang} />
          </div>
        </div>
      </div>
    </section>
  )
}
