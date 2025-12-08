import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ProfileEditForm } from "@/components/profile-edit-form"

export default async function ProfilePage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const { data: subscription } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).single()

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Profile Settings</h1>

        <div className="space-y-6">
          {/* Profile Form */}
          <ProfileEditForm profile={profile} email={user.email || ""} />

          {/* Subscription Status */}
          <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Subscription Status</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Current Status</p>
                <p className="text-white font-medium">
                  {subscription?.status === "approved" ? (
                    <span className="text-green-400">Active</span>
                  ) : subscription?.status === "pending" ? (
                    <span className="text-yellow-400">Pending Approval</span>
                  ) : subscription?.status === "rejected" ? (
                    <span className="text-red-400">Rejected</span>
                  ) : (
                    <span className="text-white/40">No Subscription</span>
                  )}
                </p>
              </div>
              {subscription?.status === "rejected" && subscription.rejection_reason && (
                <div className="text-right">
                  <p className="text-white/60 text-sm">Reason</p>
                  <p className="text-red-400 text-sm">{subscription.rejection_reason}</p>
                </div>
              )}
            </div>
            {subscription?.approved_at && (
              <p className="text-white/40 text-xs mt-2">
                Approved on {new Date(subscription.approved_at).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Account Info */}
          <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Account Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-white/60 text-sm">Email</p>
                <p className="text-white">{user.email}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Account Created</p>
                <p className="text-white">{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
