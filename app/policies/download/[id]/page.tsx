"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { SiteHeader } from "@/components/site-header"

// Mock policy data - in a real app, you would fetch this based on the ID
const policies = {
  1: {
    id: 1,
    title: "Accounting Data Governance Policy",
    description: "A comprehensive policy for managing accounting data governance in technology organizations.",
    image: "/placeholder.svg?height=400&width=800&text=Accounting+Data+Governance",
    fileSize: "1.2 MB",
    fileType: "PDF",
  },
  2: {
    id: 2,
    title: "Crypto Asset Controls Framework",
    description: "A framework for implementing robust controls for cryptocurrency and digital asset accounting.",
    image: "/placeholder.svg?height=400&width=800&text=Crypto+Controls+Framework",
    fileSize: "1.5 MB",
    fileType: "PDF",
  },
  3: {
    id: 3,
    title: "Technology Startup Security Policy",
    description: "Guidelines for securing accounting technology systems and financial data in startup environments.",
    image: "/placeholder.svg?height=400&width=800&text=Tech+Security+Policy",
    fileSize: "0.9 MB",
    fileType: "PDF",
  },
}

export default function PolicyDownloadPage() {
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
    newsletter: true,
    termsAccepted: false,
  })
  const [downloadComplete, setDownloadComplete] = useState(false)

  // Get policy ID from URL params
  const policyId = Number(params.id)
  const policy = policies[policyId as keyof typeof policies]

  if (!policy) {
    return (
      <div className="min-h-screen flex flex-col bg-corporate-50">
        <SiteHeader />
        <div className="container px-4 md:px-6 py-12 text-center flex-1 flex items-center justify-center">
          <div>
            <h1 className="text-2xl font-bold mb-4 text-corporate-800">Policy not found</h1>
            <p className="mb-6 text-corporate-600">The policy you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="bg-corporate-700 hover:bg-corporate-800">
              <Link href="/policies">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Policies
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    link.href = `/api/policies/download/${policy.id}`
    link.download = `${policy.title.replace(/\s+/g, "-").toLowerCase()}.pdf`
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
                    <CardTitle className="text-2xl">{policy.title}</CardTitle>
                    <CardDescription>{policy.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="aspect-video w-full overflow-hidden rounded-lg border border-corporate-200">
                      <img
                        src={policy.image || "/placeholder.svg"}
                        alt={policy.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-corporate-600">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {policy.fileType}
                      </div>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        {policy.fileSize}
                      </div>
                    </div>

                    <div className="bg-corporate-100 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">What's included:</h3>
                      <ul className="space-y-1 text-sm text-corporate-700">
                        <li>• Comprehensive policy framework</li>
                        <li>• Implementation guidelines</li>
                        <li>• Best practices and recommendations</li>
                        <li>• Compliance checklists</li>
                      </ul>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" asChild>
                        <Link href="/policies">
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back to Policies
                        </Link>
                      </Button>
                      <Button onClick={handleNextStep} className="bg-corporate-700 hover:bg-corporate-800">
                        Continue to Download
                      </Button>
                    </div>
                  </CardContent>
                </>
              )}

              {step === 2 && (
                <>
                  <CardHeader>
                    <CardTitle>Your Information</CardTitle>
                    <CardDescription>Please provide your details to download the policy document.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">Company *</Label>
                      <Input id="company" name="company" value={formData.company} onChange={handleChange} required />
                    </div>

                    <div>
                      <Label htmlFor="role">Role *</Label>
                      <Input
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="e.g., CFO, Controller, Crypto Accountant"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={formData.newsletter}
                          onCheckedChange={(checked) => handleCheckboxChange("newsletter", checked as boolean)}
                        />
                        <Label htmlFor="newsletter" className="text-sm">
                          Subscribe to our newsletter for technology accounting and crypto finance insights
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.termsAccepted}
                          onCheckedChange={(checked) => handleCheckboxChange("termsAccepted", checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm">
                          I accept the{" "}
                          <Link href="/terms" className="text-corporate-700 hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-corporate-700 hover:underline">
                            Privacy Policy
                          </Link>{" "}
                          *
                        </Label>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={handlePreviousStep}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                      <Button onClick={handleNextStep} className="bg-corporate-700 hover:bg-corporate-800">
                        Continue to Download
                      </Button>
                    </div>
                  </CardContent>
                </>
              )}

              {step === 3 && (
                <>
                  <CardHeader>
                    <CardTitle>Download Ready</CardTitle>
                    <CardDescription>
                      Your download is ready. Click the button below to start downloading.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-corporate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="h-8 w-8 text-corporate-700" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{policy.title}</h3>
                      <p className="text-corporate-600 mb-4">{policy.description}</p>

                      <div className="flex items-center justify-center space-x-4 text-sm text-corporate-600 mb-6">
                        <span>{policy.fileType}</span>
                        <span>•</span>
                        <span>{policy.fileSize}</span>
                      </div>
                    </div>

                    {downloadComplete && (
                      <div className="bg-green-50 text-green-800 p-4 rounded-md text-center">
                        <p className="font-medium">Download complete!</p>
                        <p className="text-sm mt-1">Check your downloads folder for the PDF file.</p>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handlePreviousStep} disabled={isLoading}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                      <Button
                        onClick={handleDownload}
                        disabled={isLoading}
                        className="bg-corporate-700 hover:bg-corporate-800"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Starting...
                          </>
                        ) : downloadComplete ? (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Download Again
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Download Policy
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="bg-corporate-100 p-4 rounded-lg text-sm">
                      <p className="font-medium mb-2">What happens next?</p>
                      <ul className="space-y-1 text-corporate-700">
                        <li>• Your download will start automatically</li>
                        <li>• Check your downloads folder for the PDF file</li>
                        <li>• You'll receive a confirmation email with additional resources</li>
                        <li>• Our team may follow up with implementation guidance</li>
                      </ul>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
