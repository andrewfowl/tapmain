"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const DownloadIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const MailIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

interface EmailCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string) => void
  title: string
  description: string
}

export default function EmailCaptureModal({ isOpen, onClose, onSubmit, title, description }: EmailCaptureModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    try {
      await onSubmit(email)
      setEmail("")
      onClose()
    } catch (error) {
      console.error("Error submitting email:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border border-corporate-200 shadow-elevated">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-3 text-corporate-900">
            <div className="bg-accent1-100 p-2 rounded-lg text-accent1-600">
              <DownloadIcon />
            </div>
            Download Resource
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-corporate-50 p-4 rounded-lg">
            <h4 className="font-semibold text-corporate-900 mb-2">{title}</h4>
            <p className="text-sm text-corporate-600 leading-relaxed">{description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-corporate-700 mb-2 block">
                Email Address
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-corporate-400">
                  <MailIcon />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="pl-10 border-corporate-300 focus:border-accent1-500 focus:ring-accent1-500"
                  required
                />
              </div>
              <p className="text-xs text-corporate-500 mt-2 leading-relaxed">
                We'll send you the download link and occasional updates about new resources.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent border-corporate-300 hover:bg-corporate-50"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-accent1-600 hover:bg-accent1-700 text-black shadow-sm hover:shadow-md transition-all duration-300"
                disabled={isSubmitting || !email}
              >
                {isSubmitting ? "Processing..." : "Download"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
