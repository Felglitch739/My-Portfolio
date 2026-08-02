interface FooterProps {
  lang?: 'es' | 'en'
}

export default function Footer({ lang = 'es' }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: '#050505',
        padding: '2.5rem 0',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div className="ndot" style={{ fontSize: '0.9rem', color: 'var(--white)' }}>
            FÉLIX E. MARTINEZ FLORES
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: '0.2rem' }}>
            Full-Stack Software Engineer & Hardware Hacker • UTRGV CS
          </div>
        </div>

        <div className="ndot" style={{ fontSize: '0.75rem', color: 'var(--red)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--red)' }} />
          SYSTEM_STATUS: 🟢 OPERATIONAL
        </div>

        <div className="ndot" style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
          © {currentYear} FMF. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  )
}
