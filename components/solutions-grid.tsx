import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

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

export default function SolutionsGrid({ solutions }: SolutionsGridProps) {
  const uniqueSolutions = Array.from(new Map(solutions.map((s) => [s.id, s])).values()).slice(0, 6)

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueSolutions.map((solution, index) => (
          <Card
            key={solution.id}
            className="bg-card border border-white/10 hover:border-white/30 transition-all duration-300 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6 h-full flex flex-col">
              {solution.image_url && (
                <div className="relative w-full h-40 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={solution.image_url || "/placeholder.svg"}
                    alt={solution.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {solution.group && (
                <Badge className="bg-white/10 text-white/80 mb-3 w-fit border-0">{solution.group}</Badge>
              )}

              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-white/90 transition-colors">
                {solution.title}
              </h3>

              <p className="text-white/60 text-sm mb-4 flex-grow line-clamp-3">
                {solution.short_description || solution.description}
              </p>

              {solution.pricing_info && (
                <div className="text-sm text-white/80 font-medium mb-3">{solution.pricing_info}</div>
              )}

              <div className="space-y-2">
                {(solution.benefits || solution.features)?.slice(0, 2).map((item, i) => (
                  <div key={i} className="text-xs text-white/50 flex items-start">
                    <span className="mr-2 text-white/30">•</span>
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
