"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useChat } from "@ai-sdk/react"
import { ArrowUp, ArrowUpRight, Mic, Square, X } from "lucide-react"
import { CHAT_LIMITS, CHAT_RESOURCES, type ChatResourceId } from "@/lib/chat-resources"
import { useSpeechInput } from "@/hooks/use-speech-input"

const GREETING =
  "Hi, I'm the TechAccountingPro assistant. We bring Big 4 accounting expertise to crypto and Web3 startups. What are you working on?"

const STARTERS = [
  { label: "Getting audit-ready", message: "We need to get ready for an audit." },
  { label: "Token compensation", message: "I have questions about accounting for token compensation." },
  { label: "Revenue recognition", message: "I need help with revenue recognition." },
  { label: "Just exploring", message: "Just exploring. What do you help with?" },
]

export function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
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
    if (greetingDone) return
    let i = 0
    let id: number
    const tick = () => {
      i += 1
      setGreeting(GREETING.slice(0, i))
      if (i >= GREETING.length) return
      const prev = GREETING[i - 1]
      const pause = /[.?!]/.test(prev) ? 320 : prev === "," ? 150 : prev === " " ? 40 : 0
      id = window.setTimeout(tick, 14 + Math.random() * 26 + pause)
    }
    id = window.setTimeout(tick, 450)
    return () => window.clearTimeout(id)
    // The greeting types once per page view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (open && greetingDone && !waiting) inputRef.current?.focus({ preventScroll: true })
  }, [open, greetingDone, waiting])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, status, greeting])

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
    if (open) return
    speech.stop()
    if ("speechSynthesis" in window) window.speechSynthesis.cancel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  return (
    <section
      id="tap-chat-panel"
      aria-label="Chat with TechAccountingPro assistant"
      hidden={!open}
      className="animate-chat-in fixed inset-x-3 bottom-20 z-[90] flex h-[min(70dvh,560px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-2xl shadow-black/60 sm:inset-x-auto sm:right-5 sm:w-[380px]"
    >
      <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="flex h-7 items-center rounded-md bg-[#231f20] px-1.5 text-xs font-black tracking-tight text-[#FFDF1B] ring-1 ring-white/10"
          >
            TAP
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-white">TechAccountingPro</span>
            <span className="flex items-center gap-1.5 text-xs text-white/45">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
              Typically replies instantly
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </header>

      <div ref={scrollRef} aria-live="polite" className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
        <Bubble role="assistant">
          {greeting}
          {!greetingDone && <Caret />}
        </Bubble>

        {showStarters && (
          <div className="animate-chat-in flex flex-wrap gap-2" role="group" aria-label="Suggested topics">
            {STARTERS.map((starter) => (
              <button
                key={starter.label}
                type="button"
                onClick={() => send(starter.message)}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/75 transition-colors hover:border-sky-300/50 hover:bg-sky-300/10 hover:text-white"
              >
                {starter.label}
              </button>
            ))}
          </div>
        )}

        {messages.map((message, i) => (
          <MessageView
            key={message.id}
            message={message}
            streaming={status === "streaming" && i === messages.length - 1}
          />
        ))}

        {status === "submitted" && <TypingDots />}

        {error && !waiting && (
          <p className="text-xs text-white/50">{"Couldn't send that. Please wait a moment and try again."}</p>
        )}

        {limitReached && !waiting && <ResourceCard id="contact" />}
      </div>

      {!limitReached && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="flex items-center gap-2 border-t border-white/10 px-3 py-3"
        >
          <label htmlFor="tap-chat-input" className="sr-only">
            Your message
          </label>
          <input
            id="tap-chat-input"
            ref={inputRef}
            value={input}
            disabled={!greetingDone || waiting}
            maxLength={CHAT_LIMITS.maxMessageChars}
            autoComplete="off"
            placeholder={speech.listening ? "Listening..." : "Type your question"}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.nativeEvent.isComposing || e.keyCode === 229)) e.preventDefault()
            }}
            className="min-w-0 flex-1 rounded-full bg-white/[0.06] px-4 py-2.5 text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-white/35 focus:ring-sky-300/50 disabled:opacity-50"
          />
          {speech.supported && (
            <button
              type="button"
              onClick={speech.listening ? speech.stop : speech.start}
              disabled={waiting}
              aria-pressed={speech.listening}
              aria-label={speech.listening ? "Stop listening" : "Ask with your voice"}
              className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors disabled:opacity-40 ${
                speech.listening ? "bg-sky-300 text-[#0a0a0a]" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {speech.listening && (
                <span aria-hidden className="absolute inset-0 animate-ping rounded-full border border-sky-300/60" />
              )}
              {speech.listening ? (
                <Square className="h-3.5 w-3.5 fill-current" aria-hidden />
              ) : (
                <Mic className="h-4 w-4" aria-hidden />
              )}
            </button>
          )}
          <button
            type="submit"
            disabled={!input.trim() || waiting}
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-opacity disabled:opacity-30"
          >
            <ArrowUp className="h-4 w-4" aria-hidden />
          </button>
        </form>
      )}
      <p className="px-4 pb-2 text-center text-[11px] text-white/30">
        {"AI assistant. Please don't share sensitive data."}
      </p>
    </section>
  )
}

type ChatMessage = ReturnType<typeof useChat>["messages"][number]

function textOf(message: ChatMessage) {
  return message.parts
    .filter((p) => p.type === "text")
    .map((p) => ("text" in p ? p.text : ""))
    .join("")
}

function MessageView({ message, streaming }: { message: ChatMessage; streaming: boolean }) {
  const role = message.role === "user" ? "user" : "assistant"
  const parts = [
    ...message.parts.filter((p) => p.type === "text"),
    ...message.parts.filter((p) => p.type !== "text"),
  ]
  const lastTextIndex = parts.findLastIndex((p) => p.type === "text")
  if (streaming && role === "assistant" && lastTextIndex === -1) return <TypingDots />
  return (
    <>
      {parts.map((part, i) => {
        if (part.type === "text" && part.text) {
          return (
            <Bubble key={i} role={role}>
              {part.text}
              {streaming && i === lastTextIndex && <Caret />}
            </Bubble>
          )
        }
        if (part.type === "tool-recommendResource" && "input" in part && part.input) {
          const id = (part.input as { id?: string }).id
          if (id && id in CHAT_RESOURCES) return <ResourceCard key={i} id={id as ChatResourceId} />
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
      className="animate-chat-in group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 transition-colors hover:border-sky-300/40 hover:bg-white/[0.06]"
    >
      <span>
        <span className="block text-sm font-medium text-white">{resource.title}</span>
        <span className="mt-0.5 block text-xs text-white/50">{resource.description}</span>
      </span>
      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-300"
        aria-hidden
      />
    </Link>
  )
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  const isUser = role === "user"
  return (
    <div className={`animate-chat-in flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser ? "rounded-br-md bg-white text-black" : "rounded-bl-md bg-white/[0.07] text-white/85"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div className="animate-chat-in flex justify-start" role="status" aria-label="Assistant is typing">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white/[0.07] px-3.5 py-3">
        {[0, 160, 320].map((delay) => (
          <span
            key={delay}
            style={{ animationDelay: `${delay}ms` }}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60"
          />
        ))}
      </div>
    </div>
  )
}

function Caret() {
  return <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-white/70" />
}
