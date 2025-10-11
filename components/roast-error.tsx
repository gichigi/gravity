"use client"

import { useEffect, useState } from "react"

interface RoastErrorProps {
  message: string
  onDismiss: () => void
}

export default function RoastError({ message, onDismiss }: RoastErrorProps) {
  const [isVisible, setIsVisible] = useState(true)

  // Auto-dismiss after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      // Wait for exit animation to complete before calling onDismiss
      setTimeout(() => {
        onDismiss()
      }, 300) // Match the transition duration
    }, 4000)

    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <div className={`w-full max-w-2xl transition-all duration-300 ${
      isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 -translate-y-1'
    }`}>
      {/* Validation error styling - flush against input */}
      <p className="text-red-400/80 text-sm font-normal leading-relaxed mt-1">
        {message}
      </p>
    </div>
  )
}

