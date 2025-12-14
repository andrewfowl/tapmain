import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getPendingRequestsCount } from "@/actions/dashboard-actions"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const { data: subscription } = await supabase.from("subscriptions").select("status").eq("user_id", user.id).single()

  const pendingRequests = await getPendingRequestsCount()

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      <DashboardSidebar profile={profile} subscription={subscription} pendingRequests={pendingRequests} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <Breadcrumbs baseRoute="dashboard" />
          {children}
        </div>
      </main>
    </div>
  )
}
