import type { Metadata } from "next"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TemplatesPageContent } from "@/components/templates-page-content"
import { TemplatesPageSkeleton } from "@/components/templates-page-skeleton"

export const metadata: Metadata = {
  title: "Free Crypto Accounting Templates & Policies",
  description:
    "Downloadable US GAAP accounting policy and memo templates for crypto and Web3 companies, written by a former KPMG CPA.",
  alternates: { canonical: "/templates" },
}

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader />

      <Suspense fallback={<TemplatesPageSkeleton />}>
        <TemplatesPageContent />
      </Suspense>

      <SiteFooter />
    </div>
  )
}
