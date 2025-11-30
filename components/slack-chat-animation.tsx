"use client"

import { useState, useEffect, useRef } from "react"

interface Message {
  id: number
  sender: "client" | "team"
  text: string
}

const messages: Message[] = [
  { id: 1, sender: "team", text: "How can we help you today?" },
  { id: 2, sender: "client", text: "Can you prepare financial statements for our Series A?" },
  { id: 3, sender: "team", text: "Absolutely. We'll have a draft ready within 48 hours." },
]

export function SlackChatAnimation() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          startAnimation()
        }
      },
      { threshold: 0.4 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const startAnimation = () => {
    setTimeout(() => {
      setVisibleMessages([1])
    }, 500)

    setTimeout(() => {
      setIsTyping(true)
    }, 1500)

    setTimeout(() => {
      setIsTyping(false)
      setVisibleMessages([1, 2])
    }, 2800)

    setTimeout(() => {
      setIsTyping(true)
    }, 3500)

    setTimeout(() => {
      setIsTyping(false)
      setVisibleMessages([1, 2, 3])
    }, 4800)
  }

  return (
    <section className="py-20 md:py-28 bg-[#0f0f0f]" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <div>
            <p className="text-white/40 text-xs font-medium tracking-widest uppercase mb-6">Communication</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.1]">
              We keep it tight
              <br />
              via Slack.
            </h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-md">
              Enjoy a dedicated Slack channel for real-time updates and collaboration. Plus, benefit from weekly
              check-in calls to review progress and discuss your needs.
            </p>
          </div>

          {/* Right side - Chat bubbles container */}
          <div className="relative flex justify-center">
            {/* Subtle glow effect */}
            <div className="absolute -inset-8 bg-gradient-to-r from-white/5 via-transparent to-white/5 blur-3xl opacity-30" />

            {/* Chat bubbles container */}
            <div className="relative w-full max-w-md space-y-4 py-8">
              {messages.map((message) => {
                const isVisible = visibleMessages.includes(message.id)
                const isTeam = message.sender === "team"

                return (
                  <div
                    key={message.id}
                    className={`flex transition-all duration-500 ease-out ${isTeam ? "justify-start" : "justify-end"} ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none h-0 overflow-hidden"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-5 py-3 ${
                        isTeam
                          ? "bg-white/10 text-white rounded-2xl rounded-bl-sm"
                          : "bg-white/20 text-white rounded-2xl rounded-br-sm"
                      }`}
                    >
                      <p className="text-base leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                )
              })}

              {/* Typing indicator */}
              <div
                className={`flex justify-start transition-all duration-300 ${
                  isTyping ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 h-0 overflow-hidden"
                }`}
              >
                <div className="bg-white/10 px-5 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full bg-white/40 animate-bounce"
                      style={{ animationDelay: "0ms", animationDuration: "0.6s" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-white/40 animate-bounce"
                      style={{ animationDelay: "150ms", animationDuration: "0.6s" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-white/40 animate-bounce"
                      style={{ animationDelay: "300ms", animationDuration: "0.6s" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
