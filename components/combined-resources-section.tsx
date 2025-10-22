"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EmailCaptureModal from "./email-capture-modal"

const ArrowRightIcon = () => (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const DownloadIcon = () => (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const FileTextIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const BookOpenIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 014.438 0 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138"
    />
  </svg>
)

const TargetIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 014.438 0 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138"
    />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const ChevronUpIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
)

interface Template {
  id: string
  title: string
  description: string
  category: string
  file_url?: string
}

interface Policy {
  id: string
  title: string
  description: string
  category: string
  file_url?: string
}

interface Insight {
  id: string
  title: string
  hook: string
  type: string
  slug: string
  image_url?: string
}

interface CombinedResourcesSectionProps {
  templates: Template[]
  policies: Policy[]
  insights?: Insight[]
}

export default function CombinedResourcesSection({ templates, policies, insights=[] }: CombinedResourcesSectionProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const hasInsights = insights.length > 0
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

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const handleDownloadClick = (title: string, description: string, downloadUrl?: string) => {
    setEmailModal({
      isOpen: true,
      title,
      description,
      downloadUrl,
    })
  }

  const handleEmailSubmit = async (email: string) => {
    // Here you would typically:
    // 1. Save the email to your database
    // 2. Send the download link via email
    // 3. Track the download for analytics
    console.log("Email captured:", email)

    // For now, just trigger the download
    if (emailModal.downloadUrl) {
      window.open(emailModal.downloadUrl, "_blank")
    }
  }

  const renderResourceGrid = (items: any[], type: "template" | "policy" | "insight", showAll: boolean) => {
    const displayItems = showAll ? items : items.slice(0, 4)

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayItems.map((item, index) => (
          <Card
            key={item.id}
            className="border border-corporate-200 hover:shadow-card-hover transition-all duration-300 group hover:-translate-y-1 bg-card"
          >
            <CardContent className="p-6 grid grid-rows-[auto_auto_auto_1fr_auto] gap-4 h-full">
              {/* Icon row */}
              <div className="flex items-center">
                <div className="bg-accent1-100 p-3 rounded-lg text-accent1-700 group-hover:bg-accent1-200 transition-all duration-300 group-hover:scale-105">
                  {type === "template" && <FileTextIcon />}
                  {type === "policy" && <FileTextIcon />}
                  {type === "insight" && <BookOpenIcon />}
                </div>
              </div>

              {/* Badge row */}
              <div>
                {(type === "template" || type === "policy") && (
                  <Badge className="bg-corporate-100 text-corporate-700 text-xs font-medium">{item.category}</Badge>
                )}
                {type === "insight" && (
                  <Badge className="bg-accent1-100 text-accent1-700 text-xs font-medium">{item.type}</Badge>
                )}
              </div>

              {/* Title row with fixed height */}
              <h3 className="text-lg font-semibold text-corporate-900 leading-tight min-h-[3.5rem] line-clamp-2">
                {item.title}
              </h3>

              {/* Description - flexible height */}
              <p className="text-corporate-600 text-sm leading-relaxed line-clamp-3">
                {type === "insight" ? item.hook : item.description}
              </p>

              {/* Action button - aligned to bottom */}
              <div>
                {type === "insight" ? (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent border-corporate-300 hover:bg-corporate-50 hover:border-accent1-300"
                  >
                    <Link href={`/insights/${item.slug}`}>
                      Read More
                      <div className="ml-2">
                        <ArrowRightIcon />
                      </div>
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent border-corporate-300 hover:bg-accent1-50 hover:border-accent1-300 hover:text-accent1-700"
                    onClick={() => handleDownloadClick(item.title, item.description, item.file_url)}
                  >
                    {item.title.toLowerCase().includes("case study")
                      ? "Read Case Study (PDF)"
                      : item.title.toLowerCase().includes("report")
                        ? "Download Report"
                        : "Download"}
                    <div className="ml-2">
                      <DownloadIcon />
                    </div>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <>
      <section className="py-20 md:py-28 bg-card" id="resources">
        <div className="corporate-container">
          <div className="corporate-section-title">
            <Badge className="bg-accent1-100 text-accent1-700 hover:bg-accent1-200 mb-6 px-4 py-2 text-sm font-medium">
              Resource Library
            </Badge>
            <h2 className="text-3xl md:text-4xl">Templates, Policies & Insights</h2>
            <p>Access our comprehensive library of accounting resources, expert insights, and policy frameworks.</p>
          </div>

          <div className="mt-16 space-y-20">
            {/* Templates Subsection */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-accent1-100 p-2 rounded-lg">
                    <TargetIcon />
                  </div>
                  <h3 className="text-2xl font-semibold text-corporate-900">Templates & Frameworks</h3>
                </div>
                {templates.length > 4 && (
                  <Button
                    variant="outline"
                    onClick={() => toggleSection("templates")}
                    className="bg-transparent border-corporate-300 hover:bg-corporate-100"
                  >
                    {expandedSections.has("templates") ? (
                      <>
                        Show Less <ChevronUpIcon />
                      </>
                    ) : (
                      <>
                        Show More ({templates.length - 4} more) <ChevronDownIcon />
                      </>
                    )}
                  </Button>
                )}
              </div>
              {renderResourceGrid(templates, "template", expandedSections.has("templates"))}
            </div>

            {/* Policies Subsection */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-corporate-100 p-2 rounded-lg">
                    <FileTextIcon />
                  </div>
                  <h3 className="text-2xl font-semibold text-corporate-900">Accounting Policies</h3>
                </div>
                {policies.length > 4 && (
                  <Button
                    variant="outline"
                    onClick={() => toggleSection("policies")}
                    className="bg-transparent border-corporate-300 hover:bg-corporate-100"
                  >
                    {expandedSections.has("policies") ? (
                      <>
                        Show Less <ChevronUpIcon />
                      </>
                    ) : (
                      <>
                        Show More ({policies.length - 4} more) <ChevronDownIcon />
                      </>
                    )}
                  </Button>
                )}
              </div>
              {renderResourceGrid(policies, "policy", expandedSections.has("policies"))}
            </div>

             {/* Insights Subsection (renders only if there’s data) */}
        {hasInsights && (
      <div>
     
              <div className="flex items-center justify-between mb-8">
                
                <div className="flex items-center gap-4">
                  <div className="bg-accent1-100 p-2 rounded-lg">
                    <BookOpenIcon />
                  </div>
                  <h3 className="text-2xl font-semibold text-corporate-900">Expert Insights</h3>
                </div>
                {insights.length > 4 && (
                  <Button
                    variant="outline"
                    onClick={() => toggleSection("insights")}
                    className="bg-transparent border-corporate-300 hover:bg-corporate-100"
                  >
                    {expandedSections.has("insights") ? (
                      <>
                        Show Less <ChevronUpIcon />
                      </>
                    ) : (
                      <>
                        Show More ({insights.length - 4} more) <ChevronDownIcon />
                      </>
                    )}
                  </Button>
                )}
              </div>
         
              {renderResourceGrid(insights, "insight", expandedSections.has("insights"))}
            </div>
         )}
          </div>
        </div>
      </section>

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
