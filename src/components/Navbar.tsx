import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Globe, Menu, X, ArrowUpRight } from 'lucide-react'

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileOpen])

  const links = [
    { href: '#about-me', num: '01', label: lang === 'es' ? 'PERFIL & ARQUITECTURA' : 'PROFILE & ARCHITECTURE' },
    { href: '#skills', num: '02', label: lang === 'es' ? 'STACK TÉCNICO' : 'TECH STACK' },
    { href: '#projects', num: '03', label: lang === 'es' ? 'PROYECTOS DESTACADOS' : 'FEATURED PROJECTS' },
    { href: '#events', num: '04', label: lang === 'es' ? 'LOGROS & EVENTOS' : 'ACHIEVEMENTS & EVENTS' },
    { href: '#human-side', num: '05', label: lang === 'es' ? 'FUERA DEL CÓDIGO' : 'BEYOND THE CODE' },
    { href: '#contact', num: '06', label: lang === 'es' ? 'CONTACTO DIRECTO' : 'DIRECT CONTACT' },
  ]

  return (
    <>
      {/* ── DESKTOP & MOBILE FLOATING HEADER ── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0.8rem 1.2rem',
          pointerEvents: 'none', // allow clicks through padding area
        }}
      >
        <div
          className="container"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            background: scrolled ? 'rgba(9, 9, 11, 0.92)' : 'rgba(9, 9, 11, 0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '9999px',
            padding: '0.45rem 0.9rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Brand Logo */}
          <a
            href="#"
            className="ndot"
            style={{
              textDecoration: 'none',
              color: 'var(--white)',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--red)',
                boxShadow: '0 0 10px var(--red)',
                display: 'inline-block',
              }}
            />
            FMF
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hide-mobile" style={{ alignItems: 'center', gap: '1.8rem' }}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="ndot"
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--gray-400)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  letterSpacing: '0.04em',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--white)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gray-400)')}
              >
                {link.num} // {link.label.split(' ')[0]}
              </a>
            ))}
          </nav>

          {/* Desktop & Mobile Action Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
            <button
              onClick={onOpenTerminal}
              className="mono-tag mono-tag-red"
              style={{ cursor: 'pointer', fontSize: '0.65rem', padding: '0.35rem 0.55rem' }}
              title="Open Hardware Terminal"
            >
              <Terminal size={12} /> <span className="hide-mobile">CONSOLE</span>
            </button>

            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="mono-tag"
              style={{ cursor: 'pointer', background: 'rgba(255, 255, 255, 0.05)', fontSize: '0.65rem', padding: '0.35rem 0.55rem' }}
            >
              <Globe size={12} /> {lang.toUpperCase()}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              className="hide-desktop"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: mobileOpen ? 'var(--red)' : 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                color: 'var(--white)',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
              aria-label={mobileOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              title={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── HIGH-END FULLSCREEN MOBILE GLASS DRAWER MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(5, 5, 7, 0.96)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              paddingTop: 'calc(var(--nav-height) + 2.5rem)',
              paddingBottom: '2rem',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflowY: 'auto',
            }}
          >
            {/* Navigation Header */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.8rem' }}>
                <span className="ndot" style={{ fontSize: '0.75rem', color: 'var(--red)' }}>
                  NAVIGATION // FMF_OS
                </span>
                <span className="ndot" style={{ fontSize: '0.65rem', color: 'var(--gray-500)' }}>
                  SELECT SYSTEM MODULE
                </span>
              </div>

              {/* Mobile Navigation List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {links.map((link, idx) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      textDecoration: 'none',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '14px',
                      padding: '1rem 1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'border-color 0.2s ease, background 0.2s ease',
                    }}
                  >
                    <div>
                      <span className="ndot" style={{ fontSize: '0.7rem', color: 'var(--red)', display: 'block', marginBottom: '0.2rem' }}>
                        MODULE_{link.num}
                      </span>
                      <span style={{ fontFamily: 'var(--font-bit)', fontSize: '1.05rem', color: 'var(--white)', fontWeight: 700 }}>
                        {link.label}
                      </span>
                    </div>
                    <ArrowUpRight size={18} color="var(--gray-400)" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Mobile Footer Status */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.2rem', marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="ndot" style={{ fontSize: '0.65rem', color: 'var(--gray-500)' }}>
                  LOCATION: BROWNSVILLE, TX
                </span>
                <span className="ndot" style={{ fontSize: '0.65rem', color: 'var(--white)' }}>
                  UTRGV CS STUDENT
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
