export const WIDTH = 800
export const HEIGHT = 400
export const RADIUS = 12
export const RAIL = 30
export const pockets = [
  { x: 30, y: 30 }, { x: 400, y: 25 }, { x: 770, y: 30 },
  { x: 30, y: 370 }, { x: 400, y: 375 }, { x: 770, y: 370 },
]
export interface PoolBall { number: number; x: number; y: number; vx: number; vy: number; active: boolean }
export function rack(): PoolBall[] {
  const balls: PoolBall[] = [{ number: 0, x: 200, y: 200, vx: 0, vy: 0, active: true }]
  const order = [1, 9, 2, 3, 8, 10, 11, 4, 12, 5, 6, 13, 7, 14, 15]
  let index = 0
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col <= row; col++) {
      balls.push({ number: order[index++], x: 520 + row * 24.5 * Math.sqrt(3) / 2, y: 200 + (col - row / 2) * 24.5, vx: 0, vy: 0, active: true })
    }
  }
  return balls
}
export function moving(balls: PoolBall[]) { return balls.some(b => b.active && Math.hypot(b.vx, b.vy) > 0) }
// Fixed 120 Hz steps keep friction and collision response independent of display refresh rate.
export function step(balls: PoolBall[], dt: number): number[] {
  const potted: number[] = []
  for (const b of balls) {
    if (!b.active) continue
    b.x += b.vx * dt; b.y += b.vy * dt
    if (pockets.some(p => Math.hypot(b.x - p.x, b.y - p.y) < 22)) {
      b.active = false; b.vx = 0; b.vy = 0; potted.push(b.number); continue
    }
    const min = RAIL + RADIUS, maxX = WIDTH - min, maxY = HEIGHT - min
    if (b.x < min) { b.x = min; b.vx = Math.abs(b.vx) * .85 }
    if (b.x > maxX) { b.x = maxX; b.vx = -Math.abs(b.vx) * .85 }
    if (b.y < min) { b.y = min; b.vy = Math.abs(b.vy) * .85 }
    if (b.y > maxY) { b.y = maxY; b.vy = -Math.abs(b.vy) * .85 }
    const friction = Math.exp(-1.25 * dt)
    b.vx *= friction; b.vy *= friction
    if (Math.hypot(b.vx, b.vy) < 5) { b.vx = 0; b.vy = 0 }
  }
  for (let i = 0; i < balls.length; i++) {
    const a = balls[i]; if (!a.active) continue
    for (let j = i + 1; j < balls.length; j++) {
      const b = balls[j]; if (!b.active) continue
      const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy)
      if (d >= RADIUS * 2 || d === 0) continue
      const nx = dx / d, ny = dy / d, overlap = (RADIUS * 2 - d) / 2
      a.x -= nx * overlap; a.y -= ny * overlap; b.x += nx * overlap; b.y += ny * overlap
      const impulse = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny
      if (impulse > 0) {
        const impulseWithRestitution = impulse * .98
        a.vx -= impulseWithRestitution * nx; a.vy -= impulseWithRestitution * ny
        b.vx += impulseWithRestitution * nx; b.vy += impulseWithRestitution * ny
      }
    }
  }
  return potted
}
export function respotCue(balls: PoolBall[]) {
  const cue = balls[0]
  // Search free positions rather than placing the cue inside another ball after a scratch.
  for (let x = 200; x <= 700; x += 28) {
    for (let y = 200; y <= 340; y += 28) {
      if (balls.slice(1).every(b => !b.active || Math.hypot(b.x - x, b.y - y) > RADIUS * 2 + 2)) {
        Object.assign(cue, { x, y, vx: 0, vy: 0, active: true }); return
      }
    }
  }
}
export function result(balls: PoolBall[], scratch: boolean): 'won' | 'lost' | null {
  if (balls.find(b => b.number === 8)?.active) return null
  return !scratch && balls.every(b => b.number === 0 || b.number === 8 || !b.active) ? 'won' : 'lost'
}
