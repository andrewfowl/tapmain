"use client"

import { useCallback, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { MessageCircle, X } from "lucide-react"

const ChatPanel = dynamic(() => import("@/components/chat-panel").then((m) => m.ChatPanel), { ssr: false })
const loadPanel = () => import("@/components/chat-panel")

const TEASER_KEY = "tap_chat_teaser_seen"
const TEASER_DELAY_MS = 25000

export function WelcomeChat() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [teaser, setTeaser] = useState(false)

  const dismissTeaser = useCallback(() => {
    setTeaser(false)
    try {
      localStorage.setItem(TEASER_KEY, "1")
    } catch {}
  }, [])

  const openChat = () => {
    dismissTeaser()
    setMounted(true)
    setOpen(true)
  }
  const closeChat = useCallback(() => setOpen(false), [])

  // A small, dismissible nudge once per visitor, never on paid-ad landings.
  useEffect(() => {
    try {
      if (localStorage.getItem(TEASER_KEY)) return
    } catch {
      return
    }
    if (/[?&](gclid|gbraid|wbraid|fbclid|msclkid)=|utm_medium=(cpc|ppc|paid)/i.test(window.location.search)) return
    const timer = window.setTimeout(() => setTeaser(true), TEASER_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      {mounted && <ChatPanel open={open} onClose={closeChat} />}

      {teaser && !open && (
        <div className="animate-chat-in fixed bottom-20 right-5 z-[90] flex max-w-[260px] items-start gap-2 rounded-2xl rounded-br-md border border-white/10 bg-card p-3 text-sm text-white/80 shadow-xl shadow-black/50">
          <button type="button" onClick={openChat} className="text-left">
            Questions about crypto accounting or audit readiness? Ask us.
          </button>
          <button
            type="button"
            onClick={dismissTeaser}
            aria-label="Dismiss"
            className="-mr-1 -mt-1 rounded-full p-1 text-white/40 hover:bg-white/10 hover:text-white"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={open ? closeChat : openChat}
        onPointerEnter={loadPanel}
        onFocus={loadPanel}
        aria-expanded={open}
        aria-controls="tap-chat-panel"
        aria-label={open ? "Close chat" : "Chat with TechAccountingPro assistant"}
        className="fixed bottom-5 right-5 z-[90] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white text-black shadow-lg shadow-black/40 transition-transform hover:scale-105"
      >
        {open ? <X className="h-5 w-5" aria-hidden /> : <MessageCircle className="h-5 w-5" aria-hidden />}
      </button>
    </>
  )
}
