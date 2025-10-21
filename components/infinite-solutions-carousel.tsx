"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

interface InfiniteSolutionsCarouselProps {
  solutions: Solution[]
}

const ArrowRightIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

export default function InfiniteSolutionsCarousel({ solutions }: InfiniteSolutionsCarouselProps) {
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const midpoint = Math.ceil(solutions.length / 2)
  const topRowSolutions = solutions.slice(0, midpoint)
  const bottomRowSolutions = solutions.slice(midpoint)

  // Duplicate each row separately for infinite scroll
  const duplicatedTopRow = [...topRowSolutions, ...topRowSolutions, ...topRowSolutions]
  const duplicatedBottomRow = [...bottomRowSolutions, ...bottomRowSolutions, ...bottomRowSolutions]
  // </CHANGE>

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" })
      setIsPaused(true)
      setTimeout(() => setIsPaused(false), 3000)
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" })
      setIsPaused(true)
      setTimeout(() => setIsPaused(false), 3000)
    }
  }

  const renderSolutionCard = (solution: Solution, index: number, rowPrefix: string) => (
    <Card
      key={`${rowPrefix}-${solution.id}-${index}`}
      className="border-2 border-black hover:bg-gray-50 transition-all duration-300 w-80 flex-shrink-0"
    >
      <CardContent className="p-6 h-full flex flex-col">
        {solution.image_url && (
          <div className="relative w-full h-40 mb-4 overflow-hidden border border-black">
            <Image src={solution.image_url || "/placeholder.svg"} alt={solution.title} fill className="object-cover" />
          </div>
        )}

        {solution.group && (
          <Badge className="bg-black text-white mb-3 w-fit border border-black">{solution.group}</Badge>
        )}

        <h3 className="text-lg font-bold text-black mb-2 line-clamp-2">{solution.title}</h3>

        <p className="text-gray-700 text-sm mb-3 flex-grow line-clamp-3">
          {solution.short_description || solution.description}
        </p>

        {solution.pricing_info && <div className="text-sm text-black font-semibold mb-3">{solution.pricing_info}</div>}

        <div className="space-y-1 mb-4">
          {(solution.benefits || solution.features)?.slice(0, 2).map((item, i) => (
            <div key={i} className="text-xs text-gray-600 flex items-start">
              <span className="mr-2 font-bold">•</span>
              <span className="line-clamp-1">{item.title}</span>
            </div>
          ))}
        </div>

        <Button
          asChild
          variant="outline"
          className="w-full bg-black text-white hover:bg-gray-800 border-2 border-black mt-auto"
        >
          <Link href={`/solutions/${solution.slug}`}>
            Learn More
            <ArrowRightIcon />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
  // </CHANGE>

  return (
    <div className="relative w-full border-2 border-black p-4">
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-black hover:bg-black hover:text-white"
        onClick={scrollLeft}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-black hover:bg-black hover:text-white"
        onClick={scrollRight}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="space-y-4">
          {/* Top Row */}
          <div
            className="flex gap-4 w-fit"
            style={{
              animation: isPaused ? "none" : "scroll 60s linear infinite",
            }}
          >
            {duplicatedTopRow.map((solution, index) => renderSolutionCard(solution, index, "top"))}
          </div>

          {/* Bottom Row */}
          <div
            className="flex gap-4 w-fit"
            style={{
              animation: isPaused ? "none" : "scroll 60s linear infinite",
            }}
          >
            {duplicatedBottomRow.map((solution, index) => renderSolutionCard(solution, index, "bottom"))}
          </div>
        </div>
        {/* </CHANGE> */}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
