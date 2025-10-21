"use client"

import { useEffect, useRef } from "react"
import lottie, { type AnimationItem } from "lottie-web"

interface LottieIconProps {
  animationData: any
  className?: string
  loop?: boolean
  autoplay?: boolean
}

export function LottieIcon({ animationData, className = "w-6 h-6", loop = true, autoplay = true }: LottieIconProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    if (containerRef.current && !animationRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop,
        autoplay,
        animationData,
      })
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy()
        animationRef.current = null
      }
    }
  }, [animationData, loop, autoplay])

  return <div ref={containerRef} className={className} />
}
