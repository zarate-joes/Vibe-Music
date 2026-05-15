import { useEffect, type ReactNode } from 'react'
import { useTheme } from '../../context/ThemeContext'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const { dark } = useTheme()

  // Prevent scrolling on the body when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  if (!isOpen) return null

  // ── Theme Tokens ────────────────────────────────────────────────────
  const cardBg = dark ? 'bg-music-blue' : 'bg-white'
  const textColor = dark ? 'text-white' : 'text-music-black'
  const border = dark ? 'border-music-grey/20' : 'border-music-black'
  const shadow = dark ? 'shadow-[8px_8px_0px_0px_#fc6568]' : 'shadow-[8px_8px_0px_0px_#181324]'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Click away to close backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div className={`relative z-10 w-full max-w-sm ${cardBg} ${textColor} border-4 ${border} ${shadow} flex flex-col animate-in zoom-in-95 duration-200`}>
        
        {/* Header */}
        <div className={`p-4 border-b-2 ${border} flex justify-between items-center bg-black/5`}>
          <h3 className="text-sm font-black tracking-widest uppercase">{title}</h3>
          <button 
            onClick={onClose}
            className={`w-8 h-8 flex items-center justify-center border-2 ${border} hover:bg-music-red hover:text-white hover:border-music-red transition-colors`}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-sm font-medium">
          {children}
        </div>

        {/* Footer / Action */}
        <div className={`p-4 border-t-2 border-dashed ${border} flex justify-end`}>
          <button 
            onClick={onClose}
            className={`px-6 py-2 border-2 ${border} text-[10px] font-black tracking-widest uppercase hover:bg-music-black hover:text-white transition-colors`}
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  )
}