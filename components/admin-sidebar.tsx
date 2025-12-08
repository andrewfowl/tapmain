"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { MenuBar } from "@/components/ui/glow-menu"
import { signOut } from "@/actions/auth-actions"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Settings, LogOut, Shield, Clock } from "lucide-react"

interface AdminSidebarProps {
  profile: any
  pendingSubscriptions: number
  loading?: boolean
}

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin",
  },
  {
    icon: Clock,
    label: "Subscriptions",
    href: "/admin/subscriptions",
  },
  {
    icon: Users,
    label: "Customers",
    href: "/admin/customers",
  },
  {
    icon: Settings,
    label: "Project Types",
    href: "/admin/project-types",
  },
]

export function AdminSidebar({ profile, pendingSubscriptions, loading = false }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const getActiveItem = () => {
    if (pathname === "/admin") return "Dashboard"
    if (pathname.startsWith("/admin/subscriptions")) return "Subscriptions"
    if (pathname.startsWith("/admin/customers")) return "Customers"
    if (pathname.startsWith("/admin/project-types")) return "Project Types"
    return "Dashboard"
  }

  const itemsWithBadges = menuItems.map((item) => ({
    ...item,
    badge: item.label === "Subscriptions" ? pendingSubscriptions : undefined,
  }))

  return (
    <aside className="w-64 bg-[#0f0f0f] border-r border-white/10 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-white" />
          <span className="text-xl font-bold text-white">Admin Panel</span>
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
            <div className="flex items-center gap-3 mb-4 px-3">
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
            <div className="flex items-center gap-3 mb-4 px-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{profile?.full_name || "Admin"}</p>
                <p className="text-xs text-white/60">Administrator</p>
              </div>
            </div>
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
