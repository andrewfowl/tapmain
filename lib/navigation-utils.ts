"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Hook to scroll to top on page navigation
 */
export function useScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
}

/**
 * Manually scroll to top function
 */
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}
