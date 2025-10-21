import { Skeleton } from "@/components/ui/skeleton"

export function SolutionsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-shadow"
        >
          <Skeleton className="h-48 w-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-4" />
          <Skeleton className="h-10 w-32" />
        </div>
      ))}
    </div>
  )
}
