import { useEffect, useRef, useState } from 'react'
import { Copy, Send } from 'lucide-react'

const ACCESS_KEY = '1a2bcea0-20e8-4243-855d-bce0531ef148'

export default function Contact({ lang = 'es' }: { lang?: 'es' | 'en' }) {
  const es = lang === 'es'
  const email = 'felix.martinez08@utrgv.edu'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopyStatus('success')
    } catch { setCopyStatus('error') }
    clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopyStatus('idle'), 3000)
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('botcheck')) return
    data.append('access_key', ACCESS_KEY)
    setIsSubmitting(true)
    setStatus('idle')
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data, signal: AbortSignal.timeout(15000) })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error('Submission failed')
      setStatus('success')
      form.reset()
    } catch { setStatus('error') }
    finally { setIsSubmitting(false) }
  }

  return <section id="contact" className="section">
    <div className="container">
      <span className="section-label">07 // {es ? 'CONTACTO' : 'CONTACT'}</span>
      <div className="section-heading"><h2 className="display-title">{es ? '¿Construimos algo?' : 'Let’s build something.'}</h2><p className="body-text">{es ? 'Para conversar sobre un proyecto, una oportunidad o una idea. Puedes escribirme directamente.' : 'For a project, an opportunity, or an idea. You can reach me directly.'}</p></div>
      <div className="bento-grid">
        <div className="bento-card col-span-6">
          <h3 className="card-title" style={{marginBottom:24}}>{es ? 'Hablemos' : 'Let’s talk'}</h3>
          <div className="contact-copy-row"><a className="contact-email" href={`mailto:${email}`}>{email}</a><button type="button" className="icon-button" onClick={copyEmail} aria-label={es ? 'Copiar correo' : 'Copy email'}><Copy size={16} /></button></div>
          <p className="form-status" role="status">{copyStatus === 'success' ? (es ? 'Correo copiado.' : 'Email copied.') : copyStatus === 'error' ? (es ? 'No se pudo copiar. Puedes usar el enlace de correo.' : 'Could not copy. You can use the email link.') : ''}</p>
          <p className="contact-meta">Computer Science @ UTRGV<br />Brownsville, TX / Matamoros, Tamps.</p>
          <p className="body-text">Founder & CPO · Build Pa’l Norte</p>
          <div className="contact-links"><a className="text-link" href="https://github.com/Felglitch739" target="_blank" rel="noreferrer">GitHub ↗</a><a className="text-link" href="/Felix_Martinez_Resume.pdf" target="_blank" rel="noreferrer">{es ? 'Ver CV' : 'View resume'} ↗</a></div>
        </div>
        <div className="bento-card col-span-6">
          <h3 className="card-title" style={{marginBottom:24}}>{es ? 'Déjame un mensaje' : 'Leave me a message'}</h3>
          <form className="contact-form" onSubmit={submit} aria-busy={isSubmitting}>
            <label>{es ? 'Nombre' : 'Name'}<input name="name" autoComplete="name" required maxLength={150} className="bento-input" placeholder={es ? 'Tu nombre o empresa' : 'Your name or company'} /></label>
            <label>{es ? 'Correo electrónico' : 'Email'}<input type="email" name="email" autoComplete="email" required maxLength={254} className="bento-input" placeholder="you@example.com" /></label>
            <label>{es ? 'Mensaje' : 'Message'}<textarea name="message" required minLength={10} maxLength={5000} rows={4} className="bento-input" placeholder={es ? 'Cuéntame un poco sobre tu idea…' : 'Tell me a little about your idea…'} /></label>
            <input type="checkbox" name="botcheck" className="honeypot" tabIndex={-1} aria-hidden="true" />
            <button className="btn-bento btn-bento-primary" disabled={isSubmitting}><Send size={16} />{isSubmitting ? (es ? 'Enviando…' : 'Sending…') : (es ? 'Enviar mensaje' : 'Send message')}</button>
            <p className="form-status" role="status">{status === 'success' ? (es ? 'Formulario enviado. Gracias por escribirme.' : 'Form submitted. Thank you for reaching out.') : status === 'error' ? (es ? 'No se pudo enviar. Puedes escribirme por correo directo.' : 'Could not send. You can email me directly.') : ''}</p>
          </form>
        </div>
      </div>
    </div>
  </section>
}
