import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ContactForm from "@/components/contact-form"
import InteractiveAssessmentButton from "@/components/interactive-assessment-button"
import { getPublishedTemplates } from "@/actions/templates-actions"
import { getPublishedSolutions } from "@/actions/solutions-actions"
import { getPublishedNews } from "@/actions/news-actions"
import { getPublishedPolicies } from "@/actions/policies-actions"
import CombinedResourcesSection from "@/components/combined-resources-section"
import { Suspense } from "react"
import SolutionsGrid from "@/components/solutions-grid"
import { ChevronRight, Check } from "@geist-ui/icons"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { SlackChatAnimation } from "@/components/slack-chat-animation"
import { ServicesSection } from "@/components/services-section"
import { WallOfLove } from "@/components/wall-of-love"
import { MeshGradientMascot } from "@/components/mesh-gradient-mascot"

async function FeaturedSolutionsContent() {
  const allSolutions = await getPublishedSolutions()
  return <SolutionsGrid solutions={allSolutions} />
}

async function NewsSection() {
  const newsResponse = await getPublishedNews(3)
  const news = newsResponse.success ? newsResponse.data || [] : []

  return (
    <section className="py-24 bg-black" id="news">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll animation="fade-in-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Industry Insights</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Expert analysis on digital assets accounting, regulatory updates, and emerging best practices.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <AnimateOnScroll key={item.id} animation="fade-in-up" delay={index * 100}>
              <Card className="bg-card border border-white/10 hover:border-white/30 transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <span className="text-xs text-white/40 mb-2">{item.category}</span>
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm mb-4 flex-grow line-clamp-3">{item.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">{new Date(item.created_at).toLocaleDateString()}</span>
                    {item.external_url ? (
                      <a
                        href={item.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/70 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        Read More <ChevronRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <Link
                        href={`/news/${item.slug}`}
                        className="text-sm text-white/70 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        Read More <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

async function ResourcesSection() {
  let templates: any[] = []
  let policies: any[] = []

  try {
    templates = await getPublishedTemplates(100)
  } catch (error) {
    console.error("[v0] Error loading templates for resources:", error)
  }

  try {
    policies = await getPublishedPolicies()
  } catch (error) {
    console.error("[v0] Error loading policies for resources:", error)
  }

  return <CombinedResourcesSection templates={templates} policies={policies} />
}

export default async function Home() {
  const allTemplates = await getPublishedTemplates()
  const allPolicies = await getPublishedPolicies()
  const templateCount = allTemplates?.length || 0

  const stats = [
    { value: "$282B", label: "Client Assets Under Advisement" },
    { value: "3+", label: "Years of Specialized Experience" },
    { value: "25+", label: "Financial Statements Delivered" },
    { value: `${templateCount}+`, label: "Ready-to-Use Templates" },
  ]

  const faqs = [
    {
      question: "We already have an accounting team.",
      answer:
        "Great! We complement your team with specialized digital assets expertise. Your accountants handle day-to-day operations while we tackle the complex technical accounting challenges that require deep blockchain knowledge. Most of our clients see us as an extension of their existing team.",
    },
    {
      question: "This seems expensive for our stage.",
      answer:
        "Consider the alternative: one audit finding or investor concern about your financial reporting can cost 10x our annual fees. We've helped clients avoid six-figure restatements and maintain investor confidence. Our tiered plans ensure you only pay for what you need.",
    },
    {
      question: "We're not ready for this level of complexity.",
      answer:
        "That's precisely when you need us most. Building the right foundation now prevents painful (and expensive) corrections later. We've seen companies spend 3x more fixing problems than they would have spent preventing them.",
    },
    {
      question: "We can figure this out internally.",
      answer:
        "Digital assets accounting evolves weekly—new tokens, new regulations, new FASB guidance. Our team lives and breathes this space daily. We bring insights from working with dozens of similar companies that internal teams simply can't replicate.",
    },
    {
      question: "We need to think about it.",
      answer:
        "Of course. While you're evaluating, download our free guides to see our approach firsthand. Many clients tell us those resources alone saved them significant time and helped them make a more informed decision.",
    },
    {
      question: "We're too small for this service.",
      answer:
        "We work with companies from seed stage to Series C and beyond. In fact, starting early often saves the most money—you build correctly from day one rather than retrofitting later. Our Basic Plan is designed specifically for earlier-stage teams.",
    },
  ]

  const whyChooseUs = [
    {
      title: "Audit-Ready from Day One",
      description:
        "Sleep soundly knowing your books will withstand any audit. We build documentation and processes that satisfy even the most rigorous Big 4 scrutiny.",
    },
    {
      title: "Predictable Monthly Investment",
      description:
        "No surprise invoices. Our flat-rate plans let you budget with confidence and scale services as your needs evolve.",
    },
    {
      title: "Flex with Your Business",
      description:
        "Launching a new token? Preparing for a raise? Our engagement adapts to your priorities—ramp up or down as needed.",
    },
    {
      title: "Direct Partner Access",
      description:
        "Skip the junior staff. Every client gets direct access to our senior leadership for strategic decisions and complex questions.",
    },
  ]

  const howItWorks = [
    {
      step: "01",
      title: "Choose your plan",
      description:
        "Select the tier that matches your current needs. Upgrade or downgrade anytime as your business evolves.",
    },
    {
      step: "02",
      title: "Submit your request",
      description: "Tell us what you need and when. Our team triages within 24 hours and assigns the right expertise.",
    },
    {
      step: "03",
      title: "Receive your deliverable",
      description:
        "We work transparently, keeping you updated until you have exactly what you need—on time, every time.",
    },
  ]

  return (
    <main className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Hero Content */}
            <div className="space-y-8">
              <AnimateOnScroll animation="fade-in-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Technical accounting for digital assets companies
                </h1>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-in-up" delay={100}>
                <p className="text-lg text-white/60 max-w-lg">
                  Big 4 expertise without the Big 4 price tag. We help crypto and blockchain companies navigate complex
                  accounting challenges—from token compensation to audit readiness.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-in-up" delay={200}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-base font-medium transition-all hover:scale-105"
                  >
                    <Link href="#pricing">See plans</Link>
                  </Button>
                  <InteractiveAssessmentButton />
                </div>
              </AnimateOnScroll>

              {/* Trusted By */}
              <AnimateOnScroll animation="fade-in" delay={400}>
                <div className="pt-8">
                  <p className="text-white/40 text-sm mb-6">Trusted by leading Web3 companies</p>
                  <div className="flex flex-wrap items-center gap-8">
                    <img
                      src="/images/logos/overclock-logo.svg"
                      alt="Overclock"
                      className="h-6 opacity-50 hover:opacity-100 transition-opacity invert"
                    />
                    <img
                      src="/images/logos/figment-logo.svg"
                      alt="Figment"
                      className="h-6 opacity-50 hover:opacity-100 transition-opacity invert"
                    />
                    <img
                      src="/images/logos/akash-logo.svg"
                      alt="Akash"
                      className="h-6 opacity-50 hover:opacity-100 transition-opacity invert"
                    />
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Right Column - Bento Grid Preview */}
            <AnimateOnScroll animation="slide-in-right" delay={300}>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {/* Template Preview Cards */}
                  <div className="bg-white rounded-xl p-4 transform rotate-2 hover:rotate-0 transition-transform">
                    <div className="text-xs font-mono text-gray-500 mb-2">TOKEN COMPENSATION</div>
                    <div className="space-y-1">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                      <div className="text-right font-mono text-gray-600">2,344,497</div>
                      <div className="text-right font-mono text-gray-600">1,780,849</div>
                      <div className="text-right font-mono text-gray-600">23,043</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 transform -rotate-1 hover:rotate-0 transition-transform mt-8">
                    <div className="text-xs font-mono text-gray-500 mb-2">ROLL-FORWARD</div>
                    <div className="space-y-1">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                    </div>
                    <div className="mt-4 space-y-1 text-xs font-mono text-gray-600">
                      <div className="flex justify-between">
                        <span>Beginning</span>
                        <span>10,630,754</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accrual</span>
                        <span>(2,344,497)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment</span>
                        <span>2,925,209</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl p-6 text-white">
                    <div className="text-sm font-medium mb-2">HELPING CRYPTO TOKEN ISSUERS WITH</div>
                    <div className="text-2xl font-bold">AUDIT READINESS</div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll animation="fade-in-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why teams choose us</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                We bring specialized expertise that general accountants simply don't have.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Card 1 - Large left */}
            <AnimateOnScroll animation="fade-in-up" delay={0} className="md:col-span-7">
              <Card className="bg-card border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <CardContent className="p-8 md:p-10">
                  <div className="text-5xl font-bold text-white/10 mb-4">01</div>
                  <h3 className="text-2xl font-semibold text-white mb-4">{whyChooseUs[0].title}</h3>
                  <p className="text-white/60 leading-relaxed text-lg">{whyChooseUs[0].description}</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            {/* Card 2 - Small right */}
            <AnimateOnScroll animation="fade-in-up" delay={100} className="md:col-span-5">
              <Card className="bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-white/10 mb-4">02</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{whyChooseUs[1].title}</h3>
                  <p className="text-white/60 leading-relaxed">{whyChooseUs[1].description}</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            {/* Card 3 - Small left */}
            <AnimateOnScroll animation="fade-in-up" delay={200} className="md:col-span-5">
              <Card className="bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-white/10 mb-4">03</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{whyChooseUs[2].title}</h3>
                  <p className="text-white/60 leading-relaxed">{whyChooseUs[2].description}</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            {/* Card 4 - Large right */}
            <AnimateOnScroll animation="fade-in-up" delay={300} className="md:col-span-7">
              <Card className="bg-card border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <CardContent className="p-8 md:p-10">
                  <div className="text-5xl font-bold text-white/10 mb-4">04</div>
                  <h3 className="text-2xl font-semibold text-white mb-4">{whyChooseUs[3].title}</h3>
                  <p className="text-white/60 leading-relaxed text-lg">{whyChooseUs[3].description}</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll animation="fade-in-up">
            <div className="max-w-2xl mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How it works</h2>
              <p className="text-xl text-white/60">From signup to deliverable in three simple steps.</p>
              <p className="text-white/40 mt-2">No complex onboarding. No lengthy contracts. Just results.</p>
            </div>
          </AnimateOnScroll>

          <div className="space-y-8">
            {howItWorks.map((item, index) => (
              <AnimateOnScroll key={index} animation="slide-in-left" delay={index * 150}>
                <div className="flex items-start gap-8 group">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white/60 font-mono text-sm group-hover:border-white/40 group-hover:text-white transition-all">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-white/60">{item.description}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-black border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll animation="fade-in-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our track record</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Numbers that demonstrate our commitment to client success.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimateOnScroll key={index} animation="scale-in" delay={index * 100}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/40 text-sm">{stat.label}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-black" id="services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll animation="fade-in-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How do we help businesses?</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                From financial reporting to technical crypto accounting, we provide comprehensive support across the
                entire finance function.
              </p>
            </div>
          </AnimateOnScroll>
          <ServicesSection />
        </div>
      </section>

      {/* Slack Communication Section */}
      <SlackChatAnimation />

      {/* Pricing */}
      <section className="py-24 bg-card" id="pricing">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll animation="fade-in-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, transparent pricing</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                No hidden fees. No long-term contracts. Cancel or change plans anytime.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <AnimateOnScroll animation="fade-in-up" delay={0}>
              <Card className="bg-black border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
                    <div className="text-4xl font-bold text-white mb-1">$2,500</div>
                    <div className="text-white/40 text-sm">per month</div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 mb-8">
                    <div className="text-lg font-medium text-white">Up to 10 hours/month</div>
                    <div className="text-sm text-white/40">Ideal for seed to Series A</div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {[
                      "Technical accounting advisory",
                      "Monthly strategy call",
                      "Email support (48hr response)",
                      "Full template library access",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-white/60 mt-0.5" />
                        <span className="text-white/70">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="w-full bg-white text-black hover:bg-white/90 rounded-full">
                    <a href="https://buy.stripe.com/cN2eWK4Fqbo24vudQT" target="_blank" rel="noopener noreferrer">
                      Get Started
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            {/* Premium Plan */}
            <AnimateOnScroll animation="fade-in-up" delay={100}>
              <Card className="bg-white border-0 relative h-full">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-black text-white text-xs px-4 py-1 rounded-full">Most Popular</span>
                </div>
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-black mb-2">Growth</h3>
                    <div className="text-4xl font-bold text-black mb-1">$7,000</div>
                    <div className="text-black/40 text-sm">per month</div>
                  </div>

                  <div className="bg-black/5 rounded-lg p-4 mb-8">
                    <div className="text-lg font-medium text-black">Up to 40 hours/month</div>
                    <div className="text-sm text-black/40">Best for Series A to B</div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {[
                      "Everything in Starter",
                      "Priority support (24hr response)",
                      "Weekly strategy calls",
                      "Custom template development",
                      "Audit preparation support",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-black/60 mt-0.5" />
                        <span className="text-black/70">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="w-full bg-black text-white hover:bg-black/90 rounded-full">
                    <a href="https://buy.stripe.com/5kA7ui8VG1NsaTS7sw" target="_blank" rel="noopener noreferrer">
                      Get Started
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            {/* Enterprise Plan */}
            <AnimateOnScroll animation="fade-in-up" delay={200}>
              <Card className="bg-black border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-2">Scale</h3>
                    <div className="text-4xl font-bold text-white mb-1">$15,000</div>
                    <div className="text-white/40 text-sm">per month</div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 mb-8">
                    <div className="text-lg font-medium text-white">Up to 120 hours/month</div>
                    <div className="text-sm text-white/40">Series B+ and public companies</div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {[
                      "Everything in Growth",
                      "Dedicated account manager",
                      "Same-day priority support",
                      "On-site workshops available",
                      "Board & investor presentations",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-white/60 mt-0.5" />
                        <span className="text-white/70">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="w-full bg-white text-black hover:bg-white/90 rounded-full">
                    <a href="https://buy.stripe.com/fZe6qe7RC8bQgec28a" target="_blank" rel="noopener noreferrer">
                      Get Started
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* News Section */}
      <Suspense fallback={<div className="py-24 bg-black" />}>
        <NewsSection />
      </Suspense>

      {/* Resources Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll animation="fade-in-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Free Resources</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Battle-tested templates and policies used by leading crypto companies. Download and use immediately.
              </p>
            </div>
          </AnimateOnScroll>

          <Suspense fallback={<div>Loading...</div>}>
            <ResourcesSection />
          </Suspense>
        </div>
      </section>

      {/* Wall of Love Section */}
      <WallOfLove />

      {/* FAQ */}
      <section className="py-24 bg-card" id="FAQ">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll animation="fade-in-up">
            <div className="text-center mb-16">
              <div className="mb-8">
                <MeshGradientMascot variant="silver" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Common Objections Library</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                We've heard it all. Here's what we tell prospective clients who are on the fence.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-in-up" delay={100}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                  <AccordionTrigger className="text-left font-medium text-white hover:text-white/80 py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 pb-6">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-black" id="Contact">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
