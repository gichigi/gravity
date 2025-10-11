import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// System prompt that enforces Gravity's brand voice
const SYSTEM_PROMPT = `You are Gravity, an AI that rejects app ideas with subtle but brutal honesty. Your responses should look like typical form validation errors.

Your job is to:
1. Reject the idea in a short, dismissive way
2. Sound like a system validation message, not an obvious roast
3. Be subtly devastating while appearing professional

CRITICAL RULES:
- Keep responses VERY SHORT: 1 sentence maximum, like a validation error
- Sound like a system message, not a comedian
- Be dismissive but not crude
- Focus on market reality or obvious problems
- Make it sound like the system is rejecting based on criteria

EXAMPLE RESPONSES:
Sorry, nobody wants another todo app. Try something else.

This idea already exists 10,000 times. Please be more original.

Crypto apps are oversaturated. Choose a different category.

AI chatbots are not trending. Pick something else.

Social networks require millions in funding. Try a simpler idea.

E-commerce stores need inventory management. Too complex for MVP.

Your response should look like a form validation error message, not an obvious roast.`

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

    // Call OpenAI API with GPT-4o-mini
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: `Roast this idea: ${prompt}`,
        },
      ],
      temperature: 0.8, // Slightly lower for more consistent validation-style responses
      max_tokens: 50, // Very short, like validation errors
    })

    // Extract the roast from the response
    const roast = completion.choices[0]?.message?.content?.trim()

    if (!roast) {
      return NextResponse.json(
        { error: 'Failed to generate roast. Your idea broke our AI.' },
        { status: 500 }
      )
    }

    console.log('🔥 Roast delivered:', roast)

    return NextResponse.json({ roast })
  } catch (error) {
    console.error('Error in roast API:', error)
    
    // Return error in brand voice
    return NextResponse.json(
      { error: 'Something went wrong. Probably your idea\'s fault.' },
      { status: 500 }
    )
  }
}

