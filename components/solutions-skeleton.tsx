export function SolutionsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="relative overflow-hidden rounded-lg border border-white/10 bg-card p-6">
          <div className="h-40 w-full mb-4 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-5 w-1/4 mb-3 bg-white/5 rounded animate-pulse" />
          <div className="h-6 w-3/4 mb-2 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-full mb-2 bg-white/5 rounded animate-pulse" />
          <div className="h-4 w-2/3 mb-4 bg-white/5 rounded animate-pulse" />
        </div>
      ))}
    </div>
  )
}
