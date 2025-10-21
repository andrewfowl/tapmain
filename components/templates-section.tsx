import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const ArrowRightIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const FileTextIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

interface Template {
  id: number
  title: string
  description: string
  category: string
  file_type: string
  slug: string
}

interface TemplatesSectionProps {
  templates: Template[]
}

export default function TemplatesSection({ templates }: TemplatesSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-corporate-50" id="templates">
      <div className="corporate-container">
        <div className="corporate-section-title">
          <Badge className="bg-corporate-100 text-corporate-800 hover:bg-corporate-200 mb-4">Templates</Badge>
          <h2>Ready-to-Use Finance Templates</h2>
          <p>Access our library of expert-designed templates to accelerate your finance transformation.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
          {templates.slice(0, 6).map((template) => (
            <Card key={template.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 grid grid-rows-[auto_auto_auto_1fr_auto] gap-4 h-full">
                {/* Icon and badge row */}
                <div className="flex items-start justify-between">
                  <div className="p-2 w-12 h-12 rounded-full bg-corporate-100 flex items-center justify-center">
                    <FileTextIcon />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {template.file_type}
                  </Badge>
                </div>

                {/* Title row with fixed height */}
                <h3 className="text-xl font-semibold text-corporate-900 group-hover:text-corporate-700 transition-colors min-h-[3.5rem] line-clamp-2">
                  {template.title}
                </h3>

                {/* Category badge */}
                <Badge variant="outline" className="text-xs w-fit">
                  {template.category}
                </Badge>

                {/* Description - flexible height */}
                <p className="text-corporate-600 line-clamp-3">{template.description}</p>

                {/* Action button - aligned to bottom */}
                <Link
                  href={`/templates/${template.slug}`}
                  className="inline-flex items-center justify-center text-corporate-700 hover:text-corporate-900 font-medium text-sm group/link"
                >
                  View Details
                  <div className="ml-1 transition-transform duration-300 group-hover/link:translate-x-1">
                    <ArrowRightIcon />
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-corporate-800 hover:bg-corporate-700 text-white">
            <Link href="/templates">
              View All Templates
              <div className="ml-2">
                <ArrowRightIcon />
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
