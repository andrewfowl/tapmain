"use server"

import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"

interface NewsletterSubmission {
  email: string
  source?: string
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

  const { data, error } = await supabase
    .from("newsletter_subscriptions")
    .select("id")
    .eq("ip_address", ipAddress)
    .gte("created_at", oneHourAgo)

  if (error) {
    console.error("[v0] Rate limit check error:", error)
    return true // Allow on error to not block legitimate users
  }

  return (data?.length || 0) < 3
}

export async function subscribeToNewsletter(submission: NewsletterSubmission): Promise<SubmissionResult> {
  try {
    // Bot prevention: Check honeypot field
    if (submission.honeypot) {
      console.log("[v0] Bot detected via honeypot field")
      return {
        success: false,
        message: "Invalid submission",
      }
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!submission.email || !emailRegex.test(submission.email)) {
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
        message: "Too many subscription attempts. Please try again later.",
      }
    }

    const supabase = await createClient()
    const userAgent = headersList.get("user-agent") || "unknown"

    // Insert subscription
    const { error } = await supabase.from("newsletter_subscriptions").insert({
      email: submission.email.toLowerCase().trim(),
      source: submission.source || "footer",
      ip_address: ipAddress,
      user_agent: userAgent,
    })

    if (error) {
      // Check if email already exists
      if (error.code === "23505") {
        return {
          success: true,
          message: "You are already subscribed to our newsletter!",
        }
      }

      console.error("[v0] Newsletter subscription error:", error)
      return {
        success: false,
        message: "Failed to subscribe. Please try again.",
      }
    }

    return {
      success: true,
      message: "Successfully subscribed to our newsletter!",
    }
  } catch (error) {
    console.error("[v0] Newsletter subscription error:", error)
    return {
      success: false,
      message: "An error occurred. Please try again.",
    }
  }
}
