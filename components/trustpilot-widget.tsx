"use client"

import { useEffect } from "react"
import Script from "next/script"

export function TrustpilotWidget() {
  useEffect(() => {
    // Re-initialize Trustpilot widget if script already loaded
    if (typeof window !== "undefined" && (window as any).Trustpilot) {
      ;(window as any).Trustpilot.loadFromElement(document.querySelector(".trustpilot-widget"), true)
    }
  }, [])

  return (
    <>
      <Script src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" strategy="lazyOnload" />
      <div
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id="56278e9abfbbba0bdcd568bc"
        data-businessunit-id="690a5589335eabbc59df3e8f"
        data-style-height="52px"
        data-style-width="100%"
        data-token="705870a4-9d6a-42bc-bdac-6fa0c7c26f42"
      >
        <a
          href="https://www.trustpilot.com/review/techaccountingpro.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white text-sm"
        >
          Leave us a review on Trustpilot
        </a>
      </div>
    </>
  )
}
