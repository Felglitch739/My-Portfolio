import Bento3DTilt from './Bento3DTilt'

export default function AboutMe({ lang = 'es' }: { lang?: 'es' | 'en' }) {
  const es = lang === 'es'
  return <section id="about-me" className="section">
    <div className="container">
      <span className="section-label">03 // {es ? 'SOBRE MÍ' : 'ABOUT ME'}</span>
      <div className="about-grid">
        <Bento3DTilt className="profile-card">
          <img src="/imagenmia.jpeg" alt="Félix E. Martínez Flores" width={180} height={180} loading="lazy" />
          <h2>Félix E. Martínez Flores</h2><p className="body-text">Computer Science @ UTRGV</p><span className="mono-tag">MATAMOROS / BROWNSVILLE</span>
        </Bento3DTilt>
        <div className="about-copy">
          <h2 className="display-title">{es ? 'Curiosidad que se convierte en proyectos.' : 'Curiosity that turns into projects.'}</h2>
          <p className="body-text">{es ? 'Estudio Ciencias de la Computación en UTRGV y vengo de Matamoros. Me gusta entender cómo funcionan las cosas: desde una interfaz y su base de datos hasta los sensores con los que se comunica una aplicación.' : 'I study Computer Science at UTRGV and come from Matamoros. I enjoy understanding how things work: from an interface and its database to the sensors an app communicates with.'}</p>
          <p className="body-text">{es ? 'He trabajado en aplicaciones web y móviles, integraciones con ESP32 y herramientas para Revit. Cada proyecto me permite probar una idea, resolver problemas y aprender algo que puedo aplicar al siguiente.' : 'I’ve worked on web and mobile apps, ESP32 integrations, and tools for Revit. Each project lets me test an idea, solve problems, and learn something I can apply to the next one.'}</p>
          <p className="body-text">{es ? 'También soy founder y CPO de Build Pa’l Norte. Ahí conectamos talento, tecnología y comunidad para impulsar proyectos desde el norte de México.' : 'I’m also founder and CPO of Build Pa’l Norte, where we connect talent, technology, and community to help projects grow from northern Mexico.'}</p>
          <a className="text-link" href="#events">{es ? 'Más sobre Build Pa’l Norte' : 'More about Build Pa’l Norte'} ↗</a>
        </div>
      </div>
    </div>
  </section>
}
