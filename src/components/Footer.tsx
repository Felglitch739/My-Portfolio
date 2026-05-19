import { Code2, Heart } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        padding: '2.5rem 1.5rem',
        borderTop: '1px solid var(--border-glass)',
        background: 'rgba(2, 8, 23, 0.8)',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--cyan-dim), var(--violet-dim))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Code2 size={15} color="white" />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}
          >
            fm<span style={{ color: 'var(--cyan)' }}>.</span>dev
          </span>
        </div>

        {/* Copyright */}
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          © {year} Félix Martínez — Built with{' '}
          <Heart size={13} style={{ color: 'var(--pink)' }} fill="var(--pink)" />
          {' '}in React & Framer Motion
        </p>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          {['#about', '#projects', '#events', '#contact'].map((href) => (
            <a
              key={href}
              href={href}
              className="hover-underline"
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                textTransform: 'capitalize',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = 'var(--cyan)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')
              }
            >
              {href.replace('#', '')}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
