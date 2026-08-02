import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface HumanSideProps {
  lang?: 'es' | 'en'
}

/* ── Interactive Hardware Billiards Simulator (7 Balls, Pockets & Cue Aiming) ── */
function BilliardsHardwareCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let W = (canvas.width = canvas.offsetWidth || 500)
    let H = (canvas.height = 260)
    const R = 10

    const balls = [
      { id: 0, x: W * 0.25, y: H * 0.5, vx: 0, vy: 0, color: '#ffffff', num: 0 }, // Cue ball
      { id: 1, x: W * 0.62, y: H * 0.5, vx: 0, vy: 0, color: '#ffffff', num: 1 },
      { id: 2, x: W * 0.68, y: H * 0.43, vx: 0, vy: 0, color: '#888888', num: 2 },
      { id: 3, x: W * 0.68, y: H * 0.57, vx: 0, vy: 0, color: '#ffffff', num: 3 },
      { id: 4, x: W * 0.74, y: H * 0.36, vx: 0, vy: 0, color: '#888888', num: 4 },
      { id: 5, x: W * 0.74, y: H * 0.5, vx: 0, vy: 0, color: '#FF0000', num: 8 },  // Pure Red 8-ball
      { id: 6, x: W * 0.74, y: H * 0.64, vx: 0, vy: 0, color: '#888888', num: 6 },
    ]

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top
      const cueBall = balls[0]
      const dx = clickX - cueBall.x
      const dy = clickY - cueBall.y
      const angle = Math.atan2(dy, dx)
      const power = 14
      cueBall.vx = Math.cos(angle) * power
      cueBall.vy = Math.sin(angle) * power
    }

    const handleResize = () => {
      if (!canvas) return
      W = canvas.width = canvas.offsetWidth || 500
      H = canvas.height = 260
    }

    canvas.addEventListener('click', handleCanvasClick)
    window.addEventListener('resize', handleResize)

    const render = () => {
      ctx.clearRect(0, 0, W, H)

      // Solid Deep Black Felt
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, W, H)

      // Engineering Dot Grid on Felt
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
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

      // 6 Hardware Pockets
      const pockets = [
        { x: 14, y: 14 }, { x: W / 2, y: 10 }, { x: W - 14, y: 14 },
        { x: 14, y: H - 14 }, { x: W / 2, y: H - 10 }, { x: W - 14, y: H - 14 },
      ]
      pockets.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 13, 0, Math.PI * 2)
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

        // Ball vs Ball
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

        // Draw Ball
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

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      canvas.removeEventListener('click', handleCanvasClick)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '260px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', cursor: 'crosshair' }} />
      <div className="ndot" style={{ position: 'absolute', top: 14, left: 16, fontSize: '0.7rem', color: '#ffffff' }}>
        SIMULADOR DE BILLAR // 8-BALL
      </div>
      <div className="ndot" style={{ position: 'absolute', bottom: 14, right: 16, fontSize: '0.62rem', color: 'var(--red)' }}>
        [ HAZ CLIC EN EL TAPETE PARA APUNTAR Y DISPARAR ]
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 className="card-title" style={{ fontSize: '1.1rem', margin: 0 }}>
                  8-BALL POOL
                </h3>
                <div className="ndot" style={{ fontSize: '0.68rem', color: 'var(--gray-400)' }}>
                  VS EDUARDO, WICHO, ORLANDO & FÉLIX
                </div>
              </div>
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
