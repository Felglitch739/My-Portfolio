import { useEffect, useRef } from 'react'

export default function Hardware3DChip() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Dynamic import of Three.js or Canvas 3D rendering
    let animationId: number
    let width = container.offsetWidth || 300
    let height = container.offsetHeight || 300

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

    // Pointer tracking for 3D rotation
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }

    window.addEventListener('mousemove', handleMouseMove)

    let angleX = 0
    let angleY = 0
    let time = 0

    // 3D Cube & Circuit Ring Geometry Nodes
    const cubeVertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1],  [1, -1, 1],  [1, 1, 1],  [-1, 1, 1],
    ]

    const cubeEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Back face
      [4, 5], [5, 6], [6, 7], [7, 4], // Front face
      [0, 4], [1, 5], [2, 6], [3, 7], // Connecting edges
    ]

    // Orbital particles
    const particleCount = 28
    const particles = Array.from({ length: particleCount }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      radius: 70 + Math.random() * 50,
      speed: (Math.random() - 0.5) * 0.03,
      y: (Math.random() - 0.5) * 60,
    }))

    const project = (x: number, y: number, z: number) => {
      // 3D Rotation matrices
      const radX = angleX
      const radY = angleY

      // Rotate Y
      const x1 = x * Math.cos(radY) + z * Math.sin(radY)
      const y1 = y
      const z1 = -x * Math.sin(radY) + z * Math.cos(radY)

      // Rotate X
      const x2 = x1
      const y2 = y1 * Math.cos(radX) - z1 * Math.sin(radX)
      const z2 = y1 * Math.sin(radX) + z1 * Math.cos(radX)

      // Perspective projection
      const distance = 3.5
      const fov = 160
      const scale = fov / (distance + z2)
      return {
        px: width / 2 + x2 * scale * 35,
        py: height / 2 + y2 * scale * 35,
        scale,
        z: z2,
      }
    }

    const render = () => {
      time += 0.02
      targetX += (mouseY * 0.5 - targetX) * 0.05
      targetY += (mouseX * 0.5 - targetY) * 0.05

      angleX = targetX + Math.sin(time * 0.5) * 0.1
      angleY = targetY + time * 0.3

      ctx.clearRect(0, 0, width, height)

      // Draw 3D Core Red Glow
      const glowGrad = ctx.createRadialGradient(width / 2, height / 2, 5, width / 2, height / 2, 100)
      glowGrad.addColorStop(0, 'rgba(255, 0, 0, 0.35)')
      glowGrad.addColorStop(0.5, 'rgba(255, 0, 0, 0.08)')
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = glowGrad
      ctx.fillRect(0, 0, width, height)

      // Project vertices
      const projected = cubeVertices.map(([x, y, z]) => project(x, y, z))

      // Draw 3D Outer Box Edges (Monochrome + Red LED Accent)
      ctx.lineWidth = 1.5
      cubeEdges.forEach(([i, j]) => {
        const p1 = projected[i]
        const p2 = projected[j]

        ctx.beginPath()
        ctx.moveTo(p1.px, p1.py)
        ctx.lineTo(p2.px, p2.py)
        ctx.strokeStyle = (i + j) % 2 === 0 ? 'rgba(255, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.4)'
        ctx.stroke()
      })

      // Draw 3D Outer Box Vertices (Dots)
      projected.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.px, p.py, 3, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
      })

      // Draw Inner Hardware Core (Red LED Processor Chip)
      const coreSize = 0.5
      const innerVertices = cubeVertices.map(([x, y, z]) => project(x * coreSize, y * coreSize, z * coreSize))
      ctx.lineWidth = 1
      cubeEdges.forEach(([i, j]) => {
        const p1 = innerVertices[i]
        const p2 = innerVertices[j]
        ctx.beginPath()
        ctx.moveTo(p1.px, p1.py)
        ctx.lineTo(p2.px, p2.py)
        ctx.strokeStyle = '#FF0000'
        ctx.stroke()
      })

      // Draw Orbital 3D Particles
      particles.forEach((p) => {
        p.angle += p.speed
        const px = Math.cos(p.angle) * p.radius * 0.02
        const pz = Math.sin(p.angle) * p.radius * 0.02
        const py = p.y * 0.02

        const proj = project(px, py, pz)
        ctx.beginPath()
        ctx.arc(proj.px, proj.py, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)'
        ctx.fill()
      })

      animationId = requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      if (!container) return
      width = canvas.width = container.offsetWidth || 300
      height = canvas.height = container.offsetHeight || 300
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
