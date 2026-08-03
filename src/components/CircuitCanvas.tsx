import { useEffect, useRef } from 'react'

interface Particle3D {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  radius: number
  pulse: number
}

export default function CircuitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // 3D Nodes & Spatial Depth Setup
    const isMobile = width < 768
    const nodeCount = Math.max(isMobile ? 20 : 55, Math.floor((width * height) / (isMobile ? 50000 : 25000)))
    const nodes: Particle3D[] = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 + 100,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 1.8 + 1,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Interactive pointer & Scroll tracking
    let pointerX = width / 2
    let pointerY = height / 2
    let lastScrollY = window.scrollY
    let scrollSpeed = 0

    const handleMouseMove = (e: MouseEvent) => {
      pointerX = e.clientX
      pointerY = e.clientY
    }

    const handleScroll = () => {
      const currentScroll = window.scrollY
      scrollSpeed = (currentScroll - lastScrollY) * 0.15
      lastScrollY = currentScroll
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })

    const fov = 400

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Decay scroll speed effect
      scrollSpeed *= 0.92

      const centerX = width / 2
      const centerY = height / 2

      // Draw 3D Spatial Grid Lines
      ctx.lineWidth = 0.5

      // Render 3D Nodes & Connective Network Traces
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]

        // Update 3D Positions (Z moves with scroll speed for 3D travel effect)
        n.x += n.vx
        n.y += n.vy
        n.z -= n.vz + scrollSpeed

        // Wrap Z in 3D frustum bounds
        if (n.z < 50) n.z = 900
        if (n.z > 900) n.z = 50

        // Wrap X & Y bounds
        if (Math.abs(n.x) > width) n.x = -n.x
        if (Math.abs(n.y) > height) n.y = -n.y

        // Perspective 3D projection
        const scale = fov / (fov + n.z)
        const px = centerX + n.x * scale
        const py = centerY + n.y * scale

        n.pulse += 0.03
        const currentRadius = n.radius * scale * (1 + Math.sin(n.pulse) * 0.25)
        const opacity = Math.min(1, Math.max(0.1, scale * 1.2))

        // Draw 3D particle node
        ctx.beginPath()
        ctx.arc(px, py, Math.max(0.8, currentRadius), 0, Math.PI * 2)
        ctx.fillStyle = i % 7 === 0 ? `rgba(255, 0, 0, ${opacity})` : `rgba(255, 255, 255, ${opacity * 0.7})`
        ctx.fill()

        // Connect 3D nodes that are spatially close in 3D
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]
          const dx = n.x - n2.x
          const dy = n.y - n2.y
          const dz = n.z - n2.z
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist3D < 160) {
            const scale2 = fov / (fov + n2.z)
            const p2x = centerX + n2.x * scale2
            const p2y = centerY + n2.y * scale2

            const lineOpacity = (1 - dist3D / 160) * opacity * 0.25
            ctx.beginPath()
            ctx.moveTo(px, py)
            ctx.lineTo(p2x, p2y)
            ctx.strokeStyle = (i + j) % 9 === 0 ? `rgba(255, 0, 0, ${lineOpacity})` : `rgba(255, 255, 255, ${lineOpacity * 0.5})`
            ctx.stroke()
          }
        }

        // Pointer 3D attraction vector
        const pDx = px - pointerX
        const pDy = py - pointerY
        const pDist = Math.sqrt(pDx * pDx + pDy * pDy)

        if (pDist < 140) {
          ctx.beginPath()
          ctx.moveTo(px, py)
          ctx.lineTo(pointerX, pointerY)
          ctx.strokeStyle = `rgba(255, 0, 0, ${(1 - pDist / 140) * 0.35})`
          ctx.stroke()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
      }}
    />
  )
}
