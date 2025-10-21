"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock template data - in a real app, you would fetch this based on the ID
const templates = {
  1: {
    id: 1,
    title: "Zero-Based Budgeting Framework",
    description: "A comprehensive framework for implementing zero-based budgeting in your organization.",
    image: "/placeholder.svg?height=400&width=800",
    fileSize: "2.4 MB",
    fileType: "ZIP (Excel, PowerPoint, PDF)",
  },
  2: {
    id: 2,
    title: "Finance Function Maturity Assessment",
    description:
      "Evaluate your finance function's maturity across key dimensions and identify improvement opportunities.",
    image: "/placeholder.svg?height=400&width=800",
    fileSize: "1.8 MB",
    fileType: "ZIP (Excel, PDF)",
  },
  3: {
    id: 3,
    title: "Finance Digital Transformation Roadmap",
    description: "A step-by-step guide to digitally transform your finance function.",
    image: "/placeholder.svg?height=400&width=800",
    fileSize: "3.2 MB",
    fileType: "ZIP (Excel, PowerPoint, PDF)",
  },
}

export default function TemplateDownloadPage() {
  const params = useParams()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    useCase: "",
    newsletter: true,
    termsAccepted: false,
  })
  const [downloadComplete, setDownloadComplete] = useState(false)

  // Get template ID from URL params
  const templateId = Number(params.id)
  const template = templates[templateId as keyof typeof templates]

  if (!template) {
    return (
      <div className="container px-4 md:px-6 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4 text-corporate-800">Template not found</h1>
        <p className="mb-6 text-corporate-600">The template you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="bg-corporate-700 hover:bg-corporate-800">
          <Link href="/templates">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Link>
        </Button>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      // Validate form
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.company || !formData.role) {
        setError("Please fill in all required fields")
        return
      }
      if (!formData.termsAccepted) {
        setError("You must accept the terms and conditions")
        return
      }
      setError(null)
      setStep(3)
    }
  }

  const handlePreviousStep = () => {
    setStep((prev) => Math.max(1, prev - 1))
    setError(null)
  }

  const handleDownload = () => {
    setIsLoading(true)

    // Trigger download immediately
    const link = document.createElement("a")
    link.href = `/api/templates/download/${template.id}`
    link.download = `${template.title.replace(/\s+/g, "-").toLowerCase()}.zip`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Mark as complete after a short delay
    setTimeout(() => {
      setIsLoading(false)
      setDownloadComplete(true)
    }, 500)
  }

  return (
    <div className="min-h-screen flex flex-col bg-corporate-50">
      <SiteHeader />

      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="corporate-container">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-corporate-800 text-white" : "bg-corporate-200 text-corporate-600"}`}
                  >
                    {step > 1 ? <Check className="h-5 w-5" /> : "1"}
                  </div>
                  <div
                    className={`ml-2 text-sm font-medium ${step >= 1 ? "text-corporate-800" : "text-corporate-500"}`}
                  >
                    Preview
                  </div>
                </div>
                <div className={`flex-1 h-1 mx-4 ${step > 1 ? "bg-corporate-800" : "bg-corporate-200"}`}></div>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-corporate-800 text-white" : "bg-corporate-200 text-corporate-600"}`}
                  >
                    {step > 2 ? <Check className="h-5 w-5" /> : "2"}
                  </div>
                  <div
                    className={`ml-2 text-sm font-medium ${step >= 2 ? "text-corporate-800" : "text-corporate-500"}`}
                  >
                    Information
                  </div>
                </div>
                <div className={`flex-1 h-1 mx-4 ${step > 2 ? "bg-corporate-800" : "bg-corporate-200"}`}></div>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-corporate-800 text-white" : "bg-corporate-200 text-corporate-600"}`}
                  >
                    3
                  </div>
                  <div
                    className={`ml-2 text-sm font-medium ${step >= 3 ? "text-corporate-800" : "text-corporate-500"}`}
                  >
                    Download
                  </div>
                </div>
              </div>
            </div>

            {/* Step Content */}
            <Card className="border border-corporate-200 shadow-card">
              {step === 1 && (
                <>
                  <CardHeader>
                    <CardTitle className="text-2xl">{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="aspect-video w-full overflow-hidden rounded-lg border border-corporate-200">
                      <img
                        src={template.image || "/placeholder.svg"}
                        alt={template.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium text-corporate-800 mb-3">What's Included</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <FileText className="h-5 w-5 text-corporate-700 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-corporate-600">Implementation Guide (PDF)</span>
                          </li>
                          <li className="flex items-start">
                            <FileText className="h-5 w-5 text-corporate-700 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-corporate-600">Excel Templates (XLSX)</span>
                          </li>
                          <li className="flex items-start">
                            <FileText className="h-5 w-5 text-corporate-700 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-corporate-600">Presentation Deck (PPTX)</span>
                          </li>
                          <li className="flex items-start">
                            <FileText className="h-5 w-5 text-corporate-700 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-corporate-600">Case Study Examples (PDF)</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-corporate-800 mb-3">File Details</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="text-corporate-600 font-medium w-24">File Size:</span>
                            <span className="text-corporate-600">{template.fileSize}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-corporate-600 font-medium w-24">File Type:</span>
                            <span className="text-corporate-600">{template.fileType}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-corporate-600 font-medium w-24">Last Updated:</span>
                            <span className="text-corporate-600">March 15, 2025</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-corporate-600 font-medium w-24">Version:</span>
                            <span className="text-corporate-600">2.1</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </>
              )}

              {step === 2 && (
                <>
                  <CardHeader>
                    <CardTitle className="text-2xl">Your Information</CardTitle>
                    <CardDescription>Please provide your details to download {template.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {error && (
                      <Alert className="mb-6 bg-red-50 text-red-800 border-red-200">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="border-corporate-200 focus-visible:ring-corporate-500 focus-visible:border-corporate-500"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="border-corporate-200 focus-visible:ring-corporate-500 focus-visible:border-corporate-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="border-corporate-200 focus-visible:ring-corporate-500 focus-visible:border-corporate-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company *</Label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="border-corporate-200 focus-visible:ring-corporate-500 focus-visible:border-corporate-500"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role *</Label>
                          <Input
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="border-corporate-200 focus-visible:ring-corporate-500 focus-visible:border-corporate-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="useCase">How do you plan to use this template?</Label>
                        <Textarea
                          id="useCase"
                          name="useCase"
                          value={formData.useCase}
                          onChange={handleChange}
                          className="border-corporate-200 focus-visible:ring-corporate-500 focus-visible:border-corporate-500"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="newsletter"
                            checked={formData.newsletter}
                            onCheckedChange={(checked) => handleCheckboxChange("newsletter", checked as boolean)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="newsletter"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-corporate-700"
                            >
                              Subscribe to our newsletter
                            </label>
                            <p className="text-sm text-corporate-500">
                              Receive updates about new templates and finance transformation insights
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="terms"
                            checked={formData.termsAccepted}
                            onCheckedChange={(checked) => handleCheckboxChange("termsAccepted", checked as boolean)}
                            required
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-corporate-700"
                            >
                              I accept the terms and conditions *
                            </label>
                            <p className="text-sm text-corporate-500">
                              By downloading this template, you agree to our{" "}
                              <Link href="/terms" className="text-corporate-800 hover:underline">
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link href="/privacy" className="text-corporate-800 hover:underline">
                                Privacy Policy
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </>
              )}

              {step === 3 && (
                <>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Your Download is Ready</CardTitle>
                    <CardDescription>Thank you for your interest in {template.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 text-center">
                    <div className="mx-auto w-24 h-24 bg-corporate-100 rounded-full flex items-center justify-center">
                      <Download className="h-10 w-10 text-corporate-800" />
                    </div>

                    {downloadComplete ? (
                      <div className="space-y-4 max-w-md mx-auto">
                        <div className="bg-green-50 text-green-800 p-4 rounded-md">
                          <p className="font-medium">Download complete!</p>
                          <p className="text-sm mt-1">
                            If your download doesn't start automatically, click the button below.
                          </p>
                        </div>
                        <Button
                          onClick={handleDownload}
                          variant="outline"
                          className="border-corporate-300 bg-transparent"
                        >
                          <Download className="mr-2 h-5 w-5" />
                          Download Again
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4 max-w-md mx-auto">
                        <p className="text-corporate-600">
                          Click the button below to start your download. The file will be downloaded as a ZIP archive
                          containing all the necessary files.
                        </p>
                        <Button
                          onClick={handleDownload}
                          disabled={isLoading}
                          className="bg-corporate-800 hover:bg-corporate-700 text-white"
                          size="lg"
                        >
                          {isLoading ? (
                            <>
                              <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              Starting Download...
                            </>
                          ) : (
                            <>
                              <Download className="mr-2 h-5 w-5" />
                              Download Now ({template.fileSize})
                            </>
                          )}
                        </Button>
                      </div>
                    )}

                    <div className="pt-6 border-t border-corporate-200 max-w-md mx-auto">
                      <h3 className="text-lg font-medium text-corporate-800 mb-3">What's Next?</h3>
                      <ul className="space-y-2 text-left">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-corporate-700 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-corporate-600">
                            Extract the ZIP file to access all template components
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-corporate-700 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-corporate-600">
                            Read the implementation guide for detailed instructions
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-corporate-700 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-corporate-600">
                            Check your email for additional resources and support
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </>
              )}

              <CardFooter className="flex justify-between border-t pt-6">
                {step > 1 && step < 3 ? (
                  <Button
                    variant="outline"
                    onClick={handlePreviousStep}
                    className="border-corporate-300 bg-transparent"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                ) : step === 1 ? (
                  <Button asChild variant="outline" className="border-corporate-300 bg-transparent">
                    <Link href={`/templates/${template.id}`}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Template
                    </Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline" className="border-corporate-300 bg-transparent">
                    <Link href="/templates">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Browse More Templates
                    </Link>
                  </Button>
                )}

                {step < 3 && (
                  <Button onClick={handleNextStep} className="bg-corporate-800 hover:bg-corporate-700 text-white">
                    {step === 1 ? "Continue" : "Complete"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
