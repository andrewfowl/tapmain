"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { submitWaitlistSignup } from "@/actions/waitlist-actions"
import { useToast } from "@/hooks/use-toast"

interface WaitlistPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistPopup({ isOpen, onClose }: WaitlistPopupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      const result = await submitWaitlistSignup(formData)

      if (result.success) {
        toast({
          title: "Success!",
          description:
            "You've been added to our waitlist. We'll notify you when the Interactive Pre-Assessment is ready!",
        })
        onClose()
      } else {
        toast({
          title: "Error",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Interactive Pre-Assessment Coming Soon!
          </DialogTitle>
          <DialogDescription className="text-white/60">
            We're working hard to bring you an interactive pre-assessment tool that will help you evaluate your
            accounting readiness. Join our waitlist to be the first to know when it's available.
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            name="website"
            style={{ position: "absolute", left: "-9999px" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="text-sm font-medium text-white/80">
                First Name *
              </label>
              <input
                id="first_name"
                name="first_name"
                required
                className="mt-1 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/30"
                placeholder="John"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="text-sm font-medium text-white/80">
                Last Name *
              </label>
              <input
                id="last_name"
                name="last_name"
                required
                className="mt-1 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/30"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-white/80">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/30"
              placeholder="john@company.com"
            />
          </div>

          <div>
            <label htmlFor="company" className="text-sm font-medium text-white/80">
              Company
            </label>
            <input
              id="company"
              name="company"
              className="mt-1 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/30"
              placeholder="Your Company"
            />
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-medium text-white/80">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="mt-1 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/30"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium text-white/80">
              What specific areas would you like the assessment to cover? (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              className="mt-1 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/30 resize-none"
              placeholder="e.g., Revenue recognition, lease accounting, crypto transactions..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10 rounded-full"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-white text-black hover:bg-white/90 rounded-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Joining..." : "Join Waitlist"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
