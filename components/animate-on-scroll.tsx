"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface AnimateOnScrollProps {
  children: ReactNode
  animation?: "fade-in-up" | "fade-in" | "slide-in-left" | "slide-in-right" | "scale-in"
  delay?: number
  className?: string
  threshold?: number
}

export function AnimateOnScroll({
  children,
  animation = "fade-in-up",
  delay = 0,
  className = "",
  threshold = 0,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Content already on screen (or with reduced motion) shows immediately instead of blinking in.
    const alreadyInView = el.getBoundingClientRect().top < window.innerHeight
    if (alreadyInView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true)
      return
    }

    // Start the reveal before the section reaches the viewport so it never scrolls in blank.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: "0px 0px 20% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? `animate-${animation}` : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
