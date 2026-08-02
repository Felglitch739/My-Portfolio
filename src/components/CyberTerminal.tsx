import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal as TerminalIcon, X, Play, CornerDownLeft, Sparkles, RefreshCw } from 'lucide-react'

interface OutputLine {
  id: string
  type: 'input' | 'output' | 'error' | 'success' | 'system'
  text: string
}

interface CyberTerminalProps {
  isOpen: boolean
  onClose: () => void
  lang?: 'es' | 'en'
}

export default function CyberTerminal({ isOpen, onClose, lang = 'es' }: CyberTerminalProps) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<OutputLine[]>([
    { id: '1', type: 'system', text: '⚡ FELIX_OS v2.4 (x86_64-embedded-utrgv)' },
    { id: '2', type: 'system', text: 'Type "help" or click quick commands below to explore.' },
  ])
  const [isMatrixMode, setIsMatrixMode] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase()
    if (!trimmed) return

    const newHistory: OutputLine[] = [
      ...history,
      { id: Date.now().toString(), type: 'input', text: `$ ${cmdStr}` },
    ]

    switch (trimmed) {
      case 'help':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `Available commands:
  • whoami    - Profile summary & education at UTRGV
  • skills    - Technical stack (C++, Python, React, Vite, Tailwind, TS, SQL)
  • projects  - Overview of KronoBook, AuraFit, Build Pa'l Norte & more
  • hobbies   - Fitness (PPL), Music, Gaming (Rust/Minecraft), Pool with friends
  • matrix    - Toggle Cyber Matrix Digital Rain
  • billiards - Jump to 8-Ball Billiards simulator
  • contact   - Get in touch & social links
  • clear     - Clear terminal logs`,
        })
        break

      case 'whoami':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'success',
          text: `[IDENTITY]: Félix E. Martinez Flores
[ROLE]: Full-Stack Software Engineer & Hardware Hacker
[EDU]: Computer Science Student @ UTRGV
[PHILOSOPHY]: Programming is the art of solving complex logical puzzles. I build systems, not just code.`,
        })
        break

      case 'skills':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `⚡ TECH VAULT:
• Systems & Low-Level: C++, Python, Embedded Systems
• Web & Frontend: React, Vite, Tailwind CSS, TypeScript
• Database & Cloud: SQL, Supabase, PythonAnywhere`,
        })
        break

      case 'projects':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `🚀 FEATURED PROJECTS:
1. KronoBook & DualFX [SaaS]: Multi-tenant booking platform + DualFX auto detailing site integration.
2. AuraFit [AI Mobile]: AI fitness tracking app (Frontera Devs winner, React Native rewrite).
3. Build Pa'l Norte [Community]: Matamoros tech community co-founder & 24h Hackathon host.
4. Gazpacho's [Web SPA]: High-end restaurant redesign with glassmorphism aesthetics.
5. Family Weather [Automation]: Python weather alert bot deployed on PythonAnywhere.`,
        })
        break

      case 'hobbies':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `🎸 EL TOQUE HUMANO (THE HUMAN SIDE):
• Fitness: Dedicated weightlifting (Push-Pull-Legs & Upper-Lower splits).
• Music: Acoustic guitar, writing chord progressions, and AI music generation tools.
• Gaming: Rust & Minecraft server optimization, modding & tactical gameplay.
• Social: Playing 8-ball billiards at local pool halls with Eduardo, Wicho & Orlando.`,
        })
        break

      case 'matrix':
        setIsMatrixMode(!isMatrixMode)
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'success',
          text: isMatrixMode ? '[MATRIX]: Disengaged.' : '[MATRIX]: Cyber Matrix protocol engaged! 🟢010101',
        })
        break

      case 'billiards':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'success',
          text: '[BILLIARDS]: Scrolling to 8-ball billiards canvas...',
        })
        setTimeout(() => {
          onClose()
          document.getElementById('human-side')?.scrollIntoView({ behavior: 'smooth' })
        }, 500)
        break

      case 'contact':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `📫 CONTACT & SOCIAL:
• Email: felix.martinez@utrgv.edu
• GitHub: https://github.com/Felglitch739
• LinkedIn / IEEE: Active UTRGV Student Chapter Member`,
        })
        break

      case 'clear':
        setHistory([])
        setInput('')
        return

      default:
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'error',
          text: `Command not recognized: "${trimmed}". Type "help" for a list of commands.`,
        })
        break
    }

    setHistory(newHistory)
    setInput('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(2, 8, 23, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '850px',
              height: '560px',
              maxHeight: '85vh',
              background: isMatrixMode ? '#021206' : '#080d1a',
              border: isMatrixMode ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '1rem',
              boxShadow: isMatrixMode
                ? '0 0 50px rgba(16, 185, 129, 0.25)'
                : '0 0 50px rgba(56, 189, 248, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            }}
          >
            {/* Terminal Header */}
            <div
              style={{
                padding: '0.8rem 1.2rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <TerminalIcon size={16} color={isMatrixMode ? '#10b981' : '#38bdf8'} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: isMatrixMode ? '#10b981' : '#f0f4ff' }}>
                  felix@utrgv-workstation:~ (bash)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => handleCommand('matrix')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: isMatrixMode ? '#10b981' : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    marginRight: '0.5rem',
                  }}
                  title="Toggle Matrix Mode"
                >
                  <Sparkles size={13} /> {isMatrixMode ? 'Matrix ON' : 'Matrix'}
                </button>
                <button
                  onClick={onClose}
                  style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#f87171',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Quick Command Buttons */}
            <div
              style={{
                padding: '0.6rem 1rem',
                background: 'rgba(0, 0, 0, 0.2)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Quick:</span>
              {['whoami', 'skills', 'projects', 'hobbies', 'billiards', 'contact', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  style={{
                    background: 'rgba(56, 189, 248, 0.08)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    color: '#38bdf8',
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Body */}
            <div
              style={{
                flex: 1,
                padding: '1.2rem',
                overflowY: 'auto',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: isMatrixMode ? '#10b981' : '#e2e8f0',
              }}
            >
              {history.map((line) => (
                <div key={line.id} style={{ marginBottom: '0.6rem', whiteSpace: 'pre-wrap' }}>
                  {line.type === 'input' && (
                    <span style={{ color: isMatrixMode ? '#34d399' : '#38bdf8', fontWeight: 600 }}>
                      {line.text}
                    </span>
                  )}
                  {line.type === 'system' && (
                    <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>{line.text}</span>
                  )}
                  {line.type === 'success' && (
                    <span style={{ color: '#34d399', fontWeight: 500 }}>{line.text}</span>
                  )}
                  {line.type === 'error' && <span style={{ color: '#f87171' }}>{line.text}</span>}
                  {line.type === 'output' && (
                    <span style={{ color: isMatrixMode ? '#10b981' : '#cbd5e1' }}>{line.text}</span>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleCommand(input)
              }}
              style={{
                padding: '0.8rem 1.2rem',
                background: 'rgba(0, 0, 0, 0.3)',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
              }}
            >
              <span style={{ color: isMatrixMode ? '#10b981' : '#38bdf8', fontWeight: 'bold' }}>$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type command ('help', 'whoami', 'skills')..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: isMatrixMode ? '#34d399' : '#f8fafc',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                }}
                autoFocus
              />
              <button
                type="submit"
                style={{
                  background: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  color: '#38bdf8',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.75rem',
                }}
              >
                Run <CornerDownLeft size={12} />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
