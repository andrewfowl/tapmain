import { getCustomerProjects } from "@/actions/dashboard-actions"
import { getSubscriptionStatus } from "@/actions/auth-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardProjectsTable } from "@/components/dashboard-projects-table"
import { FolderOpen, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function ProjectsPage() {
  const projects = await getCustomerProjects()
  const subscription = await getSubscriptionStatus()
  const isApproved = subscription?.status === "approved"

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-white/60">Manage your projects and upload files</p>
        </div>

        <Card className="bg-[#1a1a1a] border-white/10 rounded-[var(--radius-card)]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Your Projects ({projects.length})
            </CardTitle>
            <CardDescription className="text-white/60">
              {isApproved
                ? "Create and manage your projects"
                : "Your subscription needs approval to create new projects"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <div className="text-center py-16">
                <FolderOpen className="h-16 w-16 text-white/20 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">No projects yet</h2>
                <p className="text-white/60 mb-6">
                  {isApproved
                    ? "Create your first project to get started"
                    : "Your subscription needs to be approved before you can create projects"}
                </p>
                {isApproved && (
                  <Link href="/dashboard/projects/new">
                    <Button className="bg-white text-black hover:bg-white/90 rounded-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Project
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <DashboardProjectsTable projects={projects} isApproved={isApproved} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
