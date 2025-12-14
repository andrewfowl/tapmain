import { notFound } from "next/navigation"
import Link from "next/link"
import { getCustomerById, getCustomerProjects, getAllProjectTypes } from "@/actions/admin-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  User,
  FolderOpen,
  Mail,
  Building,
  Phone,
  CheckCircle,
  Clock,
  XCircle,
  Snowflake,
} from "lucide-react"
import { AdminCreateProjectForm } from "@/components/admin-create-project-form"
import { CustomerDetailActions } from "@/components/customer-detail-actions"

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const customer = await getCustomerById(id)

  if (!customer) {
    notFound()
  }

  const projects = await getCustomerProjects(id)
  const projectTypes = await getAllProjectTypes()
  const subscription = customer.subscriptions?.[0]

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "frozen":
        return <Snowflake className="h-4 w-4" />
      default:
        return <XCircle className="h-4 w-4" />
    }
  }

  const getStatusStyle = (status?: string) => {
    switch (status) {
      case "approved":
        return "bg-white/20 text-white"
      case "pending":
        return "bg-white/10 text-white/80"
      case "frozen":
        return "bg-white/10 text-white/60"
      default:
        return "bg-white/5 text-white/60"
    }
  }

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
              <div className="flex items-center gap-2">
                <span
                  className={`flex items-center gap-2 px-4 py-2 rounded-none ${getStatusStyle(subscription?.status)}`}
                >
                  {getStatusIcon(subscription?.status)}
                  {subscription?.status
                    ? subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)
                    : "No Subscription"}
                </span>
                <CustomerDetailActions
                  customerId={customer.id}
                  customerName={customer.full_name || customer.email}
                  subscription={subscription}
                />
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
            userId={id}
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
                    className="block p-4 rounded-none bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{project.name}</h4>
                        <p className="text-sm text-white/60">{project.project_types?.name}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-white/40">{project.project_files?.[0]?.count || 0} files</span>
                        <span
                          className={`px-3 py-1 text-xs rounded-none ${
                            project.status === "completed"
                              ? "bg-white/20 text-white"
                              : project.status === "in_progress"
                                ? "bg-white/10 text-white/80"
                                : project.status === "review"
                                  ? "bg-white/10 text-white/80"
                                  : "bg-white/5 text-white/60"
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
