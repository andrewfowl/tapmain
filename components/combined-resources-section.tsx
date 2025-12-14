"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import EmailCaptureModal from "./email-capture-modal"
import { AnimateOnScroll } from "./animate-on-scroll"
import { ExternalLink } from "lucide-react"

export interface Resource {
  id: string
  title: string
  slug: string
  description: string
  category?: string
  type: "template" | "policy" | "framework"
  content?: any
  preview_image_url?: string
  file_type?: string
  file_size?: number
  downloadUrl?: string
  published: boolean
  created_at: string
  updated_at: string
  created_by?: string
}

interface CombinedResourcesSectionProps {
  resources: Resource[]
}

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

export default function CombinedResourcesSection({ resources }: CombinedResourcesSectionProps) {
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
    if (emailModal.downloadUrl) {
      window.open(emailModal.downloadUrl, "_blank")
    }
  }

  // Format type label
  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
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

        <div className="pt-8 mt-4 border-t border-zinc-800/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-400 text-sm">
              <span className="text-zinc-500">Ready to test your knowledge?</span> Test your blockchain knowledge with our free
              quizzes.
            </p>
            <a
              href="https://allocker.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-white/90 font-medium rounded-full transition-all hover:scale-105 text-sm whitespace-nowrap"
            >
              Try Free Tests
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
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
