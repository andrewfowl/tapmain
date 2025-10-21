import Link from "next/link"
import { ArrowRight, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Solution {
  id: number
  title: string
  description: string
  slug: string
}

interface SolutionsSectionProps {
  solutions: Solution[]
}

export default function SolutionsSection({ solutions }: SolutionsSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-white" id="solutions">
      <div className="corporate-container">
        <div className="corporate-section-title">
          <Badge className="bg-corporate-100 text-corporate-800 hover:bg-corporate-200 mb-4">Solutions</Badge>
          <h2>Comprehensive Finance Solutions</h2>
          <p>Discover our range of specialized services designed to transform your finance function.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
          {solutions.map((solution) => (
            <Card key={solution.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="grid grid-rows-[auto_auto_1fr_auto] gap-4 h-full">
                  <div className="p-2 w-12 h-12 rounded-full bg-corporate-100 flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-corporate-700" />
                  </div>

                  <h3 className="text-xl font-semibold text-corporate-900 group-hover:text-corporate-700 transition-colors min-h-[3.5rem] line-clamp-2">
                    {solution.title}
                  </h3>

                  <p className="text-corporate-600 line-clamp-3">{solution.description}</p>

                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="inline-flex items-center text-corporate-700 hover:text-corporate-900 font-medium text-sm group/link"
                  >
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-corporate-800 hover:bg-corporate-700 text-white">
            <Link href="/solutions">
              View All Solutions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
