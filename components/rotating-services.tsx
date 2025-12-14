"use client"

import { useState, useEffect } from "react"

const ROTATING_SERVICES = [
  "AUDIT READINESS",
  "TOKEN COMPENSATION",
  "TECHNICAL ACCOUNTING",
  "STOCK-BASED COMPENSATION",
  "REVENUE RECOGNITION",
]

export function RotatingServices() {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentServiceIndex((prev) => (prev + 1) % ROTATING_SERVICES.length)
        setIsVisible(true)
      }, 200)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-fit">
      <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/80 mb-2 w-fit">HELPING WEB3 STARTUPS WITH:</p>
      <div className="w-fit h-auto text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
        <div
          key={currentServiceIndex}
          className="transition-opacity duration-300"
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          {ROTATING_SERVICES[currentServiceIndex]}
        </div>
      </div>
    </div>
  )
}
