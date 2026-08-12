"use client"

import { useEffect, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { X, ArrowUp } from "lucide-react"

const STORAGE_KEY = "tap_welcome_seen"

const GREETING =
  "Hi, I'm the TechAccountingPro assistant. We bring Big 4 accounting expertise to crypto and Web3 startups. Tell me a bit about what you're working on and I'll point you in the right direction."

export function WelcomeChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [greeting, setGreeting] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat()

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!localStorage.getItem(STORAGE_KEY)) setOpen(true)
  }, [])

  // Typewriter effect for the opening greeting
  useEffect(() => {
    if (!open) return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setGreeting(GREETING.slice(0, i))
      if (i >= GREETING.length) clearInterval(id)
    }, 18)
    return () => clearInterval(id)
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, status, greeting])

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1")
    setOpen(false)
  }

  const submit = (text: string) => {
    const value = text.trim()
    if (!value || status !== "ready") return
    sendMessage({ text: value })
    setInput("")
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#0a0a0a]">
      {/* Shine light */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[120vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(120,180,255,0.18),rgba(80,120,255,0.06)_40%,transparent_70%)] blur-2xl"
      />
      {/* Header */}
      <header className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">TechAccountingPro Assistant</p>
            <p className="text-xs text-white/40">Usually replies instantly</p>
          </div>
        </div>
        <button
          onClick={dismiss}
          className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          Skip to site
          <X className="h-3.5 w-3.5" />
        </button>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="relative flex-1 overflow-y-auto">
        <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col justify-center space-y-8 px-6 py-10">
          <Bubble role="assistant">
            {greeting}
            {greeting.length < GREETING.length && <Caret />}
          </Bubble>

          {messages.map((message) => {
            const text = message.parts
              .filter((p) => p.type === "text")
              .map((p) => ("text" in p ? p.text : ""))
              .join("")
            if (!text) return null
            return (
              <Bubble key={message.id} role={message.role === "user" ? "user" : "assistant"}>
                {text}
              </Bubble>
            )
          })}

          {status === "submitted" && (
            <Bubble role="assistant">
              <span className="inline-flex gap-1">
                <Dot delay={0} />
                <Dot delay={150} />
                <Dot delay={300} />
              </span>
            </Bubble>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="relative border-t border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(input)
          }}
          className="mx-auto flex w-full max-w-3xl items-end gap-2 px-6 py-5"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full border border-white/15 bg-black px-5 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30"
          />
          <button
            type="submit"
            disabled={status !== "ready" || !input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-opacity hover:bg-white/90 disabled:opacity-40"
          >
            <ArrowUp className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </button>
        </form>
      </div>
    </div>
  )
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  const isUser = role === "user"
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[90%] whitespace-pre-wrap text-balance text-xl leading-relaxed sm:text-2xl md:text-3xl md:leading-[1.4] ${
          isUser
            ? "rounded-2xl bg-white/90 px-5 py-3 text-black shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            : "font-light text-white/70 [text-shadow:0_0_30px_rgba(150,190,255,0.25)]"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

function Caret() {
  return <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-white/70" />
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50"
      style={{ animationDelay: `${delay}ms` }}
    />
  )
}
