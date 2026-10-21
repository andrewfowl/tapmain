"use client"

import { useEffect } from "react"

export const ATTRIBUTION_COOKIE = "tap_attr"

// Stores first-touch source once so leads can be tied back to the channel that brought them.
export function AttributionCapture() {
  useEffect(() => {
    if (document.cookie.includes(`${ATTRIBUTION_COOKIE}=`)) return
    const params = new URLSearchParams(window.location.search)
    const data = {
      source: params.get("utm_source") || (document.referrer ? new URL(document.referrer).hostname : "direct"),
      medium: params.get("utm_medium") || "",
      campaign: params.get("utm_campaign") || "",
      landing: window.location.pathname,
    }
    document.cookie = `${ATTRIBUTION_COOKIE}=${encodeURIComponent(JSON.stringify(data))}; path=/; max-age=7776000; SameSite=Lax`
  }, [])
  return null
}
