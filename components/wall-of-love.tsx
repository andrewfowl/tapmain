"use client"

import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { useState } from "react"
import { Play } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  videoUrl?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John L.",
    role: "CEO",
    company: "Litrivis CPA",
    content: "Andrei at Tech Accounting Pros provided excellent support on complex accounting issues and helped automate a key journal entry process for me. He’s a highly skilled technical accountant, exceptionally knowledgeable and consistently delivering reliable, high-quality work. Highly recommend.",
    videoUrl: "/testimonial-video.mp4",
  },
  {
    id: 2,
    name: "Ashley R.",
    role: "CFO",
    company: "The Ready",
    content:
      "[TAP] did an excellent job on our crypto wallet reconciliation project. He worked independently, requiring minimal oversight, and demonstrated great attention to detail. All calculations and journal entries were meticulously prepared and supported with thorough backup documentation. Upon completing the work, Andrei proactively sought feedback and followed up to ensure there were no issues with our tax filings, showcasing both his commitment to quality and his integrity. His expertise and professionalism made this a seamless experience, and I would definitely work with him again. Highly recommended!"
  },
  {
    id: 3,
    name: "Robert S.",
    role: "Advisory Board",
    company: "Acxtus Fund Advisory",
    content:
      "Throughout our working together, [TAP] was an experienced and hands on member, knowledgeable, a creative problem solver, and someone who always conducted himself with a unique blend of both humility and quiet confidence. [TAP] is someone who commands respect for his knowledge and pioneering of new financial models and approaches in general business oversight."
  },
  {
    id: 4,
    name: "Elliott D.",
    role: "Co-Founder",
    company: "Switch",
    content: "I hired [TAP] to help with FASB ASC 842. Not only was he extremely detailed but he was also a great communicator and his prices are reasonable. I highly trust Andrei and have continued working with him. He's an excellent problem solver and technical accountant."
  },
  {
    id: 5,
    name: "Lea M",
    role: "CPA",
    company: "Solopreneur",
    content: "[TAP] was a pleasure to work with. Very thorough and complete reporting for my crypto transactions. I fully intend to work with him again in the future!"
  },
  {
    id: 6,
    name: "Dan G",
    role: "Founder",
    company: "Self-employed",
    content:
      "Andrei was a pleasure to work with. Very thorough and complete reporting for my crypto transactions. I fully intend to work with him again in the future!"
  },
  {
    id: 7,
    name: "Lea M",
    role: "Founder",
    company: "Sole Practitioner",
    content:
      "I have worked with Andrei on multiple projects now, and couldn't be happier. This project involved technical accounting with regard to a complex lease, which I quickly learned Andrei has expertise in. He was highly communicative, explaining accounting concepts I was unfamiliar with and keeping me informed of the work being done. The resulting spreadsheet was clear, well-organized, and extremely helpful. I would absolutely work with Andrei again"
  },
]

function VideoTestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  if (videoError || !testimonial.videoUrl) {
    return <TestimonialCard testimonial={testimonial} />
  }

  return (
    <div
      className="bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 mb-4 overflow-hidden"
      style={{ borderRadius: "var(--radius-card)" }}
    >
      <div className="relative aspect-video bg-black/50">
        {!isPlaying ? (
          <>
            <video
              src={testimonial.videoUrl}
              className="w-full h-full object-cover"
              preload="metadata"
              onError={() => setVideoError(true)}
              playsInline
            />
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group"
              aria-label="Play video testimonial"
            >
              <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-all group-hover:scale-110">
                <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
              </div>
            </button>
          </>
        ) : (
          <video
            src={testimonial.videoUrl}
            className="w-full h-full object-cover"
            controls
            autoPlay
            preload="auto"
            onError={() => setVideoError(true)}
            playsInline
          />
        )}
      </div>

      <div className="p-6">
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
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div
      className="bg-white/5 border border-white/10 p-6 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 mb-4"
      style={{ borderRadius: "var(--radius-card)" }}
    >
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
  const duplicated = [...testimonials, ...testimonials]

  return (
    <div className="h-[600px] overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <div
        className={`flex flex-col ${reverse ? "animate-scroll-down" : "animate-scroll-up"}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicated.map((testimonial, index) =>
          testimonial.videoUrl ? (
            <VideoTestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
          ) : (
            <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
          ),
        )}
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
