"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useChat } from "@ai-sdk/react"
import { ArrowRight, ArrowUpRight, MessageCircle, Mic, Square } from "lucide-react"
import { CHAT_LIMITS, CHAT_RESOURCES, type ChatResourceId } from "@/lib/chat-resources"
import { useSpeechInput } from "@/hooks/use-speech-input"

const STORAGE_KEY = "tap_welcome_seen"

const GREETING =
  "Hi, I'm the TechAccountingPro assistant. We bring Big 4 accounting expertise to crypto and Web3 startups. What are you working on?"

const TRUST_POINTS = ["15 years of experience", "35+ Web3 clients", "Big 4 expertise"]

const STARTERS = [
  { label: "Getting audit-ready", message: "We need to get ready for an audit." },
  { label: "Token compensation", message: "I have questions about accounting for token compensation." },
  { label: "Revenue recognition", message: "I need help with revenue recognition." },
  { label: "Just exploring", message: "Just exploring. What do you help with?" },
]

export function WelcomeChat() {
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const [input, setInput] = useState("")
  const [greeting, setGreeting] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const spokeLastRef = useRef(false)

  const { messages, sendMessage, status, error } = useChat()

  const greetingDone = greeting.length >= GREETING.length
  const waiting = status === "submitted" || status === "streaming"
  const userTurns = messages.filter((m) => m.role === "user").length
  const limitReached = userTurns >= CHAT_LIMITS.maxUserTurns
  const glowOpacity = Math.min(0.55 + userTurns * 0.12, 1)
  const showStarters = greetingDone && messages.length === 0 && !waiting

  const send = (text: string, viaVoice = false) => {
    const value = text.trim().slice(0, CHAT_LIMITS.maxMessageChars)
    if (!value || status !== "ready" || limitReached) return
    spokeLastRef.current = viaVoice
    sendMessage({ text: value })
    setInput("")
  }

  const speech = useSpeechInput({
    onTranscript: setInput,
    onFinal: (text) => send(text, true),
  })

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setOpen(true)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!open || greetingDone) return
    let i = greeting.length
    const id = setInterval(() => {
      i += 1
      setGreeting(GREETING.slice(0, i))
      if (i >= GREETING.length) clearInterval(id)
    }, 45)
    return () => clearInterval(id)
    // Only restart when the overlay opens; the greeting types once per session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (open && greetingDone && !waiting) inputRef.current?.focus()
  }, [open, greetingDone, waiting])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, status, greeting])

  // Read replies aloud when the visitor used the microphone.
  useEffect(() => {
    if (status !== "ready" || !spokeLastRef.current) return
    const last = messages[messages.length - 1]
    if (last?.role !== "assistant" || !("speechSynthesis" in window)) return
    const utterance = new SpeechSynthesisUtterance(textOf(last))
    utterance.rate = 1.02
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }, [status, messages])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && minimize()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function minimize() {
    localStorage.setItem(STORAGE_KEY, "1")
    speech.stop()
    if ("speechSynthesis" in window) window.speechSynthesis.cancel()
    setOpen(false)
  }

  if (!ready) return null

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open chat with TechAccountingPro assistant"
        className="group fixed bottom-5 right-5 z-[90] flex items-center gap-2 rounded-full border border-white/15 bg-[#0a0a0a]/90 py-3 pl-3 pr-4 text-sm text-white shadow-[0_0_40px_rgba(120,180,255,0.25)] backdrop-blur transition-all hover:border-sky-300/40 hover:shadow-[0_0_50px_rgba(120,180,255,0.4)]"
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
          <MessageCircle className="h-4 w-4" aria-hidden />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0a0a0a] bg-emerald-400" />
        </span>
        <span className="hidden sm:inline">{messages.length > 0 ? "Continue chat" : "Ask us anything"}</span>
      </button>
    )
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Chat with TechAccountingPro assistant"
      className="fixed inset-x-0 top-0 z-[100] flex h-dvh flex-col overflow-hidden bg-[#0a0a0a]"
    >
      <div
        aria-hidden
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[120vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(120,180,255,0.24),rgba(80,120,255,0.08)_40%,transparent_70%)] blur-2xl transition-opacity duration-1000"
      />

      <header className="relative flex items-start justify-between gap-4 px-5 py-4 md:px-8 md:py-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="flex h-8 items-center rounded-md bg-[#231f20] px-2 text-sm font-black tracking-tight text-[#FFDF1B] ring-1 ring-white/10"
            >
              TAP
            </span>
            <span className="text-sm font-medium tracking-tight text-white/80">TechAccountingPro</span>
          </div>
          <ul className="flex flex-wrap items-center gap-x-2 text-xs text-white/35" aria-label="About us">
            {TRUST_POINTS.map((point, i) => (
              <li key={point} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>·</span>}
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-end gap-1">
          <button
            type="button"
            onClick={minimize}
            className="group flex items-center gap-1.5 whitespace-nowrap text-sm text-white/50 transition-colors hover:text-white"
          >
            Continue to site
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </button>
          <span className="hidden text-xs text-white/30 sm:block">Pick this chat up anytime from the corner button</span>
        </div>
      </header>

      <div ref={scrollRef} className="relative flex-1 overflow-y-auto">
        <div
          aria-live="polite"
          className="mx-auto flex min-h-full w-full max-w-3xl flex-col justify-center gap-8 px-6 py-12"
        >
          <Bubble role="assistant">
            {greeting}
            {!greetingDone && <Caret />}
          </Bubble>

          {showStarters && (
            <div
              className="animate-chat-in flex flex-wrap justify-center gap-2"
              role="group"
              aria-label="Suggested topics"
            >
              {STARTERS.map((starter) => (
                <button
                  key={starter.label}
                  type="button"
                  onClick={() => send(starter.message)}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition-colors hover:border-sky-300/50 hover:bg-sky-300/10 hover:text-white md:text-base"
                >
                  {starter.label}
                </button>
              ))}
            </div>
          )}

          {messages.map((message) => (
            <MessageView key={message.id} message={message} />
          ))}

          {status === "submitted" && (
            <Bubble role="assistant">
              <Caret />
            </Bubble>
          )}

          {error && !waiting && (
            <p className="text-center text-sm text-white/50">
              {"Couldn't send that. Please wait a moment and try again."}
            </p>
          )}

          {limitReached && !waiting ? (
            <div className="flex justify-center">
              <ResourceCard id="contact" />
            </div>
          ) : (
            greetingDone &&
            !waiting && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  send(input)
                }}
                className="sticky bottom-0 -mx-6 flex justify-center bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent px-6 pb-2 pt-6 md:static md:mx-0 md:bg-none md:p-0"
              >
                <label htmlFor="welcome-chat-input" className="sr-only">
                  Your message
                </label>
                <input
                  id="welcome-chat-input"
                  ref={inputRef}
                  value={input}
                  maxLength={CHAT_LIMITS.maxMessageChars}
                  autoComplete="off"
                  placeholder={speech.listening ? "Listening..." : "Type your reply"}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.nativeEvent.isComposing || e.keyCode === 229)) {
                      e.preventDefault()
                    }
                  }}
                  className="w-full max-w-[90%] bg-transparent text-center text-xl font-light leading-relaxed text-white caret-sky-300 outline-none placeholder:text-white/25 sm:text-2xl md:text-3xl md:leading-[1.4]"
                />
              </form>
            )
          )}
        </div>
      </div>

      <footer className="relative flex flex-col items-center gap-3 px-6 pb-6 pt-2">
        {speech.supported && greetingDone && !limitReached && (
          <button
            type="button"
            onClick={speech.listening ? speech.stop : speech.start}
            disabled={waiting}
            aria-pressed={speech.listening}
            aria-label={speech.listening ? "Stop listening" : "Talk instead of typing"}
            className={`relative flex h-16 items-center justify-center gap-3 rounded-full px-8 text-base font-medium transition-all disabled:opacity-40 md:h-20 md:px-10 md:text-lg ${
              speech.listening
                ? "bg-sky-300 text-[#0a0a0a] shadow-[0_0_60px_rgba(120,180,255,0.6)]"
                : "bg-white text-[#0a0a0a] shadow-[0_0_40px_rgba(255,255,255,0.18)] hover:scale-105 hover:shadow-[0_0_60px_rgba(120,180,255,0.45)]"
            }`}
          >
            {speech.listening && (
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full border-2 border-sky-300/50" />
            )}
            {speech.listening ? (
              <Square className="h-5 w-5 fill-current md:h-6 md:w-6" aria-hidden />
            ) : (
              <Mic className="h-6 w-6 md:h-7 md:w-7" aria-hidden />
            )}
            <span aria-hidden>{speech.listening ? "Listening... tap to stop" : "Tap to talk"}</span>
          </button>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-white/30">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
            Online
          </span>
          <span aria-hidden>·</span>
          <span>{speech.supported ? "Press Enter to send, or tap the mic to talk" : "Press Enter to send"}</span>
          <span aria-hidden className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">{"AI assistant. Please don't share sensitive data."}</span>
        </div>
      </footer>
    </div>
  )
}

type ChatMessage = ReturnType<typeof useChat>["messages"][number]

function textOf(message: ChatMessage) {
  return message.parts
    .filter((p) => p.type === "text")
    .map((p) => ("text" in p ? p.text : ""))
    .join("")
}

function MessageView({ message }: { message: ChatMessage }) {
  const role = message.role === "user" ? "user" : "assistant"
  const parts = [
    ...message.parts.filter((p) => p.type === "text"),
    ...message.parts.filter((p) => p.type !== "text"),
  ]
  return (
    <>
      {parts.map((part, i) => {
        if (part.type === "text" && part.text) {
          return (
            <Bubble key={i} role={role}>
              {part.text}
            </Bubble>
          )
        }
        if (part.type === "tool-recommendResource" && "input" in part && part.input) {
          const id = (part.input as { id?: string }).id
          if (id && id in CHAT_RESOURCES) {
            return (
              <div key={i} className="animate-chat-in flex justify-center">
                <ResourceCard id={id as ChatResourceId} />
              </div>
            )
          }
        }
        return null
      })}
    </>
  )
}

function ResourceCard({ id }: { id: ChatResourceId }) {
  const resource = CHAT_RESOURCES[id]
  return (
    <Link
      href={resource.href}
      target="_blank"
      rel="noopener"
      className="group flex w-full max-w-md items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left transition-colors hover:border-sky-300/40 hover:bg-white/[0.06]"
    >
      <span>
        <span className="block text-base font-medium text-white">{resource.title}</span>
        <span className="mt-0.5 block text-sm text-white/50">{resource.description}</span>
      </span>
      <ArrowUpRight
        className="h-5 w-5 shrink-0 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-300"
        aria-hidden
      />
    </Link>
  )
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  const isUser = role === "user"
  return (
    <div className="animate-chat-in flex justify-center">
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
