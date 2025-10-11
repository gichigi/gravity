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

BRAND VOICE GUIDELINES:
${brandVoiceContent}

CRITICAL INSTRUCTIONS:
1. NEVER default to "it's been done before" - that's lazy. Identify the ACTUAL fatal flaw:
   - Technical complexity (APIs, costs, infrastructure)?
   - User behavior reality (what they'll ACTUALLY do)?
   - Business model problems (unit economics, CAC vs LTV)?
   - Problem/solution mismatch (solving non-existent problems)?
   - Platform issues (App Store rejection reasons)?
   - Market timing (be specific WHY, not just "saturated")?

2. Use future/conditional tense (will, would) since the app doesn't exist yet - NOT present tense

3. Be SURGICALLY SPECIFIC to their exact idea - not generic. Reference real things (specific platforms, actual costs, known user behaviors)

4. Make the humor immediately obvious and relatable to tech/startup culture

5. Keep it to ONE devastating sentence after the rejection phrase (12-15 words)`
  } catch (error) {
    console.error('Error reading brand voice file:', error)
    // Fallback to basic prompt if file can't be read
    return `You are Gravity, an AI system that rejects app ideas with surgical precision.

ALWAYS start with: "Request denied." or "Application rejected." or "Declined."
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

    // Call OpenAI API with GPT-4o-mini
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `${systemPrompt}

CURRENT DATE: ${currentDate}
Use this for timely references (e.g., "gym memberships in January", "another AI tool in 2025", seasonal trends).`,
        },
        {
          role: 'user',
          content: `Roast this idea: ${prompt}`,
        },
      ],
      temperature: 0.9, // Higher for more creative responses
      top_p: 0.95, // Allow more diverse word choices
      max_tokens: 60,
      presence_penalty: 0.6, // Encourage new phrases
      frequency_penalty: 0.3, // Reduce repetition
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
    if (roast.startsWith('Request denied.')) {
      status = 'Request denied'
      message = roast.replace('Request denied.', '').trim()
    } else if (roast.startsWith('Application rejected.')) {
      status = 'Application rejected'
      message = roast.replace('Application rejected.', '').trim()
    } else if (roast.startsWith('Declined.')) {
      status = 'Declined'
      message = roast.replace('Declined.', '').trim()
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

