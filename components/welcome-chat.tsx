"use client"

import { useEffect, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { X } from "lucide-react"

const STORAGE_KEY = "tap_welcome_seen"

const GREETING =
  "Hi, I'm the TechAccountingPro assistant. We bring Big 4 accounting expertise to crypto and Web3 startups. What are you working on?"

export function WelcomeChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [greeting, setGreeting] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status } = useChat()

  const greetingDone = greeting.length >= GREETING.length

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!localStorage.getItem(STORAGE_KEY)) setOpen(true)
  }, [])

  // Typewriter effect for the opening greeting (slow, deliberate pace)
  useEffect(() => {
    if (!open) return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setGreeting(GREETING.slice(0, i))
      if (i >= GREETING.length) clearInterval(id)
    }, 45)
    return () => clearInterval(id)
  }, [open])

  // Focus the inline input once the greeting has finished typing
  useEffect(() => {
    if (greetingDone) inputRef.current?.focus()
  }, [greetingDone])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, status, greeting])

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1")
    setOpen(false)
  }

  const submit = () => {
    const value = input.trim()
    if (!value || status !== "ready") return
    sendMessage({ text: value })
    setInput("")
  }

  if (!open) return null

  const waiting = status === "submitted" || status === "streaming"

  return (
    <div className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#0a0a0a]">
      {/* Shine light */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[120vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(120,180,255,0.18),rgba(80,120,255,0.06)_40%,transparent_70%)] blur-2xl"
      />
      {/* Header */}
      <header className="relative flex items-center justify-between px-5 py-4">
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

      {/* Conversation + inline input */}
      <div ref={scrollRef} className="relative flex-1 overflow-y-auto">
        <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col justify-center gap-8 px-6 py-12">
          <Bubble role="assistant">
            {greeting}
            {!greetingDone && <Caret />}
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
              <Caret />
            </Bubble>
          )}

          {/* Inline input — type right under the message where the cursor blinks */}
          {greetingDone && !waiting && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submit()
              }}
              className="flex justify-center"
            >
              <input
                ref={inputRef}
                value={input}
                placeholder="Type your reply"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.nativeEvent.isComposing || e.keyCode === 229)) {
                    e.preventDefault()
                  }
                }}
                className="w-full max-w-[90%] bg-transparent text-center text-xl font-light leading-relaxed text-white caret-sky-300 outline-none placeholder:text-white/25 sm:text-2xl md:text-3xl md:leading-[1.4]"
              />
            </form>
          )}
        </div>
      </div>

      {greetingDone && (
        <p className="relative pb-6 text-center text-xs text-white/30">Press Enter to send</p>
      )}
    </div>
  )
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  const isUser = role === "user"
  return (
    <div className="flex justify-center">
      <div
        className={`max-w-[90%] whitespace-pre-wrap text-balance text-center text-xl leading-relaxed sm:text-2xl md:text-3xl md:leading-[1.4] ${
          isUser
            ? "font-normal text-white"
            : "font-light text-white/70 [text-shadow:0_0_30px_rgba(150,190,255,0.25)]"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

function Caret() {
  return (
    <span className="ml-1 inline-block h-6 w-[3px] translate-y-1 animate-pulse rounded-full bg-white/70 shadow-[0_0_12px_rgba(150,190,255,0.6)] md:h-8" />
  )
}
