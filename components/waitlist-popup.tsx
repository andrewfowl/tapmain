"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-corporate-900">
            Interactive Pre-Assessment Coming Soon!
          </DialogTitle>
          <DialogDescription className="text-corporate-600">
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
              <Label htmlFor="first_name" className="text-sm font-medium text-corporate-700">
                First Name *
              </Label>
              <Input id="first_name" name="first_name" required className="mt-1" placeholder="John" />
            </div>
            <div>
              <Label htmlFor="last_name" className="text-sm font-medium text-corporate-700">
                Last Name *
              </Label>
              <Input id="last_name" name="last_name" required className="mt-1" placeholder="Doe" />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-corporate-700">
              Email Address *
            </Label>
            <Input id="email" name="email" type="email" required className="mt-1" placeholder="john@company.com" />
          </div>

          <div>
            <Label htmlFor="company" className="text-sm font-medium text-corporate-700">
              Company
            </Label>
            <Input id="company" name="company" className="mt-1" placeholder="Your Company" />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-corporate-700">
              Phone Number
            </Label>
            <Input id="phone" name="phone" type="tel" className="mt-1" placeholder="+1 (555) 123-4567" />
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-medium text-corporate-700">
              What specific areas would you like the assessment to cover? (Optional)
            </Label>
            <Textarea
              id="message"
              name="message"
              className="mt-1"
              placeholder="e.g., Revenue recognition, lease accounting, crypto transactions..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-corporate-800 hover:bg-corporate-700 text-white"
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
