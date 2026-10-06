import { useState, useRef, useEffect } from 'react'
import { motion, useDragControls } from 'framer-motion'
import { Terminal as TerminalIcon, X, CornerDownLeft, Move } from 'lucide-react'

import AccessibleDialog from './AccessibleDialog'

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
  const sequence = useRef(2)
  const controls = useDragControls()
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
      { id: (++sequence.current).toString(), type: 'input', text: `$ ${cmdStr}` },
    ]

    switch (trimmed) {
      case 'help':
        newHistory.push({
          id: (++sequence.current).toString(),
          type: 'output',
          text: `COMMAND LIST:
  • whoami     - Profile summary, education (UTRGV & RFM) & engineering focus
  • skills     - Full stack (Mobile, Web, Backend, Hardware/IoT, CAD/MCP)
  • projects   - KronoBook, TPH Monitor, AuraFit, Revit MCP, Gazpacho's, Weather Bot
  • leadership - Build Pa'l Norte, DualFX, IEEEXtreme, FronteraHacks & IEEE
  • hardware   - ESP32, Arduino, BLE, sensors & embedded systems
  • billiards  - Jump to 2D Physics Lab & 8-Ball Simulator
  • contact    - University email, GitHub & portfolio url
  • clear      - Clear terminal screen`,
        })
        break

      case 'whoami':
        newHistory.push({
          id: (++sequence.current).toString(),
          type: 'success',
          text: `[IDENTITY]: Félix E. Martínez Flores
[ROLE]: Software Engineer | Full-Stack & Mobile Developer | Hardware & Embedded Systems Enthusiast
[EDUCATION]:
  • University of Texas Rio Grande Valley (UTRGV) - Computer Science
  • Preparatoria RFM (Matamoros)
[PROFESSIONAL FOCUS]: Full-stack web & mobile development, multi-tenant cloud architecture, hardware/IoT telemetry, and CAD/BIM AI plugins. Founder & CPO at Build Pa’l Norte.`,
        })
        break

      case 'skills':
        newHistory.push({
          id: (++sequence.current).toString(),
          type: 'output',
          text: `TECHNICAL ARSENAL:
• Frontend & Mobile: React, React Native, Expo, TypeScript, JavaScript, Tailwind CSS, Vite
• Backend & Databases: Python, Flask, Node.js, C++, C#, Supabase, PostgreSQL (Multi-tenant, RLS)
• Hardware & IoT: ESP32, Arduino Mega 2560, Raspberry Pi, BLE, Water Quality Probes, RFID, LCD 1602
• CAD & AI: C# Autodesk Revit API plugins, Model Context Protocol (MCP) & LLMs
• DevOps & Environments: Git, GitHub, Vercel, Linux (Bash), Windows`,
        })
        break

      case 'projects':
        newHistory.push({
          id: (++sequence.current).toString(),
          type: 'output',
          text: `FEATURED CORE PROJECTS:
1. KronoBook [SaaS]: Multi-tenant booking platform with dynamic routing & RLS.
2. TPH Monitor [IoT Mobile]: Real-time water quality telemetry via BLE & ESP32.
3. AuraFit [AI Mobile]: Mobile fitness tracking suite (FronteraHacks 24h prototype, React Native).
4. Revit CAD Assistant [Desktop]: C# extension connecting BIM models to LLMs via MCP.
5. Gazpacho's [Commercial Web]: High-end restaurant web redesign on Vercel.
6. Family Weather Bot [Automation]: Python weather forecast & webhook alert engine.`,
        })
        break

      case 'leadership':
        newHistory.push({
          id: (++sequence.current).toString(),
          type: 'output',
          text: `COMMUNITY LEADERSHIP & TRACK RECORD:
• Build Pa'l Norte: Founder & CPO. Product, technology and community from northern Mexico.
• DualFX: Co-founder. Mobile detailing business in Matamoros integrated with KronoBook.
• IEEEXtreme: Competitor in editions 18.0 (2024) and 19.0 (2025) - 24h global algorithm sprint.
• FronteraHacks: 24h Hackathon competitor (birth of AuraFit).
• IEEE Student Branch: Active chapter member (workshops, algorithmics & robotics).
• ENIEP 2023 & 2024: Academic Biology & competitive volleyball high school representative.`,
        })
        break

      case 'hardware':
        newHistory.push({
          id: (++sequence.current).toString(),
          type: 'output',
          text: `HARDWARE & EMBEDDED LAB:
• Microcontrollers: ESP32 (Wi-Fi + BLE dual core), Arduino Mega 2560 R3.
• Wireless: Bluetooth Low Energy (BLE) peripheral/central communication.
• Peripherals: Water quality probes (pH, temperature, turbidity), RC522 RFID, ultrasonic HC-SR04, LCD 1602 I2C.
• Edge: Raspberry Pi headless Linux nodes.`,
        })
        break

      case 'billiards':
        newHistory.push({
          id: (++sequence.current).toString(),
          type: 'success',
          text: '[PHYSICS LAB]: Navigating to 2D Physics Vector Simulator (8-Ball)...',
        })
        setTimeout(() => {
          onClose()
          document.getElementById('human-side')?.scrollIntoView({ behavior: 'smooth' })
        }, 350)
        break

      case 'contact':
        newHistory.push({
          id: (++sequence.current).toString(),
          type: 'output',
          text: `COMMUNICATION CHANNELS:
• University Email: felix.martinez04@utrgv.edu
• Portfolio: https://felixmf.lat
• GitHub: https://github.com/Felglitch739
• Location: Brownsville, TX / Matamoros, Tamps.`,
        })
        break

      case 'clear':
        setHistory([])
        setInput('')
        return

      default:
        newHistory.push({
          id: (++sequence.current).toString(),
          type: 'error',
          text: `Command not recognized: "${trimmed}". Type "help" for available commands.`,
        })
        break
    }

    setHistory(newHistory.slice(-60))
    setInput('')
  }

  return (
    <>
      {isOpen && (
        <AccessibleDialog open onClose={onClose} labelledBy="terminal-title">
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
            dragListener={false}
            dragControls={controls}
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
              onPointerDown={e => { if (!(e.target as HTMLElement).closest('button')) controls.start(e) }}
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
                <span id="terminal-title" className="ndot" style={{ fontSize: '0.8rem', color: 'var(--white)' }}>
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
              {['whoami', 'skills', 'projects', 'leadership', 'hardware', 'billiards', 'contact', 'clear'].map((cmd) => (
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
                minHeight: 0,
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
                aria-label={lang === 'es' ? 'Comando de terminal' : 'Terminal command'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type command ('help', 'whoami', 'skills')..."
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--white)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.88rem',
                }}
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
        </AccessibleDialog>
      )}
    </>
  )
}
