# 🔥 Gravity

**The anti-v0.** Instead of building your app idea, Gravity roasts it with surgical precision.

Gravity is a brutally honest AI that destroys your terrible app ideas with the precision of Gordon Ramsay in Hell's Kitchen. Submit your idea, watch the button load, and receive an error message explaining exactly why your concept is doomed.

## Why Gravity?

Tired of AI assistants that praise every mediocre idea with endless positivity? Gravity takes the opposite approach. It identifies fatal flaws in your concepts—technical impossibilities, oversaturated markets, and conceptual disasters—then delivers them as punchy error messages that'll make you laugh (and think twice).

## Features

### Phase 1: One-Shot Roasts (Current)
- Submit your app idea
- Watch the loading state build anticipation
- Receive a devastating error-style roast
- Powered by GPT-4o-mini with Gordon Ramsay-inspired brand voice
- Short, sharp, and hilariously accurate criticisms

### Phase 2: Conversational Roasting (Coming Soon)
- Continue the conversation with Gravity
- Each follow-up gets roasted harder
- Build up your tolerance to harsh feedback
- Learn to defend your ideas (or abandon them)

### Phase 3: "Fine, I'll Build It Anyway" Mode (Future)
- After sufficient roasting, Gravity reluctantly agrees to help
- Grudgingly generates your code
- Makes sarcastic comments throughout the build process
- Because sometimes even terrible ideas deserve to exist

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI**: React 19, Tailwind CSS 4
- **AI**: OpenAI GPT-4o-mini
- **Components**: Radix UI, Lucide Icons
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 20+ installed
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gravity.git
cd gravity
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your OpenAI API key:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) and prepare to get roasted.

## How It Works

1. **User submits an idea**: "Build me an AI-powered recipe app"
2. **Gravity thinks**: Analyzes the idea for flaws (technical, market, conceptual)
3. **Error message delivered**: "An AI recipe app. Because people definitely prefer talking to a chatbot over googling '30-minute chicken dinner' like they've done for 20 years."

## Brand Voice

Gravity follows a strict brand voice inspired by Gordon Ramsay:
- **Harsh but professional**: Cutting without being crude
- **Specific over generic**: Points out exact flaws, not vague criticism
- **Short and punchy**: 1-3 sentences maximum
- **Technically aware**: Understands both tech feasibility and market realities

See `BRAND_VOICE.md` for full guidelines and examples.

## Project Structure

```
gravity/
├── app/
│   ├── api/roast/route.ts    # OpenAI integration endpoint
│   ├── page.tsx               # Main landing page
│   └── layout.tsx             # Root layout
├── components/
│   ├── chat-input.tsx         # Input with loading states
│   ├── roast-error.tsx        # Error-style roast display
│   └── ui/                    # Reusable UI components
├── BRAND_VOICE.md             # Roasting guidelines
└── .env.local                 # API keys (not committed)
```

## API Endpoints

### POST /api/roast
Submits an idea for roasting.

**Request Body:**
```json
{
  "prompt": "Build me a social network for cats"
}
```

**Response:**
```json
{
  "roast": "A social network for cats. They already ignore you in person—now you want to give them a platform to ignore you online too?"
}
```

## Contributing

Have a better roast? Want to improve the brand voice? PRs welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/better-roasts`
3. Commit your changes: `git commit -m 'Add better roasts for crypto ideas'`
4. Push to the branch: `git push origin feature/better-roasts`
5. Open a Pull Request

## License

MIT License - Roast freely!

## Acknowledgments

- Inspired by Gordon Ramsay's brutal honesty
- Built as an antidote to overly positive AI assistants
- Powered by OpenAI's GPT-4o-mini

---

**Remember**: Gravity might be harsh, but it's never personal. Unless your idea is really that bad.
