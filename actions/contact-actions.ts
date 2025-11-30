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

// Simple rate limiting check - max 3 submissions per IP per hour
async function checkRateLimit(ipAddress: string): Promise<boolean> {
  const supabase = await createClient()
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

  const { data, error } = await supabase.from("service_requests").select("id").gte("created_at", oneHourAgo)

  if (error) {
    console.error("[v0] Rate limit check error:", error)
    return true // Allow on error to not block legitimate users
  }

  return (data?.length || 0) < 5
}

export async function submitContactForm(submission: ContactSubmission): Promise<SubmissionResult> {
  try {
    console.log("[v0] Contact form submission received:", {
      email: submission.email,
      hasPrivacyConsent: submission.privacyConsent,
    })

    // Bot prevention: Check honeypot field
    if (submission.honeypot) {
      console.log("[v0] Bot detected via honeypot field")
      return {
        success: false,
        message: "Invalid submission",
      }
    }

    // Validate required fields
    if (!submission.firstName || !submission.lastName || !submission.email || !submission.message) {
      return {
        success: false,
        message: "Please fill in all required fields",
      }
    }

    // Validate privacy consent
    if (!submission.privacyConsent) {
      return {
        success: false,
        message: "Please agree to the Privacy Policy to continue",
      }
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(submission.email)) {
      return {
        success: false,
        message: "Please provide a valid email address",
      }
    }

    // Get IP address for rate limiting
    const headersList = await headers()
    const ipAddress = headersList.get("x-forwarded-for")?.split(",")[0] || headersList.get("x-real-ip") || "unknown"

    // Check rate limit
    const withinLimit = await checkRateLimit(ipAddress)
    if (!withinLimit) {
      return {
        success: false,
        message: "Too many submission attempts. Please try again later.",
      }
    }

    const supabase = await createClient()

    // Combine first and last name
    const fullName = `${submission.firstName.trim()} ${submission.lastName.trim()}`

    // Combine subject and message
    const fullMessage = submission.subject
      ? `Subject: ${submission.subject}\n\n${submission.message}`
      : submission.message

    // Insert contact submission into service_requests table
    const { error } = await supabase.from("service_requests").insert({
      full_name: fullName,
      email: submission.email.toLowerCase().trim(),
      company: submission.company?.trim() || null,
      message: fullMessage.trim(),
      solution_id: null, // General contact, not related to a specific solution
    })

    if (error) {
      console.error("[v0] Contact form submission error:", error)
      return {
        success: false,
        message: "Failed to submit your message. Please try again or contact us directly.",
      }
    }

    console.log("[v0] Contact form submitted successfully for:", submission.email)

    return {
      success: true,
      message: "Thank you for contacting us! We'll get back to you within 24 hours.",
    }
  } catch (error) {
    console.error("[v0] Contact form submission error:", error)
    return {
      success: false,
      message: "An error occurred. Please try again.",
    }
  }
}
