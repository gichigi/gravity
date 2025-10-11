"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, ArrowUp, Settings2, Mic, X, Check, Loader2 } from "lucide-react"

interface ChatInputProps {
  onRoast: (roast: {status: string, message: string}, prompt: string) => void
  initialValue?: string
  suggestionValue?: string
}

export default function ChatInput({ onRoast, initialValue = "", suggestionValue }: ChatInputProps) {
  const [input, setInput] = useState(initialValue)
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Update input when initialValue or suggestionValue changes
  useEffect(() => {
    setInput(suggestionValue || initialValue)
  }, [initialValue, suggestionValue])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      console.log("Submitted:", input)
      setIsLoading(true)
      
      try {
        // Call the roast API
        const response = await fetch('/api/roast', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: input }),
        })

        const data = await response.json()

        if (data.status && data.message) {
          console.log("🔥 Roast received:", data)
          onRoast(data, input.trim())
        } else if (data.error) {
          console.error("Error from API:", data.error)
          onRoast({ status: "Error", message: data.error }, input.trim())
        }
      } catch (error) {
        console.error("Failed to get roast:", error)
        onRoast({ status: "Network Error", message: "Your idea is so bad it broke the internet." }, input.trim())
      } finally {
        setIsLoading(false)
        // Keep input persistent - don't clear it
      }
    }
  }

  const handleMicClick = () => {
    setIsRecording(true)
    setTimeout(() => {
      setIsRecording(false)
      setInput("When speech to text feature ?")
    }, 5000)
  }

  const handleCancelRecording = () => {
    setIsRecording(false)
  }

  const handleConfirmRecording = () => {
    setIsRecording(false)
    setInput("When speech to text feature ?")
  }

  const WaveAnimation = () => {
    const [animationKey, setAnimationKey] = useState(0)

    useEffect(() => {
      const interval = setInterval(() => {
        setAnimationKey((prev) => prev + 1)
      }, 100)
      return () => clearInterval(interval)
    }, [])

    const bars = Array.from({ length: 50 }, (_, i) => {
      const height = Math.random() * 20 + 4
      const delay = Math.random() * 2
      return (
        <div
          key={`${i}-${animationKey}`}
          className="bg-gray-400 rounded-sm animate-pulse"
          style={{
            width: "2px",
            height: `${height}px`,
            animationDelay: `${delay}s`,
            animationDuration: "1s",
          }}
        />
      )
    })

    return (
      <div className="flex items-center w-full gap-1">
        <div className="flex-1 border-t-2 border-dotted border-gray-500"></div>
        <div className="flex items-center gap-0.5 justify-center px-8">{bars}</div>
        <div className="flex-1 border-t-2 border-dotted border-gray-500"></div>
      </div>
    )
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className="border border-zinc-700 rounded-2xl p-4 relative transition-all duration-500 ease-in-out overflow-hidden"
          style={{ backgroundColor: 'oklch(18.2% 0 0)' }}
        >
          {isRecording ? (
            <div className="flex items-center justify-between h-12 animate-in fade-in-0 slide-in-from-top-2 duration-500 w-full">
              <WaveAnimation />
              <div className="flex items-center gap-2 ml-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelRecording}
                  className="h-8 w-8 p-0 text-white hover:text-white hover:bg-zinc-700 rounded-lg transition-all duration-200 hover:scale-110"
                >
                  <X className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleConfirmRecording}
                  className="h-8 w-8 p-0 rounded-lg transition-all duration-200 hover:scale-110"
                  style={{ backgroundColor: "#2DD4BF", color: "#032827" }}
                >
                  <Check className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Gravity to build..."
                className="w-full bg-transparent text-gray-300 placeholder-gray-500 resize-none border-none outline-none text-base leading-relaxed min-h-[24px] max-h-32 transition-all duration-200"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = "auto"
                  target.style.height = target.scrollHeight + "px"
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    if (input.trim() && !isLoading) {
                      handleSubmit(e)
                    }
                  }
                }}
              />

              <div className="flex items-center justify-between mt-8">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-white hover:text-white hover:bg-zinc-700 rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-white hover:text-white hover:bg-zinc-700 rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    <Settings2 className="h-5 w-5" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleMicClick}
                    className="h-8 w-8 p-0 text-white hover:text-white hover:bg-zinc-700 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 active:bg-red-600/20 active:text-red-400"
                  >
                    <Mic className="h-5 w-5 transition-transform duration-200" />
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="h-8 px-3 rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: "#032827", color: "#2DD4BF" }}
                  >
                    Agent
                  </Button>
                </div>

                <Button
                  type="submit"
                  size="sm"
                  disabled={!input.trim() || isLoading}
                  className="h-8 w-8 p-0 bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-lg transition-all duration-200 hover:scale-110 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <ArrowUp className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
