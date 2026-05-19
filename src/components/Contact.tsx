import { motion } from 'framer-motion'
import { Mail, Send, MapPin, GraduationCap, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
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

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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
          ; (e.target as HTMLFormElement).reset()
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

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="tag mono" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <Send size={13} /> &nbsp; Contact
          </span>
          <h2 className="section-title gradient-text">Let's Connect</h2>
          <div className="divider" style={{ marginTop: '0.75rem' }} />
          <p className="section-subtitle" style={{ marginTop: '1rem', marginBottom: 0 }}>
            Open to internships, collaborations, and new opportunities.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            maxWidth: 820,
            margin: '0 auto',
          }}
        >
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card"
            style={{ padding: '2rem' }}
          >
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                color: 'var(--text-primary)',
              }}
            >
              Félix Martínez
            </h3>

            {[
              {
                icon: <GraduationCap size={16} />,
                label: 'CS @ UTRGV',
                color: 'var(--cyan)',
              },
              {
                icon: <MapPin size={16} />,
                label: 'Rio Grande Valley, TX',
                color: 'var(--violet)',
              },
              {
                icon: <Mail size={16} />,
                label: 'felixmrtzflrs04@gmail.com',
                color: 'var(--emerald)',
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.92rem',
                }}
              >
                <span style={{ color: item.color }}>{item.icon}</span>
                {item.label}
              </div>
            ))}

            <div
              style={{
                height: '1px',
                background: 'var(--border-glass)',
                margin: '1.5rem 0',
              }}
            />

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: <GithubIcon size={18} />, href: 'https://github.com/Felglitch739', label: 'GitHub' },
                { icon: <LinkedinIcon size={18} />, href: 'https://www.linkedin.com/in/felix-martinez-fls/', label: 'LinkedIn' },
                { icon: <Mail size={18} />, href: 'mailto:felixmrtzflrs04@gmail.com', label: 'Email' },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  aria-label={s.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 42,
                    height: 42,
                    borderRadius: '10px',
                    background: 'rgba(56,189,248,0.08)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    ; (e.currentTarget as HTMLElement).style.color = 'var(--cyan)'
                      ; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-glow)'
                      ; (e.currentTarget as HTMLElement).style.background = 'var(--cyan-glow)'
                  }}
                  onMouseLeave={(e) => {
                    ; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                      ; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-glass)'
                      ; (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.08)'
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Message card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card"
            style={{ padding: '2rem' }}
          >
            <h3
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                color: 'var(--text-primary)',
              }}
            >
              Send a message
            </h3>

            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {[
                { id: 'name', name: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                { id: 'email', name: 'email', label: 'Your Email', type: 'email', placeholder: 'you@example.com' },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      marginBottom: '0.4rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    style={{
                      width: '100%',
                      padding: '0.7rem 1rem',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '0.65rem',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                    onFocus={(e) => {
                      ; (e.target as HTMLInputElement).style.borderColor = 'var(--cyan)'
                        ; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px var(--cyan-glow)'
                    }}
                    onBlur={(e) => {
                      ; (e.target as HTMLInputElement).style.borderColor = 'var(--border-glass)'
                        ; (e.target as HTMLInputElement).style.boxShadow = 'none'
                    }}
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: '0.4rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Hey Félix, I'd love to talk about..."
                  required
                  style={{
                    width: '100%',
                    padding: '0.7rem 1rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '0.65rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={(e) => {
                    ; (e.target as HTMLTextAreaElement).style.borderColor = 'var(--cyan)'
                      ; (e.target as HTMLTextAreaElement).style.boxShadow = '0 0 0 3px var(--cyan-glow)'
                  }}
                  onBlur={(e) => {
                    ; (e.target as HTMLTextAreaElement).style.borderColor = 'var(--border-glass)'
                      ; (e.target as HTMLTextAreaElement).style.boxShadow = 'none'
                  }}
                />
              </div>

              <motion.button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.03 } : {}}
                whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                style={{
                  justifyContent: 'center',
                  marginTop: '0.25rem',
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ display: 'flex' }}>
                    <Loader2 size={15} />
                  </motion.div>
                ) : (
                  <Send size={15} />
                )}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--emerald)', fontSize: '0.9rem', marginTop: '0.2rem', padding: '0.75rem', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(52, 211, 153, 0.2)' }}
                >
                  <CheckCircle2 size={16} /> Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--pink)', fontSize: '0.9rem', marginTop: '0.2rem', padding: '0.75rem', background: 'rgba(244, 114, 182, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(244, 114, 182, 0.2)' }}
                >
                  <XCircle size={16} /> Something went wrong. Please check your API key or try again.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
