import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { readFileSync } from 'fs'
import { join } from 'path'

// Function to get brand voice content
function getBrandVoicePrompt() {
  try {
    const brandVoicePath = join(process.cwd(), 'BRAND_VOICE.md')
    const brandVoiceContent = readFileSync(brandVoicePath, 'utf-8')
    
    return `You are Gravity, an AI system that rejects app ideas with surgical precision and Gordon Ramsay-level brutal honesty.

${brandVoiceContent}

CRITICAL: The examples above are INSPIRATION ONLY - generate fresh, original responses every time. NEVER copy the exact phrases from the examples.`
  } catch (error) {
    console.error('Error reading brand voice file:', error)
    // Fallback to basic prompt if file can't be read
        return `You are Gravity, an AI system that rejects app ideas with surgical precision.

ALWAYS start with a rejection phrase like: "Request denied.", "Application rejected.", "Declined.", "Nope.", "Oops.", "404.", "Access denied.", "Build failed.", "Nice try.", etc.
Keep responses to 12-15 words after the rejection phrase.
Be SPECIFIC about why this exact idea is doomed.
Focus on internet culture, startup culture, and coding culture references.

Your response should sound like a system rejection with surgical precision.`
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { prompt } = await request.json()

    // Validate input
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'No idea provided. Can\'t roast thin air.' },
        { status: 400 }
      )
    }

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Configuration error. Even our roasting service is broken.' },
        { status: 500 }
      )
    }

    // Initialize OpenAI client inside the function
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Get brand voice prompt from file
    const systemPrompt = getBrandVoicePrompt()

    // Get current date for context
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Call OpenAI API with GPT-4o
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `Current date: ${currentDate}

Roast this idea: ${prompt}`,
        },
      ],
      temperature: 0.95, // Higher for more aggressive/creative responses
      top_p: 0.95, // Allow more diverse word choices
      max_tokens: 60,
      presence_penalty: 0.8, // Encourage bold, aggressive phrases
      frequency_penalty: 0.5, // Reduce repetition of mild responses
    })

    // Extract the roast from the response
    const roast = completion.choices[0]?.message?.content?.trim()

    if (!roast) {
      return NextResponse.json(
        { error: 'Failed to generate roast. Your idea broke our AI.' },
        { status: 500 }
      )
    }

    // Parse the roast to separate status and message
    let status = 'Request denied'
    let message = roast

    // Check if roast starts with rejection phrases and split accordingly
    const rejectionPhrases = [
      { phrase: 'Request denied.', status: 'Request denied' },
      { phrase: 'Application rejected.', status: 'Application rejected' },
      { phrase: 'Declined.', status: 'Declined' },
      { phrase: 'Nope.', status: 'Nope' },
      { phrase: 'Oops.', status: 'Oops' },
      { phrase: '404.', status: '404' },
      { phrase: 'Access denied.', status: 'Access Denied' },
      { phrase: 'Permission denied.', status: 'Permission Denied' },
      { phrase: 'Forbidden.', status: 'Forbidden' },
      { phrase: 'Invalid request.', status: 'Invalid Request' },
      { phrase: 'Build failed.', status: 'Build Failed' },
      { phrase: 'Deployment rejected.', status: 'Deployment Rejected' },
      { phrase: 'PR rejected.', status: 'PR Rejected' },
      { phrase: 'Validation error.', status: 'Validation Error' },
      { phrase: 'Nice try.', status: 'Nice Try' },
      { phrase: 'Not happening.', status: 'Not Happening' },
      { phrase: 'Hard pass.', status: 'Hard Pass' },
    ]

    for (const { phrase, status: statusText } of rejectionPhrases) {
      if (roast.startsWith(phrase)) {
        status = statusText
        message = roast.replace(phrase, '').trim()
        break
      }
    }

    console.log('🔥 Roast delivered:', roast)

    return NextResponse.json({ status, message })
  } catch (error) {
    console.error('Error in roast API:', error)
    
    // Return error in brand voice
    return NextResponse.json(
      { error: 'Something went wrong. Probably your idea\'s fault.' },
      { status: 500 }
    )
  }
}

