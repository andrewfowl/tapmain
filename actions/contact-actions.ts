"use server"

import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"

interface ContactSubmission {
  firstName: string
  lastName: string
  email: string
  company?: string
  subject?: string
  message: string
  privacyConsent: boolean
  honeypot?: string // Bot trap field
}

interface SubmissionResult {
  success: boolean
  message: string
}

// Max 3 submissions per IP per hour
const MAX_PER_HOUR_PER_IP = 3

type Supa = Awaited<ReturnType<typeof createClient>>

async function checkRateLimit(supabase: Supa, ipAddress: string): Promise<boolean> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

  const { count, error } = await supabase
    .from("service_requests")
    .select("id", { count: "exact", head: true })
    .eq("ip_address", ipAddress)
    .gte("created_at", oneHourAgo)

  if (error) {
    console.error("[v0] Rate limit check error:", error)
    return true // allow on error
  }

  return (count || 0) < MAX_PER_HOUR_PER_IP
}


export async function submitContactForm(submission: ContactSubmission): Promise<SubmissionResult> {
  try {
    // Honeypot fast-fail
    if (submission.honeypot?.trim()) {
      return { success: false, message: "Invalid submission" }
    }

    // Normalize
    const firstName = submission.firstName?.trim()
    const lastName  = submission.lastName?.trim()
    const email     = submission.email?.toLowerCase().trim()
    const company   = submission.company?.trim() || null
    const subject   = submission.subject?.trim()
    const message   = submission.message?.trim()

    // Requireds
    if (!firstName || !lastName || !email || !message) {
      return { success: false, message: "Please fill in all required fields" }
    }

    if (!submission.privacyConsent) {
      return { success: false, message: "Please agree to the Privacy Policy to continue" }
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { success: false, message: "Please provide a valid email address" }
    }

    // Headers() is sync
    const hdrs = headers()
    const rawIp =
      hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      hdrs.get("x-real-ip")?.trim() ||
      null

    const supabase = await createClient()

    // Rate limit only if we have an IP
    if (rawIp) {
      const withinLimit = await checkRateLimit(supabase, rawIp)
      if (!withinLimit) {
        return { success: false, message: "Too many submission attempts. Please try again later." }
      }
    }

    const fullName = `${firstName} ${lastName}`
    const fullMessage = subject ? `Subject: ${subject}\n\n${message}` : message

    const { error } = await supabase.from("service_requests").insert({
      full_name: fullName,
      email,
      company,
      message: fullMessage,
      solution_id: null,          // general contact
      ip_address: rawIp ?? null,  // store null if unknown
    })

    if (error) {
      console.error("[v0] Contact form submission error:", error)
      return {
        success: false,
        message: "Failed to submit your message. Please try again or contact us directly.",
      }
    }

    return {
      success: true,
      message: "Thank you for contacting us! We'll get back to you within 24 hours.",
    }
  } catch (err) {
    console.error("[v0] Contact form submission error:", err)
    return { success: false, message: "An error occurred. Please try again." }
  }
}
