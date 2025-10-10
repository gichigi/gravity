"use client"

import ChatInput from "@/components/chat-input"

export default function Home() {
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
        <div className="w-full max-w-2xl mb-8">
          <ChatInput />
        </div>
        
        {/* Prompt Suggestions */}
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
          <button 
            onClick={() => console.log('Clone a Screenshot clicked')}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-gray-300 hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Clone a Screenshot
          </button>
          
          <button 
            onClick={() => console.log('Import from Figma clicked')}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-gray-300 hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.852 8.981h-4.588v-1.956c0-1.04.849-1.891 1.891-1.891h2.697V1.564c0-.874-.71-1.564-1.564-1.564H8.123c-.874 0-1.564.69-1.564 1.564v4.57c0 .874.69 1.564 1.564 1.564h2.697v1.956H6.148c-1.04 0-1.891.849-1.891 1.891v11.256c0 1.04.849 1.891 1.891 1.891h9.704c1.04 0 1.891-.849 1.891-1.891V10.872c0-1.04-.849-1.891-1.891-1.891z"/>
            </svg>
            Import from Figma
          </button>
          
          <button 
            onClick={() => console.log('Upload a Project clicked')}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-gray-300 hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload a Project
          </button>
          
          <button 
            onClick={() => console.log('Landing Page clicked')}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-gray-300 hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Landing Page
          </button>
        </div>
      </div>
    </div>
  )
}
