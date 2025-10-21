"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribeToNewsletter } from "@/actions/newsletter-actions"
import { Loader2 } from "lucide-react"

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

    // Clear message after 5 seconds
    setTimeout(() => setMessage(null), 5000)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex gap-2">
        {/* Honeypot field - hidden from users but visible to bots */}
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

        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          className="flex-1 bg-white text-black border-corporate-200"
        />
        <Button type="submit" disabled={isSubmitting} className="bg-corporate-600 hover:bg-corporate-700 text-white">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </form>

      {message && (
        <p className={`mt-2 text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
          {message.text}
        </p>
      )}
    </div>
  )
}
