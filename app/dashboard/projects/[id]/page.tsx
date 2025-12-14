import { notFound } from "next/navigation"
import Link from "next/link"
import { getProjectById } from "@/actions/dashboard-actions"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock, XCircle } from "lucide-react"
import { ProjectDetailTabs } from "@/components/project-detail-tabs"

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  const itemRequests = project.item_requests || []
  const uploadedFiles = project.project_files || []

  const deliverables = uploadedFiles.filter((f: any) => f.notes?.startsWith("[DELIVERABLE]"))
  const customerFiles = uploadedFiles.filter((f: any) => !f.notes?.startsWith("[DELIVERABLE]"))

  // Group requests by status
  const pendingRequests = itemRequests.filter((r: any) => r.status === "pending")
  const providedRequests = itemRequests.filter((r: any) => r.status === "provided")
  const acceptedRequests = itemRequests.filter((r: any) => r.status === "accepted")

  // Map files to requests
  const requestsWithFiles = itemRequests.map((request: any) => ({
    ...request,
    files: customerFiles.filter((f: any) => f.request_id === request.id),
  }))

  const isPending = project.status === "pending" || project.status === "pending_approval"
  const isDeclined = project.status === "declined"
  const isDraft = project.status === "draft"

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{project.name}</h1>
            <p className="text-white/60">{project.project_types?.name}</p>
          </div>
          <span
            className={`px-4 py-2 text-sm rounded-full ${
              project.status === "approved"
                ? "bg-white/20 text-white"
                : project.status === "declined"
                  ? "bg-white/5 text-white/40"
                  : "bg-white/10 text-white/60"
            }`}
          >
            {project.status.replace(/_/g, " ")}
          </span>
        </div>

        {(isPending || isDraft) && (
          <Card className="bg-white/5 border-white/20 mb-6 rounded-[var(--radius-card)]">
            <CardContent className="p-6 flex items-start gap-4">
              <Clock className="h-6 w-6 text-white/60 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-medium mb-1">Project Pending Approval</h3>
                <p className="text-white/60 text-sm">
                  Your project has been submitted and is awaiting review by our team. You can start uploading required
                  documents now, but please note that the project may be rejected if it doesn't meet our criteria. Work
                  will begin once the project is approved.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {isDeclined && (
          <Card className="bg-white/5 border-white/10 mb-6 rounded-[var(--radius-card)]">
            <CardContent className="p-6 flex items-start gap-4">
              <XCircle className="h-6 w-6 text-white/40 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-medium mb-1">Project Declined</h3>
                <p className="text-white/60 text-sm">
                  Unfortunately, this project has been declined. You can delete this project and submit a new one, or
                  contact support if you believe this was an error.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {project.description && (
          <Card className="bg-[#1a1a1a] border-white/10 mb-6 rounded-[var(--radius-card)]">
            <CardContent className="p-4">
              <p className="text-white/80">{project.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Tabbed Content - always show, users can upload even before approval */}
        <ProjectDetailTabs
          projectId={project.id}
          requestsWithFiles={requestsWithFiles}
          deliverables={deliverables}
          customerFiles={customerFiles}
          uploadedFiles={uploadedFiles}
          pendingCount={pendingRequests.length}
          providedCount={providedRequests.length}
          acceptedCount={acceptedRequests.length}
        />
      </div>
    </div>
  )
}
