import { notFound } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { getCustomerProjects, getAllProjectTypes } from "@/actions/admin-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, User, FolderOpen, Mail, Building, Phone, CheckCircle, Clock, XCircle } from "lucide-react"
import { AdminCreateProjectForm } from "@/components/admin-create-project-form"

export default async function CustomerDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const { data: customer } = await supabase.from("profiles").select("*, subscriptions(*)").eq("id", params.id).single()

  if (!customer) {
    notFound()
  }

  const projects = await getCustomerProjects(params.id)
  const projectTypes = await getAllProjectTypes()
  const subscription = customer.subscriptions?.[0]

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin/customers"
          className="inline-flex items-center text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Customers
        </Link>

        {/* Customer Info */}
        <Card className="bg-[#1a1a1a] border-white/10 mb-6">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white/60" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl text-white">{customer.full_name || "Unknown"}</CardTitle>
                <CardDescription className="text-white/60">Customer Details</CardDescription>
              </div>
              <div>
                {subscription?.status === "approved" ? (
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-500">
                    <CheckCircle className="h-4 w-4" />
                    Approved
                  </span>
                ) : subscription?.status === "pending" ? (
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-500">
                    <Clock className="h-4 w-4" />
                    Pending
                  </span>
                ) : (
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-500">
                    <XCircle className="h-4 w-4" />
                    Rejected
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                <Mail className="h-5 w-5 text-white/40" />
                <div>
                  <p className="text-xs text-white/40">Email</p>
                  <p className="text-sm text-white">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                <Building className="h-5 w-5 text-white/40" />
                <div>
                  <p className="text-xs text-white/40">Company</p>
                  <p className="text-sm text-white">{customer.company_name || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                <Phone className="h-5 w-5 text-white/40" />
                <div>
                  <p className="text-xs text-white/40">Phone</p>
                  <p className="text-sm text-white">{customer.phone || "Not provided"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <AdminCreateProjectForm
            userId={params.id}
            customerName={customer.full_name || customer.email || "Customer"}
            projectTypes={projectTypes.map((pt) => ({
              id: pt.id,
              name: pt.name,
              description: pt.description,
              icon: pt.icon,
            }))}
          />
        </div>

        {/* Projects */}
        <Card className="bg-[#1a1a1a] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Projects ({projects.length})</CardTitle>
            <CardDescription className="text-white/60">Customer's projects and uploaded files</CardDescription>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <div className="text-center py-8">
                <FolderOpen className="h-12 w-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">No projects yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project: any) => (
                  <Link
                    key={project.id}
                    href={`/admin/projects/${project.id}`}
                    className="block p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{project.name}</h4>
                        <p className="text-sm text-white/60">{project.project_types?.name}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-white/40">{project.project_files?.[0]?.count || 0} files</span>
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
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
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
