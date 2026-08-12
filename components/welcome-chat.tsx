"use client"

import { useEffect, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send } from "lucide-react"

const STORAGE_KEY = "tap_welcome_seen"

const GREETING =
  "Hi there! I'm the TechAccountingPro assistant. We help crypto and Web3 startups with technical accounting, audit readiness, and token compensation. What brings you in today? (You can skip to the site anytime.)"

const SUGGESTIONS = [
  "We're getting ready for our first audit",
  "How do you handle token compensation?",
  "What's included in your advisory plans?",
]

export function WelcomeChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat()

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!localStorage.getItem(STORAGE_KEY)) setOpen(true)
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, status])

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="flex h-[600px] max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-2xl">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5">
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
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          <Bubble role="assistant">{GREETING}</Bubble>

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
                <Dot /> <Dot /> <Dot />
              </span>
            </Bubble>
          )}

          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(input)
          }}
          className="flex items-center gap-2 border-t border-white/10 p-3"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about our services..."
            className="border-white/15 bg-black text-white placeholder:text-white/40 focus-visible:ring-white/20"
          />
          <Button
            type="submit"
            size="icon"
            disabled={status !== "ready" || !input.trim()}
            className="shrink-0 bg-white text-black hover:bg-white/90"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
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
        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser ? "bg-white text-black" : "border border-white/10 bg-white/5 text-white/90"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

function Dot() {
  return <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:0ms]" />
}
