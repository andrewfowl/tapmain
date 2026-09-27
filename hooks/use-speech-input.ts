"use client"

import { useEffect, useRef, useState } from "react"

type RecognitionResultList = ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>

interface Recognition {
  lang: string
  interimResults: boolean
  continuous: boolean
  onresult: ((e: { results: RecognitionResultList }) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

type RecognitionCtor = new () => Recognition

function getRecognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export function useSpeechInput({
  onTranscript,
  onFinal,
}: {
  onTranscript: (text: string) => void
  onFinal: (text: string) => void
}) {
  const [supported, setSupported] = useState(false)
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef<Recognition | null>(null)
  const transcriptRef = useRef("")
  const callbacks = useRef({ onTranscript, onFinal })
  callbacks.current = { onTranscript, onFinal }

  useEffect(() => {
    setSupported(getRecognitionCtor() !== null)
    return () => recognitionRef.current?.abort()
  }, [])

  const start = () => {
    const Ctor = getRecognitionCtor()
    if (!Ctor || listening) return
    if ("speechSynthesis" in window) window.speechSynthesis.cancel()

    const recognition = new Ctor()
    recognition.lang = navigator.language || "en-US"
    recognition.interimResults = true
    recognition.continuous = false
    transcriptRef.current = ""

    recognition.onresult = (e) => {
      const text = Array.from(e.results)
        .map((r) => r[0]?.transcript ?? "")
        .join("")
      transcriptRef.current = text
      callbacks.current.onTranscript(text)
    }
    recognition.onerror = () => setListening(false)
    recognition.onend = () => {
      setListening(false)
      recognitionRef.current = null
      if (transcriptRef.current.trim()) callbacks.current.onFinal(transcriptRef.current)
    }

    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
  }

  const stop = () => recognitionRef.current?.stop()

  return { supported, listening, start, stop }
}
