import { motion } from 'framer-motion'
import { Mail, Send, MapPin, GraduationCap, CheckCircle2, XCircle, Loader2, Copy, Check } from 'lucide-react'
import { useState } from 'react'

const ACCESS_KEY = "1a2bcea0-20e8-4243-855d-bce0531ef148" // Web3Forms API Key

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
  </svg>
)

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

interface ContactProps {
  lang?: 'es' | 'en'
}

export default function Contact({ lang = 'es' }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [copied, setCopied] = useState(false)

  const email = "felix.martinez08@utrgv.edu"

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const formData = new FormData(e.currentTarget)
    formData.append("access_key", ACCESS_KEY)

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
      const data = await res.json()

      if (data.success) {
        setSubmitStatus('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        console.error("Error", data)
        setSubmitStatus('error')
      }
    } catch (err) {
      console.error(err)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const t = {
    es: {
      tag: "CONTACTO & COLABORACIÓN",
      title: "Conectemos & Hablemos",
      subtitle: "Abierto a oportunidades de desarrollo, pasantías y colaboraciones en software o hardware.",
      infoTitle: "Información Directa",
      eduLabel: "Educación",
      locationLabel: "Ubicación",
      emailLabel: "Correo Universitario",
      socialLabel: "Redes & Código",
      formTitle: "Enviarme un Mensaje Directo",
      namePlaceholder: "Tu nombre o empresa",
      emailPlaceholder: "tu@email.com",
      msgPlaceholder: "Cuéntame sobre tu idea, proyecto o vacante...",
      submitBtn: "Enviar Mensaje",
      successMsg: "¡Mensaje enviado con éxito! Te responderé lo antes posible.",
      errorMsg: "Ocurrió un error al enviar el mensaje. Por favor intenta enviarme un correo directamente.",
    },
    en: {
      tag: "CONTACT & COLLABORATION",
      title: "Let's Connect",
      subtitle: "Open to software engineering roles, hardware collaborations, and new opportunities.",
      infoTitle: "Direct Info",
      eduLabel: "Education",
      locationLabel: "Location",
      emailLabel: "University Email",
      socialLabel: "Socials & Code",
      formTitle: "Send a Direct Message",
      namePlaceholder: "Your name or company",
      emailPlaceholder: "you@company.com",
      msgPlaceholder: "Tell me about your project or opportunity...",
      submitBtn: "Send Message",
      successMsg: "Message sent successfully! I'll get back to you shortly.",
      errorMsg: "Error sending message. Please email me directly.",
    }
  }[lang]

  return (
    <section id="contact" className="section" style={{ position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="tag tag-cyan mono" style={{ marginBottom: '0.8rem' }}>
            <Send size={13} /> &nbsp; {t.tag}
          </span>
          <h2 className="section-title gradient-text">{t.title}</h2>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ padding: '2.2rem' }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1.5rem' }}>
              {t.infoTitle}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.6rem', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--cyan)', borderRadius: '10px' }}>
                  <GraduationCap size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{t.eduLabel}</div>
                  <div style={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.95rem' }}>UTRGV (Computer Science)</div>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>University of Texas Rio Grande Valley</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.6rem', background: 'rgba(129, 140, 248, 0.1)', color: 'var(--violet)', borderRadius: '10px' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{t.locationLabel}</div>
                  <div style={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.95rem' }}>Edinburg, TX / Matamoros, Tamps</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.6rem', background: 'rgba(52, 211, 153, 0.1)', color: 'var(--emerald)', borderRadius: '10px' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{t.emailLabel}</div>
                  <div style={{ color: 'var(--cyan)', fontWeight: 600, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{email}</span>
                    <button
                      onClick={handleCopyEmail}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: copied ? '#34d399' : '#94a3b8',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                      title="Copy Email"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, marginBottom: '0.8rem' }}>
                {t.socialLabel}
              </div>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <a
                  href="https://github.com/Felglitch739"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  <GithubIcon size={16} /> GitHub
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{ padding: '2.2rem' }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1.5rem' }}>
              {t.formTitle}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={t.namePlaceholder}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.2rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    outline: 'none',
                    fontSize: '0.95rem',
                  }}
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t.emailPlaceholder}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.2rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    outline: 'none',
                    fontSize: '0.95rem',
                  }}
                />
              </div>

              <div>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={t.msgPlaceholder}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.2rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    outline: 'none',
                    fontSize: '0.95rem',
                    resize: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Enviando...
                  </>
                ) : (
                  <>
                    <Send size={18} /> {t.submitBtn}
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div style={{ color: '#34d399', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
                  <CheckCircle2 size={16} /> {t.successMsg}
                </div>
              )}
              {submitStatus === 'error' && (
                <div style={{ color: '#f87171', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
                  <XCircle size={16} /> {t.errorMsg}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
