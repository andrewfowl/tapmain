import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import TemplatesSection from "@/components/templates-section"
import ContactForm from "@/components/contact-form"
import LatestUpdatesSection from "@/components/latest-updates-section"
import CombinedResourcesSection from "@/components/combined-resources-section"
import { SolutionsSkeleton } from "@/components/solutions-skeleton"
import InteractiveAssessmentButton from "@/components/interactive-assessment-button"
import { getPublishedInsights } from "@/actions/insights-actions"
import { getPublishedTemplates } from "@/actions/templates-actions"
import { getPublishedSolutions } from "@/actions/solutions-actions"
import { getLatestUpdates } from "@/actions/updates-actions"
import { getPublishedPolicies } from "@/actions/policies-actions"
import { getPublishedNews } from "@/actions/news-actions"
import { Suspense } from "react"
import Image from "next/image"
import SolutionsGrid from "@/components/solutions-grid"
import { ChevronRight, Check, Download, BookOpen, Crosshair, FileText } from "@geist-ui/icons"
import { CaseStudyCard } from "@/components/case-study-card"

async function FeaturedSolutionsContent() {
  const allSolutions = await getPublishedSolutions()

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-serif text-corporate-900 mb-3">Our Solutions</h2>
        <div className="w-16 h-0.5 bg-corporate-900 mx-auto"></div>
      </div>

      <div className="w-full">
        <SolutionsGrid solutions={allSolutions} />
      </div>

      {/* Test Your Knowledge and Technical Accounting Inquiry cards below */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* B. Test Your Knowledge */}
        <Card className="border border-corporate-200">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Crosshair />
              <h3 className="text-xl font-medium text-corporate-900 ml-3">Test Your Knowledge</h3>
            </div>
            <p className="text-corporate-600 mb-4">
              Challenge yourself with our interactive assessments and see how you rank on the leaderboard.
            </p>
            <div className="bg-corporate-50 rounded-lg p-6 mb-4 text-center">
              <div className="text-corporate-600 mb-2">Ready to test your knowledge?</div>
              <div className="text-sm text-corporate-500">Take the assessment to see your score and ranking</div>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Take Assessment
            </Button>
          </CardContent>
        </Card>

        {/* C. Technical Accounting Inquiry Service */}
        <Card className="border border-corporate-200">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <BookOpen />
              <h3 className="text-xl font-medium text-corporate-900 ml-3">Technical Accounting Inquiry</h3>
            </div>
            <p className="text-corporate-600 mb-4">
              Get expert answers to your technical accounting questions. Public and private consultation options
              available.
            </p>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-corporate-600">Recent Public Responses:</div>
              <div className="text-xs text-corporate-500">• ASC 606 Revenue Recognition</div>
              <div className="text-xs text-corporate-500">• Lease Accounting Updates</div>
              <div className="text-xs text-corporate-500">• Stock Compensation</div>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Ask a Question
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

async function TemplatesContent() {
  const featuredTemplates = await getPublishedTemplates(4)
  return <TemplatesSection templates={featuredTemplates} />
}

async function UpdatesContent() {
  const latestUpdates = await getLatestUpdates(3)
  return <LatestUpdatesSection updates={latestUpdates} />
}

async function PoliciesSection() {
  const policies = await getPublishedPolicies()

  return (
    <section className="py-20 md:py-28 bg-corporate-50" id="policies">
      <div className="corporate-container">
        <div className="corporate-section-title">
          <Badge className="bg-corporate-100 text-corporate-800 hover:bg-corporate-200 mb-4">Accounting Policies</Badge>
          <h2>Policy Templates & Frameworks</h2>
          <p>Access our comprehensive library of accounting policy templates designed for modern finance teams.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {policies.slice(0, 4).map((policy, index) => (
            <Card
              key={policy.id}
              className="border border-corporate-200 hover:shadow-card transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-corporate-100 p-3 rounded-lg text-corporate-700 group-hover:bg-corporate-200 transition-colors">
                    <FileText />
                  </div>
                </div>
                <Badge className="mb-3 bg-corporate-50 text-corporate-600 text-xs">{policy.category}</Badge>
                <h3 className="text-lg font-medium text-corporate-900 mb-2">{policy.title}</h3>
                <p className="text-corporate-600 text-sm mb-4">{policy.description}</p>
                <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                  <Link href={`/policies/download/${policy.id}`}>
                    Download Policy
                    <Download />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {policies.length > 4 && (
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="bg-transparent">
              <Link href="/policies">
                View All Policies
                <ChevronRight />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

async function NewsSection() {
  const newsResponse = await getPublishedNews(3)
  const news = newsResponse.success ? newsResponse.data || [] : []

  return (
    <section className="py-20 md:py-28 bg-background" id="news">
      <div className="corporate-container">
        <div className="text-center mb-16">
          <Badge className="bg-corporate-100 text-corporate-800 hover:bg-corporate-200 mb-4">Latest News</Badge>
          <h2 className="text-2xl md:text-3xl font-serif text-corporate-900 mb-4">Latest News and Industry Updates</h2>
          <p className="text-corporate-600 max-w-2xl mx-auto">
            Stay informed with the latest news and industry updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {news.map((item) => (
            <Card
              key={item.id}
              className="border-2 border-black hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <Badge className="bg-corporate-50 text-corporate-600 text-xs w-fit mb-3">{item.category}</Badge>
                <h3 className="text-lg font-medium text-corporate-900 mb-3 flex-grow">{item.title}</h3>
                <p className="text-corporate-600 text-sm mb-4 line-clamp-3">{item.summary}</p>
                <div className="text-xs text-corporate-500 mb-4">{new Date(item.created_at).toLocaleDateString()}</div>

                 {item.external_url ? (
                  <Button asChild size="sm" className="w-full bg-black text-white hover:bg-gray-800 mt-auto">
                    <a href={item.external_url} target="_blank" rel="noopener noreferrer">
                      Read More
                      <ChevronRight />
                    </a>
                  </Button>
                ) : (
                  <Button asChild size="sm" className="w-full bg-black text-white hover:bg-gray-800 mt-auto">
                    <Link href={`/news/${item.slug}`}>
                      Read More
                      <ChevronRight />
                       </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {news.length > 3 && (
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="bg-transparent">
              <Link href="/news">
                View All News
                <ChevronRight />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

async function CombinedResourcesContent() {
  const [templates, policies, insights] = await Promise.all([
    getPublishedTemplates(8),
    getPublishedPolicies(8),
    getPublishedInsights(8),
  ])

   return <CombinedResourcesSection templates={templates} policies={policies} insights={[]} />
}

export default async function Home() {
  let initialInsights: any[] = []
  let allInsights: any[] = []

  try {
    initialInsights = await getPublishedInsights(3)
    allInsights = await getPublishedInsights(12)
  } catch (error) {
    console.error("[v0] Error loading insights:", error)
    // Continue with empty arrays
  }

  let allTemplates: any[] = []
  let templateCount = 0

  try {
    allTemplates = await getPublishedTemplates(1000)
    templateCount = allTemplates.length
  } catch (error) {
    console.error("[v0] Error loading templates:", error)
    templateCount = 0
  }

  const stats = [
    { value: "$282B", label: "Total Assets Under Service" },
    { value: "3 years", label: "Helping Startups" },
    { value: "100+", label: "Financial Statements Prepared" },
    { value: "100+", label: "Thought Leadership Publications" },
    { value: `${templateCount}+`, label: "Templates & Frameworks Published" },
  ]

  const faqs = [
    {
      question: "We already have an accounting team.",
      answer:
        "Perfect! We work alongside your existing team to provide specialized digital assets expertise they may not have. Think of us as your technical accounting specialists who complement your current capabilities.",
    },
    {
      question: "This seems too expensive.",
      answer:
        "Consider the cost of addressing audit findings, or investor concerns about your financial reporting. Our expertise typically saves clients 10x our fees by preventing costly mistakes and ensuring compliance from day one.",
    },
    {
      question: "We're not ready for this level of complexity.",
      answer:
        "That's exactly why you need us now. We help you build the right foundation from the start, making future growth and compliance seamless. It's much easier to do it right initially than to fix problems later.",
    },
    {
      question: "We can figure this out internally.",
      answer:
        "Digital assets accounting is highly specialized with constantly evolving regulations. Our team has 10+ years of experience and stays current with all changes. Why reinvent the wheel when you can leverage proven expertise?",
    },
    {
      question: "We need to think about it.",
      answer:
        "This is an important decision. While you're considering, download our free Guides to see the depth of expertise we bring. We're here when you're ready to move forward.",
    },
    {
      question: "We're too small for this service.",
      answer:
        "Size doesn't matter when it comes to compliance. Whether you're a startup or Fortune 500, SEC regulations apply equally. We scale our services to fit your needs and budget, ensuring you get exactly what you need.",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col px-4 sm:px-6 lg:px-40">
      {/* 1. Hero Section - Updated with new benefit-oriented copy */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 bg-background">
        <div className="corporate-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-accent1-100 text-accent1-700 hover:bg-accent1-200 px-4 py-2 text-sm mb-6">
              Helping Web3 Finance Teams Get It Right
            </Badge>

            <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-serif text-corporate-900 leading-tight mb-6">
              Comprehensive Accounting Support
            </h1>

            <p className="text-lg md:text-xl text-corporate-700 max-w-3xl mx-auto leading-relaxed mb-4">
              Everything you need to support your business growth in operations, financial reporting and analytics.
            </p>

            <p className="text-base text-corporate-600 max-w-2xl mx-auto mb-12">
              You are building the future of finance and we help you on the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button asChild size="lg" className="bg-corporate-800 hover:bg-corporate-700 text-white">
                <a
                  href="https://cal.com/andrew-belonogov/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  Book a Free Consultation
                  <ChevronRight />
                </a>
              </Button>

              <InteractiveAssessmentButton />
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-serif text-corporate-900 mb-3">Why Choose Us</h2>
                <p className="text-corporate-600 max-w-2xl mx-auto mb-6">
                  Comprehensive support designed to help your business thrive in the digital economy.
                </p>
                <div className="w-16 h-0.5 bg-corporate-900 mx-auto"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Save Time */}
                 <div className="p-8 border-2 border-black bg-white">
                  <div className="text-4xl font-serif text-corporate-900 mb-3">01</div>
                  <h4 className="text-lg font-medium text-corporate-900 mb-3">Save Time</h4>
                  <p className="text-sm text-corporate-700 leading-relaxed">
                    Reduce the time burden on founders and finance teams. Avoid audit delays, rework, and unplanned
                    fees.
                  </p>
                </div>

                {/* Save Money */}
                <div className="p-8 border-2 border-black bg-white">
                  <div className="text-4xl font-serif text-corporate-900 mb-3">02</div>
                  <h4 className="text-lg font-medium text-corporate-900 mb-3">Save Money</h4>
                  <p className="text-sm text-corporate-700 leading-relaxed">
                    Use resources efficiently by reducing, deferring or avoiding high costs from Big-4 firms and
                    expensive enterprise software.
                  </p>
                </div>

                {/* Ensure Compliance */}
                <div className="p-8 border-2 border-black bg-white">
                  <div className="text-4xl font-serif text-corporate-900 mb-3">03</div>
                  <h4 className="text-lg font-medium text-corporate-900 mb-3">Ensure Compliance</h4>
                  <p className="text-sm text-corporate-700 leading-relaxed">
                    Accurate accounting processes and documentation that clearly demonstrates compliance with relevant
                    standards.
                  </p>
                </div>

                {/* Safeguard Your Wealth */}
                <div className="p-8 border-2 border-black bg-white">
                  <div className="text-4xl font-serif text-corporate-900 mb-3">04</div>
                  <h4 className="text-lg font-medium text-corporate-900 mb-3">Safeguard Your Wealth</h4>
                  <p className="text-sm text-corporate-700 leading-relaxed">
                    Reduce the risk of fraud with proper controls and oversight.
                  </p>
                </div>

                {/* Follow Best Practices */}
                <div className="p-8 border-2 border-black bg-white">
                  <div className="text-4xl font-serif text-corporate-900 mb-3">05</div>
                  <h4 className="text-lg font-medium text-corporate-900 mb-3">Follow Best Practices</h4>
                  <p className="text-sm text-corporate-700 leading-relaxed">
                    Avoid common pitfalls and implement industry best practices customized for your startup needs.
                  </p>
                </div>

                {/* Make Informed Decisions */}
                <div className="p-8 border-2 border-black bg-white">
                  <div className="text-4xl font-serif text-corporate-900 mb-3">06</div>
                  <h4 className="text-lg font-medium text-corporate-900 mb-3">Make Informed Decisions</h4>
                  <p className="text-sm text-corporate-700 leading-relaxed">
                    Create financial statements compliant with US GAAP and relevant for your business decisions.
                  </p>
                </div>

                {/* Access Insights */}
                <div className="p-8 border-2 border-black bg-white">
                  <div className="text-4xl font-serif text-corporate-900 mb-3">07</div>
                  <h4 className="text-lg font-medium text-corporate-900 mb-3">Access Insights</h4>
                  <p className="text-sm text-corporate-700 leading-relaxed">
                    Robust support proven helpful when dealing with auditors and providing explanations to FP&A teams.
                  </p>
                </div>

                {/* Stay Ahead */}
                <div className="p-8 border-2 border-black bg-white">
                  <div className="text-4xl font-serif text-corporate-900 mb-3">08</div>
                  <h4 className="text-lg font-medium text-corporate-900 mb-3">Stay Ahead</h4>
                  <p className="text-sm text-corporate-700 leading-relaxed">
                    Prepare defensible schedules and documentation that passes audits and generates investor trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5. Values Section - Updated to show only titles, no text content */}

      {/* 2.6. Features Section - Added new Features section */}

      {/* 3. Client Logos Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="corporate-container">
          <div className="text-center">

            <p className="text-corporate-500 text-sm font-medium mb-8 tracking-wide uppercase">
              Trusted by Leading Organizations
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
              <div className="h-8 md:h-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="/images/logos/figment-logo.svg" alt="Figment" className="h-full w-auto" />
              </div>
              <div className="h-8 md:h-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="/images/logos/akash-logo.svg" alt="Akash Network" className="h-full w-auto" />
              </div>
              <div className="h-8 md:h-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="/images/logos/overclock-logo.svg" alt="Overclock" className="h-full w-auto" />
              </div>
              <div className="h-8 md:h-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="/images/logos/aragon-logo.svg" alt="Aragon" className="h-full w-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* 3.5. Stats Section */}
      <section className="py-16 md:py-20 bg-card">
        <div className="corporate-container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif text-corporate-900 mb-4">Our Impact</h2>
            <p className="text-corporate-600 max-w-2xl mx-auto">
              Proven results from years of helping organizations transform their finance operations.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
             {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white p-6 border border-corporate-100 min-w-[140px]">
                <div className="text-2xl md:text-3xl font-serif text-corporate-800 font-medium mb-2">{stat.value}</div>
                <div className="text-corporate-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Solutions */}
      <section className="py-20 md:py-28 bg-background">
        <div className="corporate-container">
          <Suspense fallback={<SolutionsSkeleton />}>
            <FeaturedSolutionsContent />
          </Suspense>
        </div>
      </section>

         {/* 4.3. Test Your Knowledge Section */}
      <section className="py-20 md:py-28 bg-card">
        <div className="corporate-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-corporate-900 mb-4">Test Your Knowledge</h2>
            <p className="text-lg text-corporate-600 max-w-3xl mx-auto">
              Challenge yourself with our comprehensive testing platform. Prove your expertise and climb the
              leaderboards.
            </p>
          </div>

          {/* Features Grid */}

          {/* Test Card and Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Test Card */}
            <Card className="border-2 border-black">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif text-corporate-900 mb-4">Blockchain Aptitude Test</h3>
                <p className="text-corporate-600 mb-6">
                  Test your knowledge of blockchain technology, cryptocurrencies, and distributed systems
                </p>

                <div className="flex gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-corporate-800">25</div>
                    <div className="text-sm text-corporate-600">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-corporate-800">102</div>
                    <div className="text-sm text-corporate-600">Taken</div>
                  </div>
                </div>

                <Button size="lg" className="w-full bg-black text-white hover:bg-gray-800">
                  Start Test
                  <ChevronRight />
                </Button>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <div className="bg-white border-2 border-black p-8">
              <h3 className="text-2xl font-serif text-corporate-900 mb-2">Leaderboard</h3>
              <p className="text-corporate-600 mb-6">
                See how you stack up against other participants. Rankings are based on score, then completion time.
              </p>

              <div className="mb-4">
                <h4 className="text-lg font-medium text-corporate-800 mb-4">Top Performers</h4>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: "Alex Chen", score: "100%", time: "12:34" },
                    { rank: 2, name: "Sarah Kim", score: "96%", time: "14:22" },
                    { rank: 3, name: "Mike Johnson", score: "92%", time: "15:18" },
                  ].map((performer) => (
                    <div
                      key={performer.rank}
                      className="flex items-center justify-between p-3 bg-corporate-50 border border-corporate-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-corporate-800 text-white flex items-center justify-center font-bold">
                          {performer.rank}
                        </div>
                        <span className="font-medium text-corporate-900">{performer.name}</span>
                      </div>
                      <div className="flex gap-4 text-sm text-corporate-600">
                        <span>{performer.score}</span>
                        <span>{performer.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. Pricing Plans - Added complete pricing section with improved card layouts */}
      <section className="py-20 md:py-28 bg-card">
        <div className="corporate-container">
          <div className="corporate-section-title">
            <Badge className="bg-accent1-100 text-accent1-700 hover:bg-accent1-200 mb-4">Subscription Plans</Badge>
            <h2 className="text-3xl md:text-4xl">Choose Your Support Level</h2>
            <p>Professional accounting support tailored to your business needs with flexible monthly hours.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <Card className="border border-corporate-200 flex flex-col h-full">
              <CardContent className="p-8 flex flex-col h-full justify-between">
                <div className="flex-grow">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-serif text-corporate-900 mb-2">Basic Plan</h3>
                    <div className="text-4xl font-bold text-corporate-800 mb-2">$2,500</div>
                    <div className="text-corporate-600 text-sm">per month</div>
                  </div>

                  <div className="bg-corporate-50 p-4 mb-6 text-center">
                    <div className="text-lg font-medium text-corporate-800">Up to 10 hours/month</div>
                    <div className="text-sm text-corporate-600">Perfect for small teams</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check />
                      <span className="ml-3 text-corporate-700">Technical accounting support</span>
                    </li>
                    <li className="flex items-start">
                      <Check />
                      <span className="ml-3 text-corporate-700">Monthly consultation calls</span>
                    </li>
                    <li className="flex items-start">
                      <Check />
                      <span className="ml-3 text-corporate-700">Email support</span>
                    </li>
                    <li className="flex items-start">
                      <Check />
                      <span className="ml-3 text-corporate-700">Access to template library</span>
                    </li>
                  </ul>
                </div>

                <Button asChild className="w-full bg-corporate-800 hover:bg-corporate-700 text-white mt-auto">
                  <a href="https://buy.stripe.com/cN2eWK4Fqbo24vudQT" target="_blank" rel="noopener noreferrer">
                    Get Started
                    <ChevronRight />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan - Most Popular */}
            <Card className="border-2 border-accent1-200 bg-white flex flex-col h-full relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-black text-white px-4 py-1">Most Popular</Badge>
              </div>
              <CardContent className="p-8 flex flex-col h-full justify-between">
                <div className="flex-grow">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-serif text-corporate-900 mb-2">Premium Plan</h3>
                    <div className="text-4xl font-bold text-corporate-800 mb-2">$7,000</div>
                    <div className="text-corporate-600 text-sm">per month</div>
                  </div>

                  <div className="bg-accent1-100 p-4 mb-6 text-center">
                    <div className="text-lg font-medium text-accent1-800">Up to 40 hours/month</div>
                    <div className="text-sm text-accent1-700">Ideal for growing companies</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check />
                      <span className="ml-3 text-corporate-700">Everything in Basic</span>
                    </li>
                    <li className="flex items-start">
                      <Check />
                      <span className="ml-3 text-corporate-700">Priority support</span>
                    </li>
                    <li className="flex items-start">
                      <Check />
                      <span className="ml-3 text-corporate-700">Weekly consultation calls</span>
                    </li>
                    <li className="flex items-start">
                      <Check />
                      <span className="ml-3 text-corporate-700">Custom template development</span>
                    </li>
                    <li className="flex items-start">
                      <Check />
                      <span className="ml-3 text-corporate-700">Audit preparation support</span>
                    </li>
                  </ul>
                </div>

                <Button asChild className="w-full bg-corporate-800 hover:bg-corporate-700 text-white mt-auto">
                  <a href="https://buy.stripe.com/5kA7ui8VG1NsaTS7sw" target="_blank" rel="noopener noreferrer">
                    Get Started
                    <ChevronRight />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border border-corporate-200 flex flex-col h-full">
              <CardContent className="p-8 flex flex-col h-full justify-between">
                <div className="flex-grow">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-serif text-corporate-900 mb-2">Enterprise Plan</h3>
                    <div className="text-4xl font-bold text-corporate-800 mb-2">$15,000</div>
                    <div className="text-corporate-600 text-sm">per month</div>
                  </div>

                  <div className="bg-corporate-50 p-4 mb-6 text-center">
                    <div className="text-lg font-medium text-corporate-800">Up to 120 hours/month</div>
                    <div className="text-sm text-corporate-600">For large organizations</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check />
                      <span className="ml-3 text-corporate-700">Everything in Premium</span>
                    </li>
                    <li className="flex items-start">
                      <Check />
                      <span className="ml-3 text-corporate-700">Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <Check />
                      <span className="ml-3 text-corporate-700">24/7 priority support</span>
                    </li>
                    <li className="flex items-start">
                      <Check />
                      <span className="ml-3 text-corporate-700">On-site consultations</span>
                    </li>
                    <li className="flex items-start">
                      <Check />
                      <span className="ml-3 text-corporate-700">Custom training programs</span>
                    </li>
                  </ul>
                </div>

                <Button asChild className="w-full bg-corporate-800 hover:bg-corporate-700 text-white mt-auto">
                  <a href="https://buy.stripe.com/fZe6qe7RC8bQgec28a" target="_blank" rel="noopener noreferrer">
                    Get Started
                    <ChevronRight />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-corporate-600 mb-4">
              Need a custom solution? We can create a plan tailored to your specific requirements.
            </p>
            <Button asChild variant="outline" className="bg-transparent">
              <Link href="/contact">
                Contact Us for Custom Pricing
                <ChevronRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Combined Resources Section (Templates, Policies, Insights) */}
      <div>
        <Suspense
          fallback={
            <div className="py-20 animate-pulse bg-corporate-50">
              <div className="corporate-container">
                <div className="h-8 bg-corporate-200 rounded w-1/3 mx-auto mb-16"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-64 bg-corporate-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <CombinedResourcesContent />
        </Suspense>
      </div>

      {/* 6. News Section */}
      <Suspense
        fallback={
          <div className="py-20 animate-pulse bg-white">
            <div className="corporate-container">
              <div className="h-8 bg-corporate-200 rounded w-1/3 mx-auto mb-16"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 bg-corporate-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <NewsSection />
      </Suspense>

      {/* 6.5. Technical Accounting Inquiry Section */}
      <section className="py-20 md:py-28 bg-card">
        <div className="corporate-container">
          <div className="text-center mb-16">
            <Badge className="bg-corporate-100 text-corporate-800 hover:bg-corporate-200 mb-4">Expert Support</Badge>
            <h2 className="text-2xl md:text-3xl font-serif text-corporate-900 mb-4">Technical Accounting Inquiry</h2>
            <p className="text-corporate-600 max-w-2xl mx-auto">
              Get expert answers to your technical accounting questions. Public and private consultation options
              available.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-12">
            {/* Left Column - Inquiry Types */}
            <div>
              <h3 className="text-xl font-serif text-corporate-900 mb-6">Popular Inquiry Topics</h3>
              <div className="space-y-4">
                {[
                  {
                    category: "Revenue Recognition",
                    description: "ASC 606 implementation and complex arrangements",
                    count: "24 inquiries",
                  },
                  {
                    category: "Lease Accounting",
                    description: "ASC 842 compliance and lease modifications",
                    count: "18 inquiries",
                  },
                  {
                    category: "Stock Compensation",
                    description: "ASC 718 valuation and disclosure requirements",
                    count: "15 inquiries",
                  },
                  {
                    category: "Digital Assets",
                    description: "Cryptocurrency and token accounting treatment",
                    count: "32 inquiries",
                  },
                ].map((topic, index) => (
                  <Card key={index} className="border-2 border-black hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-medium text-corporate-900">{topic.category}</h4>
                        <Badge className="bg-corporate-100 text-corporate-800 text-xs">{topic.count}</Badge>
                      </div>
                      <p className="text-sm text-corporate-600">{topic.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Column - Recent Responses */}
            <div>
              <h3 className="text-xl font-serif text-corporate-900 mb-6">Recent Public Responses</h3>
              <div className="bg-white border-2 border-black p-8 mb-6">
                <div className="space-y-6">
                  {[
                    {
                      question: "How to account for staking rewards?",
                      answer: "Staking rewards should be recognized as income when earned...",
                      date: "2 days ago",
                    },
                    {
                      question: "Revenue recognition for SaaS contracts",
                      answer: "Under ASC 606, SaaS revenue should be recognized over time...",
                      date: "5 days ago",
                    },
                    {
                      question: "Lease modification accounting",
                      answer: "Lease modifications require reassessment of the lease term...",
                      date: "1 week ago",
                    },
                  ].map((response, index) => (
                    <div key={index} className="pb-6 border-b border-corporate-200 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-medium text-corporate-900">{response.question}</h4>
                        <span className="text-xs text-corporate-500 whitespace-nowrap ml-4">{response.date}</span>
                      </div>
                      <p className="text-sm text-corporate-600 line-clamp-2">{response.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-corporate-50 border-2 border-corporate-200 p-6">
                <h4 className="text-lg font-medium text-corporate-900 mb-3">Private Consultation</h4>
                <p className="text-sm text-corporate-600 mb-4">
                  Need confidential advice? Schedule a private consultation with our experts.
                </p>
                <div className="flex gap-3">
                  <Badge className="bg-corporate-100 text-corporate-800 text-xs">1-on-1 Support</Badge>
                  <Badge className="bg-corporate-100 text-corporate-800 text-xs">Confidential</Badge>
                  <Badge className="bg-corporate-100 text-corporate-800 text-xs">Priority Response</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800 flex-1">
              Ask a Public Question
              <ChevronRight />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent flex-1">
              Schedule Private Consultation
              <ChevronRight />
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Events Section with Luma calendar embed */}
      <div className="hidden">
        <section className="py-20 md:py-28 bg-card" id="events">
          <div className="corporate-container">
            <div className="corporate-section-title">
              <Badge className="bg-corporate-100 text-corporate-800 hover:bg-corporate-200 mb-4">Upcoming Events</Badge>
              <h2>Join Our Community Events</h2>
              <p>Connect with fellow accounting professionals and stay updated on the latest industry developments.</p>
            </div>

            <div className="mt-16 flex justify-center">
              <div className="w-full max-w-4xl">
                <div className="bg-white border border-corporate-200 overflow-hidden">
                  <iframe
                    src="https://luma.com/embed/calendar/cal-KIKuozg5D3213R3/events?lt=light"
                    width="100%"
                    height="450"
                    frameBorder="0"
                    style={{ border: "none" }}
                    allowFullScreen
                    aria-hidden="false"
                    tabIndex={0}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 8. Our Process */}
      <section className="py-20 md:py-28 bg-background">
        <div className="corporate-container">
          <div className="corporate-section-title">
            <Badge className="bg-corporate-100 text-corporate-800 hover:bg-corporate-200 mb-4">Our Process</Badge>
            <h2>How We Help You Transform</h2>
            <p>
              We share our proven methodology and can help implement it for your organization through our consulting
              services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
            {[
              {
                step: "Assess",
                icon: <Crosshair />,
                description: "Evaluate current state and identify opportunities",
              },
              {
                step: "Customize",
                icon: <Check />,
                description: "Tailor solutions to your specific needs",
              },
              {
                step: "Implement",
                icon: <Check />,
                description: "Deploy frameworks with expert guidance",
              },
              {
                step: "Educate",
                icon: <BookOpen />,
                description: "Train your team for sustainable success",
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-white w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-corporate-200 text-corporate-700">
                  {item.icon}
                </div>
                <h3 className="text-xl font-medium text-corporate-800 mb-3">{item.step}</h3>
                <p className="text-corporate-600">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-full w-full">
                    <ChevronRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Social Proof */}
      <section className="py-20 md:py-28 bg-corporate-50">
        <div className="corporate-container">
          <div className="corporate-section-title">
            <Badge className="bg-corporate-100 text-corporate-800 hover:bg-corporate-200 mb-4">Client Success</Badge>
            <h2>Trusted by Accounting Professionals</h2>
            <p>See how our platform has helped organizations transform their accounting practices.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                name: "Alex Brown",
                role: "CFO",
                quote:
                  "This platform provided us with the frameworks we needed to modernize our accounting function. We've reduced our month-end close by 40%.",
                image: "/images/testimonials/alex-brown.jpg",
              },
              {
                name: "Jane Davis",
                role: "Finance Director",
                quote:
                  "The templates and frameworks have been invaluable in our finance transformation journey. The ROI has been exceptional.",
                image: "/images/testimonials/jane-davis.jpg",
              },
              {
                name: "Michael Patel",
                role: "VP Finance",
                quote:
                  "What impressed me most was how quickly we were able to implement the solutions and see tangible results.",
                image: "/images/testimonials/michael-patel.jpg",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border border-corporate-200">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 fill-current text-yellow-400" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.81l1.518-4.674a1 1 0 00-.363-1.118l-3.976-4.674z"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-corporate-700 italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-corporate-100">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-corporate-800">{testimonial.name}</h4>
                      <p className="text-sm text-corporate-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Case Studies */}
      <section className="py-20 md:py-28 bg-card">
        <div className="corporate-container">
          <div className="text-center mb-16">
            <Badge className="bg-corporate-100 text-corporate-800 hover:bg-corporate-200 mb-4">Case Studies</Badge>
            <h2 className="text-2xl md:text-3xl font-serif text-corporate-900 mb-4">See How We've Helped Clients</h2>
            <p className="text-corporate-600 max-w-2xl mx-auto">
              Real results from our client engagements in the digital assets space.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {[
              {
                result: "Successful audit by Top CPA firm",
                title: "Helping Crypto Token Issuer with Audit Readiness",
                description:
                  "A software development company that issued a utility token ranked among the top 200 by market capitalization required audited financial statements for equity investors.",
                highlights: [
                  "Cleaned up multiple years of books",
                  "Accounted for 10,000+ blockchain transactions",
                  "Addressed complex arrangements requiring proper accounting treatment",
                  "Enabled acceptance by prestigious public accounting firm",
                ],
                pdfUrl: "https://github.com/andrewfowl/tap-resources/raw/main/pdfs/case-02.pdf",
                date: "August 2025",
                image: "/images/case-study-02.jpg",
              },
              {
                result: "IPO-ready financial reporting",
                title: "Network Validator on a Journey to Audit Readiness",
                description:
                  "Proof-of-stake validator preparing for a potential initial public offering in the United States needed comprehensive accounting policy development and financial reporting function establishment.",
                highlights: [
                  "Developed accounting policies for IPO readiness",
                  "Established comprehensive financial reporting function",
                  "Performed technical accounting analyses for complex arrangements",
                  "Successfully passed audit by Top-100 US CPA firm",
                ],
                pdfUrl: "https://github.com/andrewfowl/tap-resources/raw/main/pdfs/case-01.pdf",
                date: "May 2022",
                image: "/images/case-study-01.jpg",
              },
            ].map((caseStudy, index) => (
                <CaseStudyCard key={index} {...caseStudy} />
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="py-20 md:py-28 bg-corporate-50">
        <div className="corporate-container">
          <div className="max-w-3xl mx-auto">
            <div className="corporate-section-title">
              <h2>Frequently Asked Questions</h2>
              <p>Find answers to common questions about our platform and services.</p>
            </div>

            <Accordion type="single" collapsible className="w-full mt-16">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-corporate-800">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-corporate-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center">
              <p className="text-corporate-600 mb-4">Don't see your question here?</p>
              <Button asChild className="bg-corporate-800 hover:bg-corporate-700 text-white">
                <Link href="#Contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Contact Section */}
      <section className="py-20 md:py-28 bg-white text-corporate-900" id="Contact">
        <div className="corporate-container">
          <div className="corporate-section-title text-center mb-16">
            <h2 className="text-corporate-900">Let's Start Your Finance Transformation Journey</h2>
            <p className="text-corporate-600">
              Our team of finance experts is ready to help you transform your finance function.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  )
}
