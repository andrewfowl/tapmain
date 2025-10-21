"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import WaitlistPopup from "@/components/waitlist-popup"

export default function InteractiveAssessmentButton() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        className="border-corporate-300 text-corporate-800 hover:bg-corporate-50 bg-white"
        onClick={() => setIsWaitlistOpen(true)}
      >
        Interactive Pre-Assessment
      </Button>

      <WaitlistPopup isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </>
  )
}
