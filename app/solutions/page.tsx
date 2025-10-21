import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getPublishedSolutions } from "@/actions/solutions-actions"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Solutions | TechAccountingPro",
  description:
    "Comprehensive accounting solutions for technology startups and crypto businesses. Transform your financial operations with our expert guidance.",
}

const benefits = [
  "Reduce manual processes by up to 80%",
  "Improve financial accuracy and compliance",
  "Scale operations without proportional cost increases",
  "Access real-time financial insights and reporting",
  "Ensure audit readiness at all times",
]

export default async function SolutionsPage() {
  const solutions = await getPublishedSolutions()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-corporate-50 to-white py-20">
        <div className="corporate-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-corporate-900 mb-6 text-balance">
              Transform Your Financial Operations
            </h1>
            <p className="text-xl text-corporate-600 mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions designed specifically for technology startups and crypto businesses. Streamline
              processes, ensure compliance, and drive sustainable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white" asChild>
                <Link href="/contact">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="corporate-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-corporate-900 mb-4">Our Core Solutions</h2>
            <p className="text-lg text-corporate-600 max-w-2xl mx-auto">
              Tailored approaches to address the unique challenges of modern technology businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <Card key={solution.id} className="group hover:shadow-lg transition-shadow duration-300">
                {solution.image_url && (
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={solution.image_url || "/placeholder.svg"}
                      alt={solution.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  {solution.group && <div className="text-xs text-corporate-500 mb-2">{solution.group}</div>}
                  <CardTitle className="text-xl font-serif text-corporate-900">{solution.title}</CardTitle>
                  <CardDescription className="text-corporate-600">{solution.short_description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {solution.benefits && solution.benefits.length > 0 ? (
                    <ul className="space-y-2 mb-6">
                      {solution.benefits.slice(0, 4).map((benefit: any, index: number) => (
                        <li key={index} className="flex items-center text-sm text-corporate-700">
                          <CheckCircle className="h-4 w-4 text-accent1-600 mr-2 flex-shrink-0" />
                          {typeof benefit === "string" ? benefit : benefit.title || benefit.description}
                        </li>
                      ))}
                    </ul>
                  ) : solution.features && solution.features.length > 0 ? (
                    <ul className="space-y-2 mb-6">
                      {solution.features.slice(0, 4).map((feature: any, index: number) => (
                        <li key={index} className="flex items-center text-sm text-corporate-700">
                          <CheckCircle className="h-4 w-4 text-accent1-600 mr-2 flex-shrink-0" />
                          {typeof feature === "string" ? feature : feature.title || feature.description}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {solution.pricing_info && (
                    <div className="text-sm text-corporate-600 mb-4 p-3 bg-corporate-50 rounded">
                      {solution.pricing_info}
                    </div>
                  )}

                  <Link href={`/solutions/${solution.slug}`}>
                    <Button variant="outline" className="w-full group-hover:bg-accent1-50 bg-transparent">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-corporate-50">
        <div className="corporate-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-corporate-900 mb-6">Why Choose Our Solutions?</h2>
              <p className="text-lg text-corporate-600 mb-8 leading-relaxed">
                Our proven methodologies and cutting-edge technology deliver measurable results for technology companies
                and crypto businesses worldwide.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-accent1-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-corporate-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-serif text-corporate-900 mb-4">Ready to Get Started?</h3>
              <p className="text-corporate-600 mb-6">
                Schedule a consultation to discuss your specific needs and learn how our solutions can transform your
                financial operations.
              </p>
              <Button className="w-full bg-black hover:bg-gray-800 text-white" asChild>
                <a href="https://cal.com/andrew-belonogov/30min" target="_blank" rel="noopener noreferrer">
                  Book a Meeting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
