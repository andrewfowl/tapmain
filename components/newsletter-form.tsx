"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { subscribeToNewsletter } from "@/actions/newsletter-actions"

interface NewsletterFormProps {
  source?: string
  placeholder?: string
  buttonText?: string
}

export function NewsletterForm({
  source = "footer",
  placeholder = "Enter your email",
  buttonText = "Subscribe",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const result = await subscribeToNewsletter({
      email,
      source,
      honeypot,
    })

    setIsSubmitting(false)

    if (result.success) {
      setMessage({ type: "success", text: result.message })
      setEmail("")
    } else {
      setMessage({ type: "error", text: result.message })
    }

    setTimeout(() => setMessage(null), 5000)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex gap-2">
        {/* Honeypot field */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ position: "absolute", left: "-9999px" }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-white placeholder-white/30 transition-all text-sm"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-white text-black hover:bg-white/90 rounded-lg px-6 font-medium transition-all"
        >
          {isSubmitting ? "..." : buttonText}
        </Button>
      </form>

      {message && (
        <p className={`mt-3 text-sm ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
          {message.text}
        </p>
      )}
    </div>
  )
}
