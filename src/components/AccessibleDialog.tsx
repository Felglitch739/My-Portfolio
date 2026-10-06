import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

// Native modal dialogs supply the top layer, Escape handling and keyboard focus containment.
export default function AccessibleDialog({ open, onClose, labelledBy, children }: {
  open: boolean
  onClose: () => void
  labelledBy: string
  children: ReactNode
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <dialog ref={dialogRef} className="site-dialog" aria-labelledby={labelledBy}
      onCancel={e => { e.preventDefault(); onClose() }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="dialog-content">{children}</div>
    </dialog>
  )
}
