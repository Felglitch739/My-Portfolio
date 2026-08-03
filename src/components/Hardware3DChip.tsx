import { useEffect, useRef } from 'react'

export default function Hardware3DChip() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationId: number
    let width = container.offsetWidth || 300
    let height = container.offsetHeight || 260

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    container.innerHTML = ''
    container.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2.5
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2.5
    }

    window.addEventListener('mousemove', handleMouseMove)

    let angleX = 0
    let angleY = 0
    let angleZ = 0
    let time = 0

    // 3D Icosahedron Vertices (Golden ratio phi)
    const phi = (1 + Math.sqrt(5)) / 2
    const rawVertices: [number, number, number][] = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ].map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z)
      return [x / len, y / len, z / len]
    })

    // Edges connecting vertices with distance threshold
    const edges: [number, number][] = []
    for (let i = 0; i < rawVertices.length; i++) {
      for (let j = i + 1; j < rawVertices.length; j++) {
        const dx = rawVertices[i][0] - rawVertices[j][0]
        const dy = rawVertices[i][1] - rawVertices[j][1]
        const dz = rawVertices[i][2] - rawVertices[j][2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < 1.1) {
          edges.push([i, j])
        }
      }
    }

    // Concentric Ring Vertices (3D Gyroscope)
    const ring1Count = 24
    const ring1Points = Array.from({ length: ring1Count }).map((_, i) => {
      const a = (i / ring1Count) * Math.PI * 2
      return [Math.cos(a) * 1.5, Math.sin(a) * 1.5, 0] as [number, number, number]
    })

    const ring2Points = Array.from({ length: ring1Count }).map((_, i) => {
      const a = (i / ring1Count) * Math.PI * 2
      return [Math.cos(a) * 1.8, 0, Math.sin(a) * 1.8] as [number, number, number]
    })

    const project = (x: number, y: number, z: number, rx = angleX, ry = angleY, rz = angleZ) => {
      // 3D Rotations
      // Y-axis
      let x1 = x * Math.cos(ry) + z * Math.sin(ry)
      let y1 = y
      let z1 = -x * Math.sin(ry) + z * Math.cos(ry)

      // X-axis
      let x2 = x1
      let y2 = y1 * Math.cos(rx) - z1 * Math.sin(rx)
      let z2 = y1 * Math.sin(rx) + z1 * Math.cos(rx)

      // Z-axis
      let x3 = x2 * Math.cos(rz) - y2 * Math.sin(rz)
      let y3 = x2 * Math.sin(rz) + y2 * Math.cos(rz)
      let z3 = z2

      const fov = 220
      const dist = 3.2
      const scale = fov / (dist + z3)
      return {
        px: width / 2 + x3 * scale,
        py: height / 2 + y3 * scale,
        scale,
        z: z3,
      }
    }

    const render = () => {
      time += 0.02
      targetX += (mouseY * 0.6 - targetX) * 0.05
      targetY += (mouseX * 0.6 - targetY) * 0.05

      angleX = targetX + Math.sin(time * 0.4) * 0.2
      angleY = targetY + time * 0.4
      angleZ = Math.cos(time * 0.3) * 0.15

      ctx.clearRect(0, 0, width, height)

      // Core Red Glow Gradient
      const glowGrad = ctx.createRadialGradient(width / 2, height / 2, 2, width / 2, height / 2, 90)
      glowGrad.addColorStop(0, 'rgba(255, 0, 0, 0.4)')
      glowGrad.addColorStop(0.4, 'rgba(255, 0, 0, 0.12)')
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = glowGrad
      ctx.fillRect(0, 0, width, height)

      // Draw Outer Gyro Ring 1 (White Accent)
      ctx.lineWidth = 1
      const projRing1 = ring1Points.map(([x, y, z]) => project(x, y, z, angleX * 0.5, angleY + time * 0.2, angleZ))
      ctx.beginPath()
      projRing1.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.px, p.py)
        else ctx.lineTo(p.px, p.py)
      })
      ctx.closePath()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)'
      ctx.stroke()

      // Draw Outer Gyro Ring 2 (Red Accent)
      const projRing2 = ring2Points.map(([x, y, z]) => project(x, y, z, angleX + time * 0.3, angleY * 0.5, angleZ))
      ctx.beginPath()
      projRing2.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.px, p.py)
        else ctx.lineTo(p.px, p.py)
      })
      ctx.closePath()
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)'
      ctx.stroke()

      // Project & Draw 3D Icosahedron Core
      const projIcosa = rawVertices.map(([x, y, z]) => project(x * 0.95, y * 0.95, z * 0.95))

      // Edges
      edges.forEach(([i, j]) => {
        const p1 = projIcosa[i]
        const p2 = projIcosa[j]
        const opacity = Math.min(1, Math.max(0.2, (p1.z + p2.z) / 2 + 1.2))

        ctx.beginPath()
        ctx.moveTo(p1.px, p1.py)
        ctx.lineTo(p2.px, p2.py)
        ctx.strokeStyle = (i + j) % 2 === 0 ? `rgba(255, 0, 0, ${opacity * 0.9})` : `rgba(255, 255, 255, ${opacity * 0.7})`
        ctx.stroke()
      })

      // Vertices (Dots)
      projIcosa.forEach((p, i) => {
        ctx.beginPath()
        ctx.arc(p.px, p.py, i % 2 === 0 ? 3 : 2, 0, Math.PI * 2)
        ctx.fillStyle = i % 2 === 0 ? '#FF0000' : '#FFFFFF'
        ctx.fill()
      })

      animationId = requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      if (!container) return
      width = canvas.width = container.offsetWidth || 300
      height = canvas.height = container.offsetHeight || 260
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '240px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  )
}
