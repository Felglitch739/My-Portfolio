import { motion } from 'framer-motion'

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
  </svg>
)

export default function GithubActivity() {
  return (
    <section id="github-activity" className="section" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <span className="tag mono" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <GithubIcon size={13} /> &nbsp; GitHub Activity
          </span>
          <h2 className="section-title gradient-text" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>Code Contributions</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card"
          style={{
            padding: '2rem 1rem',
            display: 'flex',
            justifyContent: 'center',
            overflowX: 'auto',
            background: 'var(--bg-card)',
          }}
        >
          <img 
            src="https://ghchart.rshah.org/06b6d4/Felglitch739" 
            alt="Félix's GitHub Activity Chart" 
            style={{ minWidth: '700px', width: '100%', maxWidth: '800px', filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.2))' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
