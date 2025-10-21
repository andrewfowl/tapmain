"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

async function checkRateLimit(ipAddress: string): Promise<boolean> {
  const supabase = await createClient()
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

  const { data, error } = await supabase.from("waitlist").select("id").gte("created_at", oneHourAgo)

  if (error) {
    console.error("[v0] Rate limit check error:", error)
    return true // Allow on error to not block legitimate users
  }

  return (data?.length || 0) < 3
}

export async function submitWaitlistSignup(formData: FormData) {
  try {
    const honeypot = formData.get("website") as string
    if (honeypot) {
      console.log("[v0] Bot detected via honeypot field in waitlist")
      return {
        success: false,
        error: "Invalid submission.",
      }
    }

    const supabase = await createClient()

    const firstName = formData.get("first_name") as string
    const lastName = formData.get("last_name") as string
    const email = formData.get("email") as string
    const company = formData.get("company") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return {
        success: false,
        error: "Please fill in all required fields.",
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please provide a valid email address.",
      }
    }

    const headersList = await headers()
    const ipAddress = headersList.get("x-forwarded-for")?.split(",")[0] || headersList.get("x-real-ip") || "unknown"

    const withinLimit = await checkRateLimit(ipAddress)
    if (!withinLimit) {
      return {
        success: false,
        error: "Too many submission attempts. Please try again later.",
      }
    }

    const { error } = await supabase.from("waitlist").insert({
      name: `${firstName} ${lastName}`.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || null,
      message: message?.trim() || `Phone: ${phone || "N/A"}`,
      source: "interactive-assessment",
      status: "pending",
    })

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        error: "Failed to join waitlist. Please try again.",
      }
    }

    revalidatePath("/")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Waitlist signup error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}
