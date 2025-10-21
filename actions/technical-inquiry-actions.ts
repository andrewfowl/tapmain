"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { sendTechnicalInquiryEmails } from "@/lib/email"

export async function submitTechnicalInquiry(formData: FormData) {
  const cookieStore = cookies()

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })

  try {
    const inquiryData = {
      title: formData.get("title") as string,
      first_name: formData.get("firstName") as string,
      last_name: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || null,
      position: formData.get("position") as string,
      company: formData.get("company") as string,
      subject: formData.get("subject") as string,
      subcategory: (formData.get("subcategory") as string) || null,
      background: (formData.get("background") as string) || null,
      support_documentation: (formData.get("supportDocumentation") as string) || null,
      inquiry_questions: (formData.get("inquiryQuestions") as string) || null,
      authoritative_references: (formData.get("authoritativeReferences") as string) || null,
      preliminary_conclusions: (formData.get("preliminaryConclusions") as string) || null,
      affirmative_evidence: (formData.get("affirmativeEvidence") as string) || null,
      contradictive_evidence: (formData.get("contradictiveEvidence") as string) || null,
      terms_accepted: formData.get("termsAccepted") === "true",
      privacy_accepted: formData.get("privacyAccepted") === "true",
      status: "pending",
    }

    const { data, error } = await supabase.from("technical_inquiries").insert(inquiryData).select()

    if (error) {
      console.error("Error submitting technical inquiry:", error)
      return { success: false, error: error.message }
    }

    const emailData = {
      firstName: inquiryData.first_name,
      lastName: inquiryData.last_name,
      email: inquiryData.email,
      phone: inquiryData.phone || undefined,
      title: inquiryData.position,
      company: inquiryData.company,
      subject: inquiryData.subject,
      subcategory: inquiryData.subcategory || "",
      background: inquiryData.background || "",
      supportDocumentation: inquiryData.support_documentation || "",
      inquiry: inquiryData.inquiry_questions || "",
      authoritativeReferences: inquiryData.authoritative_references || undefined,
      preliminaryConclusion: inquiryData.preliminary_conclusions || undefined,
      affirmativeEvidence: inquiryData.affirmative_evidence || undefined,
      contradictiveEvidence: inquiryData.contradictive_evidence || undefined,
    }

    const emailResult = await sendTechnicalInquiryEmails(emailData)

    if (!emailResult.success) {
      console.error("Failed to send emails:", emailResult.error)
      // Don't fail the submission if emails fail, just log the error
    }

    return { success: true, data }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
