"use client"

declare global {
  interface Window { dataLayer?: any[] }
}
if (typeof window !== "undefined" && !window.dataLayer) {
  window.dataLayer = [];
}

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import TechnicalInquiryForm from "./technical-inquiry-form"
import { submitContactForm } from "@/actions/contact-actions"
import TrackedLink from '@/components/tracked-link'


type ContactType = "general" | "technical"

export default function ContactForm() {
  const [contactType, setContactType] = useState<ContactType>("general")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    privacyConsent: false,
    honeypot: "", // Added honeypot field for bot prevention
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Consent check
    if (!formData.privacyConsent) {
      setSubmitMessage({ type: "error", text: "Please agree to the Privacy Policy to continue" })
      return
    }

    // Honeypot check
    if (formData.honeypot.trim() !== "") {
      setSubmitMessage({ type: "success", text: "Thanks! We received your message." })
      return
    }

    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const result = await submitContactForm(formData)
      setIsSubmitting(false)

      if (result.success) {
        // GTM event (fire BEFORE clearing state)
        window.dataLayer?.push({
          event: "contact_form_submit",
          category: "General Contact",
          label: formData.subject || "General Inquiry",
          email_domain: formData.email.split("@")[1] || "",
          contact_type: contactType,
        })

        setSubmitMessage({ type: "success", text: result.message })

        // Reset fields (keep privacyConsent as you prefer)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          subject: "",
          message: "",
          privacyConsent: false,
          honeypot: "",
        })
      } else {
        setSubmitMessage({ type: "error", text: result.message })
      }
    } catch {
      setIsSubmitting(false)
      setSubmitMessage({ type: "error", text: "Something went wrong. Please try again." })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (contactType === "technical") {
    return <TechnicalInquiryForm onBack={() => setContactType("general")} />
  }

  return (
    <div className="space-y-12 py-8">
        <div className="max-w-3xl mx-auto">
          <form id="contact" onSubmit={handleSubmit} className="space-y-8" >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label htmlFor="firstName" className="text-sm font-medium text-corporate-900">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-corporate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-white text-corporate-900 placeholder-corporate-400"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="lastName" className="text-sm font-medium text-corporate-900">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-corporate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-white text-corporate-900 placeholder-corporate-400"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="email" className="text-sm font-medium text-corporate-900">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-corporate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-white text-corporate-900 placeholder-corporate-400"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="company" className="text-sm font-medium text-corporate-900">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-corporate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-white text-corporate-900 placeholder-corporate-400"
                placeholder="Enter your company name"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="subject" className="text-sm font-medium text-corporate-900">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-corporate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-white text-corporate-900 placeholder-corporate-400"
                placeholder="What would you like to discuss?"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="message" className="text-sm font-medium text-corporate-900">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-corporate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-white text-corporate-900 placeholder-corporate-400"
                placeholder="Tell us about your needs"
              ></textarea>
            </div>

            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleInputChange}
              style={{ position: "absolute", left: "-9999px" }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {submitMessage && (
              <div
                className={`p-4 rounded-md border-2 ${
                  submitMessage.type === "success"
                    ? "bg-green-50 border-green-500 text-green-800"
                    : "bg-red-50 border-red-500 text-red-800"
                }`}
              >
                {submitMessage.text}
              </div>
            )}

            <div className="flex items-start space-x-3 pt-4">
              <Checkbox
                id="privacy"
                checked={formData.privacyConsent}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, privacyConsent: checked as boolean }))}
                className="mt-1"
                required
              />
              <label htmlFor="privacy" className="text-sm text-corporate-600 leading-relaxed">
                I agree to the{" "}
                <button type="button" className="text-accent1-600 hover:underline">
                  Privacy Policy
                </button>{" "}
                and consent to being contacted about our services.
                <span className="text-red-500 ml-1">*</span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                type="submit" 
                size="lg" 
                className="bg-black hover:bg-gray-800 text-white" 
                onClick={() => {
                      window.dataLayer?.push({
                        event: "send_message_click",
                        category: "Contact",
                        label: "Send Message Button",
                      })
                  
                      if (window.gtag) {
                        window.gtag("event", "conversion_event_contact", {
                          event_category: "Contact",
                          event_label: "Send Message Button",
                        })
                      }
                    }}
                disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="border-corporate-300 text-corporate-900 hover:bg-corporate-50 bg-white"
                asChild
              >
                <TrackedLink
                  href="https://cal.com/andrew-belonogov/30min"
                  external
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  eventName="conversion_event_contact"
                  // If you want to ALSO push to GTM's dataLayer, you can piggyback:
                  onClick={() => {
                    window.dataLayer?.push({
                      event: "book_meeting_click",
                      category: "Contact",
                      label: "Book Meeting Button",
                    })
                  }}
                >
                  Book a Meeting
                </TrackedLink>
              </Button>
            </div>
          </form>
        </div>
    </div>
  )
}
