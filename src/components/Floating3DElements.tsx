import { motion, useScroll, useTransform } from 'framer-motion'

export default function Floating3DElements() {
  const { scrollYProgress } = useScroll()

  // Multiple staggered Parallax Z-movements for 3D depth field
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -850])
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -500])
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -250])
  const yReverse = useTransform(scrollYProgress, [0, 1], [0, 400])

  const rotateFast = useTransform(scrollYProgress, [0, 1], [0, 360])
  const rotateSlow = useTransform(scrollYProgress, [0, 1], [0, -180])

  const symbols = [
    // Top Hero area
    { text: 'FÉLIX M.', top: '8%', left: '3%', z: 140, y: yFast, rot: rotateSlow, color: 'var(--red)' },
    { text: 'UTRGV CS', top: '15%', right: '4%', z: 90, y: yMid, rot: rotateFast, color: 'var(--white)' },
    { text: '</>', top: '22%', left: '6%', z: 60, y: ySlow, rot: rotateSlow, color: 'rgba(255, 0, 0, 0.7)' },
    
    // Middle About / Tech section
    { text: 'GYM & FITNESS 🏋️‍♂️', top: '35%', right: '5%', z: 130, y: yFast, rot: rotateSlow, color: 'rgba(255, 255, 255, 0.35)' },
    { text: 'BILLIARDS 🎱', top: '42%', left: '2%', z: 110, y: yMid, rot: rotateFast, color: 'var(--red)' },
    { text: 'FULL-STACK ENGINEER', top: '48%', right: '3%', z: 70, y: yReverse, rot: rotateSlow, color: 'rgba(255, 255, 255, 0.25)' },
    { text: 'REACT NATIVE', top: '55%', left: '4%', z: 150, y: yFast, rot: rotateFast, color: 'var(--white)' },

    // Projects / Achievements section
    { text: 'AURAFIT', top: '62%', right: '6%', z: 100, y: yMid, rot: rotateSlow, color: 'rgba(255, 0, 0, 0.8)' },
    { text: 'KRONOBOOK', top: '68%', left: '3%', z: 120, y: ySlow, rot: rotateFast, color: 'rgba(255, 255, 255, 0.3)' },
    { text: 'IEEE // 24H HACKATHON', top: '75%', right: '4%', z: 160, y: yFast, rot: rotateSlow, color: 'var(--red)' },
    { text: 'BUILD PA\'L NORTE', top: '82%', left: '5%', z: 80, y: yMid, rot: rotateFast, color: 'rgba(255, 255, 255, 0.4)' },

    // Footer / Contact section
    { text: 'BROWNSVILLE / MATAMOROS', top: '90%', right: '5%', z: 110, y: ySlow, rot: rotateSlow, color: 'rgba(255, 0, 0, 0.6)' },
    { text: '01010101', top: '95%', left: '4%', z: 140, y: yFast, rot: rotateFast, color: 'rgba(255, 255, 255, 0.2)' },
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
            fontSize: 'clamp(0.75rem, 1.4vw, 1.15rem)',
            color: s.color,
            textShadow: s.color.includes('red') ? '0 0 18px rgba(255, 0, 0, 0.7)' : 'none',
            letterSpacing: '0.12em',
            opacity: 0.7,
            willChange: 'transform',
          }}
        >
          {s.text}
        </motion.div>
      ))}
    </div>
  )
}
