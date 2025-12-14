"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbsProps {
  baseRoute: "dashboard" | "admin"
}

const routeLabels: Record<string, string> = {
  // Dashboard routes
  dashboard: "Dashboard",
  projects: "Projects",
  requests: "Requests",
  profile: "Profile",
  trust: "Trust Center",
  policies: "Policies",
  new: "New Project",
  // Admin routes
  admin: "Admin",
  customers: "Customers",
  subscriptions: "Subscriptions",
  "project-types": "Project Types",
}

export function Breadcrumbs({ baseRoute }: BreadcrumbsProps) {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  // Build breadcrumb items
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const isLast = index === segments.length - 1

    // Check if segment is a UUID (dynamic route)
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment)
    const label = isUuid ? "Details" : routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)

    return { href, label, isLast }
  })

  if (breadcrumbs.length === 0) return null

  return (
    <nav className="flex items-center gap-1 text-sm text-white/40 mb-6">
      <Link href={`/${baseRoute}`} className="flex items-center gap-1 hover:text-white/60 transition-colors">
        <Home className="h-4 w-4" />
      </Link>
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4" />
          {crumb.isLast ? (
            <span className="text-white/80">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-white/60 transition-colors">
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
