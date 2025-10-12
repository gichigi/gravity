"use client"

import { useState, forwardRef, useImperativeHandle } from "react"

interface RoastErrorProps {
  status: string
  message: string
  onDismiss: () => void
}

interface RoastErrorRef {
  dismiss: () => void
}

const RoastError = forwardRef<RoastErrorRef, RoastErrorProps>(({ status, message, onDismiss }, ref) => {
  const [isVisible, setIsVisible] = useState(true)

  // Random dismissal button texts
  const buttonTexts = [
    "Got it", "Sorry", "God, you're right", "Wow, ok", "I surrender", 
    "You win", "Fair point", "Touché", "That hurt", "Brutal but fair",
    "Ouch", "Haha, true", "You got me", "Fair enough", "I give up"
  ]
  const [selectedButton] = useState(buttonTexts[Math.floor(Math.random() * buttonTexts.length)])

  const dismiss = () => {
    setIsVisible(false)
    setTimeout(onDismiss, 250)
  }

  useImperativeHandle(ref, () => ({
    dismiss
  }))

  const handleDismiss = () => {
    dismiss()
  }

  return (
    <div className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-[60] transition-all duration-250 ease-out ${
      isVisible 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-0 translate-x-full'
    }`}>
      {/* Vercel-style toast container */}
      <div className="bg-black/80 backdrop-blur-xl border border-white/10 
                      rounded-xl shadow-2xl shadow-black/50 p-4 space-y-3">
        
        {/* Status */}
        <div className="text-sm font-medium text-white/90 leading-tight">
          {status}
        </div>
        
        {/* Message */}
        <div className="text-sm text-white/70 leading-relaxed break-words">
          {message}
        </div>
        
        {/* Dismissal Button */}
        <button 
          onClick={handleDismiss}
          className="w-full px-3 py-2 text-xs font-medium text-white/60 hover:text-white 
                     bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 
                     rounded-lg transition-all duration-200"
        >
          {selectedButton}
        </button>
      </div>
    </div>
  )
})

RoastError.displayName = 'RoastError'

export default RoastError

