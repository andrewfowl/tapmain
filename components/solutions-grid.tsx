import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronRight } from "@geist-ui/icons"

interface Solution {
  id: string
  title: string
  slug: string
  description: string
  short_description: string
  benefits?: Array<{ title: string; description: string }>
  features?: Array<{ title: string; description: string }>
  pricing_info?: string
  image_url?: string
  group?: string
}

interface SolutionsGridProps {
  solutions: Solution[]
}

const solutionButton = "<Button asChild variant="outline" className="w-full bg-black text-white hover:bg-corporate-700 border-2 border-black mt-auto"><Link href={`/solutions/${solution.slug}`}>Learn More<ChevronRight /></Link></Button>"

export default function SolutionsGrid({ solutions }: SolutionsGridProps) {
  const uniqueSolutions = Array.from(new Map(solutions.map((s) => [s.id, s])).values()).slice(0, 6)

  return (
       <div className="w-full p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center">
        {uniqueSolutions.map((solution) => (
          <Card key={solution.id} className="border-2 border-black hover:bg-gray-50 transition-all duration-300 w-full">
            <CardContent className="p-6 h-full flex flex-col">
              {solution.image_url && (
                <div className="relative w-full h-40 mb-4 overflow-hidden border border-black">
                  <Image
                    src={solution.image_url || "/placeholder.svg"}
                    alt={solution.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {solution.group && (
                <Badge className="bg-black text-white mb-3 w-fit border border-black">{solution.group}</Badge>
              )}

              <h3 className="text-lg font-bold text-black mb-2 line-clamp-2">{solution.title}</h3>

              <p className="text-gray-700 text-sm mb-3 flex-grow line-clamp-3">
                {solution.short_description || solution.description}
              </p>

              {solution.pricing_info && (
                <div className="text-sm text-black font-semibold mb-3">{solution.pricing_info}</div>
              )}

              <div className="space-y-1">
                {(solution.benefits || solution.features)?.slice(0, 2).map((item, i) => (
                  <div key={i} className="text-xs text-gray-600 flex items-start">
                    <span className="mr-2 font-bold">•</span>
                    <span className="line-clamp-1">{item.title}</span>
                  </div>
                ))}
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
