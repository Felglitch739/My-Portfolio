export default function Footer({ lang = 'es' }: { lang?: 'es' | 'en' }) {
  const es = lang === 'es'
  return <footer className="site-footer"><div className="container footer-inner">
    <div><a className="nav-brand" href="#hero">FMF /</a><p className="body-text">{es ? 'Software, hardware y comunidad.' : 'Software, hardware & community.'}</p></div>
    <a className="text-link" href="#human-side">{es ? 'Explorar el laboratorio' : 'Explore the lab'} ↗</a>
    <p>© {new Date().getFullYear()} Félix Martínez</p>
  </div></footer>
}
