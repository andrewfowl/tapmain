import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { UpdateItem } from "@/actions/updates-actions"

const DownloadIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const BookOpenIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
)

interface LatestUpdatesSectionProps {
  updates: UpdateItem[]
}

export default function LatestUpdatesSection({ updates }: LatestUpdatesSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {updates.map((update) => (
        <Card
          key={update.id}
          className="border border-corporate-200 hover:shadow-card transition-all duration-300 flex flex-col h-full"
        >
          <CardContent className="p-6 grid grid-rows-[auto_auto_auto_1fr_auto] gap-4 h-full">
            {/* Image area */}
            {(update.image_url || update.external_url) && (
              <div className="w-full h-40 rounded-lg overflow-hidden bg-corporate-100">
                <img
                  src={
                    update.image_url ||
                    `https://api.microlink.io/?url=${encodeURIComponent(update.external_url || "")}&screenshot=true&meta=false&embed=screenshot.url`
                  }
                  alt={update.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // If thumbnail fails, hide the image container
                    e.currentTarget.parentElement!.style.display = "none"
                  }}
                />
              </div>
            )}

            {/* Meta area - badge and date */}
            <div className="flex items-center gap-2">
              <Badge
                variant={update.type === "news" ? "default" : "secondary"}
                className={
                  update.type === "news"
                    ? "bg-accent2-100 text-accent2-700 hover:bg-accent2-200"
                    : "bg-accent1-100 text-accent1-700 hover:bg-accent1-200"
                }
              >
                {update.type === "news" ? "News" : "Insight"}
              </Badge>
              <span className="text-xs text-corporate-500">{new Date(update.created_at).toLocaleDateString()}</span>
            </div>

            {/* Title area - fixed height for alignment */}
            <h3 className="text-lg font-medium text-corporate-900 line-clamp-2 min-h-[3.5rem]">{update.title}</h3>

            {/* Content area - flexible height */}
            <div className="flex-1">
              {update.excerpt && <p className="text-corporate-600 text-sm line-clamp-3">{update.excerpt}</p>}
            </div>

            {/* Actions area - aligned to bottom */}
            <div className="flex items-center gap-3 pt-2">
              {update.type === "news" ? (
                <Button asChild variant="outline" size="sm" className="bg-transparent w-full">
                  <Link href={`/news/${update.slug}`}>
                    <BookOpenIcon />
                    <span className="ml-2">Read More</span>
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="outline" size="sm" className="bg-transparent w-full">
                  <Link href={`/insights/${update.slug}`}>
                    <DownloadIcon />
                    <span className="ml-2">Download Report</span>
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
