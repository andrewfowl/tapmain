import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ContactForm from "@/components/contact-form"
import InteractiveAssessmentButton from "@/components/interactive-assessment-button"
import { getPublishedSolutions } from "@/actions/solutions-actions"
import { getPublishedNews } from "@/actions/news-actions"
import CombinedResourcesSection from "@/components/combined-resources-section"
import { Suspense } from "react"
import SolutionsGrid from "@/components/solutions-grid"
import { ChevronRight, Check } from "lucide-react"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { SlackChatAnimation } from "@/components/slack-chat-animation"
import { ServicesSection } from "@/components/services-section"
import { WallOfLove } from "@/components/wall-of-love"
import { MeshGradientMascot } from "@/components/mesh-gradient-mascot"
import { EngagementExample } from "@/components/engagement-example"
import { BOOKING_URL } from "@/lib/site"
import { getPublishedResources } from "@/actions/resources-actions"
import { AboutSection } from "@/components/about-section"
import { JsonLd } from "@/lib/structured-data"

async function FeaturedSolutionsContent() {
  const allSolutions = await getPublishedSolutions()
  return <SolutionsGrid solutions={allSolutions} />
}

async function NewsSection() {
  const newsResponse = await getPublishedNews(3)
  const news = newsResponse.success ? newsResponse.data || [] : []

  return (
    <section className="py-32 bg-black" id="news">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll animation="fade-in-up">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">News and Insights</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Company news and expert analysis on digital assets accounting, regulatory updates, and emerging best
              practices.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <AnimateOnScroll key={item.id} animation="fade-in-up" delay={index * 100}>
              <Card className="bg-card border border-white/10 hover:border-white/30 transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <span className="text-xs text-white/40 mb-2">{item.category}</span>
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm mb-4 flex-grow line-clamp-3">{item.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">{new Date(item.created_at).toLocaleDateString()}</span>
                    {item.external_url && (
                      <a
                        href={item.external_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/70 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        Read More <ChevronRight className="w-4 h-4" />
                      </a>
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
  const resources = await getPublishedResources()

  return (
    <section className="py-32 bg-card">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll animation="fade-in-up">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Free Resources</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Battle-tested templates and policies used by leading crypto companies. Download and use immediately.
            </p>
          </div>
        </AnimateOnScroll>

        <CombinedResourcesSection resources={resources} />
      </div>
    </section>
  )
}

export default function HomePage() {
  const stats = [
    { value: "100+", label: "Thought leadership publications" },
    { value: "15", label: "Years of experience" },
    { value: "35+", label: "Clients served" },
    { value: "5.0", label: "Average client rating" },
  ]

  const faqs = [
    {
      question: "We already have an accounting team.",
      answer:
        "Good. We work alongside it. Your team runs the close and the day-to-day books, and we take the transactions that need research and a written position: a token grant, a SAFE conversion, a usage-based customer contract.",
    },
    {
      question: "This seems expensive for our stage.",
      answer:
        "Compare it with the cost of getting a position wrong. An audit adjustment or a restatement costs more in fees and delay than a few months of a plan, and it tends to surface during a raise or a first audit. The Starter plan is sized for seed-stage budgets.",
    },
    {
      question: "We're not ready for this level of complexity.",
      answer:
        "Early is when an accounting position is cheapest to set. A token grant or a revenue policy documented when it's signed takes one memo. The same question reconstructed two years later, in the middle of an audit, becomes a project.",
    },
    {
      question: "We can figure this out internally.",
      answer:
        "You might. The guidance keeps moving, though. ASU 2023-08 changed how crypto assets are measured, and credit-based or usage-based AI pricing raises ASC 606 questions most teams haven't documented before. We research these questions every week, so you start from a finished memo instead of a blank page.",
    },
    {
      question: "We need to think about it.",
      answer:
        "Take the time you need. The audit readiness checklist and the template library are free, and they show how we approach the work before you commit to anything.",
    },
    {
      question: "We're too small for this service.",
      answer:
        "We work with companies from seed through Series C and later. Starting early usually costs less, because you set each policy once instead of retrofitting it before an audit. The Starter plan is built for early teams.",
    },
  ]

  const whyChooseUs = [
    {
      title: "Written for the auditor who reads it",
      description:
        "Every position comes with the memo, the supporting calculation, the journal entries, and the disclosure. Andrei trained at KPMG, so the work is prepared the way a Big 4 reviewer expects to see it.",
    },
    {
      title: "A set monthly fee",
      description:
        "Each plan has a fixed price and an hour allowance, so you know the cost before the month starts.",
    },
    {
      title: "Sized to the quarter you're in",
      description:
        "A token launch, a priced round, or a first audit can change the workload for a few months. Move up a plan for that stretch and back down when it's over.",
    },
    {
      title: "You work with the founder",
      description:
        "Andrei handles every engagement himself. The person who researches your question is the person who explains the answer to your auditor.",
    },
  ]

  const howItWorks = [
    {
      step: "01",
      title: "Choose a plan",
      description: "Pick the tier that fits this quarter's workload. You can change it at the start of any month.",
    },
    {
      step: "02",
      title: "Send the request",
      description: "Tell us what you need and when you need it. We reply within 24 hours with a scope and a delivery date.",
    },
    {
      step: "03",
      title: "Get the deliverable",
      description:
        "You receive the memo, schedule, or financial statements, and we stay on the thread until your auditor has no further questions.",
    },
  ]

  return (
    <main className="brand-headings bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-48 hidden md:block">
          {[760, 600, 440, 280].map((size) => (
            <span
              key={size}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/40"
              style={{ width: size, height: size }}
            />
          ))}
        </div>
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Column - Hero Content */}
            <div className="space-y-10">
              <AnimateOnScroll animation="fade-in-up">
                <p className="mb-6 inline-block bg-brand light:bg-brand/45 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-charcoal">
                  Helping accountants get it right
                </p>
                <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-white leading-[0.92] tracking-wide text-balance">
                  Technical accounting for digital companies
                </h1>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-in-up" delay={100}>
                <p className="text-lg text-white/60 max-w-lg">
                  Big 4 expertise without the Big 4 price tag. We help Web3 protocols and AI startups get token grants,
                  usage-based revenue, and first audits right under US GAAP.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-in-up" delay={200}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      className="bg-brand text-brand-charcoal hover:bg-brand/90 rounded-full px-8 py-6 text-base font-semibold transition-colors"
                    >
                      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                        Book a consultation
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent rounded-full px-8 py-6 text-base font-medium"
                    >
                      <Link href="#pricing">See plans</Link>
                    </Button>
                  </div>
                  <div>
                    <InteractiveAssessmentButton />
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Trusted By */}
              <AnimateOnScroll animation="fade-in" delay={400}>
                <div className="pt-10">
                  <p className="text-white/40 text-sm mb-6">Trusted by teams at</p>
                  <div className="flex flex-wrap items-center gap-10">
                    <img
                      src="/images/logos/overclock-logo.svg"
                      alt="Overclock"
                      className="h-6 opacity-50 hover:opacity-100 transition-opacity light:invert"
                    />
                    <img
                      src="/images/logos/alt5-logo.png"
                      alt="Alt5 Sigma"
                      className="h-6 w-auto opacity-50 hover:opacity-100 transition-opacity light:invert light:hue-rotate-180"
                    />
                    <img
                      src="/images/logos/figment-logo.svg"
                      alt="Figment"
                      className="h-6 opacity-50 hover:opacity-100 transition-opacity"
                    />
                    <img
                      src="/images/logos/akash-logo.svg"
                      alt="Akash"
                      className="h-6 opacity-50 hover:opacity-100 transition-opacity"
                    />
                    <img
                      src="/images/logos/aragon-logo.svg"
                      alt="Aragon"
                      className="h-6 opacity-50 hover:opacity-100 transition-opacity light:invert"
                    />
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Right Column - Engagement example */}
            <AnimateOnScroll animation="slide-in-right" delay={300}>
              <EngagementExample />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-black border-y border-white/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll animation="fade-in-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our track record</h2>
              <p className="text-white/60 max-w-2xl mx-auto">Since founding the practice in March 2022.</p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((stat, index) => (
              <AnimateOnScroll key={index} animation="scale-in" delay={index * 100}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-3">{stat.value}</div>
                  <div className="text-white/40 text-sm">{stat.label}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-black" id="services">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll animation="fade-in-up">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What does a technical accountant do for a digital company?</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                A technical accountant applies US GAAP to transactions the standard playbook doesn&apos;t cover. For Web3
                teams, that means token grants, SAFTs, staking rewards, and digital assets under ASC 350-60. For AI and
                software companies, it means usage-based and credit-based revenue under ASC 606, capitalized development
                costs, compute commitments, and SAFEs. We write the memos, prepare audit-ready financial statements, and
                work with your auditors until the numbers are signed off.
              </p>
            </div>
          </AnimateOnScroll>
          <ServicesSection />
        </div>
      </section>

      {/* About */}
      <AboutSection />

      {/* Resources Section */}
      <Suspense fallback={<div className="py-32 bg-card" />}>
        <ResourcesSection />
      </Suspense>

      {/* Why Choose Us */}
      <section className="py-32 bg-black">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll animation="fade-in-up">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why teams choose us</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                A general accountant keeps your books. We handle the transactions that need research, a written
                position, and an auditor&apos;s sign-off.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Card 1 - Large left */}
            <AnimateOnScroll animation="fade-in-up" delay={0} className="md:col-span-7">
              <Card className="bg-card border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <CardContent className="p-10 md:p-12">
                  <div className="text-5xl font-bold text-white/10 mb-6">01</div>
                  <h3 className="text-2xl font-semibold text-white mb-4">{whyChooseUs[0].title}</h3>
                  <p className="text-white/60 leading-relaxed text-lg">{whyChooseUs[0].description}</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            {/* Card 2 - Small right */}
            <AnimateOnScroll animation="fade-in-up" delay={100} className="md:col-span-5">
              <Card className="bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <CardContent className="p-10">
                  <div className="text-4xl font-bold text-white/10 mb-6">02</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{whyChooseUs[1].title}</h3>
                  <p className="text-white/60 leading-relaxed">{whyChooseUs[1].description}</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            {/* Card 3 - Small left */}
            <AnimateOnScroll animation="fade-in-up" delay={200} className="md:col-span-5">
              <Card className="bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <CardContent className="p-10">
                  <div className="text-4xl font-bold text-white/10 mb-6">03</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{whyChooseUs[2].title}</h3>
                  <p className="text-white/60 leading-relaxed">{whyChooseUs[2].description}</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            {/* Card 4 - Large right */}
            <AnimateOnScroll animation="fade-in-up" delay={300} className="md:col-span-7">
              <Card className="bg-card border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <CardContent className="p-10 md:p-12">
                  <div className="text-5xl font-bold text-white/10 mb-6">04</div>
                  <h3 className="text-2xl font-semibold text-white mb-4">{whyChooseUs[3].title}</h3>
                  <p className="text-white/60 leading-relaxed text-lg">{whyChooseUs[3].description}</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-card">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll animation="fade-in-up">
            <div className="max-w-2xl mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How it works</h2>
              <p className="text-xl text-white/60">Three steps from signup to your first deliverable.</p>
              <p className="text-white/40 mt-2">Plans run month to month.</p>
            </div>
          </AnimateOnScroll>

          <div className="space-y-10">
            {howItWorks.map((item, index) => (
              <AnimateOnScroll key={index} animation="slide-in-left" delay={index * 150}>
                <div className="flex items-start gap-10 group">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full border border-white/20 text-white/60 font-mono text-sm group-hover:border-white/40 group-hover:text-white transition-all">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-white/60">{item.description}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Slack Communication Section */}
      <SlackChatAnimation />

      {/* Pricing */}
      <section className="py-32 bg-card" id="pricing">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <AnimateOnScroll animation="fade-in-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Subscription plans</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                A fixed monthly price and a set number of hours. Change or cancel your plan at the start of any month.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Plan */}
            <AnimateOnScroll animation="fade-in-up" delay={0}>
              <Card className="bg-black border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
                    <div className="text-4xl font-bold text-white mb-1">$2,500</div>
                    <div className="text-white/40 text-sm">per month</div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-5 mb-10">
                    <div className="text-lg font-medium text-white">Up to 10 hours/month</div>
                    <div className="text-sm text-white/40">Ideal for seed to Series A</div>
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
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
                      Choose Starter
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            {/* Premium Plan */}
            <AnimateOnScroll animation="fade-in-up" delay={100}>
              <Card className="bg-white border-0 relative h-full">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-black text-white text-xs px-4 py-1 rounded-full">Most popular</span>
                </div>
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold text-black mb-2">Growth</h3>
                    <div className="text-4xl font-bold text-black mb-1">$7,000</div>
                    <div className="text-black/40 text-sm">per month</div>
                  </div>

                  <div className="bg-black/5 rounded-lg p-5 mb-10">
                    <div className="text-lg font-medium text-black">Up to 40 hours/month</div>
                    <div className="text-sm text-black/40">Best for Series A to B</div>
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
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
                      Choose Growth
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </AnimateOnScroll>

            {/* Enterprise Plan */}
            <AnimateOnScroll animation="fade-in-up" delay={200}>
              <Card className="bg-black border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold text-white mb-2">Scale</h3>
                    <div className="text-4xl font-bold text-white mb-1">$15,000</div>
                    <div className="text-white/40 text-sm">per month</div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-5 mb-10">
                    <div className="text-lg font-medium text-white">Up to 120 hours/month</div>
                    <div className="text-sm text-white/40">Series B+ and public companies</div>
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
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
                      Choose Scale
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll animation="fade-in-up" delay={300}>
            <div className="text-center mt-12 pt-12 border-t border-white/10">
              <p className="text-white/70 max-w-2xl mx-auto">
                You can also pay in cryptocurrency.{" "}
                <a href="#Contact" className="text-white hover:underline font-medium">
                  Ask through the contact form
                </a>{" "}
                and we&apos;ll send the details.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* One-Time Engagements Section */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          <AnimateOnScroll animation="fade-in-up">
            <Card className="bg-white/5 border border-white/10 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Start with a single project
                  </h3>
                  <p className="text-white/60 max-w-2xl mx-auto mb-6">
                    Fixed-scope engagements for teams that want to see the work before subscribing.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-10">
                  {[
                    "Customer contract review",
                    "Usage-based revenue memo (ASC 606)",
                    "Software capitalization memo",
                    "Lease schedule calculation",
                    "Cash flows statement preparation",
                    "Token compensation expense accrual",
                    "Stock-based compensation expense",
                    "Financial model review",
                    "Financial statements preparation",
                    "Cap table update",
                    "Workiva implementation",
                    "Technical accounting peer review",
                  ].map((service, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-white/70"
                    >
                      {service}
                    </span>
                  ))}
                  <span className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white/80 font-medium">
                    Other projects on request
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 rounded-full px-8 bg-transparent"
                  >
                    <a href="https://cal.com/andrew-belonogov/30min" target="_blank" rel="noopener noreferrer">
                      Scope a project
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Wall of Love Section */}
      <WallOfLove />

      {/* FAQ */}
      <section className="py-32 bg-card" id="FAQ">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }}
        />
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll animation="fade-in-up">
            <div className="text-center mb-20">
              <div className="mb-10">
                <MeshGradientMascot variant="silver" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Questions teams ask before signing</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                The concerns that come up most on intro calls, and how we answer them.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-in-up" delay={100}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                  <AccordionTrigger className="text-left font-medium text-white hover:text-white/80 py-8">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 pb-8">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-black" id="Contact">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
