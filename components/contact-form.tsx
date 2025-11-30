"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import TechnicalInquiryForm from "./technical-inquiry-form"
import { submitContactForm } from "@/actions/contact-actions"

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
    honeypot: "",
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
        <h2 className="text-4xl font-bold text-white">Get in touch</h2>
        <p className="text-white/60 text-lg max-w-xl mx-auto">Tell us about your finance transformation needs</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-white/80">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-white placeholder-white/30 transition-all"
                placeholder="John"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-white/80">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-white placeholder-white/30 transition-all"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white/80">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-white placeholder-white/30 transition-all"
              placeholder="john@company.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium text-white/80">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-white placeholder-white/30 transition-all"
              placeholder="Your company name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium text-white/80">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-white placeholder-white/30 transition-all"
              placeholder="What would you like to discuss?"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-white/80">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-white placeholder-white/30 transition-all resize-none"
              placeholder="Tell us about your needs..."
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
              className={`p-4 rounded-lg ${
                submitMessage.type === "success"
                  ? "bg-green-500/10 border border-green-500/30 text-green-400"
                  : "bg-red-500/10 border border-red-500/30 text-red-400"
              }`}
            >
              {submitMessage.text}
            </div>
          )}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="privacy"
              checked={formData.privacyConsent}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, privacyConsent: checked as boolean }))}
              className="mt-1 border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
              required
            />
            <label htmlFor="privacy" className="text-sm text-white/50 leading-relaxed">
              I agree to the{" "}
              <button type="button" className="text-white/70 hover:text-white underline">
                Privacy Policy
              </button>{" "}
              and consent to being contacted about our services.
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              type="submit"
              size="lg"
              className="bg-white text-black hover:bg-white/90 rounded-full px-8 font-medium transition-all hover:scale-105"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 bg-transparent"
              asChild
            >
              <a href="https://cal.com/andrew-belonogov/30min" target="_blank" rel="noopener noreferrer">
                Book a Meeting
              </a>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
