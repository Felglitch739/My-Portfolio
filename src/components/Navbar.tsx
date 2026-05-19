import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2 } from 'lucide-react'

const links = [
  { href: '#about',    label: 'About'    },
  { href: '#projects', label: 'Projects' },
  { href: '#events',   label: 'Events'   },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active, setActive]       = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setActive(href)
    setMenuOpen(false)
  }

  const currentLang = new URLSearchParams(window.location.search).get('lang') || 'en'
  const toggleLang = () => {
    const newLang = currentLang === 'en' ? 'es' : 'en'
    window.location.search = `?lang=${newLang}`
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--nav-height)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        background: scrolled
          ? 'rgba(2, 8, 23, 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-glass)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Logo */}
      <motion.a
        href="#"
        whileHover={{ scale: 1.05 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          textDecoration: 'none',
          marginRight: 'auto',
        }}
      >
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '10px',
          background: 'linear-gradient(135deg, var(--cyan-dim), var(--violet-dim))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px var(--cyan-glow)',
        }}>
          <Code2 size={18} color="white" />
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          fontSize: '1.05rem',
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
        }}>
          fm<span style={{ color: 'var(--cyan)' }}>.</span>dev
        </span>
      </motion.a>

      {/* Desktop links */}
      <ul style={{
        display: 'flex',
        listStyle: 'none',
        gap: '2rem',
        alignItems: 'center',
      }}
        className="desktop-nav"
      >
        {links.map((link) => (
          <li key={link.href}>
            <motion.a
              href={link.href}
              className="hover-underline"
              whileHover={{ y: -1 }}
              onClick={() => handleNav(link.href)}
              style={{
                textDecoration: 'none',
                color: active === link.href ? 'var(--cyan)' : 'var(--text-secondary)',
                fontWeight: 500,
                fontSize: '0.95rem',
                transition: 'color 0.2s',
              }}
            >
              {link.label}
            </motion.a>
          </li>
        ))}
        <li>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary"
            style={{ padding: '0.55rem 1.3rem', fontSize: '0.9rem' }}
          >
            Hire me
          </motion.a>
        </li>
        <li>
          <motion.button
            onClick={toggleLang}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '0.55rem 0.8rem',
              fontSize: '0.9rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-glass)',
              borderRadius: '0.75rem',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
            }}
          >
            {currentLang === 'en' ? 'ES' : 'EN'}
          </motion.button>
        </li>
      </ul>

      <div style={{ display: 'none' }} className="mobile-burger">
        <motion.button
          onClick={toggleLang}
          whileTap={{ scale: 0.9 }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            padding: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
          }}
          aria-label="Toggle language"
        >
          {currentLang === 'en' ? 'ES' : 'EN'}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            padding: '0.5rem',
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              top: 'var(--nav-height)',
              left: 0,
              right: 0,
              background: 'rgba(2, 8, 23, 0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border-glass)',
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handleNav(link.href)}
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  )
}
