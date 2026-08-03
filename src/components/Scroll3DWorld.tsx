import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface Scroll3DWorldProps {
  children: React.ReactNode
}

export default function Scroll3DWorld({ children }: Scroll3DWorldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll position across the entire page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Smooth scroll spring for natural camera inertia
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  })

  // 3D Camera Animations based on Scroll Progress
  // Camera rotates and sways in 3D space as you scroll through sections
  const cameraRotateX = useTransform(smoothScroll, [0, 0.25, 0.5, 0.75, 1], [0, -3.5, 3.5, -2, 0])
  const cameraRotateY = useTransform(smoothScroll, [0, 0.3, 0.6, 1], [0, 2, -2, 0])
  const cameraZ = useTransform(smoothScroll, [0, 0.5, 1], [0, -30, 0])

  return (
    <div
      ref={containerRef}
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <motion.div
        style={{
          transformStyle: 'preserve-3d',
          rotateX: cameraRotateX,
          rotateY: cameraRotateY,
          translateZ: cameraZ,
          willChange: 'transform',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
