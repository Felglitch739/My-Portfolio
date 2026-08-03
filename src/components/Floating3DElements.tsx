import { motion, useScroll, useTransform } from 'framer-motion'

export default function Floating3DElements() {
  const { scrollYProgress } = useScroll()

  // Gentle, subtle parallax scroll speeds
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -450])
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -280])
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -140])

  const symbols = [
    // Background Elements (Softly floating behind cards)
    { text: 'FÉLIX E. MARTINEZ', top: '7%', left: '3%', z: -160, y: ySlow, color: 'rgba(255, 0, 0, 0.35)', isBg: true, dur: 18, delay: 0 },
    { text: 'UTRGV CS STUDENT', top: '16%', right: '5%', z: -120, y: yMid, color: 'rgba(255, 255, 255, 0.2)', isBg: true, dur: 22, delay: 2 },
    { text: 'GYM & FITNESS 🏋️‍♂️', top: '38%', left: '6%', z: -140, y: yMid, color: 'rgba(255, 255, 255, 0.22)', isBg: true, dur: 20, delay: 1 },
    { text: 'BILLIARDS 8-BALL 🎱', top: '46%', right: '8%', z: -130, y: ySlow, color: 'rgba(255, 0, 0, 0.35)', isBg: true, dur: 24, delay: 3 },
    { text: 'MATAMOROS / BROWNSVILLE', top: '75%', right: '6%', z: -150, y: yMid, color: 'rgba(255, 0, 0, 0.3)', isBg: true, dur: 19, delay: 2 },

    // Foreground / Midground Elements (Subtle front depth)
    { text: '</>', top: '10%', right: '8%', z: 90, y: yFast, color: 'var(--red)', isBg: false, dur: 16, delay: 0 },
    { text: 'SOFTWARE ENGINEER', top: '22%', left: '5%', z: 60, y: yMid, color: 'rgba(255, 255, 255, 0.7)', isBg: false, dur: 20, delay: 1 },
    { text: 'REACT NATIVE & AI', top: '34%', right: '4%', z: 100, y: yFast, color: 'var(--red)', isBg: false, dur: 17, delay: 2 },
    { text: 'IEEE // 24H HACKATHON', top: '65%', left: '4%', z: 80, y: yMid, color: 'rgba(255, 255, 255, 0.65)', isBg: false, dur: 21, delay: 0 },
    { text: 'BUILD PA\'L NORTE', top: '82%', right: '4%', z: 70, y: ySlow, color: 'var(--red)', isBg: false, dur: 19, delay: 1.5 },
  ]

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        perspective: '1200px',
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
            transform: `translateZ(${s.z}px)`,
            fontFamily: 'var(--font-ndot)',
            fontSize: s.isBg ? 'clamp(0.95rem, 2vw, 1.5rem)' : 'clamp(0.78rem, 1.3vw, 1.1rem)',
            color: s.color,
            textShadow: s.color.includes('var(--red)') || s.color.includes('255, 0, 0')
              ? '0 0 15px rgba(255, 0, 0, 0.5)'
              : 'none',
            letterSpacing: '0.12em',
            opacity: s.isBg ? 0.3 : 0.65,
            filter: s.isBg ? 'blur(1px)' : 'none',
            willChange: 'transform',
          }}
          animate={{
            rotateX: [0, 8, -6, 0],
            rotateY: [0, -10, 8, 0],
            rotateZ: [0, 5, -5, 0],
            x: [0, 10, -10, 0],
            y: [0, -8, 10, 0],
          }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: s.delay,
          }}
        >
          {s.text}
        </motion.div>
      ))}
    </div>
  )
}
