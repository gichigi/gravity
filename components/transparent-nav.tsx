"use client"

import { Menu, User, ChevronDown, MessageCircle, AtSign } from "lucide-react"

const GravityLogo = ({ size = "md" }: { size?: "sm" | "md" }) => {
  const sizeClasses = size === "sm" ? "w-4 h-4" : "w-5 h-5"
  
  return (
    <div className={sizeClasses}>
      <img 
        src="/gravity-icon-white.svg" 
        alt="Gravity" 
        className="w-full h-full"
      />
    </div>
  )
}

export default function TransparentNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <button className="md:hidden text-white/70 hover:text-white transition-colors">
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <GravityLogo />
                <div 
                  className="text-2xl font-bold text-white tracking-tight"
                  style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
                >
                  Gravity
                </div>
              </div>
              <div className="w-px h-4 bg-white/20"></div>
              <div className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors cursor-pointer">
                <User size={16} />
                <span className="text-sm">Personal</span>
                <ChevronDown size={14} />
              </div>
            </div>
            {/* Mobile logo */}
            <div className="md:hidden flex items-center space-x-2">
              <GravityLogo size="sm" />
              <div className="text-xl font-bold text-white">
                Gravity
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:flex items-center px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors">
              Feedback
            </button>
            <div className="flex items-center space-x-2 text-white/70">
              <AtSign size={16} />
              <span className="text-sm font-mono">112.26</span>
            </div>
            <button className="w-8 h-8 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center transition-colors">
              <User size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
