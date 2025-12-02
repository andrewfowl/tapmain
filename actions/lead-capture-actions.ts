"use server"

import { createClient } from "@/lib/supabase/server"

interface LeadCaptureData {
  email: string
  company_name?: string
  full_name?: string
  phone?: string
  source: string
}

export async function captureAssessmentLead(data: LeadCaptureData) {
  const supabase = await createClient()

  const { error } = await supabase.from("lead_capture").upsert(
    {
      email: data.email,
      company_name: data.company_name || null,
      full_name: data.full_name || null,
      phone: data.phone || null,
      source: data.source,
      status: "new",
    },
    {
      onConflict: "email",
      ignoreDuplicates: false,
    },
  )

  if (error) {
    console.error("[v0] Error capturing lead:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
