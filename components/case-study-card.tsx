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
        {/* 2-row layout: top row image/content, bottom row achievements */}
        <div className="grid grid-cols-1 gap-0">
          {/* Top Row */}
          <div className={`grid grid-cols-1 ${hasImage ? "lg:grid-cols-2" : ""}`}>
            {/* Left side - Image */}
            {image.length > 0 && (
              <div className="relative w-full aspect-[197/272]">
                <Image src={image!} alt={title} fill className="object-cover" />
              </div>
            )}

            {/* Right side - Content */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs text-corporate-500 mb-2">{date}</div>
                <h3 className="text-xl font-medium text-corporate-800 mb-2">{title}</h3>
                <p className="text-lg font-serif text-accent1-600 mb-4">{result}</p>
                <p className="text-corporate-600 text-sm mb-6">{description}</p>
              </div>

              <Button asChild variant="outline" className="w-full bg-transparent">
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Download aria-hidden="true" />
                  <span className="ml-2">Download PDF</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Bottom Row - Key Achievements (full width) */}
          {highlights.length > 0 && (
            <div className="p-8 border-t border-corporate-200 bg-corporate-50">
              <h4 className="font-medium text-corporate-800 mb-3 text-sm">Key Achievements:</h4>
              <ul className="grid sm:grid-cols-2 gap-2">
                {highlights.map((highlight, i) => (
                  <li key={i} className="text-corporate-600 text-xs flex items-start">
                    <Check className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="ml-2">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
