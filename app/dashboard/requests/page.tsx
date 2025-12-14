import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, FileText, ArrowRight, CheckCircle, AlertCircle, Clock } from "lucide-react"

export default async function RequestsPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get all projects for this user
  const { data: projects } = await supabase
    .from("customer_projects")
    .select("id, name, project_types(id, name)")
    .eq("user_id", user!.id)

  if (!projects?.length) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Requests</h1>
          <Card className="bg-[#1a1a1a] border-white/10 rounded-[var(--radius-card)]">
            <CardContent className="text-center py-16">
              <Bell className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">No requests</h2>
              <p className="text-white/60">You don't have any projects yet</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const projectIds = projects.map((p) => p.id)

  const { data: itemRequests } = await supabase
    .from("item_requests")
    .select("*")
    .in("project_id", projectIds)
    .order("created_at", { ascending: true })

  // Group by status
  const pendingRequests = itemRequests?.filter((r) => r.status === "pending") || []
  const providedRequests = itemRequests?.filter((r) => r.status === "provided") || []
  const acceptedRequests = itemRequests?.filter((r) => r.status === "accepted") || []

  // Group requests by project
  const projectRequestsStatus = projects.map((project: any) => {
    const projectRequests = itemRequests?.filter((r) => r.project_id === project.id) || []
    const pending = projectRequests.filter((r) => r.status === "pending")
    const provided = projectRequests.filter((r) => r.status === "provided")
    const accepted = projectRequests.filter((r) => r.status === "accepted")

    return {
      project,
      requests: projectRequests,
      pendingCount: pending.length,
      providedCount: provided.length,
      acceptedCount: accepted.length,
    }
  })

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Requests</h1>
        <p className="text-white/60 mb-8">Track your required items and their status</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-[#1a1a1a] border-white/10 rounded-[var(--radius-card)]">
            <CardContent className="p-4 text-center">
              <AlertCircle className="h-8 w-8 text-white/60 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{pendingRequests.length}</p>
              <p className="text-sm text-white/60">Pending Upload</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/20 rounded-[var(--radius-card)]">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-white/80 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{providedRequests.length}</p>
              <p className="text-sm text-white/60">Awaiting Review</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/30 rounded-[var(--radius-card)]">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-white mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{acceptedRequests.length}</p>
              <p className="text-sm text-white/60">Accepted</p>
            </CardContent>
          </Card>
        </div>

        {/* Requests by Project */}
        <Card className="bg-[#1a1a1a] border-white/10 mb-6 rounded-[var(--radius-card)]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Items by Project
            </CardTitle>
            <CardDescription className="text-white/60">Track all required items for each project</CardDescription>
          </CardHeader>
          <CardContent>
            {projectRequestsStatus.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">No project items</p>
              </div>
            ) : (
              <div className="space-y-6">
                {projectRequestsStatus.map(({ project, requests, pendingCount, providedCount, acceptedCount }: any) => (
                  <div
                    key={project.id}
                    className="border border-white/10 rounded-[var(--radius-card-inner)] overflow-hidden"
                  >
                    <div className="p-4 bg-white/5 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{project.name}</h4>
                        <p className="text-sm text-white/60">{project.project_types?.name}</p>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        {pendingCount > 0 && <span className="text-white/60">{pendingCount} pending</span>}
                        {providedCount > 0 && <span className="text-white/80">{providedCount} in review</span>}
                        {acceptedCount > 0 && <span className="text-white">{acceptedCount} accepted</span>}
                      </div>
                    </div>
                    <div className="divide-y divide-white/10">
                      {requests.map((request: any) => {
                        const statusColor =
                          request.status === "accepted"
                            ? "bg-white/10"
                            : request.status === "provided"
                              ? "bg-white/5"
                              : "bg-transparent"
                        const statusIcon =
                          request.status === "accepted" ? (
                            <CheckCircle className="h-5 w-5 text-white" />
                          ) : request.status === "provided" ? (
                            <Clock className="h-5 w-5 text-white/80" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-white/60" />
                          )
                        const statusBadge =
                          request.status === "accepted"
                            ? "bg-white/20 text-white"
                            : request.status === "provided"
                              ? "bg-white/10 text-white/80"
                              : "bg-white/5 text-white/60"
                        const statusLabel =
                          request.status === "accepted"
                            ? "Accepted"
                            : request.status === "provided"
                              ? "In Review"
                              : "Pending"

                        return (
                          <Link
                            key={request.id}
                            href={`/dashboard/projects/${project.id}`}
                            className={`flex items-center justify-between p-4 hover:bg-white/5 transition-colors ${statusColor}`}
                          >
                            <div className="flex items-center gap-3">
                              {statusIcon}
                              <div>
                                <p className="font-medium text-white">{request.title}</p>
                                {request.description && <p className="text-sm text-white/60">{request.description}</p>}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 text-xs rounded-full ${statusBadge}`}>{statusLabel}</span>
                              <ArrowRight className="h-4 w-4 text-white/40" />
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
