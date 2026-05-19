import React from 'react'

const techs = [
  'Python', 'C++', 'PHP', 'Laravel', 'React', 'TypeScript', 'Arduino', 'Linux', 'MySQL'
]

export default function TechStack() {
  return (
    <section style={{
      width: '100%',
      overflow: 'hidden',
      background: 'rgba(10, 22, 40, 0.3)',
      borderTop: '1px solid var(--border-glass)',
      borderBottom: '1px solid var(--border-glass)',
      padding: '2.5rem 0',
      position: 'relative',
      display: 'flex'
    }}>
      {/* Edge gradients */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '15%',
        background: 'linear-gradient(to right, var(--bg-deep), transparent)', zIndex: 2, pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '15%',
        background: 'linear-gradient(to left, var(--bg-deep), transparent)', zIndex: 2, pointerEvents: 'none'
      }} />

      <div className="marquee-content" style={{ display: 'flex', gap: '4rem', width: 'max-content' }}>
        {[...techs, ...techs, ...techs, ...techs].map((t, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '0.85rem',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            opacity: 0.8
          }}>
            <span style={{ color: 'var(--cyan-dim)' }}>✦</span>
            {t}
          </div>
        ))}
      </div>

      <style>{`
        .marquee-content {
          animation: scrollMarquee 40s linear infinite;
        }
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); } /* Since we repeated 4 times, scroll 1/4 of total width */
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
