import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getPendingSubscriptions } from "@/actions/admin-actions"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/dashboard")
  }

  const pendingSubscriptions = await getPendingSubscriptions()

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      <AdminSidebar profile={profile} pendingSubscriptions={pendingSubscriptions.length} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <Breadcrumbs baseRoute="admin" />
          {children}
        </div>
      </main>
    </div>
  )
}
