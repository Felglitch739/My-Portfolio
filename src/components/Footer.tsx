import { Terminal, Heart } from 'lucide-react'

interface FooterProps {
  lang?: 'es' | 'en'
}

export default function Footer({ lang = 'es' }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: '#040814',
        padding: '3rem 1.5rem',
        position: 'relative',
        zIndex: 1,
        fontSize: '0.88rem',
        color: '#64748b',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '1rem', marginBottom: '0.2rem' }}>
            FÉLIX E. MARTINEZ FLORES
          </div>
          <div>Computer Science Student @ UTRGV • Full-Stack & Hardware Hacker</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="#about-me" style={{ color: '#94a3b8', textDecoration: 'none' }}>
            {lang === 'es' ? 'Sobre Mí' : 'About'}
          </a>
          <a href="#skills" style={{ color: '#94a3b8', textDecoration: 'none' }}>
            {lang === 'es' ? 'Tech Vault' : 'Skills'}
          </a>
          <a href="#projects" style={{ color: '#94a3b8', textDecoration: 'none' }}>
            {lang === 'es' ? 'Proyectos' : 'Projects'}
          </a>
          <a href="#human-side" style={{ color: '#94a3b8', textDecoration: 'none' }}>
            {lang === 'es' ? 'Lado Humano' : 'Personal'}
          </a>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div>© {currentYear} Félix E. Martinez Flores.</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--cyan)', fontFamily: 'monospace', marginTop: '0.2rem' }}>
            [SYS_STATUS: 🟢 OPERATIONAL]
          </div>
        </div>
      </div>
    </footer>
  )
}
