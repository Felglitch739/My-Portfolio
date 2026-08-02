import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal as TerminalIcon, X, CornerDownLeft } from 'lucide-react'

interface CyberTerminalProps {
  isOpen: boolean
  onClose: () => void
  lang?: 'es' | 'en'
}

interface Line {
  id: string
  type: 'in' | 'out' | 'sys' | 'err'
  text: string
}

export default function CyberTerminal({ isOpen, onClose, lang = 'es' }: CyberTerminalProps) {
  const [input,   setInput]   = useState('')
  const [history, setHistory] = useState<Line[]>([
    { id: '0', type: 'sys', text: 'FMF_OS v1.0.0 — type "help" for commands' },
  ])

  const run = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    const next: Line[] = [
      ...history,
      { id: Date.now() + 'i', type: 'in', text: `$ ${cmd}` },
    ]

    const add = (text: string, type: Line['type'] = 'out') =>
      next.push({ id: Date.now() + 'o', type, text })

    switch (trimmed) {
      case 'help':
        add(
          `whoami  — Identidad y perfil
skills  — Stack técnico
projects — Proyectos y casos de éxito
hobbies — Fitness, guitarra, gaming, billar
contact — Formas de contacto
clear   — Limpiar terminal`
        )
        break
      case 'whoami':
        add(
          `NAME:    Félix E. Martinez Flores
ROLE:    Full-Stack Software Engineer & Hardware Hacker
EDU:     Computer Science @ UTRGV
LOC:     Matamoros, Tamps. / RGV, TX
MOTTO:   I build systems, not just lines of code.`
        )
        break
      case 'skills':
        add('C++ · Python · React · Vite · Tailwind CSS · TypeScript · SQL\nEmbedded Systems · Supabase · React Native')
        break
      case 'projects':
        add(
          `001 KronoBook & DualFX  — SaaS Multi-Tenant (Supabase)
002 AuraFit             — AI Fitness App (React Native) · Hackathon Winner
003 Build Pa'l Norte    — Comunidad Tech & Hackathon 24h · Matamoros
004 Gazpacho's          — Web SPA Glassmorphism
005 Family Weather      — Python Automation Bot`
        )
        break
      case 'hobbies':
        add(
          `🏋️  PESAS   — Push-Pull-Legs & Upper-Lower splits
🎸  MÚSICA  — Guitarra acústica, progresiones & AI music gen
🎮  GAMING  — Rust, Minecraft: server tuning & modding
🎱  BILLAR  — Eduardo, Wicho, Orlando & yo`
        )
        break
      case 'contact':
        add(
          `EMAIL:   felix.martinez08@utrgv.edu
GITHUB:  github.com/Felglitch739`
        )
        break
      case 'clear':
        setHistory([{ id: '0', type: 'sys', text: 'FMF_OS v1.0.0 — cleared' }])
        setInput('')
        return
      default:
        add(`Command not found: "${trimmed}". Type "help".`, 'err')
    }

    setHistory(next)
    setInput('')
  }

  const quickCmds = ['help', 'whoami', 'skills', 'projects', 'hobbies', 'contact', 'clear']

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 500,
            background: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <motion.div
            initial={{ scale: 0.96, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: '740px',
              background: 'var(--gray-950)',
              border: 'var(--border-strong)',
              display: 'flex', flexDirection: 'column',
              fontFamily: 'var(--font-dot)',
              fontSize: '0.82rem',
              maxHeight: '85vh',
            }}
          >
            {/* Titlebar */}
            <div style={{
              padding: '0.7rem 1.2rem',
              borderBottom: 'var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--gray-400)', letterSpacing: '0.12em', fontSize: '0.68rem', textTransform: 'uppercase' }}>
                <TerminalIcon size={13} />
                felix@fmf-os:~
              </div>
              <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--gray-600)', cursor: 'pointer', display: 'flex' }}>
                <X size={15} />
              </button>
            </div>

            {/* Quick buttons */}
            <div style={{
              padding: '0.5rem 1.2rem',
              borderBottom: 'var(--border)',
              display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
              alignItems: 'center',
            }}>
              <span style={{ color: 'var(--gray-700)', fontSize: '0.62rem', letterSpacing: '0.12em' }}>QUICK →</span>
              {quickCmds.map(c => (
                <button
                  key={c}
                  onClick={() => run(c)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--gray-800)',
                    color: 'var(--gray-500)',
                    padding: '0.18rem 0.55rem',
                    fontSize: '0.62rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-dot)',
                    transition: 'all 0.12s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--white)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--gray-600)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gray-500)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--gray-800)' }}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Output */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {history.map(line => (
                <div key={line.id} style={{ whiteSpace: 'pre-wrap', lineHeight: 1.55 }}>
                  {line.type === 'in'  && <span style={{ color: 'var(--white)' }}>{line.text}</span>}
                  {line.type === 'out' && <span style={{ color: 'var(--gray-400)' }}>{line.text}</span>}
                  {line.type === 'sys' && <span style={{ color: 'var(--gray-600)' }}>{line.text}</span>}
                  {line.type === 'err' && <span style={{ color: 'var(--red)' }}>{line.text}</span>}
                </div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={e => { e.preventDefault(); run(input) }}
              style={{
                borderTop: 'var(--border)',
                padding: '0.6rem 1.2rem',
                display: 'flex', alignItems: 'center', gap: '0.8rem',
              }}
            >
              <span style={{ color: 'var(--red)' }}>$</span>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={lang === 'es' ? "escribe un comando..." : "type a command..."}
                autoFocus
                style={{
                  flex: 1, background: 'transparent', border: 'none',
                  outline: 'none', color: 'var(--white)',
                  fontFamily: 'var(--font-dot)', fontSize: '0.82rem',
                  letterSpacing: '0.04em', padding: '0',
                }}
              />
              <button type="submit" style={{ background: 'transparent', border: 'none', color: 'var(--gray-600)', cursor: 'pointer', display: 'flex' }}>
                <CornerDownLeft size={14} />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
