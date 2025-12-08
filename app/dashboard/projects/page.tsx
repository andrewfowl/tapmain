import Link from "next/link"
import { getCustomerProjects } from "@/actions/dashboard-actions"
import { getSubscriptionStatus } from "@/actions/auth-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, Plus, FileText } from "lucide-react"

export default async function ProjectsPage() {
  const projects = await getCustomerProjects()
  const subscription = await getSubscriptionStatus()
  const isApproved = subscription?.status === "approved"

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
            <p className="text-white/60">Manage your projects and upload files</p>
          </div>
          {isApproved ? (
            <Link href="/dashboard/projects/new">
              <Button className="bg-white text-black hover:bg-white/90">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </Link>
          ) : (
            <Button disabled className="bg-white/20 text-white/60 cursor-not-allowed">
              <Plus className="mr-2 h-4 w-4" />
              New Project (Requires Approval)
            </Button>
          )}
        </div>

        {projects.length === 0 ? (
          <Card className="bg-[#1a1a1a] border-white/10">
            <CardContent className="text-center py-16">
              <FolderOpen className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">No projects yet</h2>
              <p className="text-white/60 mb-6">
                {isApproved
                  ? "Create your first project to get started"
                  : "Your subscription needs to be approved before you can create projects"}
              </p>
              {isApproved && (
                <Link href="/dashboard/projects/new">
                  <Button className="bg-white text-black hover:bg-white/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Project
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
                <Card className="bg-[#1a1a1a] border-white/10 hover:border-white/20 transition-colors cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-white/60" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-white">{project.name}</CardTitle>
                          <CardDescription className="text-white/60">{project.project_types?.name}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
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
                      <span className="text-sm text-white/40">{project.project_files?.[0]?.count || 0} file(s)</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
