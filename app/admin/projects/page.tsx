import { getAllProjects, getPendingProjects } from "@/actions/admin-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminProjectsTable } from "@/components/admin-projects-table"
import { Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminProjectsPage() {
  const allProjects = await getAllProjects()
  const pendingProjects = await getPendingProjects()

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">All Projects</h1>
          <p className="text-white/60">Manage and review customer projects</p>
        </div>

        {/* Pending Projects Alert */}
        {pendingProjects.length > 0 && (
          <Card className="bg-white/5 border-white/20 mb-8 rounded-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-white/60" />
                  <CardTitle className="text-white">{pendingProjects.length} Project(s) Awaiting Approval</CardTitle>
                </div>
                <Link href="#projects-table">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-none border-white/20 bg-transparent text-white hover:bg-white/10"
                  >
                    Review All <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
          </Card>
        )}

        {/* Projects Table */}
        <Card className="bg-[#1a1a1a] border-white/10 rounded-none" id="projects-table">
          <CardHeader>
            <CardTitle className="text-white">Projects ({allProjects.length})</CardTitle>
            <CardDescription className="text-white/60">
              All customer projects with filtering and sorting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminProjectsTable projects={allProjects} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
