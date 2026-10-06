import { useEffect, useRef, useState } from 'react'
import { Terminal, X } from 'lucide-react'
import AccessibleDialog from './AccessibleDialog'

export default function CyberTerminal({ isOpen, onClose, lang = 'es' }: { isOpen: boolean; onClose: () => void; lang?: 'es' | 'en' }) {
  const es = lang === 'es'
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const logRef = useRef<HTMLDivElement>(null)
  const commands: Record<string, string> = {
    help: es ? 'whoami · skills · projects · leadership · hardware · billiards · contact · clear\nEscribe un comando o usa los botones.' : 'whoami · skills · projects · leadership · hardware · billiards · contact · clear\nType a command or use the buttons.',
    whoami: es ? 'Félix E. Martínez Flores\nEstudiante de Computer Science @ UTRGV\nFounder & CPO @ Build Pa’l Norte\nSoftware, hardware y comunidad.' : 'Félix E. Martínez Flores\nComputer Science student @ UTRGV\nFounder & CPO @ Build Pa’l Norte\nSoftware, hardware & community.',
    skills: 'React · React Native · Expo · TypeScript\nSupabase · PostgreSQL · Python · Node.js\nESP32 · Arduino · BLE\nC# · .NET · Revit API · MCP\nGit · GitHub · Vercel · Linux',
    projects: 'KronoBook / Web + Supabase\nAuraFit / React Native + Expo\nGazpacho’s / React + Vite\nTPH Monitor / BLE + ESP32\nRevit CAD / C# + MCP\nFamily Weather / Python + OpenWeather',
    leadership: es ? 'Build Pa’l Norte — Founder & CPO\nConectamos talento, tecnología y comunidad desde el norte de México. Mi enfoque está en producto: entender necesidades, definir prioridades y acompañar el desarrollo de proyectos.\nTambién: DualFX, IEEEXtreme, FronteraHacks e IEEE UTRGV.' : 'Build Pa’l Norte — Founder & CPO\nConnecting talent, technology, and community from northern Mexico. My focus is product: understanding needs, setting priorities, and helping projects develop.\nAlso: DualFX, IEEEXtreme, FronteraHacks, and IEEE UTRGV.',
    hardware: 'ESP32 · Arduino Mega 2560 · BLE\npH / temperatura / turbidez · RFID · LCD\nRaspberry Pi · Linux',
    contact: 'felix.martinez08@utrgv.edu\nhttps://github.com/Felglitch739\nhttps://felixmf.lat\nMatamoros / Brownsville',
  }

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight }, [history])

  const run = (value: string) => {
    const command = value.trim().toLowerCase()
    if (!command) return
    setInput('')
    if (command === 'clear') { setHistory([]); return }
    if (command === 'billiards') {
      onClose()
      const section = document.getElementById('human-side')
      const details = section?.querySelector('details')
      if (details) details.open = true
      section?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
      return
    }
    setHistory(previous => [...previous, `$ ${command}\n${commands[command] ?? (es ? 'Comando desconocido. Escribe help.' : 'Unknown command. Type help.')}`].slice(-40))
  }

  return <AccessibleDialog open={isOpen} onClose={onClose} labelledBy="terminal-title">
    <div className="dialog-heading"><h2 id="terminal-title"><Terminal size={20} /> FMF / Terminal</h2><button className="icon-button" onClick={onClose} aria-label={es ? 'Cerrar terminal' : 'Close terminal'}><X size={20} /></button></div>
    <div className="terminal-commands">{[...Object.keys(commands).filter(x => x !== 'help'), 'billiards', 'clear'].map(command => <button key={command} className="mono-tag" onClick={() => run(command)}>{command}</button>)}</div>
    <div className="terminal-log" ref={logRef} role="log" aria-label={es ? 'Salida de terminal' : 'Terminal output'}><p className="body-text">{commands.help}</p>{history.map((line, index) => <p key={index}>{line}</p>)}</div>
    <form className="terminal-input" onSubmit={e => { e.preventDefault(); run(input) }}><span aria-hidden="true">$</span><input className="bento-input" value={input} onChange={e => setInput(e.target.value)} aria-label={es ? 'Comando' : 'Command'} placeholder="help" autoComplete="off" spellCheck={false} autoFocus /><button className="btn-bento btn-bento-outline">{es ? 'Ejecutar' : 'Run'} ↵</button></form>
  </AccessibleDialog>
}
