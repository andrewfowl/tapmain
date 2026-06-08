import type { Metadata } from "next"
import ChecklistClient from "./checklist-client"

export const metadata: Metadata = {
  title: "Audit Readiness Checklist for Web3 Startups | TechAccountingPro",
  description:
    "A practitioner's checklist that helps Web3 finance leaders prepare for financial statement audits — surfacing missing documentation, unclear policies, and weak controls before they turn into audit overages and re-audits.",
  openGraph: {
    title: "Audit Readiness Checklist for Web3 Startups | TechAccountingPro",
    description:
      "132 readiness checks across 6 functional areas. Toggle sections, check off items, and print a tailored PDF of only your selected sections.",
    url: "https://techaccountingpro.com/checklist",
    images: ["/images/logos/tap-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Audit Readiness Checklist for Web3 Startups | TechAccountingPro",
    description: "132 readiness checks across 6 functional areas. Free, interactive, printable.",
  },
}

export default function ChecklistPage() {
  return <ChecklistClient />
}
