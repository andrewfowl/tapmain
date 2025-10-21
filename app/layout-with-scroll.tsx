"use client"

import type React from "react"

import { useScrollToTop } from "@/lib/navigation-utils"

export function LayoutWithScroll({ children }: { children: React.ReactNode }) {
  useScrollToTop()

  return <>{children}</>
}
