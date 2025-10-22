import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Download } from "@geist-ui/icons"

interface CaseStudyCardProps {
  result: string
  title: string
  description: string
  highlights: string[]
  pdfUrl: string
  date: string
  image?: string
}


export function CaseStudyCard({ result, title, description, highlights, pdfUrl, date, image }: CaseStudyCardProps) {
  return (
    <Card className="border border-corporate-200 overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left side - Image */}
          {image && (
            <div className="relative w-full min-h-[64px] lg:h-full min-h-[300px]">
              <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
            </div>
          )}

          {/* Right side - Content */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs text-corporate-500 mb-2">{date}</div>
              <h3 className="text-xl font-medium text-corporate-800 mb-2">{title}</h3>
              <p className="text-lg font-serif text-accent1-600 mb-4">{result}</p>


              
              <p className="text-corporate-600 text-sm mb-6">{description}</p>

              <div>
                <h4 className="font-medium text-corporate-800 mb-3 text-sm">Key Achievements:</h4>
                <ul className="space-y-2 mb-6">
                  {highlights.map((highlight, i) => (
                    <li key={i} className="text-corporate-600 text-xs flex items-start">
                      <Check className="flex-shrink-0 mt-0.5" />
                      <span className="ml-2">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button asChild variant="outline" className="w-full bg-transparent">
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                <Download />
                <span className="ml-2">Download Case Study (PDF)</span>
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
