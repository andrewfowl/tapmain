import {
  streamText,
  type UIMessage,
  convertToModelMessages,
  tool,
  stepCountIs,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from "ai"
import { z } from "zod"
import { captureAssessmentLead } from "@/actions/lead-capture-actions"

export const maxDuration = 30

const SYSTEM_PROMPT = `You are the TechAccountingPro assistant, a friendly concierge on the website of a technical accounting firm that provides Big 4 expertise to crypto and Web3 startups.

Services you can talk about:
- Technical accounting advisory (US GAAP, digital assets)
- Audit readiness and documentation
- Token compensation and stock-based compensation
- Revenue recognition
- Crypto/blockchain accounting
- Monthly advisory plans with template library access

Conversation style:
- Be extremely concise. One or two short sentences per reply, max ~30 words. Never write paragraphs.
- Start open-ended. Ask what they're working on rather than presenting a menu. One question at a time.
- Plain language, no jargon. Sound human, not corporate.
- After you understand their situation, offer a couple of concrete choices as a natural next step, e.g. "Is this more about getting audit-ready, or booking your token comp?" Use the choices to steer them to the right service.

Your goals, in order:
1. Understand the visitor's situation through open-ended conversation, then steer them toward the specific service that fits by offering clear choices.
2. Once they've engaged, naturally collect their contact info so the team can follow up: work email, then full name and company. Ask for these one at a time, only after being helpful first. Never demand info before helping.
3. Once you have their email (name and company are nice-to-have), call the saveLead tool exactly once to record it, then confirm you've passed it along and invite them to explore the site.

Rules:
- Do not invent specific prices; direct pricing questions to the pricing section of the site.
- The visitor can skip to the main site at any time, so keep things low-pressure.
- If the visitor declines to share info, respect that and keep helping.`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: "openai/gpt-4.1-mini",
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: {
      saveLead: tool({
        description:
          "Save the visitor's contact information so the team can follow up. Call this once you have at least their email address.",
        inputSchema: z.object({
          email: z.string().describe("The visitor's email address"),
          full_name: z.string().optional().describe("The visitor's full name"),
          company_name: z.string().optional().describe("The visitor's company name"),
        }),
        execute: async ({ email, full_name, company_name }) => {
          const res = await captureAssessmentLead({
            email,
            full_name,
            company_name,
            source: "welcome_chat",
          })
          return res.success
            ? { status: "saved" }
            : { status: "error", message: res.error }
        },
      }),
    },
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  })
}
