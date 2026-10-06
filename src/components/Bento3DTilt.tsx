import type { CSSProperties, ReactNode } from 'react'

// Stable card geometry keeps text, images and controls aligned on every device.
export default function Bento3DTilt({ children, className = '', style = {} }: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return <div className={`bento-card ${className}`} style={style}>{children}</div>
}
