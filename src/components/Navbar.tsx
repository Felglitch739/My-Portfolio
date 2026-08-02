import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Globe, Menu, X } from 'lucide-react'

interface NavbarProps {
  onOpenTerminal: () => void
  lang: 'es' | 'en'
  setLang: (l: 'es' | 'en') => void
}

export default function Navbar({ onOpenTerminal, lang, setLang }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about-me', label: lang === 'es' ? 'Perfil' : 'Profile' },
    { href: '#skills',   label: lang === 'es' ? 'Stack'  : 'Stack'   },
    { href: '#projects', label: lang === 'es' ? 'Obras'  : 'Work'    },
    { href: '#events',   label: lang === 'es' ? 'Logros' : 'Achievements' },
    { href: '#human-side', label: lang === 'es' ? 'Human' : 'Human'  },
    { href: '#contact',  label: lang === 'es' ? 'Contacto' : 'Contact' },
  ]

  return (
    <>
      <nav className="nav" style={{ opacity: scrolled ? 1 : 0.95 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          {/* Logo */}
          <a href="#" className="nav-logo">
            <span className="nav-logo-dot" />
            FMF
            <span style={{ color: 'var(--gray-600)', fontWeight: 400 }}>.dev</span>
          </a>

          {/* Desktop Nav */}
          <ul className="nav-links hide-mobile">
            {links.map(link => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">{link.label}</a>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Lang toggle */}
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              style={{
                background: 'transparent',
                border: 'var(--border)',
                color: 'var(--gray-400)',
                padding: '0.35rem 0.7rem',
                fontFamily: 'var(--font-dot)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
              className="hide-mobile"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>

            {/* Console button */}
            <button
              onClick={onOpenTerminal}
              style={{
                background: 'transparent',
                border: 'var(--border)',
                color: 'var(--gray-400)',
                padding: '0.35rem 0.9rem',
                fontFamily: 'var(--font-dot)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              className="hide-mobile"
            >
              <Terminal size={12} />
              Console
            </button>

            {/* Mobile toggle */}
            <button
              className="hide-desktop"
              onClick={() => setOpen(!open)}
              style={{ background: 'transparent', border: 'none', color: 'var(--white)', cursor: 'pointer', padding: '0.3rem' }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: 'fixed',
          top: 'var(--nav-height)',
          left: 0, right: 0,
          background: 'var(--black)',
          borderBottom: 'var(--border-strong)',
          zIndex: 99,
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}>
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="nav-link"
              style={{ fontSize: '1.1rem' }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button
              onClick={() => { setLang(lang === 'es' ? 'en' : 'es'); setOpen(false) }}
              style={{ background: 'transparent', border: 'var(--border)', color: 'var(--gray-400)', padding: '0.4rem 0.8rem', fontFamily: 'var(--font-dot)', fontSize: '0.65rem', letterSpacing: '0.15em', cursor: 'pointer' }}
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              onClick={() => { onOpenTerminal(); setOpen(false) }}
              style={{ background: 'transparent', border: 'var(--border)', color: 'var(--gray-400)', padding: '0.4rem 0.8rem', fontFamily: 'var(--font-dot)', fontSize: '0.65rem', letterSpacing: '0.15em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Terminal size={12} /> Console
            </button>
          </div>
        </div>
      )}
    </>
  )
}
