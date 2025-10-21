import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Download, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getSolutionBySlug } from "@/actions/solutions-actions"
import { ServiceRequestForm } from "@/components/service-request-form"

interface SolutionPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const solution = await getSolutionBySlug(params.slug)

  if (!solution) {
    return {
      title: "Solution Not Found | TechAccountingPro",
    }
  }

  return {
    title: `${solution.title} | TechAccountingPro`,
    description: solution.short_description || solution.description,
  }
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const solution = await getSolutionBySlug(params.slug)

  if (!solution) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-corporate-50 to-white py-20">
        <div className="corporate-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-corporate-900 mb-6 text-balance">
              {solution.title}
            </h1>
            <p className="text-xl text-corporate-600 mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
              {solution.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent1-600 hover:bg-accent1-700" asChild>
                <a href="#request-service">
                  Request Service
                  <Mail className="ml-2 h-5 w-5" />
                </a>
              </Button>
              {solution.related_template_id && (
                <Button size="lg" variant="outline" asChild>
                  <Link href={`/templates/${solution.related_template_id}`}>
                    Download Resource
                    <Download className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {solution.benefits && solution.benefits.length > 0 && (
        <section className="py-20">
          <div className="corporate-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-corporate-900 mb-4">Key Benefits</h2>
              <p className="text-lg text-corporate-600 max-w-2xl mx-auto">
                Transform your business with measurable results
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solution.benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent1-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-6 w-6 text-accent1-600" />
                    </div>
                    <CardTitle className="text-xl font-serif text-corporate-900">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-corporate-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {solution.features && solution.features.length > 0 && (
        <section className="py-20 bg-corporate-50">
          <div className="corporate-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-corporate-900 mb-4">What's Included</h2>
              <p className="text-lg text-corporate-600 max-w-2xl mx-auto">
                Comprehensive features designed for your success
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {solution.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-accent1-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-corporate-900 mb-2">{feature.title}</h3>
                    <p className="text-corporate-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service Request Form */}
      <section id="request-service" className="py-20">
        <div className="corporate-container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-corporate-900 mb-4">Request This Service</h2>
              <p className="text-lg text-corporate-600">
                Get started with {solution.title.toLowerCase()} for your business
              </p>
            </div>
            <ServiceRequestForm solutionId={solution.id} solutionTitle={solution.title} />
          </div>
        </div>
      </section>
    </div>
  )
}
