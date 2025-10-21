"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Insight } from "@/actions/insights-actions"

interface InsightsSectionProps {
  initialInsights: Insight[]
  allInsights: Insight[]
}

export default function InsightsSection({ initialInsights, allInsights }: InsightsSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const [displayedInsights, setDisplayedInsights] = useState(initialInsights)

  const handleViewAll = () => {
    setShowAll(true)
    setDisplayedInsights(allInsights)
  }

  const handleViewLess = () => {
    setShowAll(false)
    setDisplayedInsights(initialInsights)
  }

  return (
    <section className="py-20 md:py-28 bg-corporate-50">
      <div className="corporate-container">
        <div className="flex justify-between items-end mb-12">
          <div>
            <Badge className="bg-corporate-200 text-corporate-800 hover:bg-corporate-300 mb-4">Latest Insights</Badge>
            <h2 className="mb-4">Expert Analysis and Research</h2>
            <p className="text-xl text-corporate-600 max-w-2xl">
              Stay ahead with the latest trends and insights in accounting technology.
            </p>
          </div>
          {!showAll ? (
            <button
              onClick={handleViewAll}
              className="hidden md:flex items-center text-corporate-700 hover:text-corporate-900 font-medium group"
            >
              View All Insights
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              onClick={handleViewLess}
              className="hidden md:flex items-center text-corporate-700 hover:text-corporate-900 font-medium"
            >
              View Less
            </button>
          )}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${showAll ? "lg:grid-cols-2" : ""}`}>
          {displayedInsights.map((insight) => (
            <Card
              key={insight.id}
              className="overflow-hidden border-0 shadow-card hover:shadow-card-hover transition-all duration-300 group grid grid-rows-[auto_auto_auto_1fr_auto] h-full"
            >
              {/* Row 1: Image area - fixed aspect ratio */}
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src={insight.image_url || "/placeholder.svg?height=400&width=600"}
                  alt={insight.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-corporate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Link href={`/insights/${insight.slug}`} className="text-white font-medium flex items-center text-sm">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Row 2: Badge and date */}
              <div className="flex items-center justify-between px-6 pt-6 pb-3 bg-white">
                <Badge className="bg-corporate-100 text-corporate-700 hover:bg-corporate-200">
                  {insight.type || "Insight"}
                </Badge>
                <span className="text-xs text-corporate-500">{new Date(insight.created_at).toLocaleDateString()}</span>
              </div>

              {/* Row 3: Title - fixed height with line clamp */}
              <div className="px-6 bg-white">
                <h3 className="text-xl font-medium text-corporate-800 group-hover:text-corporate-600 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                  {insight.title}
                </h3>
              </div>

              {/* Row 4: Description - flexible height */}
              <div className="px-6 py-4 bg-white">
                {insight.hook && <p className="text-corporate-600 text-sm line-clamp-3">{insight.hook}</p>}
              </div>

              {/* Row 5: Action button - aligned to bottom */}
              <div className="px-6 pb-6 bg-white">
                <Link
                  href={`/insights/${insight.slug}`}
                  className="text-corporate-700 hover:text-corporate-900 font-medium flex items-center text-sm"
                >
                  Read More
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          {!showAll ? (
            <Button
              onClick={handleViewAll}
              variant="outline"
              className="border-corporate-300 text-corporate-800 hover:bg-corporate-100 bg-transparent"
            >
              View All Insights
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleViewLess}
              variant="outline"
              className="border-corporate-300 text-corporate-800 hover:bg-corporate-100 bg-transparent"
            >
              View Less
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
