import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'

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
}

/* ── Interactive Hardware Billiards Simulator with Pocketing & Power Meter ── */
function BilliardsHardwareCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pottedCount, setPottedCount] = useState(0)
  const [scratchMessage, setScratchMessage] = useState(false)
  const [powerPercent, setPowerPercent] = useState(0)

  // References for mutable state in physics loop
  const ballsRef = useRef<Ball[]>([])
  const isDraggingRef = useRef(false)
  const dragPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const initBalls = (W: number, H: number) => {
    return [
      { id: 0, x: W * 0.25, y: H * 0.5, vx: 0, vy: 0, color: '#ffffff', num: 0, active: true }, // Cue ball
      { id: 1, x: W * 0.62, y: H * 0.5, vx: 0, vy: 0, color: '#ffffff', num: 1, active: true },
      { id: 2, x: W * 0.68, y: H * 0.43, vx: 0, vy: 0, color: '#888888', num: 2, active: true },
      { id: 3, x: W * 0.68, y: H * 0.57, vx: 0, vy: 0, color: '#ffffff', num: 3, active: true },
      { id: 4, x: W * 0.74, y: H * 0.36, vx: 0, vy: 0, color: '#888888', num: 4, active: true },
      { id: 5, x: W * 0.74, y: H * 0.5, vx: 0, vy: 0, color: '#FF0000', num: 8, active: true },  // Pure Red 8-ball
      { id: 6, x: W * 0.74, y: H * 0.64, vx: 0, vy: 0, color: '#888888', num: 6, active: true },
    ]
  }

  const resetGame = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const W = canvas.offsetWidth || 500
    const H = canvas.offsetHeight || 260
    ballsRef.current = initBalls(W, H)
    setPottedCount(0)
    setScratchMessage(false)
    setPowerPercent(0)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let W = (canvas.width = canvas.offsetWidth || 500)
    let H = (canvas.height = 260)
    const R = 10

    if (ballsRef.current.length === 0) {
      ballsRef.current = initBalls(W, H)
    }

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top

      const cueBall = ballsRef.current.find(b => b.num === 0 && b.active)
      if (!cueBall) return

      // Allow dragging if cue ball is mostly stopped
      const isMoving = Math.hypot(cueBall.vx, cueBall.vy) > 0.15
      if (isMoving) return

      isDraggingRef.current = true
      dragPosRef.current = { x: mx, y: my }
      mousePosRef.current = { x: mx, y: my }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      mousePosRef.current = { x: mx, y: my }

      if (isDraggingRef.current) {
        const cueBall = ballsRef.current.find(b => b.num === 0 && b.active)
        if (!cueBall) return
        const dx = cueBall.x - mx
        const dy = cueBall.y - my
        const dist = Math.hypot(dx, dy)
        const powerRatio = Math.min(dist / 100, 1)
        setPowerPercent(Math.round(powerRatio * 100))
      }
    }

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false

      const cueBall = ballsRef.current.find(b => b.num === 0 && b.active)
      if (!cueBall) return

      const mx = mousePosRef.current.x
      const my = mousePosRef.current.y
      const dx = cueBall.x - mx
      const dy = cueBall.y - my
      const dist = Math.hypot(dx, dy)

      if (dist > 5) {
        const powerRatio = Math.min(dist / 100, 1)
        const maxSpeed = 18
        const speed = powerRatio * maxSpeed
        const angle = Math.atan2(dy, dx)

        cueBall.vx = Math.cos(angle) * speed
        cueBall.vy = Math.sin(angle) * speed
      }
      setPowerPercent(0)
    }

    const handleResize = () => {
      if (!canvas) return
      W = canvas.width = canvas.offsetWidth || 500
      H = canvas.height = 260
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('resize', handleResize)

    const pockets = [
      { x: 16, y: 16 }, { x: W / 2, y: 12 }, { x: W - 16, y: 16 },
      { x: 16, y: H - 16 }, { x: W / 2, y: H - 12 }, { x: W - 16, y: H - 16 },
    ]

    const render = () => {
      ctx.clearRect(0, 0, W, H)

      // Felt
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, W, H)

      // Dot Grid
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
      for (let x = 16; x < W; x += 16) {
        for (let y = 16; y < H; y += 16) {
          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Rails
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.lineWidth = 2
      ctx.strokeRect(10, 10, W - 20, H - 20)

      // 6 Pockets
      pockets.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 14, 0, Math.PI * 2)
        ctx.fillStyle = '#000000'
        ctx.fill()
        ctx.strokeStyle = '#FF0000'
        ctx.lineWidth = 1.5
        ctx.stroke()
      })

      const balls = ballsRef.current

      // Physics & Pockets
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i]
        if (!b.active) continue

        // Realistic felt rolling friction (no more infinite air-hockey slide)
        b.x += b.vx
        b.y += b.vy
        b.vx *= 0.968
        b.vy *= 0.968

        if (Math.hypot(b.vx, b.vy) < 0.08) {
          b.vx = 0
          b.vy = 0
        }

        // Realistic Cushion Bounce (absorbs rubber cushion energy)
        const minX = 22, maxX = W - 22, minY = 22, maxY = H - 22
        if (b.x - R < minX) { b.x = minX + R; b.vx *= -0.76 }
        if (b.x + R > maxX) { b.x = maxX - R; b.vx *= -0.76 }
        if (b.y - R < minY) { b.y = minY + R; b.vy *= -0.76 }
        if (b.y + R > maxY) { b.y = maxY - R; b.vy *= -0.76 }

        // Sensitive Pocket Funnel / Gravitational Suction & Drop Logic
        for (const p of pockets) {
          const distToPocket = Math.hypot(b.x - p.x, b.y - p.y)

          // Gravitational pull when ball rolls close to pocket mouth
          if (distToPocket < 26) {
            const pull = 0.08
            b.vx += (p.x - b.x) * pull
            b.vy += (p.y - b.y) * pull
          }

          // Sensitive Drop Threshold into Pocket
          if (distToPocket < 20) {
            b.active = false
            b.vx = 0
            b.vy = 0

            if (b.num === 0) {
              // Cue ball scratch! Reset after short delay
              setScratchMessage(true)
              setTimeout(() => {
                b.x = W * 0.25
                b.y = H * 0.5
                b.vx = 0
                b.vy = 0
                b.active = true
                setScratchMessage(false)
              }, 800)
            } else {
              // Object ball potted!
              setPottedCount(prev => prev + 1)
            }
            break
          }
        }

        // Elastic Ball vs Ball Collisions (Momentum Transfer)
        for (let j = i + 1; j < balls.length; j++) {
          const b2 = balls[j]
          if (!b2.active) continue

          const dx = b2.x - b.x
          const dy = b2.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < R * 2 && dist > 0) {
            const nx = dx / dist
            const ny = dy / dist
            const kx = b.vx - b2.vx
            const ky = b.vy - b2.vy
            const p = nx * kx + ny * ky

            if (p > 0) {
              b.vx -= p * nx * 0.96
              b.vy -= p * ny * 0.96
              b2.vx += p * nx * 0.96
              b2.vy += p * ny * 0.96
            }

            // Separate overlapping balls
            const overlap = R * 2 - dist
            b.x -= nx * overlap * 0.5
            b.y -= ny * overlap * 0.5
            b2.x += nx * overlap * 0.5
            b2.y += ny * overlap * 0.5
          }
        }
      }

      // Draw Balls
      for (const b of balls) {
        if (!b.active) continue

        ctx.beginPath()
        ctx.arc(b.x, b.y, R, 0, Math.PI * 2)
        ctx.fillStyle = b.color
        ctx.fill()

        if (b.num) {
          ctx.fillStyle = b.num === 8 ? '#ffffff' : '#000000'
          ctx.font = 'bold 8px var(--font-mono)'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(b.num.toString(), b.x, b.y)
        }
      }

      // Aiming & Power Indicator line while dragging
      const cueBall = balls.find(b => b.num === 0 && b.active)
      if (cueBall && isDraggingRef.current) {
        const mx = mousePosRef.current.x
        const my = mousePosRef.current.y
        const dx = cueBall.x - mx
        const dy = cueBall.y - my
        const angle = Math.atan2(dy, dx)

        // Dotted Aim Line
        ctx.beginPath()
        ctx.setLineDash([4, 4])
        ctx.moveTo(cueBall.x, cueBall.y)
        ctx.lineTo(cueBall.x + Math.cos(angle) * 120, cueBall.y + Math.sin(angle) * 120)
        ctx.strokeStyle = '#FF0000'
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.setLineDash([])

        // Cue Stick Line
        const dist = Math.min(Math.hypot(dx, dy), 100)
        ctx.beginPath()
        ctx.moveTo(cueBall.x - Math.cos(angle) * (R + 6 + dist * 0.3), cueBall.y - Math.sin(angle) * (R + 6 + dist * 0.3))
        ctx.lineTo(cueBall.x - Math.cos(angle) * (R + 70 + dist * 0.3), cueBall.y - Math.sin(angle) * (R + 70 + dist * 0.3))
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 3
        ctx.stroke()
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      {/* Status Bar: Power Meter + Potted Counter + Reset Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span className="ndot" style={{ fontSize: '0.7rem', color: 'var(--gray-400)' }}>
            BOLAS EMBOCADAS: <strong style={{ color: 'var(--red)' }}>{pottedCount} / 6</strong>
          </span>
          {scratchMessage && (
            <span className="ndot" style={{ fontSize: '0.65rem', color: 'var(--red)', animation: 'pulse 1s infinite' }}>
              ¡FALTA! BOLA BLANCA REUBICADA
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Power Meter Visual */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span className="ndot" style={{ fontSize: '0.65rem', color: 'var(--gray-400)' }}>FUERZA:</span>
            <div style={{ width: '60px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${powerPercent}%`, 
                  height: '100%', 
                  background: powerPercent > 70 ? 'var(--red)' : '#ffffff',
                  transition: 'width 0.05s linear'
                }} 
              />
            </div>
          </div>

          <button
            onClick={resetGame}
            className="mono-tag"
            style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.05)', fontSize: '0.65rem', padding: '0.3rem 0.6rem' }}
            title="Reiniciar mesa"
          >
            <RotateCcw size={12} color="var(--red)" /> RE-RACK
          </button>
        </div>
      </div>

      {/* Billiards Canvas Container */}
      <div style={{ position: 'relative', width: '100%', height: '250px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', cursor: 'grab' }} />
        
        <div className="ndot" style={{ position: 'absolute', top: 14, left: 16, fontSize: '0.68rem', color: '#ffffff', pointerEvents: 'none' }}>
          8-BALL POOL SIMULATOR
        </div>
        <div className="ndot" style={{ position: 'absolute', bottom: 14, right: 16, fontSize: '0.6rem', color: 'var(--gray-400)', pointerEvents: 'none' }}>
          [ ARRASTRA Y SUELTA DESDE LA BOLA BLANCA PARA TIRAR ]
        </div>
      </div>
    </div>
  )
}

/* ── Minimalist Music Equalizer Widget ── */
function MinimalMusicWidget() {
  const [isHovered, setIsHovered] = useState(false)
  const bars = Array.from({ length: 16 })

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'border-color 0.3s ease'
      }}
      className={isHovered ? 'music-hover' : ''}
    >
      <style>{`
        .music-hover { border-color: rgba(255, 0, 0, 0.4) !important; }
        .eq-bar { transition: height 0.15s ease, background 0.3s ease; }
      `}</style>
      
      <div>
        <div className="ndot" style={{ fontSize: '0.7rem', color: 'var(--red)', marginBottom: '0.4rem' }}>
          AUDIO_MODULE // FRECUENCIAS
        </div>
        <h3 className="card-title" style={{ fontSize: '1.2rem', color: 'var(--white)' }}>
          Acoustic & AI Progressions
        </h3>
        <p className="body-text" style={{ fontSize: '0.88rem', marginTop: '0.3rem' }}>
          Exploración de progresiones en guitarra acústica y síntesis de audio impulsada por inteligencia artificial.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '48px', marginTop: '1.5rem' }}>
        {bars.map((_, i) => {
          const height = isHovered 
            ? 16 + Math.random() * 32 
            : 8 + Math.sin(i * 0.6) * 6
          return (
            <div 
              key={i} 
              className="eq-bar"
              style={{
                flex: 1,
                height: `${height}px`,
                background: isHovered ? 'var(--red)' : 'rgba(255, 255, 255, 0.2)',
                borderRadius: '2px 2px 0 0'
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function HumanSide({ lang = 'es' }: HumanSideProps) {
  const t = {
    es: {
      label: "07 // THE HUMAN ELEMENT",
      title: "FUERA DEL CÓDIGO",
    },
    en: {
      label: "07 // THE HUMAN ELEMENT",
      title: "BEYOND THE CODE",
    },
  }[lang]

  return (
    <section id="human-side" className="section">
      <div className="container">
        <span className="section-label">{t.label}</span>
        <h2 className="display-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
          {t.title}
        </h2>

        <div className="bento-grid">
          {/* Card 1: Personality & Values (col-span-5) */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="bento-card col-span-5"
            style={{ 
              background: 'rgba(0, 0, 0, 0.4)', 
              backdropFilter: 'blur(10px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <div className="ndot" style={{ color: 'var(--red)', fontSize: '0.75rem', marginBottom: '1rem' }}>
              IDENTIDAD // VALORES
            </div>
            <h3 className="card-title" style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>
              FILTRO HUMANO
            </h3>
            <p className="body-text" style={{ fontSize: '0.95rem', color: 'var(--gray-200)', lineHeight: 1.7 }}>
              Más allá de la pantalla, soy alguien familiar y amigable. Valoro profundamente trabajar con personas con las que congenio y puedo formar conexiones genuinas. Soy un gran amante de los animales y mantengo una curiosidad eterna por aprender de todo lo que me rodea.
            </p>
          </motion.div>

          {/* Right Column (col-span-7) containing Billiards & Music */}
          <div className="col-span-7" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Card 2: Interactive Billiards */}
            <motion.div 
              whileHover={{ y: -2 }}
              className="bento-card"
              style={{ background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(10px)', padding: '1.5rem' }}
            >
              <BilliardsHardwareCanvas />
            </motion.div>

            {/* Card 3: Minimalist Music */}
            <motion.div 
              whileHover={{ y: -2 }}
              className="bento-card"
              style={{ background: 'transparent', padding: 0, border: 'none' }}
            >
              <MinimalMusicWidget />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
