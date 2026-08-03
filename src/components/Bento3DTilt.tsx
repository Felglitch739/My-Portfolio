import { useState, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

interface Bento3DTiltProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  intensity?: number
}

export default function Bento3DTilt({
  children,
  className = '',
  style = {},
  intensity = 15,
}: Bento3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })

  // Spring physics for buttery-smooth 3D tilt animations
  const rotateX = useSpring(0, { stiffness: 250, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 250, damping: 20 })
  const scale = useSpring(1, { stiffness: 250, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    // Relative coordinates (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5
    const mouseY = (e.clientY - rect.top) / height - 0.5

    // Calculate 3D rotations
    rotateX.set(-mouseY * intensity * 2)
    rotateY.set(mouseX * intensity * 2)
    scale.set(1.02)

    // Calculate 3D specular light glare reflection position
    setGlarePos({
      x: ((e.clientX - rect.left) / width) * 100,
      y: ((e.clientY - rect.top) / height) * 100,
      opacity: 0.25,
    })
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
    setGlarePos(prev => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
        style={{
          ...style,
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
          position: 'relative',
          overflow: 'hidden',
          willChange: 'transform',
        }}
      >
        {/* 3D Specular Light Reflection Glare Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 10,
            borderRadius: 'inherit',
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 0, 0, 0.15) 30%, transparent 70%)`,
            opacity: glarePos.opacity,
            transition: 'opacity 0.25s ease',
            mixBlendMode: 'overlay',
          }}
        />

        {/* Card Content with 3D Depth Layer */}
        <div
          style={{
            transform: 'translateZ(20px)',
            transformStyle: 'preserve-3d',
            height: '100%',
            width: '100%',
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  )
}
