"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import EmailCaptureModal from "./email-capture-modal"
import { AnimateOnScroll } from "./animate-on-scroll"
import { getPublishedResources, type Resource } from "@/actions/resources-actions"

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

export default function CombinedResourcesSection() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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

  useEffect(() => {
    async function fetchResources() {
      console.log("[v0] CombinedResourcesSection: Starting to fetch resources")
      try {
        const data = await getPublishedResources()
        console.log("[v0] CombinedResourcesSection: Received data:", data?.length || 0, "items")
        setResources(data)
      } catch (err) {
        console.error("[v0] CombinedResourcesSection: Error fetching resources:", err)
        setError(err instanceof Error ? err.message : "Failed to load resources")
      } finally {
        setLoading(false)
      }
    }
    fetchResources()
  }, [])

  // Show only 4 initially, then all when expanded
  const visibleResources = showAll ? resources : resources.slice(0, 4)
  const hasMore = resources.length > 4

  const handleDownloadClick = (title: string, description: string, downloadUrl?: string) => {
    setEmailModal({
      isOpen: true,
      title,
      description,
      downloadUrl,
    })
  }

  const handleEmailSubmit = async (email: string) => {
    console.log("[v0] Email captured:", email)
    if (emailModal.downloadUrl) {
      window.open(emailModal.downloadUrl, "_blank")
    }
  }

  // Format type label
  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  if (loading) {
    return (
      <div className="space-y-2">
        <p className="text-white/60 text-center mb-4">Loading resources...</p>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="py-4 px-5 bg-white/5 animate-pulse">
            <div className="h-5 bg-white/10 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">Error loading resources: {error}</p>
      </div>
    )
  }

  if (resources.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white/60">No resources available at this time.</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-2">
        {visibleResources.map((item, index) => (
          <AnimateOnScroll key={item.id} animation="fade-in-up" delay={index * 50}>
            <div className="flex items-center justify-between py-4 px-5 bg-white/5 hover:bg-white/[0.07] transition-colors duration-200 group">
              <div className="flex items-center gap-3">
                <span className="text-white/80 group-hover:text-white transition-colors duration-200">
                  {item.title}
                </span>
                <span className="text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded">{getTypeLabel(item.type)}</span>
              </div>

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

        {hasMore && (
          <div className="pt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => setShowAll(!showAll)}
              className="text-white/60 hover:text-white hover:bg-white/10 px-6 py-2"
            >
              {showAll ? "Show less" : `Load more (${resources.length - 4} more)`}
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
