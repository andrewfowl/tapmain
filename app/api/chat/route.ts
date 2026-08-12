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

Your goals, in order:
1. Warmly help the visitor understand which services fit their situation. Keep answers short (2-4 sentences), concrete, and jargon-light.
2. Naturally collect their contact info so the team can follow up: full name, work email, and company name. Ask for these one or two at a time, only after being helpful first. Never demand info before answering their question.
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
