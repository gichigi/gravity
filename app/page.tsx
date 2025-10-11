"use client"

import { useState, useEffect } from "react"
import ChatInput from "@/components/chat-input"
import RoastError from "@/components/roast-error"

// 12 prompt suggestions with full prompts
const PROMPT_SUGGESTIONS = [
  {
    button: "Todo app",
    prompt: "Build me a todo app that uses AI to prioritize tasks based on deadlines and importance"
  },
  {
    button: "Recipe finder",
    prompt: "Create a recipe app that calculates nutritional info and creates shopping lists automatically"
  },
  {
    button: "Crypto tracker", 
    prompt: "Build a crypto portfolio tracker that shows real-time prices and calculates profit/loss"
  },
  {
    button: "Dating app",
    prompt: "Build a dating app that matches people based on shared interests and location"
  },
  {
    button: "AI chatbot",
    prompt: "Build an AI chatbot for customer support that can handle common questions automatically"
  },
  {
    button: "Social network",
    prompt: "Build a social network for pet owners to share photos and connect with local pet parents"
  },
  {
    button: "Meditation app",
    prompt: "Build a meditation app with guided sessions, progress tracking, and calming background sounds"
  },
  {
    button: "Fitness tracker",
    prompt: "Build a fitness tracker that creates workout plans based on goals and tracks progress with photos"
  },
  {
    button: "Portfolio site",
    prompt: "Build a portfolio website for designers with animated galleries and client testimonials"
  },
  {
    button: "E-commerce store",
    prompt: "Build an online store for handmade jewelry with product customization and secure payments"
  },
  {
    button: "Blog platform",
    prompt: "Build a blogging platform with rich text editor, SEO tools, and social media integration"
  },
  {
    button: "Video editor",
    prompt: "Build a simple video editor for social media with filters, transitions, and auto-captioning"
  }
]

export default function Home() {
  const [roast, setRoast] = useState<{status: string, message: string} | null>(null)
  const [originalPrompt, setOriginalPrompt] = useState<string>("")
  const [shuffledSuggestions, setShuffledSuggestions] = useState<typeof PROMPT_SUGGESTIONS>([])

  // Pick 4 random suggestions on page load
  useEffect(() => {
    const shuffled = [...PROMPT_SUGGESTIONS].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, 4) // Only show 4 buttons
    setShuffledSuggestions(selected)
  }, [])

  const handleRoast = (roastData: {status: string, message: string}, prompt: string) => {
    setRoast(roastData)
    setOriginalPrompt(prompt)
  }

  const handleDismiss = () => {
    setRoast(null)
    setOriginalPrompt("")
  }


  const handleSuggestionClick = (suggestion: { button: string; prompt: string }) => {
    setOriginalPrompt(suggestion.prompt) // This will trigger the input to update
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'oklch(18.2% 0 0)' }}>
      <div className="w-full max-w-3xl flex flex-col items-center">
        {/* Title */}
        <h1 className="text-center font-semibold tracking-tighter sm:text-[32px] md:text-[46px] text-[29px] mb-4" style={{ fontFamily: 'GeistSans, "GeistSans Fallback", ui-sans-serif, system-ui, sans-serif', lineHeight: '69px', letterSpacing: '-2.3px', color: 'oklch(0.946 0 0)' }}>
          What do you want to create?
        </h1>
        
        {/* Subheading */}
        <h2 className="-mt-4 -mb-4 text-center text-[clamp(12px,3.5vw,20px)] sm:text-[20px] pb-4 whitespace-nowrap sm:whitespace-normal leading-tight tracking-tight mb-4" style={{ fontFamily: 'GeistSans, "GeistSans Fallback", ui-sans-serif, system-ui, sans-serif', fontWeight: '400', lineHeight: '25px', letterSpacing: '-0.5px', color: 'oklch(0.706 0 0)' }}>
          Start building with a single prompt. No coding needed.
        </h2>
        
        {/* Prompt Input */}
        <div className="w-full max-w-2xl">
          <ChatInput 
            onRoast={handleRoast}
            initialValue={roast ? "" : originalPrompt}
            suggestionValue={originalPrompt}
          />
          {/* Roast Error Display - positioned right below input */}
          {roast && (
            <RoastError 
              status={roast.status}
              message={roast.message}
              onDismiss={handleDismiss}
            />
          )}
        </div>
        
        {/* Dynamic Prompt Suggestions */}
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mt-8">
          {shuffledSuggestions.map((suggestion, index) => (
            <button 
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-gray-300 hover:text-white transition-all duration-200 text-sm font-medium hover:scale-105"
            >
              {suggestion.button}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
