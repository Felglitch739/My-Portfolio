import { useEffect, useRef, useState } from 'react'
import { RotateCcw, Crosshair, Zap } from 'lucide-react'
import { WIDTH, HEIGHT, RADIUS, RAIL, pockets, rack, moving, step, respotCue, result } from './poolPhysics'
import type { PoolBall } from './poolPhysics'

const colors = ['#f4cb3d', '#3979dc', '#e14848', '#9c62d4', '#ef8d32', '#33a878', '#aa424a']
type Status = 'ready' | 'moving' | 'scratch' | 'won' | 'lost'

function draw(ctx: CanvasRenderingContext2D, balls: PoolBall[], angle: number, power: number, reduced: boolean) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
  const frame = ctx.createLinearGradient(0, 0, 0, HEIGHT)
  frame.addColorStop(0, '#3b3c43'); frame.addColorStop(.1, '#131319'); frame.addColorStop(1, '#29292e')
  ctx.fillStyle = frame; ctx.beginPath(); ctx.roundRect(0, 0, WIDTH, HEIGHT, 26); ctx.fill()
  const felt = ctx.createRadialGradient(400, 180, 30, 400, 200, 430)
  felt.addColorStop(0, '#38232c'); felt.addColorStop(1, '#140f19')
  ctx.fillStyle = felt; ctx.beginPath(); ctx.roundRect(RAIL, RAIL, WIDTH - RAIL * 2, HEIGHT - RAIL * 2, 15); ctx.fill()
  ctx.strokeStyle = '#79323f'; ctx.lineWidth = 6; ctx.stroke()
  ctx.strokeStyle = 'rgba(255,255,255,.025)'; ctx.lineWidth = 1
  for (let x = 45; x < WIDTH - RAIL; x += 15) { ctx.beginPath(); ctx.moveTo(x, RAIL); ctx.lineTo(x, HEIGHT - RAIL); ctx.stroke() }
  for (let i = 1; i < 8; i++) {
    if (i === 4) continue
    ctx.fillStyle = '#b2a0a6'
    for (const y of [14, HEIGHT - 14]) { ctx.beginPath(); ctx.moveTo(i * 100, y - 3); ctx.lineTo(i * 100 + 3, y); ctx.lineTo(i * 100, y + 3); ctx.lineTo(i * 100 - 3, y); ctx.fill() }
  }
  ctx.font = '11px monospace'; ctx.fillStyle = 'rgba(255,255,255,.13)'; ctx.textAlign = 'center'
  ctx.fillText('FMF  /  AFTER HOURS  /  8-BALL', WIDTH / 2, HEIGHT / 2 + 85)
  for (const p of pockets) {
    ctx.shadowColor = '#ff0000'; ctx.shadowBlur = 10; ctx.fillStyle = '#030305'
    ctx.beginPath(); ctx.arc(p.x, p.y, 23, 0, Math.PI * 2); ctx.fill()
    ctx.shadowBlur = 0; ctx.strokeStyle = '#96313e'; ctx.lineWidth = 2; ctx.stroke()
  }
  const cue = balls[0]
  if (cue.active && !moving(balls)) {
    const ux = Math.cos(angle), uy = Math.sin(angle)
    let length = 1000, target: PoolBall | undefined
    if (ux > 0) length = Math.min(length, (WIDTH - RAIL - RADIUS - cue.x) / ux)
    if (ux < 0) length = Math.min(length, (RAIL + RADIUS - cue.x) / ux)
    if (uy > 0) length = Math.min(length, (HEIGHT - RAIL - RADIUS - cue.y) / uy)
    if (uy < 0) length = Math.min(length, (RAIL + RADIUS - cue.y) / uy)
    for (const b of balls.slice(1)) {
      if (!b.active) continue
      const dx = b.x - cue.x, dy = b.y - cue.y, along = dx * ux + dy * uy
      const perpendicular = dx * dx + dy * dy - along * along
      if (along <= 0 || perpendicular > 4 * RADIUS * RADIUS) continue
      const hit = along - Math.sqrt(4 * RADIUS * RADIUS - perpendicular)
      if (hit >= 0 && hit < length) { length = hit; target = b }
    }
    const gx = cue.x + ux * length, gy = cue.y + uy * length
    ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 7])
    ctx.beginPath(); ctx.moveTo(cue.x, cue.y); ctx.lineTo(gx, gy); ctx.stroke(); ctx.setLineDash([])
    ctx.beginPath(); ctx.arc(gx, gy, RADIUS, 0, Math.PI * 2); ctx.stroke()
    if (target) {
      const nx = (target.x - gx) / (2 * RADIUS), ny = (target.y - gy) / (2 * RADIUS)
      ctx.strokeStyle = '#ff4444'; ctx.beginPath(); ctx.moveTo(target.x, target.y); ctx.lineTo(target.x + nx * 70, target.y + ny * 70); ctx.stroke()
    }
    // Visible cue stick follows aim and retreats with the selected shot power.
    const pull = 20 + power * .35
    ctx.strokeStyle = '#c4a48a'; ctx.lineWidth = 5; ctx.lineCap = 'round'
    ctx.beginPath(); ctx.moveTo(cue.x - ux * pull, cue.y - uy * pull); ctx.lineTo(cue.x - ux * (pull + 120), cue.y - uy * (pull + 120)); ctx.stroke()
    ctx.strokeStyle = '#eee'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cue.x - ux * pull, cue.y - uy * pull); ctx.lineTo(cue.x - ux * (pull + 10), cue.y - uy * (pull + 10)); ctx.stroke()
    ctx.lineCap = 'butt'
  }
  for (const b of balls) {
    if (!b.active) continue
    const speed = Math.hypot(b.vx, b.vy)
    if (!reduced && speed > 50) {
      ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = RADIUS
      ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x - b.vx * .035, b.y - b.vy * .035); ctx.stroke()
    }
    ctx.save(); ctx.shadowColor = '#000'; ctx.shadowBlur = 7; ctx.shadowOffsetY = 4
    ctx.fillStyle = b.number === 0 ? '#f5f3ef' : b.number === 8 ? '#17171e' : colors[(b.number - 1) % 8 % 7]
    ctx.beginPath(); ctx.arc(b.x, b.y, RADIUS, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0; ctx.shadowOffsetY = 0
    if (b.number > 8) {
      ctx.save(); ctx.clip(); ctx.fillStyle = '#f5f3ef'; ctx.fillRect(b.x - RADIUS, b.y - RADIUS, RADIUS * 2, 5); ctx.fillRect(b.x - RADIUS, b.y + RADIUS - 5, RADIUS * 2, 5); ctx.restore()
    }
    if (b.number !== 0) {
      ctx.fillStyle = '#f5f3ef'; ctx.beginPath(); ctx.arc(b.x, b.y, 6.5, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#111'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(String(b.number), b.x, b.y + .5)
    }
    const sheen = ctx.createRadialGradient(b.x - 4, b.y - 5, 1, b.x, b.y, RADIUS)
    sheen.addColorStop(0, 'rgba(255,255,255,.65)'); sheen.addColorStop(.35, 'rgba(255,255,255,.12)'); sheen.addColorStop(1, 'rgba(0,0,0,.25)')
    ctx.fillStyle = sheen; ctx.beginPath(); ctx.arc(b.x, b.y, RADIUS, 0, Math.PI * 2); ctx.fill(); ctx.restore()
  }
}

export default function PoolGame({ lang }: { lang: 'es' | 'en' }) {
  const es = lang === 'es'
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const balls = useRef<PoolBall[]>([])
  const aim = useRef(0)
  const shotPower = useRef(65)
  const shotActive = useRef(false)
  const scratched = useRef(false)
  const ended = useRef(false)
  const earlyEight = useRef(false)
  const [power, setPower] = useState(65)
  const [angle, setAngle] = useState(0)
  const [shots, setShots] = useState(0)
  const [potted, setPotted] = useState<number[]>([])
  const [status, setStatus] = useState<Status>('ready')
  const updateAngle = (value: number) => { aim.current = value; setAngle(value) }
  const updatePower = (value: number) => { shotPower.current = value; setPower(value) }
  const reset = () => {
    balls.current = rack(); shotActive.current = false; scratched.current = false; ended.current = false; earlyEight.current = false
    updateAngle(0); updatePower(65); setShots(0); setPotted([]); setStatus('ready')
  }
  const shoot = () => {
    if (ended.current || shotActive.current || moving(balls.current) || !balls.current[0]?.active) return
    const cue = balls.current[0], speed = 140 + shotPower.current * 6.5
    cue.vx = Math.cos(aim.current) * speed; cue.vy = Math.sin(aim.current) * speed
    shotActive.current = true; scratched.current = false; setShots(s => s + 1); setStatus('moving')
  }
  useEffect(() => {
    const canvas = canvasRef.current, ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    if (!balls.current.length) balls.current = rack()
    let frame = 0, previous = 0, accumulator = 0, visible = false
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.max(1, canvas.getBoundingClientRect().width)
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(width / 2 * ratio)
      ctx.setTransform(canvas.width / WIDTH, 0, 0, canvas.height / HEIGHT, 0, 0)
      draw(ctx, balls.current, aim.current, shotPower.current, reduced)
    }
    const loop = (time: number) => {
      accumulator += previous ? Math.min((time - previous) / 1000, .05) : 0; previous = time
      while (accumulator >= 1 / 120) {
        const sunk = step(balls.current, 1 / 120)
        if (sunk.includes(8) && balls.current.some(b => b.number !== 0 && b.number !== 8 && b.active)) earlyEight.current = true
        if (sunk.includes(0)) scratched.current = true
        if (sunk.some(n => n > 0)) setPotted(old => [...old, ...sunk.filter(n => n > 0)])
        accumulator -= 1 / 120
      }
      if (shotActive.current && !moving(balls.current)) {
        shotActive.current = false
        const outcome = earlyEight.current ? 'lost' : result(balls.current, scratched.current)
        if (outcome) { ended.current = true; setStatus(outcome) }
        else { if (scratched.current) respotCue(balls.current); setStatus(scratched.current ? 'scratch' : 'ready') }
      }
      draw(ctx, balls.current, aim.current, shotPower.current, reduced)
      frame = requestAnimationFrame(loop)
    }
    const sync = () => {
      cancelAnimationFrame(frame); previous = 0; accumulator = 0
      if (visible && !document.hidden) frame = requestAnimationFrame(loop)
    }
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync() })
    observer.observe(canvas)
    const resizer = new ResizeObserver(resize); resizer.observe(canvas); resize()
    document.addEventListener('visibilitychange', sync)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); resizer.disconnect(); document.removeEventListener('visibilitychange', sync) }
  }, [])
  const messages = es ? {
    ready: 'MESA LISTA // APUNTA Y DISPARA', moving: 'TIRO EN CURSO…', scratch: 'FALTA // BLANCA RECOLOCADA',
    won: 'MESA LIMPIA // GANASTE', lost: 'BOLA 8 ANTES DE TIEMPO O FALTA FINAL // OTRA PARTIDA',
  } : {
    ready: 'TABLE READY // AIM AND SHOOT', moving: 'SHOT IN MOTION…', scratch: 'SCRATCH // CUE RESPOTTED',
    won: 'TABLE CLEARED // YOU WIN', lost: 'EARLY 8-BALL OR FINAL SCRATCH // TRY AGAIN',
  }
  const remaining = 14 - potted.filter(n => n !== 8).length
  return (
    <div className="pool-game">
      <div className="pool-hud">
        <span className="ndot"><span className="pool-live" /> AFTER HOURS // 8-BALL</span>
        <span className="mono-tag">{es ? 'TIROS' : 'SHOTS'} {String(shots).padStart(2, '0')} / {remaining} {es ? 'RESTANTES' : 'LEFT'}</span>
        <button className="mono-tag" onClick={reset}><RotateCcw size={13} /> {es ? 'Nueva partida' : 'New game'}</button>
      </div>
      <canvas ref={canvasRef} className="pool-table" tabIndex={0} aria-label={es ? 'Mesa de billar. Apunta tocando la mesa. Flechas para dirección y potencia, espacio para tirar.' : 'Pool table. Tap to aim. Arrow keys adjust aim and power, space to shoot.'}
        onPointerDown={e => {
          if (shotActive.current || ended.current) return
          e.currentTarget.setPointerCapture(e.pointerId); e.currentTarget.focus()
          const rect = e.currentTarget.getBoundingClientRect(), cue = balls.current[0]
          updateAngle(Math.atan2((e.clientY - rect.top) * HEIGHT / rect.height - cue.y, (e.clientX - rect.left) * WIDTH / rect.width - cue.x))
        }}
        onPointerMove={e => {
          if (!e.currentTarget.hasPointerCapture(e.pointerId) || shotActive.current || ended.current) return
          const rect = e.currentTarget.getBoundingClientRect(), cue = balls.current[0]
          updateAngle(Math.atan2((e.clientY - rect.top) * HEIGHT / rect.height - cue.y, (e.clientX - rect.left) * WIDTH / rect.width - cue.x))
        }}
        onPointerUp={e => { if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId) }}
        onKeyDown={e => {
          if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) return
          e.preventDefault()
          if (shotActive.current || ended.current) return
          if (e.key === ' ') shoot()
          if (e.key === 'ArrowLeft') updateAngle(aim.current - .025)
          if (e.key === 'ArrowRight') updateAngle(aim.current + .025)
          if (e.key === 'ArrowUp') updatePower(Math.min(100, shotPower.current + 5))
          if (e.key === 'ArrowDown') updatePower(Math.max(5, shotPower.current - 5))
        }} />
      <div className="pool-controls">
        <label><Crosshair size={14} /> {es ? 'Dirección' : 'Aim'}
          <input aria-label={es ? 'Dirección del tiro' : 'Shot direction'} type="range" min="-180" max="180" step="0.5" value={angle * 180 / Math.PI} disabled={status === 'moving' || status === 'won' || status === 'lost'} onChange={e => updateAngle(Number(e.target.value) * Math.PI / 180)} />
        </label>
        <label><Zap size={14} /> {es ? 'Potencia' : 'Power'} <strong>{power}%</strong>
          <input aria-label={es ? 'Potencia del tiro' : 'Shot power'} type="range" min="5" max="100" value={power} disabled={status === 'moving' || status === 'won' || status === 'lost'} onChange={e => updatePower(Number(e.target.value))} />
        </label>
        <button className="btn-bento btn-bento-primary" disabled={status === 'moving' || status === 'won' || status === 'lost'} onClick={shoot}>{es ? 'DISPARAR' : 'SHOOT'} <span>↗</span></button>
      </div>
      <div className="pool-bottom">
        <span className="ndot" role="status">{messages[status]}</span>
        <div className="pool-pocketed" aria-label={es ? 'Bolas embocadas' : 'Pocketed balls'}>{potted.map(n => <span key={n} style={{ background: n === 8 ? '#111' : colors[(n - 1) % 8 % 7] }}>{n}</span>)}</div>
      </div>
      <p className="pool-help">{es ? 'Reto individual: emboca las 14 bolas y deja la 8 al final. Toca o arrastra sobre la mesa para apuntar, ajusta la potencia y pulsa Disparar. Teclado: ← → dirección · ↑ ↓ potencia · espacio para tirar.' : 'Solo challenge: pocket all 14 balls, then the 8. Tap or drag on the table to aim, set power, and press Shoot. Keyboard: ← → aim · ↑ ↓ power · space to shoot.'}</p>
    </div>
  )
}
