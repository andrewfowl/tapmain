import { notFound } from "next/navigation"
import Link from "next/link"
import { getProjectById } from "@/actions/dashboard-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { FileUploadForm } from "@/components/file-upload-form"
import { ProjectFilesList } from "@/components/project-files-list"

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id)

  if (!project) {
    notFound()
  }

  const itemRequests = project.item_requests || []
  const uploadedFiles = project.project_files || []

  // Group requests by status
  const pendingRequests = itemRequests.filter((r: any) => r.status === "pending")
  const providedRequests = itemRequests.filter((r: any) => r.status === "provided")
  const acceptedRequests = itemRequests.filter((r: any) => r.status === "accepted")

  // Map files to requests
  const requestsWithFiles = itemRequests.map((request: any) => ({
    ...request,
    files: uploadedFiles.filter((f: any) => f.request_id === request.id),
  }))

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "provided":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-white/40" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-500/20 text-green-500"
      case "provided":
        return "bg-yellow-500/20 text-yellow-500"
      default:
        return "bg-white/10 text-white/60"
    }
  }

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

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{project.name}</h1>
            <p className="text-white/60">{project.project_types?.name}</p>
          </div>
          <span
            className={`px-4 py-2 text-sm rounded-full ${
              project.status === "completed"
                ? "bg-green-500/20 text-green-500"
                : project.status === "in_progress"
                  ? "bg-blue-500/20 text-blue-500"
                  : project.status === "review"
                    ? "bg-yellow-500/20 text-yellow-500"
                    : "bg-white/10 text-white/60"
            }`}
          >
            {project.status.replace("_", " ")}
          </span>
        </div>

        {project.description && (
          <Card className="bg-[#1a1a1a] border-white/10 mb-6">
            <CardContent className="p-4">
              <p className="text-white/80">{project.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Progress Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-[#1a1a1a] border-white/10">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{pendingRequests.length}</p>
              <p className="text-sm text-white/60">Pending</p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-500/10 border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-500">{providedRequests.length}</p>
              <p className="text-sm text-yellow-500/80">Awaiting Review</p>
            </CardContent>
          </Card>
          <Card className="bg-green-500/10 border-green-500/30">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-500">{acceptedRequests.length}</p>
              <p className="text-sm text-green-500/80">Accepted</p>
            </CardContent>
          </Card>
        </div>

        {/* Required Items */}
        <Card className="bg-[#1a1a1a] border-white/10 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Required Items</CardTitle>
            <CardDescription className="text-white/60">Upload the required documents for this project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {requestsWithFiles.length === 0 ? (
              <p className="text-white/60 text-center py-4">No required items for this project</p>
            ) : (
              requestsWithFiles.map((request: any) => (
                <div key={request.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusBadge(request.status)}`}
                      >
                        {getStatusIcon(request.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-white">{request.title}</h4>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadge(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                        {request.description && <p className="text-sm text-white/60 mt-1">{request.description}</p>}
                        {request.why_needed && (
                          <p className="text-sm text-white/40 mt-1">
                            <strong>Why needed:</strong> {request.why_needed}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Uploaded files for this request */}
                  {request.files.length > 0 && (
                    <div className="mb-3 pl-11">
                      <ProjectFilesList files={request.files} projectId={project.id} />
                    </div>
                  )}

                  {/* Upload form - only show if not accepted */}
                  {request.status !== "accepted" && (
                    <div className="pl-11">
                      <FileUploadForm
                        projectId={project.id}
                        requestId={request.id}
                        acceptedTypes={request.file_types}
                        label={request.files.length > 0 ? "Upload replacement file" : "Upload file"}
                      />
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* All Uploaded Files */}
        <Card className="bg-[#1a1a1a] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">All Uploaded Files</CardTitle>
            <CardDescription className="text-white/60">View all files uploaded to this project</CardDescription>
          </CardHeader>
          <CardContent>
            {uploadedFiles.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">No files uploaded yet</p>
              </div>
            ) : (
              <ProjectFilesList files={uploadedFiles} projectId={project.id} showItemName />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
