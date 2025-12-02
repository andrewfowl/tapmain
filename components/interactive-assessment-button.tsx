"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { RiskAssessment } from "@/components/risk-assessment"
import { X } from "lucide-react"

export default function InteractiveAssessmentButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const modal =
    isOpen && mounted ? (
      <div className="fixed inset-0 w-screen h-screen bg-[#0f0f0f] overflow-y-auto" style={{ zIndex: 9999 }}>
        <button
          onClick={() => setIsOpen(false)}
          className="fixed top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          style={{ zIndex: 10000 }}
          aria-label="Close assessment"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        <div className="min-h-screen w-full">
          <RiskAssessment onClose={() => setIsOpen(false)} />
        </div>
      </div>
    ) : null

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        className="border-white/20 text-white hover:bg-white/10 bg-transparent rounded-full px-8 py-6 text-base font-medium transition-all"
        onClick={() => setIsOpen(true)}
      >
        Interactive Assessment
      </Button>
      {mounted && modal && createPortal(modal, document.body)}
    </>
  )
}
