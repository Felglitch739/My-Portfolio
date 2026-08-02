import { useEffect, useRef } from 'react'

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

    // Node & Trace generation
    const nodeCount = Math.floor((width * height) / 35000)
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; pulse: number }[] = []

    for (let i = 0; i < Math.max(30, nodeCount); i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Mouse tracking for interactive glow
    let mouseX = -1000
    let mouseY = -1000

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    let time = 0

    const render = () => {
      time += 0.02
      ctx.clearRect(0, 0, width, height)

      // Draw faint grid pattern
      const gridSize = 60
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.025)'
      ctx.lineWidth = 1

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Draw nodes and connecting trace lines
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Move nodes slowly
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        node.pulse += 0.03
        const pulseAlpha = (Math.sin(node.pulse) + 1) / 2

        // Mouse distance
        const dx = mouseX - node.x
        const dy = mouseY - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const isNearMouse = dist < 180

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j]
          const distance = Math.hypot(node.x - other.x, node.y - other.y)

          if (distance < 140) {
            const alpha = (1 - distance / 140) * 0.15 * (isNearMouse ? 2.5 : 1)
            ctx.beginPath()
            
            // Draw circuit-style right-angle connections occasionally
            if ((i + j) % 3 === 0) {
              const midX = (node.x + other.x) / 2
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(midX, node.y)
              ctx.lineTo(midX, other.y)
              ctx.lineTo(other.x, other.y)
            } else {
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(other.x, other.y)
            }

            ctx.strokeStyle = isNearMouse
              ? `rgba(6, 182, 212, ${alpha * 1.5})`
              : `rgba(56, 189, 248, ${alpha})`
            ctx.lineWidth = isNearMouse ? 1.2 : 0.8
            ctx.stroke()

            // Draw glowing data pulse on trace
            if ((i + j) % 5 === 0) {
              const pos = (Math.sin(time + i) + 1) / 2
              const px = node.x + (other.x - node.x) * pos
              const py = node.y + (other.y - node.y) * pos
              ctx.beginPath()
              ctx.arc(px, py, 1.2, 0, Math.PI * 2)
              ctx.fillStyle = 'rgba(56, 189, 248, 0.6)'
              ctx.fill()
            }
          }
        }

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = isNearMouse
          ? `rgba(34, 211, 238, ${0.8 + pulseAlpha * 0.2})`
          : `rgba(56, 189, 248, ${0.3 + pulseAlpha * 0.3})`
        ctx.fill()

        if (isNearMouse) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(6, 182, 212, 0.15)'
          ctx.fill()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
