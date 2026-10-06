import { ArrowDownRight, ArrowUpRight, Download } from 'lucide-react'
import Hardware3DChip from './Hardware3DChip'

export default function Hero({ lang = 'es' }: { lang?: 'es' | 'en' }) {
  const es = lang === 'es'
  return (
    <section id="hero" className="section hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="section-label">01 // {es ? 'SOFTWARE, HARDWARE Y COMUNIDAD' : 'SOFTWARE, HARDWARE & COMMUNITY'}</span>
            <h1>Félix<br /><span>Martínez.</span></h1>
            <p className="hero-intro">{es ? 'Aprendo construyendo.' : 'Learning by building.'}</p>
            <p className="body-text hero-description">{es
              ? 'Soy estudiante de Computer Science en UTRGV. Desarrollo aplicaciones web y móviles, conecto software con hardware y convierto ideas en proyectos que puedo compartir.'
              : 'I’m a Computer Science student at UTRGV. I develop web and mobile apps, connect software with hardware, and turn ideas into projects I can share.'}</p>
            <a className="hero-role" href="#events">Founder & CPO <span>@ Build Pa’l Norte</span> <ArrowUpRight size={15} /></a>
            <div className="hero-actions">
              <a className="btn-bento btn-bento-primary" href="#projects">{es ? 'Ver mis proyectos' : 'Explore my work'} <ArrowDownRight size={16} /></a>
              <a className="btn-bento btn-bento-outline" href="#contact">{es ? 'Hablemos' : 'Let’s talk'} <ArrowUpRight size={16} /></a>
              <a className="hero-resume" href="/Felix_Martinez_Resume.pdf" target="_blank" rel="noreferrer"><Download size={14} />{es ? 'Ver CV' : 'View resume'}</a>
            </div>
          </div>
          <aside className="hero-core" aria-label={es ? 'Exploración de hardware' : 'Hardware exploration'}>
            <div className="core-header"><span className="ndot">FMF / BUILD LOG</span><span className="core-dot" aria-hidden="true" /></div>
            <div className="core-visual" aria-hidden="true"><Hardware3DChip /></div>
            <div className="core-caption"><span className="mono-tag">WEB + MOBILE + IoT</span><p>{es ? 'Del código a lo tangible.' : 'From code to something tangible.'}</p></div>
            <div className="core-footer"><span>UTRGV // COMPUTER SCIENCE</span><span>MATAMOROS ↔ BROWNSVILLE</span></div>
          </aside>
        </div>
        <div className="hero-bottom"><span>{es ? 'PROYECTOS SELECCIONADOS ↓' : 'SELECTED WORK ↓'}</span><span>{es ? 'Construyendo desde la frontera.' : 'Building from the border.'}</span></div>
      </div>
    </section>
  )
}
