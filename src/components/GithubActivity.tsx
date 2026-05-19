import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

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
            <Github size={13} /> &nbsp; GitHub Activity
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
