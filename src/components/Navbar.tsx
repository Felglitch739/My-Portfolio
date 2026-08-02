import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Globe, Menu, X, Sparkles } from 'lucide-react'

interface NavbarProps {
  onOpenTerminal: () => void
  lang: 'es' | 'en'
  setLang: (lang: 'es' | 'en') => void
}

export default function Navbar({ onOpenTerminal, lang, setLang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#about-me', label: lang === 'es' ? 'Sobre Mí' : 'About' },
    { href: '#skills', label: lang === 'es' ? 'Tech Vault' : 'Skills' },
    { href: '#projects', label: lang === 'es' ? 'Proyectos' : 'Projects' },
    { href: '#events', label: lang === 'es' ? 'Comunidad & Logros' : 'Achievements' },
    { href: '#human-side', label: lang === 'es' ? 'Lado Humano' : 'Personal' },
    { href: '#contact', label: lang === 'es' ? 'Contacto' : 'Contact' },
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
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(2, 8, 23, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0 1.5rem',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: '1rem',
            color: '#f8fafc',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--cyan-dim), var(--violet-dim))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 0 12px var(--cyan-glow)',
            }}
          >
            F
          </div>
          <span>
            FÉLIX_MARTÍNEZ <span style={{ color: 'var(--cyan)', fontSize: '0.8rem' }}>// CS_UTRGV</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover-underline"
              style={{
                color: '#94a3b8',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f8fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          {/* Terminal Launcher */}
          <button
            onClick={onOpenTerminal}
            style={{
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: 'var(--cyan)',
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s',
            }}
            title="Open Interactive Cyber-Terminal"
          >
            <Terminal size={15} />
            <span className="desktop-only">Console</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#f8fafc',
              padding: '0.45rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              fontFamily: 'monospace',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            <Globe size={14} />
            {lang.toUpperCase()}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#f8fafc',
              cursor: 'pointer',
              padding: '0.4rem',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            background: 'rgba(2, 8, 23, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#f8fafc',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
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
