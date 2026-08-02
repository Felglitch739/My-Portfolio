import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal as TerminalIcon, X, CornerDownLeft, Move } from 'lucide-react'

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
    { id: '1', type: 'system', text: 'FMF_OS_TERMINAL v3.0 (x86_64-utrgv-software)' },
    { id: '2', type: 'system', text: 'Type "help" or click command pills below.' },
  ])
  const bottomRef = useRef<HTMLDivElement>(null)
  const dragConstraintsRef = useRef(null)

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
          text: `COMMAND LIST:
  • whoami    - Profile summary & UTRGV CS status
  • skills    - Technical modules (React Native, Python, React, Vite, Tailwind, TS, SQL)
  • projects  - Overview of KronoBook, AuraFit, Build Pa'l Norte & more
  • hobbies   - Fitness (PPL), Guitar & AI, Gaming (Rust/Minecraft), Billiards
  • billiards - Jump to 8-Ball Billiards simulator
  • contact   - Direct info & social links
  • clear     - Clear terminal logs`,
        })
        break

      case 'whoami':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'success',
          text: `[IDENTITY]: Félix E. Martinez Flores
[ROLE]: Full-Stack Software Engineer & Mobile Developer
[EDU]: Computer Science Student @ UTRGV
[PHILOSOPHY]: Programming is the art of solving complex logical puzzles. I build systems, not just code.`,
        })
        break

      case 'skills':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `SOFTWARE MODULES:
• React Native (Mobile Architecture)
• Python (APIs & Automation)
• React / Vite / Tailwind CSS / TypeScript
• SQL & Supabase (Multi-Tenant Architecture)
• Node.js & Next.js`,
        })
        break

      case 'projects':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `FEATURED PROJECTS:
1. KronoBook & DualFX [SaaS]: Multi-tenant booking platform + DualFX auto detailing integration.
2. AuraFit [AI Mobile]: AI fitness tracking app (Frontera Devs winner, React Native rewrite).
3. Build Pa'l Norte [Community]: Matamoros tech community co-founder & 24h Hackathon host.
4. Gazpacho's [Web SPA]: High-end restaurant redesign prototype.
5. Family Weather [Automation]: Python weather alert bot deployed on PythonAnywhere.`,
        })
        break

      case 'hobbies':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `THE HUMAN ELEMENT:
• Weightlifting (Push-Pull-Legs & Upper-Lower splits).
• Acoustic Guitar progressions, lyric writing & AI audio generation.
• Gaming: Rust & Minecraft server tuning, modding & tactics.
• Billiards: Playing 8-ball pool with Eduardo, Wicho & Orlando.`,
        })
        break

      case 'billiards':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'success',
          text: '[BILLIARDS]: Scrolling to 8-ball dot-matrix simulator...',
        })
        setTimeout(() => {
          onClose()
          document.getElementById('human-side')?.scrollIntoView({ behavior: 'smooth' })
        }, 400)
        break

      case 'contact':
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `CONTACT & SOCIAL:
• Email: felix.martinez08@utrgv.edu
• GitHub: https://github.com/Felglitch739`,
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
          text: `Command not recognized: "${trimmed}". Type "help".`,
        })
        break
    }

    setHistory(newHistory)
    setInput('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          ref={dragConstraintsRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={onClose}
        >
          {/* Draggable Hardware Screen Window */}
          <motion.div
            drag
            dragConstraints={dragConstraintsRef}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bento-card"
            style={{
              width: '100%',
              maxWidth: '800px',
              height: '540px',
              maxHeight: '85vh',
              background: '#09090b',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
            }}
          >
            {/* Draggable Window Header */}
            <div
              style={{
                padding: '0.8rem 1.2rem',
                background: 'rgba(255, 255, 255, 0.04)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'grab',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Move size={14} color="var(--gray-400)" />
                <TerminalIcon size={16} color="var(--red)" />
                <span className="ndot" style={{ fontSize: '0.8rem', color: 'var(--white)' }}>
                  TERMINAL // FMF_OS
                </span>
              </div>
              <button
                onClick={onClose}
                className="mono-tag mono-tag-red"
                style={{ cursor: 'pointer' }}
                aria-label="Cerrar ventana de terminal"
                title="Cerrar terminal"
              >
                <X size={12} />
              </button>
            </div>

            {/* Quick Command Pills */}
            <div
              style={{
                padding: '0.6rem 1rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <span className="ndot" style={{ fontSize: '0.68rem', color: 'var(--gray-500)' }}>CMD:</span>
              {['whoami', 'skills', 'projects', 'hobbies', 'billiards', 'contact', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="mono-tag"
                  style={{ cursor: 'pointer' }}
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Log View */}
            <div
              style={{
                flex: 1,
                padding: '1.2rem',
                overflowY: 'auto',
                fontSize: '0.86rem',
                lineHeight: 1.6,
                fontFamily: 'var(--font-mono)',
              }}
            >
              {history.map((line) => (
                <div key={line.id} style={{ marginBottom: '0.6rem', whiteSpace: 'pre-wrap' }}>
                  {line.type === 'input' && <span style={{ color: 'var(--red)', fontWeight: 600 }}>{line.text}</span>}
                  {line.type === 'system' && <span style={{ color: 'var(--gray-500)' }}>{line.text}</span>}
                  {line.type === 'success' && <span style={{ color: 'var(--white)' }}>{line.text}</span>}
                  {line.type === 'error' && <span style={{ color: 'var(--red)' }}>{line.text}</span>}
                  {line.type === 'output' && <span style={{ color: 'var(--gray-300)' }}>{line.text}</span>}
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
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
              }}
            >
              <span className="ndot" style={{ color: 'var(--red)' }}>$</span>
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
                  color: 'var(--white)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.88rem',
                }}
                autoFocus
              />
              <button
                type="submit"
                className="mono-tag mono-tag-red"
                style={{ cursor: 'pointer' }}
              >
                EXECUTE <CornerDownLeft size={12} />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
