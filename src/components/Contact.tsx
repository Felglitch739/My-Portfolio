import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, XCircle, Loader2, Copy, Check, Mail, MapPin, GraduationCap } from 'lucide-react'

const GH = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4" />
  </svg>
)

const ACCESS_KEY = '1a2bcea0-20e8-4243-855d-bce0531ef148'

interface ContactProps {
  lang?: 'es' | 'en'
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function Contact({ lang = 'es' }: ContactProps) {
  const [status,    setStatus]    = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [copied,    setCopied]    = useState(false)

  const email = 'felix.martinez08@utrgv.edu'

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    const fd = new FormData(e.currentTarget)
    fd.append('access_key', ACCESS_KEY)
    try {
      const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
      const d = await r.json()
      setStatus(d.success ? 'success' : 'error')
      if (d.success) (e.target as HTMLFormElement).reset()
    } catch { setStatus('error') }
  }

  const T = {
    es: {
      label:       '07 — Contacto',
      heading:     'Hablemos.',
      sub:         'Disponible para pasantías, roles de desarrollo y colaboraciones en software o hardware.',
      infoTitle:   'Información Directa',
      edu:         'CS @ UTRGV',
      eduSub:      'University of Texas Rio Grande Valley',
      loc:         'Edinburg, TX / Matamoros, Tamps.',
      emailLabel:  'Email Universitario',
      socials:     'Código & Redes',
      formTitle:   'Mensaje Directo',
      name:        'Nombre o empresa',
      emailP:      'tu@email.com',
      msg:         'Describe tu proyecto, idea o vacante...',
      send:        'Enviar',
      ok:          '¡Mensaje enviado! Te respondo pronto.',
      err:         'Error al enviar. Escríbeme directamente.',
    },
    en: {
      label:       '07 — Contact',
      heading:     "Let's talk.",
      sub:         'Open to internships, dev roles, and software or hardware collaborations.',
      infoTitle:   'Direct Info',
      edu:         'CS @ UTRGV',
      eduSub:      'University of Texas Rio Grande Valley',
      loc:         'Edinburg, TX / Matamoros, Tamps.',
      emailLabel:  'University Email',
      socials:     'Code & Socials',
      formTitle:   'Direct Message',
      name:        'Your name or company',
      emailP:      'you@company.com',
      msg:         'Tell me about your project or opportunity...',
      send:        'Send',
      ok:          'Message sent! I\'ll reply soon.',
      err:         'Error sending. Email me directly.',
    },
  }[lang]

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
            <span className="sys-label">{T.label}</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--gray-800)' }} />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
            {/* Left */}
            <motion.div variants={fadeUp}>
              <h2 className="display-lg" style={{ marginBottom: '1.5rem' }}>{T.heading}</h2>
              <p className="text-body" style={{ marginBottom: '3rem' }}>{T.sub}</p>

              {/* Info rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  { icon: <GraduationCap size={15} />, label: T.edu, sub: T.eduSub },
                  { icon: <MapPin size={15} />,        label: T.loc, sub: '' },
                ].map((row, i) => (
                  <div key={i} style={{
                    borderTop: i === 0 ? 'var(--border)' : 'none',
                    borderBottom: 'var(--border)',
                    padding: '1rem 0',
                    display: 'flex',
                    gap: '0.8rem',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ color: 'var(--gray-600)', marginTop: '2px' }}>{row.icon}</span>
                    <div>
                      <div style={{ color: 'var(--white)', fontSize: '0.95rem', fontWeight: 500 }}>{row.label}</div>
                      {row.sub && <div className="text-sm" style={{ marginTop: '0.15rem' }}>{row.sub}</div>}
                    </div>
                  </div>
                ))}

                {/* Email row */}
                <div style={{ borderBottom: 'var(--border)', padding: '1rem 0', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <span style={{ color: 'var(--gray-600)' }}><Mail size={15} /></span>
                  <div style={{ flex: 1 }}>
                    <div className="idx" style={{ marginBottom: '0.25rem' }}>{T.emailLabel}</div>
                    <div style={{ color: 'var(--white)', fontSize: '0.88rem', fontFamily: 'var(--font-dot)' }}>{email}</div>
                  </div>
                  <button
                    onClick={handleCopy}
                    style={{ background: 'transparent', border: 'none', color: copied ? 'var(--red)' : 'var(--gray-600)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>

                {/* GitHub */}
                <div style={{ borderBottom: 'var(--border)', padding: '1rem 0' }}>
                  <div className="idx" style={{ marginBottom: '0.5rem' }}>{T.socials}</div>
                  <a
                    href="https://github.com/Felglitch739"
                    target="_blank" rel="noreferrer"
                    className="btn btn-outline"
                    style={{ fontSize: '0.68rem', padding: '0.5rem 0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <GH /> github.com/Felglitch739
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div variants={fadeUp}>
              <div className="idx" style={{ marginBottom: '1.5rem' }}>{T.formTitle}</div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input type="text" name="name" required placeholder={T.name} />
                <input type="email" name="email" required placeholder={T.emailP} />
                <textarea name="message" required rows={5} placeholder={T.msg} style={{ resize: 'none' }} />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn-primary"
                  style={{ justifyContent: 'center', marginTop: '0.5rem' }}
                >
                  {status === 'loading'
                    ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Sending...</>
                    : <><Send size={14} /> {T.send}</>
                  }
                </button>

                {status === 'success' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-300)', fontSize: '0.85rem', fontFamily: 'var(--font-dot)', letterSpacing: '0.05em' }}>
                    <CheckCircle2 size={14} style={{ color: 'var(--white)' }} /> {T.ok}
                  </div>
                )}
                {status === 'error' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--red)', fontSize: '0.85rem', fontFamily: 'var(--font-dot)', letterSpacing: '0.05em' }}>
                    <XCircle size={14} /> {T.err}
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}
