"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { MenuBar } from "@/components/ui/glow-menu"
import { signOut } from "@/actions/auth-actions"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FolderOpen, Bell, LogOut, User, Shield } from "lucide-react"

interface DashboardSidebarProps {
  profile: any
  subscription: any
  pendingRequests: number
  loading?: boolean
}

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: FolderOpen,
    label: "Projects",
    href: "/dashboard/projects",
  },
  {
    icon: Bell,
    label: "Requests",
    href: "/dashboard/requests",
  },
  {
    icon: Shield,
    label: "Trust Center",
    href: "/dashboard/trust",
  },
]

export function DashboardSidebar({ profile, subscription, pendingRequests, loading = false }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const getActiveItem = () => {
    if (pathname === "/dashboard") return "Dashboard"
    if (pathname.startsWith("/dashboard/projects")) return "Projects"
    if (pathname.startsWith("/dashboard/requests")) return "Requests"
    if (pathname.startsWith("/dashboard/trust")) return "Trust Center"
    return "Dashboard"
  }

  const itemsWithBadges = menuItems.map((item) => ({
    ...item,
    badge: item.label === "Requests" ? pendingRequests : undefined,
  }))

  return (
    <aside className="w-64 bg-[#0f0f0f] border-r border-white/10 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="text-xl font-bold text-white">
          TechAccountingPro
        </Link>
      </div>

      <div className="flex-1 p-4">
        <MenuBar
          items={itemsWithBadges}
          activeItem={getActiveItem()}
          onItemClick={(label, href) => router.push(href)}
          className="w-full"
          loading={loading}
        />
      </div>

      <div className="p-4 border-t border-white/10">
        {loading ? (
          <div className="animate-pulse">
            <div className="flex items-center gap-3 mb-4 px-3 py-2">
              <div className="w-8 h-8 bg-white/10 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-white/10 rounded-none mb-2 w-24" />
                <div className="h-3 bg-white/10 rounded-none w-16" />
              </div>
            </div>
            <div className="h-10 bg-white/10 rounded-none" />
          </div>
        ) : (
          <>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 mb-4 px-3 py-2 rounded-none hover:bg-white/10 transition-colors"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{profile?.full_name || "User"}</p>
                <p className="text-xs text-white/60 truncate">
                  {subscription?.status === "approved" ? (
                    <span className="text-white/80">Subscribed</span>
                  ) : subscription?.status === "pending" ? (
                    <span className="text-white/60">Pending Approval</span>
                  ) : (
                    <span className="text-white/40">Not Subscribed</span>
                  )}
                </p>
              </div>
            </Link>
            <form action={signOut}>
              <Button
                type="submit"
                variant="ghost"
                className="w-full justify-start text-white/60 hover:text-white hover:bg-white/10 rounded-none"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Sign Out
              </Button>
            </form>
          </>
        )}
      </div>
    </aside>
  )
}
