import { motion, useScroll, useTransform } from 'framer-motion'

export default function Floating3DElements() {
  const { scrollYProgress } = useScroll()

  // Staggered parallax scroll speeds
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -900])
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -550])
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -280])
  const yReverse = useTransform(scrollYProgress, [0, 1], [0, 450])

  const symbols = [
    // ----------------------------------------------------
    // BACKGROUND ELEMENTS (Behind cards, Z: -240px to -50px)
    // ----------------------------------------------------
    { text: 'FÉLIX E. MARTINEZ', top: '6%', left: '2%', z: -180, y: ySlow, color: 'rgba(255, 0, 0, 0.45)', isBg: true, dur: 11, delay: 0 },
    { text: 'UTRGV CS STUDENT', top: '14%', right: '5%', z: -120, y: yMid, color: 'rgba(255, 255, 255, 0.25)', isBg: true, dur: 9, delay: 1 },
    { text: '{ COMPUTER SCIENCE }', top: '25%', left: '20%', z: -220, y: yFast, color: 'rgba(255, 255, 255, 0.2)', isBg: true, dur: 13, delay: 2 },
    { text: 'GYM & FITNESS 🏋️‍♂️', top: '38%', left: '8%', z: -160, y: yMid, color: 'rgba(255, 255, 255, 0.3)', isBg: true, dur: 10, delay: 0.5 },
    { text: 'BILLIARDS 🎱', top: '45%', right: '12%', z: -140, y: ySlow, color: 'rgba(255, 0, 0, 0.4)', isBg: true, dur: 8, delay: 1.5 },
    { text: 'AURA FIT // KRONO BOOK', top: '58%', left: '15%', z: -200, y: yFast, color: 'rgba(255, 255, 255, 0.22)', isBg: true, dur: 12, delay: 0 },
    { text: 'MATAMOROS / BROWNSVILLE', top: '72%', right: '8%', z: -150, y: yMid, color: 'rgba(255, 0, 0, 0.35)', isBg: true, dur: 10, delay: 2 },
    { text: '0101010101', top: '88%', left: '25%', z: -250, y: yReverse, color: 'rgba(255, 255, 255, 0.15)', isBg: true, dur: 14, delay: 1 },

    // ----------------------------------------------------
    // FOREGROUND & MIDGROUND ELEMENTS (Floating in 3D Space)
    // ----------------------------------------------------
    { text: '</>', top: '10%', right: '8%', z: 140, y: yFast, color: 'var(--red)', isBg: false, dur: 7, delay: 0 },
    { text: 'SOFTWARE ENGINEER', top: '20%', left: '5%', z: 90, y: yMid, color: 'var(--white)', isBg: false, dur: 8, delay: 0.8 },
    { text: 'REACT NATIVE & AI', top: '32%', right: '4%', z: 160, y: yFast, color: 'var(--red)', isBg: false, dur: 6.5, delay: 1.2 },
    { text: 'IEEE // 24H HACKATHON', top: '64%', left: '3%', z: 130, y: yMid, color: 'var(--white)', isBg: false, dur: 9.5, delay: 0 },
    { text: 'BUILD PA\'L NORTE', top: '80%', right: '3%', z: 110, y: ySlow, color: 'var(--red)', isBg: false, dur: 8.5, delay: 0.4 },
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
            fontSize: s.isBg ? 'clamp(1rem, 2.5vw, 1.8rem)' : 'clamp(0.8rem, 1.5vw, 1.2rem)',
            color: s.color,
            textShadow: s.color.includes('var(--red)') || s.color.includes('255, 0, 0')
              ? '0 0 20px rgba(255, 0, 0, 0.7)'
              : 'none',
            letterSpacing: '0.12em',
            opacity: s.isBg ? 0.35 : 0.75,
            filter: s.isBg ? 'blur(1px)' : 'none',
            willChange: 'transform',
          }}
          animate={{
            rotateX: [0, 25, -20, 0],
            rotateY: [0, -30, 25, 0],
            rotateZ: [0, 15, -15, 0],
            x: [0, 25, -20, 0],
            y: [0, -20, 25, 0],
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
