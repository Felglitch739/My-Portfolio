import { useState, useEffect } from 'react'
import { Terminal, Globe, Menu, X } from 'lucide-react'

interface NavbarProps {
  onOpenTerminal: () => void
  lang: 'es' | 'en'
  setLang: (l: 'es' | 'en') => void
}

export default function Navbar({ onOpenTerminal, lang, setLang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '#about-me', label: lang === 'es' ? 'PERFIL' : 'ABOUT' },
    { href: '#skills', label: 'STACK' },
    { href: '#projects', label: lang === 'es' ? 'PROYECTOS' : 'PROJECTS' },
    { href: '#events', label: lang === 'es' ? 'LOGROS' : 'ACHIEVEMENTS' },
    { href: '#human-side', label: lang === 'es' ? 'HUMANO' : 'HUMAN' },
    { href: '#contact', label: lang === 'es' ? 'CONTACTO' : 'CONTACT' },
  ]

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--nav-height)',
        zIndex: 100,
        background: scrolled ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.2s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#"
          className="ndot"
          style={{
            textDecoration: 'none',
            color: 'var(--white)',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--red)',
              display: 'inline-block',
            }}
          />
          FMF <span style={{ color: 'var(--gray-500)', fontWeight: 400 }}>// UTRGV.CS</span>
        </a>

        {/* Desktop Links */}
        <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="ndot"
              style={{
                fontSize: '0.7rem',
                color: 'var(--gray-400)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gray-400)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={onOpenTerminal}
            className="mono-tag mono-tag-red"
            style={{ cursor: 'pointer' }}
            title="Open Hardware Terminal"
          >
            <Terminal size={12} /> CONSOLE
          </button>

          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="mono-tag"
            style={{ cursor: 'pointer', background: 'transparent' }}
          >
            <Globe size={12} /> {lang.toUpperCase()}
          </button>

          <button
            className="hide-desktop"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'transparent', border: 'none', color: 'var(--white)', cursor: 'pointer' }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            background: 'rgba(10, 10, 12, 0.98)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="ndot"
              onClick={() => setMobileOpen(false)}
              style={{
                color: 'var(--white)',
                textDecoration: 'none',
                fontSize: '1rem',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
