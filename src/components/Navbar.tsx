import { useState } from 'react'
import { Globe, Menu, Terminal, X } from 'lucide-react'
import AccessibleDialog from './AccessibleDialog'

export default function Navbar({ lang, setLang, onOpenTerminal }: {
  lang: 'es' | 'en'
  setLang: (lang: 'es' | 'en') => void
  onOpenTerminal: () => void
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const es = lang === 'es'
  const links = [
    { href: '#projects', label: es ? 'Proyectos' : 'Work' },
    { href: '#about-me', label: es ? 'Sobre mí' : 'About' },
    { href: '#skills', label: 'Stack' },
    { href: '#events', label: 'Build Pa’l Norte' },
    { href: '#contact', label: es ? 'Contacto' : 'Contact' },
  ]
  return <>
    <header className="site-header">
      <div className="container nav-inner">
        <a className="nav-brand" href="#hero" aria-label={es ? 'Félix Martínez, inicio' : 'Félix Martínez, home'}><span aria-hidden="true" />FMF<span className="brand-slash">/</span></a>
        <nav className="desktop-nav" aria-label={es ? 'Navegación principal' : 'Main navigation'}>{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
        <div className="nav-actions">
          <button className="icon-button terminal-toggle" onClick={onOpenTerminal} aria-label={es ? 'Abrir terminal' : 'Open terminal'} title={es ? 'Abrir terminal' : 'Open terminal'}><Terminal size={17} /></button>
          <button className="language-toggle" onClick={() => setLang(es ? 'en' : 'es')} aria-label={es ? 'Switch to English' : 'Cambiar a español'}><Globe size={15} />{es ? 'EN' : 'ES'}</button>
          <button className="icon-button mobile-menu-toggle" onClick={() => setMobileOpen(true)} aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={es ? 'Abrir menú' : 'Open menu'}><Menu size={20} /></button>
        </div>
      </div>
    </header>
    <AccessibleDialog open={mobileOpen} onClose={() => setMobileOpen(false)} labelledBy="mobile-navigation-title">
      <div className="dialog-heading"><h2 id="mobile-navigation-title">{es ? 'Navegación' : 'Navigation'}</h2><button className="icon-button" onClick={() => setMobileOpen(false)} aria-label={es ? 'Cerrar menú' : 'Close menu'}><X size={20} /></button></div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label={es ? 'Navegación principal' : 'Main navigation'}>{links.map(link => <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>{link.label}<span aria-hidden="true">↗</span></a>)}</nav>
    </AccessibleDialog>
  </>
}
