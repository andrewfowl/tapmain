"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Check, Download, Mail, User, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TemplateFunnelProps {
  templateId: string | number
  templateName: string
  templateDescription: string
  templateImage: string
  templateCategory: string
  onComplete?: (data: any) => void
}

export function TemplateFunnel({
  templateId,
  templateName,
  templateDescription,
  templateImage,
  templateCategory,
  onComplete,
}: TemplateFunnelProps) {
  const router = useRouter()
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
    subscribe: true,
  })

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, subscribe: checked }))
  }

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // In a real app, you would submit this data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Move to the next step
      handleNext()

      // Call the onComplete callback if provided
      if (onComplete) {
        onComplete(formData)
      }
    } catch (err) {
      setError("An error occurred while processing your request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    // In a real app, you would trigger the actual download here
    // For now, we'll just simulate it
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      // Redirect to the template page after download
      router.push(`/templates/${templateId}?downloaded=true`)
    }, 1500)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-corporate-600">
          <span>Information</span>
          <span>Confirmation</span>
          <span>Download</span>
        </div>
      </div>

      {error && (
        <Alert className="mb-6 bg-red-50 text-red-800 border-red-200">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="border border-corporate-200 shadow-card">
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle>Download {templateName}</CardTitle>
              <CardDescription>Please provide your information to download this template</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="download-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-corporate-400 h-4 w-4" />
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-corporate-400 h-4 w-4" />
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-corporate-400 h-4 w-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-corporate-400 h-4 w-4" />
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g. CFO, Finance Director, Controller"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="useCase">How will you use this template?</Label>
                  <Textarea
                    id="useCase"
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleChange}
                    placeholder="Please briefly describe your use case"
                    rows={3}
                  />
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox id="subscribe" checked={formData.subscribe} onCheckedChange={handleCheckboxChange} />
                  <Label htmlFor="subscribe" className="text-sm leading-tight">
                    I agree to receive updates about new templates, insights, and finance transformation resources. You
                    can unsubscribe at any time.
                  </Label>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" form="download-form" disabled={isLoading}>
                {isLoading ? "Processing..." : "Continue"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>Confirm Your Download</CardTitle>
              <CardDescription>Please review your information before downloading</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="aspect-video w-full overflow-hidden rounded-lg border border-corporate-200">
                    <img
                      src={templateImage || "/placeholder.svg?height=200&width=300"}
                      alt={templateName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-corporate-900">{templateName}</h3>
                    <p className="text-sm text-corporate-600">{templateCategory}</p>
                  </div>
                  <p className="text-corporate-700">{templateDescription}</p>
                  <div className="bg-corporate-50 p-4 rounded-lg border border-corporate-200">
                    <h4 className="font-medium text-corporate-800 mb-2">Your Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>
                        <span className="text-corporate-500">Name:</span>{" "}
                        <span className="text-corporate-800">
                          {formData.firstName} {formData.lastName}
                        </span>
                      </div>
                      <div>
                        <span className="text-corporate-500">Email:</span>{" "}
                        <span className="text-corporate-800">{formData.email}</span>
                      </div>
                      <div>
                        <span className="text-corporate-500">Company:</span>{" "}
                        <span className="text-corporate-800">{formData.company}</span>
                      </div>
                      <div>
                        <span className="text-corporate-500">Role:</span>{" "}
                        <span className="text-corporate-800">{formData.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext} disabled={isLoading}>
                {isLoading ? "Processing..." : "Confirm & Download"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle>Your Download is Ready</CardTitle>
              <CardDescription>Thank you for your interest in our template</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-corporate-900 mb-2">Your download is ready!</h3>
                <p className="text-corporate-600 mb-6 max-w-md">
                  Click the button below to download your template. We've also sent a copy to your email for future
                  reference.
                </p>
                <Button
                  size="lg"
                  onClick={handleDownload}
                  disabled={isLoading}
                  className="bg-corporate-800 hover:bg-corporate-700 text-white"
                >
                  <Download className="mr-2 h-5 w-5" />
                  {isLoading ? "Preparing Download..." : "Download Template"}
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <div className="text-center max-w-md">
                <p className="text-sm text-corporate-600 mb-4">
                  Need help with implementing this template? Our experts are ready to assist you.
                </p>
                <Button variant="outline" onClick={() => router.push("/contact")}>
                  Contact Our Experts
                </Button>
              </div>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}
