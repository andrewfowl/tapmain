import { notFound } from "next/navigation"
import Link from "next/link"
import { getProjectDetails } from "@/actions/admin-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, User, Download, Clock, Package } from "lucide-react"
import { AdminProjectActions } from "@/components/admin-project-actions"
import { AdminItemRequestForm } from "@/components/admin-item-request-form"
import { AdminRequestActions } from "@/components/admin-request-actions"
import { AdminDeliverableUpload } from "@/components/admin-deliverable-upload"
import { DeliverablesList } from "@/components/deliverables-list"

export default async function AdminProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProjectDetails(id)

  if (!project) {
    notFound()
  }

  const uploadedFiles = project.project_files || []
  const itemRequests = project.item_requests || []

  const deliverables = uploadedFiles.filter((f: any) => f.notes?.startsWith("[DELIVERABLE]"))
  const customerFiles = uploadedFiles.filter((f: any) => !f.notes?.startsWith("[DELIVERABLE]"))

  // Group by status
  const pendingRequests = itemRequests.filter((r: any) => r.status === "pending")
  const providedRequests = itemRequests.filter((r: any) => r.status === "provided")
  const acceptedRequests = itemRequests.filter((r: any) => r.status === "accepted")

  // Map files to requests
  const requestsWithFiles = itemRequests.map((request: any) => ({
    ...request,
    files: customerFiles.filter((f: any) => f.request_id === request.id),
  }))

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-white/20 text-white"
      case "provided":
        return "bg-white/10 text-white/80"
      case "cancelled":
        return "bg-white/5 text-white/40"
      default:
        return "bg-white/10 text-white/60"
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href={`/admin/customers/${project.user_id}`}
          className="inline-flex items-center text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Customer
        </Link>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{project.name}</h1>
            <p className="text-white/60">{project.project_types?.name}</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-white/40">
              <User className="h-4 w-4" />
              {project.profiles?.full_name || project.profiles?.email}
            </div>
          </div>
          <AdminProjectActions projectId={project.id} currentStatus={project.status} />
        </div>

        {project.description && (
          <Card className="bg-[#1a1a1a] border-white/10 mb-6 rounded-none">
            <CardContent className="p-4">
              <p className="text-white/80">{project.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Progress Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-[#1a1a1a] border-white/10 rounded-none">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{pendingRequests.length}</p>
              <p className="text-sm text-white/60">Pending</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/20 rounded-none">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{providedRequests.length}</p>
              <p className="text-sm text-white/80">Needs Review</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/30 rounded-none">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{acceptedRequests.length}</p>
              <p className="text-sm text-white/80">Accepted</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#1a1a1a] border-white/10 mb-6 rounded-none">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Package className="h-5 w-5" />
              Deliverables ({deliverables.length})
            </CardTitle>
            <CardDescription className="text-white/60">
              Upload completed work for the customer to download
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <DeliverablesList files={uploadedFiles} projectId={project.id} isAdmin />
            <div className="pt-4 border-t border-white/10">
              <AdminDeliverableUpload projectId={project.id} />
            </div>
          </CardContent>
        </Card>

        {/* Items Needing Review */}
        {providedRequests.length > 0 && (
          <Card className="bg-white/5 border-white/20 mb-6 rounded-none">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Items Needing Review ({providedRequests.length})
              </CardTitle>
              <CardDescription className="text-white/80">
                Customer has uploaded files - review and accept or request re-upload
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {requestsWithFiles
                .filter((r: any) => r.status === "provided")
                .map((request: any) => (
                  <div key={request.id} className="p-4 rounded-none bg-black/20 border border-white/20">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-white">{request.title}</h4>
                        <p className="text-sm text-white/60">{request.description}</p>
                      </div>
                      <AdminRequestActions
                        requestId={request.id}
                        projectId={project.id}
                        status={request.status}
                        files={request.files}
                      />
                    </div>
                    {request.files.length > 0 && (
                      <div className="space-y-2 mt-3">
                        {request.files.map((file: any) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between p-2 rounded-none bg-black/30 border border-white/10"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-white/60" />
                              <span className="text-sm text-white">{file.file_name}</span>
                            </div>
                            <a href={file.file_url} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4 text-white/60 hover:text-white" />
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* All Item Requests */}
          <Card className="bg-[#1a1a1a] border-white/10 rounded-none">
            <CardHeader>
              <CardTitle className="text-white">All Item Requests ({itemRequests.length})</CardTitle>
              <CardDescription className="text-white/60">Track all requested items and their status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {requestsWithFiles.length === 0 ? (
                <p className="text-white/60 text-center py-4">No items requested yet</p>
              ) : (
                requestsWithFiles.map((request: any) => (
                  <div key={request.id} className="p-3 rounded-none bg-white/5 border border-white/10">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white">{request.title}</p>
                          <span className={`px-2 py-0.5 text-xs rounded-none ${getStatusBadge(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                        <p className="text-xs text-white/60 mt-1">{request.description}</p>
                        {request.files.length > 0 && (
                          <p className="text-xs text-white/40 mt-1">{request.files.length} file(s) uploaded</p>
                        )}
                      </div>
                      {request.status !== "cancelled" && (
                        <AdminRequestActions
                          requestId={request.id}
                          projectId={project.id}
                          status={request.status}
                          files={request.files}
                        />
                      )}
                    </div>
                  </div>
                ))
              )}

              {/* Add new request form */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-sm font-medium text-white mb-3">Add Custom Request</h4>
                <AdminItemRequestForm projectId={project.id} />
              </div>
            </CardContent>
          </Card>

          {/* Customer Uploaded Files */}
          <Card className="bg-[#1a1a1a] border-white/10 rounded-none">
            <CardHeader>
              <CardTitle className="text-white">Customer Uploads ({customerFiles.length})</CardTitle>
              <CardDescription className="text-white/60">Files uploaded by the customer</CardDescription>
            </CardHeader>
            <CardContent>
              {customerFiles.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60">No files uploaded yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {customerFiles.map((file: any) => {
                    const request = itemRequests.find((r: any) => r.id === file.request_id)
                    return (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 rounded-none bg-white/5 border border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-white/60" />
                          <div>
                            <p className="text-sm font-medium text-white">{file.file_name}</p>
                            <p className="text-xs text-white/40">
                              {request?.title || "General upload"} •{" "}
                              {file.file_size ? `${(file.file_size / 1024).toFixed(1)} KB` : ""}
                            </p>
                          </div>
                        </div>
                        <a href={file.file_url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 text-white/60 hover:text-white" />
                        </a>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
