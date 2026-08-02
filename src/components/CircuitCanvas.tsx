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

    // Node & Trace generation for engineering grid
    const nodeCount = Math.floor((width * height) / 30000)
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; pulse: number }[] = []

    for (let i = 0; i < Math.max(35, nodeCount); i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.4 + 1,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Interactive pointer (Mouse + Touch support for Mobile)
    let pointerX = -1000
    let pointerY = -1000
    let isTouching = false

    const handleMouseMove = (e: MouseEvent) => {
      pointerX = e.clientX
      pointerY = e.clientY
      isTouching = false
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointerX = e.touches[0].clientX
        pointerY = e.touches[0].clientY
        isTouching = true
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointerX = e.touches[0].clientX
        pointerY = e.touches[0].clientY
        isTouching = true
      }
    }

    const handleTouchEnd = () => {
      isTouching = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    let time = 0

    const render = () => {
      time += 0.02
      ctx.clearRect(0, 0, width, height)

      // Ambient breathing glow pulse for mobile idle state
      const ambientX = isTouching || pointerX > 0 
        ? pointerX 
        : width / 2 + Math.cos(time * 0.5) * (width * 0.25)
      const ambientY = isTouching || pointerY > 0 
        ? pointerY 
        : height / 2 + Math.sin(time * 0.7) * (height * 0.2)

      // Soft ambient light aura (Pure Red #FF0000 accent)
      const auraGradient = ctx.createRadialGradient(
        ambientX, ambientY, 10,
        ambientX, ambientY, width < 768 ? 220 : 320
      )
      auraGradient.addColorStop(0, 'rgba(255, 0, 0, 0.08)')
      auraGradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.03)')
      auraGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = auraGradient
      ctx.fillRect(0, 0, width, height)

      // Draw engineering grid pattern
      const gridSize = width < 768 ? 40 : 60
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)'
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

        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        node.pulse += 0.03
        const pulseAlpha = (Math.sin(node.pulse) + 1) / 2

        // Pointer distance (mouse or touch)
        const dx = ambientX - node.x
        const dy = ambientY - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const isNearPointer = dist < (width < 768 ? 160 : 220)

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j]
          const distance = Math.hypot(node.x - other.x, node.y - other.y)

          if (distance < (width < 768 ? 110 : 140)) {
            const alpha = (1 - distance / 140) * 0.12 * (isNearPointer ? 2.5 : 1)
            ctx.beginPath()

            // Circuit-style right-angle trace lines
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

            ctx.strokeStyle = isNearPointer
              ? `rgba(255, 0, 0, ${alpha * 1.8})`
              : `rgba(255, 255, 255, ${alpha * 0.8})`
            ctx.lineWidth = isNearPointer ? 1.2 : 0.7
            ctx.stroke()

            // Glowing data pulse on trace
            if ((i + j) % 4 === 0) {
              const pos = (Math.sin(time * 1.5 + i) + 1) / 2
              const px = node.x + (other.x - node.x) * pos
              const py = node.y + (other.y - node.y) * pos
              ctx.beginPath()
              ctx.arc(px, py, 1.2, 0, Math.PI * 2)
              ctx.fillStyle = isNearPointer ? '#FF0000' : 'rgba(255, 255, 255, 0.4)'
              ctx.fill()
            }
          }
        }

        // Draw node dot
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = isNearPointer
          ? `#FF0000`
          : `rgba(255, 255, 255, ${0.2 + pulseAlpha * 0.3})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
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
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
