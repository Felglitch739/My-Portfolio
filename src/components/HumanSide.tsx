import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Volume2, VolumeX } from 'lucide-react'

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
  const [pottedBalls, setPottedBalls] = useState<Ball[]>([])
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
    setPottedBalls([])
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
        const maxSpeed = 19
        const speed = powerRatio * maxSpeed
        const angle = Math.atan2(dy, dx)

        cueBall.vx = Math.cos(angle) * speed
        cueBall.vy = Math.sin(angle) * speed
      }
      setPowerPercent(0)
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return
      const rect = canvas.getBoundingClientRect()
      const mx = e.touches[0].clientX - rect.left
      const my = e.touches[0].clientY - rect.top

      const cueBall = ballsRef.current.find(b => b.num === 0 && b.active)
      if (!cueBall) return

      const isMoving = Math.hypot(cueBall.vx, cueBall.vy) > 0.15
      if (isMoving) return

      isDraggingRef.current = true
      dragPosRef.current = { x: mx, y: my }
      mousePosRef.current = { x: mx, y: my }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return
      const rect = canvas.getBoundingClientRect()
      const mx = e.touches[0].clientX - rect.left
      const my = e.touches[0].clientY - rect.top
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

    const handleTouchEnd = () => {
      handleMouseUp()
    }

    const handleResize = () => {
      if (!canvas) return
      W = canvas.width = canvas.offsetWidth || 500
      H = canvas.height = 260
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true })
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('resize', handleResize)

    // Move pockets slightly inward so the threshold isn't completely blocked by cushions
    const pockets = [
      { x: 18, y: 18 }, { x: W / 2, y: 12 }, { x: W - 18, y: 18 },
      { x: 18, y: H - 18 }, { x: W / 2, y: H - 12 }, { x: W - 18, y: H - 18 },
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

      // 6 Pockets Draw
      pockets.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 16, 0, Math.PI * 2) // slightly larger visual pocket
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

        // Realistic felt rolling friction
        b.x += b.vx
        b.y += b.vy
        b.vx *= 0.968
        b.vy *= 0.968

        if (Math.hypot(b.vx, b.vy) < 0.08) {
          b.vx = 0
          b.vy = 0
        }

        // Pocket Suction & Pot Logic
        let inPocket = false
        for (const p of pockets) {
          const distToPocket = Math.hypot(b.x - p.x, b.y - p.y)

          // Gravitational pull when ball rolls close to pocket mouth
          if (distToPocket < 32) {
            const pull = 0.15
            b.vx += (p.x - b.x) * pull
            b.vy += (p.y - b.y) * pull
          }

          // Drop Threshold - make it generous so they fall in easily
          if (distToPocket < 22) {
            b.active = false
            b.vx = 0
            b.vy = 0
            inPocket = true

            if (b.num === 0) {
              // Cue ball scratch
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
              // Object ball potted! Add to UI
              setPottedBalls(prev => {
                // avoid duplicates
                if (prev.find(pb => pb.num === b.num)) return prev;
                return [...prev, { ...b }]
              })
            }
            break
          }
        }

        // Realistic Cushion Bounce (only if not getting sucked into a pocket)
        if (!inPocket) {
          const minX = 22, maxX = W - 22, minY = 22, maxY = H - 22
          // To prevent balls getting stuck on the pocket lip wall boundaries,
          // we only apply wall bounce if they are reasonably far from the pocket centers.
          const isNearAnyPocket = pockets.some(p => Math.hypot(b.x - p.x, b.y - p.y) < 32)
          
          if (!isNearAnyPocket) {
            if (b.x - R < minX) { b.x = minX + R; b.vx *= -0.76 }
            if (b.x + R > maxX) { b.x = maxX - R; b.vx *= -0.76 }
            if (b.y - R < minY) { b.y = minY + R; b.vy *= -0.76 }
            if (b.y + R > maxY) { b.y = maxY - R; b.vy *= -0.76 }
          }
        }

        // Elastic Ball vs Ball Collisions
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
        ctx.lineTo(cueBall.x - Math.cos(angle) * (R + 80 + dist * 0.3), cueBall.y - Math.sin(angle) * (R + 80 + dist * 0.3))
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
      {/* Status Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        
        {/* Potted Balls Display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="ndot" style={{ fontSize: '0.65rem', color: 'var(--gray-400)' }}>
            EMBOCADAS:
          </span>
          <div style={{ display: 'flex', gap: '4px', minWidth: '80px' }}>
            {pottedBalls.map((b, idx) => (
              <div 
                key={idx}
                style={{ 
                  width: '14px', height: '14px', borderRadius: '50%', 
                  background: b.color, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '8px', color: b.num === 8 ? '#fff' : '#000',
                  fontWeight: 'bold', fontFamily: 'var(--font-mono)'
                }}
              >
                {b.num}
              </div>
            ))}
            {pottedBalls.length === 0 && <span style={{ fontSize: '0.6rem', color: 'var(--gray-600)' }}>NINGUNA</span>}
          </div>
          {scratchMessage && (
            <span className="ndot" style={{ fontSize: '0.6rem', color: 'var(--red)', animation: 'pulse 1s infinite', marginLeft: '0.5rem' }}>
              ¡FALTA! BLANCA REUBICADA
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
            aria-label="Reiniciar mesa de billar"
            title="Reiniciar mesa"
          >
            <RotateCcw size={12} color="var(--red)" /> RE-RACK
          </button>
        </div>
      </div>

      {/* Billiards Canvas Container */}
      <div style={{ position: 'relative', width: '100%', height: '250px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', cursor: 'grab', touchAction: 'none' }} />
        
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

/* ── Interactive WebAudio Synthesizer Widget ── */
function MinimalMusicWidget() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const intervalRef = useRef<number | null>(null)
  const bars = Array.from({ length: 16 })

  const notes = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
  ]

  const playNote = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    const ctx = audioCtxRef.current
    if (ctx.state === 'suspended') ctx.resume()

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    const randomNote = notes[Math.floor(Math.random() * notes.length)]
    
    osc.type = 'sine'
    osc.frequency.setValueAtTime(randomNote, ctx.currentTime)
    
    filter.type = 'lowpass'
    filter.frequency.value = 1000

    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)
    
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start()
    osc.stop(ctx.currentTime + 1.2)
  }

  const handleMouseEnter = () => {
    setIsPlaying(true)
    playNote()
    intervalRef.current = window.setInterval(() => {
      playNote()
    }, 400) // play arpeggio every 400ms
  }

  const handleMouseLeave = () => {
    setIsPlaying(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (audioCtxRef.current) audioCtxRef.current.close()
    }
  }, [])

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'border-color 0.3s ease',
        cursor: 'pointer'
      }}
      className={isPlaying ? 'music-hover' : ''}
    >
      <style>{`
        .music-hover { border-color: rgba(255, 0, 0, 0.4) !important; }
        .eq-bar { transition: height 0.1s ease, background 0.2s ease; }
      `}</style>
      
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <div className="ndot" style={{ fontSize: '0.7rem', color: 'var(--red)' }}>
            AUDIO_MODULE // SÍNTESIS WEB
          </div>
          {isPlaying ? <Volume2 size={14} color="var(--red)" /> : <VolumeX size={14} color="var(--gray-500)" />}
        </div>
        <h3 className="card-title" style={{ fontSize: '1.2rem', color: 'var(--white)' }}>
          Acoustic & AI Progressions
        </h3>
        <p className="body-text" style={{ fontSize: '0.88rem', marginTop: '0.3rem' }}>
          Interacción sonora generativa. Pasa el cursor por aquí para activar el sintetizador de escala pentatónica en tiempo real.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '48px', marginTop: '1.5rem' }}>
        {bars.map((_, i) => {
          const height = isPlaying 
            ? 12 + Math.random() * 36 
            : 8 + Math.sin(i * 0.6) * 6
          return (
            <div 
              key={i} 
              className="eq-bar"
              style={{
                flex: 1,
                height: `${height}px`,
                background: isPlaying ? 'var(--red)' : 'rgba(255, 255, 255, 0.2)',
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
  const [activeDrawer, setActiveDrawer] = useState<'none' | 'billiards' | 'audio'>('none')

  const t = {
    es: {
      label: "07 // THE HUMAN ELEMENT",
      title: "FUERA DEL CÓDIGO",
      card1Title: "FILTRO HUMANO",
      card1Text: "Más allá de la pantalla, soy alguien familiar y amigable. Valoro profundamente trabajar con personas con las que congenio y puedo formar conexiones genuinas. Soy un gran amante de los animales y mantengo una curiosidad eterna por aprender de todo lo que me rodea.",
      card2Title: "DISCIPLINA & INTERESES",
      card2Items: [
        { label: "PESAS & PPL", desc: "Disciplina constante en gimnasio (Push-Pull-Legs)." },
        { label: "GUITARRA ACÚSTICA", desc: "Progresiones armónicas y letras de canciones." },
        { label: "GAMING & MODDING", desc: "Tuning de servidores C++ y JVM en Rust y Minecraft." },
        { label: "8-BALL POOL", desc: "Partidas de billar para despejar la mente." },
      ],
      labsTitle: "MÓDULOS INTERACTIVOS (LABORATORIO OCIONAL)",
      billiardsBtn: "🎱 EXPERIMENTO // BILLIARDS 8-BALL",
      audioBtn: "🎵 EXPERIMENTO // SINTETIZADOR DE AUDIO",
      closeBtn: "CERRAR MÓDULO",
    },
    en: {
      label: "07 // THE HUMAN ELEMENT",
      title: "BEYOND THE CODE",
      card1Title: "HUMAN FILTER",
      card1Text: "Beyond the screen, I am a warm and friendly individual. I deeply value working with people I resonate with and building genuine connections. I am a passionate animal lover with an eternal curiosity to learn from everything around me.",
      card2Title: "DISCIPLINE & HOBBIES",
      card2Items: [
        { label: "WEIGHTLIFTING (PPL)", desc: "Consistent discipline in the gym (Push-Pull-Legs)." },
        { label: "ACOUSTIC GUITAR", desc: "Harmonic progressions and lyric writing." },
        { label: "GAMING & MODDING", desc: "C++ & JVM server tuning in Rust & Minecraft." },
        { label: "8-BALL POOL", desc: "Billiards matches with friends to clear the mind." },
      ],
      labsTitle: "INTERACTIVE MODULES (OPTIONAL LABS)",
      billiardsBtn: "🎱 LAB // BILLIARDS 8-BALL SIMULATOR",
      audioBtn: "🎵 LAB // AUDIO SYNTHESIZER",
      closeBtn: "CLOSE MODULE",
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
          {/* Card 1: Personality & Values (col-span-6) */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="bento-card col-span-6"
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
              {t.card1Title}
            </h3>
            <p className="body-text" style={{ fontSize: '0.95rem', color: 'var(--gray-200)', lineHeight: 1.7 }}>
              {t.card1Text}
            </p>
          </motion.div>

          {/* Card 2: Hobbies & Discipline (col-span-6) */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="bento-card col-span-6"
            style={{ 
              background: 'rgba(0, 0, 0, 0.4)', 
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div className="ndot" style={{ color: 'var(--red)', fontSize: '0.75rem', marginBottom: '1rem' }}>
                DISCIPLINA // ESTILO DE VIDA
              </div>
              <h3 className="card-title" style={{ fontSize: '1.3rem', marginBottom: '1.2rem' }}>
                {t.card2Title}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
                {t.card2Items.map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '10px', padding: '0.7rem 0.9rem' }}>
                    <span className="ndot" style={{ fontSize: '0.75rem', color: 'var(--white)', display: 'block', marginBottom: '0.2rem' }}>
                      {item.label}
                    </span>
                    <span className="body-text" style={{ fontSize: '0.78rem', color: 'var(--gray-400)' }}>
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3: Collapsible Interactive Modules (col-span-12) */}
          <div className="bento-card col-span-12" style={{ background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(10px)', padding: '1.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: activeDrawer !== 'none' ? '1.5rem' : 0 }}>
              <div>
                <div className="ndot" style={{ fontSize: '0.72rem', color: 'var(--gray-500)' }}>
                  {t.labsTitle}
                </div>
                <h3 className="card-title" style={{ fontSize: '1.1rem', marginTop: '0.2rem' }}>
                  LABORATORIOS INTERACTIVOS A PETICIÓN
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveDrawer(activeDrawer === 'billiards' ? 'none' : 'billiards')}
                  className={`mono-tag ${activeDrawer === 'billiards' ? 'mono-tag-red' : ''}`}
                  style={{ cursor: 'pointer', padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                >
                  {t.billiardsBtn}
                </button>

                <button
                  onClick={() => setActiveDrawer(activeDrawer === 'audio' ? 'none' : 'audio')}
                  className={`mono-tag ${activeDrawer === 'audio' ? 'mono-tag-red' : ''}`}
                  style={{ cursor: 'pointer', padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                >
                  {t.audioBtn}
                </button>
              </div>
            </div>

            {/* Expanded Drawer Area */}
            {activeDrawer === 'billiards' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
              >
                <BilliardsHardwareCanvas />
              </motion.div>
            )}

            {activeDrawer === 'audio' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
              >
                <MinimalMusicWidget />
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
