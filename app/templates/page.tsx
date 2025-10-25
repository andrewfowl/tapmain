import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TemplatesPageContent } from "@/components/templates-page-content"
import { TemplatesPageSkeleton } from "@/components/templates-page-skeleton"

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      <Suspense fallback={<TemplatesPageSkeleton />}>
        <TemplatesPageContent />
      </Suspense>

    
    </div>
  )
}
