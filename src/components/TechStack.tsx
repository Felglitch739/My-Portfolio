import { Code2, Smartphone, Database, Cpu, Bot, Terminal } from 'lucide-react'

export default function TechStack({ lang = 'es' }: { lang?: 'es' | 'en' }) {
  const es = lang === 'es'
  const groups = [
    { name: 'Web', icon: Code2, tools: 'React · TypeScript · Vite · Tailwind CSS', projects: 'KronoBook / Gazpacho’s', es: 'Interfaces, navegación y flujos de reservas.', en: 'Interfaces, navigation, and booking flows.' },
    { name: es ? 'Móvil' : 'Mobile', icon: Smartphone, tools: 'React Native · Expo · TypeScript', projects: 'AuraFit / TPH Monitor', es: 'Aplicaciones móviles y conexión con dispositivos BLE.', en: 'Mobile apps and connections to BLE devices.' },
    { name: 'Backend', icon: Database, tools: 'Supabase · PostgreSQL · Python · Node.js', projects: 'KronoBook / Family Weather', es: 'Datos, políticas RLS e integraciones con APIs.', en: 'Data, RLS policies, and API integrations.' },
    { name: 'Hardware / IoT', icon: Cpu, tools: 'ESP32 · Arduino · Bluetooth LE · Sensores', projects: 'TPH Monitor', es: 'Lectura de sensores y comunicación entre hardware y software.', en: 'Sensor readings and hardware-to-software communication.' },
    { name: 'CAD / AI', icon: Bot, tools: 'C# · .NET · Revit API · MCP', projects: 'Revit CAD / BIM', es: 'Extensiones y consultas de modelos BIM con IA.', en: 'Extensions and AI-assisted BIM model queries.' },
    { name: es ? 'Herramientas' : 'Tools', icon: Terminal, tools: 'Git · GitHub · Vercel · Linux', projects: es ? 'Flujo de desarrollo' : 'Development workflow', es: 'Control de versiones, despliegue y automatización.', en: 'Version control, deployment, and automation.' },
  ]
  return <section id="skills" className="section">
    <div className="container">
      <span className="section-label">04 // STACK</span>
      <div className="section-heading"><h2 className="display-title">{es ? 'Herramientas, en contexto.' : 'Tools, in context.'}</h2><p className="body-text">{es ? 'Las tecnologías que uso y dónde las he aplicado. Abre un área para ver más.' : 'The technologies I use and where I’ve applied them. Open an area to learn more.'}</p></div>
      <div className="stack-grid">{groups.map(group => <details key={group.name} className="stack-card">
        <summary><group.icon size={21} aria-hidden="true" /><span>{group.name}</span><span className="stack-expand" aria-hidden="true">+</span></summary>
        <p className="stack-tools">{group.tools}</p>
        <div className="stack-context"><p className="body-text">{es ? group.es : group.en}</p><a href="#projects" className="text-link">{group.projects} ↗</a></div>
      </details>)}</div>
    </div>
  </section>
}
