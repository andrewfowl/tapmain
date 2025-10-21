"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import TechnicalInquiryForm from "./technical-inquiry-form"
import { submitContactForm } from "@/actions/contact-actions"

const Mail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
    />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="22,6 12,13 2,6" />
  </svg>
)

const Phone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
    />
  </svg>
)

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <polyline points="12,6 12,12 16,14" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

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

    if (!formData.privacyConsent) {
      setSubmitMessage({
        type: "error",
        text: "Please agree to the Privacy Policy to continue",
      })
      return
    }

    setIsSubmitting(true)
    setSubmitMessage(null)

    const result = await submitContactForm(formData)

    setIsSubmitting(false)

    if (result.success) {
      setSubmitMessage({
        type: "success",
        text: result.message,
      })

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

      // Track analytics
      if (typeof window !== "undefined" && (window as any).plausible) {
        ;(window as any).plausible("Form Submit", {
          props: {
            category: "General Contact",
            label: formData.subject || "General Inquiry",
          },
        })
      }
    } else {
      setSubmitMessage({
        type: "error",
        text: result.message,
      })
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
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-serif text-corporate-900">How can we help you?</h2>
        <p className="text-corporate-600 text-lg">Tell us about your finance transformation needs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
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
                placeholder="Tell us about your finance transformation needs"
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
              <Button type="submit" size="lg" className="bg-black hover:bg-gray-800 text-white" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="border-corporate-300 text-corporate-900 hover:bg-corporate-50 bg-white"
                asChild
              >
                <a
                  href="https://cal.com/andrew-belonogov/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (typeof window !== "undefined" && (window as any).plausible) {
                      ;(window as any).plausible("Book Meeting Click", {
                        props: {
                          category: "Contact",
                          label: "Book Meeting Button",
                        },
                      })
                    }
                  }}
                >
                  Book a Meeting
                </a>
              </Button>
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-2xl font-serif text-corporate-900 mb-10">Contact Information</h3>

          <div className="space-y-8">
            <Card className="bg-white border-corporate-200">
              <CardContent className="p-8 flex items-start gap-4">
                <div className="bg-corporate-100 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-corporate-700" />
                </div>
                <div>
                  <h4 className="font-medium text-corporate-900 mb-2">Email Us</h4>
                  <p className="text-corporate-600 mb-3">Our team will respond within 24 hours</p>
                  <a href="mailto:info@techaccountingpro.com" className="text-accent1-600 hover:underline">
                    info@techaccountingpro.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-corporate-200">
              <CardContent className="p-8 flex items-start gap-4">
                <div className="bg-corporate-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-corporate-700" />
                </div>
                <div>
                  <h4 className="font-medium text-corporate-900 mb-2">Call Us</h4>
                  <p className="text-corporate-600 mb-3">Monday to Friday, 9am-6pm EST</p>
                  <a href="tel:5022860115" className="text-accent1-600 hover:underline">
                    502 286 0115
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
