"use client"

import { AnimateOnScroll } from "@/components/animate-on-scroll"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CFO",
    company: "BlockFi Labs",
    content:
      "TechAccountingPro transformed our financial reporting. Their expertise in crypto accounting saved us months of work before our Series B.",
  },
  {
    id: 2,
    name: "Michael Torres",
    role: "Head of Finance",
    company: "DeFi Protocol",
    content:
      "Finally, accountants who actually understand token compensation and staking rewards. Game changer for our audit prep.",
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "CEO",
    company: "Web3 Ventures",
    content: "The team's responsiveness via Slack is incredible. Complex questions answered within hours, not days.",
  },
  {
    id: 4,
    name: "David Park",
    role: "Controller",
    company: "CryptoTrade Inc",
    content: "Their templates alone saved us $50k in consulting fees. The quality rivals Big 4 deliverables.",
  },
  {
    id: 5,
    name: "Lisa Zhang",
    role: "VP Finance",
    company: "NFT Marketplace",
    content:
      "We went from messy spreadsheets to audit-ready financials in 6 weeks. Highly recommend for any crypto company.",
  },
  {
    id: 6,
    name: "James Miller",
    role: "Founder",
    company: "DAO Treasury",
    content:
      "Best decision we made was bringing in TechAccountingPro before our token launch. They caught issues we never would have found.",
  },
  {
    id: 7,
    name: "Anna Kowalski",
    role: "Finance Director",
    company: "Stablecoin Co",
    content: "Their deep knowledge of ASC 842 and crypto-specific guidance is unmatched. True experts in the space.",
  },
  {
    id: 8,
    name: "Robert Kim",
    role: "COO",
    company: "Layer2 Solutions",
    content: "From chaotic books to clean financials in record time. The weekly check-ins kept us on track throughout.",
  },
  {
    id: 9,
    name: "Nicole Adams",
    role: "Finance Lead",
    company: "MetaDAO",
    content:
      "Their understanding of DAO treasury management is exceptional. They helped us establish proper controls and reporting.",
  },
]

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div className="bg-white/5 border border-white/10 p-6 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 mb-4">
      <p className="text-white/80 text-base leading-relaxed mb-6">"{testimonial.content}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-white/80 text-sm font-medium">
          {initials}
        </div>
        <div>
          <p className="text-white font-medium text-sm">{testimonial.name}</p>
          <p className="text-white/40 text-xs">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  )
}

function splitIntoColumns(items: Testimonial[], numColumns: number): Testimonial[][] {
  const columns: Testimonial[][] = Array.from({ length: numColumns }, () => [])
  items.forEach((item, index) => {
    columns[index % numColumns].push(item)
  })
  return columns
}

function ScrollingColumn({
  testimonials,
  speed = 20,
  reverse = false,
}: {
  testimonials: Testimonial[]
  speed?: number
  reverse?: boolean
}) {
  // Duplicate for seamless loop
  const duplicated = [...testimonials, ...testimonials]

  return (
    <div className="h-[600px] overflow-hidden relative">
      {/* Fade overlays */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <div
        className={`flex flex-col ${reverse ? "animate-scroll-down" : "animate-scroll-up"}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicated.map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  )
}

export function WallOfLove() {
  const columns = splitIntoColumns(testimonials, 3)

  return (
    <section className="py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <AnimateOnScroll animation="fade-in-up">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Wall of Love</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              See what finance leaders at digital assets companies are saying about working with us.
            </p>
          </div>
        </AnimateOnScroll>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ScrollingColumn testimonials={columns[0]} speed={25} reverse={false} />
          <ScrollingColumn testimonials={columns[1]} speed={30} reverse={true} />
          <ScrollingColumn testimonials={columns[2]} speed={22} reverse={false} />
        </div>
      </div>
    </section>
  )
}
