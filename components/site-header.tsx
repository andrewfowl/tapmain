"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const isDashboardOrAdmin = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isDashboardOrAdmin) {
    return null
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-xl font-bold text-white tracking-tight uppercase">TechAccountingPro</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="https://cal.com/andrew-belonogov/30min">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                Get Started
              </Button>
            </Link>
            <Button
              asChild
              className="bg-white text-black hover:bg-white/90 rounded-full px-6 py-2 font-medium transition-all duration-300 hover:scale-105"
            >
              <Link href="#pricing">See plans</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
