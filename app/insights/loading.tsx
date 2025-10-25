import { Skeleton } from "@/components/ui/skeleton"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Hero Section Skeleton */}
      <section className="relative bg-corporate-50 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="corporate-container relative z-10">
          <div className="max-w-3xl">
            <Skeleton className="h-6 w-24 mb-4" />
            <Skeleton className="h-14 w-full mb-2" />
            <Skeleton className="h-14 w-3/4 mb-6" />
            <Skeleton className="h-6 w-full max-w-2xl" />
            <Skeleton className="h-6 w-5/6 max-w-2xl mt-2" />
          </div>
        </div>
      </section>

      {/* Search Section Skeleton */}
      <section className="py-8 bg-white border-b border-corporate-100">
        <div className="corporate-container">
          <div className="relative max-w-2xl mx-auto">
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Insights Skeleton */}
      <section className="py-16 bg-white">
        <div className="corporate-container">
          <Skeleton className="h-10 w-64 mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-corporate-200 rounded-lg overflow-hidden">
                <Skeleton className="w-full aspect-video" />
                <div className="p-6">
                  <Skeleton className="h-6 w-24 mb-3" />
                  <Skeleton className="h-8 w-full mb-2" />
                  <Skeleton className="h-8 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Insights Skeleton */}
      <section className="py-16 bg-corporate-50">
        <div className="corporate-container">
          <Skeleton className="h-10 w-64 mb-8" />

          <div className="flex flex-wrap gap-2 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border border-corporate-200 rounded-lg overflow-hidden">
                <Skeleton className="w-full aspect-video" />
                <div className="p-6">
                  <Skeleton className="h-5 w-20 mb-3" />
                  <Skeleton className="h-7 w-full mb-2" />
                  <Skeleton className="h-7 w-4/5 mb-3" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
