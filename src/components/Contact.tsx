import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, MapPin, GraduationCap, CheckCircle2, XCircle, Loader2, Copy, Check } from 'lucide-react'

const ACCESS_KEY = "1a2bcea0-20e8-4243-855d-bce0531ef148"

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
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
        setSubmitStatus('error')
      }
    } catch (err) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const t = {
    es: {
      label: "08 // CONTACT & COMMUNICATION",
      title: "HABLEMOS DE PROYECTOS",
      infoTitle: "INFORMACIÓN DIRECTA",
      eduLabel: "EDUCACIÓN",
      locationLabel: "UBICACIÓN",
      emailLabel: "CORREO UNIVERSITARIO",
      socialLabel: "RE DES & CÓDIGO",
      formTitle: "ENVIAR MENSAJE DIRECTO",
      namePlaceholder: "Tu nombre o empresa",
      emailPlaceholder: "tu@email.com",
      msgPlaceholder: "Detalles del proyecto o vacante...",
      submitBtn: "ENVIAR MENSAJE",
      successMsg: "¡Mensaje enviado con éxito!",
      errorMsg: "Error al enviar. Intenta por correo directo.",
    },
    en: {
      label: "08 // CONTACT & COMMUNICATION",
      title: "LET'S TALK PROJECTS",
      infoTitle: "DIRECT INFORMATION",
      eduLabel: "EDUCATION",
      locationLabel: "LOCATION",
      emailLabel: "UNIVERSITY EMAIL",
      socialLabel: "SOCIALS & CODE",
      formTitle: "SEND DIRECT MESSAGE",
      namePlaceholder: "Your name or company",
      emailPlaceholder: "you@company.com",
      msgPlaceholder: "Details about the project or role...",
      submitBtn: "SEND MESSAGE",
      successMsg: "Message sent successfully!",
      errorMsg: "Error sending message. Try direct email.",
    }
  }[lang]

  return (
    <section id="contact" className="section">
      <div className="container">
        <span className="section-label">{t.label}</span>
        <h2 className="display-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
          {t.title}
        </h2>

        <div className="bento-grid">
          {/* Info Bento Card (col-span-5) */}
          <div className="bento-card col-span-6">
            <h3 className="card-title" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
              {t.infoTitle}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <div className="ndot" style={{ fontSize: '0.7rem', color: 'var(--gray-500)' }}>{t.eduLabel}</div>
                <div style={{ color: 'var(--white)', fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                  UTRGV (Computer Science)
                </div>
              </div>

              <div>
                <div className="ndot" style={{ fontSize: '0.7rem', color: 'var(--gray-500)' }}>{t.locationLabel}</div>
                <div style={{ color: 'var(--white)', fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                  Brownsville, TX / Matamoros, Tamps.
                </div>
              </div>

              <div>
                <div className="ndot" style={{ fontSize: '0.7rem', color: 'var(--gray-500)' }}>{t.emailLabel}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.2rem' }}>
                  <span className="ndot" style={{ color: 'var(--red)', fontSize: '0.9rem' }}>{email}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="mono-tag"
                    style={{ cursor: 'pointer', background: 'transparent' }}
                    aria-label={copied ? "Correo copiado al portapapeles" : "Copiar correo electrónico"}
                    title="Copiar correo electrónico"
                  >
                    {copied ? <Check size={12} color="var(--red)" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.2rem', marginTop: '2rem' }}>
              <a
                href="https://github.com/Felglitch739"
                target="_blank"
                rel="noreferrer"
                className="btn-bento btn-bento-outline"
                style={{ width: '100%' }}
              >
                <GithubIcon /> GITHUB.COM/FELGLITCH739
              </a>
            </div>
          </div>

          {/* Form Bento Card (col-span-7) */}
          <div className="bento-card col-span-6">
            <h3 className="card-title" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
              {t.formTitle}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" name="name" required placeholder={t.namePlaceholder} className="bento-input" />
              <input type="email" name="email" required placeholder={t.emailPlaceholder} className="bento-input" />
              <textarea name="message" required rows={4} placeholder={t.msgPlaceholder} className="bento-input" style={{ resize: 'none' }} />

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-bento btn-bento-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> ENVIANDO...
                  </>
                ) : (
                  <>
                    <Send size={16} /> {t.submitBtn}
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="ndot" style={{ color: 'var(--white)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
                  <CheckCircle2 size={14} color="var(--red)" /> {t.successMsg}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="ndot" style={{ color: 'var(--red)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
                  <XCircle size={14} /> {t.errorMsg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
