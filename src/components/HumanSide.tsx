import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface HumanSideProps {
  lang?: 'es' | 'en'
}

/* ── Interactive Minimalist Billiards Canvas ── */
function MinimalBilliardsWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let W = (canvas.width = canvas.offsetWidth || 400)
    let H = (canvas.height = 200)
    const R = 8

    const balls = [
      { id: 0, x: W * 0.3, y: H * 0.5, vx: 0, vy: 0, color: '#ffffff' }, // Cue ball
      { id: 1, x: W * 0.7, y: H * 0.5, vx: 0, vy: 0, color: '#FF0000' }, // 8-ball
    ]

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      
      const cue = balls[0]
      const dx = cue.x - mx
      const dy = cue.y - my
      const dist = Math.hypot(dx, dy)
      
      // If mouse gets close, push the cue ball slightly away
      if (dist < 40) {
        const force = (40 - dist) / 40
        const angle = Math.atan2(dy, dx)
        cue.vx += Math.cos(angle) * force * 2
        cue.vy += Math.sin(angle) * force * 2
      }
    }

    const handleResize = () => {
      W = canvas.width = canvas.offsetWidth || 400
      H = canvas.height = 200
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    const render = () => {
      ctx.clearRect(0, 0, W, H)

      // Minimalist grid background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
      for (let x = 10; x < W; x += 20) {
        for (let y = 10; y < H; y += 20) {
          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Physics
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i]
        b.x += b.vx
        b.y += b.vy
        b.vx *= 0.96
        b.vy *= 0.96

        // Bounds
        if (b.x < R) { b.x = R; b.vx *= -1 }
        if (b.x > W - R) { b.x = W - R; b.vx *= -1 }
        if (b.y < R) { b.y = R; b.vy *= -1 }
        if (b.y > H - R) { b.y = H - R; b.vy *= -1 }

        // Ball Collision
        for (let j = i + 1; j < balls.length; j++) {
          const b2 = balls[j]
          const dx = b2.x - b.x
          const dy = b2.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < R * 2) {
            const angle = Math.atan2(dy, dx)
            const sin = Math.sin(angle)
            const cos = Math.cos(angle)
            
            // Resolve overlap
            const overlap = R * 2 - dist
            b.x -= cos * (overlap / 2)
            b.y -= sin * (overlap / 2)
            b2.x += cos * (overlap / 2)
            b2.y += sin * (overlap / 2)
            
            // Elastic collision
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

        // Draw ball
        ctx.beginPath()
        ctx.arc(b.x, b.y, R, 0, Math.PI * 2)
        ctx.fillStyle = b.color
        ctx.fill()
        
        // Draw 8 label
        if (i === 1) {
          ctx.fillStyle = '#fff'
          ctx.font = '8px var(--font-ndot)'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('8', b.x, b.y)
        }
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '200px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      <div className="ndot" style={{ position: 'absolute', top: 12, left: 16, fontSize: '0.7rem', color: '#fff' }}>
        SIMULACIÓN // 8-BALL
      </div>
      <div className="ndot" style={{ position: 'absolute', bottom: 12, right: 16, fontSize: '0.6rem', color: '#71717a' }}>
        [ MOVER MOUSE PARA INTERACTUAR ]
      </div>
    </div>
  )
}

/* ── Minimalist Music Equalizer Widget ── */
function MinimalMusicWidget() {
  const [isHovered, setIsHovered] = useState(false)
  const bars = Array.from({ length: 12 })

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '1.5rem',
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.1)',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease'
      }}
      className={isHovered ? 'music-hover' : ''}
    >
      <style>{`
        .music-hover { border-color: rgba(255, 0, 0, 0.4) !important; }
        .eq-bar { transition: height 0.15s ease, background 0.3s ease; }
      `}</style>
      
      <div>
        <div className="ndot" style={{ fontSize: '0.75rem', color: 'var(--red)', marginBottom: '0.5rem' }}>
          AUDIO_MODULE
        </div>
        <div className="card-title" style={{ fontSize: '1.2rem', color: 'var(--white)' }}>
          Acoustic & AI Progressions
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px', marginTop: '2rem' }}>
        {bars.map((_, i) => {
          const height = isHovered 
            ? 20 + Math.random() * 40 
            : 10 + Math.sin(i * 0.5) * 5
          return (
            <div 
              key={i} 
              className="eq-bar"
              style={{
                width: '100%',
                height: `${height}px`,
                background: isHovered ? 'var(--red)' : 'var(--gray-700)',
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
          {/* Card 1: Personality & Values (col-span-12 on mobile, col-span-5 on desktop) */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="bento-card col-span-5"
            style={{ 
              background: 'rgba(0, 0, 0, 0.4)', 
              backdropFilter: 'blur(10px)',
              justifyContent: 'center',
              padding: '2.5rem'
            }}
          >
            <div className="ndot" style={{ color: 'var(--red)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              IDENTIDAD // VALORES
            </div>
            <p className="body-text" style={{ fontSize: '1.05rem', color: 'var(--white)', lineHeight: 1.7 }}>
              Más allá de la pantalla, soy alguien familiar y amigable. Valoro profundamente trabajar con personas con las que congenio y puedo formar conexiones genuinas. Soy un gran amante de los animales y mantengo una curiosidad eterna por aprender de todo lo que me rodea.
            </p>
          </motion.div>

          <div className="col-span-7" style={{ gap: '1.25rem', display: 'flex', flexDirection: 'column' }}>
            
            {/* Card 2: Minimalist Billiards */}
            <motion.div 
              whileHover={{ y: -2 }}
              className="bento-card"
              style={{ background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(10px)', padding: '1.5rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div className="ndot" style={{ fontSize: '0.9rem', color: 'var(--white)' }}>8-BALL POOL</div>
                <div className="ndot" style={{ fontSize: '0.65rem', color: 'var(--gray-500)' }}>VS EDUARDO, WICHO, ORLANDO</div>
              </div>
              <MinimalBilliardsWidget />
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
