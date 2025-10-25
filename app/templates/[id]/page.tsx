"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Download,
  FileText,
  Share2,
  ChevronRight,
  Clock,
  Users,
  CheckCircle2,
  Bookmark,
  MessageSquare,
  ThumbsUp,
  ArrowRight,
  Info,
  TrendingUp,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function TemplatePage() {
  const params = useParams()
  const router = useRouter()
  const [showDownloadDialog, setShowDownloadDialog] = useState(false)
  const [email, setEmail] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const overviewRef = useRef<HTMLDivElement>(null)
  const [isHeaderSticky, setIsHeaderSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (overviewRef.current) {
        const { top } = overviewRef.current.getBoundingClientRect()
        setIsHeaderSticky(top <= 80)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mock data - in a real app, you would fetch this based on the ID
  const templateId = Number(params.id)

  const templates = {
    1: {
      id: 1,
      title: "Zero-Based Budgeting Framework",
      description: "A comprehensive framework for implementing zero-based budgeting in your organization.",
      category: "Financial Planning & Analysis",
      tags: ["Budgeting", "Cost Control", "Planning"],
      image: "/placeholder.svg?height=400&width=800",
      downloadCount: 1245,
      rating: 4.8,
      reviewCount: 124,
      lastUpdated: "2 weeks ago",
      complexity: "Advanced",
      author: {
        name: "Finance Transform Team",
        image: "/placeholder.svg?height=50&width=50",
        role: "Finance Experts",
      },
      overview: `
        Zero-based budgeting (ZBB) is a method of budgeting in which all expenses must be justified for each new period. 
        This framework provides a structured approach to implementing ZBB in your organization, including templates, 
        processes, and best practices.
        
        This comprehensive framework includes:
        
        - ZBB implementation roadmap
        - Cost category definition templates
        - Spend visibility dashboards
        - Decision rights matrix
        - Cost reduction opportunity identification tools
        - Implementation tracking tools
      `,
      benefits: [
        {
          title: "Increased cost visibility and control",
          description: "Gain complete transparency into all expenses and establish stronger governance over spending.",
        },
        {
          title: "More efficient resource allocation",
          description: "Direct resources to strategic priorities rather than historical spending patterns.",
        },
        {
          title: "Elimination of unnecessary spending",
          description: "Identify and eliminate costs that don't contribute to business value.",
        },
        {
          title: "Alignment of spending with strategic priorities",
          description: "Ensure every dollar spent supports your organization's strategic objectives.",
        },
        {
          title: "Cultural shift toward cost consciousness",
          description: "Foster a culture where cost management becomes everyone's responsibility.",
        },
      ],
      implementation: [
        {
          title: "Phase 1: Preparation and Planning (4-6 weeks)",
          description: "Define scope, establish governance, and develop communication strategy.",
          steps: [
            "Establish executive sponsorship and steering committee",
            "Define scope and objectives",
            "Develop communication and change management plan",
            "Identify and train ZBB champions",
          ],
        },
        {
          title: "Phase 2: Cost Visibility and Categorization (6-8 weeks)",
          description: "Create cost visibility and establish spending categories.",
          steps: [
            "Map current spending to cost categories",
            "Establish cost category owners",
            "Develop baseline spending view",
            "Create spend visibility dashboards",
          ],
        },
        {
          title: "Phase 3: Target Setting and Opportunity Identification (4-6 weeks)",
          description: "Set targets and identify cost reduction opportunities.",
          steps: [
            "Benchmark spending against internal and external benchmarks",
            "Set targets by cost category",
            "Identify and prioritize cost reduction opportunities",
            "Develop implementation roadmap",
          ],
        },
        {
          title: "Phase 4: Implementation and Tracking (Ongoing)",
          description: "Implement cost reduction initiatives and track progress.",
          steps: [
            "Implement cost reduction initiatives",
            "Track progress against targets",
            "Report results to stakeholders",
            "Refine approach based on learnings",
          ],
        },
      ],
      faqs: [
        {
          question: "How is zero-based budgeting different from traditional budgeting?",
          answer:
            "Traditional budgeting typically starts with the previous period's budget and adjusts up or down. Zero-based budgeting starts from zero and requires justification for every expense, regardless of previous spending patterns.",
        },
        {
          question: "Is zero-based budgeting suitable for all organizations?",
          answer:
            "While ZBB can benefit most organizations, it's particularly valuable for those facing cost pressures, undergoing significant transformation, or seeking to realign spending with strategy. The approach can be tailored to fit different organizational contexts.",
        },
        {
          question: "How often should zero-based budgeting be performed?",
          answer:
            "Many organizations implement ZBB annually, but some apply it on a rolling basis to different cost categories throughout the year. The frequency depends on your organization's specific needs and resources.",
        },
        {
          question: "What resources are required to implement zero-based budgeting?",
          answer:
            "Successful ZBB implementation requires executive sponsorship, dedicated resources for analysis and implementation, and involvement from finance, operations, and business unit leaders. This framework provides templates and tools to streamline the process.",
        },
      ],
      reviews: [
        {
          name: "Michael Chen",
          role: "CFO, Tech Innovations Inc.",
          rating: 5,
          comment:
            "This framework provided us with the structure and tools we needed to implement zero-based budgeting across our organization. We've reduced costs by 15% while better aligning spending with our strategic priorities.",
          date: "1 month ago",
        },
        {
          name: "Sarah Johnson",
          role: "Finance Director, Global Retail",
          rating: 5,
          comment:
            "Comprehensive and practical. The implementation roadmap and templates saved us months of work. Highly recommended for any finance team looking to implement ZBB.",
          date: "2 months ago",
        },
        {
          name: "David Rodriguez",
          role: "VP Finance, Healthcare Solutions",
          rating: 4,
          comment:
            "Very thorough framework with excellent templates. Would have given 5 stars if it included more industry-specific examples for healthcare.",
          date: "3 months ago",
        },
      ],
      includes: [
        { type: "Excel", name: "ZBB Implementation Roadmap", icon: "FileText" },
        { type: "Excel", name: "Cost Category Definition Template", icon: "FileText" },
        { type: "Excel", name: "Spend Visibility Dashboard", icon: "FileText" },
        { type: "PowerPoint", name: "ZBB Implementation Guide", icon: "FileText" },
        { type: "PDF", name: "Case Study Examples", icon: "FileText" },
      ],
      relatedTemplates: [2, 4, 7],
    },
    // Add more templates as needed
  }

  const template = templates[templateId as keyof typeof templates]

  if (!template) {
    return (
      <div className="container px-4 md:px-6 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4 text-corporate-800">Template not found</h1>
        <p className="mb-6 text-corporate-600">The template you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="bg-corporate-700 hover:bg-corporate-800">
          <Link href="/templates">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Link>
        </Button>
      </div>
    )
  }

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would process the download and potentially log the user's email
    setShowDownloadDialog(false)
    // Simulate download
    const link = document.createElement("a")
    link.href = `/api/templates/download/${template.id}`
    link.download = `${template.title.replace(/\s+/g, "-").toLowerCase()}.zip`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const relatedTemplates =
    template.relatedTemplates?.map((id) => templates[id as keyof typeof templates]).filter(Boolean) || []

  return (
    <div className="min-h-screen bg-white flex flex-col">
     
      {/* Breadcrumb */}
      <div className="bg-corporate-50 pt-24 pb-6">
        <div className="corporate-container">
          <div className="flex items-center text-sm text-corporate-600">
            <Link href="/" className="hover:text-corporate-800">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/templates" className="hover:text-corporate-800">
              Templates
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-corporate-800 font-medium truncate max-w-[200px]">{template.title}</span>
          </div>
        </div>
      </div>

      {/* Template Header */}
      <div className="bg-corporate-50 pb-12">
        <div className="corporate-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="bg-corporate-200 text-corporate-800">{template.category}</Badge>
                <Badge
                  className={`
              ${
                template.complexity === "Beginner"
                  ? "bg-green-100 text-green-800"
                  : template.complexity === "Intermediate"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
              }
            `}
                >
                  {template.complexity}
                </Badge>
              </div>

              <h1 className="text-2xl md:text-4xl font-serif text-corporate-900 tracking-tight mb-4">
                {template.title}
              </h1>

              <p className="text-lg text-corporate-700 max-w-3xl mb-4">{template.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-corporate-500 mr-1.5" />
                  <span className="text-corporate-600">Updated {template.lastUpdated}</span>
                </div>

                <div className="flex items-center">
                  <Users className="h-4 w-4 text-corporate-500 mr-1.5" />
                  <span className="text-corporate-600">{template.downloadCount.toLocaleString()} downloads</span>
                </div>

                <div className="flex items-center">
                  <div className="flex mr-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${star <= Math.round(template.rating) ? "text-yellow-500" : "text-corporate-200"} fill-current`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-corporate-700 font-medium">{template.rating}</span>
                  <span className="text-corporate-500 ml-1">({template.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-0">
              <Button
                variant="outline"
                className="border-corporate-300 text-corporate-800 hover:bg-corporate-50"
                onClick={() => {}}
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>

              <Button
                variant="outline"
                className="border-corporate-300 text-corporate-800 hover:bg-corporate-50"
                onClick={() => {}}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>

              <Button
                className="bg-corporate-800 hover:bg-corporate-700 text-white"
                onClick={() => router.push(`/templates/download/${templateId}`)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div ref={overviewRef} className="corporate-container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Template Preview Image */}
            <div className="aspect-video w-full overflow-hidden rounded-lg border border-corporate-200 shadow-card mb-8">
              <img
                src={template.image || "/placeholder.svg"}
                alt={template.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tabs Navigation - Sticky on Scroll */}
            <div
              className={`bg-white z-20 transition-all duration-300 ${
                isHeaderSticky ? "sticky top-16 md:top-20 py-4 border-b border-corporate-200 shadow-sm" : ""
              }`}
            >
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-corporate-50 p-1 overflow-x-auto">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-white data-[state=active]:text-corporate-800 data-[state=active]:shadow-none"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="benefits"
                    className="data-[state=active]:bg-white data-[state=active]:text-corporate-800 data-[state=active]:shadow-none"
                  >
                    Benefits
                  </TabsTrigger>
                  <TabsTrigger
                    value="implementation"
                    className="data-[state=active]:bg-white data-[state=active]:text-corporate-800 data-[state=active]:shadow-none"
                  >
                    Implementation
                  </TabsTrigger>
                  <TabsTrigger
                    value="faqs"
                    className="data-[state=active]:bg-white data-[state=active]:text-corporate-800 data-[state=active]:shadow-none"
                  >
                    FAQs
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="data-[state=active]:bg-white data-[state=active]:text-corporate-800 data-[state=active]:shadow-none"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="pt-6">
                  <div className="prose max-w-none">
                    <div className="flex items-start gap-4 mb-6 p-4 bg-corporate-50 rounded-lg border border-corporate-200">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-corporate-200">
                        <img
                          src={template.author.image || "/placeholder.svg"}
                          alt={template.author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-corporate-800">{template.author.name}</div>
                        <div className="text-sm text-corporate-600">{template.author.role}</div>
                        <p className="text-sm text-corporate-700 mt-2">
                          This template was created by our team of finance experts with decades of experience in
                          implementing zero-based budgeting across various industries.
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-medium text-corporate-800 mb-4">About This Template</h3>
                    <p className="whitespace-pre-line text-corporate-700 leading-relaxed">{template.overview}</p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-6">
                      <div className="flex-1 p-6 bg-corporate-50 rounded-lg border border-corporate-200">
                        <h4 className="text-lg font-medium text-corporate-800 mb-3">Who is this for?</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-accent1-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-corporate-700">Finance leaders implementing ZBB</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-accent1-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-corporate-700">Cost optimization teams</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-accent1-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-corporate-700">Financial planning & analysis professionals</span>
                          </li>
                        </ul>
                      </div>

                      <div className="flex-1 p-6 bg-corporate-50 rounded-lg border border-corporate-200">
                        <h4 className="text-lg font-medium text-corporate-800 mb-3">Skills required</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-accent1-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-corporate-700">Advanced Excel skills</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-accent1-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-corporate-700">Financial analysis experience</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-accent1-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-corporate-700">Project management basics</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="benefits" className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {template.benefits.map((benefit, index) => (
                      <Card
                        key={index}
                        className="border border-corporate-200 shadow-subtle hover:shadow-card transition-all duration-300"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-accent1-100 flex items-center justify-center text-accent1-700 flex-shrink-0">
                              <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-corporate-800 mb-2">{benefit.title}</h3>
                              <p className="text-corporate-600">{benefit.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="implementation" className="pt-6">
                  <div className="relative">
                    {/* Timeline connector */}
                    <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gradient-to-b from-corporate-300 via-corporate-300 to-corporate-100"></div>

                    <div className="space-y-12">
                      {template.implementation.map((phase, index) => (
                        <div key={index} className="relative">
                          {/* Phase number */}
                          <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-corporate-800 text-white flex items-center justify-center font-medium text-lg z-10">
                            {index + 1}
                          </div>

                          {/* Phase content */}
                          <div className="pl-20">
                            <div className="bg-white rounded-lg border border-corporate-200 shadow-subtle overflow-hidden">
                              <div className="bg-corporate-50 p-6">
                                <h3 className="text-xl font-medium text-corporate-800 mb-2">{phase.title}</h3>
                                <p className="text-corporate-600">{phase.description}</p>
                              </div>

                              <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="text-sm font-medium text-corporate-700 uppercase tracking-wide mb-4 flex items-center">
                                      <span className="w-6 h-6 rounded-full bg-corporate-100 flex items-center justify-center text-corporate-800 text-xs font-medium mr-2">
                                        <CheckCircle2 className="h-3 w-3" />
                                      </span>
                                      Key Steps
                                    </h4>
                                    <ul className="space-y-3">
                                      {phase.steps
                                        .slice(0, Math.ceil(phase.steps.length / 2))
                                        .map((step, stepIndex) => (
                                          <li key={stepIndex} className="flex items-start group">
                                            <div className="w-6 h-6 rounded-full bg-corporate-100 flex items-center justify-center text-corporate-800 text-xs font-medium mr-3 mt-0.5 flex-shrink-0 group-hover:bg-corporate-200 transition-colors duration-200">
                                              {stepIndex + 1}
                                            </div>
                                            <span className="text-corporate-700 group-hover:text-corporate-800 transition-colors duration-200">
                                              {step}
                                            </span>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>

                                  <div>
                                    {phase.steps.length > Math.ceil(phase.steps.length / 2) && (
                                      <>
                                        <h4 className="text-sm font-medium text-corporate-700 uppercase tracking-wide mb-4 flex items-center md:opacity-0">
                                          <span className="w-6 h-6 rounded-full bg-corporate-100 flex items-center justify-center text-corporate-800 text-xs font-medium mr-2">
                                            <CheckCircle2 className="h-3 w-3" />
                                          </span>
                                          Key Steps
                                        </h4>
                                        <ul className="space-y-3">
                                          {phase.steps
                                            .slice(Math.ceil(phase.steps.length / 2))
                                            .map((step, stepIndex) => (
                                              <li key={stepIndex} className="flex items-start group">
                                                <div className="w-6 h-6 rounded-full bg-corporate-100 flex items-center justify-center text-corporate-800 text-xs font-medium mr-3 mt-0.5 flex-shrink-0 group-hover:bg-corporate-200 transition-colors duration-200">
                                                  {stepIndex + 1 + Math.ceil(phase.steps.length / 2)}
                                                </div>
                                                <span className="text-corporate-700 group-hover:text-corporate-800 transition-colors duration-200">
                                                  {step}
                                                </span>
                                              </li>
                                            ))}
                                        </ul>
                                      </>
                                    )}
                                  </div>
                                </div>

                                {/* Deliverables */}
                                <div className="mt-6 pt-6 border-t border-corporate-100">
                                  <h4 className="text-sm font-medium text-corporate-700 uppercase tracking-wide mb-4 flex items-center">
                                    <span className="w-6 h-6 rounded-full bg-corporate-100 flex items-center justify-center text-corporate-800 text-xs font-medium mr-2">
                                      <FileText className="h-3 w-3" />
                                    </span>
                                    Key Deliverables
                                  </h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {[
                                      index === 0
                                        ? ["Project Charter", "Governance Structure", "Communication Plan"]
                                        : index === 1
                                          ? ["Cost Category Framework", "Spend Visibility Dashboard", "Baseline Report"]
                                          : index === 2
                                            ? ["Target Setting Model", "Opportunity Register", "Implementation Roadmap"]
                                            : ["Implementation Tracker", "Results Dashboard", "Lessons Learned Log"],
                                    ].map((deliverable, i) => (
                                      <div
                                        key={i}
                                        className="bg-corporate-50 rounded-md p-3 border border-corporate-200 text-sm text-corporate-700 flex items-center"
                                      >
                                        <FileText className="h-4 w-4 mr-2 text-corporate-500" />
                                        {deliverable}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Success indicators */}
                    <div className="mt-12 pt-12 border-t border-corporate-200">
                      <h3 className="text-xl font-medium text-corporate-800 mb-6">Success Indicators</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          {
                            title: "Cost Reduction",
                            value: "15-25%",
                            description: "Typical cost reduction achieved through ZBB implementation",
                            icon: <TrendingUp className="h-5 w-5 text-green-600" />,
                          },
                          {
                            title: "Process Efficiency",
                            value: "30-40%",
                            description: "Improvement in finance process efficiency",
                            icon: <Clock className="h-5 w-5 text-blue-600" />,
                          },
                          {
                            title: "Strategic Alignment",
                            value: "100%",
                            description: "Alignment of spending with strategic priorities",
                            icon: <Target className="h-5 w-5 text-purple-600" />,
                          },
                        ].map((indicator, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg border border-corporate-200 p-6 shadow-subtle hover:shadow-card transition-all duration-300"
                          >
                            <div className="w-12 h-12 rounded-full bg-corporate-100 flex items-center justify-center mb-4">
                              {indicator.icon}
                            </div>
                            <h4 className="text-lg font-medium text-corporate-800 mb-1">{indicator.title}</h4>
                            <div className="text-2xl font-serif text-corporate-900 mb-2">{indicator.value}</div>
                            <p className="text-sm text-corporate-600">{indicator.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="faqs" className="pt-6">
                  <div className="border border-corporate-200 rounded-lg overflow-hidden shadow-subtle">
                    <Accordion type="single" collapsible className="w-full">
                      {template.faqs.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`faq-${index}`}
                          className="border-b border-corporate-200 last:border-0"
                        >
                          <AccordionTrigger className="px-6 py-4 hover:bg-corporate-50 text-corporate-800 font-medium">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4 pt-0 text-corporate-700">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="pt-6">
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-medium text-corporate-800 mb-1">Customer Reviews</h3>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-5 h-5 ${star <= Math.round(template.rating) ? "text-yellow-500" : "text-corporate-200"} fill-current`}
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-corporate-800 font-medium">{template.rating}</span>
                          <span className="text-corporate-600 ml-1">({template.reviewCount} reviews)</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="border-corporate-300 text-corporate-800 hover:bg-corporate-50"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Write a Review
                      </Button>
                    </div>

                    {/* Featured Review */}
                    {template.reviews.length > 0 && (
                      <div className="relative bg-corporate-50 rounded-xl p-8 border border-corporate-200 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 text-corporate-100 opacity-20">
                          <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.3 6.2H16.7L13.2 12.2H16.7L7.8 22.2L10.5 15.2H7L11.3 6.2Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>

                        <div className="relative">
                          <div className="text-4xl text-corporate-300 font-serif leading-none mb-4">"</div>
                          <p className="text-lg text-corporate-800 italic mb-6 relative">
                            {template.reviews[0].comment}
                          </p>

                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-corporate-200 flex items-center justify-center mr-4 text-corporate-700 font-medium">
                              {template.reviews[0].name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <h4 className="font-medium text-corporate-800">{template.reviews[0].name}</h4>
                              <p className="text-sm text-corporate-600">{template.reviews[0].role}</p>
                            </div>
                            <div className="ml-auto flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-4 h-4 ${star <= template.reviews[0].rating ? "text-yellow-500" : "text-corporate-200"} fill-current`}
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Other Reviews */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {template.reviews.slice(1).map((review, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg p-6 border border-corporate-200 shadow-subtle hover:shadow-card transition-all duration-300"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-corporate-200 flex items-center justify-center mr-3 text-corporate-700 font-medium text-sm">
                                {review.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div>
                                <div className="font-medium text-corporate-800">{review.name}</div>
                                <div className="text-xs text-corporate-600">{review.role}</div>
                              </div>
                            </div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-3.5 h-3.5 ${star <= review.rating ? "text-yellow-500" : "text-corporate-200"} fill-current`}
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                </svg>
                              ))}
                            </div>
                          </div>

                          <p className="text-corporate-700 mb-3 line-clamp-3">{review.comment}</p>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-corporate-500">{review.date}</span>
                            <div className="flex items-center gap-4">
                              <button className="flex items-center text-corporate-600 hover:text-corporate-800">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                <span>Helpful</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Review Stats */}
                    <div className="bg-white rounded-lg border border-corporate-200 p-6 mt-8">
                      <h4 className="font-medium text-corporate-800 mb-4">Rating Distribution</h4>
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          // Calculate percentage (mock data)
                          const percentage =
                            rating === 5 ? 68 : rating === 4 ? 22 : rating === 3 ? 7 : rating === 2 ? 2 : 1

                          return (
                            <div key={rating} className="flex items-center">
                              <div className="flex items-center w-16">
                                <span className="text-sm text-corporate-800 mr-1">{rating}</span>
                                <svg className="w-3.5 h-3.5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                </svg>
                              </div>
                              <div className="flex-1 h-2 bg-corporate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-corporate-700" style={{ width: `${percentage}%` }}></div>
                              </div>
                              <div className="w-12 text-right text-xs text-corporate-600">{percentage}%</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center bg-corporate-50 rounded-lg p-8 border border-corporate-200">
                      <h4 className="text-xl font-medium text-corporate-800 mb-2">Have you used this template?</h4>
                      <p className="text-corporate-600 mb-6 max-w-md mx-auto">
                        Share your experience and help other finance professionals make informed decisions.
                      </p>
                      <Button className="bg-corporate-800 hover:bg-corporate-700 text-white">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Write a Review
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="space-y-6">
            {/* Template Info Card */}
            <Card className="border border-corporate-200 shadow-card overflow-hidden sticky top-24">
              <CardContent className="p-0">
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="flex mr-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${star <= Math.round(template.rating) ? "text-yellow-500" : "text-corporate-200"} fill-current`}
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-corporate-800 font-medium">{template.rating}</span>
                      <span className="text-corporate-600 ml-1">({template.reviewCount})</span>
                    </div>
                    <div className="text-sm text-corporate-600">
                      {template.downloadCount.toLocaleString()} downloads
                    </div>
                  </div>

                  <div className="border-t border-corporate-200 pt-6"></div>

                  <div className="space-y-4">
                    <Button
                      className="w-full bg-corporate-800 hover:bg-corporate-700 text-white"
                      onClick={() => router.push(`/templates/download/${templateId}`)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Template
                    </Button>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 border-corporate-200 text-corporate-700 hover:bg-corporate-50"
                      >
                        <Bookmark className="mr-2 h-4 w-4" />
                        Save
                      </Button>

                      <Button
                        variant="outline"
                        className="flex-1 border-corporate-200 text-corporate-700 hover:bg-corporate-50"
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-corporate-200 pt-6"></div>

                  <div>
                    <h3 className="font-medium text-corporate-800 mb-3">Included in this template:</h3>
                    <ul className="space-y-3">
                      {template.includes.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-md flex items-center justify-center mr-3 flex-shrink-0 
                            ${
                              item.type === "Excel"
                                ? "bg-green-100 text-green-700"
                                : item.type === "PowerPoint"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-corporate-800">{item.name}</div>
                            <div className="text-xs text-corporate-500">{item.type} file</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-corporate-50 p-4 rounded-lg border border-corporate-200">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-corporate-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-corporate-700">
                          Need customization help? Our finance experts can assist with implementing this template in
                          your organization.
                        </p>
                        <Link
                          href="/contact"
                          className="text-sm text-corporate-800 font-medium hover:text-corporate-600 mt-2 inline-flex items-center"
                        >
                          Contact Us
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Templates */}
            {relatedTemplates.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg text-corporate-800">Related Templates</h3>
                <div className="space-y-4">
                  {relatedTemplates.map((relatedTemplate) => (
                    <Card
                      key={relatedTemplate.id}
                      className="border border-corporate-200 shadow-subtle hover:shadow-card transition-all duration-300 overflow-hidden"
                    >
                      <div className="flex">
                        <div className="w-24 h-24 shrink-0">
                          <img
                            src={relatedTemplate.image || "/placeholder.svg"}
                            alt={relatedTemplate.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium line-clamp-1 text-corporate-800 hover:text-corporate-600 transition-colors duration-300">
                            {relatedTemplate.title}
                          </h4>
                          <p className="text-sm text-corporate-600 line-clamp-2 mt-1">{relatedTemplate.description}</p>
                          <Link
                            href={`/templates/${relatedTemplate.id}`}
                            className="text-sm text-corporate-700 hover:text-corporate-900 hover:underline mt-2 inline-flex items-center"
                          >
                            View Template
                            <ChevronRight className="ml-1 h-3 w-3" />
                          </Link>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Download Dialog */}
      <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
        <DialogContent className="bg-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-corporate-800 font-serif">Download Template</DialogTitle>
            <DialogDescription className="text-corporate-600">
              Enter your email to receive this template and stay updated on new resources.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDownload}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-corporate-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-corporate-200 focus-visible:ring-corporate-500 focus-visible:border-corporate-500"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    type="checkbox"
                    className="h-4 w-4 rounded border-corporate-300 text-corporate-600 focus:ring-corporate-500"
                    defaultChecked
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="newsletter" className="text-corporate-600">
                    Subscribe to our newsletter for finance transformation insights
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-corporate-800 hover:bg-corporate-700 text-white w-full sm:w-auto">
                Download Now
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    
    </div>
  )
}
