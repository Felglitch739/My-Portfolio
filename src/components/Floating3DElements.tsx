import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function Floating3DElements() {
  const { scrollYProgress } = useScroll()

  // Physics spring for buttery-smooth scroll tracking with 0 jitter
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  })

  // Gentle, fluid parallax scroll offsets
  const yFast = useTransform(smoothScroll, [0, 1], [0, -400])
  const yMid = useTransform(smoothScroll, [0, 1], [0, -250])
  const ySlow = useTransform(smoothScroll, [0, 1], [0, -120])

  const symbols = [
    // Background Elements (Softly floating behind cards, negative Z)
    { text: 'FÉLIX E. MARTINEZ', top: '8%', left: '3%', z: -150, y: ySlow, color: 'rgba(255, 0, 0, 0.35)', isBg: true, dur: 18, delay: 0 },
    { text: 'UTRGV CS STUDENT', top: '18%', right: '5%', z: -110, y: yMid, color: 'rgba(255, 255, 255, 0.2)', isBg: true, dur: 22, delay: 2 },
    { text: 'GYM & FITNESS 🏋️‍♂️', top: '38%', left: '6%', z: -130, y: yMid, color: 'rgba(255, 255, 255, 0.22)', isBg: true, dur: 20, delay: 1 },
    { text: 'BILLIARDS 8-BALL 🎱', top: '48%', right: '8%', z: -120, y: ySlow, color: 'rgba(255, 0, 0, 0.35)', isBg: true, dur: 24, delay: 3 },
    { text: 'MATAMOROS / BROWNSVILLE', top: '76%', right: '6%', z: -140, y: yMid, color: 'rgba(255, 0, 0, 0.3)', isBg: true, dur: 19, delay: 2 },

    // Foreground / Midground Elements (Subtle front depth)
    { text: '</>', top: '10%', right: '8%', z: 80, y: yFast, color: 'var(--red)', isBg: false, dur: 16, delay: 0 },
    { text: 'SOFTWARE ENGINEER', top: '24%', left: '5%', z: 50, y: yMid, color: 'rgba(255, 255, 255, 0.7)', isBg: false, dur: 20, delay: 1 },
    { text: 'REACT NATIVE & AI', top: '34%', right: '4%', z: 90, y: yFast, color: 'var(--red)', isBg: false, dur: 17, delay: 2 },
    { text: 'IEEE // 24H HACKATHON', top: '66%', left: '4%', z: 70, y: yMid, color: 'rgba(255, 255, 255, 0.65)', isBg: false, dur: 21, delay: 0 },
    { text: 'BUILD PA\'L NORTE', top: '84%', right: '4%', z: 60, y: ySlow, color: 'var(--red)', isBg: false, dur: 19, delay: 1.5 },
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
        /* Outer Motion Container: Handles Scroll Parallax Translation */
        <motion.div
          key={idx}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            right: s.right,
            y: s.y,
            z: s.z,
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
        >
          {/* Inner Motion Container: Handles Organic 3D Floating Drift without Y property conflict */}
          <motion.div
            animate={{
              rotateX: [0, 8, -6, 0],
              rotateY: [0, -10, 8, 0],
              rotateZ: [0, 5, -5, 0],
              translateY: [0, -12, 10, 0],
              translateX: [0, 8, -8, 0],
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
        </motion.div>
      ))}
    </div>
  )
}
