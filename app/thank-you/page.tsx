import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, Download, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Thank You | TechAccountingPro",
  description: "Thank you for your interest in our services. We'll be in touch soon.",
}

interface ThankYouPageProps {
  searchParams: {
    service?: string
    template?: string
  }
}

export default function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const { service, template } = searchParams

  return (
    <div className="min-h-screen bg-gradient-to-br from-corporate-50 to-white">
      <div className="corporate-container py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-corporate-900 mb-6">Thank You!</h1>

          {service && (
            <p className="text-xl text-corporate-600 mb-8 leading-relaxed">
              We've received your request for <strong>{decodeURIComponent(service)}</strong>. Our team will review your
              information and get back to you within 24 hours.
            </p>
          )}

          {template && (
            <p className="text-xl text-corporate-600 mb-8 leading-relaxed">
              Your download of <strong>{decodeURIComponent(template)}</strong> should begin shortly. If it doesn't start
              automatically, please check your downloads folder.
            </p>
          )}

          {!service && !template && (
            <p className="text-xl text-corporate-600 mb-8 leading-relaxed">
              We've received your submission and will get back to you soon.
            </p>
          )}

          <Card className="text-left mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-accent1-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-sm font-semibold text-accent1-600">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-corporate-900">Review & Analysis</h3>
                  <p className="text-corporate-600 text-sm">
                    Our experts will review your requirements and prepare a customized approach.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-accent1-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-sm font-semibold text-accent1-600">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-corporate-900">Initial Consultation</h3>
                  <p className="text-corporate-600 text-sm">
                    We'll schedule a call to discuss your needs and answer any questions.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-accent1-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-sm font-semibold text-accent1-600">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-corporate-900">Proposal & Next Steps</h3>
                  <p className="text-corporate-600 text-sm">
                    Receive a detailed proposal with timeline and next steps for your project.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-accent1-600 hover:bg-accent1-700">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/templates">
                <Download className="mr-2 h-4 w-4" />
                Browse Resources
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
