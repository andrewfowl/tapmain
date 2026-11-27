"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BOOKING_URL } from "@/lib/site"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const isDashboardOrAdmin = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isDashboardOrAdmin) {
    return null
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        isScrolled ? "bg-black/95 border-white/10" : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="TechAccountingPro home">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center bg-brand font-display text-xl leading-none text-brand-charcoal"
            >
              TAP
            </span>
            <span className="hidden sm:inline font-display text-2xl leading-none tracking-wide text-white">
              TechAccountingPro
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              asChild
              variant="outline"
              className="hidden sm:inline-flex border-white/20 text-white hover:bg-white/10 bg-transparent rounded-full px-5"
            >
              <Link href="/#pricing">See plans</Link>
            </Button>
            <Button
              asChild
              className="bg-brand text-brand-charcoal hover:bg-brand/90 rounded-full px-5 font-semibold transition-colors"
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book a consultation
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
