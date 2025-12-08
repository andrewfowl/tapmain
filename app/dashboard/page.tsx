import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { getCustomerProjects, getPendingRequestsCount } from "@/actions/dashboard-actions"
import { Button } from "@/components/ui/button"
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"
import { FolderOpen, Bell, Plus, Settings, Clock } from "lucide-react"
import { TrustpilotWidget } from "@/components/trustpilot-widget"

export default async function DashboardPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user!.id).single()

  const { data: subscription } = await supabase.from("subscriptions").select("*").eq("user_id", user!.id).single()

  const projects = await getCustomerProjects()
  const pendingRequests = await getPendingRequestsCount()

  const isApproved = subscription?.status === "approved"

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {profile?.full_name || "there"}!</h1>
          <p className="text-white/60">Here's an overview of your account</p>
        </div>

        {/* Subscription Status Banner */}
        {!isApproved && (
          <div className="mb-8 p-4 rounded-none bg-white/5 border border-white/20 flex items-center gap-4">
            <Clock className="h-6 w-6 text-white/60" />
            <div>
              <p className="font-medium text-white">Subscription Pending Approval</p>
              <p className="text-sm text-white/60">
                Your subscription is awaiting approval. Once approved, you'll be able to create projects and upload
                files.
              </p>
            </div>
          </div>
        )}

        <BentoGrid className="lg:grid-rows-2 mb-8">
          {/* Projects Card - Left column */}
          <BentoCard
            name={`${projects.length} Projects`}
            description="View and manage all your active projects"
            Icon={FolderOpen}
            href="/dashboard/projects"
            cta="View all projects"
            className="lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3"
          />

          {/* Pending Requests Card - Middle column */}
          <BentoCard
            name={`${pendingRequests} Pending Requests`}
            description="Items requested by your account manager"
            Icon={Bell}
            href="/dashboard/requests"
            cta="View requests"
            className="lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-3"
          />

          {/* New Project Card - Right column top */}
          <BentoCard
            name="New Project"
            description={isApproved ? "Start a new project and upload documents" : "Requires subscription approval"}
            Icon={Plus}
            href={isApproved ? "/dashboard/projects/new" : undefined}
            cta={isApproved ? "Create project" : undefined}
            className="lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2"
            background={<div className="absolute inset-0 bg-white/5" />}
          />

          {/* Profile Card - Right column bottom */}
          <BentoCard
            name="Profile Settings"
            description="Update your personal information and preferences"
            Icon={Settings}
            href="/dashboard/profile"
            cta="Edit profile"
            className="lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3"
          />
        </BentoGrid>

        {/* Recent Projects */}
        <div className="rounded-none bg-[#1a1a1a] border border-white/10 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
            <p className="text-white/60 text-sm">Your latest projects</p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-8">
              <FolderOpen className="h-12 w-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 mb-4">No projects yet</p>
              {isApproved && (
                <Link href="/dashboard/projects/new">
                  <Button className="bg-white text-black hover:bg-white/90 rounded-none">
                    Create your first project
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {projects.slice(0, 5).map((project: any) => (
                <Link
                  key={project.id}
                  href={`/dashboard/projects/${project.id}`}
                  className="flex items-center justify-between p-4 rounded-none bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div>
                    <p className="font-medium text-white">{project.name}</p>
                    <p className="text-sm text-white/60">{project.project_types?.name}</p>
                  </div>
                  <span className="px-3 py-1 text-xs rounded-none bg-white/10 text-white/60">
                    {project.status.replace("_", " ")}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 rounded-none bg-[#1a1a1a] border border-white/10 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white">Share Your Experience</h2>
            <p className="text-white/60 text-sm">We'd love to hear your feedback</p>
          </div>
          <TrustpilotWidget />
        </div>
      </div>
    </div>
  )
}
