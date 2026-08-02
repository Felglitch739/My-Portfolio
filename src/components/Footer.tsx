interface FooterProps {
  lang?: 'es' | 'en'
}

export default function Footer({ lang = 'es' }: FooterProps) {
  const year = new Date().getFullYear()
  return (
    <footer style={{
      borderTop: 'var(--border)',
      padding: '2rem 0',
      position: 'relative',
      zIndex: 1,
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--red)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-dot)', fontSize: '0.68rem', letterSpacing: '0.15em', color: 'var(--gray-600)', textTransform: 'uppercase' }}>
            FMF.dev
          </span>
        </div>

        <div style={{ display: 'flex', gap: '2rem' }}>
          {[
            ['#about-me', lang === 'es' ? 'Perfil' : 'Profile'],
            ['#projects', lang === 'es' ? 'Proyectos' : 'Projects'],
            ['#contact',  lang === 'es' ? 'Contacto' : 'Contact'],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              style={{ fontFamily: 'var(--font-dot)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray-700)', textDecoration: 'none' }}
            >
              {label}
            </a>
          ))}
        </div>

        <span style={{ fontFamily: 'var(--font-dot)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--gray-700)' }}>
          © {year} Félix E. Martinez Flores
        </span>
      </div>
    </footer>
  )
}
