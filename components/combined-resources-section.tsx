"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import EmailCaptureModal from "./email-capture-modal"
import { AnimateOnScroll } from "./animate-on-scroll"

const DownloadIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
)

interface Template {
  id: string
  title: string
  description: string
  category: string
  downloadUrl?: string
}

interface Policy {
  id: string
  title: string
  description: string
  category?: string
  downloadUrl?: string
}

interface CombinedResourcesSectionProps {
  templates?: Template[]
  policies?: Policy[]
}

export default function CombinedResourcesSection({ templates = [], policies = [] }: CombinedResourcesSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const [emailModal, setEmailModal] = useState<{
    isOpen: boolean
    title: string
    description: string
    downloadUrl?: string
  }>({
    isOpen: false,
    title: "",
    description: "",
  })

  // Combine all resources into a single list with type indicator
  const allResources = [
    ...templates.map((t) => ({ ...t, type: "Template" as const })),
    ...policies.map((p) => ({ ...p, type: "Policy" as const })),
  ]

  // Show only 4 initially, then all when expanded
  const visibleResources = showAll ? allResources : allResources.slice(0, 4)
  const hasMore = allResources.length > 4

  const handleDownloadClick = (title: string, description: string, downloadUrl?: string) => {
    setEmailModal({
      isOpen: true,
      title,
      description,
      downloadUrl,
    })
  }

  const handleEmailSubmit = async (email: string) => {
    console.log("Email captured:", email)
    if (emailModal.downloadUrl) {
      window.open(emailModal.downloadUrl, "_blank")
    }
  }

  if (allResources.length === 0) {
    return null
  }

  return (
    <>
      <div className="space-y-2">
        {/* Single combined list */}
        {visibleResources.map((item, index) => (
          <AnimateOnScroll key={`${item.type}-${item.id}`} animation="fade-in-up" delay={index * 50}>
            <div className="flex items-center justify-between py-4 px-5 bg-white/5 hover:bg-white/[0.07] transition-colors duration-200 group">
              {/* Title and type badge */}
              <div className="flex items-center gap-3">
                <span className="text-white/80 group-hover:text-white transition-colors duration-200">
                  {item.title}
                </span>
                <span className="text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded">{item.type}</span>
              </div>

              {/* Download button */}
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border-0 px-4 py-2 transition-all duration-200"
                onClick={() => handleDownloadClick(item.title, item.description, item.downloadUrl)}
              >
                <DownloadIcon />
                <span className="ml-2 text-sm">Download</span>
              </Button>
            </div>
          </AnimateOnScroll>
        ))}

        {/* Load more button */}
        {hasMore && (
          <div className="pt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => setShowAll(!showAll)}
              className="text-white/60 hover:text-white hover:bg-white/10 px-6 py-2"
            >
              {showAll ? "Show less" : `Load more (${allResources.length - 4} more)`}
            </Button>
          </div>
        )}
      </div>

      <EmailCaptureModal
        isOpen={emailModal.isOpen}
        onClose={() => setEmailModal({ ...emailModal, isOpen: false })}
        onSubmit={handleEmailSubmit}
        title={emailModal.title}
        description={emailModal.description}
      />
    </>
  )
}
