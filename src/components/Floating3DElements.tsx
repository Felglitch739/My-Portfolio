import { motion, useScroll, useTransform } from 'framer-motion'

export default function Floating3DElements() {
  const { scrollYProgress } = useScroll()

  // Parallax Z-movements for floating 3D ambient text badges
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -350])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -650])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -500])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -240])

  const symbols = [
    { text: '</>', top: '12%', left: '4%', z: 60, y: y1, rot: rotate1, color: 'var(--red)' },
    { text: '010101', top: '28%', right: '3%', z: 120, y: y2, rot: rotate2, color: 'rgba(255, 255, 255, 0.25)' },
    { text: '{ CORE }', top: '48%', left: '2%', z: 90, y: y3, rot: rotate1, color: 'rgba(255, 0, 0, 0.4)' },
    { text: 'IEEE // 24H', top: '72%', right: '4%', z: 140, y: y1, rot: rotate2, color: 'var(--white)' },
    { text: 'BUILD PA\'L NORTE', top: '88%', left: '5%', z: 80, y: y2, rot: rotate1, color: 'rgba(255, 255, 255, 0.3)' },
  ]

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        overflow: 'hidden',
      }}
    >
      {symbols.map((s, idx) => (
        <motion.div
          key={idx}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            right: s.right,
            y: s.y,
            rotateZ: s.rot,
            transform: `translateZ(${s.z}px)`,
            fontFamily: 'var(--font-ndot)',
            fontSize: 'clamp(0.8rem, 1.5vw, 1.2rem)',
            color: s.color,
            textShadow: s.color.includes('red') ? '0 0 15px rgba(255, 0, 0, 0.6)' : 'none',
            letterSpacing: '0.1em',
            opacity: 0.6,
            willChange: 'transform',
          }}
        >
          {s.text}
        </motion.div>
      ))}
    </div>
  )
}
