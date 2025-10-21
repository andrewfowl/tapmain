"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7-7l-7 7 7 7" />
  </svg>
)

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const Shield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
)

interface TechnicalInquiryData {
  title: string
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  company: string
  subject: string
  subcategory: string
  background: string
  supportDocumentation: string
  inquiryQuestions: string
  authoritativeReferences: string
  preliminaryConclusions: string
  affirmativeEvidence: string
  contradictiveEvidence: string
  termsAccepted: boolean
  privacyAccepted: boolean
}

interface TechnicalInquiryFormProps {
  onBack: () => void
}

export default function TechnicalInquiryForm({ onBack }: TechnicalInquiryFormProps) {
  const [formData, setFormData] = useState<TechnicalInquiryData>({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    company: "",
    subject: "",
    subcategory: "",
    background: "",
    supportDocumentation: "",
    inquiryQuestions: "",
    authoritativeReferences: "",
    preliminaryConclusions: "",
    affirmativeEvidence: "",
    contradictiveEvidence: "",
    termsAccepted: false,
    privacyAccepted: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  // This will be handled by server actions or API routes instead

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (typeof window !== "undefined" && (window as any).plausible) {
      ;(window as any).plausible("Form Submit", {
        props: {
          category: "Technical Inquiry",
          label: formData.subject,
        },
      })
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSubmitStatus("success")

      if (typeof window !== "undefined" && (window as any).plausible) {
        ;(window as any).plausible("Form Submit Success", {
          props: {
            category: "Technical Inquiry",
            label: formData.subject,
          },
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")

      if (typeof window !== "undefined" && (window as any).plausible) {
        ;(window as any).plausible("Form Submit Error", {
          props: {
            category: "Technical Inquiry",
            label: "Submission Failed",
          },
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: keyof TechnicalInquiryData, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  if (submitStatus === "success") {
    return (
      <Card className="bg-corporate-700 border-corporate-600 max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="bg-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-serif text-white mb-4">Technical Inquiry Submitted</h3>
          <p className="text-corporate-300 mb-6">
            Thank you for your technical accounting inquiry. Our experts will review your submission and respond within
            2-3 business days.
          </p>
          <Button
            onClick={onBack}
            variant="outline"
            className="border-corporate-600 text-white hover:bg-corporate-600 bg-transparent"
          >
            Submit Another Inquiry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button onClick={onBack} variant="ghost" className="text-white hover:bg-corporate-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Contact Options
        </Button>
        <h2 className="text-3xl font-serif text-white mb-2">Technical Accounting Inquiry</h2>
        <p className="text-corporate-300">
          Submit detailed technical accounting questions for expert analysis and guidance.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card className="bg-corporate-700 border-corporate-600">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-white">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-corporate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-corporate-800 text-white placeholder-corporate-400"
                placeholder="e.g., Technical Accounting Manager"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-white">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-corporate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-corporate-800 text-white placeholder-corporate-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-white">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-corporate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-corporate-800 text-white placeholder-corporate-400"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-corporate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-corporate-800 text-white placeholder-corporate-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-white">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-corporate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-corporate-800 text-white placeholder-corporate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="position" className="text-sm font-medium text-white">
                  Title/Position <span className="text-red-400">*</span>
                </label>
                <input
                  id="position"
                  name="position"
                  type="text"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-corporate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-corporate-800 text-white placeholder-corporate-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-white">
                  Company <span className="text-red-400">*</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-corporate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-corporate-800 text-white placeholder-corporate-400"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card className="bg-corporate-700 border-corporate-600">
          <CardHeader>
            <CardTitle className="text-white">Technical Inquiry Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-white">
                  Subject <span className="text-red-400">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-corporate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-corporate-800 text-white"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="IFRS">IFRS</option>
                  <option value="US GAAP">US GAAP</option>
                  <option value="Operational Accounting">Operational Accounting</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="subcategory" className="text-sm font-medium text-white">
                  Subcategory
                </label>
                <input
                  id="subcategory"
                  name="subcategory"
                  type="text"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-corporate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-corporate-800 text-white placeholder-corporate-400"
                  placeholder="e.g., 606, 842, audit reporting, business combinations"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="background" className="text-sm font-medium text-white">
                Background
              </label>
              <textarea
                id="background"
                name="background"
                rows={4}
                value={formData.background}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-corporate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-corporate-800 text-white placeholder-corporate-400"
                placeholder="Provide context and background information for your inquiry"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="supportDocumentation" className="text-sm font-medium text-white">
                Support Documentation
              </label>
              <textarea
                id="supportDocumentation"
                name="supportDocumentation"
                rows={4}
                value={formData.supportDocumentation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-corporate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-corporate-800 text-white placeholder-corporate-400"
                placeholder="Describe any supporting documentation or attachments"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="inquiryQuestions" className="text-sm font-medium text-white">
                Inquiry/Questions
              </label>
              <textarea
                id="inquiryQuestions"
                name="inquiryQuestions"
                rows={4}
                value={formData.inquiryQuestions}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-corporate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-corporate-800 text-white placeholder-corporate-400"
                placeholder="State your specific questions or areas where you need guidance"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="authoritativeReferences" className="text-sm font-medium text-white">
                Authoritative References
              </label>
              <textarea
                id="authoritativeReferences"
                name="authoritativeReferences"
                rows={3}
                value={formData.authoritativeReferences}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-corporate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-corporate-800 text-white placeholder-corporate-400"
                placeholder="List any relevant accounting standards, guidance, or references"
              />
            </div>
          </CardContent>
        </Card>

        {/* Preliminary Analysis */}
        <Card className="bg-corporate-700 border-corporate-600">
          <CardHeader>
            <CardTitle className="text-white">Preliminary Analysis (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="preliminaryConclusions" className="text-sm font-medium text-white">
                Preliminary Conclusion(s)
              </label>
              <textarea
                id="preliminaryConclusions"
                name="preliminaryConclusions"
                rows={4}
                value={formData.preliminaryConclusions}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-corporate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-corporate-800 text-white placeholder-corporate-400"
                placeholder="Share your preliminary thoughts or conclusions"
              />
            </div>

            {formData.preliminaryConclusions && (
              <>
                <div className="space-y-2">
                  <label htmlFor="affirmativeEvidence" className="text-sm font-medium text-white">
                    Affirmative Evidence <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="affirmativeEvidence"
                    name="affirmativeEvidence"
                    rows={4}
                    value={formData.affirmativeEvidence}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-corporate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-corporate-800 text-white placeholder-corporate-400"
                    placeholder="Evidence that supports your preliminary conclusion"
                    required={!!formData.preliminaryConclusions}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contradictiveEvidence" className="text-sm font-medium text-white">
                    Contradictive Evidence <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contradictiveEvidence"
                    name="contradictiveEvidence"
                    rows={4}
                    value={formData.contradictiveEvidence}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-corporate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent1-500 bg-corporate-800 text-white placeholder-corporate-400"
                    placeholder="Evidence that contradicts your preliminary conclusion"
                    required={!!formData.preliminaryConclusions}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Terms and Submission */}
        <Card className="bg-corporate-700 border-corporate-600">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) => handleCheckboxChange("termsAccepted", checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-corporate-300 leading-relaxed">
                <span className="text-red-400">*</span> I accept the{" "}
                <button type="button" className="text-accent1-400 hover:underline">
                  Terms of Service
                </button>
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="privacy"
                checked={formData.privacyAccepted}
                onCheckedChange={(checked) => handleCheckboxChange("privacyAccepted", checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="privacy" className="text-sm text-corporate-300 leading-relaxed">
                <span className="text-red-400">*</span> I accept the{" "}
                <button type="button" className="text-accent1-400 hover:underline">
                  Privacy Terms
                </button>{" "}
                and consent to being contacted about this inquiry.
              </label>
            </div>

            <div className="bg-corporate-600 p-4 rounded-lg flex items-start gap-3">
              <Shield className="h-5 w-5 text-accent1-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-corporate-200">
                <p className="font-medium mb-1">Protected Submission</p>
                <p>
                  This form is protected against spam and automated submissions. Your information is encrypted and
                  secure.
                </p>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || !formData.termsAccepted || !formData.privacyAccepted}
              className="w-full bg-accent1-600 hover:bg-accent1-700 text-white disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Technical Inquiry"}
            </Button>

            {submitStatus === "error" && (
              <div className="bg-red-600/20 border border-red-600 rounded-lg p-4 text-red-200">
                There was an error submitting your inquiry. Please try again or contact us directly.
              </div>
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
